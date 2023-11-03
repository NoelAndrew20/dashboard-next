from pymongo import MongoClient
import os
import json
import datetime 
import random
from concurrent.futures import ThreadPoolExecutor, ProcessPoolExecutor
import multiprocessing
import time
#


def ModificarGuardarExpediente(RFID:str):
    with open(f"Expedientes/{RFID}/Expediente.json", "r") as archivo:
        Expediente = json.load(archivo)

    ExpedienteAjustado = {}
    ExpedienteAjustado["RFID"] = RFID
    for dia in Expediente[RFID].keys():
        Registros = Expediente[RFID][dia]
        
        if dia == "Dia 1":
            
            PrimerFecha = Registros["FechaRegistro"]
            PrimerFecha = datetime.datetime.strptime(PrimerFecha, "%d-%m-%Y %H:%M:%S" )
            FechaCorrecta = PrimerFecha.strftime("%d-%m-%Y")
            ExpedienteAjustado[FechaCorrecta]= {}
            ExpedienteAjustado[FechaCorrecta]['Tipo']= Registros['Tipo'] 
            ExpedienteAjustado[FechaCorrecta]['Estado']= Registros['Estado']
            ExpedienteAjustado[FechaCorrecta]['Granja']= Registros['Granja']
            ExpedienteAjustado[FechaCorrecta]['Ubicacion']= Registros['Ubicacion']
            ExpedienteAjustado[FechaCorrecta]['DiasEnArea']= Registros['DiasEnArea']
            ExpedienteAjustado[FechaCorrecta]['Alimento']= Registros['Alimento']
            ExpedienteAjustado[FechaCorrecta]['Padecimientos']= Registros['Padecimientos']
            ExpedienteAjustado[FechaCorrecta]['Medicamento']= Registros['Medicamento']
        else:
            ExpedienteAjustado[Expediente[RFID][dia]['FechaRegistro']]= {}
        
            ExpedienteAjustado[Expediente[RFID][dia]['FechaRegistro']]['Tipo']= Registros['Tipo'] 
            ExpedienteAjustado[Expediente[RFID][dia]['FechaRegistro']]['Estado']= Registros['Estado']
            ExpedienteAjustado[Expediente[RFID][dia]['FechaRegistro']]['Granja']= Registros['Granja']
            ExpedienteAjustado[Expediente[RFID][dia]['FechaRegistro']]['Ubicacion']= Registros['Ubicacion']
            ExpedienteAjustado[Expediente[RFID][dia]['FechaRegistro']]['DiasEnArea']= Registros['DiasEnArea']
            ExpedienteAjustado[Expediente[RFID][dia]['FechaRegistro']]['Alimento']= Registros['Alimento']
            ExpedienteAjustado[Expediente[RFID][dia]['FechaRegistro']]['Padecimientos']= Registros['Padecimientos']
            ExpedienteAjustado[Expediente[RFID][dia]['FechaRegistro']]['Medicamento']= Registros['Medicamento']


    # Guarda el diccionario en un archivo JSON
    direccion = f"Expedientes/{RFID}/ExpedienteModificado"
    with open(direccion, "w") as archivo:
        json.dump(ExpedienteAjustado, archivo, indent=4)
    
    """   with open(f'Expedientes/{RFID}/ExpedienteModificado', 'r') as f:
        data = json.load(f)
    """
    with MongoClient(connection_uri) as client:
        db = client['C3_LaPurisima']
        user_collection = db[table_name]
        user_collection.insert_one(ExpedienteAjustado)

if __name__ == '__main__':
    tiempo_inicio = time.time()
    connection_uri = f"mongodb://pigpig:0iEF&C84k4gqe&d&2D38%5EtNb&xln6d03hXLOGAcbY0LeRGUlGj@192.168.100.10:27017/"
    db_name = 'C3_LaPurisima'
    table_name = 'Pedro'

    client = MongoClient(connection_uri)  
    db = client[db_name]  
    user_collection = db[table_name]  
    #borra el contenido.
    print("borrando el contenido ")
    user_collection.delete_many({})

    carpeta_padre = "Expedientes"
    nombres_carpetas = [nombre for nombre in os.listdir(carpeta_padre) if os.path.isdir(os.path.join(carpeta_padre, nombre))]

    with ThreadPoolExecutor() as pool:
          pool.map(ModificarGuardarExpediente, nombres_carpetas)
    tiempo_fin = time.time()
    print(f" Registrar {len(nombres_carpetas)} cerdos, usando {multiprocessing.cpu_count()} nucleos requiere de {tiempo_fin-tiempo_inicio} segundos")

    



#RFID_selec = random.choice(nombres_carpetas)

