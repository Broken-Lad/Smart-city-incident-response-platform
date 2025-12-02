# -------------------------------------------------------
# 1. Build Stage (Vite)
# -------------------------------------------------------
FROM node:20-alpine AS build
WORKDIR /app

# Copy package.json + lockfile first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source code
COPY . .

# Build the production app
RUN npm run build


# -------------------------------------------------------
# 2. Run Stage (Nginx)
# -------------------------------------------------------
FROM nginx:stable-alpine

# Replace default nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built files from Vite
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
