import { StarRating } from '@/components/reviews/StarRating';

type RatingSummaryProps = {
  average: number;
  totalReviews: number;
  empty?: boolean;
};

export function RatingSummary({
  average,
  totalReviews,
  empty = false,
}: RatingSummaryProps) {
  if (empty || totalReviews === 0) {
    return (
      <div className="mb-6 space-y-2">
        <StarRating value={0} size="lg" />
        <p className="text-sm text-muted-foreground">Belum ada ulasan</p>
      </div>
    );
  }

  return (
    <div className="mb-2 flex flex-wrap items-end gap-5 rounded-[1.4rem] border border-white/60 bg-card/55 px-5 py-5 shadow-sm backdrop-blur-md">
      <div>
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Rating keseluruhan
        </p>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="font-editorial text-6xl font-medium leading-none tracking-[-0.05em]">
            {average.toFixed(1)}
          </span>
          <span className="text-muted-foreground">/ 5</span>
        </div>
      </div>
      <div className="pb-1">
        <StarRating value={average} size="md" />
        <p className="mt-1 text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground">
          {totalReviews} ulasan
        </p>
      </div>
    </div>
  );
}
