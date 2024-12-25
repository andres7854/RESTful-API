FROM node:22.12.0

WORKDIR /home/app

COPY package.json package-lock.json ./

RUN npm install

RUN npm install -g express

COPY . .

EXPOSE 3000

CMD ["node", "./app/index.js"]