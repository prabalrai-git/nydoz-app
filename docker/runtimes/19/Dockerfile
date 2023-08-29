FROM node:19

LABEL maintainer="Vesh Raj Joshi<veshraj.joshi1@gmail.com>"

WORKDIR /var/www/nydoz-react/

ENV DEBIAN_FRONTEND noninteractive4
ENV TZ=UTC

RUN apt-get update \
    && apt-get install -y npm

COPY start-container /usr/local/bin/start-container
RUN chmod +x /usr/local/bin/start-container

ENV NODE_ENV=dev

ENTRYPOINT ["start-container"]

EXPOSE 9000

