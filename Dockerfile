FROM registry.access.redhat.com/ubi8/nodejs-20-minimal

WORKDIR /opt/app-root/src

COPY package*.json ./

# Ejecutar como root para instalar dependencias
USER root
RUN npm install --only=production

COPY . .

RUN npm run build

# Cambiar a usuario no root después de la instalación
USER 1001

EXPOSE 8080

CMD ["npm", "start"]
