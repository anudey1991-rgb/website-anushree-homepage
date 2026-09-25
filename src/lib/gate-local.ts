/**
 * Client-side unlock fallback.
 *
 * The real gate is the encrypted, httpOnly server cookie. Inside embedded
 * preview frames browsers drop that cookie as third-party, so we also record
 * the successful unlock in localStorage for the same 7-day window.
 */
const KEY = "portfolio-gate-unlocked-until";
const WINDOW_MS = 1000 * 60 * 60 * 24 * 7;

export function setLocalUnlock() {
  try {
    localStorage.setItem(KEY, String(Date.now() + WINDOW_MS));
  } catch {
    /* storage unavailable */
  }
}

export function clearLocalUnlock() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* storage unavailable */
  }
}

export function isLocallyUnlocked() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return false;
    const until = Number(raw);
    if (!Number.isFinite(until) || until < Date.now()) {
      localStorage.removeItem(KEY);
      return false;
    }
    return true;
  } catch {
    return false;
  }
}
