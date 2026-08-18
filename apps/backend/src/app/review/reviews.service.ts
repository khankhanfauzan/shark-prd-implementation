import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../libs/database/prisma/prisma.service';

@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService) {}

  async getReviews(offset: number, limit: number) {
    const currentOffset = Number.isFinite(offset)
      ? Math.max(Math.trunc(offset), 0)
      : 0;
    const currentLimit = Number.isFinite(limit)
      ? Math.max(Math.trunc(limit), 1)
      : 10;

    const [reviews, totalItems] = await Promise.all([
      this.prisma.review.findMany({
        skip: currentOffset,
        take: currentLimit,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.review.count(),
    ]);

    const totalPages = Math.ceil(totalItems / currentLimit);
    const currentPage = Math.floor(currentOffset / currentLimit) + 1;

    const data = reviews.map((review) => ({
      id: review.id,
      userName: review.name,
      rating: review.rating,
      comment: review.comment,
      createdAt: review.createdAt.toISOString(),
    }));

    return {
      data,
      pagination: {
        offset: currentOffset,
        limit: currentLimit,
        current_page: currentPage,
        total_items: totalItems,
        total_pages: totalPages,
        has_more: currentOffset + data.length < totalItems,
      },
    };
  }
}
