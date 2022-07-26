FROM node:latest as BUILDER

WORKDIR /opt/api

COPY package.json .
COPY pnpm-lock.yaml .

RUN npm i -g npm@latest pnpm@latest \
    && pnpm config set store-dir /opt/.pnpm-store