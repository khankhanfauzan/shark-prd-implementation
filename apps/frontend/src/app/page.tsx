import Link from 'next/link';

export default function Index() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[var(--max)] flex-col justify-center px-4 py-16 sm:px-6">
      <p className="animate-fade-up text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
        SHARK · Product review
      </p>
      <h1 className="animate-fade-up mt-3 max-w-xl text-4xl sm:text-5xl">
        Halaman mock untuk PDP dan full review
      </h1>
      <p className="animate-fade-up-delay mt-4 max-w-2xl leading-relaxed text-[var(--ink-muted)]">
        UI ini dipulihkan dari branch `frontend` tanpa menimpa backend dan
        perubahan infra yang lebih baru di `main`. Data review masih memakai
        mock sementara dan bisa diganti ke API saat integrasi berikutnya.
      </p>

      <div className="animate-fade-up-delay mt-10 flex flex-wrap gap-3">
        <Link
          href="/product"
          className="inline-flex items-center bg-[var(--ink)] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--accent)]"
        >
          Buka halaman produk
        </Link>
        <Link
          href="/product/reviews"
          className="inline-flex items-center border border-[var(--ink)] px-5 py-2.5 text-sm font-semibold transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
        >
          Lihat semua ulasan
        </Link>
      </div>

      <section className="animate-fade-up-delay mt-14 grid gap-4 sm:grid-cols-2">
        <div className="border border-[var(--line)] bg-[var(--bg-elevated)] p-5">
          <h2 className="text-lg">Route yang tersedia</h2>
          <p className="mt-2 text-sm text-[var(--ink-muted)]">
            `/product` untuk PDP mock dan `/product/reviews` untuk daftar ulasan
            penuh.
          </p>
        </div>
        <div className="border border-[var(--line)] bg-[var(--bg-elevated)] p-5">
          <h2 className="text-lg">Status integrasi</h2>
          <p className="mt-2 text-sm text-[var(--ink-muted)]">
            Komponen review sudah siap dirender di `main`, tapi belum diikat ke
            endpoint backend product/review yang sudah ada.
          </p>
        </div>
      </section>
    </main>
  );
}
