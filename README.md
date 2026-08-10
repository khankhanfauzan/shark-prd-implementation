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

### 1. Clone Repository

```bash
git clone [https://github.com/khankhanfauzan/shark-prd-implementation.git](https://github.com/khankhanfauzan/shark-prd-implementation.git)
cd shark-prd-implementation

```

### 2. Instalasi Nx CLI Secara Global (Opsional)

```bash
npm install -g nx

```

> **Catatan**: Jika tidak menginstalnya secara global, gunakan perintah `npx nx` di setiap target.

### 3. Install Dependencies

```bash
npm install

```

---

## 🗄️ Setup Database & Environment (Automated)

### Langkah 1: Konfigurasi Environment File (`.env`)

Duplikat file `.env.example` yang tersedia di root project menjadi `.env`:

```bash
cp .env.example .env

```

Buka file `.env` di root project dan sesuaikan kredensial PostgreSQL lokal Anda:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/shark_db?schema=public"

```

> **Catatan:** Sesuaikan `postgres` dan `password` dengan username & password PostgreSQL lokal Anda.

---

### Langkah 2: Menjalankan Automated Database Setup (1-Click / CLI)

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
│       ├── tsconfig.lib.json # Konfigurasi TypeScript Library
│       ├── prisma.config.ts  # Konfigurasi Prisma v7
│       └── project.json      # Registrasi Target Nx Database
├── .env.example           # Template variabel lingkungan
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
