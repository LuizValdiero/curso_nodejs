FROM node:14
WORKDIR /usr/src/node-api
COPY ./package.json .
RUN npm install --only=prod