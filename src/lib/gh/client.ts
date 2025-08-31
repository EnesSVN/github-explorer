import type { GhUser, GhRateLimit } from "./types";

type Ok<T> = { ok: true; data: T; rate: GhRateLimit };
type Err = { ok: false; error: string; status?: number; rate: GhRateLimit };
export type R<T> = Ok<T> | Err;

function parseRate(res: Response): GhRateLimit {
  const limit = Number(res.headers.get("x-ratelimit-limit") ?? "");
  const remaining = Number(res.headers.get("x-ratelimit-remaining") ?? "");
  const reset = Number(res.headers.get("x-ratelimit-reset") ?? "");
  return {
    limit: Number.isNaN(limit) ? undefined : limit,
    remaining: Number.isNaN(remaining) ? undefined : remaining,
    reset: Number.isNaN(reset) ? undefined : reset,
  };
}

export async function getUser(username: string): Promise<R<GhUser>> {
  const url = `https://api.github.com/users/${encodeURIComponent(username)}`;
  try {
    const res = await fetch(url, {
      headers: { Accept: "application/vnd.github+json" },
    });
    const rate = parseRate(res);

    if (!res.ok) {
      return {
        ok: false,
        error: res.statusText || "http_error",
        status: res.status,
        rate,
      };
    }

    const json = await res.json();
    const user: GhUser = {
      login: json.login,
      name: json.name,
      avatar_url: json.avatar_url,
      bio: json.bio,
      followers: json.followers,
      following: json.following,
      public_repos: json.public_repos,
      html_url: json.html_url,
    };
    return { ok: true, data: user, rate };
  } catch (e) {
    return { ok: false, error: (e as Error).message, rate: {} };
  }
}
