import { Injectable, NotFoundException } from '@nestjs/common';
import { roundToDecimal } from '../../common/utils/math.util';
import type { RatingSummaryResponse } from './interfaces/rating-summary-response.interface';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
    constructor(private readonly productRepository: ProductRepository) { }

    async findAll() {
        return this.productRepository.findAll();
    }

    async getRatingSummary(): Promise<RatingSummaryResponse> {
        const data = await this.productRepository.getProductWithSummary();

        if (!data) {
            throw new NotFoundException('Product not found');
        }

        return {
            productId: data.product.id,
            averageRating: roundToDecimal(data.averageRating),
            totalReviews: data.totalReview,
        };
    }
}
