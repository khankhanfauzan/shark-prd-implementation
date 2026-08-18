import Link from 'next/link';
import { RatingSummary } from '../components/mock/RatingSummary';

export default function Index(){
  return(
    <main className="mx-auto flex min-h-screen w-full max-w-[var(--max)] flex-col justify-center px-4 py-16 sm:px-6">
      <p className="animate-fade-up text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
        SHARK · FE mockup 
      </p>
      <h1 className="animate-fade-up mt-3 max-w-xl text-4xl sm:text-5xl">
        Product Review & Rating
      </h1>
      <p className="animate-fade-up-delay mt:4 max-w-lg text-[var(--ink-muted)] leading-relaxed">
        Kerangka tampilan untuk PDP dan halaman ulasan. Komponen masih mock —
        tiap anggota FE mengisi slot fitur masing-masing.
      </p>

      <div className="animate-fade-up-delay mt-10 dlex flex-wrap gap-3">
        <Link
        href="/product"
        className="inline-flex items-center bg-[var(--ink)] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--accent)]">
          Buka PDP Mockup
        </Link>
        <Link
        href="/product/reviews"
        className="inline-flex items-center border border-[var(--ink)] px-5 py-2.5 text-sm font-semibold transition hover:border-[var(--accent)] hover:text-[var(--accent)]">
        Full Reviews
        </Link>
      </div>

      <section className="animate-fade-up-delay mt-14 grid gap-4 sm:grid-cols-2">
        
        <div className="border border-[var(--line)] bg-[var(--bg-elevated)] p-5">
          <h2 className="mb-4 text-lg">
            US-01 · Overall Rating
          </h2>
        </div>

        <div className="border border-[var(--line)] bg-[var(--bg-elevated)] p-5">
          <h2 className="text-lg">US-02 · Review List</h2>
          <p className="mt-2 text-sm text-[var(--ink-muted)]">
            View More, ReviewCard, infinite scroll, loading / end / retry.
          </p>
        </div>

      </section>
    </main>
  )
}