# Stage 1: Build React app
FROM node:18 AS build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

COPY . ./
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Remove default nginx config and add our own
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built React app to Nginx public folder
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
