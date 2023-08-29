import json
import numpy as np

def vacunas_consumidas(
        at: np.ndarray, 
        bt: np.ndarray, 
        Vt: np.ndarray, 
        Nt: np.ndarray
    ) -> tuple[np.ndarray, np.ndarray]:
    '''
    Esta función regresa el número de aplicaciones necesarias para cada tipo de vacuna y cada etapa correspoondientes al tipo de porcino considerado.

    ## Argumentos

    `at (np.ndarray)`: matriz aT, la cual tiene por entradas los días de corte correspondientes al inicio del periodo establecido. Las dimensiones de esta matriz son: `(número de lotes, número de etapas del tipo de porcino considerado)`.

    `bt (np.ndarray)`: matriz bT, la cual tiene por entradas los días de corte correspondientes al fin del periodo establecido. Las dimensiones de esta matriz son: `(número de lotes, número de etapas del tipo de porcino considerado)`.

    `Vt (np.ndarray)`: matriz VT, la cual tiene por entradas el día de aplicación de cada tipo de vacuna en cada etapa y de cada número de aplicación del tipo de porcino considerado. Las dimensiones de esta matriz son: `(número de tipo de vacunas, número de etapas del tipo de porcino considerado, número máximo de aplicaciones)`.

    `Nt (np.ndarray)`: matriz NT cuyas entradas representan el número de porcinos en el lote i en la etapa j dada la tasa de supervivencia acumulada hasta la etapa j. Las dimensiones de esta matriz son `(número de lotes, número de etapas)`.

    ## Retornos

    `num_vacunas (np.ndarray)`: matriz cuyas entradas representan el número de aplicaciones totales por el tipo de porcino considerado en cada etapa de su proceso y por cada tipo de vacuna, en el periodo establecido. Las dimensiones de esta matriz son `(número de tipos de vacunas, número de etapas)`.

    `num_vac_tipo_V (np.ndarray)`: vector cuyas entradas representan el número de aplicaciones totales de cada tipo de vacuna por el tipo de porcino considerado, en el periodo establecido. Las dimensiones de este vector son `(número de tipos de vacunas,)`.

    ## Ejemplo de uso

    ```py
    num_vacunas, num_vac_tipo_V = vacunas_consumidas(at, bt, Vt, Nt)
    ```
    '''

    # Obtener numero de tipos de vacunas, numero
    # de etapas y numero maximo de aplicaciones
    # para el tipo de porcino considerado
    Tv, Etapas, Ap = Vt.shape
    
    # Inicializar matriz de numero de aplicaciones
    num_vacunas_ap = None
    
    for indx in range(len(Nt)):   
        # Obtener intervalo de aplicacion para 
        # la etapa actual 
        a = at[indx].reshape(1,Etapas, 1); b = bt[indx].reshape(1,Etapas, 1)

        # ¿Es la matriz de numero de aplicaciones nula?
        if num_vacunas_ap is None:
            # Inicializar matriz
            num_vacunas_ap = Nt[indx].reshape(1,len(Nt[indx]),1) * ((a <= Vt) & (Vt <= b)).astype(np.int32)
        else:
            # Sumar valores de lote a acumulado
            num_vacunas_ap += Nt[indx].reshape(1,len(Nt[indx]),1) * ((a <= Vt) & (Vt <= b)).astype(np.int32)

    # ¿Es la matriz de numero de aplicaciones nula?
    if num_vacunas_ap is None:
        # Generar matriz auxiliar
        num_vacunas_ap = np.zeros((Vt.shape))

    # Obtener el numero de aplicaciones totales por 
    # tipo de vacuna y etapa
    num_vacunas = np.sum(num_vacunas_ap, axis=2)

    # Obtener el numero de aplicaciones totales por
    # tipo de vacuna
    num_vac_tipo_V = np.sum(num_vacunas, axis=1)

    return num_vacunas, num_vac_tipo_V

def costos_vacunas(num_vacunas: np.ndarray, CVt: np.ndarray) -> tuple[np.ndarray, np.ndarray, float]:
    '''
    Esta función regresa los costos de las aplicaciones de las vacunas del tipo de porcino considerado por etapa, por tipo de vacuna y los costos totales, en unidad monetaria.

    ## Argumentos

    `num_vacunas (np.ndarray)`: matriz cuyas entradas representan el número de aplicaciones totales por el tipo de porcino considerado en cada etapa de su proceso y por cada tipo de vacuna, en el periodo establecido. Las dimensiones de esta matriz son `(número de tipos de vacunas, número de etapas)`.

    `CVt (np.ndarray)`: vector de costo por aplicación por tipo de vacuna. Las dimensiones de este vector son `(número de tipos de vacunas,)`.

    ## Retornos

    `costos_tipo_V (np.ndarray)`: vector de costos de total de número de aplicaciones de vacunas por tipo de vacuna. Las dimensiones de este vector son `(número de tipos de vacunas,)`.

    `costos_etapa (np.ndarray)`: vector de costos de total de número de aplicaciones de vacunas por etapa. Las dimensiones de este vector son `(número de etapas,)`.

    `costos_totales (float)`: costo total de número de aplicaciones de vacunas por el tipo de porcino considerado.

    ## Ejemplo de uso

    ```py
    costos_tipo_V, costos_etapa, costos_totales = costos_vacunas(Kg, CAt)
    ```

    '''

    # Obtener costo de aplicaciones por tipo 
    # de vacuna y etapa
    costos = num_vacunas * CVt
    
    # Obtener costo de aplicaciones por tipo 
    # de vacuna
    costos_tipo_V = np.sum(costos, axis=1)

    # Obtener costo de aplicaciones por etapa
    costos_etapa = np.sum(costos, axis=0)

    #        $ por tipo    $ por etapa      $ total
    return costos_tipo_V, costos_etapa, np.sum(costos_tipo_V)

def precios_vacunas(tipos_porcinos: list[str]) -> dict[str,float]:
    '''
    Esta función regresa un diccionario cuyas claves son los nombres de cada tipo de vacuna y cuyos valores son el costo por aplicación de cada tipo de vacuna.

    ## Argumentos

    `tipos_porcinos (list[str])`: lista de los tipos de porcinos considerados.

    ## Retornos

    `precios (dict[str,float])`: diccionario de precios por apliación por tipo de vacuna. El diccionario tiene el formato:
    ```py
    {'nombre vacuna':precio}
    ```
    '''
    
    precios = dict()
    for tipo in tipos_porcinos:
        # Cargar informacion de precio por aplicacion  
        # por tipo de vacuna del tipo de porcino
        # considerado
        with open(f'data/{tipo}.json', 'r') as f:
            CVt = json.load(f)['ApVac']['$']
        
        for key, v in CVt.items():
            # ¿No existe este tipo de vacuna en las
            # vacunas actualmente guardadas?
            if precios.get(key) is None:
                # Agregar vacuna a vacunas guardados
                precios[key] = v
            
    return {key:precios[key] for key in sorted(precios)}