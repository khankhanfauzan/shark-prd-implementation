import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { RatingSummaryDto } from './dto/rating-summary.dto';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Get('rating-summary')
  @ApiOperation({ summary: 'Get product rating summary' })
  @ApiResponse({ 
    status: 200, 
    description: 'Product rating summary retrieved successfully',
    type: RatingSummaryDto
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Product not found' 
  })
  async getProductsRatingSummary() {
    return this.productService.getRatingSummary();
  }
}
