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
            images: [
                "https://cdn.shopify.com/s/files/1/0672/3806/8470/files/2_2de19f16-bf00-497e-993b-f5c41e95d530.jpg?v=1723706163",
                "https://cdn.shopify.com/s/files/1/0672/3806/8470/files/3_c4bdba82-a673-4664-b654-7ed8466425c9.jpg?v=1723706163",
                "https://cdn.shopify.com/s/files/1/0672/3806/8470/files/1596716161_img_1398653.jpg?v=1723706165",
                "https://cdn.shopify.com/s/files/1/0672/3806/8470/files/1_c159146b-561b-41de-8f56-39ee08404433.jpg?v=1752488734"
            ],
            price: 199.99,
            reviews: {
                create: [
                    {
                        name: 'Alex Johnson',
                        rating: 5,
                        comment: 'Amazing sound quality and the active noise cancellation works exceptionally well on flights.'
                    },
                    {
                        name: 'Sarah Smith',
                        rating: 4,
                        comment: 'Great headphones overall, but feels slightly tight on the ears after long hours.'
                    },
                    {
                        name: 'Michael Brown',
                        rating: 3
                    },
                    {
                        name: 'Emma Wilson',
                        rating: 5,
                        comment: 'The sound is crisp and immersive, and the battery easily lasts through my workday. Very comfortable for everyday use.'
                    },
                    {
                        name: 'Daniel Lee',
                        rating: 4,
                        comment: 'Excellent noise cancellation and impressive battery life. The headphones are a little bulky, but the overall performance is great.'
                    },
                    {
                        name: 'Olivia Martin',
                        rating: 5,
                        comment: 'The noise cancellation is fantastic. I use these every day while working in a busy office.'
                    },
                    {
                        name: 'James Anderson',
                        rating: 4,
                        comment: 'Great overall headphones with clear vocals and good bass. The ear cushions could be a bit softer.'
                    },
                    {
                        name: 'Sophia Taylor',
                        rating: 5,
                        comment: 'I bought these mainly for traveling and they have been excellent on long flights. The cabin noise almost completely disappears.'
                    },
                    {
                        name: 'Noah Harris',
                        rating: 3,
                        comment: 'The sound quality is good, but the headphones feel a little heavy after wearing them for several hours.'
                    },
                    {
                        name: 'Ava Thompson',
                        rating: 5,
                        comment: 'Amazing headphones. The connection is stable, the controls are easy to use, and the sound is excellent.'
                    },
                    {
                        name: 'William Clark',
                        rating: 4,
                        comment: 'Very good headphones for the price. Battery life is reliable and the noise cancellation works well.'
                    },
                    {
                        name: 'Mia Walker',
                        rating: 5,
                        comment: 'The soundstage is impressive and the headphones are perfect for listening to music at home.'
                    },
                    {
                        name: 'Benjamin Hall',
                        rating: 4,
                        comment: 'Comfortable enough for daily use and the microphone quality is better than I expected.'
                    },
                    {
                        name: 'Charlotte Young',
                        rating: 5,
                        comment: 'I love these headphones. The ANC is especially useful when commuting on trains and buses.'
                    },
                    {
                        name: 'Lucas King',
                        rating: 3,
                        comment: 'Good audio and battery life, but I expected the noise cancellation to be slightly stronger.'
                    },
                    {
                        name: 'Amelia Wright',
                        rating: 5,
                        comment: 'Fantastic purchase. The battery lasts for days with moderate use and the headphones pair instantly with my phone.'
                    },
                    {
                        name: 'Henry Scott',
                        rating: 4,
                        comment: 'Solid headphones with excellent sound quality. They are slightly tight around my ears, but otherwise great.'
                    },
                    {
                        name: 'Harper Adams',
                        rating: 5,
                        comment: 'These are easily the best headphones I have owned. Music sounds detailed and the ANC is excellent.'
                    },
                    {
                        name: 'Alexander Baker',
                        rating: 4,
                        comment: 'Very impressive sound and a premium build. The carrying case is also a nice addition.'
                    },
                    {
                        name: 'Evelyn Nelson',
                        rating: 5,
                        comment: 'Perfect for studying. The noise cancellation helps me focus even when there are people talking nearby.'
                    },
                    {
                        name: 'Michael Turner',
                        rating: 2,
                        comment: 'The sound quality is decent, but the fit was uncomfortable for me and the headphones became painful after an hour.'
                    },
                    {
                        name: 'Elizabeth Perez',
                        rating: 4,
                        comment: 'Great headphones for working from home. The microphone picks up my voice clearly during calls.'
                    },
                    {
                        name: 'Daniel Morgan',
                        rating: 5,
                        comment: 'Excellent product. The ANC is powerful and the battery life is exactly what I needed for frequent travel.'
                    },
                    {
                        name: 'Grace Roberts',
                        rating: 4,
                        comment: 'Really good headphones with balanced sound. I just wish the physical buttons were a little easier to find.'
                    },
                    {
                        name: 'Christopher Evans',
                        rating: 3,
                        comment: 'Good headphones overall, although the bass is a little weaker than I prefer.'
                    },
                    {
                        name: 'Lily Mitchell',
                        rating: 5,
                        comment: 'Absolutely love them. They are comfortable, sound great, and the battery has been very reliable.'
                    },
                    {
                        name: 'Matthew Carter',
                        rating: 4,
                        comment: 'The headphones perform very well for movies and music. Bluetooth connection has been stable so far.'
                    },
                    {
                        name: 'Sofia Richardson',
                        rating: 5,
                        comment: 'The ANC makes a huge difference during my daily commute. Sound quality is also excellent.'
                    },
                    {
                        name: 'Joseph Phillips',
                        rating: 3,
                        comment: 'The headphones sound good and the battery is strong, but they are not as comfortable as I expected.'
                    },
                    {
                        name: 'Chloe Campbell',
                        rating: 4,
                        comment: 'Very nice headphones. The sound is clear and the noise cancellation works especially well with low background noise.'
                    },
                    {
                        name: 'Andrew Parker',
                        rating: 5,
                        comment: 'Fantastic headphones for travel. They block out airplane noise extremely well and remain comfortable for long periods.'
                    }
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