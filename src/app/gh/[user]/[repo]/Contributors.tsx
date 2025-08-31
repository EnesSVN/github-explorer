import { getContributors } from "@/lib/gh/client";

export default async function Contributors({
  user,
  repo,
}: {
  user: string;
  repo: string;
}) {
  const res = await getContributors(user, repo);

  if (!res.ok) {
    return (
      <div className="rounded-2xl border border-border bg-card p-4 text-sm text-red-700">
        Contributors alınamadı: {res.error}{" "}
        {res.status ? `(HTTP ${res.status})` : ""}
      </div>
    );
  }

  if (res.data.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-card p-4 text-sm opacity-70">
        Contributor yok.
      </div>
    );
  }

  return (
    <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {res.data.map((c) => (
        <li
          key={c.id}
          className="rounded-2xl border border-border bg-card p-4 flex items-center gap-3"
        >
          <img
            src={c.avatar_url}
            alt={c.login}
            width={40}
            height={40}
            className="rounded-full border border-border"
          />
          <div className="space-y-0.5">
            <div className="font-medium text-sm">{c.login}</div>
            <div className="text-xs opacity-70">
              Contributions: {c.contributions}
            </div>
            <a
              href={c.html_url}
              target="_blank"
              className="text-xs text-blue-600 underline"
            >
              GitHub
            </a>
          </div>
        </li>
      ))}
    </ul>
  );
}
