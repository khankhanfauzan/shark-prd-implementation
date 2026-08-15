import { StarRating } from './StarRating';

type RatingSummaryProps = {
  average: number;
  totalReviews: number;
  empty?: boolean;
};

/** US-01 slot — Overall rating summary di atas Review Section */
export function RatingSummary({
  average,
  totalReviews,
  empty = false,
}: RatingSummaryProps) {
  if (empty) {
    return (
      <div className="flex flex-col gap-2 border-b border-[var(--line)] pb-6">
        <StarRating value={0} size="lg" />
        <p className="text-sm text-[var(--ink-muted)]">Belum ada ulasan</p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-end gap-4 border-b border-[var(--line)] pb-6">
      <div>
        <p className="text-sm text-[var(--ink-muted)]">Rating keseluruhan</p>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="font-[family-name:var(--font-display)] text-4xl tracking-tight">
            {average.toFixed(1)}
          </span>
          <span className="text-[var(--ink-muted)]">/ 5</span>
        </div>
      </div>
      <div className="pb-1">
        <StarRating value={average} size="md" />
        <p className="mt-1 text-sm text-[var(--ink-muted)]">
          {totalReviews} ulasan
        </p>
      </div>
    </div>
  );
}
