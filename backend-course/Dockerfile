FROM node:10

RUN mkdir -p /backend
WORKDIR /backend

COPY . .

RUN yarn install \
&& apt update \
&& apt install vim lsof -y

EXPOSE 4500

CMD yarn start

