import json
import numpy as np

def procesar_1D(
    vector: np.ndarray,
    lista: list[str]
) -> dict:
    '''
    Esta función convierte un vector en un diccionario con la lista de nombres como claves.

    ## Argumentos

    `vector (np.ndarray)`: vector a procesar.

    `lista (list[str])`: lista de claves.

    ## Retornos

    `diccionario (dict)`: vector convertido en diccionario.

    ## Ejemplo de uso

    ```py
    diccionario = procesar_1D(vector, lista)
    ```
    '''

    # Inicializar diccionario
    diccionario = dict()

    for i, item in enumerate(lista):
        # Agregar tipo de alimento
        diccionario[item] = float(vector[i])

    return diccionario

def procesar_2D(
    matriz: np.ndarray,
    lista1: list[str],
    lista2: list[str]
) -> dict:
    '''
    Esta función convierte una matriz en un diccionario de diccionarios con la lista1 de nombres como claves principales y la lista2 de nombres como claves secundarias.

    ## Argumentos

    `matriz (np.ndarray)`: matriz a procesar.

    `lista1 (list[str])`: lista de claves principales.

    `lista2 (list[str])`: lista de claves secundarias.

    ## Retornos

    `diccionario (dict)`: matriz convertida en diccionario de diccionarios.

    ## Ejemplo de uso

    ```py
    diccionario = procesar_2D(matriz, lista1, lista2)
    ```
    '''
    
    # Inicializar diccionario
    diccionario = dict()

    for i, item1 in enumerate(lista1):
        for j, item2 in enumerate(lista2):
            # ¿Existe el diccionario "item1"?
            if diccionario.get(item1) is None:
                # Crear diccionario
                diccionario[item1] = {item2:float(matriz[i,j])}
            else:
                # Actualizar diccionario
                diccionario[item1].update({item2:float(matriz[i,j])})

    return diccionario

def procesar_2D_tipo2(
    matriz: np.ndarray,
    lista: list[str],
) -> dict:
    '''
    a
    '''

    # Inicializar diccionario
    diccionario = dict()

    for i, item in enumerate(lista):
        # Agregar tipo de alimento
        diccionario[item] = [float(matriz[i,j]) for j in range(matriz.shape[1])]

    return diccionario
    

def procesar_3D(
    array: np.ndarray,
    lista1: list[str],
    lista2: list[str]
) -> dict:
    '''
    a
    '''
    
    # Inicializar diccionario
    diccionario = dict()

    for i, item1 in enumerate(lista1):
        for j, item2 in enumerate(lista2):
            # ¿Existe el diccionario "item1"?
            if diccionario.get(item1) is None:
                # Crear diccionario
                diccionario[item1] = {
                    item2: [float(array[i,j,k]) for k in range(array.shape[2])]
                }
            else:
                # Actualizar diccionario
                diccionario[item1].update({
                    item2: [float(array[i,j,k]) for k in range(array.shape[2])]
                })
    
    return diccionario