
export function getSignature(tx: any): string {
  if (!tx) return "unknown";
  return (
    tx.signature ||
    tx.sig ||
    (tx.transaction && tx.transaction.signatures && tx.transaction.signatures[0]) ||
    (tx.tx && tx.tx.signatures && tx.tx.signatures[0]) ||
    "unknown"
  );
}