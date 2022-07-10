FROM node:latest as BUILDER

WORKDIR /opt/api

RUN npm i -g npm@latest pnpm@latest

RUN pnpm config set store-dir /opt/.pnpm-store