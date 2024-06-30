FROM node:18-alpine

RUN echo "Installing system dependencies.." && \
  apk update && \
  apk add bash make && \
  echo "Cleanups.." && \
  rm -rf /var/cache/apk/*

WORKDIR /app
COPY Makefile package.json yarn.lock ./

RUN make install

CMD ["make" ,"run"]
