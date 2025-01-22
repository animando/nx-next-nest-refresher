FROM node:20-alpine AS build

ARG service=transaction-service

WORKDIR /app

RUN apk update && apk add openssl

COPY dist/apps/${service}/package.json .

RUN npm install -g pnpm
RUN pnpm install --prod

COPY dist/apps/${service}/ .
RUN npx prisma generate

FROM build AS service
CMD ["node", "main"]

FROM build AS db-migrate
CMD ["npx", "prisma", "migrate", "deploy"]
