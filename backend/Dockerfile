FROM node:16.19.0-alpine3.17
RUN apk add --update tini
WORKDIR /app
COPY package.json package-lock.json .
RUN npm install \
&& npm cache clean --force
COPY . .

CMD ["/sbin/tini", "--", "node", "server.js"]
