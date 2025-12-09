/**
 * Starts:
 * - REST API for frontend
 * - MCP WebSocket endpoint for Claude Desktop
 */

import express from "express";
import cors from "cors";
import http from "http";

import { attachMcp } from "./mcp";
import { getWalletBalance, getRecentTransactions } from "./solanaTools";

const app = express();
app.use(cors());

app.get("/warmup", (req, res) => {
  res.status(200).json({ warmed: true, time: Date.now() });
});

app.get("/api/balance/:address", async (req, res) => {
  try {
    const result = await getWalletBalance(req.params.address);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/transactions/:address", async (req, res) => {
  try {
    const result = await getRecentTransactions(req.params.address, 10);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

const server = http.createServer(app);
attachMcp(server);

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log("Backend running on port", PORT));
