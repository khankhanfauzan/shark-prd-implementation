import type {
  CreateReviewInput,
  PaginatedReviews,
  Product,
  RatingSummary,
  Review,
} from './types';

const API_BASE = `${
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001'
}/api/v1`;

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      Accept: 'application/json',
      ...(init?.body ? { 'Content-Type': 'application/json' } : {}),
      ...init?.headers,
    },
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    const rawMessage = payload?.message;
    const message = Array.isArray(rawMessage)
      ? rawMessage.join(', ')
      : rawMessage || `Request failed (${response.status})`;
    throw new Error(message);
  }

  return payload as T;
}

export function getProducts() {
  return apiFetch<Product[]>('/product');
}

export function getRatingSummary() {
  return apiFetch<RatingSummary>('/product/rating-summary');
}

export function getReviews(offset = 0, limit = 10) {
  const params = new URLSearchParams({
    offset: String(offset),
    limit: String(limit),
  });
  return apiFetch<PaginatedReviews>(`/product/reviews?${params.toString()}`);
}

export function createReview(input: CreateReviewInput) {
  return apiFetch<Review>('/product/reviews', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}
