import time
import json
from pymongo import MongoClient
import subprocess

def actualizar_json():
    # Conectarse a la base de datos de MongoDB
    client = MongoClient('192.168.100.10', 27017)  # Reemplaza 'localhost' y '27017' con la dirección y el puerto de tu MongoDB
    db = client.C3_LaPurisima  # Reemplaza 'nombre_de_tu_base_de_datos' con el nombre de tu base de datos
    coleccion = db.Cerdos  # Reemplaza 'nombre_de_tu_coleccion' con el nombre de tu colección en MongoDB

    numero_cerdos=coleccion.count_documents({})

    # Cerrar la conexión a MongoDB
    client.close()

    # Guardar los datos en un archivo JSON
    with open('./config.json', 'r') as json_file:
        datos = json.load(json_file)
    
    datos["config"]["lotes"]["vientre"][0][1] = numero_cerdos  # Reemplaza 'numero_elementos' con la clave adecuada en tu JSON

    with open('./datos.json', 'w') as json_file:
        json.dump(datos, json_file, indent=4) 

def ejecutar_script():
    subprocess.run(["python", "mi_script.py"])

if __name__ == "__main__":
    while True:
        actualizar_json()
        ejecutar_script()
        time.sleep(60)  # Actualizar cada hora
