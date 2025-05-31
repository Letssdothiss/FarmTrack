# FarmTrack Backend

Backend för FarmTrack-applikationen, utvecklad med Node.js och Express.

## Teknisk Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Databas**: MongoDB
- **Autentisering**: JWT (JSON Web Tokens)
- **API Dokumentation**: Swagger/OpenAPI
- **Testning**: Jest
- **Containerisering**: Docker

## Projektstruktur

```
src/
├── config/         # Konfigurationsfiler
├── controllers/    # Route controllers
├── middleware/     # Express middleware
├── models/         # Mongoose modeller
├── routes/         # API routes
└── server.js       # Applikationsstartpunkt
```

## Installation

1. Installera beroenden:
```bash
npm install
```

2. Skapa en `.env` fil i root-mappen med följande variabler:
```env
PORT=5000
MONGODB_URI_BASE=mongodb://localhost:27017/farmtrack
MONGODB_URI_PARAMS=?retryWrites=true&w=majority
JWT_SECRET=din_hemliga_nyckel
NODE_ENV=development
```

## Utveckling

Starta utvecklingsservern:
```bash
npm run dev
```

Servern kommer att köras på `http://localhost:5000` med hot-reloading.

## API Dokumentation

API-dokumentationen är tillgänglig via Swagger UI på `/api-docs` i utvecklingsläge.
Se `APIDocs.md` för mer information om API:et och testning.

## Testning

Kör tester:
```bash
npm test
```

Kör tester med coverage:
```bash
npm run test:coverage
```

## Linting & Formattering

Kör linting:
```bash
npm run lint
```

Fix linting-problem:
```bash
npm run lint:fix
```

Formatera kod:
```bash
npm run format
```

## Säkerhet

- JWT-baserad autentisering
- Lösenordshashning med bcrypt
- CORS-konfiguration
- Säkerhetsheaders
- Miljövariabler för känslig data

## API Endpoints

### Autentisering
- `POST /api/auth/register` - Registrera ny användare
- `POST /api/auth/login` - Logga in
- `GET /api/auth/profile` - Hämta användarprofil
- `POST /api/auth/delete-account` - Radera konto

### Djur
- `GET /api/animals` - Hämta alla djur
- `POST /api/animals` - Lägg till nytt djur
- `PUT /api/animals/:id` - Uppdatera djur
- `DELETE /api/animals/:id` - Radera djur

### Individer
- `GET /api/individuals/:animalType` - Hämta individer av specifik typ
- `POST /api/individuals` - Skapa ny individ
- `PUT /api/individuals/:animalType/:id` - Uppdatera individ
- `DELETE /api/individuals/:animalType/:id` - Radera individ

### Anteckningar
- `GET /api/notes/species/:species` - Hämta anteckningar för art
- `GET /api/notes/individual/:individualId` - Hämta anteckningar för individ
- `POST /api/notes` - Skapa ny anteckning
- `PUT /api/notes/:id` - Uppdatera anteckning
- `DELETE /api/notes/:id` - Radera anteckning
