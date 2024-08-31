FROM node:14-alpine
EXPOSE 3000

WORKDIR /node/app
COPY package.json /node/app

COPY . /node/app
COPY .env.prod .env
RUN  yarn

CMD ["yarn","start"]