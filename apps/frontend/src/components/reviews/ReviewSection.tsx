'use client';

import Link from 'next/link';

import { RatingSummary } from '@/components/reviews/RatingSummary';
import { ReviewCard } from '@/components/reviews/ReviewCard';
import { ReviewForm } from '@/components/reviews/ReviewForm';
import {
  QueryErrorState,
  RatingSkeleton,
  ReviewCardSkeleton,
} from '@/components/reviews/ReviewStates';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  useRatingSummary,
  useReviewsPreview,
} from '@/hooks/use-product-queries';

export function ReviewSection() {
  const summaryQuery = useRatingSummary();
  const previewQuery = useReviewsPreview(2);

  const isPending = summaryQuery.isPending || previewQuery.isPending;
  const isError = summaryQuery.isError || previewQuery.isError;
  const summary = summaryQuery.data;
  const preview = previewQuery.data?.data ?? [];

  return (
    <Card id="reviews" className="animate-fade-up-delay shadow-sm">
      <CardHeader className="flex-row items-start justify-between gap-3 space-y-0">
        <div>
          <CardTitle className="font-serif text-2xl">Ulasan produk</CardTitle>
          <CardDescription>Ringkasan rating & preview ulasan</CardDescription>
        </div>
      </CardHeader>

      <CardContent>
        {isPending ? (
          <>
            <RatingSkeleton />
            <ReviewCardSkeleton />
            <ReviewCardSkeleton />
          </>
        ) : isError ? (
          <QueryErrorState
            message={
              summaryQuery.error?.message || previewQuery.error?.message
            }
            onRetry={() => {
              void summaryQuery.refetch();
              void previewQuery.refetch();
            }}
          />
        ) : (
          <>
            <RatingSummary
              average={summary?.averageRating ?? 0}
              totalReviews={summary?.totalReviews ?? 0}
            />
            {preview.length === 0 ? (
              <p className="py-6 text-sm text-muted-foreground">
                Jadilah yang pertama menulis ulasan.
              </p>
            ) : (
              preview.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))
            )}
          </>
        )}

        <div className="pt-4">
          <ReviewForm />
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
