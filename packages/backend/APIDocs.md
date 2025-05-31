## API docs

API dokumentation skapad med Swagger.
Tillgänglig på: https://cscloud7-138.lnu.se/api-docs/

## Testa API:et
1. Gå till Auth-sektionen i Swagger UI
2. Använd /login endpoint med:
```json
{
    "email": "test@example.com",
    "password": "test123"
}
```
3. Kopiera JWT-token från svaret
4. Klicka på "Authorize" knappen (lås-ikonen)
5. Klistra in token: `Bearer din_token_här`
6. Nu kan du testa alla endpoints!

### Reflektion
Denna dokumentation kommer att omarbetas efter kursens slut, då jag efter dess skapande insåg att det inte är ett säkert sätt att visa upp dokumentationen med testning.

Det kan vara ett alternativ att ha kvar den interaktiva API-dokumentationen om jag lägger den mot en annan databas än den som är i produktion. Men ännu bättre är nog att ha en statisk sida med dokumentation om API'et och ha testningen via pipelines med postman eller liknande.
 