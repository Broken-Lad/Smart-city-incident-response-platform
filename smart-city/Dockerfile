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

# Remove default website
RUN rm -rf /usr/share/nginx/html/*

# Copy built files from Vite
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
