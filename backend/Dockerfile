FROM node:18

RUN npm config set strict-ssl false

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN chmod +x wait-for-it.sh

CMD ["./wait-for-it.sh", "db:3306", "--", "node", "index.js"]

RUN npm config set strict-ssl true