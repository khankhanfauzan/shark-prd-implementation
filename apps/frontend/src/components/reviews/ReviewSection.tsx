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
import { useRatingSummary } from '@/hooks/use-product-queries';
import type { Review } from '@/lib/types';

export function ReviewSection({ reviews }: { reviews: Review[] }) {
  const summaryQuery = useRatingSummary();
  const summary = summaryQuery.data;
  const hasReviews = reviews.length > 0;

  return (
    <section id="reviews" className="animate-fade-up-delay scroll-mt-8">
      <div className="mb-8">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-primary">
          US-02 · Review list
        </p>
        <h2 className="mt-3 font-editorial text-[clamp(2.4rem,5vw,4rem)] font-medium leading-[0.9] tracking-[-0.045em]">
          The <em className="italic text-primary">voices</em>
        </h2>
        <p className="mt-3 max-w-md text-sm text-muted-foreground">
          Preview ulasan terbaru. Buka halaman penuh untuk membaca semuanya.
        </p>
      </div>

      {summaryQuery.isPending ? (
        <RatingSkeleton />
      ) : summaryQuery.isError ? (
        <QueryErrorState
          message={summaryQuery.error?.message}
          onRetry={() => {
            void summaryQuery.refetch();
          }}
        />
      ) : !hasReviews ? (
        <EmptyReviewsState />
      ) : (
        <>
          <RatingSummary
            average={summary?.averageRating ?? 0}
            totalReviews={summary?.totalReviews ?? reviews.length}
          />
          <div className="mt-2">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
          <div className="pt-6">
            <Link
              href="/product/reviews"
              className="inline-flex h-12 items-center rounded-full bg-foreground px-5 text-sm font-semibold text-background transition hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground"
            >
              View More
            </Link>
          </div>
        </>
      )}

      <div className="pt-8">
        <ReviewForm />
      </div>
    </section>
  );
}
