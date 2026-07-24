# Project Requirements: Memory Card Battle

## 1. Konsep Utama
- **Genre:** Memory Card Game + RPG Turn-Based Battle + Roguelike.
- **Platform:** Web Browser (Desktop & Mobile Responsive).
- **Tech Stack:** React.js + Vite, Vanilla CSS.
- **Tema Visual:** **Cyberfantasy 3D Artwork** (Estetika berbudaya memadukan dunia fantasi modern dengan elemen futuristik/cyber. Seluruh 15 kartu menggunakan gambar 3D render yang seragam dan mewah).

## 2. Mekanik Gameplay & Peraturan
### A. Papan Permainan (Shared Arena Board)
- **Sistem Grid:** Papan terdiri dari kisi-kisi 4x4 (16 kartu tertutup = 8 pasang kartu unik).
- **Deduplikasi Papan Ketat:** Setiap pengocokan papan menggunakan Map Deduplication untuk menjamin tepat 8 jenis kartu unik (berbeda ID) yang membentuk 8 pasang kartu di papan.
- **Shared Arena Mechanics:** Papan pertarungan dipakai bersama antara Pemain dan Musuh AI. Kartu Loot yang didapatkan pemain dimasukkan ke Deck. **Siapa pun yang mencocokkan kartu di papan (Pemain maupun AI), dialah yang mendapatkan efeknya!**
- **Random Deck Sampling:** Dari seluruh koleksi Deck pemain (hingga 15 kartu), sistem mengocok dan memilih 8 pasang kartu unik secara acak di setiap awal stage.
- **HP & Armor System:** Pemain dan musuh (AI) masing-masing memiliki indikator HP & Block/Armor untuk menahan damage.

### B. Tipe-Tipe Kartu & Efek
Setiap kartu memberikan efek instan apabila pemain/musuh berhasil membuka 2 kartu yang sama:
1. ⚔️ **Attack (Serangan):** Mengurangi HP/Armor lawan (`Cyber Dagger`, `Plasma Blade`, `Aether Strike`, `Divine Wrath`).
2. 🗡️ **Armor Piercing Attack (Penembus Armor):** `Quantum Piercer` memberikan 18 Damage MENEMBUS Armor lawan secara langsung ke HP!
3. 🛡️ **Defense (Bertahan):** Mendapatkan Block/Armor untuk menahan damage lawan (`Nano Barrier`, `Aura Shield`, `Aegis Protocol`).
4. 🧪 **Heal (Pemulihan):** Memulihkan HP diri sendiri (`Bio Nectar`, `Cyber Elixir`, `Phoenix Catalyst`).
5. 👁️ **Buff (Oracle Eye):** Mengintip 2 kartu tertutup di papan selama 2.5 detik.
6. ☠️ **Debuff (Corrosive Virus, Glitch, EMP Disrupter):** Mengikis HP lawan dan menghancurkan perisai serta mengacak memori AI (EMP Jammer).

### C. Sistem AI Musuh & Stage Progression
Musuh AI disesuaikan berdasarkan tingkatan Stage:
- 🤖 **Stage 1: Cyber Scout** (70 HP - Mudah / Akurasi Memori 35%)
- 🦾 **Stage 2: Cybergolem** (90 HP - Sedang / Akurasi Memori 65%)
- 👻 **Stage 3: Neon Spectre** (110 HP - Sedang / Akurasi Memori 65%)
- 👹 **Stage 4: Aether Warlord** (140 HP - Tinggi / Akurasi Memori 88%)
- 🐉 **Stage 5+: Abyss Omega (Boss)** (150+ HP - Endless Boss Scaling +30 HP/stage - Akurasi Memori 88%)

### D. Progresi, Strict Non-Duplicate Loot & Pity System (Risk vs Reward)
- **Strict Non-Duplicate Loot:** Hadiah Loot HANYA menawarkan kartu yang BELUM dimiliki oleh pemain (tanpa duplikat kartu di deck).
- **Istirahat Stage (+10 HP):** Memilih kartu loot biasa memberikan pemulihan alami +10 HP.
- **Pity System Bantuan Darurat (Opsi ke-4 - Terbatas Maksimal 2x):**
  - Terpicu jika pemain mengalami kesulitan (`HP < 50%` ATAU `Mismatch Streak >= 3`).
  - Terbuka pilihan ke-4: **`🚑 Bio-Shield Medkit`** (+35 HP & +25 Armor instant).
  - **Pembatasan Keseimbangan Game (Max 2x Usage):** Pemakaian Medkit Darurat **DIBATASI MAKSIMAL 2 KALI (2x Charges)** sepanjang satu perjalanan (per run) untuk menjaga keseimbangan dan tantangan game.
  - **Risk vs Reward:** Jika memilih Medkit Darurat, pemain TIDAK mendapat kartu baru (+0 kartu) dan memotong 1x kuota darurat. Target kelengkapan 15 kartu katalog yang semula di **Stage 7 Clear** akan bergeser ke **Stage 8, 9, dst.**

## 3. Leaderboard & Panduan Dalam Game
- **🌐 Online Global Leaderboard (Supabase):** Merekam Top 10 Skor Teratas Dunia secara real-time via Supabase REST API dengan trigger pembersihan server-side.
- **📱 Session Leaderboard:** Merekam skor sesi bermain lokal.
- **📘 Buku Panduan & Katalog Game (In-Game Compendium):** Menyediakan kompendium statistik 15 kartu lengkap, tab Panduan Game (Musuh AI, Aturan Papan Bersama, & Kelengkapan 15 Kartu), serta tampilan khusus Kartu Stage Aktif saat berada di dalam pertarungan.
