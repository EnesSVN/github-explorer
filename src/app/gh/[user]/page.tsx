import Link from "next/link";
import { getUser } from "@/lib/gh/client";

export const revalidate = 60;

type Params = { user: string };

export default async function GhUserPage({ params }: { params: Params }) {
  const res = await getUser(params.user);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">GitHub Explorer</h1>

      <p className="text-xs opacity-60">
        Rate: {res.rate.remaining ?? "?"}/{res.rate.limit ?? "?"}
        {res.rate.reset
          ? ` (reset @ ${new Date(res.rate.reset * 1000).toLocaleTimeString()})`
          : ""}
      </p>

      {!res.ok ? (
        <div className="border border-red-300 text-red-700 rounded-xl p-4 bg-card">
          <div className="font-semibold">Kullanıcı bulunamadı veya hata</div>
          <div className="text-sm">
            Detay: {res.error} {res.status ? `(HTTP ${res.status})` : ""}
          </div>
        </div>
      ) : (
        <section className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border shadow-card">
          <img
            src={res.data.avatar_url}
            alt={res.data.login}
            width={96}
            height={96}
            className="rounded-full border border-border"
          />
          <div className="space-y-1">
            <div className="text-xl font-semibold">
              {res.data.name ?? res.data.login}
            </div>
            <div className="text-sm opacity-70">@{res.data.login}</div>
            {res.data.bio && <p className="opacity-80">{res.data.bio}</p>}
            <div className="text-sm opacity-80">
              Followers: {res.data.followers} • Following: {res.data.following}{" "}
              • Repos: {res.data.public_repos}
            </div>
            <Link
              href={res.data.html_url}
              target="_blank"
              className="text-sm text-blue-600 underline"
            >
              GitHub profilini aç
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
