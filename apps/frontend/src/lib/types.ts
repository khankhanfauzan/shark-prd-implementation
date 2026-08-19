export type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  images?: string[];
  createdAt: string;
  updatedAt: string;
};

export type Review = {
  id: string;
  name: string;
  rating: number;
  comment: string | null;
  createdAt: string;
};

export type RatingSummary = {
  productId: string;
  averageRating: number;
  totalReviews: number;
};

export type ReviewPagination = {
  offset: number;
  limit: number;
  currentPage: number;
  totalItems: number;
  totalPages: number;
  hasMore: boolean;
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
