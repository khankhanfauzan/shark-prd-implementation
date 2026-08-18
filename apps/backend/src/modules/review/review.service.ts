import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { PrismaService } from '../../../../../libs/database/prisma/prisma.service';
import { ReviewRepository } from './review.repository';

@Injectable()
export class ReviewService {
  constructor(private readonly reviewRepository: ReviewRepository) { }

  async create(createReviewDto: CreateReviewDto) {
    const product = await this.reviewRepository.findFirstProduct();

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const review = await this.reviewRepository.create(createReviewDto, product.id);

    // TODO: trigger cache invalidation untuk rating-summary
    // await this.cacheManager.del('rating-summary');

    return {
      id: review.id,
      name: review.name,
      rating: review.rating,
      comment: review.comment,
      createdAt: review.createdAt,
    };
  }

  findAll() {
    return `This action returns all review`;
  }

  findOne(id: number) {
    return `This action returns a #${id} review`;
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  remove(id: number) {
    return `This action removes a #${id} review`;
  }
}
