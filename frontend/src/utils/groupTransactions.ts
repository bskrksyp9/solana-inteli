
import { TxObj } from "./categorizeTransactions";

export function groupTransactionsByDate(txs: TxObj[]) {
  const groups: Record<string, TxObj[]> = {};
  const now = Math.floor(Date.now() / 1000);
  const todayStart = new Date().setHours(0, 0, 0, 0) / 1000;
  const yesterdayStart = todayStart - 86400;
  const sevenDaysAgo = todayStart - 6 * 86400; // include today as part of 7 days

  txs.forEach((t) => {
    const bt = t.blockTime ?? 0;
    if (!bt) {
      groups["Unknown"] = groups["Unknown"] || [];
      groups["Unknown"].push(t);
      return;
    }
    if (bt >= todayStart) {
      groups["Today"] = groups["Today"] || [];
      groups["Today"].push(t);
    } else if (bt >= yesterdayStart) {
      groups["Yesterday"] = groups["Yesterday"] || [];
      groups["Yesterday"].push(t);
    } else if (bt >= sevenDaysAgo) {
      groups["Last 7 Days"] = groups["Last 7 Days"] || [];
      groups["Last 7 Days"].push(t);
    } else {
      groups["Older"] = groups["Older"] || [];
      groups["Older"].push(t);
    }
  });

  // return ordered array of [label, items]
  const order = ["Today", "Yesterday", "Last 7 Days", "Older", "Unknown"];
  return order.filter((k) => groups[k] && groups[k].length).map((k) => [k, groups[k]]);
}