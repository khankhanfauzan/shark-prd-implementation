# 🦈 Shark PRD Implementation - Nx Monorepo

Monorepo berbasis **Nx Workspace** yang mengintegrasikan aplikasi **Frontend (Next.js)** dan **Backend (NestJS)** dalam satu ekosistem pengembangan, dengan modul database terisolasi berbasis **Prisma ORM v7** dan **PostgreSQL**.

---

## 🛠️ Tech Stack & Prasyarat Sistem

Sebelum memulai pengembangan, pastikan perangkat Anda telah terinstal:

- **Node.js**: versi `>= 18.x` (direkomendasikan LTS)
- **Package Manager**: `npm`
- **PostgreSQL**: Service berjalan di `localhost:5432`
- **DBeaver** / SQL Client (Opsional)
- **Git**

---

## 🔌 Ekstensi VSCode (Sangat Direkomendasikan)

Untuk pengalaman pengembangan terbaik dan eksekusi target 1-Click:

1. [**Nx Console**](https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console)  
   _Ekstensi resmi Nx untuk menjalankan target, generator, dan memvisualisasikan grafik proyek secara visual (termasuk fitur 1-Click Database Setup)._
2. [**Prisma Extension**](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma)  
   _Highlight sintaks dan auto-complete untuk skema `.prisma`._

---

## ⚙️ Panduan Instalasi & Setup Aplikasi

### Langkah 1: Clone Repository

```bash
git clone https://github.com/khankhanfauzan/shark-prd-implementation.git
cd shark-prd-implementation
```

### Langkah 2: Instalasi Nx CLI Secara Global (Opsional)

```bash
npm install -g nx
```

> **Catatan**: Jika tidak menginstalnya secara global, gunakan perintah `npx nx` di setiap target.

### Langkah 3: Install Dependencies

```bash
npm install
```

---

## 🗄️ Setup Database & Environment

### Langkah 4: Konfigurasi Environment File (`.env`)

File `.env` **harus berada di root folder project** dan **tidak boleh di-commit ke Git** (sudah masuk `.gitignore`).

Salin file `.env.example` sebagai titik awal:

```bash
cp .env.example .env
```

Kemudian buka file `.env` dan sesuaikan `DATABASE_URL` dengan akun PostgreSQL lokal Anda:

```env
DATABASE_URL="postgresql://YOUR_PG_USERNAME@127.0.0.1:5432/shark_db?schema=public"
```

Untuk mengetahui username PostgreSQL Anda, jalankan di terminal:

```bash
# Mac / Linux
whoami

# Windows
echo %USERNAME%
```

---

> ### ⚠️ Format `DATABASE_URL` yang Benar
>
> Perhatikan format koneksi PostgreSQL berdasarkan kondisi akun Anda:
>
> **Jika akun PostgreSQL Anda TIDAK memiliki password** (paling umum di setup lokal Mac/Linux):
>
> ```env
> DATABASE_URL="postgresql://username@127.0.0.1:5432/shark_db?schema=public"
> ```
>
> **Jika akun PostgreSQL Anda MEMILIKI password:**
>
> ```env
> DATABASE_URL="postgresql://postgres:mypassword@127.0.0.1:5432/shark_db?schema=public"
> ```
>
> ❌ **JANGAN** tambahkan tanda titik dua (`:`) setelah username jika tidak ada password, karena akan menyebabkan error koneksi:
>
> ```env
> # SALAH — akan error "role does not exist" atau "password authentication failed"
> DATABASE_URL="postgresql://username:@127.0.0.1:5432/shark_db?schema=public"
> ```
>
> ---
>
> 💡 **`127.0.0.1` vs `localhost`**
>
> Gunakan `127.0.0.1` (bukan `localhost`) sebagai host. Keduanya mengarah ke mesin yang sama, tetapi perilakunya berbeda:
>
> | Host | Protokol | Keterangan |
> |---|---|---|
> | `127.0.0.1` | **TCP/IP** | Selalu koneksi via jaringan. Konsisten di semua OS. ✅ |
> | `localhost` | **Unix Socket*** | Di Mac/Linux, PostgreSQL bisa menggunakan socket lokal yang bergantung pada konfigurasi `pg_hba.conf`. ⚠️ |
>
> Menggunakan `127.0.0.1` lebih aman dan konsisten, terutama saat project dikerjakan bersama di OS yang berbeda-beda.

---


### Langkah 5: Menjalankan Automated Database Setup (1-Click / CLI)

Project ini telah dilengkapi **Auto-Database Creation Script**. Anda **tidak perlu** membuat database `shark_db` secara manual di DBeaver/psql. Script akan mendeteksi dan membuat database otomatis jika belum tersedia.

Pilih salah satu cara berikut:

#### Opsi A: Menggunakan Nx Console Extension (1-Click UI — **Direkomendasikan**)

1. Buka sidebar **Nx Console** di VSCode / Cursor (ikon logo Nx).
2. Di panel **Projects**, _expand_ folder **`database`**.
3. Cari target **`db-setup`**.
4. Klik tombol **Run / Play ▶** di samping `db-setup`.

#### Opsi B: Menggunakan Terminal CLI

Jalankan satu perintah berikut dari direktori root:

```bash
npx nx db-setup database
```

> **Apa yang dilakukan oleh `db-setup` secara berurutan?**
>
> 1. **`init-db`**: Mengecek & membuat database `shark_db` di PostgreSQL secara otomatis.
> 2. **`db-migrate`**: Menjalankan migrasi skema Prisma ke database.
> 3. **`db-generate`**: Meng-generate tipe data `@prisma/client` terbaru.
> 4. **`db-seed`**: Menyuntikkan data _seed_ (dummy) awal ke database.

---

## 🚀 Cara Menjalankan Aplikasi (Frontend & Backend)

### Opsi A: Menggunakan VSCode Extension (Nx Console) — **Direkomendasikan**

1. Buka sidebar **Nx Console** di VSCode.
2. Masuk ke menu **Projects** > pilih project **Frontend**.
3. Cari dan klik target **`serve-with-backend`**.
4. Klik tombol **Run / Play ▶**.
   _Backend dan Frontend akan otomatis berjalan bersamaan di terminal interaktif._

### Opsi B: Menggunakan Terminal (CLI)

```bash
# Menjalankan Frontend & Backend sekaligus
nx run frontend:serve-with-backend

# ATAU menjalankan masing-masing service di terminal terpisah:
nx serve backend
nx serve frontend
```

---

## 📋 Daftar Perintah Database (Nx Targets)

Daftar perintah pengelola database yang dapat dijalankan via **Nx Console** (Ikon Play ▶) atau Terminal:

| Target Name       | Command CLI               | Deskripsi                                                               |
| ----------------- | ------------------------- | ----------------------------------------------------------------------- |
| **`db-setup`**    | `nx db-setup database`    | **Full Setup:** Auto Create DB + Migrate + Generate Client + Seed Data. |
| **`db-migrate`**  | `nx db-migrate database`  | Memuat perubahan skema ke database (`prisma migrate dev`).              |
| **`db-generate`** | `nx db-generate database` | Meng-update tipe `@prisma/client` setelah skema diubah.                 |
| **`db-seed`**     | `nx db-seed database`     | Menjalankan script pembentukan data dummy (`seed.ts`).                  |
| **`db-studio`**   | `nx db-studio database`   | Membuka GUI Prisma Studio di browser (`http://localhost:5555`).         |

---

## 📂 Manual SQL Reference (DBeaver / `psql`)

Jika Anda ingin menjalankan atau mereset database secara manual melalui DBeaver atau `psql`, script SQL resmi telah disediakan di **`libs/database/prisma/init.sql`**:

```sql
-- libs/database/prisma/init.sql
CREATE DATABASE shark_db;
ALTER DATABASE shark_db OWNER TO postgres;
GRANT ALL PRIVILEGES ON DATABASE shark_db TO postgres;
```

---

## 📁 Struktur Folder Utama Workspace

```text
shark-prd-implementation/
├── apps/
│   ├── frontend/          # Aplikasi Next.js
│   └── backend/           # Aplikasi NestJS
├── libs/
│   └── database/          # Shared Library Prisma & DB Configuration
│       ├── prisma/
│       │   ├── schema.prisma # Skema tabel database
│       │   ├── seed.ts       # Script data dummy
│       │   ├── init.sql      # Referensi manual SQL setup
│       │   └── migrations/   # History migrasi SQL
│       ├── scripts/
│       │   └── init-db.ts    # Script otomatis pembuatan database PostgreSQL
│       ├── src/              # PrismaService & Export Library
│       ├── prisma.config.ts  # Konfigurasi Prisma v7
│       └── project.json      # Registrasi Target Nx Database
├── .env                   # ⚠️ File ini TIDAK di-commit (ada di .gitignore)
├── .env.example           # Template variabel lingkungan — SALIN ini ke .env
├── nx.json                # Konfigurasi workspace Nx
└── package.json           # Dependencies root workspace
```

---

## 🔍 Perintah Nx Lain yang Berguna

```bash
# Melihat grafik dependensi seluruh aplikasi & library
nx graph

# Melakukan build pada semua project
nx run-many --target=build --all

# Melakukan linting pada project tertentu
nx lint frontend
nx lint backend

# Menjalankan unit test
nx test frontend
nx test backend
```

---

## ❓ Troubleshooting Umum

### Error: `role "username" does not exist`

Ini terjadi karena `DATABASE_URL` menggunakan username yang tidak ada di PostgreSQL lokal Anda, **atau** terdapat file `.env` "siluman" di dalam folder `apps/backend/` yang menimpa konfigurasi root Anda (ini adalah sisa dari perintah `prisma init` yang dijalankan di dalam folder backend).

**Solusi:**

1. Pastikan Anda sudah membuat file `.env` di **root folder** dengan username yang benar.
2. Pastikan **tidak ada** file `.env` di dalam `apps/backend/`. Hapus jika ada:
   ```bash
   rm apps/backend/.env
   ```

### Error: `password authentication failed` atau `SASL authentication`

Terjadi jika Anda menambahkan tanda titik dua (`:`) setelah username padahal akun PostgreSQL Anda tidak memiliki password.

**Solusi:** Hapus tanda `:` setelah username di `DATABASE_URL`:

```env
# Ubah dari (SALAH):
DATABASE_URL="postgresql://username:@127.0.0.1:5432/shark_db?schema=public"

# Menjadi (BENAR):
DATABASE_URL="postgresql://username@127.0.0.1:5432/shark_db?schema=public"
```
