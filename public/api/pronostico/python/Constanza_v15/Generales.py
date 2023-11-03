import yaml
import json
import random
from collections import Counter
import matplotlib.pyplot as plt
import datetime
import matplotlib.pyplot as plt
import logging
import re

class Generales:
    def __init__(self, ConfigPredeterminada: str):
        self.ConfigPredeterminada = ConfigPredeterminada
        #self.RFID = RFID


    def CargaArchivosGenerales(self):
        """ 

        |ConfigPredeterminada: str  | Revisar README.md  1.4. (1-5) | Se cargan los archivos que seran de uso general para los cerdos, como precio de los alimentos, medicamentos y tratamientos.|
        
        
        return los archivos de configuracion de Alimento, Enfermedades, Medicamentos
        """
        with open(self.ConfigPredeterminada, 'r') as yaml_file:
            contenido = yaml.load(yaml_file, Loader=yaml.FullLoader)

        #Archivos de configuracion general
        Ruta_Alimento     = contenido['archivos'][0]['Alimento_yaml']
        Ruta_Enfermedades = contenido['archivos'][1]['Enfermedades_yaml']
        Ruta_Medicamentos = contenido['archivos'][2]['Medicamentos_yaml']
        Ruta_FechasInhabiles = contenido['archivos'][3]['FechasInhabilbes_yaml']
        Ruta_InversionAcumulada = contenido['archivos'][4]['InversionAcumulada_json']
        #
        with open(Ruta_Alimento, 'r',encoding='utf-8') as archivo_yaml:
            Alimento = yaml.load(archivo_yaml, Loader=yaml.FullLoader)

        with open(Ruta_Enfermedades, 'r',encoding='utf-8') as archivo_yaml:
            Enfermedades = yaml.load(archivo_yaml, Loader=yaml.FullLoader)

        with open(Ruta_Medicamentos, 'r',encoding='utf-8') as archivo_yaml:
            Medicamentos = yaml.load(archivo_yaml, Loader=yaml.FullLoader)

        with open(Ruta_FechasInhabiles, 'r',encoding='utf-8') as archivo_yaml:
            DiasInhabiles = yaml.load(archivo_yaml, Loader=yaml.FullLoader)

        with open(Ruta_InversionAcumulada, 'r',encoding='utf-8') as archivo:
            InversionAcumulada = json.load(archivo)
        return Alimento, Enfermedades, Medicamentos, DiasInhabiles, InversionAcumulada
    
    
    
class CrearCerdo:
    def __init__(self, 
                 FechaRegistro: str,
                 RFID:str, 
                 Tipo:str,
                 Ruta: str, 
                 Estado: str,
                 Granja: str,
                 Ubicacion: str,
                 DiasEnArea: int,
                 AlimentoDia1: dict,
                 PadecimientosDia1: dict,
                 MedicamentoDia1:dict,
                 ):
        self.FechaRegistro     = FechaRegistro
        self.RFID              = RFID
        self.Ruta              = Ruta
        self.Tipo              = Tipo
        self.Estado            = Estado
        self.Granja            = Granja
        self.Ubicacion         = Ubicacion
        self.DiasEnArea        = DiasEnArea
        self.AlimentoDia1      = AlimentoDia1
        self.PadecimientosDia1 = PadecimientosDia1
        self.MedicamentoDia1   = MedicamentoDia1

        

    def PlanRutaCerdo(self):
        """
        Se requiere la direccion del archivo que describe el proceso de trazabilidad del cerdo
        (Ver README en  1.4.1)
        return: Etapas.yaml
        """
        with open(self.Ruta, 'r',encoding='utf-8') as archivo_yaml:
            Etapas = yaml.load(archivo_yaml, Loader=yaml.FullLoader)
        return Etapas
    
    def CreacionExpediente(self):
        
        """ 
        | Var: *type*       |  Ejemplo                    |  Descripciion                                                   |
        |-------------------|-----------------------------|-----------------------------------------------------------------|
        |RFID: str          | "RFID001", "RFID101"        | Indica el numero unico de identificacion                        |
        |FechaRegistro      | 2023-10-12 09:42:29.533943  | Indica el dia y hora en que el cerdo fue dado de alta           |
        |Tipo: str          | "F1AP", "F1AN", "Ce", "CDI" | Indica el tipo de cerdo que se esta registrando                 |
        |Estado: str        | "Vivo", "Muerto"            | Indica el estado del cerdo                                      |
        |Condicion: str     | "Enfermo", "Preñada"        | Indica la condición del cerdo                                   |
        |Granja: str        | "LaPurisima", "Santiago"    | Indica la granja en la que se registra o su granja destino      |
        |Ubicacion: str     | "Transporte", "Cuarentena"  | Indica la ubicacipn dentro del proceso, no la ubicación fisica  |
        |Alimento: dict     | Revisar README.md  2.1.1    | Informacion relevante sobre el consumo de alimento              |
        |Medicamento: dict  | Revisar README.md  2.1.2    | Informacion relevante sobre el consumo de medicamentos          |
        |Padecimientos: dict| Revisar README.md  2.1.3    | Informacion relevante sobre los padecimientos actuales          |

        Return **Expente Individual**: Es un diccionario a partir del cual se realiza el registro del proceso de trazabilidad del 
        cerdo en las diferentes etapas  
        """
        ExpedienteIndivdual = {}
        ExpedienteIndivdual[self.RFID]= {}
        ExpedienteIndivdual[self.RFID]["Dia 1"] ={}  #su primer dia en el sistema
        #Descripcion General .strftime('%d-%m-%Y')
        ExpedienteIndivdual[self.RFID]["Dia 1"]["FechaRegistro"] = self.FechaRegistro
        ExpedienteIndivdual[self.RFID]["Dia 1"]["Tipo"] = self.Tipo
        ExpedienteIndivdual[self.RFID]["Dia 1"]["Estado"] = self.Estado
        ExpedienteIndivdual[self.RFID]["Dia 1"]["Granja"] = self.Granja
        ExpedienteIndivdual[self.RFID]["Dia 1"]["Ubicacion"] = self.Ubicacion
        ExpedienteIndivdual[self.RFID]["Dia 1"]["DiasEnArea"] = self.DiasEnArea

        #Alimento
        ExpedienteIndivdual[self.RFID]["Dia 1"]["Alimento"] = self.AlimentoDia1
        #Padecimientos
        ExpedienteIndivdual[self.RFID]["Dia 1"]["Padecimientos"] = self.PadecimientosDia1
        #Medicamento
        ExpedienteIndivdual[self.RFID]["Dia 1"]["Medicamento"] = self.MedicamentoDia1
        
        return ExpedienteIndivdual
    
    #se agrega el RFID en el archivo de inversion acumulada
    def CracionHistorial(self,
                         InversionAcumulada:dict):
        
        InversionAcumulada[self.RFID] = {'GastoAlimento': 0, 'TotalKgAlimento': 0, 'TiposAlimentos': {}, 'AlimentoEtapas': {}, 'GastoMedicamentos': 0, 'TiposMedicamentos': {}, 'MedicamentoEtapas': {}}
        return InversionAcumulada
    
    def PreAjusteFechasDinamico(self, 
                                ConfigInicial: dict, 
                                ProtocoloTrazabilidad: dict):
    
        """ 
        Se recibe un diccionario que indica el procedimiento que debe de seguir el cerdo, este archivo es diferente para F1, CDI, Cerdos de engorda, etcetera. 
        Se requiere tambien de un diccionario (ConfigInicial) que tiene la informacion del cerdo en especial, donde se requiere la Ubicacion y dias en esa ubicacion. 

        La salida es un archivo que nos dice el recorrido que debe de realizar la cerda
        
        Variables: 

        * ConfigInicial: dict | Cuando se registra un cerdo en el sistema, se registra informacion basica sobre el estado del
            cerdo, como la ubicacion actual, dias en area. 
        * ProtocoloTrazabilidad: dict  |  Es un archivo que detalla las etapas que debe de seguir el cerdo, los tiempos que 
            debe de durar en cada etapa, la comida por dia que debe de ingerir, medicamentos (en caso de ser necesario).
        """
        # ConfigInicial = Estado
        #Etapas = ProtocoloTrazabilidad
        EtapaActual = ConfigInicial[self.RFID]["Dia 1"]["Ubicacion"]
        DiasAlojados= ConfigInicial[self.RFID]["Dia 1"]["DiasEnArea"]

        ListaEtapas = ProtocoloTrazabilidad["Etapas"] #El listado completo de etapas 
        DiasRestantes = ProtocoloTrazabilidad[EtapaActual]["Duracion"]-DiasAlojados #Dias restantes

        #Semana = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"]

        DiccEtapasRestantes = {} #Esta sera la salida de la funcion
        EtapasRestantes = ListaEtapas[(ListaEtapas.index(EtapaActual)+1): len(ListaEtapas)] #todas las etapas (a paertir de donde esta ubicado actualmente)
        #Se guarda la configuracion de la etapa actual
        DiccEtapasRestantes[EtapaActual]=DiasRestantes
        #Para las etapas restantes
        for i in range(len(EtapasRestantes)):
            #print(EtapasRestantes[i], Etapas[EtapasRestantes[i]]["Duracion"])
            DiccEtapasRestantes[EtapasRestantes[i]] = ProtocoloTrazabilidad[EtapasRestantes[i]]["Duracion"]

        return DiccEtapasRestantes


    def AjusteFechasDinamico(self,
                             FechasPreAjustadas:dict,
                             ExpedienteIndividual: dict,
                             Ruta_FechasInhabiles:str):
        """ 
        FechasPreAjustadas: Un diccionario que contiene los dias que el cerdo va a estar en cada etapa
        """
        with open(Ruta_FechasInhabiles, 'r',encoding='utf-8') as archivo_yaml:
            DiasInhabiles = yaml.load(archivo_yaml, Loader=yaml.FullLoader)
 

        dia = "Dia 1"
        Ubicacion = {} #.strftime('%d-%m-%Y')

        Semana = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"]
        DiaRegistro = datetime.datetime.strptime(ExpedienteIndividual[self.RFID][dia]["FechaRegistro"], "%d-%m-%Y %H:%M:%S")
        Dia_Actual = DiaRegistro   #Para tener el dia en formato AAAA/MM/Dia

        for etapa, duracion in FechasPreAjustadas.items():
            
            Ubicacion[etapa]={}
            Ubicacion[etapa]["DiaInicio"] = Dia_Actual.strftime('%d-%m-%Y')
            Ubicacion[etapa]["DiaSemanaInicio"] = Semana[Dia_Actual.weekday()]
            DuracionEtapa = duracion
            Dia_Actual += datetime.timedelta(days=duracion-1)


            #Revisamos que los proceso no temien en un dia inhabil
            while Dia_Actual.strftime('%d-%m-%Y') in DiasInhabiles.values():
            
                for Clave, valor in DiasInhabiles.items():
                    if Dia_Actual.strftime('%d-%m-%Y') == valor:
                        DiaInhabil = Clave
                
                if Semana[Dia_Actual.weekday()] == "Lunes" or Semana[Dia_Actual.weekday()] == "Domingo":
                    logging.info(f"Ajuste en el cerdo con RFID {self.RFID}. La etapa de {etapa} termina el {Semana[Dia_Actual.weekday()]} {Dia_Actual.strftime('%d-%m-%Y')}, que es feriado por motivo de {DiaInhabil}, se retrasa  1 dia el proceso. Por lo cual inicia el {Dia_Actual+datetime.timedelta(days= +1)}")
                    DuracionEtapa += 1
                    Dia_Actual += datetime.timedelta(days=+1)
                else:
                    logging.info(f"Ajuste en el cerdo con RFID {self.RFID}. La etapa de {etapa} termina el {Semana[Dia_Actual.weekday()]} {Dia_Actual.strftime('%d-%m-%Y')}, que es feriado por motivo de {DiaInhabil}, se adelanta  1 dia el proceso. Por lo cual inicia el {Dia_Actual+datetime.timedelta(days= -1)}")
                    DuracionEtapa -= 1
                    Dia_Actual += datetime.timedelta(days=-1)


            #Revisamos que los procesos no termienen fin de semana
            if Semana[Dia_Actual.weekday()] == "Domingo":
                logging.info(f"Ajuste en el cerdo con RFID {self.RFID}. La etapa de {etapa} no puede finalizar el Domingo {Dia_Actual.day}-{Dia_Actual.month}-{Dia_Actual.year}, se agregara un dia. Por lo cual inicia el {(Dia_Actual+datetime.timedelta(days= 1))}")
                Dia_Actual += datetime.timedelta(days=1)
                DuracionEtapa += 1
            elif Semana[Dia_Actual.weekday()] == "Sabado":
                logging.info(f"Ajuste en el cerdo con RFID {self.RFID}. La etapa de {etapa} no puede finalizar el Sabado {Dia_Actual.day}-{Dia_Actual.month}-{Dia_Actual.year}, se agregaran dos dias. Por lo cual inicia el {(Dia_Actual+datetime.timedelta(days= 2))}")
                Dia_Actual += datetime.timedelta(days=2)
                DuracionEtapa += 2
            #En el caso de destete, no puede ocurrir en jueves o viernes para evitar romper el ciclo de fecundacion 
            if  "Zen" in etapa:
                if Semana[Dia_Actual.weekday()] == "Jueves":
                    logging.info(f"Ajuste en el cerdo con RFID {self.RFID}. Para lograr una oportuna fecundacion, se adelanta el proceso de destete un dia a partir del {Dia_Actual.day}-{Dia_Actual.month}-{Dia_Actual.year}, por lo cual inicia el {(Dia_Actual+datetime.timedelta(days= -1))}")
                    Dia_Actual += datetime.timedelta(days= -1)
                    DuracionEtapa -= 1
                elif Semana[Dia_Actual.weekday()] == "Viernes":
                    logging.info(f"Ajuste en el cerdo con RFID {self.RFID}. Para lograr una oportuna fecundacion, se retrasa el proceso de destete 3 dias a partir del {Dia_Actual.day}-{Dia_Actual.month}-{Dia_Actual.year}, por lo cual inicia el {(Dia_Actual+datetime.timedelta(days= +3))}")
                    Dia_Actual += datetime.timedelta(days= +3)
                    DuracionEtapa += 3
            Ubicacion[etapa]["Duracion"] = DuracionEtapa
            Ubicacion[etapa]["DiaFin"] = Dia_Actual.strftime('%d-%m-%Y')
            Ubicacion[etapa]["DiaSemanaFin"] = Semana[Dia_Actual.weekday()]
        return Ubicacion
    

    def UbicacionaExplicita(self, 
                  ExpedienteCerdo:dict,
                  FechasAjustadas: dict):
            """
            |Nombre    | Tipo de var|
            |-----------------|-----|
            | ExpedienteCerdo | dict|
            | FechasAjustadas | dict|
            | self.RFID       | str |
            Con base a las fechas Ajustadas, es decir el dia en que debe de salir un cerdo de un area determiada
             y con el Expediente del cerdo el cual nos indica la ubicacion y dias que lleva en dicha area, 
             se genera uunn diccionario que nos indica completamente donde debera de encontrarse em todo momento dentro 
             del ciclo especificado.

             Return: El diccionarui con la ubicacion ajustada
            """
            V = {}
            Semana = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"]
            FechaRegistro = datetime.datetime.strptime(ExpedienteCerdo[self.RFID]["Dia 1"]["FechaRegistro"], '%d-%m-%Y %H:%M:%S')
            DiaActual = FechaRegistro
            # print(type(DiaActual))
            d = 1

            for NombreEtapa, descripcion in FechasAjustadas.items():
                if d == 1:
                        # Obtiene el valor de "DiasEnArea" desde el expediente del cerdo
                        dias_en_area = ExpedienteCerdo[self.RFID]['Dia 1']["DiasEnArea"]
                else:
                    dias_en_area = descripcion.get("DiasEnArea", 1)
                for diaEnArea in range(descripcion["Duracion"]):
                    V[f"Dia {d}"]= {}
                    V[f"Dia {d}"]["Etapa"] = NombreEtapa
                    V[f"Dia {d}"]["DiasEnArea"] = dias_en_area
                    V[f"Dia {d}"]["Fecha"] = DiaActual.strftime('%d-%m-%Y')
                    V[f"Dia {d}"]["DiaSemana"] = Semana[DiaActual.weekday()]
                    V[f"Dia {d}"]["InformacionAdicional"] = {}
                    #Acrualizacion de los contadores 
                    DiaActual += datetime.timedelta(days= +1)
                    d += 1
                    dias_en_area += 1

            return V

    def ControlAlimentos(self, 
                         ConfigInicial:dict, 
                         ProtocoloTrazabilidad:dict, 
                         InversionAcumulada:dict, 
                         ConfigAlimentos: dict,
                         ExpedienteCerdo:dict):
        """
        |Variable             | Type | Ejemplo(*) |
        |---------------------|------|--------------------|
        |ConfigInicial        | dict | ExpedienteCerdo    |
        |ProtocoloTrazabilidad| dict | Etapas             |
        |InversionAcumulada   | dict | InversionAcumulada |
        |ConfigAlimentos      | dict | Alimentos          |
        |dia                  | int  | 2                  | 

        Con base a los requisitos definidos en su plan de ruta, el precio del alimento se identifica el consumo diario
        asi como la inversion realizada. 
        Se actualiza el diccionario de inversion acumulada.
        """
        #Accedemos al ultimo dia registrado en el expediente del cerdo
        DiaAnterior = list(ExpedienteCerdo[self.RFID].keys())[-1]
        dia = [int(s) for s in DiaAnterior.split() if s.isdigit()][-1]

        #Cargamos las variables
        Etapa = ConfigInicial[self.RFID][f"Dia {dia}"]["Ubicacion"]# UbicacionCerdoId[f"Dia {dia}"]["Etapa"] #ConfigInicial[RFID][f"Dia {dia}"]["Ubicacion"]
        NombreAlimento = ProtocoloTrazabilidad[Etapa]["TipoAlimento"]
        mean = ProtocoloTrazabilidad[Etapa]["ConsumoDiarioKg"]
        dispersion = ProtocoloTrazabilidad[Etapa]["VariacionKg"]
        Consumo = random.uniform(mean-dispersion, mean+dispersion )

        #Realizar el calculo de la inversion
        PrecioDia = ConfigAlimentos[NombreAlimento]["Precio"] #PronosticoPrecioAlimento[f"Dia {dia}"] 
        InversionDia = PrecioDia*Consumo

        #Creamos la salida de esta funcion 
        Alimento = {'Kg': Consumo, 
                    "NombreAlimento": NombreAlimento,
                    'Inversion': InversionDia
                    }

        # #Actualizamos el Estado.json en la seccion "InversioAcumulada" 
        #InversionAcumulada
        Anterior = InversionAcumulada[self.RFID]
        Anterior["TotalKgAlimento"] += Consumo
        Anterior["GastoAlimento"] += InversionDia
        #se actualizan los diferentes tipos de alimento
        if NombreAlimento in InversionAcumulada[self.RFID]['TiposAlimentos']:
            Anterior['TiposAlimentos'][NombreAlimento] += Consumo
        else: 
            Anterior['TiposAlimentos'][NombreAlimento] = Consumo

        #Se actualizan los diferentes tipos de alimento en las diferentes etapas
        if Etapa in InversionAcumulada[self.RFID]["AlimentoEtapas"]:
            Anterior['AlimentoEtapas'][Etapa] += Consumo
        else: 
            Anterior['AlimentoEtapas'][Etapa] = Consumo

        #Anterior es 
        return Anterior, Alimento
 
    def ActualizacionTratamientos(self,
                                  ExpedienteCerdo:dict, 
                                  ConfigInicial:dict,
                                  Enfermedades:dict):
        """
        |Variable      |Type |Ejemplo| Descripcion |
        |--------------|-----|-------|-------------|
        |ConfigInicial |dict |       |             |
        |Enfermedades  |dict |       |             |
        |dia           |int  |       |             |

        Revisa los tratamientos que se aplicaron el dia anterior o en su defecto el dia
        que se registro el cerdo. En caso de encontrar tratamientos se revisa si en el dia actual aun estan vigentes
        o si temrino ya su tiempo de aplicacion. Aquellos que aun tengan dias restantes > 0 se actauliza el diccioanrio de
        tratamiento.
        return: Padecimientos, Tratamiento. El primero es un diccionario que contiene la informacion actualizada del padecimiento
        en caso de que no tenga dias restantes se elimina y en caso de tener se mantiene actualizado. El segunto indica la cantidad 
        de medicamentos a aplicarse.

        """
        #Accedemos al ultimo dia registrado en el expediente del cerdo
        DiaAnterior = list(ExpedienteCerdo[self.RFID].keys())[-1]
        dia = [int(s) for s in DiaAnterior.split() if s.isdigit()][-1]
        
        Hoy =  f"Dia {dia}"
        Ayer = f"Dia {dia-1}"
        Padecimientos = {}
        Tratamiento = {}
        #ListaTratamientosFinalizados = [] 
        #Analizamos si existe historia reciente sobre tratamietos aplicados en el cerdo
        if Ayer in ConfigInicial[self.RFID]: 

            EstadoAnterior = ConfigInicial[self.RFID][Ayer]
            for enfermedad, Descripcion in EstadoAnterior["Padecimientos"].items():
                #Evaluar si un tratamiento aun se aplica el dia de hoy:
                #print(Descripcion)
                if Descripcion["DiasRestantes"] > 0:              
                    Padecimientos[enfermedad]= {}
                    Padecimientos[enfermedad]["NombrePadecimiento"] = Enfermedades[enfermedad]["Nombre"]
                    Padecimientos[enfermedad]["DiasTratamiento"] = EstadoAnterior["Padecimientos"][enfermedad]["DiasTratamiento"] + 1
                    x = EstadoAnterior["Padecimientos"][enfermedad]["DiasTratamiento"] + 1
                    Tratamiento = dict(Counter(Tratamiento)+ Counter(Enfermedades[enfermedad]["Tratamiento"]["Aplicacion"][f"Dia {x}"]))
                    Padecimientos[enfermedad]["DiasRestantes"] = EstadoAnterior["Padecimientos"][enfermedad]["DiasRestantes"]-1 
            
            
            enfermedades_actuales = list(Padecimientos.keys())
            todas_enfermedades = list(Enfermedades["Nombres"])
            enfermedades_disponibles = list(set(todas_enfermedades)-set(enfermedades_actuales))
            ProbAdquirirEnferdedad = []
            for EnfermedadDisponible in enfermedades_disponibles:
                ProbAdquirirEnferdedad.append(Enfermedades[EnfermedadDisponible]["ProbAdquisicion"])
            if len(ProbAdquirirEnferdedad) == 0:
                ProbPromEnfermar = 0
            else:
                ProbPromEnfermar = sum(ProbAdquirirEnferdedad)/len(ProbAdquirirEnferdedad)
            enfermedades_disponibles.append("None")
            ProbAdquirirEnferdedad.append(1-ProbPromEnfermar)
            enfermedad_seleccionada = random.choices(enfermedades_disponibles, ProbAdquirirEnferdedad, k=1)[0]
            #
            if enfermedad_seleccionada != "None":
                Padecimientos[enfermedad_seleccionada]= {}
                Padecimientos[enfermedad_seleccionada]["NombrePadecimiento"] = Enfermedades[enfermedad_seleccionada]["Nombre"]
                Padecimientos[enfermedad_seleccionada]["DiasTratamiento"]    = 1
                Padecimientos[enfermedad_seleccionada]["DiasRestantes"]    = Enfermedades[enfermedad_seleccionada]["Tratamiento"]["Duracion(dias)"]-1
                # x = Enfermedades[enfermedad_seleccionada]["DiasTratamiento"] 
                Tratamiento = dict(Counter(Tratamiento)+ Counter(Enfermedades[enfermedad_seleccionada]["Tratamiento"]["Aplicacion"][f"Dia {1}"]))
        
            
            
        else:
            #Si no hay registro del un dia anterior, el historial es el dia que se registro el cerdo
            EstadoAnterior = ConfigInicial[self.RFID][Hoy]
            for enfermedad, Descripcion in EstadoAnterior["Padecimientos"].items():
                Padecimientos[enfermedad]= {}
                Padecimientos[enfermedad]["NombrePadecimiento"] = Enfermedades[enfermedad]["Nombre"]
                Padecimientos[enfermedad]["DiasTratamiento"] = EstadoAnterior["Padecimientos"][enfermedad]["DiasTratamiento"] 
                x = EstadoAnterior["Padecimientos"][enfermedad]["DiasTratamiento"] 
                Padecimientos[enfermedad]["DiasRestantes"] = EstadoAnterior["Padecimientos"][enfermedad]["DiasRestantes"]
                Tratamiento = dict(Counter(Tratamiento)+ Counter(Enfermedades[enfermedad]["Tratamiento"]["Aplicacion"][f"Dia {x}"]))
        #asignacion de nuevas enfermedades, se revisan las enfermedades que tiene el cerdo y con base a la probabilidad 
        #de adquisicion se asigna una nueva enfermedad.
        #Se realiza agregar una nueva enfermedad con base a las prob. 
            enfermedades_actuales = list(Padecimientos.keys())
            todas_enfermedades = list(Enfermedades["Nombres"])
            enfermedades_disponibles = list(set(todas_enfermedades)-set(enfermedades_actuales))
            ProbAdquirirEnferdedad = []
            for EnfermedadDisponible in enfermedades_disponibles:
                ProbAdquirirEnferdedad.append(Enfermedades[EnfermedadDisponible]["ProbAdquisicion"])
            ProbPromEnfermar = sum(ProbAdquirirEnferdedad)/len(ProbAdquirirEnferdedad)
            enfermedades_disponibles.append("None")
            ProbAdquirirEnferdedad.append(1-ProbPromEnfermar)
            enfermedad_seleccionada = random.choices(enfermedades_disponibles, ProbAdquirirEnferdedad, k=1)[0]
            #
            if enfermedad_seleccionada != "None":
                Padecimientos[enfermedad_seleccionada]= {}
                Padecimientos[enfermedad_seleccionada]["NombrePadecimiento"] = Enfermedades[enfermedad_seleccionada]["Nombre"]
                Padecimientos[enfermedad_seleccionada]["DiasTratamiento"]    = 1
                Padecimientos[enfermedad_seleccionada]["DiasRestantes"]    = Enfermedades[enfermedad_seleccionada]["Tratamiento"]["Duracion(dias)"]-1
                # x = Enfermedades[enfermedad_seleccionada]["DiasTratamiento"] 
                Tratamiento = dict(Counter(Tratamiento)+ Counter(Enfermedades[enfermedad_seleccionada]["Tratamiento"]["Aplicacion"][f"Dia {1}"]))
      

        # print(Padecimientos, Tratamiento)
        # print("////////////////////////////////////////////////////////")
        return Padecimientos, Tratamiento
    

    def MedicacionPreventiva(self,
                            ExpedienteCerdo:dict,
                            Adicionales: dict, 
                            ConfigInicial: dict):
        """
        En caso de existir medicamento preventivo que se aplique en el dia actual, El cual tiene que estar registrado 
        en Etapas se agregan.

        """
        #Accedemos al ultimo dia registrado en el expediente del cerdo
        DiaAnterior = list(ExpedienteCerdo[self.RFID].keys())[-1]
        dia = [int(s) for s in DiaAnterior.split() if s.isdigit()][-1]
        

        Hoy = f"Dia {dia}"
        Ubicacion =  ConfigInicial[self.RFID][Hoy]["Ubicacion"]
        DiasEnArea = ConfigInicial[self.RFID][Hoy]["DiasEnArea"]

        x = f"Dia {DiasEnArea}"

        if x in Adicionales[Ubicacion]["Medicamentos"]:
            MedicamentosAdicionales = Adicionales[Ubicacion]["Medicamentos"][x]
        else:
            MedicamentosAdicionales = {}

        return MedicamentosAdicionales
    
    def ControlMedicamentos(self,
                            UbicacionCerdoId:dict,
                            Tratamiento:dict,
                            Adicionales:dict,
                            Dicc_Medicamentos:dict,
                            InversionAcumulada :dict,
                            ExpedienteCerdo:dict):
        """ 
        Actualiza en caso de enfermedad o padecimiento, regresa lo relacionado a Medicamento y Padecimientos en el registro diario, 
        así como la actualización a la inversion acumulada
        """
        #Accedemos al ultimo dia registrado en el expediente del cerdo
        DiaAnterior = list(ExpedienteCerdo[self.RFID].keys())[-1]
        dia = [int(s) for s in DiaAnterior.split() if s.isdigit()][-1]
        
        Etapa = UbicacionCerdoId[f"Dia {dia}"]["Etapa"]  #Estado[RFID][f"Dia {dia}"]["Ubicacion"]
        MedicamentosPorAplicar = dict( Counter(Tratamiento) + Counter(Adicionales))
        MedicamentosDesglozados = {}
        InversionAcumuladaPorDiaMedicamentos = 0 
        for medicamento, cantidad in MedicamentosPorAplicar.items():
            InversionIndividual = Dicc_Medicamentos[medicamento]*cantidad
            MedicamentosDesglozados[medicamento] = {"Cant": cantidad, 
                                                    "Inversion":InversionIndividual}
            InversionAcumuladaPorDiaMedicamentos += InversionIndividual


        #se actualizan los diferentes tipos de medicamentos
        for NombreMedicamento, descripcion in MedicamentosDesglozados.items():
            if NombreMedicamento in InversionAcumulada[self.RFID]["TiposMedicamentos"]:
                # InversionAcumulada[RFID]["TiposMedicamentos"][NombreMedicamento]["Nombre"] = NombreMedicamento
                InversionAcumulada[self.RFID]["TiposMedicamentos"][NombreMedicamento]["Cant"] += MedicamentosDesglozados[NombreMedicamento]["Cant"]
                InversionAcumulada[self.RFID]["TiposMedicamentos"][NombreMedicamento]["Inversion"] += MedicamentosDesglozados[NombreMedicamento]["Inversion"]
            else:
                InversionAcumulada[self.RFID]["TiposMedicamentos"][NombreMedicamento] = {}
                # InversionAcumulada[RFID]["TiposMedicamentos"][NombreMedicamento]["Nombre"] = NombreMedicamento
                InversionAcumulada[self.RFID]["TiposMedicamentos"][NombreMedicamento]["Cant"] = MedicamentosDesglozados[NombreMedicamento]["Cant"]
                InversionAcumulada[self.RFID]["TiposMedicamentos"][NombreMedicamento]["Inversion"] = MedicamentosDesglozados[NombreMedicamento]["Inversion"]


            if Etapa in InversionAcumulada[self.RFID]["MedicamentoEtapas"]:
                InversionAcumulada[self.RFID]['MedicamentoEtapas'][Etapa] += MedicamentosDesglozados[NombreMedicamento]["Inversion"]
            else:
                InversionAcumulada[self.RFID]['MedicamentoEtapas'][Etapa] = MedicamentosDesglozados[NombreMedicamento]["Inversion"]

        #Actualizamos el Estado
        # Estado[RFID][f'Dia {dia}']['Medicamento']
        Medicamento = {}

        Medicamento["Medicamentos"] = MedicamentosDesglozados
        Medicamento["Inversion"] = InversionAcumuladaPorDiaMedicamentos


        return InversionAcumulada, Medicamento
    
    def SimularNuevoDia(self, 
                      Alimentos:dict,
                      InversionAcumulada:dict,
                      Enfermedades: dict,
                      Medicamentos: dict,
                      ExpedienteCerdo: dict
                      ):
        Etapas = self.PlanRutaCerdo()
        #ExpedienteCerdo = self.CreacionExpediente()

        #print(ExpedienteCerdo)
        FechasPreajustadas = self.PreAjusteFechasDinamico(ConfigInicial=ExpedienteCerdo,
                                                           ProtocoloTrazabilidad=Etapas)
        FechasAjustadas = self.AjusteFechasDinamico(FechasPreAjustadas=FechasPreajustadas,
                                                    ExpedienteIndividual=ExpedienteCerdo,
                                                    Ruta_FechasInhabiles="Generales/FechasInhabiles.yaml")
        
        UbicacionAjustada  = self.UbicacionaExplicita(ExpedienteCerdo=ExpedienteCerdo,
                                                FechasAjustadas=FechasAjustadas)
        
        #Control de alimentos (1 vez cada dia de la vida del cerdo)
        InversionAcumuladaCerdo, AlimentoCerdo      = self.ControlAlimentos(ConfigInicial=ExpedienteCerdo,
                                                                            ProtocoloTrazabilidad=Etapas,
                                                                            InversionAcumulada=InversionAcumulada,
                                                                            ConfigAlimentos=Alimentos,
                                                                            ExpedienteCerdo=ExpedienteCerdo)
        #Control de Medicamentos (1 vez cada dia de la vida del cerdo)
        PadecimientosCerdo, TratamientoCerdo        = self.ActualizacionTratamientos(ExpedienteCerdo=ExpedienteCerdo,
                                                                                    ConfigInicial=ExpedienteCerdo,
                                                                                    Enfermedades=Enfermedades)
        TratamientoPreventivoCerdo                  = self.MedicacionPreventiva(ExpedienteCerdo=ExpedienteCerdo, 
                                                                          Adicionales=Etapas,
                                                                          ConfigInicial=ExpedienteCerdo)
        InversionAcumuladaCerdo, MedicamentoCerdo   = self.ControlMedicamentos(UbicacionCerdoId=UbicacionAjustada,
                                                                                Tratamiento=TratamientoCerdo,
                                                                                Adicionales= TratamientoPreventivoCerdo,
                                                                                Dicc_Medicamentos=Medicamentos,
                                                                                InversionAcumulada=InversionAcumulada,
                                                                                ExpedienteCerdo=ExpedienteCerdo)
        """
        # ExpedienteCerdo = self.AgregarDia(UbicacionAjustada=UbicacionAjustada,
        #                                         ExpedienteCerdo=ExpedienteCerdo,
        #                                         AlimentoCerdo=AlimentoCerdo,
        #                                         PadecimientosCerdo=PadecimientosCerdo,
        #                                         MedicamentoCerdo=MedicamentoCerdo,
        #                                         TratamientoPreventivoCerdo=TratamientoPreventivoCerdo)
        """
        #Accedemos al ultimo dia registrado en el expediente del cerdo
        DiaAnterior = list(ExpedienteCerdo[self.RFID].keys())[-1]
        dia = [int(s) for s in DiaAnterior.split() if s.isdigit()][-1]
        #Creamos el diccionario al que corresponde la nueva observacion
        Dia = f"Dia {dia+1}"
        ExpedienteCerdo[self.RFID][Dia] = {}
        #regresamos este diccionario
        ExpedienteCerdo[self.RFID][Dia]["FechaRegistro"] = UbicacionAjustada[Dia]["Fecha"]
        ExpedienteCerdo[self.RFID][Dia]["Tipo"]          = self.Tipo
        ExpedienteCerdo[self.RFID][Dia]["Estado"]        = self.Estado
        ExpedienteCerdo[self.RFID][Dia]["Granja"]        = self.Granja
        ExpedienteCerdo[self.RFID][Dia]["Ubicacion"]     = UbicacionAjustada[Dia]["Etapa"]
        ExpedienteCerdo[self.RFID][Dia]["DiasEnArea"]     = UbicacionAjustada[Dia]["DiasEnArea"]
        ExpedienteCerdo[self.RFID][Dia]["Alimento"]      = AlimentoCerdo
        ExpedienteCerdo[self.RFID][Dia]["Padecimientos"]  = PadecimientosCerdo
        ExpedienteCerdo[self.RFID][Dia]["Medicamento"]    = {} 
        ExpedienteCerdo[self.RFID][Dia]["Medicamento"]["Medicamentos"] = MedicamentoCerdo["Medicamentos"]
        ExpedienteCerdo[self.RFID][Dia]["Medicamento"]["Inversion"] = MedicamentoCerdo["Inversion"]
        ExpedienteCerdo[self.RFID][Dia]["Medicamento"]["Adicionales"] =  TratamientoPreventivoCerdo

        return(ExpedienteCerdo)

    def Simulacion(self,
                   Alimentos:dict,
                   InversionAcumulada:dict,
                   Enfermedades: dict,
                   Medicamentos: dict,
                   ExpedienteCerdo: dict):
        """
        Simula un cerdo durante "n" dias o hasta el final de su vida
        """
        Etapas1 = self.PlanRutaCerdo()
        FechasPreajustadas1 = self.PreAjusteFechasDinamico(ConfigInicial=ExpedienteCerdo,
                                                           ProtocoloTrazabilidad=Etapas1)
        FechasAjustadas1 = self.AjusteFechasDinamico(FechasPreAjustadas=FechasPreajustadas1,
                                                    ExpedienteIndividual=ExpedienteCerdo,
                                                    Ruta_FechasInhabiles="Generales/FechasInhabiles.yaml")
        UbicacionAjustada1  = self.UbicacionaExplicita(ExpedienteCerdo=ExpedienteCerdo,
                                                      FechasAjustadas=FechasAjustadas1)
        n_dias = len(UbicacionAjustada1.keys())
        # print(n_dias)
        for i in range(n_dias-1):
            ExpedienteCerdo = self.SimularNuevoDia(Alimentos =Alimentos, 
                                            InversionAcumulada=InversionAcumulada,
                                            Enfermedades = Enfermedades, 
                                            Medicamentos = Medicamentos,
                                            ExpedienteCerdo=ExpedienteCerdo)
            #print(f"Dia {i}")
                
        return ExpedienteCerdo
    ####################################################################################
    ####################################################################################
    ####################################################################################
    
    """
    En caso de que el cerdo sea del tipo F1, cada que este se encuentre en  maternidad, entonces
    usaremos la ubicacion detallada para que  cada que pase a un ciclo de maternidad y se encuentre 
    con 2 dias, genere la creacion de entre 12 y 16 cerditos.
    """
    def Nacimiento(self, 
                   FechaNacimiento:str,
                   RFID_lechon: str):
        """
        Se recibe un F1 y se regresa las fechas en la que se crearan nuevos cerditos, asi
        como la cantidad estimada.
        """ 
        Parametros = {}
        Parametros["FechaRegistro"] = FechaNacimiento
        Parametros["RFID"] = RFID_lechon
        Parametros["Ruta"]= "ENGORDA.yaml"
        Parametros["Tipo"]= "ENGORDA"
        Parametros["Estado"]="Vivo"
        Parametros["Granja"]="LaPurisima"
        Parametros["Ubicacion"]="Lechon"
        Parametros["DiasEnArea"]=1
        Parametros["AlimentoDia1"]={}
        Parametros["PadecimientosDia1"]={}
        Parametros["MedicamentoDia1"]={}

        return Parametros
    

class Visualizacion:
    def __init__(self, NombreGranja: str, RFID:str):
        self.NombreGranja = NombreGranja
        self.RFID = RFID

    def GraficoAlimentosIndividual(self, 
                                   ExpedienteCerdo:dict):
        fechas = []
        kilogramos_consumidos = []
        InversionAlimentos = []
        inversion_acumulada = []
        etapas = []
        kg_consumidos_etapa = []
        for Dia, Descripcion in ExpedienteCerdo[self.RFID].items():
            fecha = ExpedienteCerdo[self.RFID][Dia]['FechaRegistro']
            kg_consumidos = ExpedienteCerdo[self.RFID][Dia]['Alimento']["Kg"]
            Inversion_dia = ExpedienteCerdo[self.RFID][Dia]['Alimento']["Inversion"]
            
            # etapas.append(f"{Dia} ({ExpedienteCerdo[self.RFID][Dia]['Ubicacion']})")
            # kg_consumidos_etapa.append(ExpedienteCerdo[self.RFID][Dia]['Alimento']["Kg"])


            fechas.append(fecha)
            kilogramos_consumidos.append(kg_consumidos)
            InversionAlimentos.append(Inversion_dia)

        # Crear un gráfico de barras para alimento 
        plt.figure(figsize=(12, 6))
        plt.bar(fechas, kilogramos_consumidos)
        plt.title(f'Kilogramos Consumidos por Día del cerdo {self.RFID}')
        plt.xlabel('Día')
        plt.ylabel('Kilogramos Consumidos')
        plt.xticks(rotation=45)  # Rotar las etiquetas del eje x para mayor legibilidad
        plt.grid(True)
        plt.tight_layout()
        plt.savefig(f'ConsumoDiario{self.RFID}.png')

        acumulado = 0
        for inversion in InversionAlimentos:
            acumulado += inversion
            inversion_acumulada.append(acumulado)
              # Crear un gráfico de barras para alimento 
        plt.figure(figsize=(12, 6))
        plt.bar(fechas, inversion_acumulada)
        plt.title(f'Inversion en Alimento del cerdo {self.RFID} del {fechas[0]}-{fechas[-1]}')
        plt.xlabel('Día')
        plt.ylabel('Inversion Alimento')
        plt.xticks(rotation=45)  # Rotar las etiquetas del eje x para mayor legibilidad
        plt.grid(True)
        # Guardar el gráfico como una imagen (por ejemplo, en formato PNG)
        plt.tight_layout()
        plt.savefig(f'Inversion_Alimento{self.RFID}.png')

        # Crea el gráfico de barras
        plt.figure(figsize=(10, 6))
        plt.bar(etapas, kg_consumidos_etapa, color='skyblue')
        plt.xlabel('Etapas')
        plt.ylabel('Kilogramos Consumidos')
        plt.title('Consumo de Alimento por Etapa')
        plt.xticks(rotation=45, ha='right')

        # Muestra el gráfico
        plt.tight_layout()
        plt.savefig(f'Alimento_Etapas_{self.RFID}.png')






