FROM registry.access.redhat.com/ubi8/nodejs-20-minimal

WORKDIR /opt/app-root/src

COPY package*.json ./

RUN npm install --only=production

COPY . .

RUN npm run build

USER 1001

EXPOSE 8080

CMD ["npm", "start"]
