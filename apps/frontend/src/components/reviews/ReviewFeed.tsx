'use client';

import { useEffect, useRef } from 'react';

import { RatingSummary } from '@/components/reviews/RatingSummary';
import { ReviewCard } from '@/components/reviews/ReviewCard';
import { ReviewForm } from '@/components/reviews/ReviewForm';
import {
  InfiniteScrollFooter,
  QueryErrorState,
  RatingSkeleton,
  ReviewCardSkeleton,
} from '@/components/reviews/ReviewStates';
import {
  useRatingSummary,
  useReviewsInfinite,
} from '@/hooks/use-product-queries';

export function ReviewFeed() {
  const summaryQuery = useRatingSummary();
  const reviewsQuery = useReviewsInfinite(10);
  const { fetchNextPage, hasNextPage, isFetchingNextPage } = reviewsQuery;
  const sentinelRef = useRef<HTMLDivElement>(null);

  const reviews =
    reviewsQuery.data?.pages.flatMap((page) => page.data) ?? [];

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && hasNextPage && !isFetchingNextPage) {
          void fetchNextPage();
        }
      },
      { rootMargin: '240px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (reviewsQuery.isPending || summaryQuery.isPending) {
    return (
      <>
        <RatingSkeleton />
        <ReviewCardSkeleton />
        <ReviewCardSkeleton />
        <ReviewCardSkeleton />
      </>
    );
  }

  if (reviewsQuery.isError && reviews.length === 0) {
    return (
      <QueryErrorState
        message={reviewsQuery.error.message}
        onRetry={() => {
          void reviewsQuery.refetch();
          void summaryQuery.refetch();
        }}
      />
    );
  }

  const footerState = isFetchingNextPage
    ? 'loading'
    : reviewsQuery.isFetchNextPageError
      ? 'error'
      : 'end';

  return (
    <>
      <RatingSummary
        average={summaryQuery.data?.averageRating ?? 0}
        totalReviews={summaryQuery.data?.totalReviews ?? 0}
      />

      {reviews.length === 0 ? (
        <p className="py-6 text-sm text-muted-foreground">
          Belum ada ulasan untuk produk ini.
        </p>
      ) : (
        reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))
      )}

      <div ref={sentinelRef} data-scroll-sentinel>
        {reviews.length > 0 ? (
          <InfiniteScrollFooter
            state={footerState}
            onRetry={() => void reviewsQuery.fetchNextPage()}
          />
        ) : null}
      </div>

      <div className="pt-2">
        <ReviewForm />
      </div>
    </>
  );
}
