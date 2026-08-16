import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import type { RatingSummaryResponse } from '../types/RatingSummaryResponse';
import { roundToDecimal } from '../commons/utils/math.utiil';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) { }

  async getRatingSummary(): Promise<RatingSummaryResponse> {
    const data = await this.productRepository.getProductWithSummary();

    if (!data) {
      throw new NotFoundException('Product not found');
    }

    return {
      productId: data.product.id,
      averageRating: roundToDecimal(data.averageRating),
      totalReviews: data.totalReview
    }
  }
}
