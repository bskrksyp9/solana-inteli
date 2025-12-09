
import { useEffect, useRef } from "react";

export function useAutoRefresh(cb: () => Promise<void>, ms?: number | null) {
  const ref = useRef(cb);
  useEffect(() => { ref.current = cb; }, [cb]);
  useEffect(() => {
    if (!ms) return;
    const id = setInterval(() => { ref.current().catch(() => {}); }, ms);
    return () => clearInterval(id);
  }, [ms]);
}