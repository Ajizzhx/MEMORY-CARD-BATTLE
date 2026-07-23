# Project Requirements: Memory Card Battle

## 1. Konsep Utama
- **Genre:** Memory Card Game + RPG Turn-Based Battle + Roguelike.
- **Platform:** Web Browser (Desktop & Mobile Responsive).
- **Tech Stack:** React.js + Vite, Vanilla CSS.
- **Tema Visual:** **Cyberfantasy 3D Artwork** (Estetika berbudaya memadukan dunia fantasi modern dengan elemen futuristik/cyber. Seluruh 13 kartu menggunakan gambar 3D render yang seragam dan mewah).

## 2. Mekanik Gameplay & Peraturan
### A. Papan Permainan (Shared Arena Board)
- **Sistem Grid:** Papan terdiri dari kisi-kisi 4x4 (16 kartu tertutup = 8 pasang kartu unik).
- **Shared Arena Mechanics:** Papan pertarungan dipakai bersama antara Pemain dan Musuh AI. Kartu Loot yang didapatkan pemain dimasukkan ke Deck. **Siapa pun yang mencocokkan kartu di papan (Pemain maupun AI), dialah yang mendapatkan efeknya!**
- **Random Deck Sampling:** Dari seluruh koleksi Deck pemain (hingga 13 kartu), sistem mengocok dan memilih 8 pasang kartu unik secara acak di setiap awal stage.
- **HP & Armor System:** Pemain dan musuh (AI) masing-masing memiliki indikator HP & Block/Armor untuk menahan damage.

### B. Tipe-Tipe Kartu & Efek
Setiap kartu memberikan efek instan apabila pemain/musuh berhasil membuka 2 kartu yang sama:
1. ⚔️ **Attack (Serangan):** Mengurangi HP lawan.
2. 🛡️ **Defense (Bertahan):** Mendapatkan Block/Armor untuk menahan damage dari serangan lawan.
3. 🧪 **Heal (Pemulihan):** Memulihkan HP diri sendiri.
4. 👁️ **Buff (Oracle Eye):** Mengintip 2 kartu tertutup di papan.
5. ☠️ **Debuff (Corrosive Virus & Glitch):** Mengikis HP lawan secara merusak.

### C. Sistem AI Musuh & Stage Progression
Musuh AI disesuaikan berdasarkan tingkatan Stage:
- 🤖 **Stage 1: Cyber Scout** (70 HP - Mudah / Pemanasan)
- 🦾 **Stage 2: Cybergolem** (90 HP - Sedang / Pertahanan Tinggi)
- 👻 **Stage 3: Neon Spectre** (110 HP - Sedang / Memori Tajam)
- 👹 **Stage 4: Aether Warlord** (140 HP - Tinggi / Serangan Fatal)
- 🐉 **Stage 5+: Abyss Omega (Boss)** (150+ HP - Endless Boss Scaling +30 HP/stage)

### D. Progresi & Drop System (Loot)
- Seluruh **13 kartu di katalog** dapat terkumpul lengkap saat pemain berhasil menyelesaikan **Stage 5**.
- **Pity System / Comeback Mechanic:**
  - Jika HP pemain **< 50%** dan mengalami 3 *mismatch* berturut-turut, peluang drop kartu Rare/Epic ditingkatkan sebesar **+25%**.

## 3. Leaderboard & Panduan Dalam Game
- **Session Leaderboard:** Merekam Skor (Nama Pemain, Kesulitan AI, Stage Tertinggi, Total Matches).
- **📖 Katalog & Panduan Game (In-Game Compendium):** Menyediakan kompendium statistik 13 kartu serta tab khusus **Panduan Game** yang menjelaskan daftar musuh stage, aturan papan bersama, dan strategi loot.
