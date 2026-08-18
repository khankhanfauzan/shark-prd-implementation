import Link from 'next/link';

import { RatingSummary } from '@/components/mock/RatingSummary';
import { ReviewCard, type ReviewItem } from '@/components/mock/ReviewCard';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type ReviewSectionProps = {
  average: number;
  totalReviews: number;
  preview: ReviewItem[];
};

/** US-01 + US-02 (PDP slice) */
export function ReviewSection({
  average,
  totalReviews,
  preview,
}: ReviewSectionProps) {
  return (
    <Card id="reviews" className="animate-fade-up-delay shadow-sm">
      <CardHeader className="flex-row items-start justify-between gap-3 space-y-0">
        <div>
          <CardTitle className="font-serif text-2xl">Ulasan produk</CardTitle>
          <CardDescription>Ringkasan rating & preview ulasan</CardDescription>
        </div>
        <span className="text-xs uppercase tracking-wide text-muted-foreground">
          Mock · FE slot
        </span>
      </CardHeader>

      <CardContent>
        <RatingSummary average={average} totalReviews={totalReviews} />
        <div>
          {preview.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </CardContent>

      <CardFooter>
        <Button asChild>
          <Link href="/product/reviews">View More</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
