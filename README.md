# Shark PRD Implementation

Monorepo berbasis **Nx Workspace** yang mengintegrasikan aplikasi **Frontend (Next.js)** dan **Backend (NestJS)** dalam satu ekosistem pengembangan.

---

## 🛠️ Tech Stack & Prasyarat

Sebelum memulai, pastikan perangkat Anda telah terinstal:

- **Node.js**: versi `>= 18.x` (direkomendasikan LTS)
- **Package Manager**: `npm`, `yarn`, atau `pnpm`
- **Git**

---

## 🔌 Ekstensi VSCode (Sangat Direkomendasikan)

Untuk memberikan pengalaman pengembangan terbaik dan kemudahan menjalankan skrip monorepo, **setiap developer wajib menginstal ekstensi VSCode berikut**:

- [**Nx Console**](https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console)  
  _Ekstensi resmi dari Nx untuk menjalankan target, generator, dan memvisualisasikan grafik ketergantungan project secara langsung dari VSCode UI._

---

## ⚙️ Panduan Instalasi & Setup

### 1. Clone Repository

```bash
git clone [https://github.com/khankhanfauzan/shark-prd-implementation.git](https://github.com/khankhanfauzan/shark-prd-implementation.git)
cd shark-prd-implementation
```

### 2. Instalasi Nx CLI Secara Global (Opsional)

Menginstal Nx CLI secara global memudahkan Anda menjalankan perintah `nx` langsung dari terminal tanpa menggunakan `npx`:

```bash
npm install -g nx

```

> **Catatan**: Jika Anda memilih untuk tidak menginstalnya secara global, Anda bisa menyisipkan `npx` di setiap perintah `nx` (misal: `npx nx run ...`).

### 3. Install Dependencies

Jalankan perintah berikut di direktori utama (root):

```bash
npm install
# atau
pnpm install
# atau
yarn install

```

### 4. Setup Environment Variables

Buat file `.env` di masing-masing direktori project (atau ikuti `.env.example` yang tersedia) untuk mengatur konfigurasi database, API endpoint, dan rahasia aplikasi lainnya.

---

## 🚀 Cara Menjalankan Project

Anda dapat menjalankan Frontend dan Backend secara bersamaan menggunakan skrip yang sudah dikonfigurasi.

### Opsi A: Menggunakan VSCode Extensions (Nx Console) — **Direkomendasikan**

1. Buka sidebar **Nx Console** di VSCode Anda (ikon Nx).
2. Masuk ke menu **Projects** > pilih project **Frontend**.
3. Cari dan klik target **`serve-with-backend`**.
4. Klik tombol **Run**.
   _Perintah ini akan otomatis memicu backend dan frontend berjalan secara bersamaan di terminal interaktif._

### Opsi B: Menggunakan Terminal (CLI)

Jalankan perintah berikut dari direktori root:

```bash
# Menjalankan target serve-with-backend dari frontend
nx run frontend:serve-with-backend

# ATAU menjalankan masing-masing service secara terpisah di terminal terpisah:
nx serve backend
nx serve frontend

```

---

## 📦 Kelola Package & Dependensi di Nx Monorepo

Secara default, Nx menggunakan strategi **Single Version Policy**, di mana sebagian besar dependency pihak ketiga (_third-party packages_) diinstall di level **root `package.json**` agar versi library yang digunakan seragam di seluruh project.

### 1. Menambahkan Package / Library Baru (NPM / PNPM / YARN)

Jalankan instalasi dari root folder seperti biasa:

```bash
# Menambahkan dependency biasa
npm install <package-name>

# Menambahkan devDependency
npm install -D <package-name>

```

### 2. Menambahkan Generator atau Plugin Resmi Nx

Jika Anda membutuhkan generator bawaan Nx (seperti React/Next.js, NestJS, Tailwind, dsb.):

```bash
# Contoh: Menambahkan plugin Next.js / NestJS
nx add @nx/next
nx add @nx/nest

```

### 3. Membuat Komponen / Module Baru Menggunakan Nx CLI

Gunakan flag `--project` untuk mengarahkan file baru ke project spesifik (**frontend** atau **backend**):

```bash
# Contoh: Membuat komponen React baru untuk Frontend
nx g @nx/next:component my-button --project=frontend

# Contoh: Membuat Service baru di NestJS untuk Backend
nx g @nx/nest:service my-service --project=backend

```

_Atau manfaatkan GUI **Nx Console** di VSCode pada menu **Generate** untuk memilih opsi pembuatan komponen secara visual._

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
