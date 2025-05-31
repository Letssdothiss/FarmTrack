# FarmTrack

En webbapplikation för att hantera och dokumentera djuren på gården.

## Project Overview

FarmTrack är en web-baserad applikation som är tänkt att bistå gårdar med sin djurhantering, applikationen erbjuder möjlighet att för anteckningar om djuren, specifika för djurslag och enskilda individer. 
Applikationen är i ett tidigt stadie med många förbättringar planerade.

## Features

- Multi-species animal management
  - Förbestämda arter, fler kommer.
  - Lägg till enskilda individer inom arten.
  - Enkla anteckningar.
- Användarvänlig UI.
- Cloud lagring.

## Planerade features
- Fler arter att välja mellan.
- Möjlighet att lägga till en egen art.
- Ett utbud av olika malla för olika typer av anteckningar.
- Notifikationer/Påminnelser.
- Desktop/mobilapplikations versioner av applikationen.
- Säkerhetsförbättringar.
- Förbättrad UI.

## Teknik Stack

- **Frontend**: React, Vite
- **Backend**: Node.js, Express
- **Database**: MongoDB Atlas
- **Deployment**: Docker, Nginx
- **Hosting**: CSCloud, Ubuntu

## Projektstruktur

```
farmtrack/
├── frontend/           # React/Vite frontend application
├── backend/           # Node.js/Express backend
└── README.md        # Project overview
```

## Utveckling

### Frontend

[Se Installation](./packages/frontend/README.md)

### Backend

[Se Installation](./packages/backend/README.md)

## CI/CD Pipeline

CI/CD pipelines via gitlab används för automatisk testning med manuell deploy till produktionsserver.

## License
[AGPL-3.0](./LICENSE.md)

Kan komma att ändras, men i nuläget så verkar AGPL vara den mer intressanta licensen då jag har en del planer för applikationen.  

## Projektstatus.
- Projektet är redo för release 1.0, med en mängd planerade implementationer och förbättringar.
- Projektet är produktionssatt på följande URL: https://cscloud7-138.lnu.se/

## Kända buggar/Ej implementerat/Förbättringsbehov
- Ändra lösenord på profilsidan ej implementerat.
- Backup fil ej implementerad.
- Djurräkningen på profilsidan ej implementerad.
- Nyheter/information på startsidan ej implementerat.
- Profil med information om varje enskild individ, delvis implementerat.
- Notifikationer till användaren, saknas i vissa fall och fungerar ej i vissa fall.
- Generella bekräftelser och information.
- Information om GDPR samt samtycke till cookies. 
- Anteckningar: När en anteckning läggs till på en individ så rensas inte formuläret innan nästa anteckning.
- Kodbasen behöver refaktoreras.

## Framtidsplanering
Projektet kommer att flyttas från nuvarande produktionsserver för vidare utveckling. Det kommer flyttas till Github men produktionsserver är ännu inte bestämt. 

Intern övervägning att bygga om applikationen med andra tekniker för webbapplikationen.
Desktopversion kommer antingen byggas med Java eller JS/Electron, inte bestämt.
Mobil/tablet-version TBD.