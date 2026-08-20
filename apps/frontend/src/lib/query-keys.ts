export const queryKeys = {
  products: ['products'] as const,
  ratingSummary: ['rating-summary'] as const,
  reviews: ['reviews'] as const,
  reviewsInfinite: (limit: number) => ['reviews', 'infinite', limit] as const,
};
