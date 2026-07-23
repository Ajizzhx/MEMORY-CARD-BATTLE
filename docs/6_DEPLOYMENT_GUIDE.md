# Panduan Deployment ke Internet (Production Deployment Guide)
## Memory Card Battle - Cyberfantasy Edition

Karena game ini dibangun menggunakan **React + Vite** (murni Client-Side Web Application), game ini sangat mudah di-deploy ke internet secara **100% GRATIS**, aman (HTTPS), dan dapat diakses dari mana saja menggunakan HP maupun Laptop.

Berikut adalah 3 metode deployment terbaik dan termudah yang bisa Anda pilih:

---

## 🚀 Metode 1: Netlify (Paling Cepat - Tanpa Perlu GitHub / Drag & Drop)
Metode ini memungkinkan Anda meng-online-kan game **hanya dalam 1 menit** tanpa perlu install apapun tambahan.

### Langkah-langkah:
1. Pastikan folder produksi (`dist`) sudah siap dengan menjalankan perintah di terminal:
   ```bash
   npm run build
   ```
   *File hasil build akan tersimpan otomatis di dalam folder `C:\Users\adovan\Documents\belajar_coding\kartu_ingatan\dist`.*

2. Buka browser dan kunjungi halaman: **[app.netlify.com/drop](https://app.netlify.com/drop)**
3. Tarik (*Drag & Drop*) folder `dist` dari komputer Anda dan lepas di area kotak halaman Netlify tersebut.
4. Selesai! Netlify akan langsung memberikan link URL publik yang aktif (Contoh: `https://kartu-ingatan-cyber.netlify.app`).

---

## ⚡ Metode 2: Vercel (Direkomendasikan untuk Pembaruan Otomatis via GitHub)
Metode ini adalah standar industri. Setiap kali Anda mengubah kode di repository GitHub, web di internet akan otomatis diperbarui.

### Langkah-langkah:
1. Buat Repository baru di **[GitHub](https://github.com/new)** dan push kodingan folder `kartu_ingatan` Anda ke repository tersebut:
   ```bash
   git init
   git add .
   git commit -m "Initial commit Memory Card Battle"
   git branch -M main
   git remote add origin https://github.com/USERNAME/kartu_ingatan.git
   git push -u origin main
   ```
2. Login ke **[Vercel.com](https://vercel.com)** menggunakan akun GitHub Anda.
3. Klik tombol **"Add New"** -> **"Project"**.
4. Pilih repository `kartu_ingatan` dari daftar.
5. Vercel akan otomatis mengenali proyek **Vite**. Klik **"Deploy"**.
6. Dalam waktu ~60 detik, game Anda live di link gratis (Contoh: `https://kartu-ingatan.vercel.app`).

---

## 🌐 Metode 3: GitHub Pages (Gratis di GitHub Repository)
Jika Anda ingin hosting langsung di halaman resmi GitHub (`https://username.github.io/kartu_ingatan`).

### Langkah-langkah:
1. Install package `gh-pages` di terminal:
   ```bash
   npm install gh-pages --save-dev
   ```
2. Tambahkan properti `"homepage"` dan script deploy di `package.json`:
   ```json
   "homepage": "https://username.github.io/kartu_ingatan",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
3. Jalankan perintah deploy:
   ```bash
   npm run deploy
   ```
