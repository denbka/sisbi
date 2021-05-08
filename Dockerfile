FROM node:14-alpine
# FROM node:11.13.0-alpine
# RUN mkdir -p /src
# WORKDIR /src

RUN apk update && apk upgrade && apk add git

COPY . .
RUN yarn install

RUN yarn build

ENV HOST 0.0.0.0
EXPOSE 3000

CMD [ "yarn", "start" ]