import json
import yaml
import pymongo
from pymongo import MongoClient

with open("config.yaml", "r") as f:
    config = yaml.safe_load(f)


F1_registradas = []

with MongoClient(config['connection_url']) as client:
    db = client['C3_LaPurisima']
    cerdosregistrados = config['registroCerdos']
    collection = db[cerdosregistrados]
    cursor = collection.find()
    try:
        for doc in cursor:
            expediente = {
                "FechaRegistro": doc['fechaPreBautizo'],
                "Estado": "Vivo",
                "Granja": "LaPurisima",
                "AlimentoDia1": {},
                "PadecimientosDia1": {},
                "MedicamentoDia1": {},
                "RFID": doc['rfid'],
                "Ruta": "F1ANR.yaml",
                "Tipo": "F1ANR",
                "DiasEnArea": 1,
                "Ubicacion": "Transporte"
                }
            F1_registradas.append(expediente)


    except Exception as e:
        print("************************************")
        print(e)
        print("************************************")
print("Cerdos ingresados")
with open("F1_Registradas.json", "w") as archivo:
    json.dump(F1_registradas, archivo, indent=4)