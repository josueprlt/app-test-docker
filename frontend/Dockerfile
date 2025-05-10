# Étape 1 : build de l'application
FROM node:18-alpine AS builder

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Étape 2 : serveur statique avec nginx
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

# Copie la config nginx personnalisée (optionnel)
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 5173

CMD ["nginx", "-g", "daemon off;"]
