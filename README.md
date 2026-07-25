<div align="center">

<!-- Animated Header Banner -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=0:00f0ff,50:7000ff,100:ff0088&height=200&section=header&text=MEMORY%20CARD%20BATTLE&fontSize=42&fontAlignY=38&animation=fadeIn&fontColor=ffffff" width="100%" alt="Memory Card Battle Header Banner" />

<!-- Animated Typing Subtitle -->
<a href="https://github.com/Ajizzhx/MEMORY-CARD-BATTLE">
  <img src="https://readme-typing-svg.demolab.com?font=Orbitron&weight=700&size=20&duration=2800&pause=900&color=00F0FF&center=true&vCenter=true&width=750&lines=1v1+Cyberfantasy+RPG+%26+Memory+Matching+Battle;15+Unique+3D+Rendered+Cyber+Cards+%26+Rich+Lore;Adaptive+AI+Memory+Engine+(Auto%2C+Easy%2C+Medium%2C+Hard);Emergency+Bio-Shield+Pity+Medkit+System" alt="Typing Subtitle" />
</a>

<br><br>

<!-- Badges Row -->
[![Live Demo](https://img.shields.io/badge/PLAY_NOW-LIVE_DEMO-00f0ff?style=for-the-badge&logo=vercel&logoColor=white)](https://memory-card-battle.vercel.app/)
[![React 19](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite 6](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-Leaderboard-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Language](https://img.shields.io/badge/Language-ID%20%7C%20EN-00ff88?style=for-the-badge)](https://memory-card-battle.vercel.app/)
[![Build Status](https://img.shields.io/badge/Build-Passing-00f0ff?style=for-the-badge)](https://memory-card-battle.vercel.app/)

<br>

<p align="center">
  <b>Perpaduan Taktis Antara Memory Card Game Klasik, RPG Turn-Based Battle, dan Elemen Roguelike Progression.</b><br>
  Dibalut dalam UI/UX <b>Cyberfantasy 3D Artwork</b> yang Mewah, Animasi 3D Card Flip, Efek Neon Glow, dan Synthesizer Sound System.
</p>

[🎮 **MAIN LANGSUNG DI VERCEL**](https://memory-card-battle.vercel.app/) •
[📖 **BACA DOKUMENTASI**](#-dokumentasi-lengkap-proyek) •
[🚀 **CARA MENJALANKAN LOKAL**](#-cara-menjalankan-secara-lokal) •
[💖 **DONASI & DUKUNGAN**](#-dukung-pengembang-support-the-developer)

</div>

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%" alt="Cyber Line Divider">

## 🌟 Fitur Utama (Core Features)

### ⚔️ 1v1 Turn-Based Memory Battle (Shared Board)
- **Combat Berbasis Pasangan Kartu:** Mencocokkan 2 kartu memicu efek aksi instan (*Attack, True Damage Armor Piercing, Defense Shield, Heal, Buff Scan, Debuff Glitch, & Divine Wrath*).
- **Shared Arena Board Mechanics:** Kartu Loot yang diperoleh dimasukkan ke Deck. Siapa pun yang mencocokkan pasangan kartu di papan 4x4 (Pemain maupun AI Musuh), dialah yang memperoleh efek kartu tersebut!
- **Papan Ketat Bebas Duplikat:** Pengocokan papan 4x4 menggunakan penyaringan *Map Deduplication* untuk mengundi tepat 8 jenis kartu unik (16 kartu tertutup / 8 pasang) di setiap stage.
- **HP & Armor System:** Perhitungan HP dinamis lengkap dengan bar pertahanan *Block/Armor* untuk menahan gempuran serangan musuh.

### 📜 15 Kisah Lore Cyberfantasy & Modal Detail Kartu Interaktif
- **Kisah Lore Hibrida High-Fantasy & Cyberpunk:** 15 kartu game dilengkapi narasi cerita latar belakang mistis-cyberpunk (Sihir, Rune, Alkimia, Jiwa Naga, Perisai Elven, hingga Meriam EMP).
- **Interactive Card Story Modal (`CardDetailModal`):** Setiap kartu pada Katalog di Dashboard Nama maupun In-Game dapat ditekan untuk melihat foto 3D besar bercahaya neon, statistik spesifik, dan arsip cerita lore.

### 🎭 Custom 3D Rendered Avatars (Player & Stage Boss AIs)
| Stage | Avatar Icon | Nama Musuh | Deskripsi AI Musuh |
| :---: | :---: | :--- | :--- |
| **Hero** | 🧙‍♂️ | **Player Hero** | Cyberfantasy Hero Mage dengan visor neon cyan & tudung penyihir rune |
| **Stage 1** | 🤖 | **Cyber Scout** | Unit Drone Pengintai Dasar (*Easy 35% Accuracy*) |
| **Stage 2** | 🦾 | **Cybergolem** | Heavy Shield Robot Mech (*Medium 65% Accuracy*) |
| **Stage 3** | 👻 | **Neon Spectre** | Phantom Assassin Lincah (*Hard 88% Accuracy*) |
| **Stage 4** | 👹 | **Aether Warlord** | Cosmic Commander Komandan Perang (*Hard 88% Accuracy*) |
| **Stage 5+** | 🐉 | **Abyss Dragon** | Legendary Cyber Dragon Boss (*Endless Challenge*) |

### 🧠 AI Memory Engine & Mode Kesulitan
- **Mode Kesulitan Fleksibel:** Pemain dapat memilih mode kecerdasan AI Musuh di Dashboard Nama:
  - 🔄 **Otomatis (Stage Scaling):** Kecerdasan AI naik bertahap dari Stage 1 (35%) hingga Stage 5+ (88%).
  - 🟢 **Mudah (35%)** • 🟡 **Sedang (65%)** • 🔴 **Tinggi (88%)**
- **Sistem Ronde Stage:** Hitungan ronde di-reset mulai dari Ronde 1 di setiap stage baru, sedangkan total match pemain dan HP diakumulasi sepanjang perjalanan.

### 🚑 Emergency Bio-Shield Medkit (Pity System)
- Terpicu otomatis jika HP Pemain **< 50%** atau mengalami 3 *mismatch* berturut-turut.
- Membuka **Opsi Ke-4 Bantuan Darurat (`🚑 Bio-Shield Medkit`)**: Memberikan pemulihan instant **+35 HP & +25 Armor** (Terbatas maksimal 2 kali pemakaian per run).

### 🌐 Dual Language System & Online Global Leaderboard
- **Dual Language (ID / EN):** Dukungan penuh Bahasa Indonesia & English yang dapat diubah di Dashboard Nama dengan penyimpanan `localStorage` otomatis.
- **Online Global Leaderboard:** Integrasi Papan Skor Top 10 Global Supabase dan Papan Skor Sesi Lokal yang dapat diakses langsung dari Dashboard Nama maupun Layar Game Over.

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%" alt="Cyber Line Divider">

## 🛠️ Teknologi & Arsitektur (Tech Stack)

- **Frontend Core:** React 19 + Vite 6
- **Styling & Theme:** Vanilla CSS (Glassmorphic Panels, Neon Cyberpunk Palette, HSL Design Tokens)
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

## 🚀 Cara Menjalankan Secara Lokal

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

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%" alt="Cyber Line Divider">

## 💖 Dukung Pengembang (Support the Developer)

Jika Anda menyukai game **Memory Card Battle** ini dan ingin mendukung kelangsungan pengembangannya, Anda dapat memberikan apresiasi donasi melalui link berikut:

<div align="center">

| 🇮🇩 Donasi Lokal Indonesia (QRIS / E-Wallet) | ☕ Donasi International (PayPal / Credit Card) |
| :---: | :---: |
| [![Saweria](https://img.shields.io/badge/🇮🇩_Saweria-Support_Ajizxh-ffaa00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://saweria.co/Ajizxh) | [![Ko-fi](https://img.shields.io/badge/☕_Ko--fi-Support_Ajizxh-ff5f5f?style=for-the-badge&logo=ko-fi&logoColor=white)](https://ko-fi.com/ajizxh) |
| **[https://saweria.co/Ajizxh](https://saweria.co/Ajizxh)** | **[https://ko-fi.com/ajizxh](https://ko-fi.com/ajizxh)** |

<br>

<sub>Dibuat dengan 💖 & Cyberfantasy Energy oleh <b><a href="https://github.com/Ajizzhx">Ajizzhx</a></b> — 2026</sub><br>
<sub>[🎮 Mainkan Game di Vercel](https://memory-card-battle.vercel.app/) • [💛 Saweria](https://saweria.co/Ajizxh) • [☕ Ko-fi](https://ko-fi.com/ajizxh)</sub>

</div>
