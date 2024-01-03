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
                question  = data.get('question')
                token = data.get('token')
                signal_data = {}
                print('Pregunta recibida en la API:', question)
                cargar = {}
                cargar.update({"answer": "Pensando.."})
                with open("respuesta.json", "w") as archivo_json:
                    json.dump(cargar, archivo_json)
                if question:
                    print (question)
                    print (token)
                    question_json={"Text":question}
                    print("questionjson=",question_json)
                    jsonaa = requests.post(os.environ.get("URL_constanza_listens"),json=question_json)
                    print('Resultado 1 impresion', jsonaa.json())
                    if 'Chatpig' in json_response.get("function", ""):
                        chat_pig_token[usuarios] = token
                    if token in chat_pig_token[usuarios]    
                        print("Manual de operaciones para usuarios"+ chat_pig_token[usuario])
                        cargar = {}
                        cargar.update({"answer": "Claro consultando " + json_response.get("function")})
