import Link from 'next/link';
import { RatingSummary } from './RatingSummary';
import { ReviewCard, type ReviewItem } from './ReviewCard';

type ReviewSectionProps = {
  productId: string;
  average: number;
  totalReviews: number;
  preview: ReviewItem[];
};

/**
 * US-01 + US-02 (PDP slice)
 * - Rating summary di atas
 * - Preview beberapa review
 * - Tombol View More → Full Review Page
 */
export function ReviewSection({
  productId,
  average,
  totalReviews,
  preview,
}: ReviewSectionProps) {
  return (
    <section
      id="reviews"
      className="animate-fade-up-delay rounded-[var(--radius)] bg-[var(--bg-elevated)] px-5 py-6 sm:px-8 sm:py-8"
      aria-labelledby="reviews-heading"
    >
      <div className="mb-6 flex items-baseline justify-between gap-3">
        <h2 id="reviews-heading" className="text-2xl">
          Ulasan produk
        </h2>
        <span className="text-xs uppercase tracking-wide text-[var(--ink-muted)]">
          Mock · FE slot
        </span>
      </div>

      <RatingSummary average={average} totalReviews={totalReviews} />

      <div className="mt-2">
        {preview.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      <div className="mt-6">
        <Link
          href={`/products/${productId}/reviews`}
          className="inline-flex items-center justify-center border border-[var(--ink)] bg-[var(--ink)] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--accent)] hover:border-[var(--accent)]"
        >
          View More
        </Link>
      </div>
    </section>
  );
}
