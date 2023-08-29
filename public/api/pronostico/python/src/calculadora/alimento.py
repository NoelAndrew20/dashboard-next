import json
import numpy as np

def kg_consumidos(Dt: np.ndarray, Nt: np.ndarray, Kt: np.ndarray) -> tuple[np.ndarray, np.ndarray]:
    '''
    Esta función calcula el los kg consumidos de cada tipo de alimento por el tipo de porcino considerado en el periodo establecido.

    ## Argumentos

    `Dt (np.ndarray)`: matriz DT, la cual tiene por entradas el número de días que cada lote pasa en cada etapa de su proceso en el periodo establecido. Las dimensiones de esta matriz son: `(número de lotes, número de etapas del tipo de porcino considerado)`.

    `Nt (np.ndarray)`: matriz NT cuyas entradas representan el número de porcinos en el lote i en la etapa j dada la tasa de supervivencia acumulada hasta la etapa j. Las dimensiones de esta matriz son `(número de lotes, número de etapas)`.

    `Kt (np.ndarray)`: matriz KT, la cual tiene por entradas los kg por día consumidos por un porcino por cada tipo de alimento y cada etapa del proceso del tipo de porcino considerado. Las dimensiones de esta matriz son `(número de tipos de alimento, número de etapas)`.

    ## Retornos

    `Kg (np.ndarray)`: matriz cuyas entradas representan los kg totales consumidos por el tipo de porcino considerado en cada etapa de su proceso y por cada tipo de alimento, en el periodo establecido. Las dimensiones de esta matriz son `(número de tipos de alimento, número de etapas)`.

    `Kg_tipo_A (np.ndarray)`: vector cuyas entradas representan los kg totales consumidos de cada tipo de alimento por el tipo de porcino considerado, en el periodo establecido. Las dimensiones de este vector son `(número de tipos de alimento,)`.

    ## Ejemplo de uso

    ```py
    Kg, Kg_tipo_A = kg_consumidos(Dt, Nt, Kt)
    ```
    '''

    # Obtener numero de lotes de tipo de porcino
    if len(Dt.shape) == 2:
        L, E = Dt.shape
    else:
        L, E = Nt.shape
        Dt = Dt.reshape((L, E))
    
    # Obtener los dias de consumo totales
    dt = (Dt * Nt).reshape(L, E, 1)

    # Obtener los kg consumidos por tipo de alimento, 
    # etapa y lote de tipo de porcino
    KT = np.array([Kt.transpose()] * L) * dt

    # Obtener los kg consumidos por tipo de alimento y etapa
    Kg = (np.sum(KT, axis=0)).transpose()

    # ¿Es el consumo de alimento igual a cero?
    if 0 in Kg.shape:
        # Generar matriz auxiliar
        Kg = np.zeros(Kt.shape)

    # Obtener los kg consumidos por tipo de alimento
    Kg_tipo_A = np.sum(Kg, axis=1)

    return Kg, Kg_tipo_A

def costos_alimento(Kg: np.ndarray, CAt: np.ndarray) -> tuple[np.ndarray, np.ndarray, float]:
    '''
    Esta función regresa los costos de alimento del tipo de porcino considerado por etapa, por tipo de alimento y los costos totales, en unidad monetaria.

    ## Argumentos

    `Kg (np.ndarray)`: matriz cuyas entradas representan los kg totales consumidos por el tipo de porcino considerado en cada etapa de su proceso y por cada tipo de alimento, en el periodo establecido. Las dimensiones de esta matriz son `(número de tipos de alimento, número de etapas)`.

    `CAt (np.ndarray)`: vector de costo por kg por tipo de alimento. Las dimensiones de este vector son `(número de tipos de alimento,)`.

    ## Retornos

    `costos_tipo_A (np.ndarray)`: vector de costos de total de kg de alimento por tipo de alimento. Las dimensiones de este vector son `(número de tipos de alimento,)`.

    `costos_etapa (np.ndarray)`: vector de costos de total de kg de alimento por etapa. Las dimensiones de este vector son `(número de etapas,)`.

    `costos_totales (float)`: costo total del consumo de alimento por el tipo de porcino considerado.

    ## Ejemplo de uso

    ```py
    costos_tipo_A, costos_etapa, costos_totales = costos_alimento(Kg, CAt)
    ```
    '''

    # Obtener el costo del consumo de alimento por 
    # tipo de alimento y etapa
    costos = Kg * CAt

    # Obtener el costo por tipo de alimento
    costos_tipo_A = np.sum(costos, axis=1)

    # Obtener el costo por etapa 
    costos_etapa = np.sum(costos, axis=0)

    #        $ por tipo    $ por etapa      $ total
    return costos_tipo_A, costos_etapa, np.sum(costos_tipo_A)

def precios_alimento(tipos_porcinos: list[str]) -> dict[str,float]:
    '''
    Esta función regresa un diccionario cuyas claves son los nombres de cada tipo de alimento y cuyos valores son el costo por kg de cada tipo de alimento.

    ## Argumentos

    `tipos_porcinos (list[str])`: lista de tipos de porcinos considerados.
    
    ## Retornos

    `precios (dict[str,float])`: diccionario de precios por kg por tipo de alimento. El diccionario tiene el formato:
    ```py
    {'nombre alimento':precio}
    ```
    '''

    precios = dict()
    for tipo in tipos_porcinos:
        # Cargar informacion de precio por kg  
        # por tipo de alimento del tipo de porcino
        # considerado
        with open(f'data/{tipo}.json', 'r') as f:
            CAt = json.load(f)['Kg']['$']

        for key, v in CAt.items():
            # ¿No existe este tipo de alimento en los
            # alimentos actualmente guardados?
            if precios.get(key) is None:
                # Agregar alimento a alimentos guardados
                precios[key] = v
            
    return {key:precios[key] for key in sorted(precios)}