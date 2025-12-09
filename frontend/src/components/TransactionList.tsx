
import React, { useMemo, useRef, useState } from "react";
import { categorizeTransactions } from "../utils/categorizeTransactions";
import { groupTransactionsByDate } from "../utils/groupTransactions";
import { timeAgo } from "../utils/timeAgo";
import { formatFee } from "../utils/formatFee";
import { formatDelta } from "../utils/formatDelta";
import { getSignature } from "../utils/getSignature";
import { getTxType } from "../utils/getTxType";
import { usePagination } from "../hooks/usePagination";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import { useAutoRefresh } from "../hooks/useAutoRefresh";

/**
 * Props:
 *  - txs: any[]
 *  - loading?: boolean
 *  - pageSize?: number
 *  - enableInfinite?: boolean
 *  - onLoadMore?: () => Promise<void>
 *  - autoRefreshMs?: number | null
 *  - onRefresh?: () => Promise<void>
 */
export default function TransactionList({
  txs,
  loading = false,
  pageSize = 12,
  enableInfinite = false,
  onLoadMore,
  autoRefreshMs = null,
  onRefresh,
}: {
  txs: any[];
  loading?: boolean;
  pageSize?: number;
  enableInfinite?: boolean;
  onLoadMore?: () => Promise<void>;
  autoRefreshMs?: number | null;
  onRefresh?: () => Promise<void>;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [tab, setTab] = useState<"ALL" | "SUCCESS" | "FAILED">("ALL");
  const [hoverSig, setHoverSig] = useState<string | null>(null);

  // categorise & sort
  const categorized = useMemo(() => categorizeTransactions(txs || []), [txs]);
  const listForTab = categorized[tab];

  // grouping
  const grouped = useMemo(() => groupTransactionsByDate(listForTab || []), [listForTab]);

  // pagination
  const flatList = useMemo(() => (listForTab || []), [listForTab]);
  const { page, setPage, totalPages, pageItems } = usePagination(flatList, pageSize);

  // infinite scroll wiring - increments shown by calling onLoadMore or letting parent manage
  useInfiniteScroll(containerRef, async () => {
    if (!enableInfinite) return;
    if (onLoadMore) {
      await onLoadMore();
    } else {
      // fallback: advance page state (simulate load)
      setPage((p) => Math.min(totalPages, p + 1));
    }
  });

  // auto-refresh
  useAutoRefresh(async () => {
    if (onRefresh) await onRefresh();
  }, autoRefreshMs);

  // determine visible when using pagination or infinite
  const visibleList = enableInfinite ? flatList.slice(0, page * pageSize) : pageItems;

  // helper to render a tx row (uses utils)
  function renderRow(t: any) {
    const sig = getSignature(t);
    const success = (t.meta && t.meta.err === null) || t.err === null || t.err === undefined;
    const { icon, label } = getTxType(t);
    const fee = formatFee(t.meta);
    const delta = formatDelta(t.meta);

    return (
      <div
        key={sig}
        className="group bg-white dark:bg-gray-900 border rounded-lg p-3 hover:shadow-md transition"
        onMouseEnter={() => setHoverSig(sig)}
        onMouseLeave={() => setHoverSig(null)}
      >
        <div className="flex justify-between items-start gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="text-2xl">{icon}</div>
            <div className="min-w-0">
              <a
                className="font-mono text-sm block truncate text-gray-800 dark:text-gray-100"
                href={`https://solscan.io/tx/${sig}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {sig}
              </a>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex gap-3">
                <span>{timeAgo(t.blockTime)}</span>
                <span>{fee}</span>
                <span>{delta}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <div className={`text-xs font-semibold ${success ? "text-green-600" : "text-red-500"}`}>
              {success ? "Success" : "Failed"}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => navigator.clipboard.writeText(sig)}
                className="text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                title="Copy signature"
              >
                Copy
              </button>

              <button
                onClick={() => alert(JSON.stringify(t, null, 2))}
                className="text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                title="Preview"
              >
                Preview
              </button>
            </div>
          </div>
        </div>

        {/* Inline preview on hover */}
        {hoverSig === getSignature(t) && (
          <pre className="mt-3 max-h-40 overflow-auto text-xs bg-gray-50 dark:bg-gray-800 p-2 rounded text-gray-700 dark:text-gray-200">
            {JSON.stringify(t, null, 2)}
          </pre>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold dark:text-gray-100">Recent Transactions</h3>

        <div className="flex gap-2 text-sm">
          {(["ALL", "SUCCESS", "FAILED"] as const).map((k) => (
            <button
              key={k}
              onClick={() => {
                setTab(k);
                setPage(1);
              }}
              className={`px-3 py-1 rounded-md border text-sm ${
                tab === k ? "bg-indigo-600 text-white border-indigo-600" : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600"
              }`}
            >
              {k}
            </button>
          ))}
        </div>
      </div>

      {/* Loading shimmer */}
      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: Math.min(5, pageSize) }).map((_, i) => (
            <div key={i} className="animate-pulse flex items-center gap-4 p-4 border rounded-lg bg-gray-50 dark:bg-gray-900">
              <div className="h-8 w-2/3 bg-gray-200 dark:bg-gray-800 rounded" />
              <div className="h-6 w-24 bg-gray-200 dark:bg-gray-800 rounded" />
            </div>
          ))}
        </div>
      ) : (
        <>
          {/* container for infinite scroll */}
          <div ref={containerRef} className={`${enableInfinite ? "max-h-[60vh] overflow-auto" : ""} space-y-3`}>
            {grouped.length === 0 && <div className="text-gray-600 dark:text-gray-300">No transactions.</div>}

            {grouped.map(([label, items]) => (
              <div key={label}>
                <div className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">{label}</div>

                {items
                  .filter((it) => visibleList.includes(it) || enableInfinite === false) // render only visible per pagination or all for infinite
                  .map((t) => renderRow(t))}
              </div>
            ))}
          </div>

          {/* Pagination controls */}
          {!enableInfinite && (
            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Page {page} / {totalPages}
              </div>

              <div className="flex items-center gap-2">
                <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page <= 1} className="px-3 py-1 rounded bg-gray-100 dark:bg-gray-700 text-sm">Prev</button>
                <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page >= totalPages} className="px-3 py-1 rounded bg-gray-100 dark:bg-gray-700 text-sm">Next</button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}