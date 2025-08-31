export type GhUser = {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  followers: number;
  following: number;
  public_repos: number;
  html_url: string;
};

export type GhRateLimit = {
  limit?: number;
  remaining?: number;
  reset?: number;
};
