'use client';

import Link from 'next/link';

import { RatingSummary } from '@/components/reviews/RatingSummary';
import { ReviewCard } from '@/components/reviews/ReviewCard';
import { ReviewForm } from '@/components/reviews/ReviewForm';
import {
  EmptyReviewsState,
  QueryErrorState,
  RatingSkeleton,
} from '@/components/reviews/ReviewStates';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useRatingSummary } from '@/hooks/use-product-queries';
import type { Review } from '@/lib/types';

export function ReviewSection({ reviews }: { reviews: Review[] }) {
  const summaryQuery = useRatingSummary();
  const summary = summaryQuery.data;
  const hasReviews = reviews.length > 0;

  return (
    <Card id="reviews" className="animate-fade-up-delay shadow-sm">
      <CardHeader className="flex-row items-start justify-between gap-3 space-y-0">
        <div>
          <CardTitle className="font-serif text-2xl">Ulasan produk</CardTitle>
          <CardDescription>Ringkasan rating & preview ulasan</CardDescription>
        </div>
      </CardHeader>

      <CardContent>
        {summaryQuery.isPending ? (
          <RatingSkeleton />
        ) : summaryQuery.isError ? (
          <QueryErrorState
            message={summaryQuery.error?.message}
            onRetry={() => {
              void summaryQuery.refetch();
            }}
          />
        ) : hasReviews ? (
          <RatingSummary
            average={summary?.averageRating ?? 0}
            totalReviews={summary?.totalReviews ?? reviews.length}
          />
        ) : (
          <EmptyReviewsState />
        )}

        {hasReviews
          ? reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))
          : null}

        {hasReviews ? (
          <div className="pt-4">
            <Button asChild>
              <Link href="/product/reviews">View More</Link>
            </Button>
          </div>
        ) : null}

        <div className="pt-4">
          <ReviewForm />
        </div>
      </CardContent>

      {preview.length > 0 ? (
        <CardFooter>
          <Button asChild className="!text-white">
            <Link href="/product/reviews">View More</Link>
          </Button>
        </CardFooter>
      ) : null}
    </Card>
  );
}
