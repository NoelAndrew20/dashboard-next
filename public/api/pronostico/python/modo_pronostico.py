# -------- Modulos -------- #
import sys
sys.path.insert(0, './src')
import json
from src.mijson.info import cargar_datos, obtener_tipos
from src.mijson.parsear import parsear_config
import src.mijson.infoajson as ijs
from src.calculadora.matrizdt import obtener_fechas_lechones
from src.pronostico.pronostico import obtener_pronostico
from src.pronostico.alimento import kg_consumidos, costos_alimento
from src.pronostico.vacunas import costo_vacunas

# -------- Calculo de pronostico -------- #

def pronostico(json_str_in: str) -> str:
    # Convertir datos a objetos de python
    data = json.loads(json_str_in)
    
    # Extraer datos
    tipos = data['tipos']
    info_tipos = data['info_tipos']
    config  = data['config']

    # Obtener tipos de porcinos
    tipos_porcino, nombres_tipos  = obtener_tipos(tipos)

    # Parsear informacion de tipos de porcinos 
    Xts, Kts, CAts, Vts, CVts, Alimentos, Vacunas, sTs, ventas = cargar_datos(
        tipos_porcino, info_tipos
    )

    # Parsear informacion de configuracion de calculo
    fecha_inicial, fecha_final, n_lechones, lotes = parsear_config(config)

    # Agregar lotes de lechones al diccionario de listas 
    # de lotes de tipos de porcinos
    lotes.update({
        'lechon':obtener_fechas_lechones(
            lotes['vientre'],
            Xts['vientre'],
            n_lechones,
            sTs['vientre']
        )
    })

    # --- Capacidad/Estres maximo y vacunas --- #
    Porcinos_por_dia, Vacunas_por_dia, fechas = obtener_pronostico(
        fecha_inicial, fecha_final, lotes, Xts, sTs, Vts, tipos_porcino
    )

    # --- Alimento --- #
    kg_por_dia = kg_consumidos(Kts, Porcinos_por_dia, tipos_porcino)
    costo_por_dia_A = costos_alimento(kg_por_dia, CAts, tipos_porcino)

    # --- Vacunas --- #
    costo_por_dia_V = costo_vacunas(Vacunas_por_dia, CVts, tipos_porcino)

    # Procesar datos
    #  Porcinos por dia
    Porcinos_por_dia = {
        key: ijs.procesar_2D_tipo2(value,list(Xts[key].keys())) for key, value in Porcinos_por_dia.items()
    }

    #  Alimento
    kg_por_dia = {
        key: ijs.procesar_3D(value,Alimentos[key],list(Xts[key].keys())) for key, value in kg_por_dia.items()
    }
    costo_por_dia_A = {
        key: ijs.procesar_3D(value,Alimentos[key],list(Xts[key].keys())) for key, value in costo_por_dia_A.items()
    }
    #  Vacunas
    Vacunas_por_dia = {
        key: ijs.procesar_3D(value,Vacunas[key],list(Xts[key].keys())) for key, value in Vacunas_por_dia.items()
    }
    costo_por_dia_V = {
        key: ijs.procesar_3D(value,Vacunas[key],list(Xts[key].keys())) for key, value in costo_por_dia_V.items()
    }

    output = {
        "capacidad": Porcinos_por_dia,
        "alimento": {
            "kg": kg_por_dia,
            "$": costo_por_dia_A
        },
        "vacunas": {
            "Ap": Vacunas_por_dia,
            "$": costo_por_dia_V
        },
        "fechas": [
            fecha.strftime("%Y-%m-%d") for fecha in fechas
        ]
    }

    json_str_out = json.dumps(output)

    return json_str_out

if __name__=='__main__':
    print()
    
    # OBTENER INFO DE BASE DE DATOS O SIMILAR
    with open('config.json', 'r') as f:
        json_str = json.load(f)
        json_str_in = json.dumps(json_str)
        
    # MODO PRONOSTICO
    string = pronostico(json_str_in)

    # ENVIAR INFO CON API
    with open('output2.json','w') as f:
        f.write(string)

    print()
