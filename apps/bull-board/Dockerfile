FROM node:20-alpine

WORKDIR /app

COPY dist/apps/bull-board/package.json .

RUN npm install -g pnpm
RUN pnpm install --prod

COPY dist/apps/bull-board/ .

CMD ["node", "main"]
