from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess
import json
import logging
import threading
import time
from gtts import gTTS
from gtts.tokenizer import pre_processors
import gtts.tokenizer.symbols
from stable import * 
import requests

logging.basicConfig(level=logging.DEBUG)

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})
contador_activo = False
contador_thread = None 

@app.route('/api/pronostico/python/Constanza_v15/apichat_cons_v15', methods=['POST'])
def api_chat():
    global json_modificado
    json_modificado = False  # Restablece json_modificado a False


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
                signal_data = {"senal": False}
                print('Pregunta recibida en la API:', question)
                cargar = {}
                cargar.update({"answer": "Pensando.."})
                with open("respuesta.json", "w") as archivo_json:
                    json.dump(cargar, archivo_json)

                # with open('senal.json', 'w') as signal_file:
                #     json.dump(signal_data, signal_file)
                if question:
                    #environment_name = 'C_stable_v1_2'
                    #activate_env_cmd = f'activate {environment_name} &&'

                    # script_name = 'stable.py'
                    # run_script_cmd = f'python {script_name} "{question}" '

                    # result = subprocess.run(run_script_cmd)
                    # script_output = result.stdout
                    # resultado = principal(question)
                    print (question)
                    question_json={"Order":question}
                    print("questionjson=  ",question_json)
                    jsonaa = requests.post(os.environ.get("URl_constanza_verification"),json=question_json)
                    print('Resultado', jsonaa.json())
                    json_response = jsonaa.json()
                    if json_response:
                        with open("requisitos_2.json", "w") as archivo_json:
                            json.dump(json_response.get('requirements', {}), archivo_json)
                        cargar = {}
                        cargar.update({"answer": "Puedes Abrir el cuestionario"})
                        with open("respuesta.json", "w") as archivo_json:
                            json.dump(cargar, archivo_json)
                    else:
                        print("La respuesta JSON está vacía")
                    with open("requisitos_2.json", 'r') as json_file:
                        current_data = json.load(json_file)
                    if current_data == "Chatpig":
                        # Modificar el archivo con la estructura JSON predefinida
                        predefined_structure = {"Question": ""}
                        with open("requisitos_2.json", 'w') as json_file:
                            json.dump(predefined_structure, json_file, indent=4)
                    global contador_activo
                    contador_activo = True
                    tiempo_espera = 4
                    inicio = time.time()
                    while contador_activo == True:
                            tiempo_transcurrido = time.time() - inicio
                            if tiempo_transcurrido >= tiempo_espera:
                                print("Pasaron 4 segundos")
                                cargar = {}
                                cargar.update({"answer": "Esperando"})
                                with open("respuesta.json", "w") as archivo_json:
                                    json.dump(cargar, archivo_json)
                                contador_activo = False
                                break
                            print(f"Tiempo Transcurrido: {int(tiempo_transcurrido)}segundos")
                            time.sleep(1)
                    
                    return jsonify({"resultado": predefined_structure}),predefined_structure
                else:
                    return jsonify({"error": "Texto no proporcionado en la solicitud"}), 400
            except Exception as e:
                print(f"Error en la API: {str(e)}")
                return jsonify({"error": str(e)}), 500

def actualizar_json_esperando():
    global json_modificado
    while True:
        time.sleep(15)  # Espera 30 segundos
        if not json_modificado:  # Si no ha habido actividad durante 30 segundos
            try:
                cargar = {"answer": "Esperando"}
                with open("respuesta.json", "w") as archivo_json:
                    json.dump(cargar, archivo_json)
                json_modificado = True  # Establece json_modificado en True
                print('JSON actualizado a "Esperando" después de 30 segundos de inactividad.')
            except Exception as e:
                logging.error(f'Error al actualizar el JSON: {str(e)}')

def TextToSpeech(text:str, lang:str):
    tts = gTTS(text, lang = lang)
    tts.save('respuesta.mp3')
    print("mp3 hecho")



@app.route('/api/pronostico/python/Constanza_v15/requisitos_2.json', methods=['POST'])
def get_json():
    if request.method == 'OPTIONS':
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Authorization, X-Requested-With',
        }
        return ('', 204, headers)
    if request.method == 'POST':
        try:
            cargar = {}
            cargar.update({"answer": "Pensando.."})
            with open("respuesta.json", "w") as archivo_json:
                json.dump(cargar, archivo_json)
            file_path = './requisitos_2.json'
            new_data = request.get_json()
            signal_data = {"senal": True}
            with open(file_path, 'r') as json_file:
                data = json.load(json_file)

            data.update(new_data)

            with open(file_path, 'w') as json_file:
                json.dump(data, json_file, indent=4)
            print("json info",data)
            # Crear o modificar el archivo "senal" con el valor "true"
            with open('senal.json', 'w') as signal_file:
                json.dump(signal_data, signal_file)
            with open(file_path, 'r') as json_file:
                current_data = json.load(json_file)  
            if "Question" in current_data:
                print("El contenido actual es igual a {'Question': ''}. Realizar acciones específicas.")
                print(data)
                json_completo = {"function":"Chatpig","json":data}
                print(json_completo)
                jsonaa = requests.post(os.environ.get("URL_SISTEMAEXPERTO"),json=json_completo)
                print('Resultado', json_completo)
                json_response = jsonaa.json()
                print(json_response)
                cargar = {"answer": "Esperando"}
                with open("respuesta.json", "w") as archivo_json:
                    json.dump(cargar, archivo_json)
                respuesta = json_response["answer"]
                with open("respuestacons.json", "w") as archivo_json:
                    json.dump(respuesta, archivo_json)
                print("respuesta",respuesta)
                TextToSpeech(text=respuesta["answer"], lang= 'es')
                return json_response
            else:
                json_completo = {"Parameters":data} 
                jsonaa = requests.post(os.environ.get("URl_constanza_execution"),json=json_completo)
                print('Resultado', json_completo)
                json_response = jsonaa.json()
                cargar = {"answer": "Esperando"}
                with open("respuesta.json", "w") as archivo_json:
                    json.dump(cargar, archivo_json)
                respuesta = json_response["answer"]
                print(respuesta)
                with open("respuestacons.json", "w") as archivo_json:
                    json.dump(respuesta, archivo_json)
                TextToSpeech(text=respuesta, lang= 'es')
                return json_response
            # return jsonify({'message': 'JSON modified successfully'}), 200
        except Exception as e:
            logging.error(f'Error en la solicitud POST: {str(e)}')
            return jsonify({'error': str(e)}), 500
        
@app.route('/api/pronostico/python/Constanza_v15/respuesta.mp3', methods=['POST'])
def get_mp3():
    if request.method == 'OPTIONS':
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Authorization, X-Requested-With',
        }
        return ('', 204, headers)
    if request.method == 'POST':
        try:
            text = "Hola y bienvenido a Constanza IA"
            tts = gTTS(text=text , lang='es')
            tts.save('respuesta.mp3')
            return jsonify({'message': 'MP3 modified successfully'}), 200
        except Exception as e:
            logging.error(f'Error en la solicitud POST: {str(e)}')
            return jsonify({'error': str(e)}), 500
        
@app.route('/api/pronostico/python/Constanza_v15/usuario', methods=['POST'])
def get_user():
    if request.method == 'OPTIONS':
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Authorization, X-Requested-With',
        }
        return ('', 204, headers)
    if request.method == 'POST':
        try:
            # Obtén el valor de 'username' desde la solicitud POST
            data = request.get_json()
            bien="Bienvenido"
            username = data.get('username')
            print(username)
            # Modifica el contenido del archivo respuestacons.json con el valor de 'username'
            with open('respuestacons.json', 'r') as file:
                respuestacons_data = json.load(file)

            # Modifica el campo 'answer' con el valor de 'username'
            respuestacons_data['answer'] = bien
            TextToSpeech(text=username, lang= 'es')
            with open('respuestacons.json', 'w') as file:
                json.dump(respuestacons_data, file)

            return jsonify({'success': True, 'message': 'Username actualizado correctamente.'})

        except Exception as e:
            logging.error(f'Error en la solicitud POST: {str(e)}')
            return jsonify({'error': str(e)}), 500
if __name__ == '__main__':
    # json_modificado = False  # Inicializa json_modificado a False
    # actualizar_json_thread = threading.Thread(target=actualizar_json_esperando)
    # actualizar_json_thread.daemon = True
    # actualizar_json_thread.start()
    app.run(debug=True)
