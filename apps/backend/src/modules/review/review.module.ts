import { Module } from '@nestjs/common';
import { PrismaService } from '../../../../../libs/database/prisma/prisma.service';
import { ReviewController } from './review.controller';
import { ReviewRepository } from './review.repository';
import { ReviewService } from './review.service';

@Module({
  controllers: [ReviewController],
  providers: [ReviewService, ReviewRepository, PrismaService],
})
export class ReviewModule {}
