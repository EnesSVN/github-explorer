import { getIssues } from "@/lib/gh/client";

export default async function Issues({
  user,
  repo,
}: {
  user: string;
  repo: string;
}) {
  const res = await getIssues(user, repo);

  if (!res.ok) {
    return (
      <div className="rounded-2xl border border-border bg-card p-4 text-sm text-red-700">
        Issues alınamadı: {res.error} {res.status ? `(HTTP ${res.status})` : ""}
      </div>
    );
  }

  if (res.data.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-card p-4 text-sm opacity-70">
        Açık issue yok.
      </div>
    );
  }

  return (
    <ul className="rounded-2xl border border-border bg-card divide-y divide-border">
      {res.data.map((i) => (
        <li key={i.id} className="p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="font-medium">{i.title}</div>
              <div className="text-xs opacity-70 mt-1">
                #{i.number} • {i.state.toUpperCase()} • {i.user.login} •{" "}
                {new Date(i.created_at).toLocaleDateString()}
              </div>
            </div>
            <a
              href={i.html_url}
              target="_blank"
              className="text-sm text-blue-600 underline"
            >
              GitHub
            </a>
          </div>
        </li>
      ))}
    </ul>
  );
}
