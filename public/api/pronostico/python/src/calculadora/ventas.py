import numpy as np

def obtener_ventas(
        Dt: np.ndarray, 
        Nt: np.ndarray, 
        Xt: np.ndarray, 
        ventas: dict[str,float]
    ) -> tuple[np.ndarray,np.ndarray,float]:
    '''
    Esta función calcula las ventas esperadas por el tipo de porcino considerado.

    ## Argumentos

    `Dt (np.ndarray)`: 

    `Nt (np.ndarray)`: 

    `Xt  (np.ndarray)`: 

    `ventas (dict[str,float])`: 

    ## Retornos

    `kgs (float)`: número de kg totales de venta esperados por el tipo de porcino considerado.

    `venta (float)`: cantidad monetaria total esperada por las ventas del tipo de porcino considerado.

    ## Ejemplo de uso

    ```py
    kgs, ventasT = obtener_ventas(Dt, Nt, Xt, venta)
    ```
    '''

    # Extraer informacion de venta (peso de venta y precio por kg)
    kg = ventas['kg']
    precio_por_kg = ventas['$/kg']
    # Extraer dias por etapa
    dias = list(Xt.values())

    # Obtener numero de dias que pasaron los lotes 
    # en la ultima etapa de su proceso
    dt = Dt[:,-1] if 0 not in Dt.shape else np.zeros(1)
    # Obtener el numero de porcinos sobrevivientes por
    # lote en la ultima etapa de su proceso 
    nt = Nt[:,-1] if 0 not in Dt.shape else np.zeros(1)

    # Obtener los indices de los lotes que terminaron
    # su proceso en el periodo establecido
    dt = (dt == dias[-1]).astype(np.int32)
    
    # Calcular el numero de kg de venta que se tienen 
    # en el periodo establecido del tipo de porcino 
    # considerado
    kgs = np.sum((dt * nt) * kg)

    # Obtener la cantidad monetaria correspondiente
    # a ventas en el periodo establecido
    venta = kgs * precio_por_kg

    return kgs, venta