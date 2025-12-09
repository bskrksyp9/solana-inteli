
import { TxObj } from "./categorizeTransactions";

export function sortByBlockTimeDesc(txs: TxObj[]) {
  return [...(txs || [])].sort((a, b) => (b.blockTime || 0) - (a.blockTime || 0));
}