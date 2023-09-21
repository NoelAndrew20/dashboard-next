from haystack.document_stores import InMemoryDocumentStore, ElasticsearchDocumentStore
from haystack.nodes import EmbeddingRetriever
from haystack.pipelines import FAQPipeline
from func import obtener_preguntas, obtener_inferencia, obtener_respuesta,obtener_argumentos_y_aplicar,  respuesta_audio
import yaml
import sys
import json
import requests

api_url = "http://localhost:5000/api/pronostico/python/Constanza_estable/apichat"

#--- Leer archivo config ---#
with open("config.yaml", "r") as f:
    config = yaml.safe_load(f)

# ---- Creacion del pipeline de Pregunta Respuesta ---- #
document_store = ElasticsearchDocumentStore()
retriever = EmbeddingRetriever(document_store=document_store,embedding_model=config['ModelEmbeddingRetriever'], 
                               use_gpu=True,scale_score=False, progress_bar=False)
pipe = FAQPipeline(retriever=retriever)
preguntas = obtener_preguntas(retriever)
document_store.write_documents(preguntas)
# --- Implementacion --- #



print('Question:')
question = sys.argv[1]
# question = input() #solicitar pregunta
inferencia = obtener_inferencia(question, pipe)
respuesta_larga = obtener_respuesta(inferencia)
#respuesta_larga = obtener_argumentos_y_aplicar(function_indicada)
audio_resp, text  = respuesta_audio(question,respuesta_larga)
print('Answer:', text)
response = {}
response.update({"answer": text})
with open("respuesta.json", "w") as archivo_json:
    json.dump(response,archivo_json)
sys.exit()



# def process_text(text, choice):
#     try:
#         if choice == '1':
#             # Voltea la frase
#             reversed_text = text[::-1]
#             return f"Resultado de voltear la frase: {reversed_text}"
#         elif choice == '2':
#             # Imprime las primeras 5 letras
#             first_five_letters = text[:5]
#             return f"Resultado de imprimir las primeras 5 letras: {first_five_letters}"
#         else:
#             return "Selección no válida"
#     except Exception as e:
#         return f"Error: {str(e)}"

# if __name__ == '__main__':
#     text = input("Ingresa un texto: ")
#     choice = input("Ingresa 1 para voltear la frase o 2 para imprimir las primeras 5 letras: ")
#     result = process_text(text, choice)
#     print(result)

# from haystack.document_stores import InMemoryDocumentStore, ElasticsearchDocumentStore
# from haystack.nodes import EmbeddingRetriever
# from haystack.pipelines import FAQPipeline
# from func import obtener_preguntas, obtener_inferencia, obtener_respuesta,obtener_argumentos_y_aplicar,  respuesta_audio
# import yaml
# import sys
# import json
# import requests

# api_url = "http://localhost:5000/api/pronostico/python/Constanza_estable/apichat"

# #--- Leer archivo config ---#
# with open("config.yaml", "r") as f:
#     config = yaml.safe_load(f)

# # ---- Creacion del pipeline de Pregunta Respuesta ---- #
# document_store = ElasticsearchDocumentStore()
# retriever = EmbeddingRetriever(document_store=document_store,embedding_model=config['ModelEmbeddingRetriever'], 
#                                use_gpu=True,scale_score=False, progress_bar=False)
# pipe = FAQPipeline(retriever=retriever)
# preguntas = obtener_preguntas(retriever)
# document_store.write_documents(preguntas)
# # --- Implementacion --- #



# print('Question:')
# question = sys.argv[1]
# # question = input() #solicitar pregunta
# inferencia = obtener_inferencia(question, pipe)
# function_indicada = obtener_respuesta(inferencia)
# #respuesta_larga = obtener_argumentos_y_aplicar(function_indicada)
# audio_resp, text  = respuesta_audio(question,respuesta_larga)
# print('Answer:', text)
# response = {}
# response.update({"answer": text})
# with open("respuesta.json", "w") as archivo_json:
#     json.dump(response,archivo_json)
# sys.exit()
