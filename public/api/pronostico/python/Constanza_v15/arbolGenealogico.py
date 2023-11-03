import json
import yaml
import pymongo
from pymongo import MongoClient


with open("config.yaml", "r") as f:
        config = yaml.safe_load(f)

with open('ArbolGenealogico.json', 'r') as archivo_json:
    ArbolGen = json.load(archivo_json)
with open('RFID_cerdosEngorda.json', 'r') as archivo_json:
    RFID_Engorda = json.load(archivo_json)


for RFIDF1 in ArbolGen.keys():
    for parto in ArbolGen[RFIDF1].keys():
        for idcerdo in ArbolGen[RFIDF1][parto]:
            a = RFID_Engorda[idcerdo-1]
            pos = ArbolGen[RFIDF1][parto].index(idcerdo) 
            ArbolGen[RFIDF1][parto][pos] = a

arbolFinal = []

for RFIDF1  in ArbolGen.keys():
    F1Descendencia = {}
    F1Descendencia["RFID"] = RFIDF1
    for parto in ArbolGen[RFIDF1]:
        F1Descendencia[parto] = ArbolGen[RFIDF1][parto]
    arbolFinal.append(F1Descendencia)

print(arbolFinal)
with open("arbolGenealogicoF1.json", "w") as archivo:
    ass = json.dump(arbolFinal, archivo, indent=4)

connection_uri = config["connection_url"]
db_name = 'C3_LaPurisima'
table_name = config['arbolGenealogico']

client = MongoClient(connection_uri)  
db = client[db_name]  
user_collection = db[table_name]  
#borra el contenido.
print("borrando el contenido ")
user_collection.delete_many({})
with MongoClient(connection_uri) as client:
        db = client['C3_LaPurisima']
        user_collection = db[table_name]
        user_collection.insert_many(arbolFinal)