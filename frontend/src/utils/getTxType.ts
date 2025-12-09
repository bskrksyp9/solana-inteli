
export function getTxType(tx: any): { icon: string; label: string } {
  const hint = (tx.type || tx.tx?.type || "").toString().toLowerCase();
  if (hint.includes("swap")) return { icon: "🔁", label: "Swap" };
  if (hint.includes("transfer") || hint.includes("send")) return { icon: "➡️", label: "Transfer" };
  if (hint.includes("receive") || hint.includes("recv")) return { icon: "⬅️", label: "Receive" };
  if (hint.includes("mint")) return { icon: "✨", label: "Mint" };
  if (hint.includes("stake")) return { icon: "⛓️", label: "Stake" };
  if (hint.includes("burn")) return { icon: "🔥", label: "Burn" };
  if (hint.includes("nft") || hint.includes("metadata")) return { icon: "🖼️", label: "NFT" };
  return { icon: "🔎", label: "Unknown" };
}