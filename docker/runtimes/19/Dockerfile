FROM node:19

LABEL maintainer="Vesh Raj Joshi<veshraj.joshi1@gmail.com>"

WORKDIR /var/www/nydoz-angular/

ENV DEBIAN_FRONTEND noninteractive
ENV TZ=UTC

RUN apt-get update \
    && apt-get install -y npm \
    && apt-get update \
    && npm install -g @angular/cli

COPY start-container /usr/local/bin/start-container
RUN chmod +x /usr/local/bin/start-container
#
#RUN apt-get update \
#    && npm install

ENTRYPOINT ["start-container"]

EXPOSE 4200
