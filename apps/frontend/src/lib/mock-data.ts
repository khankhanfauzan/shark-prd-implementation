import type { ReviewItem } from '@/components/mock/ReviewCard';

/** Dummy data untuk mockup FE — diganti API nanti */
export const MOCK_PRODUCT = {
  id: 'demo',
  name: 'Wireless Noise-Canceling Headphones',
  description:
    'Premium over-ear headphones dengan active noise cancellation dan baterai hingga 30 jam.',
  price: 299.99,
  averageRating: 4.2,
  totalReviews: 15,
};

export const MOCK_REVIEWS: ReviewItem[] = [
  {
    id: 'r1',
    userName: 'Alex Johnson',
    rating: 5,
    comment:
      'Amazing sound quality and the active noise cancellation works exceptionally well on flights.',
    createdAt: '20 Jan 2026',
  },
  {
    id: 'r2',
    userName: 'Sarah Smith',
    rating: 4,
    comment:
      'Great headphones overall, but feels slightly tight on the ears after long hours.',
    createdAt: '25 Jan 2026',
  },
  {
    id: 'r3',
    userName: 'Michael Brown',
    rating: 3,
    comment: null,
    createdAt: '2 Feb 2026',
  },
  {
    id: 'r4',
    userName: 'John D.',
    rating: 5,
    comment: 'Bahan bagus sekali, nyaman dipakai seharian.',
    createdAt: '10 Aug 2026',
  },
  {
    id: 'r5',
    userName: 'Rina Putri',
    rating: 4,
    comment: 'Suara jernih, noise cancel cukup oke untuk kantor.',
    createdAt: '8 Aug 2026',
  },
];
