/**
 * Resolves a Lovable asset pointer to a URL that works on every host.
 *
 * Asset pointers store a root-relative path (`/__l5e/assets-v1/...`). That path is
 * only understood by Lovable's own edge, so on an external host (Vercel, Netlify,
 * a custom server) the request 404s and the media never loads. Resolving to the
 * project's stable public origin makes the same pointer work everywhere.
 */

const ASSET_ORIGIN = "https://project--28a6636b-c959-4806-b44a-cb9d1ece9f6a.lovable.app";

type AssetPointer = { url: string };

export function assetUrl(asset: AssetPointer | string): string {
  const path = typeof asset === "string" ? asset : asset.url;
  if (!path) return "";
  // Already absolute (http/https/data/blob) — leave untouched.
  if (/^[a-z][a-z0-9+.-]*:/i.test(path) || path.startsWith("//")) return path;
  if (!path.startsWith("/__l5e/")) return path;
  return `${ASSET_ORIGIN}${path}`;
}
