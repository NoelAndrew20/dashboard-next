import json
import numpy as np
from .parsear import parsear_formato


# -------- Funciones -------- #

def obtener_tipos(tipos_dict: dict[str,dict[str,str]]) -> list[str]:
    '''
    Esta función regresa los tipos de porcinos considerados.

    ## Argumentos

    `tipos_dict (dict[str,dict[str,str]])`: tipos de porcinos considerados.

    ## Retornos

    `tipos (list)`: lista de los tipos de porcinos considerados en el archivo `filepath`.
    
    `nombres (list)`: lista de los nombres de los tipos de porcinos considerados en el archivo `filepath`.

    ## Ejemplo de uso

    ```py
    tipos = obtener_tipos()
    ```
    '''
    tipos = []
    nombres = []
    
    for val in tipos_dict.values():
        # Agregar tipo de porcino a lista 'tipos'
        tipos.append(val["tipo"])
        nombres.append(val["nombre"])

    return tipos, nombres

def verificar_tipo(tipo: str, tipos_porcinos: list[str]):
    '''
    Esta función lanza una excepción si el tipo de porcino en cuestión no pertenece a los tipos considerados.

    ## Argumentos 

    `tipo (str)`: tipo de porcino.

    `tipos_porcinos (list[str])`: lista de tipos de porcinos considerados.

    ## Ejemplo de uso

    ```py
    verificar_tipo('vientre')
    ```
    '''
    # Verificar valor de 'tipo'
    if tipo not in tipos_porcinos:
        raise ValueError(f"Los valores aceptados para 'tipo' son: {tipos_porcinos}")

def periodo_de_lote(tipo: str) -> int:
    '''
    Esta función regresa el número de días totales del proceso del tipo de porcino especificado.

    ## Argumentos

    `tipo (str)`: tipo de porcino.

    ## Retorno

    `dias (int)`: número de días totales del proceso de tipo de porcino especificado.

    ## Ejemplo de uso

    ```py
    dias = periodo_de_lote('vientre')
    ```
    '''

    verificar_tipo(tipo)
    
    # Extraer los dias por etapa de json
    with open(f'data/{tipo}.json', 'r') as f:
        Xt = json.load(f)['Dias/Etapa']
    
    # Regresar la suma de todos los dias por etapa
    return sum(Xt.values())

def etapas_de_lote(tipo: str) -> list[str]:
    '''
    Esta función regresa los nombres de las etapas del proceso del tipo de porcino especificado.

    ## Argumentos

    `tipo (str)`: tipo de porcino.

    ## Retorno

    `etapas (list)`: lista de nombres de las etapas del proceso del tipo de porcino especificado.

    ## Ejemplo de uso

    ```py
    etapas = etapas_de_lote('vientre')
    ```
    '''

    verificar_tipo(tipo)

    # Extraer los dias por etapa de json
    with open(f'data/{tipo}.json', 'r') as f:
        Xt = json.load(f)['Dias/Etapa']

    # Regresar los nombres de cada etapa
    return list(Xt.keys())

def cargar_datos(
        tipos_porcinos: list[str], 
        info_tipos: dict[str,dict]
    ) -> tuple[dict[str,dict[str,int]], dict[str,np.ndarray], dict[str,np.ndarray], dict[str,np.ndarray], dict[str,np.ndarray], dict[str,list[str]], dict[str,list[str]], dict[str,np.ndarray]]:
    '''
    Esta función carga los datos correspondientes a los tipos de porcinos considerados.

    ## Argumentos

    `tipos_porcinos (list[str])`: lista de tipos de porcinos considerados.

    `info_tipos (dict[str,dict])`: diccionario con la informacion de cada tipo de porcino.

    ## Retornos

    `X (dict[str,dict[str,int]])`: diccionario de diccionarios de etapas y días por etapa correspondientes a los tipos de porcinos considerados. El diccionario tiene el formato:
    ```py
    {'tipo de porcino':{'nombre etapa':dias}}
    ```
    
    `K (dict[str,np.ndarray])`: diccionario de objetos np.ndarray correspondientes a los kg por día de cada tipo de alimento consumidos por un porcino de los tipos de porcinos considerados en cada etapa de su proceso. Las dimensiones de este arreglo son `(número de tipos de alimento, número de etapas)`. El diccionario tiene el formato:
    ```py
    {'tipo de porcino':KT}
    ```
    
    `CA (dict[str,np.ndarray])`: diccionario de objetos np.ndarray correspondientes al precio por kg de cada tipo de alimento consumido por el tipo de porcino considerado. Las dimensiones de este arreglo son `(número de tipos de alimento,1)`. El diccionario tiene el formato:
    ```py
    {'tipo de porcino':CAT}
    ```
    
    `V (dict[str,np.ndarray])`: diccionario de objetos np.ndarray correspondientes a los días de aplicación de cada tipo de vacuna aplicadas al tipo de porcino considerado. Las dimensiones de este arreglo son `(número de tipos vacunas, número de etapas, número de aplicaciones)`. El diccionario tiene el formato:
    ```py
    {'tipo de porcino':VT}
    ```
    
    `CV (dict[str,np.ndarray])`: diccionario de objetos np.ndarray correspondientes al precio por aplicación de cada tipo de vacuna aplicada al tipo de porcino considerado. Las dimensiones de este arreglo son `(número de tipos de vacunas,1)`. El diccionario tiene el formato:
    ```py
    {'tipo de porcino':CVT}
    ```
    
    `Alimentos (dict[str,list[str]])`: diccionario de listas de los alimentos consumidos por el tipo de porcino considerado. El diccionario tiene el formato:
    ```py
    {'tipo de porcino':['A1','A2','A3']}
    ```
    
    `Vacunas (dict[str,list[str]])`: diccionario de listas de las vacunas aplicadas al tipo de porcino considerado. El diccionario tiene el formato:
    ```py
    {'tipo de porcino':['V1','V2','V3']}
    ```

    `ST (dict[str,np.ndarray])`: diccionario de tasas de supervivencia por etapa por tipo de porcino.

    ## Ejemplo de uso

    ```py
    Xts, Kts, CAts, Vts, CVts, Alimentos, Vacunas, sTs = cargar_datos()
    ```
    '''

    # AGREGAR GANANCIA POR KG DE CARNE
    X  = dict() # Dias por etapa de tipo de porcino
    K  = dict() # Kg de alimento / Dia
    CA = dict() # $ / Kg de alimento
    V  = dict() # Dia de aplicacion / Etapa / Vacuna
    CV = dict() # $ / Aplicacion de vacuna
    ST = dict() # tasa de supervivencia
    Alimentos = dict()
    Vacunas = dict()
    Venta = dict()

    for tipo in tipos_porcinos:
        # Para cada tipo obtener informacion
        Xt, Kt, CAt, Vt, CVt, alimentos, vacunas, sT, venta = parsear_formato(info_tipos[tipo])

        # Guardar informacion en diccionarios
        X[tipo]=Xt; K[tipo]=Kt; CA[tipo]=CAt; V[tipo]=Vt; CV[tipo]=CVt
        Alimentos[tipo]=alimentos; Vacunas[tipo]=vacunas; ST[tipo]=sT
        Venta[tipo]=venta
    
    # Regresar informacion de tipos de porcino
    return X, K, CA, V, CV, Alimentos, Vacunas, ST, Venta
