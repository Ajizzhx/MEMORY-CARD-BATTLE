<div align="center">

# 🔮 MEMORY CARD BATTLE
### *Cyberfantasy RPG & 1v1 Memory Matching Card Game*

[![Live Demo](https://img.shields.io/badge/PLAY_NOW-LIVE_DEMO-00f0ff?style=for-the-badge&logo=vercel&logoColor=white)](https://memory-card-battle.vercel.app/)
[![Saweria](https://img.shields.io/badge/Saweria-Support_Dev-ffaa00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://saweria.co/Ajizxh)
[![Ko-fi](https://img.shields.io/badge/Ko--fi-Support_Dev-ff5f5f?style=for-the-badge&logo=ko-fi&logoColor=white)](https://ko-fi.com/ajizxh)

[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![Language](https://img.shields.io/badge/Language-ID%20%7C%20EN-00ff88?style=flat-square)](https://memory-card-battle.vercel.app/)
[![Build Status](https://img.shields.io/badge/Build-Passing-00f0ff?style=flat-square)](https://memory-card-battle.vercel.app/)

---

<p align="center">
  <b>Gabungan Antara Memory Card Game Klasik, RPG Turn-Based Battle, dan Elemen Roguelike Progression.</b><br>
  Dibalut dalam Desain UI/UX <b>Cyberfantasy 3D Artwork</b> yang Mewah, Animasi 3D Card Flip, Efek Neon Glow, dan Synthesizer Sound System.
</p>

[🎮 **MAIN LANGSUNG DI VERCEL**](https://memory-card-battle.vercel.app/) • [☕ **DUKUNG VIA SAWERIA**](https://saweria.co/Ajizxh) • [💖 **DUKUNG VIA KO-FI**](https://ko-fi.com/ajizxh) • [📖 **DOKUMENTASI**](#-dokumentasi-lengkap-proyek)

</div>

---

## 💖 Dukung Pengembang (Support the Developer)

Jika Anda menyukai game **Memory Card Battle** ini dan ingin mendukung kelangsungan pengembangannya, Anda dapat memberikan apresiasi donasi melalui link berikut:

<div align="center">

| 🇮🇩 Donasi Lokal Indonesia (QRIS / E-Wallet) | ☕ Donasi International (PayPal / Credit Card) |
| :---: | :---: |
| [![Saweria](https://img.shields.io/badge/🇮🇩_Saweria-Ajizxh-ffaa00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://saweria.co/Ajizxh) | [![Ko-fi](https://img.shields.io/badge/☕_Ko--fi-Ajizxh-ff5f5f?style=for-the-badge&logo=ko-fi&logoColor=white)](https://ko-fi.com/ajizxh) |
| **`https://saweria.co/Ajizxh`** | **`https://ko-fi.com/ajizxh`** |

</div>

---

## 🌟 Fitur Utama (Core Features)

### ⚔️ 1v1 Turn-Based Memory Battle (Shared Board)
- **Combat Berbasis Pasangan Kartu:** Mencocokkan 2 kartu memicu efek aksi instan (*Attack, True Damage Armor Piercing, Defense Shield, Heal, Buff Scan, Debuff Glitch, & Divine Wrath*).
- **Shared Arena Board Mechanics:** Kartu Loot yang diperoleh dimasukkan ke Deck. Siapa pun yang mencocokkan pasangan kartu di papan 4x4 (Pemain maupun AI Musuh), dialah yang memperoleh efek kartu tersebut!
- **Papan Ketat Bebas Duplikat:** Pengocokan papan 4x4 menggunakan penyaringan *Map Deduplication* untuk mengundi tepat 8 jenis kartu unik (16 kartu tertutup / 8 pasang) di setiap stage.

### 📜 15 Kisah Lore Cyberfantasy & Card Detail Modal
- **Lore Hibrida High-Fantasy & Cyberpunk:** 15 kartu game dilengkapi narasi cerita latar belakang mistis-cyberpunk (Sihir, Rune, Alkimia, Jiwa Naga, Perisai Elven, hingga Meriam EMP).
- **Interactive Card Story Modal (`CardDetailModal`):** Setiap kartu pada Katalog dapat ditekan untuk melihat foto 3D besar bercahaya neon, statistik spesifik, dan arsip cerita lore.

### 🎭 Custom 3D Rendered Avatars (Player & Stage Boss AIs)
- 🧙‍♂️ **Player:** Cyberfantasy Hero Mage Portrait dengan visor neon cyan & tudung penyihir rune.
- 🤖 **Stage 1 Scout:** Cyber Drone Reconnaissance Unit.
- 🦾 **Stage 2 Golem:** Cybergolem Heavy Shield Mech.
- 👻 **Stage 3 Spectre:** Neon Spectre Phantom Assassin.
- 👹 **Stage 4 Warlord:** Aether Warlord Cosmic Commander.
- 🐉 **Stage 5+ Dragon:** Abyss Omega Cyber Dragon Boss.

### 🧠 AI Memory Engine & Mode Kesulitan (Auto, Easy, Medium, Hard)
- 🔄 **Otomatis (Stage Scaling):** Kecerdasan AI naik bertahap dari Stage 1 (35%) hingga Stage 5+ (88%).
- 🟢 **Mudah (35%)** • 🟡 **Sedang (65%)** • 🔴 **Tinggi (88%)**
- Sistem Ronde Stage di-reset di setiap stage baru, sedangkan total match dan HP diakumulasikan sepanjang perjalanan.

### 🚑 Emergency Bio-Shield Medkit (Pity System)
- Terpicu otomatis jika HP Pemain **< 50%** atau mengalami 3 *mismatch* berturut-turut.
- Membuka **Opsi Ke-4 Bantuan Darurat (`🚑 Bio-Shield Medkit`)**: Memberikan pemulihan instant **+35 HP & +25 Armor** (Terbatas maksimal 2 kali pemakaian per run).

### 🌐 Dual Language System (Bahasa Indonesia & English)
- Pilihan bahasa terpusat yang dapat diubah di Dashboard Nama (`NameModal`) dengan penyimpanan `localStorage` otomatis.

### 🏆 Online Global Leaderboard (Supabase Integration)
- Integrasi Papan Skor Top 10 Global Supabase dan Papan Skor Sesi Lokal yang dapat diakses langsung dari Dashboard Nama maupun Layar Game Over.

---

## 🛠️ Teknologi & Arsitektur (Tech Stack)

- **Frontend Core:** React 19 + Vite 6
- **Styling & Theme:** Vanilla CSS (Glassmorphism, Neon Cyberpunk Palette, HSL Design Tokens)
- **Database & Backend:** Supabase (Real-time Global Leaderboard)
- **Sound System:** HTML5 Web Audio API (Synthesizer Sound Effects & Background Music)
- **Deployment:** Vercel Continuous Deployment

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
  <sub>Dibuat dengan 💖 & Cyberfantasy Energy oleh <b>Ajizzhx</b> — 2026</sub><br>
  <sub><a href="https://memory-card-battle.vercel.app/">Mainkan Game</a> • <a href="https://saweria.co/Ajizxh">Saweria</a> • <a href="https://ko-fi.com/ajizxh">Ko-fi</a></sub>
</div>
