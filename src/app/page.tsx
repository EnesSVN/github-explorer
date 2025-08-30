export default function Home() {
  return (
    <main className="mx-auto max-w-2xl p-6 space-y-6">
      <section className="rounded-2xl bg-card text-fg border border-border shadow-card p-5 space-y-3">
        <p>deneme</p>
        <div className="flex gap-3">
          <button className="rounded-xl bg-brand-600 hover:bg-brand-700 text-white px-4 py-2">
            deneme
          </button>
          <button className="rounded-xl bg-muted text-fg px-4 py-2 border border-border">
            deneme
          </button>
        </div>
      </section>
    </main>
  );
}
