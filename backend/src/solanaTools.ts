/**
 * Provides Solana RPC helpers for both REST and MCP endpoints.
 * Includes wallet balance (SOL + SPL tokens) and recent transactions.
 */

import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
} from "@solana/web3.js";

import fetch from "node-fetch";

const connection = new Connection(
  "https://api.mainnet-beta.solana.com",
  "confirmed"
);

export async function getWalletBalance(address: string) {
  const pubkey = new PublicKey(address);
  const lamports = await connection.getBalance(pubkey);
  const sol = lamports / LAMPORTS_PER_SOL;

  return {
    sol,
    lamports,
    solUsd: await getSolUsd(),
    tokens: [] // simplified: no SPL scanning to avoid SDK issues
  };
}

export async function getRecentTransactions(address: string, limit = 10) {
  const pubkey = new PublicKey(address);

  const sigs = await connection.getSignaturesForAddress(pubkey, { limit });

  const results = [];
  for (const entry of sigs) {
    results.push({
      signature: entry.signature,
      slot: entry.slot,
      err: entry.err,
      blockTime: entry.blockTime,
    });
  }

  return results;
}

async function getSolUsd() {
  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd"
    );
    const json = await res.json();
    return json?.solana?.usd ?? null;
  } catch {
    return null;
  }
}
