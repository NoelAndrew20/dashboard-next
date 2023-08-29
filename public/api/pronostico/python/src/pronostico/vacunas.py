import numpy as np

def obtener_vacunas(
    i: int,
    dias_fecha: int,
    Vt: np.ndarray,
    num_porcinos: int,
    sT: np.ndarray
) -> np.ndarray:
    '''
    Esta función obtiene el número de aplicaciones de vacunas realizadas en el día proporcionado.

    ## Argumentos

    `i (int)`: índice de etapa actual.

    `dias_fecha (int)`: número de días correspondiente al día proporcionado con respecto a la duración de la etapa actual.

    `Vt (np.ndarray)`: slice de matriz VT correspondiente al día de aplicación de vacunas por tipo de vacuna y número de aplicación. Esta matriz tiene dimensiones: `(número de tipos de vacunas, número de etapas, número máximo de aplicaciones)`.

    `num_porcinos (int)`: número de porcinos en lote.

    `sT (np.ndarray)`: tasa de superviviencia acumulada por etapa del proceso del tipo de porcino considerado.

    ## Retornos

    `vacunas (np.ndarray])`: matriz que representa la cantidad de vacunas aplicadas en el día proporcionado.

    ## Ejemplo de uso

    ```py
    vacunas_por_dia[:,i,j] += obtener_vacunas(i, dias_fecha, Vt[:,i,:], num_porcinos, sT)
    ```
    '''

    # Verificar que la fecha considerada este dentro de alguna etapa
    if i == -1:
        return np.zeros(Vt.shape[0])
    
    # Obtener el numero de porcinos sobrevivientes hasta etapa i
    num_porcinos = int(num_porcinos * sT[0,i])

    # Inicializar matriz de vacunas
    vacunas = np.zeros(Vt.shape[0])

    # "Para cada aplicacion en numero de aplicaciones..."
    for k in range(Vt.shape[-1]):
        # Sumar numero de aplicaciones aplicadas
        vacunas += (Vt[:,k] == dias_fecha) * num_porcinos
    
    return vacunas

def costo_vacunas(
    vac_por_dia: dict[str,np.ndarray],
    CVts: dict[str,np.ndarray], 
    tipos_porcino: list[str]
) -> dict[str,np.ndarray]:
    '''
    Esta función calcula el costo de las aplicaciones de vacunas por día en el periodo establecido.

    ## Argumentos

    `vac_por_dia (dict[str,np.ndarray])`: diccionario de matrices que representan el número de aplicaciones de vacunas por tipo de vacuna, por etapa, por día del tipo de porcino considerado. Estas matrices tienen dimensiones: `(número de tipos de vacunas, número de etapas, número de días)`.

    `CVts (dict[str,np.ndarray])`: diccionario de vectores CVT, los cuales representan el precio por aplicación por tipo de vacuna. Estos vectores tienen dimensiones: `(número de tipos de vacunas,)`.

    `tipos_porcino (list[str])`: lista de tipos de porcino considerados.

    ## Retornos

    `costo_por_dia (dict[str,np.ndarray])`: costo por día por tipo de vacuna por etapa del tipo de porcino considerado.

    ## Ejemplo de uso

    ```py
    vac_por_dia = costo_vacunas(vac_por_dia, CVts, tipos_porcino)
    ``` 
    '''

    # Inicializar diccionario
    costo_por_dia = dict()

    for tipo in tipos_porcino:
        # Extraer vacunas por dia y costo por tipo de vacuna
        vacpd, CVt = vac_por_dia[tipo], CVts[tipo]
        # Agregar dimension para ejecutar calculo
        CVt = CVt[:,:,np.newaxis]

        # Obtener costo por tipo de vacuna, etapa y dia
        costo = CVt * vacpd

        # Agregar entrada a diccionario
        costo_por_dia[tipo] = costo

    return costo_por_dia