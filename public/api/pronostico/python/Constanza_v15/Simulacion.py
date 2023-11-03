import yaml
import json
from tqdm import tqdm
import random
from collections import Counter
import matplotlib.pyplot as plt
import datetime
import matplotlib.pyplot as plt
import logging
import re
import os
import time
from concurrent.futures import ThreadPoolExecutor, ThreadPoolExecutor
import multiprocessing
import shutil
#Librerias propias
from Generales import *

ArchivosGenerales = Generales( ConfigPredeterminada= "ArchivosGenerales.yaml")
Alimentos, Enfermedades, Medicamentos, DiasInhabiles, InvAcumulada= ArchivosGenerales.CargaArchivosGenerales()
InvAcumulada = {}


#Leemos el archivo de Diego
with open("F1_Registradas.json", "r") as archivo_json:
    # Carga el contenido del archivo en una variable
    F1Registradas = json.load(archivo_json)



def CrearRFIDLechones(n):
    listaRFID = []
    while len(listaRFID) < n:
        objeto_hex = "71" + ''.join(random.choice("0123456789ABCDEF") for _ in range(6))
        if objeto_hex not in listaRFID:
            listaRFID.append(objeto_hex)
    return listaRFID

def crecionRegistroMadres(MadreId):
    F1Registrada = CrearCerdo(**F1Registradas[MadreId])
    return F1Registrada

def DetecccionCamadas(CerdosF1:list):
    Camadas = {}
    ListaNuevosCerdos = []
    totalLechones = 0
    #sobre todos los F1
    
    for i in CerdosF1:  
        cerdo = CrearCerdo(**i)
        #realizamos su plan de ruta
        ExpedienteCerdo = cerdo.CreacionExpediente()
        Etapas1 = cerdo.PlanRutaCerdo()
        print("------------------------")
        FechasPreajustadas1 = cerdo.PreAjusteFechasDinamico(ConfigInicial=ExpedienteCerdo,
                                                            ProtocoloTrazabilidad=Etapas1)
        FechasAjustadas1 = cerdo.AjusteFechasDinamico(FechasPreAjustadas=FechasPreajustadas1,
                                                    ExpedienteIndividual=ExpedienteCerdo,
                                                    Ruta_FechasInhabiles="Generales/FechasInhabiles.yaml")
        UbicacionAjustada1  = cerdo.UbicacionaExplicita(ExpedienteCerdo=ExpedienteCerdo,
                                                        FechasAjustadas=FechasAjustadas1)
    
        
        #Creamos el diciconario donde se registraran las fechas que da a luz
        Camadas[cerdo.RFID]= {}     
        #detecta los dias que da a luz
        print(f"Realizando el pronostico de la madre con RFID {cerdo.RFID}")
        for  Dia, Descripcion in UbicacionAjustada1.items():
            #definimos el proceso de parto el 2o dia en maternidad
            if "Maternidad" in Descripcion["Etapa"] and Descripcion["DiasEnArea"] == 2:
                #establecemos un numero aleatorio entre 12 y 16
                num_crias = random.randint(12, 16)
                totalLechones += num_crias
                fecha = datetime.datetime.strptime(Descripcion['Fecha'], '%d-%m-%Y')
                # Genera horas y minutos aleatorios entre las 8am (08:00) y las 4pm (16:00)
                hora_aleatoria = random.randint(8, 16)  # Números enteros entre 8 y 16
                minutos_aleatorios = random.randint(0, 59)  # Números enteros entre 0 y 59
                FechaNacimiento = fecha.replace(hour=hora_aleatoria, minute=minutos_aleatorios)
                #obtenemos el numeor de parto con base al proceso en el que se encuentra
                NumParto = Descripcion["Etapa"][-1]
                #regstramos esta informacion como el n-esimo parto
                Camadas[cerdo.RFID][f"Parto {NumParto}"]= {}
                Camadas[cerdo.RFID][f"Parto {NumParto}"]["Fecha"] = FechaNacimiento.strftime('%d-%m-%Y %H:%M:%S')
                Camadas[cerdo.RFID][f"Parto {NumParto}"]["NumCrias"] = num_crias
                print(f"En el parto num. {NumParto}, ocurrido el {FechaNacimiento.strftime('%d-%m-%Y %H:%M:%S')} dio a luz a {num_crias} lechones vivos")
    #generamos 
    ListaRFID = CrearRFIDLechones(n=totalLechones)
    print(len(ListaRFID))
    with open("RFID_cerdosEngorda.json", "w") as archivo:
        json.dump(ListaRFID, archivo, indent=4)
    ArbolGenealogico = {}
    idcerdo = 0
    for i in CerdosF1: 
        cerdo = CrearCerdo(**i)
        ArbolGenealogico[cerdo.RFID] = {}
        #Para cada parto realiza la creacion de los requisitos para iniciar cerdo
        for parto in Camadas[cerdo.RFID].keys():
            ArbolGenealogico[cerdo.RFID][parto] = []
            FechaParto = Camadas[cerdo.RFID][parto]["Fecha"]
            NumCrias = Camadas[cerdo.RFID][parto]["NumCrias"] 
            for i in range(NumCrias): #par definir todas las crias
                infoCerdoNuevo = cerdo.Nacimiento(FechaNacimiento= FechaParto,
                                       RFID_lechon=ListaRFID[idcerdo] )
                ListaNuevosCerdos.append(infoCerdoNuevo)
                idcerdo += 1
                ArbolGenealogico[cerdo.RFID][parto].append(idcerdo)
    # Guardar el diccionario en un archivo JSON
    with open("ArbolGenealogico.json", "w") as archivo:
        json.dump(ArbolGenealogico, archivo, indent=4)
    return(ListaNuevosCerdos)


TotalCerdosEngorda = DetecccionCamadas( CerdosF1=F1Registradas)


def Asignacion(CerdoId):
    
    cerdoCreado = CrearCerdo(**TotalCerdosEngorda[CerdoId])
    return cerdoCreado

def CrearCerdoRealizarSimulacion(Cerdo):
    ExpedienteCerdo = Cerdo.CreacionExpediente()
    print(f"Realizando la simulacion del cerdo con RFID {Cerdo.RFID}")
    InversionAcumulada = Cerdo.CracionHistorial(InvAcumulada)
    
    ExpedienteCerdoActualizado = Cerdo.Simulacion(Alimentos =Alimentos, 
                                                InversionAcumulada=InversionAcumulada,
                                                Enfermedades = Enfermedades, 
                                                Medicamentos = Medicamentos,
                                                ExpedienteCerdo=ExpedienteCerdo)
    #Guardamos su historial en una carpeta Llamada Expedientes, luego en una llamada por su RFID
    #dos archivos, Expediente actualizado e InversionAcumulada
    carpeta_path = f"Expedientes/{Cerdo.RFID}"

    os.makedirs(carpeta_path, exist_ok=True)
    # Guarda los datos en los archivos JSON
    with open(os.path.join(carpeta_path, "Expediente.json"), "w") as archivo1:
        json.dump(ExpedienteCerdoActualizado, archivo1, indent=4)

    with open(os.path.join(carpeta_path, "Inversion.json"), "w") as archivo2:
        json.dump(InversionAcumulada, archivo2, indent=4)


    return ExpedienteCerdoActualizado, InversionAcumulada

if __name__ == '__main__':
    #Eliminamos las carpetas de la simulacion anterior
    CarpetaExpedientes = "Expedientes"
    # Ruta completa de la carpeta actual
    carpeta_completa = os.path.join(os.getcwd(), CarpetaExpedientes)

    # Borra la carpeta si existe
    if os.path.exists(carpeta_completa):
        shutil.rmtree(carpeta_completa)

    # Crea la carpeta de nuevo
    os.mkdir(carpeta_completa)
    
    with ThreadPoolExecutor() as pool:
        with tqdm(total=len(F1Registradas)) as progress:
                    futures = []
                    #construimos todos los cerdos Lechones
                    for i in range(len(F1Registradas)):
                        future = pool.submit(crecionRegistroMadres, i)
                        future.add_done_callback(lambda p: progress.update())
                        futures.append(future)
                    CerdosF1 = []
                    for future in futures:
                         result = future.result()
                         CerdosF1.append(result)
    CerdosF1 = []
    for i in range(len(F1Registradas)):
        CerdosF1.append(crecionRegistroMadres(i))
        # print(crecionRegistroMadres(i))
    print(f"Realizando las simulaciones de {len(CerdosF1)} cerdos F1")

    with ThreadPoolExecutor() as pool:
            pool.map(CrearCerdoRealizarSimulacion, CerdosF1)

    print("--------------------------------------------------------")
    print("Generando registro de los cerdos de Engorda")
    with ThreadPoolExecutor() as pool:
        with tqdm(total=len(TotalCerdosEngorda)) as progress:
                    futures = []
                    #construimos todos los cerdos Lechones
                    for i in range(len(TotalCerdosEngorda)):
                        future = pool.submit(Asignacion, i)
                        
                        future.add_done_callback(lambda p: progress.update())
                        futures.append(future)
                    CerdosEngorda = []
                    for future in futures:
                         result = future.result()
                         CerdosEngorda.append(result)

    print(f"Se estima el nacimiento de {len(CerdosEngorda)} cerdos de engorda")
    tiempo_inicio = time.time()
    with ThreadPoolExecutor() as pool:
         pool.map(CrearCerdoRealizarSimulacion, CerdosEngorda)
    tiempo_fin = time.time()
    print(f"Se han simulado {len(CerdosF1)} F1's,  {len(CerdosEngorda)-len(CerdosF1)}  cerdos de engorda. El proceso de simulacion duro {tiempo_fin - tiempo_inicio} segundos, usando {multiprocessing.cpu_count()} nucleos")
