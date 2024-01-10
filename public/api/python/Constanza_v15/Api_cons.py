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
                cargar = {"answer": "Pensando.."}
                if question:
                    print (question)
                    translated = GoogleTranslator(source='auto',target= 'es').translate(question)
                    question = translated
                    print (token)
                    question_json={"Text":question}
                    print("questionjson=",question_json)
                    cons_state={"answer":"Pensando.."}