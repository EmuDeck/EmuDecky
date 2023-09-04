import os
import subprocess
import time


while True:
	# Ejecuta tu comando bash aquí
	comando_bash = "brew services info mariadb"
	
	# Utiliza subprocess para ejecutar el comando bash
	resultado = subprocess.run(comando_bash, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
	
	stdout = resultado.stdout
	lineas = stdout.split('\n')
	
	for linea in lineas:
		if "Loaded:" in linea:
			estado = linea.split(":")[1].strip()  # Obtener el estado (active o inactive)
			print("Loaded:", estado)
			break
	
	
	# Verifica el resultado o realiza cualquier otra acción que desees
	# if resultado.returncode == 0:	
	# 	print(resultado.stdout)
	# else:
	# 	print("Error al ejecutar el comando:")
	# 	print(resultado.stdout)
	
	# Espera 1 segundo antes de la próxima ejecución
	time.sleep(10)   