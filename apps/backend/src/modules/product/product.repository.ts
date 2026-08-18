import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../libs/database/prisma/prisma.service';

@Injectable()
export class ProductRepository {
    constructor(private readonly prisma: PrismaService) { }

    async findAll() {
        return this.prisma.product.findMany({
            include: {
                reviews: true,
            },
        });
    }

    async getProductWithSummary() {
        const product = await this.prisma.product.findFirst();

        if (!product) return null;

        const aggregate = await this.prisma.review.aggregate({
            where: { productId: product.id },
            _avg: { rating: true },
            _count: true,
        });

        return {
            product,
            averageRating: aggregate._avg.rating,
            totalReview: aggregate._count,
        };
    }
}
