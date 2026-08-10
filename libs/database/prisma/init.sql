-- libs/database/prisma/init.sql

-- 1. Buat database jika belum ada
CREATE DATABASE shark_db;

-- 2. Atur owner database ke user 'postgres'
ALTER DATABASE shark_db OWNER TO postgres;

-- 3. Berikan hak akses penuh ke user 'postgres'
GRANT ALL PRIVILEGES ON DATABASE shark_db TO postgres;

-- 4. Pastikan schema public dimiliki oleh 'postgres' (Mencegah error permission P1010 di PostgreSQL 15+)
\connect shark_db;
GRANT ALL ON SCHEMA public TO postgres;
ALTER SCHEMA public OWNER TO postgres;