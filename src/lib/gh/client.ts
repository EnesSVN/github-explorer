import type {
  GhUser,
  GhRateLimit,
  GhRepo,
  GhRepoDetail,
  GhContributor,
  GhIssue,
} from "./types";

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

export async function getRepos(username: string): Promise<R<GhRepo[]>> {
  const url = `https://api.github.com/users/${encodeURIComponent(
    username
  )}/repos?sort=updated&per_page=100`;
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
    const repos: GhRepo[] = json.map((r: GhRepo) => ({
      id: r.id,
      name: r.name,
      description: r.description,
      stargazers_count: r.stargazers_count,
      forks_count: r.forks_count,
      language: r.language,
      html_url: r.html_url,
      updated_at: r.updated_at,
    }));

    return { ok: true, data: repos, rate };
  } catch (e) {
    return { ok: false, error: (e as Error).message, rate: {} };
  }
}

export async function getRepoDetail(
  user: string,
  repo: string
): Promise<R<GhRepoDetail>> {
  const url = `https://api.github.com/repos/${encodeURIComponent(
    user
  )}/${encodeURIComponent(repo)}`;
  try {
    const res = await fetch(url, {
      headers: { Accept: "application/vnd.github+json" },
    });
    const rate = parseRate(res);
    if (!res.ok)
      return {
        ok: false,
        error: res.statusText || "http_error",
        status: res.status,
        rate,
      };
    const j = await res.json();
    const data: GhRepoDetail = {
      name: j.name,
      full_name: j.full_name,
      description: j.description,
      stargazers_count: j.stargazers_count,
      forks_count: j.forks_count,
      open_issues_count: j.open_issues_count,
      language: j.language,
      html_url: j.html_url,
      updated_at: j.updated_at,
    };
    return { ok: true, data, rate };
  } catch (e) {
    return { ok: false, error: (e as Error).message, rate: {} };
  }
}

export async function getContributors(
  user: string,
  repo: string
): Promise<R<GhContributor[]>> {
  const url = `https://api.github.com/repos/${encodeURIComponent(
    user
  )}/${encodeURIComponent(repo)}/contributors?per_page=30`;
  try {
    const res = await fetch(url, {
      headers: { Accept: "application/vnd.github+json" },
    });
    const rate = parseRate(res);
    if (!res.ok)
      return {
        ok: false,
        error: res.statusText || "http_error",
        status: res.status,
        rate,
      };
    const j = await res.json();
    const data: GhContributor[] = j.map((c: GhContributor) => ({
      id: c.id,
      login: c.login,
      avatar_url: c.avatar_url,
      html_url: c.html_url,
      contributions: c.contributions,
    }));
    return { ok: true, data, rate };
  } catch (e) {
    return { ok: false, error: (e as Error).message, rate: {} };
  }
}

export async function getIssues(
  user: string,
  repo: string
): Promise<R<GhIssue[]>> {
  const url = `https://api.github.com/repos/${encodeURIComponent(
    user
  )}/${encodeURIComponent(repo)}/issues?state=open&per_page=20&sort=created`;
  try {
    const res = await fetch(url, {
      headers: { Accept: "application/vnd.github+json" },
    });
    const rate = parseRate(res);
    if (!res.ok)
      return {
        ok: false,
        error: res.statusText || "http_error",
        status: res.status,
        rate,
      };
    const j = await res.json();

    const onlyIssues = j.filter(
      (item: { pull_request: boolean }) => !item.pull_request
    );
    const data: GhIssue[] = onlyIssues.map((i: GhIssue) => ({
      id: i.id,
      number: i.number,
      title: i.title,
      html_url: i.html_url,
      state: i.state,
      comments: i.comments,
      user: { login: i.user?.login },
      created_at: i.created_at,
    }));
    return { ok: true, data, rate };
  } catch (e) {
    return { ok: false, error: (e as Error).message, rate: {} };
  }
}
