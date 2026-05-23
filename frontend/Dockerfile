FROM node:18 AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# IMPORTANT FIX (Angular build must work with correct project name)
RUN npm run build -- --configuration production

FROM nginx:alpine

# IMPORTANT FIX: Angular output ALWAYS goes to browser folder
COPY --from=build /app/dist/my-angular-app/browser/ /usr/share/nginx/html/

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80