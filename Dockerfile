FROM ubuntu:18.04

RUN apt-get update
RUN apt-get install nodejs -y
RUN apt-get install npm -y
RUN apt-get install build-essential -y

RUN mkdir /app
WORKDIR /app
ADD . /app

CMD npm start