FROM node:22.12.0

RUN npm install -g pnpm

WORKDIR /home/app

COPY package.json ./

RUN pnpm i

COPY . .

EXPOSE 3000

CMD ["node", "./app/index.js"]