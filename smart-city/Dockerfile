# -------------------------------------------------------
# 1. Build Stage (Vite)
# -------------------------------------------------------
FROM node:20-alpine AS build
WORKDIR /app

ARG API_URL
ENV VITE_API_URL=backend:8080

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build


# -------------------------------------------------------
# 2. Nginx Stage
# -------------------------------------------------------
FROM nginx:stable-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
COMMAND ["nginx", "-g", "daemon off;"]
