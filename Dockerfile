# Stage 1: Build Vue.js project
FROM node:lts-alpine AS builder

ARG VUE_APP_ADMIN_EMAIL
ARG VUE_APP_GOOGLE_CLIENT_ID
ARG VUE_APP_CONVOY_API


ENV VUE_APP_ADMIN_EMAIL=$VUE_APP_ADMIN_EMAIL
ENV VUE_APP_GOOGLE_CLIENT_ID=$VUE_APP_GOOGLE_CLIENT_ID
ENV VUE_APP_CONVOY_API=$VUE_APP_CONVOY_API

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

# Stage 2: Serve Vue.js files using NGINX
FROM nginx:stable-alpine AS production-stage

COPY nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

