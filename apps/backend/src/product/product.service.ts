import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import type { RatingSummaryResponse } from '../types/RatingSummaryResponse';
import { roundToDecimal } from '../commons/utils/math.utiil';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) { }

  async getProductsRatingSummary(): Promise<RatingSummaryResponse[]> {
    const products = await this.productRepository.getProducts();

    return products.map(product => {
      const totalReviews = product.reviews.length;
      const rawAverage = totalReviews > 0
        ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
        : 0;
      const averageRating = Number(Math.round(Number(rawAverage + 'e1')) + 'e-1');

      return {
        productId: product.id,
        averageRating,
        totalReviews
      };
    });
  }

  // ambil product + agregat rating (AVG & COUNT)
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
