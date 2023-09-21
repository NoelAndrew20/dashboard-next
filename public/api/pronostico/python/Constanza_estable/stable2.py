from haystack.document_stores import InMemoryDocumentStore, ElasticsearchDocumentStore
from haystack.nodes import EmbeddingRetriever
from haystack.pipelines import FAQPipeline
from func import obtener_preguntas, obtener_inferencia, obtener_respuesta,obtener_argumentos_y_aplicar,  respuesta_audio
import yaml
import sys

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
more_question = True
while more_question == True:
    print('Question:')
    question = input() #solicitar pregunta
    inferencia = obtener_inferencia(question, pipe)
    function_indicada = obtener_respuesta(inferencia)
    respuesta_larga = obtener_argumentos_y_aplicar(function_indicada)
    audio_resp, text  = respuesta_audio(question,respuesta_larga)
    print('Answer:', text)
    print('other?: True or False')
    more_question = input()
else:
    sys.exit()