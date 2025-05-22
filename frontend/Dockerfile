FROM node:18 AS builder

RUN npm config set strict-ssl false

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

RUN npm config set strict-ssl true

FROM nginx:alpine

# Copie les fichiers compilés
COPY --from=builder /app/dist /usr/share/nginx/html

# Copie la config nginx personnalisée
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
