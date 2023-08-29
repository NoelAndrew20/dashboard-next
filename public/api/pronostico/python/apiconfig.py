from flask import Flask, request, jsonify
import json
from flask_cors import CORS 
import subprocess

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

@app.route('/api/pronostico/python/run-calculadora', methods=['POST'])
def run_calculadora():
    if request.method == 'OPTIONS':
        # Responder a la solicitud OPTIONS con los encabezados adecuados
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Authorization, X-Requested-With',
        }
        return ('', 204, headers)
        
    if request.method == 'POST':
        try:
            
            # Ejecutar el entorno de Python
            environment_name = 'protv1'
            activate_env_cmd = f'activate {environment_name} && '

            # Ejecutar el script de Python
            script_name = 'modo_calculadora.py'  # Cambiar al nombre de tu script
            run_script_cmd = f'python {script_name}'
            combined_cmd = activate_env_cmd + run_script_cmd

            result = subprocess.run(combined_cmd, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)

            if result.returncode == 0:
                # Aquí puedes modificar el archivo JSON con new_data si es necesario
                return jsonify({'message': 'Script executed successfully', 'output': result.stdout, 'error': ''})
            else:
                return jsonify({'message': 'Script execution failed', 'output': '', 'error': result.stderr})

        except Exception as e:
            return jsonify({'message': 'Error executing script', 'output': '', 'error': str(e)}), 500

# Ruta para obtener el archivo JSON
@app.route('/api/pronostico/python/config.json', methods=['POST'])
def get_json():
    if request.method == 'OPTIONS':
        # Responder a la solicitud OPTIONS con los encabezados adecuados
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Authorization, X-Requested-With',
        }
        return ('', 204, headers)
    """if request.method == 'POST':
        try:
            # Ruta del archivo JSON que deseas obtener
            file_path = './config.json'
            
            # Leer el archivo JSON existente
            with open(file_path, 'r') as json_file:
                data = json.load(json_file)
            
            return jsonify(data), 200
        
        except Exception as e:
            return jsonify({'error': str(e)}), 500"""
        
    if request.method == 'POST':
        try:
            # Ruta del archivo JSON que deseas modificar
            file_path = './config.json'
            
            # Obtener los datos enviados en la solicitud
            new_data = request.get_json()
            
            # Leer el archivo JSON existente
            with open(file_path, 'r') as json_file:
                data = json.load(json_file)
            
            # Modificar los datos con los nuevos datos recibidos
            #data.update(new_data)
            #for key, value in new_data.items():
            #    data[key] = value
            data["config"].update(new_data)
            #data["config"]["lotes"].update(new_data)
            
            # Escribir los datos modificados nuevamente en el archivo
            with open(file_path, 'w') as json_file:
                json.dump(data, json_file, indent=4)
            
            return jsonify({'message': 'JSON modified successfully'}), 200
        
        except Exception as e:
            return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
