from haystack.document_stores import InMemoryDocumentStore, ElasticsearchDocumentStore
from haystack.nodes import EmbeddingRetriever
from haystack.pipelines import FAQPipeline
from func import * #obtener_preguntas, obtener_inferencia, obtener_respuesta,obtener_parametros,  respuesta_audio
import yaml
import sys
import inspect
import json
import time

#--- Carga el archivo .env ---#
from dotenv import load_dotenv
dotenv_file_path = os.path.join(os.path.dirname(__file__), '.env')
if os.path.exists(dotenv_file_path):
    load_dotenv(dotenv_file_path)

#--- Leer archivo config ---#
with open("config.yaml", "r") as f:
    config = yaml.safe_load(f)

# ---- Creacion del pipeline de Pregunta Respuesta ---- #
document_store = InMemoryDocumentStore()

retriever = EmbeddingRetriever(document_store=document_store,embedding_model=config['ModelEmbeddingRetriever'], 
                               use_gpu=True,scale_score=True, progress_bar=False)
pipe = FAQPipeline(retriever=retriever)
preguntas = obtener_preguntas(retriever)
document_store.write_documents(preguntas)
# --- Implementacion --- #
more_question = True


print('Question:')
question = sys.argv[1] #solicitar pregunta
print(question)
inferencia = obtener_inferencia(question, pipe)
funcion_respuesta = obtener_respuesta(inferencia)
obtener_parametros(eval(funcion_respuesta))
print('diccionario generado')
print("listo?")
cargar = {}
cargar.update({"answer": "Puedes Abrir el cuestionario"})
with open("respuesta.json", "w") as archivo_json:
    json.dump(cargar, archivo_json)

def leer_senal():
    with open('senal.json', 'r') as senal_file:
        data = json.load(senal_file)
        return data['senal']
while True:
    senal = leer_senal()
    #resp= input()
    if senal:
        print('ejecutando')
        cargar = {}
        cargar.update({"answer": "Pensando.."})
        with open("respuesta.json", "w") as archivo_json:
            json.dump(cargar, archivo_json)
        with open('requisitos_2.json', 'r') as j:
            json_res = json.load(j)
            print(json_res)

        respuesta_larga = ejecutar_funcion(eval(funcion_respuesta), json_res )
        print(respuesta_larga)
        audio_resp, text  = respuesta_audio(question,respuesta_larga)
        print('Answer:', text)
        response = {}
        response.update({"answer": text})
        with open("respuesta.json", "w") as archivo_json:
            json.dump(response,archivo_json)
        break
    else:
        print('...')
    time.sleep(5)
