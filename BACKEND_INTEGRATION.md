# Fyndgrossisten Landing Page - Backend Integration Guide

## Återförsäljaransökan API

### Endpoint
`POST /api/public/reseller-requests`

### Required Fields
```typescript
{
  company_name: string;    // Företagsnamn
  org_number: string;      // Organisationsnummer (min 10 tecken)
  contact_person: string;  // Kontaktperson (min 2 tecken)
  email: string;           // E-postadress (giltig email)
}
```

### Optional Fields
```typescript
{
  phone?: string;          // Telefonnummer
  message?: string;        // Meddelande/anteckning
}
```

### Response
```json
{
  "success": true,
  "data": {
    "id": "01JBXXX...",
    "email": "customer@example.com",
    "status": "pending"
  }
}
```

### Error Response
```json
{
  "success": false,
  "errors": [
    {
      "field": "email",
      "message": "Email already exists"
    }
  ]
}
```

## Environment Setup

Kopiera `.env.example` till `.env` och konfigurera:

```env
VITE_API_URL=http://localhost:4000
```

## CORS Configuration

Backend är konfigurerad med CORS för:
- `http://localhost:5173` (Vite dev server)
- `http://localhost:3000` (Next.js dev server)  
- `*.vercel.app` (Vercel deployments)
- `fyndgrossisten.*` (Production domains)

## Development

1. Starta Phoenix backend: `mix phx.server` (port 4000)
2. Starta landing page: `npm run dev` (port 5173)
3. Öppna http://localhost:5173/bli-aterforsaljare

## När Ansökan Skickas

1. ✅ Ansökan sparas i databasen med status `pending`
2. ✉️ **Alla admins** får en notifikation i dashboard
3. 📊 Admin counters uppdateras i realtid via WebSocket
4. 🔔 Admin ser ansökan under "Reseller Requests" i admin panel

## Admin Godkänner Ansökan

1. ✅ Användarkonto skapas automatiskt
2. ✉️ Sökanden får ett email med magic link
3. 🔗 Magic link används för första inloggningen
4. 🎉 Användaren kan sätta lösenord efter inloggning
