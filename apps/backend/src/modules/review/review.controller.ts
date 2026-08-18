import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewResponseDto } from './dto/review-response.dto';
import { ReviewService } from './review.service';

@ApiTags('Reviews')
@Controller('product/reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

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
  @ApiResponse({
    status: 200,
    description: 'Product reviews retrieved successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Product not found',
  })
  findAll(
    @Query('offset') offset = '0',
    @Query('limit') limit = '10',
  ) {
    return this.reviewService.findAll(Number(offset), Number(limit));
  }
}
