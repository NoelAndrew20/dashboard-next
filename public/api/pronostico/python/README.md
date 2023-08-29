# Herramienta Pronóstico python [![Prototipo - v1.1](https://img.shields.io/static/v1?label=Prototipo&message=v1.1&color=FF4B4B&logo=streamlit)](https://prototipo-pronostico-termo-v1.streamlit.app/)

## Descripción

Herramienta de pronóstico para calcular el costo de alimento, vacunas y medicamentos para vientes, lechones, sementales (CIA) y sementales (gestación) dadas una fecha inicial, una fecha final, las fechas de ingreso de los lotes de vientres, sementales (CIA) y sementales (gestación) al área de Cuarentena, así como el número de individuos por lote.

La herramienta cuenta con dos modos:

- **Modo calculadora:** la versión *calculadora* de la herramienta de pronóstico consiste en una serie de herramientas que calculan el consumo y el gasto totales de alimento y vacunas por tipo y por etapa de los tipos de porcinos considerados, en un periodo establecido. Esta versión se enfoca en cálculos rápidos y eficientes para poder hacer consultas rápidas y puntuales a la herramienta, obteniendo información clave acerca de la granja en una presentación resumida y aglomerada.

- **Modo pronóstico:** la versión *pronóstico* de la herramienta de pronóstico consiste en una serie de herramientas que calculan el consumo y el gasto de alimento y vacunas por tipo, por etapa de los tipos de porcinos considerados y por día, así como el estrés (capacidad máxima soportada por la granja por tipo de porcino) por día, en un periodo establecido. Esta versión se enfoca en cálculos paso a paso para poder hacer consultas detalladas a la herramienta, obteniendo información clave acerca de la granja en una presentación extensa y descriptiva.

Si se quiere consultar una descripción teórica detallada acerca de cómo funciona la herramienta de pronóstico se brinda el documento [Herramienta de pronóstico](info/HerramientaDePronostico.pdf).

### Planes a futuro

Se plantea agregar las siguientes funcionalidades a la herramienta de pronóstico:

| Característica              | Prioridad           | Progreso  |
| --------------------------- | ------------------- | --------- |
| Incorporar tasa enfermedad  | *Media*             | 0 %       |
| Cálculo de agua porcinos    | Baja                | 0 %       |

## Instalación

Para poder instalar y ejecutar el proyecto se require tener **conda** instalado, por lo que, en caso de no contar con este software, favor de revisar la guía de instalación oficial [![docs - instalación](https://img.shields.io/static/v1?label=docs&message=instalación&color=44A833&logo=Anaconda)](https://docs.anaconda.com/free/anaconda/install/). Se brinda el archivo de configuración de entorno de **conda** `environment.yml` para facilitar la creación de su entorno virtual.

Para proceder con la instalación se necesitan seguir los siguientes pasos:

Clonar repositorio

```
git clone https://github.com/Constanza-Termo/Herramienta-Pronostico-python.git
```

Acceder a la carpeta del proyecto 

```
cd Herramienta-Pronostico-python
```

Crear entorno de **conda**

```
conda env create -f environment.yml
```

Activar entorno de **conda**

```
conda activate protv1
```

### Instalación sin conda

En caso de no tener **conda** instalado se proporciona el archivo `requirements.txt` para instalar las dependencias con `pip`:

Clonar repositorio

```
git clone https://github.com/Constanza-Termo/Herramienta-Pronostico-python.git
```

Acceder a la carpeta del proyecto 

```
cd Herramienta-Pronostico-python
```

Instalar dependencias

```
pip install -r requirements.txt
```

## Uso de la herramienta

Actualmente la herramienta puede utilizarse mediante alguno de los siguientes scripts: `modo_calculadora.py` o `modo_pronostico.py`.La herramienta puede configurarse cambiando los valores del archivo `config.json`. A continuación se presentan los formatos para agregar o modificar los valores de las fechas y los lotes:

1. En el archivo de configuración, es necesario escribir las fechas en el formato `%Y-%m-%d`, es decir, `año-mes-día` (por ejemplo, `2023-01-20`).
2. El formato de los lotes consiste en una lista de listas, las cuales contienen una fecha y un número. Estos valores representan la fecha de ingreso al área de cuarentena y el número de cerdos correspondientes a ese lote.
3. Cada tipo de cerdo tiene su propia lista de listas, o lista de lotes, para facilitar los cálculos y la diferenciación entre tipos de cerdos.

Si se quiere consultar una versión extendida acerca del formato necesario para el archivo `config.json`, favor de revisar el archivo [formato.md](info/formato.md).

Para ejecutar la herramienta en cualquier modo se deben seguir los pasos indicados en la sección [Instalación y ejecución](#instalación-y-ejecución).Posteriormente se debe ejecutar el siguiente comando para usar el modo calculadora:

```
python modo_calculadora.py
```

Al ejecutar este script se genera el archivo `output.json`. Si se quiere consultar el formato de la salida del script `modo_calculadora.py` se puede revisar el archivo [formato.md](info/formato.md)

Para usar el modo pronóstico se debe usar el comando:

```
python modo_pronostico.py
```

Al ejecutar este script se genera el archivo `output2.json`. Si se quiere consultar el formato de la salida del script `modo_pronostico.py` se puede revisar el archivo [formato.md](info/formato.md)

Para poder visualizar una representación de los resultados obtenidos con el modo pronóstico se puede usar el siguiente comando:

```
python visualizar.py
```

Usando la tecla `q` para continuar de una visualización a la siguiente.

### Prototipo desplegado en streamlit (v 1.1)

Se tiene un prototipo desplegado en streamlit para poder probar la herramienta y visualizar sus resultados.

[![Prototipo - v1.1](https://img.shields.io/static/v1?label=Prototipo&message=v1.1&color=FF4B4B&style=for-the-badge&logo=streamlit)](https://prototipo-pronostico-termo-v1.streamlit.app/)

## Tests

En la carpeta `tests` se pueden encontrar el input y el output de algunos tests.

| Test   | Descripción |
| ------ | ----------- |
| Test 1 | Agregar tipo de cerdo "nuevoCerdo" |
| Test 2 | Quitar tipo de cerdo "sementalG" |
| Test 3 | Quitar etapas de tipo de cerdo "vientre" (todo después de "A4") y agregar etapa a "lechon" (etapa "X") |
| Test 4 | El número de etapas de "lechon" no coinciden en kg/Etapa/Alimento |
| Test 5 | Quitar tipo de alimento "E" a "lechon" y agregar tipo de alimento "A1" a "sementalCIA" |
| Test 6 | El número de tipos de alimento no coincide en kg/Etapa/Alimento |
| Test 7 | Agregar muchas aplicaciones de vacunas a "lechon" |

## Notas

Actualmente la implementación de la herramienta asume que:

- Los datos recibidos son en su mayoría correctos con respecto al [formato](info/formato.md)
- Los datos recibidos contienen los tipos de porcino "vientre" y "lechon"
- El único tipo de porcino cuyas fechas de inicio dependen de otro tipo de porcino es "lechon"
- Las fechas inicial y final del periodo establecido deben tener al menos un día de distancia entre sí
