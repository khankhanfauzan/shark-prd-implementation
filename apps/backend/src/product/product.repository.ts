import { Injectable } from "@nestjs/common";

import { PrismaService } from "../../../../libs/database/prisma/prisma.service";
import type { RatingSummaryResponse } from "../types/RatingSummaryResponse";


@Injectable()
export class ProductRepository {
  constructor(private prisma: PrismaService) {}

  async getProducts() {
    const result = await this.prisma.product.findMany({
      include: {
        reviews: {
          select: {
            rating: true
          }
        }
      }
    });

    return result;
  }
}
