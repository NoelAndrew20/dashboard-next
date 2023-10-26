import pymongo
from pymongo import MongoClient
import yaml 
import json
from collections import Counter
from datetime import datetime
from concurrent.futures import ThreadPoolExecutor, ProcessPoolExecutor
from tqdm import tqdm


#--- Leer archivo config ---#
with open("config.yaml", "r") as f:
    config = yaml.safe_load(f)

#Funciones auxiliares
def sumar_diccionarios(diccionario1, diccionario2):
    resultado = {}

    for clave, valor in diccionario1.items():
        if isinstance(valor, dict):
            if clave in diccionario2 and isinstance(diccionario2[clave], dict):
                resultado[clave] = sumar_diccionarios(valor, diccionario2[clave])
            else:
                resultado[clave] = valor
        else:
            if clave in diccionario2:
                resultado[clave] = valor + diccionario2[clave]
            else:
                resultado[clave] = valor

    for clave, valor in diccionario2.items():
        if clave not in resultado:
            resultado[clave] = valor

    return resultado


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

a = Conteo_Cerdos("Gestacion","11-04-2024")

with MongoClient(config['connection_url']) as client:
    db = client['C3_LaPurisima']
    simulacion = config['table_name_simulacion']
    collection = db[simulacion]
    field_names = set()

    # Itera a través de los documentos en la colección
    for document in collection.find():
        field_names.update(document.keys())

    # Convierte el conjunto de nombres de campos en una lista
    field_names = list(field_names)



field_names.remove('_id')
field_names.remove('RFID')

def convertir_a_fecha(fecha_str):
    return datetime.strptime(fecha_str, '%d-%m-%Y')

# Ordena la lista de fechas utilizando la función de conversión
fechas_ordenadas = sorted(field_names, key=convertir_a_fecha)


def InformacionSimulacion(Fecha: str):
    AnalisisDia = {}

    with MongoClient(config['connection_url']) as client:
        db = client['C3_LaPurisima']
        simulacion = config['table_name_simulacion']
        collection = db[simulacion]
        query = {Fecha: {"$exists": True}}
        cursor = collection.find(query)
        try:
            for doc in cursor:
                Ubicacion =  doc[Fecha]['Ubicacion']
                if Ubicacion in AnalisisDia:
                    
                    AnalisisDia[Ubicacion]["Cantidad"] += 1
                    AnalisisDia[Ubicacion]["InversionAlimento"] += doc[Fecha]['Alimento']['Inversion']
                    AnalisisDia[Ubicacion]["KgConsumidos"] +=  doc[Fecha]['Alimento']['Kg']
                    AnalisisDia[Ubicacion]["Medicamentos"] = sumar_diccionarios(AnalisisDia[Ubicacion]["Medicamentos"], doc[Fecha]['Medicamento']['Medicamentos'])
                    AnalisisDia[Ubicacion]["InversionMedicamento"] += doc[Fecha]['Medicamento']['Inversion']
                else:
                    AnalisisDia[Ubicacion] = {}
                    AnalisisDia[Ubicacion]["Cantidad"] = 1
                    AnalisisDia[Ubicacion]["Alimento"] = doc[Fecha]['Alimento']['NombreAlimento']
                    AnalisisDia[Ubicacion]["InversionAlimento"] = doc[Fecha]['Alimento']['Inversion']
                    AnalisisDia[Ubicacion]["KgConsumidos"] =  doc[Fecha]['Alimento']['Kg']
                    AnalisisDia[Ubicacion]["Medicamentos"] = doc[Fecha]['Medicamento']['Medicamentos']
                    AnalisisDia[Ubicacion]["InversionMedicamento"] = doc[Fecha]['Medicamento']['Inversion']
                    print(doc[Fecha]['Medicamento']["Inversion"])

        except Exception as e:
                print("**************")
                print(e)

    return AnalisisDia

resultados = {} 
for i in range(len(fechas_ordenadas)):
    print(fechas_ordenadas[i])
    a = InformacionSimulacion(fechas_ordenadas[i])
    resultados[fechas_ordenadas[i]] = a

print("/////////////////////////////////////////")
# Guardar el diccionario como JSON en el archivo con indentación
with open("SimulacionGranja.json", "w") as archivo:
    json.dump(resultados, archivo, indent=4)
