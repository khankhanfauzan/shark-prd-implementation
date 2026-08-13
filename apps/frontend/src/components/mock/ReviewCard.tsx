import { StarRating } from './StarRating';

export type ReviewItem = {
  id: string;
  userName: string;
  rating: number;
  comment: string | null;
  createdAt: string;
};

/** US-02 slot — Review card item */
export function ReviewCard({ review }: { review: ReviewItem }) {
  return (
    <article className="border-b border-[var(--line)] py-5 last:border-b-0">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="font-semibold">{review.userName}</p>
          <p className="text-xs text-[var(--ink-muted)]">{review.createdAt}</p>
        </div>
        <StarRating value={review.rating} size="sm" />
      </div>
      {review.comment ? (
        <p className="mt-3 text-[15px] leading-relaxed text-[var(--ink)]">
          {review.comment}
        </p>
      ) : (
        <p className="mt-3 text-sm italic text-[var(--ink-muted)]">
          Tidak ada komentar
        </p>
      )}
    </article>
  );
}
