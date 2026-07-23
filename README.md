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
  Dibalut dalam Desain UI/UX <b>Cyberfantasy 3D Artwork</b> yang Mewah, Penuh Animasi 3D Flip, Effek Neon Glow, dan Synthesizer BGM.
</p>

[🎮 Mainkan Langsung di Vercel](https://memory-card-battle.vercel.app/) •
[📖 Baca Dokumentasi](#-dokumentasi-lengkap-proyek) •
[🚀 Cara Menjalankan Lokal](#-cara-menjalankan-secara-lokal)

</div>

---

## 🌟 Fitur Utama (Core Features)

### ⚔️ 1vs1 Turn-Based Memory Battle (Shared Board)
- **Aksi Berbasis Pasangan Kartu:** Mencocokkan 2 kartu akan memicu efek aksi instan (*Attack, Defense, Heal, Buff, Debuff*).
- **Shared Arena Board Mechanics:** Kartu Loot yang diperoleh pemain masuk ke Deck. Siapa pun yang mencocokkan pasangan kartu di papan 4x4 (Pemain maupun AI), dialah yang mendapatkan efeknya!
- **HP & Armor System:** Perhitungan HP dinamis lengkap dengan bar pertahanan *Block/Armor* untuk menahan damage musuh.

### 🧠 AI Memory Engine & Stage Enemy Progression
- **Musuh AI Berdasarkan Stage:**
  - 🤖 **Stage 1: Cyber Scout** (70 HP - Mudah)
  - 🦾 **Stage 2: Cybergolem** (90 HP - Sedang)
  - 👻 **Stage 3: Neon Spectre** (110 HP - Sedang)
  - 👹 **Stage 4: Aether Warlord** (140 HP - Tinggi)
  - 🐉 **Stage 5+: Abyss Omega (Boss)** (150+ HP Endless Boss Scaling +30 HP/stage)

### 🛡️ Pity System & Comeback Mechanics
- Jika HP Pemain **< 50%** dan mengalami 3 *mismatch* berturut-turut, **Pity System Active** akan dipicu:
  - Meningkatkan peluang drop kartu langka (*Rare/Epic*) sebesar **+25%**.
  - Memberikan bantuan penunjuk pasangan kartu di papan.

### 🏆 Deck-Building & Roguelike Progression
- **100% Unified 3D Cyberfantasy Artwork:** Seluruh 13 kartu dalam game memiliki gambar ilustrasi 3D yang unik dan seragam.
- **Random Deck Sampling:** Papan 4x4 secara acak memilih 8 pasang kartu unik dari koleksi Deck pemain di setiap stage.
- **Session Leaderboard:** Merekam Skor (*Stage Tertinggi, Total Matches, dan Kesulitan AI*) ke dalam **Session Leaderboard**.

### 🎵 Web Audio Synthesizer BGM & SFX
- **Ambient Cyberfantasy BGM:** Musik latar harmonis dengan lowpass filter 1200Hz dan arpeggio melodis yang menenangkan.

---

## 📂 Dokumentasi Lengkap Proyek

1. [📄 1_REQUIREMENTS.md](docs/1_REQUIREMENTS.md) — Spesifikasi kebutuhan mekanik game & balancing.
2. [📄 2_ARCHITECTURAL_DESIGN.md](docs/2_ARCHITECTURAL_DESIGN.md) — Arsitektur sistem game & alur data state.
3. [📄 3_CARDS_CATALOG.md](docs/3_CARDS_CATALOG.md) — Katalog 13 kartu lengkap beserta statistik & gambar 3D.
4. [📄 4_LOOT_AND_PITY_SYSTEM.md](docs/4_LOOT_AND_PITY_SYSTEM.md) — Mekanisme Loot, Drop Rate, & Pity Comeback.
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
