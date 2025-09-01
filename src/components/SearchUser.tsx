"use client";

import { useRouter } from "next/navigation";
import { useState, useRef } from "react";

export default function SearchUser() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function goProfile() {
    const user = q.trim();
    if (user) router.push(`/gh/${encodeURIComponent(user)}`);
  }
  function goRepos() {
    const user = q.trim();
    if (user) router.push(`/gh/${encodeURIComponent(user)}/repos`);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    goProfile();
  }

  return (
    <form onSubmit={onSubmit} className="flex items-center gap-2">
      <input
        ref={inputRef}
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="GitHub kullanıcı adı… (örn: vercel)"
        className="w-48 sm:w-64 rounded-xl border border-border bg-card px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-600"
      />
      <button
        type="submit"
        className="rounded-xl bg-brand-600 hover:bg-brand-700 text-white px-3 py-2 text-sm"
      >
        Profil
      </button>
      <button
        type="button"
        onClick={goRepos}
        className="rounded-xl bg-muted text-fg border border-border px-3 py-2 text-sm"
      >
        Repos
      </button>
    </form>
  );
}
