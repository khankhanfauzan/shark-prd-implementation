export type Review = {
  id: string;
  productId?: string;
  name: string;
  rating: number;
  comment: string | null;
  createdAt: string;
};

export type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  images?: string[];
  reviews?: Review[];
  createdAt: string;
  updatedAt: string;
};

export type RatingSummary = {
  productId: string;
  averageRating: number;
  totalReviews: number;
};

export type ReviewPagination = {
  limit: number;
  nextCursor: string | null;
};

export type PaginatedReviews = {
  data: Review[];
  pagination: ReviewPagination;
};

export type CreateReviewInput = {
  name: string;
  rating: number;
  comment?: string;
};
