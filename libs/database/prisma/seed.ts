import { PrismaClient } from '../generated/prisma';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import 'dotenv/config';

const connectionString = process.env['DATABASE_URL'];

if (!connectionString) {
    throw new Error('DATABASE_URL is not defined in .env');
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('Seeding database...');

    // Membersihkan data lama
    await prisma.review.deleteMany();
    await prisma.product.deleteMany();

    // Tambah dummy product & review
    const product1 = await prisma.product.create({
        data: {
            name: 'Wireless Noise Canceling Headphones',
            description: 'High-quality audio with active noise cancellation.',
            price: 199.99,
            reviews: {
                create: [
                    { name: 'John Doe', rating: 5, comment: 'Sangat bagus, suara jernih!' },
                    { name: 'Jane Doe', rating: 4, comment: 'Bagus tapi baterai agak cepat habis.' },
                ],
            },
        },
    });

    console.log(`Created product with ID: ${product1.id}`);
    console.log('Seeding completed successfully!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });