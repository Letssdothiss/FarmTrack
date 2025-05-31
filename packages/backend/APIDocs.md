

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