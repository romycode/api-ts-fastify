FROM node:latest as BUILDER

WORKDIR /opt/api

RUN npm i -g npm@latest pnpm@latest