# Dockerfile
FROM node:18

WORKDIR /app

COPY . .

RUN npm install

# Facultatif : installe bash si nécessaire
RUN apt-get update && apt-get install -y bash

# Laisse le conteneur ouvert avec un shell
CMD ["bash"]
