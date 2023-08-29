# -------- Modulos -------- #
import sys
sys.path.insert(0, './src')
import json
from src.mijson.info import cargar_datos, obtener_tipos
from src.mijson.parsear import parsear_config
import src.mijson.infoajson as ijs
from src.calculadora.matrizdt import obtener_matrices, obtener_fechas_lechones
from src.calculadora.alimento import kg_consumidos, costos_alimento
from src.calculadora.vacunas import vacunas_consumidas, costos_vacunas
from src.calculadora.ventas import obtener_ventas

# -------- Calculo de pronostico -------- #

def pronostico(json_str_in: str) -> str:
    '''
    Esta función recibe un json string que contiene toda la información necesaria para realizar el cálculo de pronóstico y regresa los pronósticos relacionados al alimento y las vacunas.

    ## Argumentos

    `json_str_in (str)`: json string que contiene los tipos de porcino considerados, la información de dichos tipos de porcino, el número de lechones por parto, la configuración de lotes y el periodo establecido.

    ## Retornos

    `json_str_out (str)`: json string que contiene los pronósticos relacionados al alimento y las vacunas.

    ## Ejemplo de uso

    ```py
    json_str_out = pronostico(json_str_in)
    ```
    '''
    
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

    # Calcular matrices DT, aT, bT y NT
    Dts, Nts, ats, bts = obtener_matrices(
        fecha_inicial, fecha_final, lotes,
        Xts, tipos_porcino, sTs
    )

    # --- Alimento --- #
    kg=dict(); kg_tipo_A=dict(); costo_tipo_A=dict()
    costo_etapa_A=dict(); costo_total_A=dict()

    for tipo, nombre in zip(tipos_porcino, nombres_tipos):
        # Seleccionar matrices
        Dt, Kt, CAt, Nt, alimentos, Xt = Dts[tipo], Kts[tipo], CAts[tipo], Nts[tipo], Alimentos[tipo], Xts[tipo]

        # Realizar pronosticos
        Kg, Kg_tipo_A = kg_consumidos(Dt, Nt, Kt)
        costos_tipo_A, costos_etapa_A, costos_totales_A = costos_alimento(Kg, CAt)

        # Procesar datos
        Kg = ijs.procesar_2D(Kg, alimentos, list(Xt.keys()))
        Kg_tipo_A = ijs.procesar_1D(Kg_tipo_A, alimentos)
        costos_tipo_A = ijs.procesar_1D(costos_tipo_A, alimentos)
        costos_etapa_A = ijs.procesar_1D(costos_etapa_A, list(Xt.keys()))

        # Guardar en diccionarios
        kg[nombre]=Kg; kg_tipo_A[nombre]=Kg_tipo_A
        costo_tipo_A[nombre]=costos_tipo_A; costo_etapa_A[nombre]=costos_etapa_A
        costo_total_A[nombre]=costos_totales_A
    
    # --- Vacunas --- #
    num_vacunas=dict(); num_vac_tipo_V=dict()
    costo_tipo_V=dict(); costo_etapa_V=dict(); costo_total_V=dict()

    for tipo, nombre in zip(tipos_porcino, nombres_tipos):
        # Seleccionar matrices
        at, bt, Vt, CVt, Nt, vacunas, Xt = ats[tipo], bts[tipo], Vts[tipo], CVts[tipo], Nts[tipo], Vacunas[tipo], Xts[tipo]

        # Realizar pronosticos
        Num_vacunas, Num_vac_tipo_V = vacunas_consumidas(at, bt, Vt, Nt)
        costos_tipo_V, costos_etapa_V, costos_totales_V = costos_vacunas(Num_vacunas, CVt)

        # Procesar datos
        Num_vacunas = ijs.procesar_2D(Num_vacunas, vacunas, list(Xt.keys()))
        Num_vac_tipo_V = ijs.procesar_1D(Num_vac_tipo_V, vacunas)
        costos_tipo_V = ijs.procesar_1D(costos_tipo_V, vacunas)
        costos_etapa_V = ijs.procesar_1D(costos_etapa_V, list(Xt.keys()))

        # Guardar en diccionarios
        num_vacunas[nombre]=Num_vacunas; num_vac_tipo_V[nombre]=Num_vac_tipo_V
        costo_tipo_V[nombre]=costos_tipo_V; costo_etapa_V[nombre]=costos_etapa_V
        costo_total_V[nombre]=costos_totales_V

    # --- Ventas --- #
    kgT=dict(); ventasT=dict()
    for tipo, nombre in zip(tipos_porcino, nombres_tipos):
        Dt, Nt, Xt, venta = Dts[tipo], Nts[tipo], Xts[tipo], ventas[tipo]
        
        kgs, ventast = obtener_ventas(Dt, Nt, Xt, venta)
        
        kgT[tipo]=float(kgs)
        ventasT[tipo]=float(ventast)
    

    # --- Ganancias --- #
    #  Restar todo el costo a todas las ventas
    costo = sum(costo_total_A.values()) + sum(costo_total_V.values())
    venta = sum(ventasT.values())
    ganancia = venta - costo

    output = {
        "alimento":{
        "kg":kg, "kg_tipo_A":kg_tipo_A, "costo_tipo_A":costo_tipo_A,
        "costo_etapa_A":costo_etapa_A,"costo_total_A":costo_total_A
        },
        "vacunas":{
            "num_vacunas":num_vacunas, "num_vac_tipo_V":num_vac_tipo_V,
            "costo_tipo_V":costo_tipo_V, "costo_etapa_V":costo_etapa_V,
            "costo_total_V":costo_total_V
        },
        "ganancias": {
            'kg': kgT, 'ventas': ventasT, 'ganancia': ganancia
        }
    }
    
    json_str_out = json.dumps(output)

    return json_str_out

if __name__=='__main__':
    print()
    
    # OBTENER INFO DE BASE DE DATOS O SIMILAR
    with open('config.json', 'r') as f:
        json_str = json.load(f)
        json_str_in = json.dumps(json_str)
    
    # MODO CALCULADORA
    string = pronostico(json_str_in)

    # ENVIAR INFO CON API
    with open('output.json','w') as f:
        f.write(string)

    print()
