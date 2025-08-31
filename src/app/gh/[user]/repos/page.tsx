import { getUser, getRepos } from "@/lib/gh/client";
import ReposClient from "../ReposClient";

export const revalidate = 60;

type Params = { user: string };

export default async function GhUserReposPage({ params }: { params: Params }) {
  const userRes = await getUser(params.user);
  if (!userRes.ok) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Repos — @{params.user}</h1>
        <div className="border border-red-300 text-red-700 rounded-xl p-4 bg-card">
          <div className="font-semibold">Kullanıcı bulunamadı veya hata</div>
          <div className="text-sm">
            Detay: {userRes.error}{" "}
            {userRes.status ? `(HTTP ${userRes.status})` : ""}
          </div>
        </div>
      </div>
    );
  }

  const reposRes = await getRepos(params.user);

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold">
          Repositories — {userRes.data.name ?? userRes.data.login}
        </h1>
        <p className="text-xs opacity-60">
          Rate: {reposRes.rate.remaining ?? "?"}/{reposRes.rate.limit ?? "?"}
          {reposRes.rate.reset
            ? ` (reset @ ${new Date(
                reposRes.rate.reset * 1000
              ).toLocaleTimeString()})`
            : ""}
        </p>
      </header>

      {!reposRes.ok ? (
        <div className="border border-red-300 text-red-700 rounded-xl p-4 bg-card">
          <div className="font-semibold">Repo listesi alınamadı</div>
          <div className="text-sm">
            Detay: {reposRes.error}{" "}
            {reposRes.status ? `(HTTP ${reposRes.status})` : ""}
          </div>
        </div>
      ) : (
        <ReposClient initial={reposRes.data} />
      )}
    </div>
  );
}
