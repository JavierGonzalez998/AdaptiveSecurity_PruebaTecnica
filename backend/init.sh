#!/bin/bash

# Espera a que el servicio de la base de datos esté disponible
echo "Esperando a que MySQL esté disponible..."
/usr/local/bin/wait-for-it.sh db:3306 --timeout=60 --strict -- echo "MySQL está disponible!"

# Realiza las migraciones
echo "Ejecutando makemigrations..."
python manage.py makemigrations

echo "Ejecutando migrate..."
python manage.py migrate

# Inicia el servidor Django
echo "Iniciando el servidor Django..."
python manage.py runserver 0.0.0.0:8000