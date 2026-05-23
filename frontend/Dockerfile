FROM node:18 AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build --configuration production

FROM nginx:alpine

# IMPORTANT FIX HERE 👇
COPY --from=build /app/dist/my-angular-app /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf