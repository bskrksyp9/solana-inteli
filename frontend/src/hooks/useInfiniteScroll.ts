
import { useEffect } from "react";

export function useInfiniteScroll(ref: React.RefObject<HTMLElement> | null, onReachBottom: () => void, offset = 200) {
  useEffect(() => {
    const el = ref?.current;
    if (!el) return;
    const handle = () => {
      if (el.scrollTop + el.clientHeight >= el.scrollHeight - offset) {
        onReachBottom();
      }
    };
    el.addEventListener("scroll", handle);
    return () => el.removeEventListener("scroll", handle);
  }, [ref, onReachBottom, offset]);
}