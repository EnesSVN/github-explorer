"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RepoJump({
  initialOwner = "",
  initialRepo = "",
}: {
  initialOwner?: string;
  initialRepo?: string;
}) {
  const router = useRouter();
  const [val, setVal] = useState(`${initialOwner}/${initialRepo}`);

  function go() {
    const s = val.trim();
    const [owner, repo] = s.split("/");
    if (owner && repo) {
      router.push(
        `/gh/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`
      );
    }
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    go();
  }

  return (
    <form onSubmit={onSubmit} className="flex items-center gap-2">
      <input
        value={val}
        onChange={(e) => setVal(e.target.value)}
        placeholder="owner/repo (örn: vercel/next.js)"
        className="w-64 rounded-xl border border-border bg-card px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-600"
      />
      <button
        type="submit"
        className="rounded-xl bg-brand-600 hover:bg-brand-700 text-white px-3 py-2 text-sm"
      >
        Aç
      </button>
    </form>
  );
}
