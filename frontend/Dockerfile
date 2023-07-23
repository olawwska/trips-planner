FROM node:16.19.0-alpine as build-stage
WORKDIR /app

COPY package.json package-lock.json .
RUN npm install --force \
&& npm cache clean --force

COPY . /app
RUN npm run build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html
COPY --from=build-stage /app/build /usr/share/nginx/html
