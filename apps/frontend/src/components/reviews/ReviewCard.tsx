import { StarRating } from '@/components/reviews/StarRating';
import { Separator } from '@/components/ui/separator';
import { formatReviewDate } from '@/lib/format';
import type { Review } from '@/lib/types';

export function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="py-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="font-semibold">{review.name}</p>
          <p className="text-xs text-muted-foreground">
            {formatReviewDate(review.createdAt)}
          </p>
        </div>
        <StarRating value={review.rating} size="sm" />
      </div>
      {review.comment ? (
        <p className="mt-3 text-[15px] leading-relaxed">{review.comment}</p>
      ) : (
        <p className="mt-3 text-sm italic text-muted-foreground">
          Tidak ada komentar
        </p>
      )}
      <Separator className="mt-5" />
    </article>
  );
}
