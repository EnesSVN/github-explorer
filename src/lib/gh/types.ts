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

export type GhRepo = {
  id: number;
  name: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  html_url: string;
  updated_at: string;
};

export type GhRepoDetail = {
  name: string;
  full_name: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  language: string | null;
  html_url: string;
  updated_at: string;
};

export type GhContributor = {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
};

export type GhIssue = {
  id: number;
  number: number;
  title: string;
  html_url: string;
  state: "open" | "closed";
  comments: number;
  user: { login: string };
  created_at: string;
};
