# Refugio Patitas
#### La prueba técnica que he realizado se basa en un refugio de animales. El cual se puede adoptar perritos o ayudar siendo voluntario. 🐶🦴

## Tecnologías
 - Backend: Python / Django
 - Frontend: ReactJS / NextJS / TailwindCSS / Shadcn
 - BD: MySQL

## Arquitectura
La arquitectura se basa en una arquitectura monolítica, en donde el backend se encarga de todos los procesos de la gestion y manipulación de datos de las distintas áreas del proyecto.


![Arquitectura del proyecto](/docs/image.jpg)

## Características
- Inicio de sesión con validación de JWT
- Control de usuarios y métricas de usuarios, perritos e IP en inicio de sesión (Admin)
- Control de adopciones y métricas de perritos  (Voluntarios)
- Adoptar perritos! 🐶🦴 (Usuarios)

## Instalación (Docker)
Para correr el proyecto debe tener [Docker](https://www.docker.com/) instalado.
Antes de iniciar el proyecto, debe crear los archivos .env en la carpeta frontend y backend. Por motivos de seguridad no puedo proporcionar aquí las variables de entorno.

Una vez creadas las variables de entorno se debe ejecutar el siguiente comando en la consola, apuntando a la raiz del proyecto:

```
docker-compose up --build
```

luego de ejecutar el comando se inicializarán los proyectos y correrán tanto frontend como backend y base de datos.

## Instalación (Sin Docker)
Para correr el proyecto deben tener una instancia de base de datos en mysql y crear la base de datos Patitas. una vez creada la base de datos, debe adjuntar los siguientes datos en su .env en backend: 
```
DB_NAME = "Patitas"
DB_USER = *su usuario*
DB_PASSWORD= *su contraseña*
DB_HOST = *el host de su instancia de base de datos*
DB_PORT = "3306"
```
Además de las otras keys que no puedo propocionar por motivos de seguridad.
En el frontend también se debe crear un archivo .env con las variables de entorno.

En frontend. con [Node](https://nodejs.org/en/) instalado en su última versión, ejecutar en la consola apuntando a la carpeta frontend
```
npm run i --force
npm run dev
```
se ejecuta --force porque se está trabajando con la versión 19 de React y no todas las dependencias tienen compatibilidad con esa versión.

En backend, en una consola con python instalado y apuntando a la carpeta backend, ejecutar el siguiente comando: 
```
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```
se crean las migraciones y se ejecutan para crear las tablas y los elementos a la base de datos. Finalmente se ejecuta el servidor.

## Cuentas
El proyecto tiene una cuenta con las funciones de Administrador, el cual es la siguiente:
```
test@test.com
test123123
```
