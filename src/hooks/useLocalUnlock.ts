import { useEffect, useState } from "react";
import { isLocallyUnlocked } from "@/lib/gate-local";

/**
 * Reads the localStorage unlock fallback after hydration so server and client
 * render the same first paint.
 */
export function useLocalUnlock() {
  const [unlocked, setUnlocked] = useState(false);
  useEffect(() => {
    setUnlocked(isLocallyUnlocked());
  }, []);
  return unlocked;
}
