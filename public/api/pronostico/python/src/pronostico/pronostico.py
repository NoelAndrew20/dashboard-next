import numpy as np
import datetime
from .capacidad import obtener_num_porcinos
from .vacunas import obtener_vacunas

def sumar(
        fecha_0: datetime.datetime,
        dias: int
    ) -> datetime.datetime:
    '''
    Esta función suma los días indicados a la fecha proporcionada.

    ## Argumentos

    `fecha_0 (datetime.datetime)`: fecha proporcionada.

    `dias (int)`: número de días a sumar a la fecha porporcionada.

    ## Retornos

    `fecha (datetime.datetime)`: fecha correspondiente a la fecha_0 desplazada el número de días indicados.

    ## Ejemplo de uso

    ```py
    fecha_anterior = sumar(fecha_0, dias_anterior)
    ```
    ''' 
    
    # Desplazar fecha_0 "dias" dias
    return fecha_0 + datetime.timedelta(days=dias)

def obtener_etapa_actual(
        fecha: datetime.datetime,
        fecha_0: datetime.datetime,
        etapas: list[str,int]
) -> tuple[int,int]:
    '''
    Esta función calcula la etapa en la que se encuentra el día proporcionado.

    ## Argumentos

    `fecha (datetime.datetime)`: fecha correspondiente al día proporcionado.

    `fecha_0 (datetime.datetime)`: fecha correspondiente al inicio del proceso del lote de porcinos correspondiente.

    `etapas (list[str,int])`: lista de etapas y días por etapa.

    ## Retornos

    `indice (int)`: índice correspondiente a la etapa actual.

    `dias_fecha (int)`: número de días correspondiente al día proporcionado con respecto a la duración de la etapa actual.

    ## Ejemplo de uso 

    ```py
    i, dias_fecha = obtener_etapa_actual(fecha,fecha_0,etapas)
    ```
    '''

    # Inicializar contadores de dias
    dias_anterior = 0
    dias_actual = 0

    for i, (etapa, dias) in enumerate(etapas):
        # Actualizar contador de dias actual
        dias_actual += dias
        # Obtener intervalo de fechas correspondiente a etapa i
        fecha_anterior = sumar(fecha_0, dias_anterior)
        fecha_actual = sumar(fecha_0, dias_actual)

        # ¿Esta "fecha" en la etapa i? 
        if fecha_anterior <= fecha and fecha < fecha_actual:
            # Obtener numero de dia de "fecha" con respecto a etapa i
            dias_fecha = (fecha - fecha_anterior).days

            # Regresar indice de etapa y numero de dia de "fecha"
            return i, dias_fecha
    
    # "fecha" no esta en ninguna etapa
    # Regresar indice clave y nada
    return -1, None

def obtener_pronostico(
    fecha_inicial: datetime.datetime,
    fecha_final: datetime.datetime,
    lotes: dict[str,list[tuple[datetime.datetime,int]]],
    Xts: dict[str,int],
    sTs: np.ndarray,
    Vts: dict[str,np.ndarray],
    tipos_porcino: list[str]
) -> tuple[dict[str,np.ndarray], dict[str,np.ndarray], list[datetime.datetime]]:
    '''
    ## Argumentos

    `fecha_inicial (datetime.datetime)`: fecha inicial del periodo establecido.

    `fecha_final (datetime.datetime)`: fecha final del periodo establecido.

    `lotes (dict[str,list[tuple[datetime.datetime,int]]])`: diccionario que contiene una lista de lotes para cada tipo de porcino considerado. Los lotes están definidos por la fecha de inicio de su proceso y el número de porcinos en dicho lote. El diccionario tiene el formato:
    ```py
    {'tipo de porcino':[(fecha de inicio de proceso, número de porcinos en lote)]}
    ```

    `Xts (dict[str[dict[str,int]]])`: diccionario de diccionarios de etapas y días por etapa correspondientes a los tipos de porcinos considerados. El diccionario tiene el formato:
    ```py
    {'tipo de porcino':{'nombre etapa':dias}}
    ```

    `sTs (dict[str,np.ndarray])`: tasas de supervivencia por etapa por tipo de porcino.

    `Vts (dict[str,np.ndarray])`: diccionario de matrices VT, las cuales corresponden a los días de aplicación de vacunas por tipo de vacuna, etapa y número de aplicación. Estas matrices tienen dimensiones: `(número de tipos de vacunas, número de etapas, número máximo de aplicaciones)`.

    `tipos_porcinos (list[str])`: tipos de porcinos considerados.

    ## Retornos

    `Porcinos_por_dia (dict[str,np.ndarray])`: diccionario de matrices PT, las cuales representan el número de porcinos por etapa por día. Estas matrices tienen dimensiones: `(número de etapas, número de días en periodo establecido)`.

    `Vacunas_por_dia (dict[str,np.ndarray])`: diccionario de matrices que representan el número de aplicaciones de vacunas por tipo de vacuna por etapa por día. Estas matrices tienen dimensiones: `(número de tipos de vacunas, número de etapas, número de días en periodo establecido)`.

    `fechas (list[datetime.datetime])`: lista de fechas dentro del periodo establecido.

    ## Ejemplo de uso

    ```py
    Porcinos_por_dia, Vacunas_por_dia, fechas = obtener_pronostico(fecha_inicial, fecha_final, lotes, Xts, sTs, Vts, tipos_porcino)
    ```
    '''

    # Calcular dias totales del periodo establecido
    dias_totales = (fecha_final-fecha_inicial).days
    # Obtener fechas correspondientes al periodo establecido
    fechas = [fecha_inicial + datetime.timedelta(days=x) for x in range(0,dias_totales+1) ]


    Porcinos_por_dia=dict()
    Vacunas_por_dia=dict()

    # "Para cada tipo de porcino..."
    for tipo in tipos_porcino:
        # Obtener informacion del tipo de porcino
        #  lotes, etapas, tasa de supervivencia
        lista_lotes, Xt, sT, Vt = lotes[tipo], Xts[tipo], sTs[tipo], Vts[tipo]
        etapas = list(Xt.items())

        # Crear matriz PT
        porcinos_por_dia = np.zeros((len(etapas),len(fechas)))

        # Crear matriz VT
        vacunas_por_dia = np.zeros((Vt.shape[0],len(etapas),len(fechas)))

        # "Para cada lote..."
        for fecha_0, num_porcinos in lista_lotes:
            # "Para cada dia del periodo establecido..."
            for j, fecha in enumerate(fechas):
                # Obtener etapa actual
                i, dias_fecha = obtener_etapa_actual(fecha,fecha_0,etapas)
                
                # Agregar numero de porcinos a etapa en dia
                porcinos_por_dia[i][j] += obtener_num_porcinos(i, num_porcinos, sT)

                # Agregar vacunas aplicadas
                vacunas_por_dia[:,i,j] += obtener_vacunas(i, dias_fecha, Vt[:,i,:], num_porcinos, sT)
        
        # Agregar entradas a diccionarios
        Porcinos_por_dia[tipo]=porcinos_por_dia
        Vacunas_por_dia[tipo]=vacunas_por_dia
    
    return Porcinos_por_dia, Vacunas_por_dia, fechas
