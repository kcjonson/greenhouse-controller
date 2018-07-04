FROM node:carbon

WORKDIR /usr/packages/web

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install --quiet

COPY . .

