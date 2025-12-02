# -------------------------------------------------------
# 1. Build Stage (Vite)
# -------------------------------------------------------
FROM node:20-alpine AS build
WORKDIR /app

# Accept backend URL as build argument
ARG API_URL
ENV VITE_API_URL=backend:8080

# Copy dependency files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build with API URL injected
RUN npm run build


# -------------------------------------------------------
# 2. Run Stage (Nginx)
# -------------------------------------------------------
FROM nginx:stable-alpine

# Replace default nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built Vite files into nginx
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
