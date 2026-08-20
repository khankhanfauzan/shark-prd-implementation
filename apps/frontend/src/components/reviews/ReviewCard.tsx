import { StarRating } from '@/components/reviews/StarRating';
import { formatReviewDate } from '@/lib/format';
import type { Review } from '@/lib/types';

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const letters = parts.slice(0, 2).map((part) => part[0] ?? '');
  return (letters.join('') || '?').toUpperCase();
}

export function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="border-b border-border/70 py-6 last:border-b-0">
      <div className="flex items-start gap-4">
        <div
          className="flex size-11 shrink-0 items-center justify-center rounded-full bg-accent font-editorial text-lg font-medium text-accent-foreground"
          aria-hidden
        >
          {initials(review.name)}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="font-semibold">{review.name}</p>
              <p className="text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground">
                {formatReviewDate(review.createdAt)}
              </p>
            </div>
            <StarRating value={review.rating} size="sm" />
          </div>
          {review.comment ? (
            <p className="mt-3 font-editorial text-[1.2rem] leading-snug tracking-[-0.01em]">
              {review.comment}
            </p>
          ) : (
            <p className="mt-3 text-sm italic text-muted-foreground">
              Tidak ada komentar
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
