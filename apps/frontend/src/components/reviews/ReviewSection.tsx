'use client';

import Link from 'next/link';

import { RatingSummary } from '@/components/reviews/RatingSummary';
import { ReviewCard } from '@/components/reviews/ReviewCard';
import { ReviewForm } from '@/components/reviews/ReviewForm';
import {
  EmptyReviewsState,
  QueryErrorState,
  RatingSkeleton,
  ReviewCardSkeleton,
} from '@/components/reviews/ReviewStates';
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
      ) : preview.length === 0 ? (
        <EmptyReviewsState />
      ) : (
        <>
          <RatingSummary
            average={summary?.averageRating ?? 0}
            totalReviews={summary?.totalReviews ?? 0}
          />
          <div className="mt-2">
            {preview.map((review) => (
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
