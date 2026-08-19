# 🚀 Backend Application (NestJS)

Aplikasi backend ini dibangun menggunakan framework **NestJS** dan bertindak sebagai API server untuk aplikasi Shark.

## 🛠️ Modul yang Tersedia

Saat ini, backend memiliki dua modul utama:

### 1. Modul Product

Mengelola data produk dan ringkasan rating.

- **Endpoint**: `/api/product`
- **Tujuan**: Mengambil data produk dasar dan kalkulasi statistik rating.

### 2. Modul Review

Mengelola ulasan produk dari pengguna.

- **Endpoint**: `/api/product/reviews`
- **Tujuan**: Menangani pembuatan ulasan baru dan pengambilan daftar ulasan dengan fitur paginasi.

## 🛡️ Keamanan (Security)

Backend ini telah dilengkapi dengan beberapa fitur keamanan standar industri:

- **Helmet**: Melindungi aplikasi dari berbagai serangan web umum dengan mengatur HTTP headers yang sesuai.
- **Rate Limiting (Throttler)**: Membatasi jumlah request dari satu IP untuk mencegah serangan Brute Force atau DDoS (Default: 100 request per menit).
- **CORS**: Diaktifkan untuk memungkinkan komunikasi aman dengan aplikasi frontend.
- **Global Validation Pipe**: Memastikan semua data yang masuk melalui DTO divalidasi dengan ketat menggunakan `class-validator`.

## 📡 API Endpoints

Semua endpoint API diawali dengan prefix `/api`.

### Product Endpoints

| Method | Endpoint                  | Deskripsi                                                                                     |
| ------ | ------------------------- | --------------------------------------------------------------------------------------------- |
| `GET`  | `/product`                | Mengambil semua daftar produk.                                                                |
| `GET`  | `/product/rating-summary` | Mengambil ringkasan statistik rating produk (rata-rata rating dan jumlah review per bintang). |

### Review Endpoints

| Method | Endpoint           | Deskripsi                                                                            |
| ------ | ------------------ | ------------------------------------------------------------------------------------ |
| `POST` | `/product/reviews` | Membuat ulasan produk baru. Memerlukan `productId`, `name`, `rating`, dan `comment`. |
| `GET`  | `/product/reviews` | Mengambil daftar ulasan produk dengan paginasi.                                      |

**Query Parameters (Review GET):**

- `offset`: (Opsional) Jumlah data yang dilewati (default: 0).
- `limit`: (Opsional) Jumlah data yang diambil (default: 10).

## 📄 Dokumentasi Swagger

Proyek ini telah dikonfigurasi dengan Swagger untuk memudahkan pengujian API secara interaktif.

1. Jalankan aplikasi backend: `nx serve backend`.
2. Buka browser dan akses: `http://localhost:3000/api/docs`.

## 🧪 Pengujian

Untuk menjalankan unit test khusus modul backend:

```bash
nx test backend
```
