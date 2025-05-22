FROM node:18

RUN npm config set strict-ssl false

# Installer les dépendances nécessaires à Docker CLI
RUN apt-get update && apt-get install -y \
    docker.io \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN chmod +x wait-for-it.sh

CMD ["./wait-for-it.sh", "db:3306", "--", "node", "index.js"]

RUN npm config set strict-ssl true