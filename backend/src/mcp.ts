import { WebSocketServer } from "ws";
import { getWalletBalance, getRecentTransactions } from "./solanaTools";

export function attachMcp(server: any) {
  const wss = new WebSocketServer({
    server,
    path: "/mcp",
  });

  console.log("MCP WebSocket active at /mcp");

  wss.on("connection", (ws) => {
    ws.on("message", async (raw) => {
      let msg;

      try {
        msg = JSON.parse(raw.toString());
      } catch {
        return ws.send(JSON.stringify({ error: "Invalid JSON" }));
      }

      const { id, method, params } = msg;

      try {
        if (method === "getWalletBalance") {
          const result = await getWalletBalance(params.address);
          return ws.send(JSON.stringify({ id, result }));
        }

        if (method === "getRecentTransactions") {
          const result = await getRecentTransactions(params.address, params.limit || 10);
          return ws.send(JSON.stringify({ id, result }));
        }

        ws.send(JSON.stringify({ id, error: "Unknown method" }));
      } catch (err: any) {
        ws.send(JSON.stringify({ id, error: err.message }));
      }
    });
  });
}
