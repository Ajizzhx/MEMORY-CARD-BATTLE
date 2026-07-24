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

### 📜 15 Kisah Lore Cyberfantasy & Modal Detail Kartu Interaktif
- **Kisah Lore Hibrida High-Fantasy & Cyberpunk:** 15 kartu game dilengkapi narasi cerita latar belakang mistis-cyberpunk (Sihir, Rune, Alkimia, Jiwa Naga, Perisai Elven, hingga Meriam EMP).
- **Interactive Card Story Modal (`CardDetailModal`):** Setiap kartu pada Katalog di Dashboard Nama maupun In-Game dapat ditekan untuk melihat foto 3D besar bercahaya neon, statistik spesifik, dan arsip cerita lore.

### 🎭 Custom 3D Rendered Avatars (Player & Stage Enemies)
- **Visual Avatar 3D Khusus:**
  - 🧙‍♂️ **Player:** Cyberfantasy Hero Mage Portrait dengan visor neon cyan & tudung penyihir rune.
  - 🤖 **Stage 1:** Cyber Scout Drone Robot.
  - 🦾 **Stage 2:** Cybergolem Heavy Mech.
  - 👻 **Stage 3:** Neon Spectre Phantom Assassin.
  - 👹 **Stage 4:** Aether Warlord Cosmic Commander.
  - 🐉 **Stage 5+:** Abyss Omega Cyber Dragon Boss.

### 🧠 AI Memory Engine & Mode Kesulitan
- **Mode Kesulitan Fleksibel:** Pemain dapat memilih mode kesulitan AI di Dashboard Nama:
  - 🔄 **Otomatis (Stage Scaling):** Kecerdasan AI naik bertahap dari Stage 1 (35%) hingga Stage 4+ (88%).
  - 🟢 **Mudah (35%)** • 🟡 **Sedang (65%)** • 🔴 **Tinggi (88%)**
- **Sistem Ronde Stage:** Hitungan ronde di-reset mulai dari Ronde 1 di setiap stage baru, sedangkan total match pemain dan HP diakumulasi sepanjang perjalanan.

### 🚑 Pity System & Risk-vs-Reward Trade-Off
- Terpicu jika HP Pemain **< 50%** atau mengalami 3 *mismatch* berturut-turut:
  - Membuka **Opsi Ke-4 Bantuan Darurat (`🚑 Bio-Shield Medkit`)**: Memberikan pemulihan instant **+35 HP & +25 Armor** (Terbatas maksimal 2 kali pemakaian per run).

### 🌐 Online Global Leaderboard (Supabase Integration)
- **Akses Langsung dari Dashboard:** Tombol `🏆 Topskor` di Dashboard Nama memungkinkan pemain melihat daftar peringkat global Supabase & sesi sebelum memulai game.

---

## 📂 Dokumentasi Lengkap Proyek

1. [📄 1_REQUIREMENTS.md](docs/1_REQUIREMENTS.md) — Spesifikasi kebutuhan mekanik game, balancing, & pity system.
2. [📄 2_DESIGN_SYSTEM.md](docs/2_DESIGN_SYSTEM.md) — Panduan sistem desain visual & UI tokens.
3. [📄 3_ROADMAP.md](docs/3_ROADMAP.md) — Roadmap pengembangan dari setup hingga deployment.
4. [📄 4_CARDS_CATALOG.md](docs/4_CARDS_CATALOG.md) — Katalog 15 kartu lengkap beserta statistik, lore stories, & progresi deck.
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
   git checkout main
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
