import subprocess

def CrearSimulacion():
    try:
        # Activamos el entorno
        env_name = 'SimulacionGranja'
        activate_env_cmd = f'source activate {env_name} && '

        script_name = 'CreacionCerdosF1.py'
        run_script_cmd = f'python {script_name}'
        combined_cmd = activate_env_cmd + run_script_cmd
        result = subprocess.run(combined_cmd, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        print("Creacion de Cerdos F1 completa")

        script_name = 'Simulacion.py'
        run_script_cmd = f'python {script_name}'
        combined_cmd = activate_env_cmd + run_script_cmd
        result = subprocess.run(combined_cmd, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        print("Simulacion finalizada")
        
        script_name = 'Almacenamiento.py'
        run_script_cmd = f'python {script_name}'
        combined_cmd = activate_env_cmd + run_script_cmd
        result = subprocess.run(combined_cmd, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        print("Almacenamiento finalizado")

        script_name = 'arbolGenealogico.py'
        run_script_cmd = f'python {script_name}'
        combined_cmd = activate_env_cmd + run_script_cmd
        result = subprocess.run(combined_cmd, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        print("arbol Genealogico finalizado")
        
        script_name = 'AlmacenamientoGeneral.py'
        run_script_cmd = f'python {script_name}'
        combined_cmd = activate_env_cmd + run_script_cmd
        result = subprocess.run(combined_cmd, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        print("Almacenamiento General finalizado")
        
        script_name = 'AlmacenamientoFront.py'
        run_script_cmd = f'python {script_name}'
        combined_cmd = activate_env_cmd + run_script_cmd
        result = subprocess.run(combined_cmd, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        print("Almacenamiento Front finalizado")
        
    except Exception as e:
        print(e)

if __name__ == '__main__':
    CrearSimulacion()
