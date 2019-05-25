FROM node:10

RUN mkdir /frontend
WORKDIR /frontend

ADD package*.json /frontend/
RUN npm install
RUN npm install -g typescript
RUN npm install -g ts-node
ADD . /frontend/

RUN npm run build

EXPOSE 3000