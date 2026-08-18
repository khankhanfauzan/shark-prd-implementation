import { IsString, IsNotEmpty, IsInt, Min, Max, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateReviewDto {
    @ApiProperty({
        example: 'Sarah Smith',
        description: 'Name of the user submitting the review',
    })
    @IsString()
    @IsNotEmpty({ message: 'Name is required' })
    name: string;

    @ApiProperty({
        example: 4,
        description: 'Rating value between 1 and 5',
        minimum: 1,
        maximum: 5,
    })
    @IsInt({ message: 'Rating must be an integer' })
    @Min(1, { message: 'Rating must be at least 1' })
    @Max(5, { message: 'Rating must be at most 5' })
    rating: number;

    @ApiPropertyOptional({
        example: 'Great headphones overall, but feels slightly tight on the ears after long hours.',
        description: 'Optional comment/description from the user',
    })
    @IsOptional()
    @IsString()
    comment?: string;
}