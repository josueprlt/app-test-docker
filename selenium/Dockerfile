FROM node:18

WORKDIR /app

COPY . .

RUN npm install
RUN apt-get update && apt-get install -y bash

CMD ["node", "selenium/server.js"]