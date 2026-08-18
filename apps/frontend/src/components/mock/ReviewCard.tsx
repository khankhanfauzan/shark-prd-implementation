import { StarRating } from '@/components/mock/StarRating';
import { Separator } from '@/components/ui/separator';

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
    <article className="py-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="font-semibold">{review.userName}</p>
          <p className="text-xs text-muted-foreground">{review.createdAt}</p>
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
