# Använd Node.js LTS som basimage
FROM node:20-alpine

# Skapa app-katalog
WORKDIR /usr/src/app

# Kopiera package.json och package-lock.json
COPY package*.json ./

# Installera alla beroenden inklusive dev-dependencies
RUN npm install

# Installera nodemon globalt
RUN npm install -g nodemon

# Kopiera resten av applikationskoden
COPY . .

# Exponera porten som applikationen körs på
EXPOSE 5000

# Starta applikationen med nodemon för live-reload
CMD ["nodemon", "src/server.js"] 