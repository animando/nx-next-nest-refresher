FROM node:20-alpine

WORKDIR /app

COPY dist/apps/nx-next-nest/package.json .

RUN npm install -g pnpm
RUN pnpm install --prod

COPY dist/apps/nx-next-nest/ .

CMD ["pnpm", "start"]
