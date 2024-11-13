FROM node:23-alpine3.19 

WORKDIR /socket

COPY . .

RUN yarn install

RUN yarn global add nodemon

EXPOSE 3000

CMD ["yarn", "serve"]
