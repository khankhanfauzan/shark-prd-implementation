'use client';

import useInfiniteScroll from 'react-infinite-scroll-hook';

import { RatingSummary } from '@/components/reviews/RatingSummary';
import { ReviewCard } from '@/components/reviews/ReviewCard';
import { ReviewForm } from '@/components/reviews/ReviewForm';
import {
  EmptyReviewsState,
  InfiniteScrollFooter,
  NextPageSpinner,
  QueryErrorState,
  RatingSkeleton,
  ReviewCardSkeleton,
} from '@/components/reviews/ReviewStates';
import {
  useRatingSummary,
  useReviewsInfinite,
} from '@/hooks/use-product-queries';

const PAGE_SIZE = 10;

export function ReviewFeed() {
  const summaryQuery = useRatingSummary();
  const reviewsQuery = useReviewsInfinite(PAGE_SIZE);
  const { fetchNextPage, hasNextPage, isFetchingNextPage } = reviewsQuery;

  const reviews =
    reviewsQuery.data?.pages.flatMap((page) => page.data) ?? [];
  const isNextPageError = reviewsQuery.isFetchNextPageError;
  const canLoadMore = Boolean(hasNextPage) && reviews.length > 0;

  const [sentryRef] = useInfiniteScroll({
    loading: isFetchingNextPage,
    hasNextPage: canLoadMore,
    onLoadMore: () => {
      void fetchNextPage();
    },
    disabled: isNextPageError && !isFetchingNextPage,
    rootMargin: '0px 0px 240px 0px',
  });

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

  return (
    <>
      {reviews.length === 0 ? (
        <EmptyReviewsState />
      ) : (
        <>
          <RatingSummary
            average={summaryQuery.data?.averageRating ?? 0}
            totalReviews={summaryQuery.data?.totalReviews ?? 0}
          />
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </>
      )}

      {reviews.length > 0 ? (
        isNextPageError && !isFetchingNextPage ? (
          <InfiniteScrollFooter
            state="error"
            onRetry={() => void fetchNextPage()}
          />
        ) : canLoadMore || isFetchingNextPage ? (
          <div
            ref={sentryRef}
            data-scroll-sentry
            className={isFetchingNextPage ? undefined : 'h-1'}
          >
            {isFetchingNextPage ? <NextPageSpinner /> : null}
          </div>
        ) : (
          <InfiniteScrollFooter state="end" />
        )
      ) : null}

      <div className="pt-2">
        <ReviewForm />
      </div>
    </>
  );
}
