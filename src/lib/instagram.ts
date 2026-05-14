/**
 * Instagram Graph API — token management + media fetching.
 *
 * Long-lived user tokens last 60 days but can be refreshed after ≥ 24 h.
 * This module refreshes automatically on the first request after each 24-hour
 * window, writing the new token to `.ig-token` on disk so it survives process
 * restarts. On read-only filesystems (e.g. Vercel serverless) the write is
 * silently skipped — in that case the token still renews in-memory per process
 * instance; update INSTAGRAM_TOKEN in your env vars before the 60-day expiry.
 *
 * Setup:
 *   1. Convert your Instagram account to a Creator/Business account.
 *   2. Link it to a Facebook Page in Meta Business Suite.
 *   3. Create a Facebook App at developers.facebook.com.
 *   4. Under the app, add "Instagram" → "Instagram Graph API".
 *   5. Generate a long-lived User Access Token for your account.
 *   6. Add it to .env.local as INSTAGRAM_TOKEN=<token>
 */

import fs from "fs";
import path from "path";

export interface InstagramPost {
  id: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  caption?: string;
}

// ---------------------------------------------------------------------------
// Token store
// ---------------------------------------------------------------------------

const TOKEN_FILE = path.join(process.cwd(), ".ig-token");
const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;

interface TokenStore {
  token: string;
  refreshedAt: number;
}

/** Module-level cache — persists across requests in the same Node process. */
let memCache: TokenStore | null = null;

function readStore(): TokenStore {
  if (memCache) return memCache;

  try {
    const raw = fs.readFileSync(TOKEN_FILE, "utf-8");
    const stored = JSON.parse(raw) as TokenStore;
    memCache = stored;
    return stored;
  } catch {
    // No file yet — fall back to env var with a zero timestamp so that a
    // refresh is attempted on the very first request.
    return { token: process.env.INSTAGRAM_TOKEN ?? "", refreshedAt: 0 };
  }
}

function saveStore(store: TokenStore): void {
  memCache = store;
  try {
    fs.writeFileSync(TOKEN_FILE, JSON.stringify(store), "utf-8");
  } catch {
    // Read-only filesystem (e.g. Vercel) — in-memory only, that's fine.
  }
}

async function getToken(): Promise<string> {
  const store = readStore();

  // console.log('Current token age (ms):', Date.now() - store.refreshedAt, store.token); // Debug log to check token age

  if (!store.token) return "";

  const age = Date.now() - store.refreshedAt;
  if (age >= TWENTY_FOUR_HOURS) {
    try {
      const res = await fetch(
        `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${encodeURIComponent(store.token)}`,
      );
      if (res.ok) {
        const data = (await res.json()) as { access_token: string };
        const fresh: TokenStore = {
          token: data.access_token,
          refreshedAt: Date.now(),
        };
        saveStore(fresh);
        return fresh.token;
      }
    } catch {
      // Refresh failed — carry on with the existing token.
    }
  }

  return store.token;
}

// ---------------------------------------------------------------------------
// Media fetch
// ---------------------------------------------------------------------------

/**
 * Returns up to `limit` IMAGE/CAROUSEL_ALBUM posts from the authenticated
 * Instagram account. Returns an empty array if the token is missing or the
 * request fails (so the page renders gracefully without crashing).
 */
export async function fetchInstagramPosts(
  limit = 16,
): Promise<InstagramPost[]> {
  const token = await getToken();
  if (!token) return [];

  const url =
    `https://graph.facebook.com/v25.0/17841400898888267/media` +
    `?fields=id,media_type,media_url,thumbnail_url,permalink,caption` +
    `&limit=${limit}` +
    `&access_token=${token}`;
  // const url =
  //   `https://graph.instagram.com/me/media` +
  //   `?fields=id,media_type,media_url,thumbnail_url,permalink,caption` +
  //   `&limit=${limit}` +
  //   `&access_token=${token}`;

  let res: Response;
  try {
    res = await fetch(url, {
      // Cache for 1 hour on the Next.js data cache layer.
      next: { revalidate: 3600 },
    });
  } catch {
    return [];
  }
  console.log("Instagram API response status:", res.status); // Debug log to check API response status
  if (!res.ok) return [];

  const json = (await res.json()) as { data: InstagramPost[] };

  return json.data.filter(
    (p) => p.media_type === "IMAGE" || p.media_type === "CAROUSEL_ALBUM",
  );
}
