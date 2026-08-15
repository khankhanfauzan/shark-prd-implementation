import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { DatabaseModule } from '../../../../../libs/database/src/lib/database.module';

@Module({
    imports: [DatabaseModule],
    controllers: [ProductController],
    providers: [ProductService],
})
export class ProductModule {}