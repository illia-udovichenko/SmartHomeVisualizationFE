FROM node:latest

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN chmod +x ./node_modules/.bin/vue-cli-service


RUN npm run build

EXPOSE 80

CMD ["npm", "run", "serve"]
