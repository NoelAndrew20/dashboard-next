import random
import string
import pymongo
import datetime
from pymongo import MongoClient, UpdateOne

connection_uri = f"mongodb://pigpig:0iEF&C84k4gqe&d&2D38%5EtNb&xln6d03hXLOGAcbY0LeRGUlGj@192.168.100.10:27017/"
dbMongo = 'basePruebaJesus'
collection = 'cerdo'

def generar_cadena_similar():
    caracteres = string.hexdigits.upper()  # Obtener caracteres hexadecimales en mayúsculas (0-9, A-F)
    primeros_caracteres = "71"
    ultimos_caracteres = ''.join(random.choice(caracteres) for _ in range(6))
    cadena_generada = primeros_caracteres + ultimos_caracteres
    return cadena_generada


def saveMongo(tag):
    with MongoClient(connection_uri) as client:
        db = client[dbMongo] # database name
        user_collection = db[collection] # table name
        dias_a_sumar = random.randint(105, 112)
        nave = random.randint(1,6)
        dateStr = datetime.datetime.now()
        dateStr_mas_dias_aleatorios = dateStr - datetime.timedelta(days=dias_a_sumar)
        date3 = dateStr_mas_dias_aleatorios.strftime("%d-%m-%Y %H:%M:%S")
        date4 = dateStr.strftime("%d%m%Y")
        print("El id del cerdo es :" + str(tag+date4))
        tipo = "F1"
        provedor = "USA"
        origen = "Texas"
        destino = "La Purisima"
        lote = "mx1"
        personal = "Ivan Romero Flores"
        peso = numero_aleatorio = random.randint(80, 100)
        user_collection.insert_one({
            'fechaPreBautizo': date3,
            'lote': lote,
            'rfid': tag,
            'tipo' : tipo,
            'peso' : peso,
            'ciclo' : [],
            'cicloFallido' : [],
            'fechaIngresoGranja' : None,
            'granja' : destino,
            'fechaNaveEntrada' : dateStr_mas_dias_aleatorios,
            'fechaNaveSalida' : None,
            'zona' : "Gestacion",
            'nave' : str(nave),
            'status' : "Vivo",
            'historialMedico' : [],
            'usuario' : personal,
        })
        print("\nCerdo registrado en el sistema")
        client.close()

cantidad_a_generar = 1000
for _ in range(cantidad_a_generar):
    cadena_similar = generar_cadena_similar()
    saveMongo(cadena_similar)    
