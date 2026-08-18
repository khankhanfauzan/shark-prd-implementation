import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RatingSummaryDto } from './dto/rating-summary.dto';
import { ProductService } from './product.service';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @ApiOperation({ summary: 'Get products' })
  @ApiResponse({
    status: 200,
    description: 'Products retrieved successfully',
  })
  findAll() {
    return this.productService.findAll();
  }

  @Get('rating-summary')
  @ApiOperation({ summary: 'Get product rating summary' })
  @ApiResponse({
    status: 200,
    description: 'Product rating summary retrieved successfully',
    type: RatingSummaryDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Product not found',
  })
  async getProductsRatingSummary() {
    return this.productService.getRatingSummary();
  }
}
