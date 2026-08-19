import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateReviewDto } from './dto/create-review.dto';
import { PaginatedReviewQueryDto } from './dto/paginated-review-query.dto';
import { ReviewResponseDto } from './dto/review-response.dto';
import { ReviewService } from './review.service';

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
  @ApiOperation({ summary: 'Get paginated product reviews' })
  @ApiQuery({
    name: 'offset',
    required: false,
    type: Number,
    description: 'Number of items to skip (min: 0)',
    example: 0,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Number of items to return (min: 1, max: 50)',
    example: 10,
  })
  @ApiResponse({
    status: 200,
    description: 'Product reviews retrieved successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Validation failed (invalid offset/limit)',
  })
  @ApiResponse({
    status: 404,
    description: 'Product not found',
  })
  findAll(@Query() query: PaginatedReviewQueryDto) {
    return this.reviewService.findAll(query.offset ?? 0, query.limit ?? 10);
  }
}
