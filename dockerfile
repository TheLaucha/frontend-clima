
FROM node:14


WORKDIR /app

COPY package*.json ./
COPY public ./public
COPY src ./src


RUN npm install


RUN npm run build

EXPOSE 5500


CMD [ "npm", "start" ]
