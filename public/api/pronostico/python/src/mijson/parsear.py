import json
import datetime
import numpy as np

def parsear_formato(
        info_tipo: dict[str,dict]
    ) -> tuple[dict[str,int], np.ndarray, np.ndarray, np.ndarray, np.ndarray, list[str], list[str], np.ndarray]:
    '''
    Esta función realiza el parse de un diccionario que contenga la información de un tipo de porcino específico.

    ## Argumentos

    `info_tipo (dict[str,dict])`: diccionario que contiene la informacion de un tipo de porcino específico.

    ## Retornos

    `dias_etapas (dict[str,int])`: diccionario de etapas y días por etapa correspondientes al tipo de porcino considerado. El diccionario tiene el formato:
    ```py
    {'nombre etapa':dias}
    ```

    `matriz_kg (np.ndarray)`: objeto np.ndarray correspondiente a los kg por día de cada tipo de alimento consumidos por un porcino del tipo de porcino considerado en cada etapa de su proceso. Las dimensiones de este arreglo son `(número de tipos de alimento, número de etapas)`.

    `costo_alimentos (np.ndarray)`: objeto np.ndarray correspondiente al precio por kg de cada tipo de alimento consumido por el tipo de porcino considerado. Las dimensiones de este arreglo son `(número de tipos de alimento,1)`.

    `matriz_vac (np.ndarray)`: objeto np.ndarray correspondiente a los días de aplicación de cada tipo de vacuna aplicadas al tipo de porcino considerado. Las dimensiones de este arreglo son `(número de tipos vacunas, número de etapas, número de aplicaciones)`.

    `costo_vacunas (np.ndarray)`: objeto np.ndarray correspondiente al precio por aplicación de cada tipo de vacuna aplicada al tipo de porcino considerado. Las dimensiones de este arreglo son `(número de tipos de vacunas,1)`.

    `alimentos (list[str])`: lista de los alimentos consumidos por el tipo de porcino considerado.

    `vacunas (list[str])`: lista de las vacunas aplicadas al tipo de porcino considerado.

    `sT (np.ndarray)`: tasa de supervivencia en cada etapa del tipo de porcino considerado

    `venta (dict[str,float])`: información de venta del tipo de porcino considerado.

    ## Ejemplo de uso

    ```py
    Xt, Kt, CAt, Vt, CVt, alimentos, vacunas, sT, venta = parsear_formato(info_tipos[tipo])
    ```
    '''

    # Leer json string con configuracion para tipo de porcino
    data = info_tipo

    # Definir claves esperadas
    expected_keys = {
        'Dias/Etapa':[],
        'Kg':['$', 'Etapa/Alimento'],
        'ApVac':['$', 'Etapa/Vacuna'],
        'mortalidad':[],
        'venta':['kg','$/kg']
    }

    # Verificar que existan las claves esperadas
    if set(data.keys()) != set(expected_keys.keys()):
        raise Exception(f"El diccionario '{info_tipo}' no tiene el formato correcto. Revisar el archivo './formato-explicacion.txt'")
    else:
        for key in expected_keys.keys():
            if not isinstance(data[key], dict):
                raise Exception(f'Falta la clave {key}')
            for sub_key in expected_keys[key]:
                if sub_key not in data[key].keys():
                    raise Exception(f'Falta la clave {key}')
                
    # Parsear diccionario
    #  Etapas y dias por etapa
    etapas = data['Dias/Etapa'].keys()
    dias_etapas = {etapa:data['Dias/Etapa'][etapa] for etapa in etapas}

    #  Alimento: Costos y Kg por dia
    alimentos = data['Kg']['$'].keys()
    costo_alimentos = np.array([[data['Kg']['$'][key]] for key in alimentos])

    matriz_kg = np.array([
        [data['Kg']['Etapa/Alimento'][alimento][etapa] for etapa in etapas] for alimento in alimentos
    ])

    #  Vacunas: Costos y aplicaciones por etapa
    vacunas = data['ApVac']['$'].keys()
    costo_vacunas = np.array([[data['ApVac']['$'][key]] for key in vacunas])

    #    Obtener dimension 'k' de array (m,n,k)
    k = 0
    for vacuna in vacunas:
        for etapa in etapas:
            k0 = data['ApVac']['Etapa/Vacuna'][vacuna][etapa]
            if len(k0) > k:
                k = len(k0)

    #    Crear array 3D
    matriz_vac = []
    for vacuna in vacunas:
        vac = []
        for etapa in etapas:
            lst = data['ApVac']['Etapa/Vacuna'][vacuna][etapa]
            lst += [data['Dias/Etapa'][etapa] + 2] * (k - len(lst)) # Agregar 2 dias para que sea mayor a dias por etapa
            vac.append(lst)
        matriz_vac.append(vac)
    matriz_vac = np.array(matriz_vac)

    #  Mortalidad y supervivencia
    tasas_m = np.array([data['mortalidad'][key] for key in etapas])
    sT = []
    prod = 1
    for mu in tasas_m:
        prod *= 1 - mu
        sT.append(prod)
    sT = np.array(sT).reshape((1,len(sT)))

    #  Informacion de venta
    venta = data['venta']

    # Var   :         Xt            Kt             CAt              Vt               CVt
    # Type  :        dict         matrix           vec             array             vec
    # Shape :   'Etapa':dias    (|Xt|,|A|)       (|A|,1)     (|Xt|,|APt|,|Vt|)      (|Vt|,1)
    return       dias_etapas,   matriz_kg,   costo_alimentos,   matriz_vac,     costo_vacunas,\
                 list(alimentos),     list(vacunas), sT, venta

def parsear_fecha(fecha: str) -> datetime.datetime:
    '''
    Esta función realiza el parse de un string de una fecha en formato "%Y-%m-%d" a un objeto de tipo datetime.datetime.

    ## Argumentos

    `fecha (str)`: string de una fecha en formato "%Y-%m-%d".

    ## Retornos

    `fecha (datetime.datetime)`: objeto datetime.datetime que representa la fecha indicada en el string de argumento.
    '''

    return datetime.datetime.strptime(fecha,"%Y-%m-%d")

def parsear_config(config: dict) -> tuple[datetime.datetime, datetime.datetime, dict[str,list[tuple[datetime.datetime,int]]]]:
    '''
    Esta función realiza el parse de la configuración del cálculo a realizar.

    ## Argumentos

    `config (dict)`: diccionario con la configuración necesaria para realizar el cálculo.

    ## Retornos

    `fecha_inicial (datetime.datetime)`: fecha inicial del periodo establecido.

    `fecha_final (datetime.datetime)`: fecha final del periodo establecido.

    `n_lechones (int)`: número de lechones que nacen por parto.

    `lotes (dict[str,list[tuple[datetime.datetime,int]]])`: diccionario que contiene una lista de lotes para cada tipo de porcino considerado. Los lotes están definidos por la fecha de inicio de su proceso y el número de porcinos en dicho lote. El diccionario tiene el formato:
    ```py
    {'tipo de porcino':[(fecha de inicio de proceso, número de porcinos en lote)]}
    ```

    ## Ejemplo de uso

    ```py
    fecha_inicial, fecha_final, lotes = parsear_config(json_config)
    ```
    '''
    
    fecha_inicial = parsear_fecha(config['fecha_inicial'])
    fecha_final = parsear_fecha(config['fecha_final'])

    if fecha_final < fecha_inicial:
        raise ValueError('La fecha inicial del periodo establecido debe ser menor o igual a la fecha final.')

    n_lechones = config['n_lechones']
    lotes = config['lotes']
    lotes = {
        tipo: [(parsear_fecha(lotes[tipo][i][0]), lotes[tipo][i][1]) for i in range(len(lotes[tipo]))] for tipo in lotes.keys()
    }

    return fecha_inicial, fecha_final, n_lechones, lotes
