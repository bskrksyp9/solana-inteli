export type TxObj = {
  signature?: string;
  blockTime?: number | null;
  meta?: {
    err: any | null;
    fee?: number;
    preBalances?: number[];
    postBalances?: number[];
  };
  err?: any | null; // fallback
};

export function categorizeTransactions(txs: TxObj[]) {
  const all = txs || [];
  const success = all.filter((t) => {
    if (t.meta && "err" in t.meta) return t.meta.err === null;
    // fallback to top-level err if present
    return t.err === null || t.err === undefined;
  });
  const failed = all.filter((t) => {
    if (t.meta && "err" in t.meta) return t.meta.err !== null;
    return t.err != null;
  });
  return { ALL: all, SUCCESS: success, FAILED: failed };
}