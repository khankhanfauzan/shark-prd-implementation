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
            name: 'Wireless Noise-Canceling Headphones',
            description: 'Premium over-ear headphones with active noise cancellation and up to 30 hours of continuous battery life.',
            images: ["https://cdn.shopify.com/s/files/1/0672/3806/8470/files/2_2de19f16-bf00-497e-993b-f5c41e95d530.jpg?v=1723706163",
                "https://cdn.shopify.com/s/files/1/0672/3806/8470/files/3_c4bdba82-a673-4664-b654-7ed8466425c9.jpg?v=1723706163",
                "https://cdn.shopify.com/s/files/1/0672/3806/8470/files/1596716161_img_1398653.jpg?v=1723706165",
                "https://cdn.shopify.com/s/files/1/0672/3806/8470/files/1_c159146b-561b-41de-8f56-39ee08404433.jpg?v=1752488734"],
            price: 199.99,
            reviews: {
                create: [
                    { name: 'Alex Johnson', rating: 5, comment: 'Amazing sound quality and the active noise cancellation works exceptionally well on flights.' },
                    { name: 'Sarah Smith', rating: 4, comment: 'Great headphones overall, but feels slightly tight on the ears after long hours.' },
                    { name: 'Michael Brown', rating: 3 },
                    { name: 'Emma Wilson', rating: 5, comment: 'The sound is crisp and immersive, and the battery easily lasts through my workday. Very comfortable for everyday use.' },
                    { name: 'Daniel Lee', rating: 4, comment: 'Excellent noise cancellation and impressive battery life. The headphones are a little bulky, but the overall performance is great.' },
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