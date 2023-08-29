import json
import numpy as np
import matplotlib.pyplot as plt

from src.mijson.parsear import parsear_fecha

with open('output2.json', 'r') as f:
    data = json.load(f)

# Fechas
fechas = [parsear_fecha(fecha) for fecha in data['fechas']]

# Capacidad
capacidad = data['capacidad']
for tipo in capacidad.keys():
    total = None
    for etapa in capacidad[tipo].keys():
        if total is None:
            total = np.array(capacidad[tipo][etapa])
        else:
            total += np.array(capacidad[tipo][etapa])
        plt.plot(
            fechas,
            capacidad[tipo][etapa], 
            label=etapa
        )
    plt.title(f'Capacidad por etapas - {tipo}')
    plt.xlabel('Dia')
    plt.ylabel('Numero de porcinos')
    plt.legend(loc='center left', bbox_to_anchor=(1.04, 0.5))
    manager = plt.get_current_fig_manager()
    manager.full_screen_toggle()
    plt.show()

    plt.plot(
        fechas,
        total
    )
    plt.title(f'Capacidad total - {tipo}')
    plt.xlabel('Dia')
    plt.ylabel('Numero de porcinos')
    manager = plt.get_current_fig_manager()
    manager.full_screen_toggle()
    plt.show()


# Alimento
num_dias = None
#  Kg
kg = data['alimento']['kg']
for tipo in kg.keys():
    for tA in kg[tipo].keys():
        total = None
        for etapa in kg[tipo][tA].keys():
            if total is None:
                total = np.array(kg[tipo][tA][etapa])
            else:
                total += np.array(kg[tipo][tA][etapa])
        plt.plot(
            fechas,
            total,
            label=tA
        )
    plt.title(f'Kg consumidos por tipo alimento - {tipo}')
    plt.xlabel('Dia')
    plt.ylabel('Kg de alimento consumidos')
    plt.legend(loc='center left', bbox_to_anchor=(1.04, 0.5))
    manager = plt.get_current_fig_manager()
    manager.full_screen_toggle()
    plt.show()

#  $
costo_A = data['alimento']['$']
for tipo in costo_A.keys():
    for tA in costo_A[tipo].keys():
        total = None
        for etapa in costo_A[tipo][tA].keys():
            if total is None:
                total = np.array(costo_A[tipo][tA][etapa])
            else:
                total += np.array(costo_A[tipo][tA][etapa])
        plt.plot(
            fechas,
            total, 
            label=tA
        )
    plt.title(f'$ alimento por tipo alimento - {tipo}')
    plt.xlabel('Dia')
    plt.ylabel('Costo de alimento consumido')
    plt.legend(loc='center left', bbox_to_anchor=(1.04, 0.5))
    manager = plt.get_current_fig_manager()
    manager.full_screen_toggle()
    plt.show()

# Vacunas
num_dias = None
#  Kg
vac = data['vacunas']['Ap']
for tipo in vac.keys():
    for tV in vac[tipo].keys():
        total = None
        for etapa in vac[tipo][tV].keys():
            if total is None:
                total = np.array(vac[tipo][tV][etapa])
            else:
                total += np.array(vac[tipo][tV][etapa])
        plt.plot(
            fechas,
            total, 
            '.', 
            label=tV
        )
    plt.title(f'Ap. vacunas por tipo vacuna - {tipo}')
    plt.xlabel('Dia')
    plt.ylabel('Numero de aplicaciones de vacunas')
    plt.legend(loc='center left', bbox_to_anchor=(1.04, 0.5))
    manager = plt.get_current_fig_manager()
    manager.full_screen_toggle()
    plt.show()

#  $
costo_V = data['vacunas']['$']
for tipo in costo_V.keys():
    for tV in costo_V[tipo].keys():
        total = None
        for etapa in costo_V[tipo][tV].keys():
            if total is None:
                total = np.array(costo_V[tipo][tV][etapa])
            else:
                total += np.array(costo_V[tipo][tV][etapa])
        plt.plot(
            fechas,
            total, 
            '.', 
            label=tV
        )
    plt.title(f'$ Ap. vacunas por tipo vacuna - {tipo}')
    plt.xlabel('Dia')
    plt.ylabel('Costo aplicaciones de vacunas')
    plt.legend(loc='center left', bbox_to_anchor=(1.04, 0.5))
    manager = plt.get_current_fig_manager()
    manager.full_screen_toggle()
    plt.show()
