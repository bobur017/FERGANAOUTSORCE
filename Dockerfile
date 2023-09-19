FROM node:20.5.1-alpine
WORKDIR /usr/src/app

COPY build ./
COPY . .
RUN npm install -g serve
