FROM node:20-alpine

WORKDIR /app

COPY dist/apps/app-fe/package.json .

RUN npm install -g pnpm
RUN pnpm install --prod

COPY dist/apps/app-fe/ .

CMD ["pnpm", "start"]
