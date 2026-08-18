import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ReviewResponseDto } from './dto/review-response.dto';

@ApiTags('Reviews')
@Controller('product/reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Submit a new product review' })
  @ApiResponse({
    status: 201,
    description: 'Review successfully created',
    type: ReviewResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Validation failed (invalid rating, missing name, etc.)',
  })
  @ApiResponse({
    status: 404,
    description: 'Product not found',
  })
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewService.create(createReviewDto);
  }

  @Get()
  findAll() {
    return this.reviewService.findAll();
  }
}
