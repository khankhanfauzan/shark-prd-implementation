import { StarRating } from '@/components/reviews/StarRating';
import { Separator } from '@/components/ui/separator';

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
      <div className="space-y-2 pb-6">
        <StarRating value={0} size="lg" />
        <p className="text-sm text-muted-foreground">Belum ada ulasan</p>
        <Separator />
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-2">
      <div className="flex flex-wrap items-end gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Rating keseluruhan</p>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="font-serif text-4xl tracking-tight">
              {average.toFixed(1)}
            </span>
            <span className="text-muted-foreground">/ 5</span>
          </div>
        </div>
        <div className="pb-1">
          <StarRating value={average} size="md" />
          <p className="mt-1 text-sm text-muted-foreground">
            {totalReviews} ulasan
          </p>
        </div>
      </div>
      <Separator />
    </div>
  );
}
