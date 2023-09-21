#Mongo BD
import pymongo
from pymongo import MongoClient
#Torch
import torch
import yaml
#model Google Text to Speech
from gtts import gTTS
from gtts.tokenizer import pre_processors
import gtts.tokenizer.symbols
import gtts 
#Transformers
from transformers import pipeline
#Haystack
from haystack.document_stores import InMemoryDocumentStore, ElasticsearchDocumentStore
from haystack.nodes import EmbeddingRetriever
from haystack.pipelines import FAQPipeline
#
import os
import datetime
#
import pandas as pd
#cargar archivos de config
with open("config.yaml", "r") as f:
    config = yaml.safe_load(f)

#
#---------------------------------------------------------------------------------------------------------



def obtener_preguntas(retriever):
    """
    Obtiene la peticion
    """
    # Get dataframe with columns "question", "answer" and some custom metadata
    df = pd.read_csv(config['questions_dir']) 
    # Minimal cleaning
    df.fillna(value="", inplace=True)
    df["question"] = df["question"].apply(lambda x: x.strip())

    # Create embeddings for our questions from the FAQs
    # In contrast to most other search use cases, we don't create the embeddings here from the content of our documents,
    # but rather from the additional text field "question" as we want to match "incoming question" <-> "stored question".
    questions = list(df["question"].values)
    df["embedding"] = retriever.embed_queries(queries=questions).tolist()
    df = df.rename(columns={"question": "content"})

    # Convert Dataframe to list of dicts and index them in our DocumentStore
    docs_to_index = df.to_dict(orient="records")

    return docs_to_index
#---------------------------------------------------------------------------------------------------------



def obtener_inferencia(pregunta, pipe):
    return pipe.run(
        query=pregunta, 
        params={"Retriever": {"top_k": 1}} #se muestra la respuesta con mayor compatibilidad
    )
#---------------------------------------------------------------------------------------------------------


def obtener_respuesta(inferencia):
    inferencia = inferencia['answers'][0].__dict__
    score = inferencia['score']
    answer = inferencia['answer']

    if inferencia['score'] >= 0.35:
        if 'cmd' in answer:
            if answer == 'cmd32':
                res = 'hola'
                return res 
        elif 'cantidad_alimento_comprado' in answer:
            return cantidad_alimento_comprado(tipo_alimento = "Maíz", mes_inicial = "1", mes_final = "2" )
        return answer
    else:
        answer = 'Sorry, I did not understand what you meant. highest score:'+ f' {score:.2f} '   
        return answer
#---------------------------------------------------------------------------------------------------------



def respuesta_audio(question= str, respuesta_larga= dict):
    """
        pregunta algo, te responde desde base de datos
    """
    model= config['ModelQuestionAnswering']
    qa_model = pipeline("question-answering", model=model)
    
    context_preprocces = respuesta_larga
    context = str(context_preprocces)

    answer = qa_model( model= model, question = question, context = context)
    tts = gTTS(answer['answer'] , lang='en')
    return(tts.save('respuesta.mp3'), answer['answer'])
#---------------------------------------------------------------------------------------------------------
def obtener_argumentos_y_aplicar(funcion):
    print(funcion.__code__.co_varnames)
    num_args = funcion.__code__.co_argcount
    args = []

    for i in range(num_args):
        arg = input(f"Ingrese el argumento {i + 1}: ")
        args.append(arg)

    return funcion(*args)
#---------------------------------------------------------------------------------------------------------


def respuesta_audio(question:str, respuesta_larga: dict):
    """
        pregunta algo, te responde desde base de datos
    """
    model= "distilbert-base-cased-distilled-squad"
    qa_model = pipeline("question-answering", model=model)
    
    context_preprocces = respuesta_larga
    context = str(context_preprocces)

    answer = qa_model( model= model, question = question, context = context)
    # Text2Speech generation
    tts = gTTS(answer['answer'] , lang='en')
    #   Save converted audio as mp3 format
    #print(answer['answer'])
    #return(tts.save('respuesta.mp3'))
    return(tts.save('respuesta.mp3'), answer['answer'])
#---------------------------------------------------------------------------------------------------------



def cantidad_alimento_comprado(tipo_alimento: str, mes_inicial: str, mes_final: str ):
    """
    Cuanto he gastado en alimento, tazado a los ultimos 6 meses
    """
    #print(tipo_alimento, mes_inicial, mes_final)
    total_kg  = 0
    inversion = 0
    total_sales = 0
    proveedores = []
    
    with MongoClient(config['connection_url']) as client:
        db = client['C3_LaPurisima']
        user_collection = db['ComMP']
        #busqueda 
        query = {'Item_Name':  tipo_alimento}
        cursor = user_collection.find(query)
        try:
            for doc in cursor:
                total_sales += 1
                total_kg += float(doc['UniCompra'])*float(doc['Pur_ConvFactor'])
                inversion += float(doc['SumadeImportePartida'].replace(",","").replace("$","")) 
                proveedor = doc['PO_Name']
                proveedores.append(proveedor)
        except Exception as e:
                print(e)
    #print(proveedores)
    conteo_proveedores = { i: proveedores.count(i) for i in set(proveedores)}
    total_proveedores_dif = len(set(proveedores))
    #salidas
    return {
        'Product': tipo_alimento,
        'Total tons purchased': round(total_kg/1000, 3),
        'Total quantity': total_sales,
        'Total cost': round(inversion, 3),
        'list of suppliers': conteo_proveedores,
        'Total diferent suppliers': total_proveedores_dif
        }
    

