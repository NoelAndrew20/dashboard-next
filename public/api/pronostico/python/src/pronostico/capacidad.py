import numpy as np

def obtener_num_porcinos(
        i: int,
        num_porcinos: int,
        sT: np.ndarray
    ) -> int:
    '''
    Esta función devuelve la cantidad de porcinos que ha sobrevivido hasta el día proporcionado.

    ## Argumentos
    `i (int)`: índice de etapa actual.
    
    `num_porcinos (int)`: número inicial de porcinos en lote.

    `sT (np.ndarray)`: tasas de supervivencia por etapa del tipo de porcino considerado.

    ## Retornos

    `agregar_porcinos (int)`: número de porcinos sobrevivientes correspondiente al día considerado.
    
    ## Ejemplo de uso

    ```py
    agregar_porcinos = obtener_num_porcinos(i, num_porcinos, sT)
    ```
    '''

    agregar_porcinos = 0
    # Verificar si se debe agregar porcinos
    if i != -1:
        # Agregar cantidad de porcinos sobrevivientes hasta etapa i
        agregar_porcinos = int(num_porcinos * sT[0,i])
        
    return agregar_porcinos
