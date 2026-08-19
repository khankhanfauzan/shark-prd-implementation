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

  async findAll(offset: number, limit: number) {
    const product = await this.reviewRepository.findFirstProduct();

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const currentOffset = Number.isFinite(offset)
      ? Math.max(Math.trunc(offset), 0)
      : 0;
    const currentLimit = Number.isFinite(limit)
      ? Math.min(Math.max(Math.trunc(limit), 1), MAX_LIMIT)
      : DEFAULT_LIMIT;

    const [reviews, totalItems] = await Promise.all([
      this.reviewRepository.findManyByProductId(
        product.id,
        currentOffset,
        currentLimit,
      ),
      this.reviewRepository.countByProductId(product.id),
    ]);

    const totalPages = Math.ceil(totalItems / currentLimit);
    const currentPage = Math.floor(currentOffset / currentLimit) + 1;

    return {
      data: reviews.map((review) => ({
        id: review.id,
        name: review.name,
        rating: review.rating,
        comment: review.comment,
        createdAt: review.createdAt,
      })),
      pagination: {
        offset: currentOffset,
        limit: currentLimit,
        currentPage,
        totalItems,
        totalPages,
        hasMore: currentOffset + reviews.length < totalItems,
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
