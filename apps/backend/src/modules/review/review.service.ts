import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ReviewRepository } from './review.repository';

const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 50;

@Injectable()
export class ReviewService {
  constructor(private readonly reviewRepository: ReviewRepository) { }

  async create(createReviewDto: CreateReviewDto) {
    const product = await this.reviewRepository.findFirstProduct();

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const review = await this.reviewRepository.create(createReviewDto, product.id);

    return {
      id: review.id,
      name: review.name,
      rating: review.rating,
      comment: review.comment,
      createdAt: review.createdAt,
    };
  }

  async findAll(cursor: string | undefined, limit: number) {
    const product = await this.reviewRepository.findFirstProduct();

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const currentLimit = Number.isFinite(limit)
      ? Math.min(Math.max(Math.trunc(limit), 1), MAX_LIMIT)
      : DEFAULT_LIMIT;

    const reviews = await this.reviewRepository.findManyByProductId(
      product.id,
      cursor,
      currentLimit,
    );

    const nextCursor = reviews.length === currentLimit
      ? reviews[reviews.length - 1]?.id
      : null;

    return {
      data: reviews.map((review) => ({
        id: review.id,
        name: review.name,
        rating: review.rating,
        comment: review.comment,
        createdAt: review.createdAt,
      })),
      pagination: {
        limit: currentLimit,
        nextCursor,
      },
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} review`;
  }

  update(id: number, _updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  remove(id: number) {
    return `This action removes a #${id} review`;
  }
}
