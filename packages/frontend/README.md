# FarmTrack Frontend

Frontend för FarmTrack-applikationen, utvecklad med React och Vite.

## Teknisk Stack

- **Framework**: React
- **Build Tool**: Vite
- **Styling**: CSS Modules
- **State Management**: React Context
- **Routing**: React Router
- **HTTP Client**: Fetch API
- **Testning**: Vitest
- **Containerisering**: Docker

## Projektstruktur

```
src/
├── components/     # React komponenter
│   ├── common/    # Återanvändbara komponenter
│   ├── layout/    # Layout-komponenter
│   └── animals/   # Djur-relaterade komponenter
├── pages/         # Sidkomponenter
├── context/       # React Context
├── hooks/         # Custom hooks
├── services/      # API-tjänster
└── App.jsx        # Applikationsstartpunkt
```

## Installation

1. Installera beroenden:
```bash
npm install
```

2. Skapa en `.env` fil i root-mappen med följande variabler:
```env
VITE_API_URL=http://localhost:5000
```

## Utveckling

Starta utvecklingsservern:
```bash
npm run dev
```

Applikationen kommer att köras på `http://localhost:5173` med hot-reloading.

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

## Funktioner

### Autentisering
- Registrering av nytt konto
- Inloggning
- Profilhantering
- Radering av konto

### Djurhantering
- Lista alla djur
- Lägga till nya djur
- Redigera djurinformation
- Radera djur

### Individhantering
- Lista individer per djurtyp
- Lägga till nya individer
- Redigera individinformation
- Radera individer

### Anteckningar
- Skapa anteckningar för djur och individer
- Redigera anteckningar
- Radera anteckningar
- Filtrera anteckningar

## Säkerhet

- JWT-baserad autentisering
- Skyddade routes
- Säker hantering av användardata
- CORS-konfiguration

## Prestanda

- Code splitting
- Lazy loading av komponenter
- Optimiserade bilder
- Caching av API-anrop

## Tillgänglighet

- Semantisk HTML
- ARIA-attribut
- Tangentbordsnavigering
- Responsiv design

## Browser Support

- Chrome (senaste 2 versioner)
- Firefox (senaste 2 versioner)
- Safari (senaste 2 versioner)
- Edge (senaste 2 versioner)
