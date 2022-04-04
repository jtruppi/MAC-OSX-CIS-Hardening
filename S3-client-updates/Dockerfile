FROM node:14-alpine

# The base node image sets a very verbose log level.
ENV NPM_CONFIG_LOGLEVEL warn

WORKDIR /app
COPY ./package.json ./

# need to run this to avoid "could not get uid/gid" from node alpine image
RUN npm config set unsafe-perm true

# Install `serve` to run the application.
RUN npm install -g serve

COPY . .

RUN npm install

RUN apk --no-cache --virtual build-dependencies add \
  python3 \
  make \
  g++ \
  && npm install \
  && apk del build-dependencies

RUN npm run build
EXPOSE 3000
CMD serve -l 3000 -s /app/build
