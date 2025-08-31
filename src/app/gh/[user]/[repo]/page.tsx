import Link from "next/link";
import { Suspense } from "react";
import { getRepoDetail } from "@/lib/gh/client";
import Contributors from "./Contributors";
import Issues from "./Issues";

export const revalidate = 60;

type Params = { user: string; repo: string };

export default async function GhRepoDetailPage({ params }: { params: Params }) {
  const head = await getRepoDetail(params.user, params.repo);

  if (!head.ok) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">
          {params.user}/{params.repo}
        </h1>
        <div className="rounded-2xl border border-red-300 bg-card p-4 text-red-700">
          Repo bulunamadı veya hata: {head.error}{" "}
          {head.status ? `(HTTP ${head.status})` : ""}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <header className="space-y-2">
        <h1 className="text-2xl font-bold">{head.data.full_name}</h1>
        {head.data.description && (
          <p className="opacity-80">{head.data.description}</p>
        )}
        <div className="text-sm opacity-80 flex flex-wrap gap-3">
          {head.data.language && <span>{head.data.language}</span>}
          <span>⭐ {head.data.stargazers_count}</span>
          <span>🍴 {head.data.forks_count}</span>
          <span>Open issues: {head.data.open_issues_count}</span>
          <span>
            Updated: {new Date(head.data.updated_at).toLocaleDateString()}
          </span>
          <Link
            href={head.data.html_url}
            target="_blank"
            className="text-blue-600 underline"
          >
            GitHub
          </Link>
        </div>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Contributors</h2>
        <Suspense fallback={<ContribSkeleton />}>
          <Contributors user={params.user} repo={params.repo} />
        </Suspense>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Open Issues</h2>
        <Suspense fallback={<IssuesSkeleton />}>
          <Issues user={params.user} repo={params.repo} />
        </Suspense>
      </section>
    </div>
  );
}

function ContribSkeleton() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="rounded-2xl border border-border bg-card p-4 animate-pulse"
        >
          <div className="h-10 w-10 rounded-full bg-muted mb-3" />
          <div className="h-3 bg-muted rounded w-2/3 mb-2" />
          <div className="h-3 bg-muted rounded w-1/3" />
        </div>
      ))}
    </div>
  );
}

function IssuesSkeleton() {
  return (
    <ul className="rounded-2xl border border-border bg-card divide-y divide-border">
      {Array.from({ length: 4 }).map((_, i) => (
        <li key={i} className="p-4 animate-pulse">
          <div className="h-4 bg-muted rounded w-2/3 mb-2" />
          <div className="h-3 bg-muted rounded w-1/3" />
        </li>
      ))}
    </ul>
  );
}
