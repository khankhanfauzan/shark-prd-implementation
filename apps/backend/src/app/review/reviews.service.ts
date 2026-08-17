import { Injectable } from '@nestjs/common';

@Injectable()
export class ReviewsService {
  private readonly reviews = [
    {
      id: 'rev-01',
      userName: 'John D.',
      rating: 5,
      comment: 'Bahan bagus sekali!',
      createdAt: '2026-08-10',
    },
    {
      id: 'rev-02',
      userName: 'Sarah',
      rating: 4,
      comment: 'Produk bagus.',
      createdAt: '2026-08-11',
    },
    {
      id: 'rev-03',
      userName: 'Michael',
      rating: 3,
      comment: 'Cukup baik.',
      createdAt: '2026-08-12',
    },
    {
      id: 'rev-04',
      userName: 'Andi',
      rating: 5,
      comment: 'Sangat puas.',
      createdAt: '2026-08-13',
    },
    {
      id: 'rev-05',
      userName: 'Budi',
      rating: 4,
      comment: 'Sesuai ekspektasi.',
      createdAt: '2026-08-14',
    },
  ];

  getReviews(page: number, limit: number) {
    const currentPage = Math.max(page, 1);
    const currentLimit = Math.max(limit, 1);

    const totalItems = this.reviews.length;

    const totalPages = Math.ceil(totalItems / currentLimit);

    const startIndex = (currentPage - 1) * currentLimit;
    const endIndex = startIndex + currentLimit;

    const data = this.reviews.slice(startIndex, endIndex);

    const hasMore = currentPage < totalPages;

    return {
      data,
      pagination: {
        currentPage,
        limit: currentLimit,
        totalItems,
        totalPages,
        hasMore,
      },
    };
  }
}