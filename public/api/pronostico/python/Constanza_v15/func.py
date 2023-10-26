#Mongo BD
import pymongo
from pymongo import MongoClient
#Torch
import torch
import yaml
import json
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
import inspect
import requests
from collections import Counter

#
import pandas as pd
import numpy as np

#
import json
import time
from unidecode import unidecode

#cargar archivos de config
with open("config.yaml", "r") as f:
    config = yaml.safe_load(f)
#
#--------------------------------------------------------------------------------------------------------
#--------------------------------------------------------------------------------------------------------
#***************************          Funciones elementales            **********************************   
#---------------------------------------------------------------------------------------------------------
#--------------------------------------------------------------------------------------------------------
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
    if inferencia['score'] >= 0.35: #Debe de mantenerce esta condicion.
        if 'cmd' in answer:
            if answer == 'cmd32':
                res = 'hola'
                return res
        else:
            return inferencia['answer']
        '''
        elif 'cantidad_alimento_comprado' in answer:
            return cantidad_alimento_comprado(tipo_alimento = 'Maíz', mes_inicial = '1', mes_final ='2' )
        elif 'gastos_kg' in answer:
            return gastos_kg(num_ciclos=int(5))
        '''
    else:
        answer = 'Sorry, I did not understand what you meant. highest score:'+ f' {score:.2f} '   
        return answer
    
    # if inferencia['score'] >= 0.35:
    #     if 'cmd' in answer:
    #         if answer == 'cmd32':
    #             res = 'hola'
    #             return res 
    #     elif 'cantidad_alimento_comprado' in answer:
    #         return cantidad_alimento_comprado(tipo_alimento = 'Maíz', mes_inicial = '1', mes_final ='2' )
    #     elif 'gastos_kg' in answer:
    #         return gastos_kg(num_ciclos=int(5))
    # else:
    #     answer = 'Sorry, I did not understand what you meant. highest score:'+ f' {score:.2f} '   
    #     return answer
#---------------------------------------------------------------------------------------------------------
def obtener_parametros(funcion):
    parametros_funcion = inspect.signature(funcion).parameters

    dicc_var ={}
    # dicc_var.update({"Nombre_funcion":str(funcion.__name__)})
    for nombre, parametro in parametros_funcion.items():
        tipo = parametro.annotation if parametro.annotation != inspect.Parameter.empty else str(parametro.default.__class__)
        dicc_var.update({nombre: str(tipo)})
    
    nombre_archivo = "requisitos_2.json"
    # Guardar el diccionario en un archivo JSON
    with open(nombre_archivo, "w") as archivo_json:
        json.dump(dicc_var, archivo_json)

###
'''
Ejecuta la funcion junto a sus parametros que entran a la funcion.
Parm:
    func = Nombre de la funcion.
    json = Parametros de la funcion
Return
    Respuesta que devuelve la funcion que se ejecuta.
'''
# def ejecutar_funcion(func, json):
#     # print('entro al eval')
#     # res = eval(func)(json)
#     res = func(**json)
    
#     return res

def ejecutar_funcion(funcion, parametros):
    try:
        resultado = funcion(**parametros)
        return resultado
    except Exception as e:
        return f"Error al ejecutar la función: {str(e)}"
####


def respuesta_audio(question: str, respuesta_larga: dict):
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
#recubir ek nombre de una funcion y regresar un json con los parametros
###
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
    return(tts.save('respuesta.mp3'), answer['answer'])


#--------------------------------------------------------------------------------------------------------
#---------------------------------------------------------------------------------------------------------
def parsear_fecha(fecha: str) -> datetime.datetime:
    '''
    Esta función realiza el parse de un string de una fecha en formato "%Y-%m-%d" a un objeto de tipo datetime.datetime.

    ## Argumentos

    `fecha (str)`: string de una fecha en formato "%Y-%m-%d".

    ## Retornos

    `fecha (datetime.datetime)`: objeto datetime.datetime que representa la fecha indicada en el string de argumento.
    '''

    return datetime.datetime.strptime(fecha,"%Y-%m-%d")


def cantidad_alimento_comprado( tipo_alimento: str, mes_inicial: str, mes_final: str ):
    """
    json_config: dict
    tipo_alimento: str, mes_inicial: str, mes_final: str 
    Cuanto he gastado en alimento, tazado a los ultimos 6 meses
    """
    print('ejecutando')
    total_kg  = 0
    inversion = 0
    total_sales = 0
    proveedores = []
    
    with MongoClient(config['connection_url']) as client:
        db = client['C3_LaPurisima']
        user_collection = db['ComMP']
        #busqueda 
        query = {'Item_Name': tipo_alimento }
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
    

#-----------------------------------------------------------------------------


def automatic_json(json_file = 'output2.json'):
    with open('output2.json', 'r') as f:
        data = json.load(f)
    # Crear un diccionario para almacenar los kg consumidos por día
    consumo_por_dia = {}
    # Fechas
    fechas = [parsear_fecha(fecha) for fecha in data['fechas']]
    #extrae la informacion saliente del pronostico
    
    # Kg
    kg = data['alimento']['kg']
    for tipo in kg.keys():
        for tA in kg[tipo].keys():
            total = None
            for etapa in kg[tipo][tA].keys():
                if total is None:
                    total = np.array(kg[tipo][tA][etapa])
                else:
                    total += np.array(kg[tipo][tA][etapa])

            # Agregar los datos al diccionario consumo_por_dia
            for i, fecha in enumerate(fechas):
                dia = fecha.strftime("%Y-%m-%d")
                if dia not in consumo_por_dia:
                    consumo_por_dia[dia] = {}
                if tA not in consumo_por_dia[dia]:
                    consumo_por_dia[dia][tA] = 0
                consumo_por_dia[dia][tA] += total[i]

    # Convertir el diccionario a formato JSON
    json_consumo_por_dia = json.dumps(consumo_por_dia, indent=4)
    # Guardar el JSON en un archivo
    with open('consumo_por_dia.json', 'w') as output_file:
        output_file.write(json_consumo_por_dia)
    print('done')

def convertir_json():
    totales_acumulados = {}
    day_count = 0
    total_kg = 0
    areas = ['A', 'GV', 'MV', 'ML']
    # Opening JSON file
    f = open('consumo_por_dia.json')
    data = json.load(f)
    for key, value in data.items():
        day_count += 1
        suma_diaria = 0
        for key, val in value.items():
            if key in areas:
                suma_diaria += val

        total_kg += suma_diaria
        totales_acumulados.update({day_count:total_kg})

    return totales_acumulados

def conteo_zonas():
    total_zonas = []

    with MongoClient(config['connection_url']) as client:
        db = client['C3_LaPurisima']
        user_collection = db['Cerdos']
        query = {}
        cursor = user_collection.find(query)
        try:
            for doc in cursor:
                total_zonas.append((doc['status']))
                a = { i: total_zonas.count(i) for i in set(total_zonas)}
        except Exception as e:
            print(e)
    return(a)

#automatic_json()

def gastos_kg(num_ciclos: int()):
    automatic_json()
    #realizando simulacion
    totales_acumulados = convertir_json()
    print('realizando simulacion')
    cerdos_por_zona = conteo_zonas()
    print('contando cerditos')
    print(cerdos_por_zona)
    cerdos_cuarentena = cerdos_por_zona['Bautizo'] #Cuarentena
    dias_totales = 150*num_ciclos
    print(dias_totales)
    consumo_total = totales_acumulados.get(dias_totales)
    return{'total food consumed (kg)': round(consumo_total),
           'total pigs': cerdos_cuarentena,
           'days': dias_totales
    }


def Conteo_Cerdos(Ubicacion: str, Fecha: str ):
    AnalisisDia = {}
    AnalisisDia["Tipo"]={}
    AnalisisDia["Ubicacion"] = {}

    with MongoClient(config['connection_url']) as client:
        db = client['C3_LaPurisima']
        simulacion = config['table_name_simulacion']
        collection = db[simulacion]
        query = {Fecha: {"$exists": True}}
        cursor = collection.find(query)
        try:
            for doc in cursor:
                UbicCerdo = doc[Fecha]["Ubicacion"]
                TipoCerdo = doc[Fecha]["Tipo"]
                if UbicCerdo in AnalisisDia["Ubicacion"]:
                    AnalisisDia["Ubicacion"][UbicCerdo] +=1
                else:
                    AnalisisDia["Ubicacion"][UbicCerdo] = 1

                if TipoCerdo in AnalisisDia["Tipo"]:
                    AnalisisDia["Tipo"][TipoCerdo] +=1
                else:
                    AnalisisDia["Tipo"][TipoCerdo] = 1
        except Exception as e:
                print(e)
                
    DiccioGeneral  = {}
    for dict in AnalisisDia.values():
        DiccioGeneral.update(dict)


    return DiccioGeneral

def leer_senal():
    with open('senal.json', 'r') as senal_file:
        data = json.load(senal_file)
        return data['senal']

def Sistema_Experto():
    signal_data = {"senal": False}
    data = {
        "Pregunta": "",
    }
    with open('senal.json', 'w') as signal_file:
        json.dump(signal_data, signal_file)
    sysExpActivate = True
    print('Welcome to operations manual!')
    cargar={}
    cargar.update({"answer": "Welcome to operations manual!"})
    with open("respuesta.json", "w") as archivo_json:
            json.dump(cargar, archivo_json)
    # Abrir el archivo fuera del bucle
    with open('requisitos_2.json', 'w') as json_file:
        json.dump(data, json_file, indent=4)

    while sysExpActivate:
        print("What would you like to know about the operations manual?")
        cargar.update({"answer": "What would you like to know about the operations manual?"})
        with open("respuesta.json", "w") as archivo_json:
            json.dump(cargar, archivo_json)
        senal = leer_senal()
        if senal:
            with open('requisitos_2.json', 'r') as j:
                json_res = json.load(j)
            option = json_res.get("Pregunta", "")
            if option == 'Stop consulting operations manual':
                sysExpActivate = False
                print('Very well!')
                cargar.update({"answer": "Sistema Experto Fuera de linea"})
                with open("respuesta.json", "w") as archivo_json:
                    json.dump(cargar, archivo_json)
                return "Sistema Experto Fuera de línea"
            else:
                print(option)
                url = os.environ.get('URL_SERVER')
                question = {"Question": option}
                response = requests.post(url, json=question)
                if response.status_code == 200:
                    res = response.json()
                    cleaned_answer = unidecode(res["answer"].replace("\n", ""))
                    print ("respuesta", res)
                    print ("respuesta limpia", cleaned_answer)
                    return cleaned_answer
        else:
            print('...')
        time.sleep(5)