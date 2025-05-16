FROM node:18 AS builder

RUN npm config set strict-ssl false

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

RUN npm config set strict-ssl true

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]