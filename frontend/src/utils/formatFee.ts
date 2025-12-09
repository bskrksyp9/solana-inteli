
export function formatFee(meta?: any): string {
  const lamports = meta?.fee ?? meta?.postBalances === undefined ? undefined : undefined;
  // prefer meta.fee, otherwise try top-level fee
  const feeLamports = meta?.fee ?? undefined;
  if (typeof feeLamports !== "number") return "N/A";
  return `${(feeLamports / 1e9).toFixed(6)} SOL`;
}