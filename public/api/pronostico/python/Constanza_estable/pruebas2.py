#Mongo BD
import pymongo
from pymongo import MongoClient
import yaml
from transformers import pipeline
from gtts import gTTS
from gtts.tokenizer import pre_processors
import gtts.tokenizer.symbols
import gtts 


with open("config.yaml", "r") as f:
    config = yaml.safe_load(f)
#-----------------------------------------------------------------



#-----------------------------------------------------------------
def cantidad_alimento_comprado(tipo_alimento = str, mes_inicial = str, mes_final =str ):
    """
    Cuanto he gastado en alimento, tazado a los ultimos 6 meses
    """
    total_kg  = 0
    inversion = 0
    total_sales = 0
    proveedores = []
    
    with MongoClient(config['connection_url']) as client:
        db = client['C3_LaPurisima']
        user_collection = db['ComMPEne-Jun2023']
        #busqueda 
        query = {'Item_Name':  tipo_alimento}
        cursor = user_collection.find(query)
        try:
            for doc in cursor:
                total_sales += 1
                total_kg += float(doc['Uni_Compra'])*float(doc['Pur_ConvFactor'])
                inversion += float(doc['SumadeImportePartida'].replace(",","").replace("$","")) 
                proveedor = doc['PO_Name']
                proveedores.append(proveedor)
        except Exception as e:
                print(e)
    
    conteo_proveedores = { i: proveedores.count(i) for i in set(proveedores)}
    total_proveedores_dif = len(set(proveedores))
    #salidas
    return(
        {
        'Product': tipo_alimento,
        'Total tons purchased': round(total_kg/1000, 3),
        'Total quantity': total_sales,
        'Total cost': round(inversion, 3),
        'list of suppliers': conteo_proveedores,
        'Total diferent suppliers': total_proveedores_dif
        }
    )



def respuesta_audio(question= str, respuesta_larga= dict):
    """
        pregunta algo, te responde desde base de datos
    """
    model= config['ModelQuestionAnswering']
    qa_model = pipeline("question-answering", model=model)
    
    context_preprocces = respuesta_larga
    context = str(context_preprocces)

    answer = qa_model( model= model, question = question, context = context)
    # Text2Speech generation
    tts = gTTS(answer['answer'] , lang='en')
    #   Save converted audio as mp3 format
    print(answer['answer'])
    #return(tts.save('respuesta.mp3'))
    return(tts.save('respuesta.mp3'), answer['answer'])


question = input()
respuesta_larga = cantidad_alimento_comprado(tipo_alimento = 'Aceite Acidulado', mes_inicial = '1', mes_final ='2' )


respuesta_audio(question=question, respuesta_larga=respuesta_larga)
