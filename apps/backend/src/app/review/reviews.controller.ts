import { Controller, Get, Query } from '@nestjs/common';
import { ReviewsService } from './reviews.service';

@Controller('product/reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get()
  getReviews(
    @Query('offset') offset = '0',
    @Query('limit') limit = '10',
  ) {
    return this.reviewsService.getReviews(
      Number(offset),
      Number(limit),
    );
  }
}
