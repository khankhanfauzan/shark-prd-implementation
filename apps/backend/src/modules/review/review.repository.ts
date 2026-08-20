import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../libs/database/prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewRepository {
  constructor(private readonly prisma: PrismaService) { }

  async findFirstProduct() {
    return this.prisma.product.findFirst();
  }

  async create(createReviewDto: CreateReviewDto, productId: string) {
    return this.prisma.review.create({
      data: {
        name: createReviewDto.name,
        rating: createReviewDto.rating,
        comment: createReviewDto.comment ?? null,
        product: {
          connect: { id: productId },
        },
      },
    });
  }

  async findManyByProductId(productId: string, cursor: string | undefined, limit: number) {
    return this.prisma.review.findMany({
      where: { productId },
      take: limit,
      ...(cursor && {
        cursor: { id: cursor },
        skip: 1,
      }),
      orderBy: [
        { createdAt: 'desc' },
        { id: 'desc' },
      ],
    });
  }

  async countByProductId(productId: string) {
    return this.prisma.review.count({
      where: { productId },
    });
  }
}
