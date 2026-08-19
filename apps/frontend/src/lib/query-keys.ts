export const queryKeys = {
  products: ['products'] as const,
  ratingSummary: ['rating-summary'] as const,
  reviews: ['reviews'] as const,
  reviewsPreview: (limit: number) => ['reviews', 'preview', limit] as const,
  reviewsInfinite: (limit: number) => ['reviews', 'infinite', limit] as const,
};
