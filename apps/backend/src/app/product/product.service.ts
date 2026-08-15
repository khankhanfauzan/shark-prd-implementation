import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../libs/database/src/lib/prisma.service';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.product.findMany({
      include: {
        reviews: true,
      },
    });
  }
}