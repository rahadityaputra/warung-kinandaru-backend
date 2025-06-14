# Local Environment Setup

Ikuti langkah-langkah berikut untuk menyiapkan dan menjalankan proyek di mesin lokal Anda.

---

## 🧬 Clone the Repository

```bash
git clone https://github.com/rahadityaputra/warung-kinandaru-backend.git
cd warung-kinandaru-backend
```

---

## 📦 Install Dependencies

Instal semua dependensi proyek:

```bash
npm install
```

---

## ⚙️ Configure Environment Variables (.env)

Buat file `.env` di direktori root proyek (`warung-kinandaru-backend/.env`) dan isi dengan konfigurasi berikut. Gantilah nilai placeholder sesuai dengan informasi Anda:

```env
PORT=5000
```

---

## 🚀 Running the Application

### Development Mode

Gunakan `ts-node-dev` untuk menjalankan aplikasi dalam mode pengembangan dengan hot-reloading (server akan restart otomatis saat ada perubahan kode):

```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:5000` (atau port lain sesuai yang Anda tentukan di `.env`).

---

## 📚 API Documentation (Swagger UI)

Setelah aplikasi berjalan (baik dalam mode development atau production), Anda dapat mengakses dokumentasi API interaktif melalui Swagger UI di browser Anda:

**Buka:**  
[http://localhost:5000/api-docs](http://localhost:5000/api-docs)

Dokumentasi ini akan menampilkan semua endpoint yang tersedia, model data, parameter yang dibutuhkan, dan contoh respons. Anda juga bisa langsung mencoba mengirim permintaan API melalui antarmuka Swagger UI.

---
