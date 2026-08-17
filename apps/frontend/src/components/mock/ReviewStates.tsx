/** US-01 / US-02 — skeleton loading state (slot untuk FE) */
export function RatingSkeleton() {
  return (
    <div className="flex gap-4 border-b border-[var(--line)] pb-6" aria-hidden>
      <div className="skeleton h-12 w-20" />
      <div className="flex flex-col gap-2">
        <div className="skeleton h-5 w-28" />
        <div className="skeleton h-4 w-20" />
      </div>
    </div>
  );
}

export function ReviewCardSkeleton() {
  return (
    <div className="border-b border-[var(--line)] py-5" aria-hidden>
      <div className="flex justify-between gap-3">
        <div className="skeleton h-4 w-32" />
        <div className="skeleton h-4 w-20" />
      </div>
      <div className="skeleton mt-3 h-4 w-full" />
      <div className="skeleton mt-2 h-4 w-[80%]" />
    </div>
  );
}

export function InfiniteScrollFooter({
  state,
}: {
  state: 'loading' | 'end' | 'error';
}) {
  if (state === 'loading') {
    return (
      <div className="flex flex-col items-center gap-3 py-8" aria-live="polite">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-[var(--line)] border-t-[var(--accent)]" />
        <p className="text-sm text-[var(--ink-muted)]">Memuat ulasan…</p>
      </div>
    );
  }

  if (state === 'error') {
    return (
      <div className="flex flex-col items-center gap-3 py-8" role="alert">
        <p className="text-sm text-[var(--danger)]">Gagal memuat ulasan.</p>
        <button
          type="button"
          className="border border-[var(--line)] bg-white px-4 py-2 text-sm font-medium transition hover:border-[var(--ink)]"
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  return (
    <p className="py-8 text-center text-sm text-[var(--ink-muted)]">
      Semua ulasan telah ditampilkan
    </p>
  );
}
