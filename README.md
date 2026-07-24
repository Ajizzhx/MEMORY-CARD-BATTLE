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
  Dibalut dalam Desain UI/UX <b>Cyberfantasy 3D Artwork</b> yang Mewah, Penuh Animasi 3D Flip, Efek Neon Glow, dan Synthesizer BGM.
</p>

[🎮 Mainkan Langsung di Vercel](https://memory-card-battle.vercel.app/) •
[📖 Baca Dokumentasi](#-dokumentasi-lengkap-proyek) •
[🚀 Cara Menjalankan Lokal](#-cara-menjalankan-secara-lokal)

</div>

---

## 🌟 Fitur Utama (Core Features)

### ⚔️ 1vs1 Turn-Based Memory Battle (Shared Board)
- **Aksi Berbasis Pasangan Kartu:** Mencocokkan 2 kartu memicu efek aksi instan (*Attack, True Damage Armor Piercing, Defense, Heal, Buff, Debuff*).
- **Shared Arena Board Mechanics:** Kartu Loot yang diperoleh pemain masuk ke Deck. Siapa pun yang mencocokkan pasangan kartu di papan 4x4 (Pemain maupun AI), dialah yang mendapatkan efeknya!
- **Papan Ketat Bebas Duplikat:** Pengocokan papan 4x4 menggunakan penyaringan Map Deduplication untuk menjamin tepat 8 jenis kartu unik (16 kartu tertutup / 8 pasang) di setiap stage.
- **HP & Armor System:** Perhitungan HP dinamis lengkap dengan bar pertahanan *Block/Armor* untuk menahan damage musuh.

### 🧠 AI Memory Engine & Stage Enemy Progression
- **Musuh AI Berdasarkan Stage:**
  - 🤖 **Stage 1: Cyber Scout** (70 HP - Mudah)
  - 🦾 **Stage 2: Cybergolem** (90 HP - Sedang)
  - 👻 **Stage 3: Neon Spectre** (110 HP - Sedang)
  - 👹 **Stage 4: Aether Warlord** (140 HP - Tinggi)
  - 🐉 **Stage 5+: Abyss Omega (Boss)** (150+ HP Endless Boss Scaling +30 HP/stage)

### 🚑 Pity System & Risk-vs-Reward Trade-Off
- Terpicu jika HP Pemain **< 50%** atau mengalami 3 *mismatch* berturut-turut:
  - Meningkatkan peluang drop kartu langka (*Rare/Epic*) sebesar **+25%**.
  - Membuka **Opsi Ke-4 Bantuan Darurat (`🚑 Bio-Shield Medkit`)**: Memberikan pemulihan instant **+35 HP & +25 Armor** untuk menyelamatkan nyawa pemain (dengan konsekuensi +0 kartu baru).

### 🌐 Online Global Leaderboard (Supabase Integration)
- **Global Online Top 10:** Merekam Top 10 Skor Teratas Dunia secara real-time via Supabase REST API dengan trigger pembersihan server-side.
- **Local Session Leaderboard:** Merekam skor terbaik pada sesi bermain lokal.

### 📘 Compendium & Dynamic Catalog
- **100% Unified 3D Cyberfantasy Artwork:** Seluruh 15 kartu dalam game memiliki gambar ilustrasi 3D yang unik dan seragam.
- **Pembedaan Mode Katalog:** Mode *Buku Panduan & Compendium Utama* di Dashboard Awal VS Mode *Kartu Stage Aktif* di dalam pertarungan.

---

## 📂 Dokumentasi Lengkap Proyek

1. [📄 1_REQUIREMENTS.md](docs/1_REQUIREMENTS.md) — Spesifikasi kebutuhan mekanik game, balancing, & pity system.
2. [📄 2_DESIGN_SYSTEM.md](docs/2_DESIGN_SYSTEM.md) — Panduan sistem desain visual & UI tokens.
3. [📄 3_ROADMAP.md](docs/3_ROADMAP.md) — Roadmap pengembangan dari setup hingga deployment.
4. [📄 4_CARDS_CATALOG.md](docs/4_CARDS_CATALOG.md) — Katalog 15 kartu lengkap beserta statistik & progresi deck.
5. [📄 5_TESTING_REPORT.md](docs/5_TESTING_REPORT.md) — Laporan pengujian gameplay & status verifikasi bug.

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
  <sub>Dibuat oleh <b>Ajizzhx</b> untuk proyek Memory Card Battle — 2026</sub>
</div>
