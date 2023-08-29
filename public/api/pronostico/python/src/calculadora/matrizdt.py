import datetime
import numpy as np

def punto(Xt: dict[str, int], es_intervalo: bool, a: datetime.datetime, fecha_0: datetime.datetime, fecha_1: datetime.datetime, fecha_inicial: datetime.datetime) -> tuple[list[int], list[int], list[int]]:
    '''
    Esta función realiza el cálculo de una fila de la matriz Dt cuando la intersección del intervalo del proceso del porcino con el periodo establecido es un solo día.

    ## Argumentos

    `Xt (dict[str,int])`: diccionario de etapas y días por etapa correspondientes al tipo de porcino considerado. El diccionario tiene el formato:
    ```py
    {'nombre etapa':dias}
    ```

    `es_intervalo (bool)`: variable que indica si el periodo establecido es un intervalo o si es un solo día.

    `a (datetime.datetime)`: fecha que representa el máximo entre las fechas iniciales del periodo establecido y del proceso del tipo de porcino considerado.

    `fecha_0 (datetime.datetime)`: fecha del inicio del proceso del tipo de porcino considerado.

    `fecha_1 (datetime.datetime)`: fecha final del proceso del tipo de cerdo considerado.

    `fecha_inicial (datetime.datetime)`: fecha inicial del periodo establecido.

    ## Retornos

    `Dt (list[int])`: lista de números enteros correspondiente a una fila de la matriz DT. Los números enteros representan la cantidad de días de consumo del lote de porcinos en cuestión. La longitud de esta lista es el número de etapas del proceso del tipo de porcino considerado.

    `at (list[int])`: lista de números enteros correspondiente a una fila de la matriz aT. Los números enteros representan los días de corte correspondientes al inicio del periodo establecido. La longitud de esta lista es el número de etapas del proceso del tipo de porcino considerado.

    `bt (list[int])`: lista de números enteros correspondiente a una fila de la matriz bT. Los números enteros representan los días de corte correspondientes al fin del periodo establecido. La longitud de esta lista es el número de etapas del proceso del tipo de porcino considerado.

    ## Ejemplo de uso

    ```py
    Dt, at, bt = punto(Xt, es_intervalo, a, fecha_0, fecha_1, fecha_inicial)
    ```
    '''

    # Inicializar filas de matrices DT, aT y bT
    Dt = []; at = []; bt = []
    
    # Obtener dias por etapa
    xt = list(Xt.values())

    # ¿Es el periodo establecido un intervalo?
    if es_intervalo:
        # ¿Maximo entre fecha_0 y fecha_inicial es igual a fecha_1?
        if a == fecha_1:
            # El periodo establecido inicia cuando termina
            # el proceso del lote
            Dt.append([0 for j in range(len(xt) - 1)] + [1])
            at.append([0 for _ in range(len(xt) - 1)] + [xt[-1]])
            bt.append([0 for _ in range(len(xt) - 1)] + [xt[-1]])
        else:
            # El periodo establecido termina cuando inicia
            # el proceso del lote
            Dt.append([1] + [0 for j in range(len(Xt) - 1)])
            at.append([1] + [0 for j in range(len(Xt) - 1)])
            bt.append([1] + [0 for j in range(len(Xt) - 1)])
    else:
        # El periodo establecido es un solo dia
        if fecha_0 > fecha_inicial or fecha_inicial > fecha_1:
            # El dia establecido no esta dentro del proceso del lote
            return Dt, at, bt
        
        # Distancia en dias entre el dia establecido y el
        # inicio del proceso del lote
        z = (fecha_inicial - fecha_0).days
        
        # Inicializar contadores de dias
        anterior = 0
        actual = 0
        
        # Inicializar filas de matrices Dt, aT y bT
        Dti = []; ati = []; bti = []

        for j in range(len(Xt)):
            actual += xt[j]

            # ¿El dia establecido esta en la etapa actual?
            if anterior < z and z <= actual:
                Dti.append(1)
                ati.append(z-anterior)
                bti.append(z-anterior)
            else:
                Dti.append(0)
                ati.append(0)
                bti.append(0)

            anterior = actual

        # Actualizar filas de matrices DT, aT y bT
        Dt.append(Dti)
        at.append(ati)
        bt.append(bti)
    
    return Dt, at, bt

def intervalo(Xt: dict[str, int], a: datetime.datetime, b: datetime.datetime, fecha_0: datetime.datetime, fecha_1: datetime.datetime) -> tuple[list[int], list[int], list[int]]:
    '''
    Esta función realiza el cálculo de una fila de la matriz Dt cuando la intersección del intervalo del proceso del porcino con el periodo establecido es un solo día.

    ## Argumentos

    `Xt (dict[str,int])`: diccionario de etapas y días por etapa correspondientes al tipo de porcino considerado. El diccionario tiene el formato:
    ```py
    {'nombre etapa':dias}
    ```

    `a (datetime.datetime)`: fecha que representa el máximo entre las fechas iniciales del periodo establecido y del proceso del tipo de porcino considerado.

    `b (datetime.datetime)`: fecha que representa el mínimo entre las fechas finales del periodo establecido y del proceso del tipo de porcino considerado.

    `fecha_0 (datetime.datetime)`: fecha del inicio del proceso del tipo de porcino considerado.

    `fecha_1 (datetime.datetime)`: fecha final del proceso del tipo de cerdo considerado.

    ## Retornos

    `Dt (list[int])`: lista de números enteros correspondiente a una fila de la matriz DT. Los números enteros representan la cantidad de días de consumo del lote de porcinos en cuestión. La longitud de esta lista es el número de etapas del proceso del tipo de porcino considerado.

    `at (list[int])`: lista de números enteros correspondiente a una fila de la matriz aT. Los números enteros representan los días de corte correspondientes al inicio del periodo establecido. La longitud de esta lista es el número de etapas del proceso del tipo de porcino considerado.

    `bt (list[int])`: lista de números enteros correspondiente a una fila de la matriz bT. Los números enteros representan los días de corte correspondientes al fin del periodo establecido. La longitud de esta lista es el número de etapas del proceso del tipo de porcino considerado.

    ## Ejemplo de uso

    ```py
    Dt, at, bt = intervalo(Xt, a, b, fecha_0, fecha_1)
    ```
    '''

    # Inicializar filas de matrices DT, aT y bT
    Dt = []; at = []; bt = []

    # Calcular cantidad de dias que se deben saltar
    saltar_dias = np.max([(a - fecha_0).days, 0])

    # Calcular cantidad de dias desde fecha_0 hasta el 
    # fin del periodo establecido
    total_dias = np.min([(b - fecha_0).days, (fecha_1 - fecha_0).days])

    # Inicializar contadores de dias
    actual = 0
    anterior = 0

    # Inicializar filas de matrices DT, aT y bT
    Dti = []; ati = []; bti = []

    # Inicializar banderas de dias incompletos
    flag_0, flag_1 = True, True

    for x in Xt.values():
        actual += x

        #¿El inicio del periodo establecido no cae dentro de
        # la etapa actual?
        if actual - saltar_dias <= 0 and flag_0:
            # Saltar dias que no estan en el rango
            Dti.append(0)
            ati.append(0)
            bti.append(0)

        elif flag_0:
            # Asignar dias incompletos (al saltar dias)
            dias_incompletos = actual - saltar_dias
            b = x + 1
            
            # ¿El fin del periodo establecido cae dentro de
            # la etapa actual?
            if total_dias - actual < 0:
                flag_1 = False
                dias_incompletos = total_dias - saltar_dias
                b =  total_dias - anterior

            Dti.append(dias_incompletos)
            ati.append(saltar_dias - anterior)
            bti.append(b)

            flag_0 = False
        # ¿El fin del periodo establecido no cae dentro de
        # la etapa actual?
        elif total_dias - actual >= 0 and flag_1:
            # Asignar dias completos
            Dti.append(x)
            ati.append(0)
            bti.append(x + 1)
        elif flag_1:
            # Asignar dias incompletos (al omitir dias)
            flag_1 = False
            Dti.append(total_dias- anterior)
            bti.append(total_dias- anterior)
            ati.append(0)
        else:
            # Omitir dias que no estan en el rango
            Dti.append(0)
            ati.append(0)
            bti.append(0)

        anterior = actual

    Dt.append(Dti)
    at.append(ati)
    bt.append(bti)
    
    return Dt, at, bt

def obtener_NT(
        Nt: np.ndarray,
        sT: np.ndarray
    ) -> np.ndarray:
    '''
    Esta función calcula la matriz de supervivencia de los lotes dado el número de porcinos por lote y la tasa de supervivencia en cada etapa sT.

    ## Argumentos

    `Nt (np.ndarray)`: número de porcinos considerados en cada lote. Las dimensiones de esta matriz son: `(número de lotes,1)`.

    `sT (np.ndarray)`: tasa de superviviencia en cada etapa del tipo de porcino considerado. Las dimensiones de esta matriz son: `(1,número de etapas)`.

    ## Retornos

    `NT (np.ndarray)`: matriz NT cuyas entradas representan el número de porcinos en el lote i en la etapa j dada la tasa de supervivencia acumulada hasta la etapa j. Las dimensiones de esta matriz son `(número de lotes, número de etapas)`.

    ## Ejemplo de uso

    ```py
    NT = obtener_NT(Nt, sT)
    ```
    '''
    
    NT = np.floor(np.matmul(Nt, sT)).astype(np.int32)

    return NT

def obtener_matriz(
        Xt: dict[str, int], 
        fecha_inicial: datetime.datetime, 
        fecha_final: datetime.datetime, 
        lotes: list[tuple[datetime.datetime, int]],
        sT: np.ndarray
    ) -> tuple[np.ndarray, np.ndarray, np.ndarray, np.ndarray]:
    '''
    Esta función obtiene las matrices Dt, at y bt, así como el vector Nt.

    ## Argumentos

    `Xt (dict[str,int])`: diccionario de etapas y días por etapa correspondientes al tipo de porcino considerado. El diccionario tiene el formato:
    ```py
    {'nombre etapa':dias}
    ```

    `fecha_inicial (datetime.datetime)`: fecha inicial del periodo establecido.

    `fecha_final (datetime.datetime)`: fecha final del periodo establecido.

    `lotes (list[tuple[datetime.datetime,int]])`: lista de lotes del tipo de porcino considerado, los cuales están definidos por la fecha de inicio de su proceso y el número de porcinos en dicho lote.

    `sT (np.ndarray)`: tasa de superviviencia por etapa del tipo de porcino considerado.

    ## Retornos

    `Dt (np.ndarray)`: matriz DT, la cual tiene por entradas el número de días que cada lote pasa en cada etapa de su proceso en el periodo establecido. Las dimensiones de esta matriz son: `(número de lotes, número de etapas del tipo de porcino considerado)`.

    `Nt (np.ndarray)`: matriz NT cuyas entradas representan el número de porcinos en el lote i en la etapa j dada la tasa de supervivencia acumulada hasta la etapa j. Las dimensiones de esta matriz son `(número de lotes, número de etapas)`.

    `at (np.ndarray)`: matriz aT, la cual tiene por entradas los días de corte correspondientes al inicio del periodo establecido. Las dimensiones de esta matriz son: `(número de lotes, número de etapas del tipo de porcino considerado)`.

    `bt (np.ndarray)`: matriz bT, la cual tiene por entradas los días de corte correspondientes al fin del periodo establecido. Las dimensiones de esta matriz son: `(número de lotes, número de etapas del tipo de porcino considerado)`.

    ## Ejemplo de uso

    ```py
    Dt, Nt, at, bt = obtener_matriz(Xt, fecha_inicial, fecha_final, lotes, sT)
    ```

    '''

    # Inicializar matrices DT, aT y bT, y vector NT
    Dt = []; Nt = []; at = []; bt = []

    # Obtener dias totales del proceso del tipo de
    # porcino considerado
    dias_totales = sum(Xt.values())

    for fecha_0, n in lotes:
        # Obtener fecha_1: fecha final del proceso
        # del lote del tipo de porcino considerado
        fecha_1 = fecha_0 + datetime.timedelta(days=dias_totales)
        
        # Calcular inicio y fin del intervalo correspindiente
        # al proceso del lote del tipo de porcino considerado
        # restringido al periodo establecido
        a = np.max([fecha_0, fecha_inicial])
        b = np.min([fecha_1, fecha_final])
        es_intervalo = not fecha_inicial == fecha_final
        
        # Obtener caso actual de interseccion de los intervalos
        # [fecha_0,fecha_1] y [fecha_inicial,fecha_final]: 
        #   intervalo: [a,b], dia: {c}, NA
        if (b - a).days < 0 and es_intervalo:
            # NA
            pass
        elif (b - a).days > 0 and es_intervalo:
            # Intervalo
            d, a, b = intervalo(Xt, a, b, fecha_0, fecha_1)
            Dt += d; at += a; bt += b
            Nt.append(n)

        else:
            # Dia individual o Punto
            d, a, b = punto(Xt, es_intervalo, a, fecha_0, fecha_1, fecha_inicial)
            Dt += d; at += a; bt += b
            Nt.append(n)

    # Generar las matrices DT, aT y bT, y vector NT
    Dt = np.array(Dt, dtype=np.int32)
    at = np.array(at, dtype=np.int32)
    bt = np.array(bt, dtype=np.int32)
    Nt = obtener_NT(np.array(Nt).reshape((len(Nt), 1)), sT)

    return Dt, Nt, at, bt

# REVISAR CONDICION PARA NACIMIENTO DE LECHONES
def obtener_fechas_lechones(
        lotes_vientres: list[tuple[datetime.datetime,int]], 
        Xv: dict[str,int], 
        n_lechones: int,
        sv: np.ndarray
    ) -> list[tuple[datetime.datetime,int]]:
    '''
    Esta función calcula las fechas de nacimientos de lechones y la cantidad de lechones nacidos dependiendo de las fechas de ingreso a cuarentena y del tamaño del lote de vientres.

    ## Argumentos

    `lotes_vientres (list[tuple[datetime.datetime,int]])`: lista de lotes de vientres, los cuales están definidos por la fecha de ingreso a cuarentena y el número de vientres en dicho lote.

    `Xv (dict[str,int])`: diccionario de etapas y días por etapa correspondientes a los vientres. El diccionario tiene el formato:
    ```py
    {'nombre etapa':dias}
    ```

    `n_lechones (int)`: número de lechones nacidos por parto por vientre.

    `sv (np.ndarray)`: tasa de superviviencia por etapa del tipo de porcino "vientre".

    ## Retornos

    `lotes_lechones (list[tuple[datetime.datetime,int]])`: lista de lotes de lechones, los cuales están definidos por la fecha de nacimiento y el número de lechones en dicho lote.

    ## Ejemplo de uso

    ```py
    lotes_lechones = obtener_fechas_lechones(lotes_vientres, Xv, n_lechones)
    ```
    '''

    # Inicializar lista de lotes de lechones
    lotes_lechones = []

    for fecha, n in lotes_vientres:
        # Inicializar sublista de lotes de lechones
        offsets = []
        # Inicializar contador de dias
        actual = 0
        
        for (x, v), s in zip(Xv.items(), sv.reshape((sv.shape[1],))):
            actual += v
            
            # ¿Es la etapa del lote de vientres maternidad cargado?
            if 'M' in x and 'C' in x:
                # Agregar lote de lechones a sublista de lotes de lechones
                offsets.append((
                    fecha + datetime.timedelta(days=actual), 
                    int(n * n_lechones * s)
                ))
        
        # Agregar sublista de lotes de lechones a lista de lotes 
        # de lechones
        lotes_lechones += offsets.copy()
    
    return lotes_lechones

def obtener_matrices(
        fecha_inicial: datetime.datetime, 
        fecha_final: datetime.datetime, 
        lotes: dict[str,list[tuple[datetime.datetime,int]]],
        Xts: dict[str,dict[str,int]], 
        tipos_porcinos: list[str],
        sTs: dict[str,np.ndarray]
    ) -> tuple[dict[str,np.ndarray], dict[str,np.ndarray], dict[str,np.ndarray], dict[str,np.ndarray]]:
    '''
    Esta función regresa las matrices DT, aT y bt, así como el vector Nt para cada tipo de porcino considerado.

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

    `tipos_porcinos (list[str])`: tipos de porcinos considerados.

    `sTs (dict[str,np.ndarray])`: tasas de supervivencia por etapa por tipo de porcino.

    ## Retornos

    `Dts (dict[str,np.ndarray])`: diccionario de objetos np.ndarray correspondientes a las matrices DT de cada tipo de porcino considerado. Cada matriz DT tiene por entradas el número de días que cada lote pasa en cada etapa de su proceso en el periodo establecido. Las dimensiones de esta matriz son: `(número de lotes, número de etapas del tipo de porcino considerado)`.

    `Nts (dict[str,np.ndarray])`: diccionario de objetos np.ndarray correspondientes a las matrices NT cuyas entradas representan el número de porcinos en el lote i en la etapa j dada la tasa de supervivencia acumulada hasta la etapa j. Las dimensiones de cada matriz son: `(número de lotes, número de etapas)`.

    `ats (dict[str,np.ndarray])`: diccionario de objetos np.ndarray correspondientes a las matrices aT de cada tipo de porcino considerado. Cada matriz aT tiene por entradas los días de corte correspondientes al inicio del periodo establecido. Las dimensiones de esta matriz son: `(número de lotes, número de etapas del tipo de porcino considerado)`.

    `bts (dict[str,np.ndarray])`: diccionario de objetos np.ndarray correspondientes a las matrices aT de cada tipo de porcino considerado. Cada matriz bT tiene por entradas los días de corte correspondientes al fin del periodo establecido. Las dimensiones de esta matriz son: `(número de lotes, número de etapas del tipo de porcino considerado)`.

    ## Ejemplo de uso

    ```py
    Dts, Nts, ats, bts = obtener_matrices(fecha_inicial, fecha_final, lotes, Xts, n_lechones, sTs)
    ```
    '''
    
    # Inicializar diccionarios de informacion
    Dts = dict(); Nts = dict(); ats = dict(); bts = dict()

    for tipo in tipos_porcinos:
        # Obtener informacion de etapas y lotes 
        # para el tipo de porcino considerado
        Xt, lotes_tipo, sT = Xts[tipo], lotes[tipo], sTs[tipo]

        # Obtener las matrices DT, aT y bT, y el vector NT
        # para el tipo de porcino considerado
        Dt, Nt, at, bt = obtener_matriz(Xt, fecha_inicial, fecha_final, lotes_tipo, sT)
        
        # Agregar informacion del tipo de porcino a diccionarios
        Dts[tipo] = Dt; Nts[tipo] = Nt; ats[tipo] = at; bts[tipo] = bt

    return Dts, Nts, ats, bts
