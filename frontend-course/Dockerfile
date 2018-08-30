FROM node:10

RUN mkdir -p /frontend
WORKDIR /frontend

COPY . .

RUN yarn install \
&& apt update \
&& apt install vim -y

EXPOSE 3000

CMD yarn start
