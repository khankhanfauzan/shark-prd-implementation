import { Module, Global } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service'; // Path menuju prisma.service.ts kamu

@Global() // @Global() membuat PrismaService otomatis bisa dipakai di seluruh backend tanpa import berulang
@Module({
  controllers: [],
  providers: [PrismaService], // Daftarkan PrismaService sebagai provider
  exports: [PrismaService],   // EXPORT PrismaService agar bisa di-inject di apps/backend
})
export class DatabaseModule { }