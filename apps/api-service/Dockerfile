FROM node:20-alpine

WORKDIR /app

COPY dist/apps/api-service/package.json .

RUN npm install -g pnpm
RUN pnpm install --prod

COPY dist/apps/api-service/ .

CMD ["node", "main"]