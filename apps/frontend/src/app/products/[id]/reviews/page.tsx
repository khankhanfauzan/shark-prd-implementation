import Link from 'next/link';
import { RatingSummary } from '../../../../components/mock/RatingSummary';
import { ReviewCard } from '../../../../components/mock/ReviewCard';
import { InfiniteScrollFooter } from '../../../../components/mock/ReviewStates';
import { MOCK_PRODUCT, MOCK_REVIEWS } from '../../../../lib/mock-data';

type PageProps = {
  params: Promise<{ id: string }>;
};

/**
 * US-02 — Full Review Page (mock)
 * Infinite scroll = placeholder footer states (loading / end / error)
 * IntersectionObserver & cursor API digarap di task FE masing-masing.
 */
export default async function ProductReviewsPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <main className="mx-auto min-h-screen w-full max-w-[42rem] px-4 py-8 sm:px-6 sm:py-12">
      <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-[var(--ink-muted)]">
        <Link href={`/products/${id}`} className="hover:text-[var(--ink)]">
          ← Kembali ke produk
        </Link>
      </nav>

      <header className="animate-fade-up mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">
          Full reviews
        </p>
        <h1 className="mt-2 text-3xl">{MOCK_PRODUCT.name}</h1>
      </header>

      <section className="animate-fade-up-delay rounded-[var(--radius)] bg-[var(--bg-elevated)] px-5 py-6 sm:px-8">
        <RatingSummary
          average={MOCK_PRODUCT.averageRating}
          totalReviews={MOCK_PRODUCT.totalReviews}
        />

        <div className="mt-2">
          {MOCK_REVIEWS.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {/* Mock sentinel untuk infinite scroll — ganti dengan IntersectionObserver */}
        <div data-scroll-sentinel>
          <InfiniteScrollFooter state="end" />
        </div>
      </section>

      <aside className="mt-8 rounded-[var(--radius)] border border-dashed border-[var(--line)] bg-white/60 px-4 py-4 text-sm text-[var(--ink-muted)]">
        <p className="font-semibold text-[var(--ink)]">Slot FE (belum diikat API)</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>Infinite scroll + IntersectionObserver</li>
          <li>Cursor pagination dari BE</li>
          <li>State loading / error / retry di footer</li>
        </ul>
      </aside>
    </main>
  );
}
