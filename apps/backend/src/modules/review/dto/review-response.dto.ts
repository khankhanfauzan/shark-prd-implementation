import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ReviewResponseDto {
    @ApiProperty({ example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' })
    id: string;

    @ApiProperty({ example: 'Sarah Smith' })
    name: string;

    @ApiProperty({ example: 4, minimum: 1, maximum: 5 })
    rating: number;

    @ApiPropertyOptional({
        example: 'Great headphones overall, but feels slightly tight on the ears after long hours.',
        nullable: true,
    })
    comment: string | null;

    @ApiProperty({ example: '2026-08-17T09:15:30.000Z' })
    createdAt: Date;
}