FROM node:20-alpine AS build

WORKDIR /app

COPY dist/apps/tx-publisher/package.json .

RUN npm install -g pnpm
RUN pnpm install --prod

COPY dist/apps/tx-publisher/ .

CMD ["node", "main"]

