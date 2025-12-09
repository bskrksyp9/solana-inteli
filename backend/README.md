# Solana Intelligence Backend

This backend provides two interfaces:

1. A REST API for the frontend or any HTTP client.
2. An MCP WebSocket endpoint that allows AI assistants to call tools without manually invoking HTTP APIs.

It queries Solana mainnet in real time to retrieve wallet balances, SPL tokens, and recent transactions.

## Local Development

```bash
cd backend
npm install
npm run dev
```

Server runs on port 8080 by default:
```
http://localhost:8080
ws://localhost:8080/mcp
```

## Deployment (Render)

1. Push `backend/` to GitHub.
2. Create a new Render Web Service.
3. Build command: `npm install && npm run build`
4. Start command: `npm start`

Render will assign a public URL (e.g. https://your-backend.onrender.com).
