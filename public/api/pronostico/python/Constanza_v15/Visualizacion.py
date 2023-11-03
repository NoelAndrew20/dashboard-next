from pymongo import MongoClient
import os
import json
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from datetime import datetime

connection_uri = f"mongodb://pigpig:0iEF&C84k4gqe&d&2D38%5EtNb&xln6d03hXLOGAcbY0LeRGUlGj@192.168.100.10:27017/"
db_name = 'C3_LaPurisima'
table_name = 'Pedro'

client = MongoClient(connection_uri)  
db = client[db_name]  
collection = db[table_name]

def FechasHisoricas():
    # Recorre todos los documentos en la colección
    nombres_de_campos = []
    for documento in collection.find():
        # Obtén las claves (nombres de campos) del documento
        campos_del_documento = list(documento.keys())

        # Actualiza la lista de nombres de campos con los nuevos campos encontrados
        for campo in campos_del_documento:
            if campo not in nombres_de_campos:
                nombres_de_campos.append(campo)

    # Imprime los nombres de los campos


    Fechas = nombres_de_campos[2:]
    Fechas = sorted(Fechas, key=lambda x: datetime.strptime(x, '%d-%m-%Y'))
    return Fechas


#
CerdosArea = {}
CerdosZona = {} 
ConsumoAlimentosPrecios = {}
# Creacion de la fecha en el expediente
#FechaBusqueda = "11-02-2024"
Fechas = FechasHisoricas()


for FechaBusqueda in Fechas:
    #consulta a base de datos
    query = {FechaBusqueda: {"$exists": True}}
    result = collection.find(query)

    ComposicionDia = {}
    InversionAlimentoDia = 0
    #Realizamos la suma acumulada del consumo de cada cerdo en la granja
    for document in result:
        #revisamos si existiio consumo (y por ende inversion)
        if len(list(document[FechaBusqueda]["Alimento"].keys())) >0:
            #print(document[FechaBusqueda]["Alimento"]["Inversion"])
            InversionAlimentoDia += document[FechaBusqueda]["Alimento"]["Inversion"]
        #realizamos el conteo de cerdos en cada zona
        Ubicacion = document[FechaBusqueda]["Ubicacion"]
        if Ubicacion in ComposicionDia:
            ComposicionDia[Ubicacion] += 1
        else:
            ComposicionDia[Ubicacion] = 1
    #Ahora guardamos esa informacion en el diccionario
    ConsumoAlimentosPrecios[FechaBusqueda] = InversionAlimentoDia
    CerdosZona[FechaBusqueda] = ComposicionDia


def InversionDiariaAlimentos(datos:dict):
    fechas = list(datos.keys())
    valores = list(datos.values())

    # Crear la gráfica
    plt.figure(figsize=(10, 6))
    plt.plot(fechas, valores, marker='o', linestyle='-')
    plt.title('Inversion Diaria en Alimentos')
    plt.xlabel('Fechas')
    plt.ylabel('Inversion')
    plt.grid(False)

    # Modificar etiquetas del eje x para mostrar solo cuando cambian de mes
    etiquetas = []
    mes_anterior = None

    for fecha in fechas:
        mes_actual = fecha.split('-')[1]
        if mes_actual != mes_anterior:
            etiquetas.append(fecha)
        else:
            etiquetas.append('')
        mes_anterior = mes_actual

    #print(set(etiquetas))

    plt.xticks(fechas, etiquetas, rotation=45)
    plt.savefig("Graficos/InversionDiaria.png")

InversionDiariaAlimentos(ConsumoAlimentosPrecios)

df = pd.DataFrame(CerdosZona).T
df.index.name = "Fecha"
# Llena los valores NaN con 0 o algún otro valor predeterminado si lo deseas
df.fillna(0, inplace=True)
df = df.groupby(df.columns.str[:-1], axis=1).sum()


def DistribucionZonas(df):
    df_transposed = df.T

    # Crear una figura y ejes para el gráfico
    fig, ax = plt.subplots(figsize=(10, 6))

    # Iterar a través de las filas (días) y crear un gráfico de barras para cada día
    for fecha in df_transposed.index:
        valores = df_transposed.loc[fecha].values
        categorias = df_transposed.columns
        x = range(len(categorias))
        
        ax.bar(x, valores, label=fecha)

    # Configurar el gráfico
    ax.set_xlabel('Fecha')
    ax.set_ylabel('Cantidad')
    ax.set_title('Distribucion de los cerdos')
    ax.set_xticks(x)
    ax.set_xticklabels(categorias)
    ax.legend()

    # Mostrar el gráfico
    plt.tight_layout()
    plt.savefig("Graficos/DistribucionPorZonas.png")

DistribucionZonas(df)
