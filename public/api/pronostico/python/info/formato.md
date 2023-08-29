# Explicación de formatos

## Formato general
Al ser un archivo tipo `json`, se debe tener el formato general:

```json
{
    "clave 1": {
        "clave 1.1": "valor 1.1",
        "clave 1.2": "valor 1.2"
    },
    "clave 2": {
        "clave 2.1": "valor 2.1"
    },
    "clave 3": "valor 3"
}
```


## Formato de config.json

Se necesita tener el siguiente formato para el archivo `config.json`

```json
{
    "tipos": {...},
    "info_tipos": {...},
    "config": {...}
}
```

### Tipos

El apartado de `"tipos"` debe tener el siguiente formato:

```json
{
    "tipos": {
        "vientre": {
            "tipo": "vientre",
            "nombre": "nombre 1"
        },
        "lechon": {
            "tipo": "lechon",
            "nombre": "nombre 2"
        },
        "tipo 3": {
            "tipo": "tipo 3",
            "nombre": "nombre 3"
        },
        "tipo 4": {
            "tipo": "tipo 4",
            "nombre": "nombre 4"
        },
        ...
    }
}
```

### Info_tipos

El apartado de `"info_tipos"` debe tener el siguiente formato:

```json
{
    "info_tipos": {
        "vientre": {...},
        "lechon": {...},
        "tipo 3": {...},
        "tipo 4": {...},
        ...
    }
}
```

Donde **cada tipo de porcino** debe contener la siguiente información:

```json
{
    "info_tipos":{
        "vientre": {
            "Dias/Etapa": {
                "E1": 3, "E2": 28, ...
            },
            "Kg": {
                "$": {
                    "A1": 9.72, "A2":8.27, ...
                },
                "Etapa/Alimento": {
                    "A1": {
                        "E1": 2.4, "E2": 2.45, ...
                    },
                    "A2": {
                        "E1": 1.4, "E2": 0.00, ...
                    },
                    ...
                }
            },
            "ApVac": {
                "$": {
                    "V1": 1.45, "V2": 2.3, ...
                },
                "Etapa/Vacuna": {
                    "V1": {
                        "E1": [1],
                        "E2": [7, 14],
                        ...
                    },
                    "V2": {
                        "E1": [1,2,3],
                        "E2": [],
                        ...
                    },
                    ...
                }
            },
            "mortalidad": {
                "E1": 0.01, "E2": 0.005, ...
            },
            "venta": {
                "kg": 210,
                "$/kg": 37.15
            }
        },
        "lechon": {...},
        "tipo 3": {...},
        "tipo 4": {...},
        ...
    }
}
```

En la siguiente tabla se describe el significado de cada clave del diccionario:

| Clave | Descripción |
| ----- | ----------- |
| Dias/Etapa | Días por etapa del tipo de porcino |
| Kg | Información relacionada con el consumo de alimento del tipo de porcino |
| Kg: $ | Precio por kg de los tipos de alimento del tipo de porcino |
| Kg: Etapa / Alimento | Kg consumidos por un porcino por etapa por tipo de alimento del tipo de porcino |
| ApVac | Información relacionada con aplicación de vacunas y medicamentos |
| ApVac: $ | Precio por aplicación de vacuna / medicamento |
| ApVac: Etapa / Vacuna | Día de aplicación relativo a la duración de cada etapa del tipo de porcino, por número de aplicación por etapa por tipo de vacuna / medicamento del tipo de porcino |
| mortalidad | Tasa de mortalidad del tipo de cerdo considerado en cada etapa de su proceso |
| venta | Información relevante para el cálculo del precio de venta |
| venta: kg | Peso de venta del tipo de porcino considerado |
| venta: $/kg | Precio por kilogramo del tipo de porcino considerado |

### Config

El apartado de `"config"` debe tener el siguiente formato:

```json
{
    "config": {
        "fecha_inicial": "año-mes-dia",
        "fecha_final": "año-mes-dia",
        "n_lechones": 12,
        "lotes": {
            "vientre": [
                ["año-mes-dia", 150],
                ["año-mes-dia", 100],
                ["año-mes-dia", 3],
                ["año-mes-dia", 200],
                ...
            ],
            "tipo 3": [
                ["año-mes-dia", 10],
                ...
            ],
            "tipo 4": [
                ["año-mes-dia", 6],
                ...
            ],
            ...
        }
    }
}
```

En la siguiente tabla se describe el significado de cada clave del diccionario:

| Clave | Descripción |
| ----- | ----------- |
| fecha_inicial | Inicio del periodo de cálculo o periodo establecido |
| fecha_final | Fin del periodo de cálculo o periodo establecido |
| n_lechones | Número de lechones nacidos por parto de un vientre |
| lotes | Listas de lotes por tipo de porcino **exceptuando** a los tipo de porcino que dependan de otros (por ejemplo, los lechones dependen de los vientres) |
| lotes: tipo | Lista de listas con el formato [fecha de inicio de proceso del lote, número de porcinos en lote] |


## Formato de output.json

El formato del archivo `output.json` es el siguiente:

```json
{
    "alimento": {...},
    "vacunas": {...},
    "ganancias": {...}
}
```

### Alimento

El apartado `"alimento"` tiene el siguiente formato:
```json
{
    "kg": {
        "vientre": {...},
        "lechon": {...},
        "tipo 3": {...},
        "tipo 4": {...},
        ...
    },
    "kg_tipo_A": {
        "vientre": {...},
        "lechon": {...},
        "tipo 3": {...},
        "tipo 4": {...},
        ...
    },
    "costo_tipo_A": {
        "vientre": {...},
        "lechon": {...},
        "tipo 3": {...},
        "tipo 4": {...},
        ...
    },
    "costo_etapa_A": {
        "vientre": {...},
        "lechon": {...},
        "tipo 3": {...},
        "tipo 4": {...},
        ...
    },
    "costo_total_A": {
        "vientre": {...},
        "lechon": {...},
        "tipo 3": {...},
        "tipo 4": {...},
        ...
    }
}
```

En la siguiente tabla se describe el significado de cada clave del diccionario:

| Clave | Descripción |
| ----- | ----------- |
| kg | Kilogramos totales consumidos por tipo de porcino, tipo de alimento y etapa del proceso del tipo de porcino en cuestión |
| kg_tipo_A | Kilogramos totales consumidos por tipo de porcino y tipo de alimento |
| costo_tipo_A | Costo total relacionado al consumo de alimento por tipo de porcino y tipo de alimento |
| costo_etapa_A | Costo total relacionado al consumo de alimento por tipo de porcino y etapa del proceso del tipo de porcino en cuestión |
| costo_total_A | Costo total relacionado al consumo de alimento por tipo de porcino |

### Vacunas

El apartado `"vacunas"` tiene el siguiente formato:
```json
{
    "num_vacunas": {
        "vientre": {...},
        "lechon": {...},
        "tipo 3": {...},
        "tipo 4": {...},
        ...
    },
    "num_vac_tipo_V": {
        "vientre": {...},
        "lechon": {...},
        "tipo 3": {...},
        "tipo 4": {...},
        ...
    },
    "costo_tipo_V": {
        "vientre": {...},
        "lechon": {...},
        "tipo 3": {...},
        "tipo 4": {...},
        ...
    },
    "costo_etapa_V": {
        "vientre": {...},
        "lechon": {...},
        "tipo 3": {...},
        "tipo 4": {...},
        ...
    },
    "costo_total_V": {
        "vientre": {...},
        "lechon": {...},
        "tipo 3": {...},
        "tipo 4": {...},
        ...
    }
}
```

En la siguiente tabla se describe el significado de cada clave del diccionario:

| Clave | Descripción |
| ----- | ----------- |
| num_vacunas | Número de aplicaciones totales de vacunas por tipo de porcino, tipo de vacuna y etapa del proceso del tipo de porcino en cuestión |
| num_vac_tipo_V | Número de aplicaciones totales de vacunas por tipo de porcino y tipo de alimento |
| costo_tipo_V | Costo total relacionado al número de aplicaciones totales de vacunas por tipo de porcino y tipo de alimento |
| costo_etapa_V | Costo total relacionado al número de aplicaciones totales de vacunas por tipo de porcino y etapa del proceso del tipo de porcino en cuestión |
| costo_total_V | Costo total relacionado al número de aplicaciones totales de vacunas por tipo de porcino |

### Ganancias

El apartado `"ganancias"` tiene el siguiente formato: 

```json
{
    "kg": {...},
    "ventas": {...},
    "ganancia": ...
}
```

En la siguiente tabla se describe el significado de cada clave del diccionario:

| Clave | Descripción |
| ----- | ----------- |
| kg | Número de kilogramos de venta correspondientes a cada tipo de porcino considerado |
| ventas | Cantidad monetaria correspondiente a los kilogramos de venta de cada tipo de porcino considerado |
| ganancia | Ventas menos costos considerados en unidad monetaria |

## Formato de output2.json

El formato del archivo `output2.json` es el siguiente:

```json
{
    "capacidad": {...},
    "alimento": {...},
    "vacunas": {...},
    "fechas": [...]
}
```

### Capacidad

El apartado `"capacidad"` tiene el siguiente formato:

```json
{
    "vientre": {
        "E1": [...],
        "E2": [...],
        ...
    },
    "lechon": {...},
    "tipo 3":{...},
    "tipo 4": {...},
    ...
}
```

Donde las listas correspondientes a cada etapa contienen el número de porcinos por día en esa etapa del proceso.

### Alimento

El apartado `"alimento"` tiene el siguiente formato:

```json
{
    "kg": {
        "vientre": {
            "A1": {
                "E1": [...],
                "E2": [...],
                ...
            },
            "A2": {
                "E1": [...],
                "E2": [...],
                ...
            },
            ...
        },
        "lechon": {...},
        "tipo 3": {...},
        "tipo 4": {...},
        ...
    },
    "$": {
        "vientre": {
            "A1": {
                "E1": [...],
                "E2": [...],
                ...
            },
            "A2": {
                "E1": [...],
                "E2": [...],
                ...
            },
            ...
        },
        "lechon": {...},
        "tipo 3": {...},
        "tipo 4": {...},
        ...
    }
}
```

En la siguiente tabla se describe el significado de cada clave del diccionario:

| Clave | Descripción |
| ----- | ----------- |
| kg: tipo | Kilogramos de consumo de alimento por tipo de alimento por día del tipo de porcino considerado |
| $: tipo | Costo de consumo de alimento por tipo de alimento por día del tipo de porcino considerado |

### Vacunas

El apartado `"vacunas"` tiene el siguiente formato:

```json
{
    "Ap": {
        "vientre": {
            "V1": {
                "E1": [...],
                "E2": [...],
                ...
            },
            "V2": {
                "E1": [...],
                "E2": [...],
                ...
            },
            ...
        },
        "lechon": {...},
        "tipo 3": {...},
        "tipo 4": {...},
        ...
    },
    "$": {
        "vientre": {
            "V1": {
                "E1": [...],
                "E2": [...],
                ...
            },
            "V2": {
                "E1": [...],
                "E2": [...],
                ...
            },
            ...
        },
        "lechon": {...},
        "tipo 3": {...},
        "tipo 4": {...},
        ...
    }
}
```

En la siguiente tabla se describe el significado de cada clave del diccionario:

| Clave | Descripción |
| ----- | ----------- |
| Ap: tipo | Número de aplicaciones de vacunas por tipo de vacuna por día del tipo de porcino considerado |
| $: tipo | Costo de aplicación de vacunas por tipo de vacuna por día del tipo de porcino considerado |

### Fechas

El apartado `"fechas"` contiene una lista con todas las fechas en el periodo establecido.