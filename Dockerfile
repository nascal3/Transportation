# Stage 1: Build Vue.js project
FROM node:alpine AS builder

ARG ADMIN_EMAIL
ARG GOOGLE_CLIENT_ID
ARG CONVOY_API


ENV ADMIN_EMAIL=$ADMIN_EMAIL
ENV GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID
ENV CONVOY_API=$CONVOY_API

WORKDIR /app

COPY package*.json ./
RUN npm ci --quiet

COPY . .

RUN npm run build

# Stage 2: Serve Vue.js files using NGINX
FROM nginx:alpine

COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]

