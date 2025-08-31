"use client";

import { useMemo, useState } from "react";
import type { GhRepo } from "@/lib/gh/types";

type Props = { initial: GhRepo[] };

export default function ReposClient({ initial }: Props) {
  const [q, setQ] = useState("");
  const [lang, setLang] = useState<string>("");

  const languages = useMemo(() => {
    const set = new Set(
      initial.map((r) => r.language).filter(Boolean) as string[]
    );
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [initial]);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return initial.filter((r) => {
      const matchQ =
        term.length === 0 ||
        r.name.toLowerCase().includes(term) ||
        (r.description?.toLowerCase().includes(term) ?? false) ||
        (r.language?.toLowerCase().includes(term) ?? false);

      const matchLang =
        !lang || r.language?.toLowerCase() === lang.toLowerCase();
      return matchQ && matchLang;
    });
  }, [initial, q, lang]);

  return (
    <section className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Ara: ad, açıklama, dil…"
          className="w-full sm:max-w-md rounded-xl border border-border bg-card px-3 py-2 outline-none focus:ring-2 focus:ring-brand-600"
        />
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          className="rounded-xl border border-border bg-card px-3 py-2"
        >
          <option value="">Tüm diller</option>
          {languages.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
      </div>

      <ul className="divide-y divide-border rounded-2xl border border-border bg-card">
        {filtered.map((r) => (
          <li key={r.id} className="p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="font-medium">{r.name}</div>
                {r.description && (
                  <p className="text-sm opacity-80 mt-0.5">{r.description}</p>
                )}
                <div className="mt-2 text-xs opacity-70 flex gap-3">
                  {r.language && <span>{r.language}</span>}
                  <span>⭐ {r.stargazers_count}</span>
                  <span>🍴 {r.forks_count}</span>
                  <span>
                    Updated: {new Date(r.updated_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <a
                className="shrink-0 text-sm text-blue-600 underline"
                href={r.html_url}
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            </div>
          </li>
        ))}
        {filtered.length === 0 && (
          <li className="p-6 text-sm opacity-70">Sonuç bulunamadı.</li>
        )}
      </ul>
    </section>
  );
}
