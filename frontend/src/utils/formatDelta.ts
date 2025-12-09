
export function computeDelta(meta?: any, accountIndex?: number | null): number | null {
  if (!meta) return null;
  const pre = meta.preBalances;
  const post = meta.postBalances;
  if (!Array.isArray(pre) || !Array.isArray(post) || pre.length !== post.length) return null;

  if (typeof accountIndex === "number" && pre[accountIndex] != null && post[accountIndex] != null) {
    return (post[accountIndex] - pre[accountIndex]) / 1e9;
  }

  // fallback: net change across all accounts
  const netPre = pre.reduce((s: number, v: number) => s + (v ?? 0), 0);
  const netPost = post.reduce((s: number, v: number) => s + (v ?? 0), 0);
  return (netPost - netPre) / 1e9;
}

export function formatDelta(meta?: any, accountIndex?: number | null): string {
  const v = computeDelta(meta, accountIndex);
  if (v === null) return "N/A";
  const sign = v > 0 ? "+" : "";
  return `${sign}${v.toFixed(6)} SOL`;
}