FROM node:12.13-alpine

RUN mkdir -p /src/docker

COPY . /src/docker
WORKDIR /src/docker/public
RUN npm install

WORKDIR /src/docker
RUN yarn install
RUN yarn build

WORKDIR /src/docker/build

EXPOSE $PORTAL_PORT

ENTRYPOINT ["npm", "start"]
