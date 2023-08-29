import numpy as np

def kg_consumidos(
    Kts: dict[str,np.ndarray],
    Porcinos_por_dia: dict[str,np.ndarray],
    tipos_porcino: list[str]
) -> dict[str,np.ndarray]:
    '''
    Esta función calcula los kg de alimento consumidos por día en el periodo establecido.

    ## Argumentos

    `Kts (dict[str,np.ndarray])` : diccionario de matrices KT, las cuales tienen por entradas los kg por día consumidos por un porcino por cada tipo de alimento y cada etapa del proceso del tipo de porcino considerado. Las dimensiones de estas matrices son `(número de tipos de alimento, número de etapas)`.

    `Porcinos_por_dia (dict[str,np.ndarray])`: diccionario de matrices PT, las cuales representan el número de porcinos por etapa por día. Estas matrices tienen dimensiones: `(número de etapas, número de días en periodo establecido)`.

    `tipos_porcino (list[str])`: lista de tipos de porcino considerados.

    ## Retornos

    `kg_por_dia (dict[str,np.ndarray])`: diccionario de matrices que representan el consumo de alimento por tipo de alimento, por etapa, por día del tipo de porcino considerado. Estas matrices tienen dimensiones: `(número de tipos de alimento, número de etapas, número de días)`.

    ## Ejemplo de uso

    ```py
    kg_por_dia = kg_consumidos(Kts, Porcinos_por_dia, tipos_porcino)
    ```
    '''

    # Inicializar diccionario
    kg_por_dia = dict()

    for tipo in tipos_porcino:
        # Extraer matriz de kg/dia y porcinos por dia
        Kt, ppd = Kts[tipo], Porcinos_por_dia[tipo]
        # Agregar dimensiones para ejecutar operacion
        Kt, ppd = Kt.reshape(Kt.shape + (1,)), ppd.reshape((1,) + ppd.shape)
        
        # Obtener kg consumidos por tipo A, etapa y por dia
        kg = Kt * ppd

        # Agregar entrada a diccionario
        kg_por_dia[tipo] = kg

    return kg_por_dia

def costos_alimento(
    kg_por_dia: dict[str,np.ndarray], 
    CAts: dict[str,np.ndarray], 
    tipos_porcino: list[str]
) -> dict[str,np.ndarray]:
    '''
    Esta función calcula el costo de los kg de alimento consumidos por día en el periodo establecido.

    ## Argumentos

    `kg_por_dia (dict[str,np.ndarray])`: diccionario de matrices que representan el consumo de alimento por tipo de alimento, por etapa, por día del tipo de porcino considerado. Estas matrices tienen dimensiones: `(número de tipos de alimento, número de etapas, número de días)`.

    `CAts (dict[str,np.ndarray])`: diccionario de vectores CAT, los cuales representan el precio por kg por tipo de alimento. Estos vectores tienen dimensiones: `(número de tipos de alimento,)`.

    `tipos_porcino (list[str])`: lista de tipos de porcino considerados.

    ## Retornos

    `costo_por_dia (dict[str,np.ndarray])`: costo por día por tipo de alimento por etapa del tipo de porcino considerado.

    ## Ejemplo de uso

    ```py
    costo_alimento = costos_alimento(kg_por_dia, CAts, tipos_porcino)
    ``` 
    '''

    # Inicializar diccionario
    costo_por_dia = dict()

    for tipo in tipos_porcino:
        # Extraer kg por dia y $/kg
        kgpd, CAt = kg_por_dia[tipo], CAts[tipo]
        # Agregar dimension para ejecutar calculo
        CAt = CAt[:,:,np.newaxis]

        # Obtener costo por etapa, tipo de alimento y dia
        costo = CAt * kgpd

        # Agregar entrada a diccionario
        costo_por_dia[tipo] = costo

    return costo_por_dia
