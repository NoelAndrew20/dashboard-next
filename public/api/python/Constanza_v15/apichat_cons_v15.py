from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess
import json
import os
import logging
import threading
import time
from gtts import gTTS
from gtts.tokenizer import pre_processors
import gtts.tokenizer.symbols
from deep_translator import GoogleTranslator
from stable import * 
import requests

logging.basicConfig(level=logging.DEBUG)

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})
contador_activo = False
contador_thread = None 
respuestas_por_token = {}
chat_pig_token = {}

@app.route('/api/python/Constanza_v15/apichat_cons_v15', methods=['POST'])
def api_chat():
    global json_modificado
    json_modificado = False


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
                token = data.get('token')
                signal_data = {}
                # signal_data = {"senal": False}
                print('Pregunta recibida en la API:', question)
                cargar = {}
                cargar.update({"answer": "Pensando.."})
                with open("respuesta.json", "w") as archivo_json:
                    json.dump(cargar, archivo_json)
                # with open("senal.json", "w") as archivo_json:
                #     json.dump(signal_data, archivo_json)
                if question:
                    #environment_name = 'C_stable_v1_2'
                    #activate_env_cmd = f'activate {environment_name} &&'

                    # script_name = 'stable.py'
                    # run_script_cmd = f'python {script_name} "{question}" '

                    # result = subprocess.run(run_script_cmd)
                    # script_output = result.stdout
                    # resultado = principal(question)
                    
                    print (question)
                    translated = GoogleTranslator(source='auto',target= 'es').translate(question)
                    question = translated
                    print (token)
                    question_json={"Text":question}
                    print("questionjson=",question_json)
                    cons_state={"answer":"Pensando.."}
                    with open("respuesta.json", "w") as archivo_json:
                        json.dump(cons_state, archivo_json)
                    if question.lower() == "no":
                        signal_data = {"senal": False}
                        with open("senal.json", "w") as archivo_json:
                            json.dump(signal_data, archivo_json)
                            json_response={"result":"Entendido"}
                            print(json_response)
                    else:
                        with open("senal.json", "r") as archivo_json:
                            signal_data = json.load(archivo_json)
                        if signal_data.get("senal"):
                            print (question)
                            question_json={"result":{'answer': '', 'function': 'Chatpig', 'parameters': {"text_question":question}}}
                            print("questionjson=  ",question_json)
                            jsonaa = requests.post(os.environ.get("URL_RESPONDS"),json=question_json)
                            print('Resultado', jsonaa.json())
                            json_response = jsonaa.json()
                            json_respuesta=json_response.get("answer",{})
                            json_response={'result':json_respuesta.get("answer",{})}
                            print("json filtrado",json_response)
                            jsonrespuesta=json_response
                        else:
                            print("La señal no es True")
                            jsonaa = requests.post(os.environ.get("URL_constanza_listens"),json=question_json)
                            print('Resultado 1 impresion', jsonaa.json())
                            json_response = jsonaa.json()
                            print(json_response)
                            print(signal_data.keys())
                            if "result" in json_response and "function" in json_response["result"]:
                                print("entra en el if")
                                if 'Chatpig' in json_response["result"]["function"] or signal_data.get("senal") is True:
                                        print("Manual de operaciones")
                                        cargar = {}
                                        cargar.update({"answer": "Claro consultando " + json_response["result"]["function"]})
                                        with open("respuesta.json", "w") as archivo_json:
                                            json.dump(cargar, archivo_json)
                                        signal_data = {"senal": True}
                                        with open("senal.json", "w") as archivo_json:
                                            json.dump(signal_data, archivo_json)
                                        with open("senal.json", "r") as archivo_json:
                                                signal_data = json.load(archivo_json)
                                elif 'AltaProveedores' in json_response["result"]["function"]:
                                        json_response = jsonaa.json()
                                        print(f'Valor de "function": {json_response["result"]["function"]}')
                                        if json_response["result"]["function"] == 'AltaProveedores':
                                            func={"function": "AltaProveedores"}
                                        with open("senal_cons.json", "w") as archivo_json:
                                                json.dump(func, archivo_json)
                            else:
                                if signal_data["senal"] is False:
                                        print("Constan normal")
                                        func={"function": ""}
                                        cons_state={"answer":"Pensando.."}
                                        with open("respuesta.json", "w") as archivo_json:
                                            json.dump(cons_state, archivo_json)
                                        with open("senal_cons.json", "w") as archivo_json:
                                            json.dump(func, archivo_json)
                                        # jsonaa = requests.post(os.environ.get("URL_constanza_listens"),json=question_json)
                                        print('Resultado 2 impresion', jsonaa.json())
                                        json_response = jsonaa.json()
                                        # print(f'Valor de "function": {json_response["result"]["function"]}')
                                        # if json_response["result"]["function"] == 'AltaProveedores':
                                        #     func={"function": "AltaProveedores"}
                                        # with open("senal_cons.json", "w") as archivo_json:
                                        #         json.dump(func, archivo_json)
                                        signal_data = {"senal": False}
                                        with open("senal.json", "w") as archivo_json:
                                            json.dump(signal_data, archivo_json)
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
                                                with open("senal.json", "w") as archivo_json:
                                                    json.dump(signal_data, archivo_json)
                    cargar = {}
                    cargar.update({"answer": "Esperando"})
                    with open("respuesta.json", "w") as archivo_json:
                        json.dump(cargar, archivo_json)
                    print("1",json_response)
                    jsonrespuesta=json_response.get('result')  
                    status_code = json_response.get('status_code', 200)
                    respuestas_por_token[token] = {'respuesta': jsonrespuesta, 'status_code': status_code}
                    with open("respuesta_servidor.json", "w") as archivo_json:
                        json.dump(json_response, archivo_json)
                    if 'result' in json_response and 'function' in json_response['result']:
                        if 'Chatpig' in json_response['result']['function']:
                            formatted_response = json_response['result']['answer']
                        elif 'AltaProveedores' in json_response['result']['function']:
                            formatted_response = json_response['result']['answer']
                        else:
                            formatted_response = str(json_response.get('result', ''))
                    else:
                        formatted_response = str(json_response.get('result', ''))  
                        TextToSpeech(formatted_response,'pt','com')
                    return jsonify({"resultado": formatted_response})
                else:
                    return jsonify({"error": "Texto no proporcionado en la solicitud"}), 400
            except Exception as e:
                print(f"Error en la API: {str(e)}")
                return jsonify({"error": str(e),"resultado": "No te entendí"}), 500

def TextToSpeech(text:str, lang:str, tld:str):
    tts = gTTS(text, lang = lang, tld = tld)
    tts.save('respuesta.mp3')
    print("mp3 hecho")
    return jsonify({"estado_mp3": "mp3_hecho"})

@app.route('/api/python/Constanza_v15/respuesta.mp3', methods=['POST'])
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
            data = request.get_json()
            
            username = data.get('username')
            print(username)
            text = "Hola y bienvenido a Constanza IA"+ username
            tts = gTTS(text=text , lang='pt', tld='com')
            tts.save('Bienvenida.mp3')
            cargar = {"answer": "Esperando"}
            with open("respuesta.json", "w") as archivo_json:
                json.dump(cargar, archivo_json)
            return jsonify({'message': 'MP3 modified successfully'}), 200
        except Exception as e:
            logging.error(f'Error en la solicitud POST: {str(e)}')
            return jsonify({'error': str(e)}), 500
        
@app.route('/api/python/Constanza_v15/usuario', methods=['POST'])
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
            TextToSpeech(text=username, lang= 'es', tld= 'com.br')
            with open('respuestacons.json', 'w') as file:
                json.dump(respuestacons_data, file)

            return jsonify({'success': True, 'message': 'Username actualizado correctamente.'})

        except Exception as e:
            logging.error(f'Error en la solicitud POST: {str(e)}')
            return jsonify({'error': str(e)}), 500
        
@app.route('/api/enviar-datos', methods=['POST'])
def enviar_datos():
    if request.method == 'OPTIONS':
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        }
        return ('', 204, headers)

    if request.method == 'POST':
        try:
            data = request.get_json()
            datos_para_microservicio = data.get('datos')
            answer = datos_para_microservicio.get('answer')
            function = datos_para_microservicio.get('function')
            parameters = datos_para_microservicio.get('parameters', {})
            path = parameters.get('path')
            nombre_archivo = os.path.basename(path)
            # Puedes realizar cualquier operación adicional con los datos recibidos
            print(f'Answer: {answer}, Function: {function}, Path: {path}')
            ruta_archivos = "/files/" + nombre_archivo
            print("ruta_archivos",ruta_archivos)
            # Envia los datos al microservicio
            microservicio_data = {
                'answer': answer,
                'function': function,
                'parameters': parameters,
            }
            print(ruta_archivos)
            response = requests.post(os.environ.get("URL_RESPONDS"), json=microservicio_data)
            if response.status_code == 200:
                respuesta_microservicio = response.json()
                print('Respuesta del microservicio:', respuesta_microservicio)
                directorio_actual = os.path.dirname(__file__)

                # Ruta del archivo JSON en el mismo directorio que el script
                ruta_archivo_json = os.path.join(directorio_actual, "ConsF.json")

                # Comprobar si el archivo ya existe
                if os.path.exists(ruta_archivo_json):
                    # Si el archivo existe, cargar el contenido actual
                    with open(ruta_archivo_json, "r") as archivo:
                        datos_existente = json.load(archivo)
                else:
                    # Si el archivo no existe, inicializar con un diccionario vacío
                    datos_existente = {}

                # Actualizar o agregar los datos nuevos
                datos_existente.update(respuesta_microservicio)
                    
                    # Guardar el diccionario en el archivo JSON
                with open(ruta_archivo_json, "w") as archivo:
                    json.dump(datos_existente, archivo,indent=4)
                
                print(f"Datos guardados en {ruta_archivo_json}")
                print(f'Respuesta de la API Flask: {jsonify({"success": True, "message": "Datos enviados correctamente al microservicio."})}')
                return jsonify({'success': True, 'message': 'Datos enviados correctamente al microservicio.','Api': respuesta_microservicio})
                #return jsonify({}"Api respuesta",respuesta_microservicio)
            else:
                print(ruta_archivos)
                return jsonify({'error': 'Error al comunicarse con el microservicio.'}), 500

        except Exception as e:
            print(f'Error: {str(e)}')
            return jsonify({'error': str(e)}), 500
if __name__ == '__main__':
    # json_modificado = False  # Inicializa json_modificado a False
    # actualizar_json_thread = threading.Thread(target=actualizar_json_esperando)
    # actualizar_json_thread.daemon = True
    # actualizar_json_thread.start()
    app.run(debug=True,port=5003, host="192.168.100.10")
