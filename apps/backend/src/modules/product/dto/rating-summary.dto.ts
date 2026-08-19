import { ApiProperty } from '@nestjs/swagger';

export class RatingSummaryDto {
    @ApiProperty({
        description: 'Product ID',
        example: '550e8400-e29b-41d4-a716-446655440000',
    })
    productId: string;

    @ApiProperty({
        description: 'Average rating of the product',
        example: 4.5,
        minimum: 0,
        maximum: 5,
    })
    averageRating: number;

    @ApiProperty({
        description: 'Total number of reviews',
        example: 150,
    })
    totalReviews: number;
}
