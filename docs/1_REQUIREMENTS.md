# Project Requirements: Memory Card Battle

## 1. Konsep Utama
- **Genre:** Memory Card Game + RPG Turn-Based Battle + Roguelike.
- **Platform:** Web Browser (Desktop & Mobile Responsive).
- **Tech Stack:** React.js + Vite, Vanilla CSS.
- **Tema Visual:** **Cyberfantasy 3D Artwork** (Estetika berbudaya memadukan dunia fantasi modern dengan elemen futuristik/cyber. Seluruh 21 kartu menggunakan gambar 3D render yang seragam dan mewah).

## 2. Mode Permainan
### A. Mode RPG Journey (Default)
- Progresi multi-stage bertahap (Stage 1–13+) dengan sistem loot kartu baru.
- Grid 4×4 (16 kartu / 8 pasang).
- Pemain mulai dengan 8 kartu, koleksi lengkap 21 kartu di Stage 13.

### B. Mode Boss Challenge (Abyss Omega Arena)
- **Grid 14×3 (42 kartu / 21 pasang sekaligus)** — seluruh koleksi kartu aktif.
- **Player HP: 200** vs **Boss Abyss Omega HP: 400**.
- **Single Stage (1 Stage)** — tidak ada progresi multi-stage atau loot system.
- **Timer tetap 15 detik per ronde.**
- **Pity System: NONAKTIF** (tidak ada medkit darurat).
- **Rekor tercatat: Waktu Tercepat** mengalahkan bos (elapsed time).
- **AI: Kesulitan** sesuai pilihan pemain (atau default HARD).
- Cocok untuk layar Laptop/Tablet atau mode layar penuh.

## 3. Mekanik Gameplay & Peraturan (Mode RPG)
### A. Papan Permainan (Shared Arena Board)
- **Sistem Grid:** Papan terdiri dari kisi-kisi 4x4 (16 kartu tertutup = 8 pasang kartu unik).
- **Deduplikasi Papan Ketat:** Setiap pengocokan papan menggunakan Map Deduplication untuk menjamin tepat 8 jenis kartu unik (berbeda ID) yang membentuk 8 pasang kartu di papan.
- **Shared Arena Mechanics:** Papan pertarungan dipakai bersama antara Pemain dan Musuh AI. **Siapa pun yang mencocokkan kartu di papan (Pemain maupun AI), dialah yang mendapatkan efeknya!**
- **Random Deck Sampling:** Dari seluruh koleksi Deck pemain (hingga 21 kartu), sistem mengocok dan memilih 8 pasang kartu unik secara acak di setiap awal stage.
- **HP & Armor System:** Pemain dan musuh (AI) masing-masing memiliki indikator HP & Block/Armor untuk menahan damage.

### B. Tipe-Tipe Kartu & Efek (21 Kartu Unik)
Setiap kartu memberikan efek instan apabila pemain/musuh berhasil membuka 2 kartu yang sama:
1. ⚔️ **Attack (Serangan):** `Cyber Dagger`, `Plasma Blade`, `Aether Strike`, `Divine Wrath`.
2. 🗡️ **Armor Piercing Attack:** `Quantum Piercer` — 18 Damage MENEMBUS Armor langsung ke HP!
3. 🛡️ **Defense:** `Nano Barrier`, `Aura Shield`, `Aegis Protocol`.
4. 🧪 **Heal:** `Bio Nectar`, `Cyber Elixir`, `Phoenix Catalyst`.
5. 👁️ **Buff:** `Oracle Eye` (mengintip 2 kartu), `Neural Flash` (reveal seluruh papan 1.5s — dengan AI biological limit maksimal merekam 2-6 kartu acak).
6. ☠️ **Debuff:** `Corrosive Virus`, `Glitch`, `EMP Disrupter` (mengacak memori AI).
7. 🧲 **Drain:** `Aether Syphon` (Curi Armor musuh jadi milik sendiri).
8. 🧊 **Stun/Freeze:** `Frostbite Protocol` (Bekukan musuh agar lewat 1 giliran).
9. 🌀 **Utility:** `Chronos Rewind` (Rewind Mistake: Kesalahan tebakan dimaafkan, giliran tidak pindah).
10. 🎲 **Risk:** `Cosmic Gamble` (50/50 chance damage besar atau self-damage).
11. 🌀 **Special:** `Phantom Mirage` (double cast — efek kartu berikutnya ×2!).

### C. Sistem AI Musuh & Stage Progression
- 🤖 **Stage 1: Cyber Scout** (70 HP - Mudah / Akurasi Memori 35%)
- 🦾 **Stage 2: Cybergolem** (90 HP - Sedang / Akurasi Memori 65%)
- 👻 **Stage 3: Neon Spectre** (110 HP - Sedang / Akurasi Memori 65%)
- 👹 **Stage 4: Aether Warlord** (140 HP - Tinggi / Akurasi Memori 88%)
- 🐉 **Stage 5+: Abyss Omega (Boss)** (150+ HP - Endless Boss Scaling +30 HP/stage)

### D. Progresi, Strict Non-Duplicate Loot & Pity System
- **Strict Non-Duplicate Loot:** Hadiah Loot HANYA menawarkan kartu yang BELUM dimiliki.
- **Istirahat Stage (+10 HP):** Memilih kartu loot memberikan +10 HP.
- **Pity System Bantuan Darurat (Max 2x):** Terpicu jika HP < 50% DAN Mismatch Streak >= 3.

## 4. Leaderboard & Panduan Dalam Game
- **🌐 Online Global Leaderboard (Supabase):** Top 10 Skor Global RPG secara real-time.
- **📱 RPG Session Leaderboard:** Merekam skor sesi bermain RPG lokal.
- **👹 Boss Session Leaderboard:** Merekam waktu tempuh tercepat Mode Boss Challenge.
- **📘 Buku Panduan & Katalog Game:** Kompendium 21 kartu lengkap + Panduan Game.
