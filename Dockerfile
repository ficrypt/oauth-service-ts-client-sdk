FROM node:23 AS builder
LABEL authors="erielmejias99"


WORKDIR /app

COPY package*.json ./
COPY .npmrc .

RUN npm install

COPY . .
