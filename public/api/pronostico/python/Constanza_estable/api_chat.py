from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess
import json

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

@app.route('/api/pronostico/python/Constanza_estable/apichat', methods=['POST'])
def api_chat():
    if request.method == 'OPTIONS':
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Authorization, X-Requested-With',
        }
        return ('', 204, headers)

    if request.method == 'POST':
        try:
            data = request.get_json()
            question = data.get('question')
            print('Pregunta recibida en la API:', question)
            # script = 'stable.py'
            # subprocess.run(f'python {script}')
            cargar = {}
            cargar.update({"answer": "Pensando.."})
            with open("respuesta.json", "w") as archivo_json:
                json.dump(cargar,archivo_json)
                # Ejecutar el entorno de Python
            if question:
                environment_name = 'C_stable_v1_2'
                activate_env_cmd = f'activate {environment_name} &&'

                # Ejecutar el script de Python
                script_name = 'stable.py'  # Cambiar al nombre de tu script
                run_script_cmd = f'python {script_name} "{question}"'

                result = subprocess.run(run_script_cmd)
                script_output = result.stdout
                print('Resultado', script_output)
                return jsonify({"resultado": script_output})
            else:
                return jsonify({"error": "Texto no proporcionado en la solicitud"}), 400
        except Exception as e:
            print(f"Error en la API: {str(e)}")
            return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
