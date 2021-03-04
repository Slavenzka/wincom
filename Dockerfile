FROM nginx:1.15.8-alpine

WORKDIR /web

COPY build /web
COPY ./default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
