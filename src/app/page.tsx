import Link from "next/link";

export default function Home() {
  return (
    <main className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">GitHub Explorer</h1>
        <p className="opacity-80">
          Gerçek GitHub API verisiyle çalışan, <b>render stratejilerini</b> (ISR
          &amp; Streaming SSR) ve
          <b> tip güvenli hata akışını</b> (Result&lt;T&gt;) uygulamalı gösteren
          küçük bir proje.
        </p>
      </header>

      <section className="rounded-2xl bg-card border border-border shadow-card p-5 space-y-3">
        <h2 className="text-xl font-semibold">Neden bu proje?</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            Gerçek API ile (GitHub) <b>ISR</b> ve <b>Streaming SSR</b> farkını
            pratiğe dökmek.
          </li>
          <li>
            <b>TypeScript</b> ile geniş JSON’u dar tiplerle modellemek (UI’da
            sadece gereken alanlar).
          </li>
          <li>
            <b>Result&lt;T&gt;</b> modeliyle tip güvenli hata/başarı ayrımı
            (throw yerine birlik tipi).
          </li>
          <li>
            Basit ama profesyonel bir <b>Tailwind</b> tasarım sistemi (HSL
            design tokens + dark ready).
          </li>
        </ul>
      </section>

      <section className="rounded-2xl bg-card border border-border shadow-card p-5 space-y-3">
        <h2 className="text-xl font-semibold">
          Rotalar &amp; Kısa Açıklamalar
        </h2>
        <div className="space-y-2 text-sm">
          <div>
            <code className="px-2 py-1 rounded bg-muted border border-border">
              /gh/[user]
            </code>{" "}
            — <b>ISR (60s)</b>. Profil herkese aynı, sık değişmiyor → CDN
            hızında açılış + dakikalık yenileme.{" "}
            <Link className="text-blue-600 underline" href="/gh/vercel">
              Örnek: /gh/vercel
            </Link>
          </div>
          <div>
            <code className="px-2 py-1 rounded bg-muted border border-border">
              /gh/[user]/repos
            </code>{" "}
            — <b>ISR (60s)</b>. Liste genel veri; arama/filtre{" "}
            <b>client-side</b> (rate-limit yemeden anında).{" "}
            <Link className="text-blue-600 underline" href="/gh/vercel/repos">
              Örnek: /gh/vercel/repos
            </Link>
          </div>
          <div>
            <code className="px-2 py-1 rounded bg-muted border border-border">
              /gh/[user]/[repo]
            </code>{" "}
            — <b>Streaming SSR</b>. Header küçük veri hemen; <b>Contributors</b>{" "}
            ve <b>Issues</b> ayrı <code>&lt;Suspense&gt;</code> sınırlarında
            hazır oldukça akar.{" "}
            <Link className="text-blue-600 underline" href="/gh/vercel/next.js">
              Örnek: /gh/vercel/next.js
            </Link>
          </div>
        </div>
      </section>

      <section className="rounded-2xl bg-card border border-border shadow-card p-5 space-y-3">
        <h2 className="text-xl font-semibold">Mimari Notlar</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <b>Tipler:</b> <code>GhUser</code>, <code>GhRepo</code>,{" "}
            <code>GhRepoDetail</code>… → geniş JSON daraltıldı (gereken
            alanlar). Patch/DTO için <code>Pick</code>/<code>Omit</code>/
            <code>Partial</code> kalıpları hazır.
          </li>
          <li>
            <b>Result&lt;T&gt;:</b> UI’da <code>if (res.ok)</code> ile zorunlu
            dallanma. 404 gibi “throw etmeyen” HTTP durumlarında bile **tip
            güvenli** akış.
          </li>
          <li>
            <b>Render stratejisi seçimi:</b> “Herkese aynı” &amp; “sık
            değişmeyen” → ISR. “Bölünmüş/yavaş alt veri” → Streaming SSR ile
            ayrı <code>&lt;Suspense&gt;</code> sınırları.
          </li>
          <li>
            <b>Tasarım:</b> HSL tabanlı design tokens → <code>bg-card</code>,{" "}
            <code>text-fg</code>, <code>border-border</code> gibi anlamlı
            utility’ler; koyu moda hazır.
          </li>
        </ul>
      </section>

      <section className="rounded-2xl bg-card border border-border shadow-card p-5 space-y-4">
        <h2 className="text-xl font-semibold">Hızlı Başlangıç</h2>
        <ol className="list-decimal pl-5 space-y-1">
          <li>
            Header’daki aramaya GitHub kullanıcı adı yaz → Profil/Repos
            sayfalarına git.
          </li>
          <li>
            Repo detayında skeleton’ları gör; içerikler hazır oldukça akışı
            izle.
          </li>
          <li>
            DevTools → Network’ten TTFB’yi karşılaştır; Slow 3G ile farkı net
            gör.
          </li>
        </ol>
        <div className="flex gap-3">
          <Link
            href="/gh/vercel"
            className="rounded-xl bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 text-sm"
          >
            Başla: vercel
          </Link>
          <Link
            href="/gh/facebook"
            className="rounded-xl bg-muted text-fg border border-border px-4 py-2 text-sm"
          >
            Başka örnek
          </Link>
        </div>
      </section>

      <footer className="pt-4 text-xs opacity-70">
        Not: Bu sayfa, README’nin kısa ve gezilebilir bir özeti olarak
        tasarlandı.
      </footer>
    </main>
  );
}
