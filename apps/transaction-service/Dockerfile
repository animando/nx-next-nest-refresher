FROM node:20-alpine AS build

ARG app_name=transaction-service

WORKDIR /app

RUN apk update && apk add openssl

COPY dist/apps/${app_name}/package.json .

RUN npm install -g pnpm
RUN pnpm install --prod

COPY dist/apps/${app_name}/ .
RUN npx prisma generate

FROM build AS service
CMD ["node", "main"]

FROM build AS db-migrate
CMD ["npx", "prisma", "migrate", "deploy"]
