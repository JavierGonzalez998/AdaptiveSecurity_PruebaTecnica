# Utiliza una imagen base para Node.js
FROM node:20-alpine

WORKDIR /app

# Copia los archivos necesarios
COPY package.json package-lock.json ./

# Instala las dependencias (Se usa Force por la versión de React: 19)
RUN npm install --force

# Copia el resto del código
COPY . .

# Construye el proyecto
RUN npm run build

# Expone el puerto
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "run", "start"]
