# Stage 1: Build
# Base node image
FROM node:18-alpine AS build

# Working dir
WORKDIR /app

# only package files to install deps first
COPY package.json package-lock.json ./
# generate relative links
ENV PUBLIC_URL=.

# Installing deps
RUN npm install
COPY . .

# Build step
RUN npm run build

# Stage 2: Ngnix
# Nginx base image
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Using default port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]