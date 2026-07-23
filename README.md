<div align="center">

# 🔮 MEMORY CARD BATTLE
### *Cyberfantasy Edition — 1vs1 RPG Memory Battle & Roguelike Game*

[![Live Demo](https://img.shields.io/badge/PLAY_NOW-LIVE_DEMO-00f0ff?style=for-the-badge&logo=vercel&logoColor=white)](https://memory-card-battle.vercel.app/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Status](https://img.shields.io/badge/Build-Passing-00ff88?style=for-the-badge)](https://memory-card-battle.vercel.app/)

---

<p align="center">
  <b>Gabungan Antara Memory Card Game Klasik, RPG Turn-Based Battle, dan Elemen Roguelike Progression.</b><br>
  Dibalut dalam Desain UI/UX <b>Cyberfantasy</b> yang Mewah, Penuh Animasi 3D Flip, Effek Neon Glow, dan Glassmorphism.
</p>

[🎮 Mainkan Langsung di Vercel](https://memory-card-battle.vercel.app/) •
[📖 Baca Dokumentasi](#-dokumentasi-lengkap-proyek) •
[🚀 Cara Menjalankan Lokal](#-cara-menjalankan-secara-lokal)

</div>

---

## 🌟 Fitur Utama (Core Features)

### ⚔️ 1vs1 Turn-Based Memory Battle
- **Aksi Berbasis Pasangan Kartu:** Mencocokkan 2 kartu akan memicu efek aksi instan (*Attack, Defense, Heal, Buff, Debuff*).
- **Match & Extra Turn:** Berhasil mencocokkan kartu akan memberikan giliran tambahan.
- **HP & Armor System:** Perhitungan HP dinamis lengkap dengan bar pertahanan *Block/Armor* untuk menahan damage musuh.

### 🧠 AI Memory Engine & Difficulty Scaling
- **Kecerdasan Memori AI:** Musuh (AI) memiliki kemampuan merekam kartu yang pernah terbuka.
- **Tingkat Kesulitan Dinamis:**
  - 🟢 **Mudah (35% Akurasi Memori)** — Musuh sering lupa.
  - 🟡 **Sedang (65% Akurasi Memori)** — Musuh cukup cerdas.
  - 🔴 **Tinggi (88% Akurasi Memori)** — Musuh memiliki daya ingat tajam.

### 🛡️ Pity System & Comeback Mechanics
- Jika HP Pemain **< 50%** dan mengalami 3 *mismatch* berturut-turut, **Pity System Active** akan dipicu:
  - Meningkatkan peluang drop kartu langka (*Rare/Epic*) sebesar **+25%**.
  - Memberikan bantuan penunjuk pasangan kartu di papan.

### 🏆 Deck-Building & Roguelike Progression
- **Stage Scaling:** Hadapi musuh yang semakin kuat (*Cyber Scout, Cybergolem, Neon Spectre, Aether Warlord, Abyss Omega Boss*).
- **Loot Selection:** Setelah memenangkan stage, pilih 1 dari 3 kartu baru untuk dimasukkan ke dalam *Deck Pool* Anda di stage selanjutnya.
- **Permadeath & Leaderboard Sesi:** Setiap akhir perjalanan, skor Anda (*Stage Tertinggi & Total Matches*) dicatat ke dalam **Session Leaderboard**.

### ⏳ Turn Timer & Kompendium Kartu
- **Turn Countdown (15 Detik):** Batas waktu berpikir 15 detik pada giliran pemain.
- **📖 Katalog Kartu (Card Compendium):** Halaman khusus bagi pemain baru untuk mempelajari visual, statistik, dan deskripsi seluruh jenis kartu.

---

## 🎨 Tema Visual: Cyberfantasy UI Pro Max

- **Glassmorphic UI Panels:** Tampilan semi-transparan dengan *backdrop blur* 12px dan border bercahaya neon.
- **3D Card Flip & Shimmer:** Transisi memutar 3D pada kartu dan efek kilauan *shimmer* pada kartu langka (*Rare & Epic*).
- **Haptic Visuals:** Efek layar bergetar (*Screen Shake*) saat menerima damage besar dan animasi angka melayang (*Floating Text Overlay*).

---

## 📂 Dokumentasi Lengkap Proyek

Seluruh perancangan game ini terdokumentasi secara detail di dalam folder `docs/`:

1. [📄 1_REQUIREMENTS.md](docs/1_REQUIREMENTS.md) — Spesifikasi kebutuhan mekanik game & balancing.
2. [📄 2_DESIGN_SYSTEM.md](docs/2_DESIGN_SYSTEM.md) — Pedoman visual Cyberfantasy, palet warna, dan UI/UX Pro Max.
3. [📄 3_ROADMAP.md](docs/3_ROADMAP.md) — Alur tahap pengembangan proyek dari Fase 1 hingga Fase 8.
4. [📄 4_CARDS_CATALOG.md](docs/4_CARDS_CATALOG.md) — Katalog lengkap seluruh kartu (Attack, Defense, Heal, Buff, Debuff, Legendary).
5. [📄 5_TESTING_REPORT.md](docs/5_TESTING_REPORT.md) — Laporan pengujian gameplay & penanganan bug.
6. [📄 6_DEPLOYMENT_GUIDE.md](docs/6_DEPLOYMENT_GUIDE.md) — Panduan deployment ke Vercel, Netlify, dan GitHub Pages.

---

## 🛠️ Teknologi Yang Digunakan (Tech Stack)

- **Frontend Framework:** React.js 19
- **Build Tool:** Vite 6
- **Styling:** Vanilla CSS3 (Custom CSS Variables, Flexbox, CSS Grid, Glassmorphism, 3D Transforms, Keyframe Animations)
- **Deployment Platform:** Vercel Hosting

---

## 💻 Cara Menjalankan Secara Lokal

1. **Clone repository ini:**
   ```bash
   git clone https://github.com/Ajizzhx/MEMORY-CARD-BATTLE.git
   cd MEMORY-CARD-BATTLE
   ```

2. **Install dependensi:**
   ```bash
   npm install
   ```

3. **Jalankan server development:**
   ```bash
   npm run dev
   ```
   *Buka [http://localhost:5173/](http://localhost:5173/) di browser Anda.*

4. **Build untuk produksi:**
   ```bash
   npm run build
   ```

---

<div align="center">
  <sub>Dibuat dengan ❤️ untuk proyek game Memory Card Battle — 2026</sub>
</div>
