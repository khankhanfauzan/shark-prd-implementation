'use client';

import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import {
  createReview,
  getProducts,
  getRatingSummary,
  getReviews,
} from '@/lib/api';
import { queryKeys } from '@/lib/query-keys';
import type { CreateReviewInput } from '@/lib/types';

const PAGE_LIMIT = 10;

export function useProducts() {
  return useQuery({
    queryKey: queryKeys.products,
    queryFn: getProducts,
  });
}

export function useRatingSummary() {
  return useQuery({
    queryKey: queryKeys.ratingSummary,
    queryFn: getRatingSummary,
  });
}

export function useReviewsInfinite(limit = PAGE_LIMIT) {
  return useInfiniteQuery({
    queryKey: queryKeys.reviewsInfinite(limit),
    queryFn: ({ pageParam }) => getReviews(pageParam, limit),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.pagination.hasMore
        ? lastPage.pagination.offset + lastPage.pagination.limit
        : undefined,
  });
}

export function useCreateReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateReviewInput) => createReview(input),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: queryKeys.reviews }),
        queryClient.invalidateQueries({ queryKey: queryKeys.ratingSummary }),
        queryClient.invalidateQueries({ queryKey: queryKeys.products }),
      ]);
    },
  });
}
