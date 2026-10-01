/**
 * Session memory for the homepage, so returning from a project page keeps the
 * expanded grid and the scroll position. Lives outside the route file because
 * route components are code-split away from their module scope.
 */
const EXPANDED_KEY = "portfolio_expanded";
const SCROLL_KEY = "portfolio_scroll";

export function readExpanded(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.sessionStorage.getItem(EXPANDED_KEY) === "1";
  } catch {
    return false;
  }
}

export function writeExpanded(expanded: boolean) {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(EXPANDED_KEY, expanded ? "1" : "0");
  } catch {
    /* storage unavailable */
  }
}

export function readScroll(): number {
  if (typeof window === "undefined") return 0;
  try {
    return Number(window.sessionStorage.getItem(SCROLL_KEY) ?? 0);
  } catch {
    return 0;
  }
}

export function writeScroll(y: number) {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(SCROLL_KEY, String(y));
  } catch {
    /* storage unavailable */
  }
}
