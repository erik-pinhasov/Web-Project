FROM node:18-alpine

WORKDIR /app

COPY ./package.json .
COPY ./package-lock.json .

RUN npm install

COPY . .

EXPOSE 8080

CMD npm start

WORKDIR /app

FROM nginx
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf