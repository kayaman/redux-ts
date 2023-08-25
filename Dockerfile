FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json /app/
RUN npm install
COPY . .
RUN npm run build
COPY dist ./dist

FROM nginx

COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html


