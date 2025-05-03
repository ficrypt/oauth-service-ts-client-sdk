FROM node:23 AS builder
LABEL authors="erielmejias99"


WORKDIR /app


COPY package*.json ./
RUN npm install

COPY . .