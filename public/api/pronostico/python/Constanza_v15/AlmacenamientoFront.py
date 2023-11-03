import pymongo
from pymongo import MongoClient
import yaml 
import json
from collections import Counter
from datetime import datetime
from concurrent.futures import ThreadPoolExecutor, ProcessPoolExecutor
from tqdm import tqdm
import time 
from bson import json_util

with open("config.yaml", "r") as f:
    config = yaml.safe_load(f)


Fecha = "02-10-2024"
with MongoClient(config['connection_url']) as client:
            db = client['C3_LaPurisima']
            simulacion = config['SimulacionGranja']
            collection = db[simulacion]
            documents = list(collection.find())


del documents[0]["_id"]
Datos = documents[0]
NewDatos = []
Fechas = list(Datos.keys())

for fecha in range(len(Fechas)):
    a = Datos[Fechas[fecha]]
    a.update({"Fecha": Fechas[fecha]})
    NewDatos.append(a)

direccion = "SimulacionAjustada.json"
with open(direccion, "w") as archivo:
    json.dump(NewDatos, archivo, indent=4)

connection_uri = config["connection_url"]
db_name = 'C3_LaPurisima'
table_name = config['simulacionFront']

client = MongoClient(connection_uri)  
db = client[db_name]  
user_collection = db[table_name]  
#borra el contenido.
print("borrando el contenido ")
user_collection.delete_many({})


with MongoClient(config['connection_url']) as client:
            db = client['C3_LaPurisima']
            simulacion = config['simulacionFront']
            collection = db[simulacion]
            
            collection.insert_many(NewDatos)



           