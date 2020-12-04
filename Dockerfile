FROM ubuntu:18.04

RUN npm install
RUN npm install nodemon ts-node

RUN mkdir /app
WORKDIR /app
ADD . /app

CMD npm start