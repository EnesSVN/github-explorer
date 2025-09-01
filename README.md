# GitHub Explorer (Next.js + TypeScript)

Gerçek GitHub API verisiyle çalışan küçük bir keşif aracı. Hız, tip güvenliği ve net mimari kararlar üzerine kuruldu.

## Stack & İlke

- **Next.js App Router** → SSR/ISR/Streaming için modern API.
- **TypeScript (strict)** → DTO’ları utility types ile türetiyoruz.
- **Tailwind v3 + Design Tokens** → HSL tabanlı açık/koyu uyumlu renk sistemi.
- **Result<T>** → throw yerine `ok/data | error` birliğiyle **tip güvenli hata akışı**.

## Sayfalar & Render Stratejisi

- `/gh/[user]` → **ISR (revalidate: 60)**. Profil **genel** ve sık değişmez → CDN hızında açılış + dakikalık yenileme.
- `/gh/[user]/repos` → **ISR (60s)**. Liste herkese aynı; arama/filtre **client-side** (rate-limit yemeden anında UX).
- `/gh/[user]/[repo]` → **Streaming SSR + ISR (60s)**. Header küçük veri **hemen**; Contributors & Issues ayrı `<Suspense>` ile **akış**.

## Tipler (örnekler)

- `GhUser`, `GhRepo`, `GhRepoDetail`, `GhContributor`, `GhIssue` → geniş JSON’u **daraltıyoruz** (sadece gereken alanlar).
- Patch/DTO mantığı için proje genelinde:
  - `Pick<T, K>` → “sadece şu alanlar”
  - `Omit<T, K>` → “şu alanlar hariç”
  - `Partial<T>` → “hepsi opsiyonel (patch)”
  - `Readonly<T>` → “UI’da immutability”

## Neden Result<T>?

- `try/catch` sadece **throw**’u yakalar; 404 gibi durumlarda `fetch` **throw etmez**.
- `Result<T>` **derleme zamanında** hata kolunu zorunlu kılar:
  ```ts
  const res = await api<In, Out>(...);
  if (res.ok) render(res.data); else renderError(res.error);
  ```
