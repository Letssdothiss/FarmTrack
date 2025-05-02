# Använd Node.js LTS som basimage
FROM node:20-alpine

# Skapa app-katalog
WORKDIR /usr/src/app

# Kopiera package.json och package-lock.json
COPY package*.json ./

# Installera alla beroenden inklusive dev-dependencies
RUN npm install

# Kopiera resten av applikationskoden
COPY . .

# Exponera porten som Vite körs på
EXPOSE 5173

# Starta Vite dev-server med --host flag
CMD ["npm", "run", "dev", "--", "--host"] 