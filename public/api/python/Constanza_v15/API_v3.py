from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os
import logging
from gtts import gTTS
from gtts.tokenizer import pre_processors
import gtts.tokenizer.symbols
import requests
from deep_translator import GoogleTranslator
from pymongo import MongoClient

logging.basicConfig(level=logging.DEBUG)

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})
client = MongoClient('mongodb://pigpig:0iEF&C84k4gqe&d&2D38%5EtNb&xln6d03hXLOGAcbY0LeRGUlGj@192.168.100.10:27017/')
db = client['Microservicios']
coleccion= db['usuario_solicitud']
solicitud = {
    'token': None,
    'function': None,
    'status': None
}

@app.route('/api/python/Constanza_v15/apichat_cons_v15', methods=['POST'])
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
                question  = data.get('question')
                token = data.get('token')
                signal_data = {}
                solicitud_nueva = solicitud.copy()
                print('Pregunta recibida en la API:', question)
                cargar = {"answer": "Pensando.."}
                if question:
                    print (question)
                    translated = GoogleTranslator(source='auto',target= 'es').translate(question)
                    question = translated
                    print (token)
                    question_json={"Text":question}
                    print("questionjson=",question_json)
                    collection = coneccionDB(client,db,colecccion)
                    jsonaa = requests.post(os.environ.get("URL_constanza_listens"),json=question_json)
                    print(collection)
                    json_response = jsonaa.json()
                    solicitud_nueva['token'] = token
                    solicitud_nueva['function'] =json_response["result"]["function"]
                    solicitud_nueva['token'] = 'espera'
                    usuario = coleccion.insert_one(solicitud_nueva)
                    print("insercion mongo",usuario)
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
                            json_response = jsonaa.json()
                            json_response={'result':json_response.get("answer",{})}
                            print("json filtrado",json_response)
                        else:
                            jsonaa = requests.post(os.environ.get("URL_constanza_listens"),json=question_json)
                            json_response = jsonaa.json()
                            if "result" in json_response and "function" in json_response["result"]:
                                if 'Chatpig' in json_response["result"]["function"] or signal_data.get("senal") is True:
                                    cargar.update({"answer": "Claro consultando " + json_response["result"]["function"]})
                                    signal_data = {"senal": True}
                                    with open("senal.json", "w") as archivo_json:
                                            json.dump(signal_data, archivo_json)
                                elif 'AltaProveedores' in json_response["result"]["function"]:
                                    json_response = jsonaa.json()
                                    print(f'Valor de "function": {json_response["result"]["function"]}')
                                    if json_response["result"]["function"] == 'AltaProveedores':
                                        func={"function": "AltaProveedores"}
                                    with open("senal_cons.json", "w") as archivo_json:
                                            json.dump(func, archivo_json)
                            else:
                                if signal_data["senal"] is False:
                                    func={"function": ""}
                                    with open("senal_cons.json", "w") as archivo_json:
                                        json.dump(func, archivo_json)
                                    json_response = jsonaa.json()
                                    signal_data = {"senal": False}
                                    with open("senal.json", "w") as archivo_json:
                                        json.dump(signal_data, archivo_json)
                                    cargar = {"answer": "Esperando"}
                    cargar = {"answer": "Esperando"}
                    # jsonrespuesta=json_response.get('result')
                    print("respuestafinal",json_response)
                    if 'result' in json_response and 'answer' in json_response['result']:
                        formatted_response = json_response['result']['answer']
                        tts_result = TextToSpeech(formatted_response,'es','com')
                        if tts_result["Estado"]:
                            translated = GoogleTranslator(source='es',target= 'es').translate(formatted_response)
                            formatted_response = translated
                            return jsonify({"resultado": formatted_response, "mensaje": tts_result["message"]})
                        else:
                            translated = GoogleTranslator(source='es',target= 'es').translate(formatted_response)
                            formatted_response = translated
                            return jsonify({"error": tts_result["message"], "resultado": "No te entendí"}), 500
                    else:
                        formatted_response = str(json_response.get('result', ''))  
                        tts_result = TextToSpeech(formatted_response,'es','com')
                        if tts_result["Estado"]:
                            translated = GoogleTranslator(source='es',target= 'es').translate(formatted_response)
                            formatted_response = translated
                            return jsonify({"resultado": formatted_response, "mensaje": tts_result["message"]})
                        else:
                            translated = GoogleTranslator(source='es',target= 'es').translate(formatted_response)
                            formatted_response = translated
                            return jsonify({"error": tts_result["message"], "resultado": "No te entendí"}), 500
                else:
                    return jsonify({"error": "Texto no proporcionado en la solicitud"}), 400
            except Exception as e:
                print(f"Error en la API: {str(e)}")
                tts_result = TextToSpeech("No te entendí",'pt','com')
                return jsonify({"error": str(e),"resultado": "No te entendí"}), 500

def TextToSpeech(text:str, lang:str, tld:str):
    try:
        tts = gTTS(text, lang = lang, tld = tld)
        tts.save('respuesta.mp3')
        print("mp3 hecho")
        return{"Estado": True, "message": "MP3 generado con exito"}
    except Exception as e:
        print(f"Error en la función TextToSpeech: {str(e)}")
        return {"Estado": False, "message": f"Error en TextToSpeech: {str(e)}"}

def coneccionDB(mongo_uri:str,database_name:str,collection_name:str):
    '''Permite realizar una conexion a una colecccion en base de datos'''
    client = MongoClient(mongo_uri)
    db = client[database_name]
    collection = db[collection_name]
    print(f'coneccion exitosa a la coleccion: {database_name}.{collection_name}')
    return collection

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
            signal_data = {"senal": False}
            with open("senal.json", "w") as archivo_json:
                json.dump(signal_data, archivo_json)
            return jsonify({'message': 'MP3 modified successfully'}), 200
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
            print(f'Answer: {answer}, Function: {function}, Path: {path}')
            ruta_archivos = "/home/JocdDev/Documents/A/dashboard-next/pages/api/proveedor/files/" + nombre_archivo
            print("ruta_archivos",ruta_archivos)
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
                ruta_archivo_json = os.path.join(directorio_actual, "ConsF.json")
                if os.path.exists(ruta_archivo_json):
                    with open(ruta_archivo_json, "r") as archivo:
                        datos_existente = json.load(archivo)
                else:
                    datos_existente = {}
                datos_existente.update(respuesta_microservicio)
                with open(ruta_archivo_json, "w") as archivo:
                    json.dump(datos_existente, archivo,indent=4)
                print(f"Datos guardados en {ruta_archivo_json}")
                print(f'Respuesta de la API Flask: {jsonify({"success": True, "message": "Datos enviados correctamente al microservicio."})}')
                return jsonify({'success': True, 'message': 'Datos enviados correctamente al microservicio.','Api': respuesta_microservicio})
            else:
                print(ruta_archivos)
                return jsonify({'error': 'Error al comunicarse con el microservicio.'}), 500
        except Exception as e:
            print(f'Error: {str(e)}')
            return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5002, host="192.168.100.10")