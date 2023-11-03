import pymongo
from pymongo import MongoClient
import yaml 
import json
from collections import Counter
from datetime import datetime
from concurrent.futures import ThreadPoolExecutor, ProcessPoolExecutor
from tqdm import tqdm
import time 



if __name__ == '__main__':
    tiempo_inicio = time.time()
    with open("config.yaml", "r") as f:
        config = yaml.safe_load(f)

    def ConteoDiario( Fecha: str ):
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
                    
                    if Ubicacion in list(AnalisisDia.keys()):
                        AnalisisDia[Ubicacion]["Total"] += 1
                        if len(doc[Fecha]['Alimento']) !=0:
                            AnalisisDia[Ubicacion]["InversionAlimento"] += doc[Fecha]['Alimento']['Inversion']
                            AnalisisDia[Ubicacion]["KgConsumidos"] +=  doc[Fecha]['Alimento']['Kg']
                        else:
                            AnalisisDia[Ubicacion]["InversionAlimento"] += 0
                            AnalisisDia[Ubicacion]["KgConsumidos"] +=  0

                        if len(doc[Fecha]['Medicamento']) != 0:
                                AnalisisDia[Ubicacion]["InversionMedicamento"] += doc[Fecha]['Medicamento']['Inversion']
                                AnalisisDia[Ubicacion]["Medicamentos"].update(doc[Fecha]['Medicamento']['Medicamentos'])
                            
                        else:
                                AnalisisDia[Ubicacion]["InversionMedicamento"] += 0
                    else:
                        AnalisisDia[Ubicacion] = {}
                        AnalisisDia[Ubicacion]["Total"] = 1
                        if len(doc[Fecha]['Alimento']) !=0:
                            AnalisisDia[Ubicacion]["Alimento"] = doc[Fecha]['Alimento']['NombreAlimento']
                            AnalisisDia[Ubicacion]["InversionAlimento"] = doc[Fecha]['Alimento']['Inversion']
                            AnalisisDia[Ubicacion]["KgConsumidos"] =  doc[Fecha]['Alimento']['Kg']
                        else:
                            AnalisisDia[Ubicacion]["Alimento"] = "S/Alimento"
                            AnalisisDia[Ubicacion]["InversionAlimento"] = 0
                            AnalisisDia[Ubicacion]["KgConsumidos"] =  0
                        if len(doc[Fecha]['Medicamento']) != 0:
                            #  print(doc[Fecha]['Medicamento']['Inversion'])
                            AnalisisDia[Ubicacion]["InversionMedicamento"] =  doc[Fecha]['Medicamento']['Inversion']
                            AnalisisDia[Ubicacion]["Medicamentos"] = doc[Fecha]['Medicamento']['Medicamentos']
                        else:
                            AnalisisDia[Ubicacion]["InversionMedicamento"] =  0
                            AnalisisDia[Ubicacion]["Medicamentos"] = {}
            except Exception as e:
                    print("************************************")
                    print(Fecha)
                    print(e)
                    print("************************************")
        return(AnalisisDia)
    
    with MongoClient(config['connection_url']) as client:
        db = client['C3_LaPurisima']
        simulacion = config['tablaDetallada']
        collection = db[simulacion]
        field_names = set()

        # Itera a través de los documentos en la colección
        for document in collection.find():
            field_names.update(document.keys())

        # Convierte el conjunto de nombres de campos en una lista
        field_names = list(field_names)
        if '_id' in field_names:
            field_names.remove('_id')
        if "RFID" in field_names:
            field_names.remove('RFID')
        if 'Tipo' in field_names:
             field_names.remove('Tipo')


    def convertir_a_fecha(fecha_str):
        return datetime.strptime(fecha_str, '%d-%m-%Y')

    # Ordena la lista de fechas utilizando la función de conversión
    fechas_ordenadas = sorted(field_names, key=convertir_a_fecha)

    
   
    print("/////////////////////////////////////////")
    resultados = {} 
    for i in range(len(fechas_ordenadas)):#
        a = ConteoDiario(fechas_ordenadas[i])
        resultados[fechas_ordenadas[i]] = a
    
    # with ThreadPoolExecutor() as pool:
    #     with tqdm(total=len(fechas_ordenadas)) as progress:
    #                 futures = []
    #                 #construimos todos los cerdos Lechones
    #                 for i in range(len(fechas_ordenadas)):
    #                     future = pool.submit(ConteoDiario, i)
    #                     future.add_done_callback(lambda p: progress.update())
    #                     futures.append(future)
    #                 resultados = {}
    #                 i = 0
    #                 for future in futures:
    #                      result = future.result()
    #                      resultados[fechas_ordenadas[i]] = result
    #                      i += 1
    print("/////////////////////////////////////////")
    # Guardar el diccionario como JSON en el archivo con indentación
    with open("SimulacionGranja.json", "w") as archivo:
        json.dump(resultados, archivo, indent=4)

    connection_uri = f"mongodb://pigpig:0iEF&C84k4gqe&d&2D38%5EtNb&xln6d03hXLOGAcbY0LeRGUlGj@192.168.100.10:27017/"
    db_name = 'C3_LaPurisima'
    table_name = config['SimulacionGranja']

    client = MongoClient(connection_uri)  
    db = client[db_name]  
    user_collection = db[table_name]  
    #borra el contenido.
    print("borrando el contenido ")
    user_collection.delete_many({})

    with MongoClient(connection_uri) as client:
        db = client['C3_LaPurisima']
        user_collection = db[table_name]
        user_collection.insert_one(resultados)

    tiempo_fin = time.time()
    print(f" Registrar {len(resultados)}  dias requiere de {tiempo_fin-tiempo_inicio} segundos")