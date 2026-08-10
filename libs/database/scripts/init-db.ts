// libs/database/scripts/init-db.ts
import { Client } from 'pg';
import 'dotenv/config';

async function initDb() {
    const dbUrl = process.env['DATABASE_URL'];
    if (!dbUrl) {
        console.error('❌ DATABASE_URL tidak ditemukan di .env');
        process.exit(1);
    }

    // Ambil nama DB target dari DATABASE_URL (misal: shark_db)
    const urlObj = new URL(dbUrl);
    const targetDbName = urlObj.pathname.replace('/', '') || 'shark_db';

    // Koneksi sementara ke database default 'postgres'
    urlObj.pathname = '/postgres';

    const client = new Client({ connectionString: urlObj.toString() });

    try {
        await client.connect();

        // Cek apakah database sudah ada
        const res = await client.query(
            `SELECT 1 FROM pg_database WHERE datname = $1`,
            [targetDbName]
        );

        if (res.rowCount === 0) {
            console.log(`🔨 Database "${targetDbName}" belum ada. Membuat database...`);
            await client.query(`CREATE DATABASE "${targetDbName}"`);
            console.log(`✅ Database "${targetDbName}" berhasil dibuat!`);
        } else {
            console.log(`ℹ️ Database "${targetDbName}" sudah ada.`);
        }
    } catch (error) {
        console.error('❌ Gagal membuat database:', error);
    } finally {
        await client.end();
    }
}

initDb();