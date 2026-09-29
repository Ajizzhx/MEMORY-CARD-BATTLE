<div align="center">

<!-- Header Banner -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=0:00f0ff,50:7000ff,100:ff0088&height=200&section=header&text=MEMORY%20CARD%20BATTLE&fontSize=42&fontAlignY=38&animation=fadeIn&fontColor=ffffff" width="100%" alt="Memory Card Battle Header Banner" />

<br>

<!-- Badges Row -->
[![Live Demo](https://img.shields.io/badge/PLAY_NOW-LIVE_DEMO-00f0ff?style=for-the-badge&logo=vercel&logoColor=white)](https://memory-card-battle.vercel.app/)
[![React 19](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite 8](https://img.shields.io/badge/Vite-8.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![Oxlint](https://img.shields.io/badge/Oxlint-Passing-00ff88?style=for-the-badge&logo=oxc&logoColor=black)](https://oxc.rs/)
[![Tests](https://img.shields.io/badge/Tests-58%2F58_Passed-00f0ff?style=for-the-badge)](tests/game_logic_test.mjs)
[![Supabase](https://img.shields.io/badge/Supabase-Leaderboard-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Language](https://img.shields.io/badge/Language-ID%20%7C%20EN-ffd700?style=for-the-badge)](https://memory-card-battle.vercel.app/)

<br>

<p align="center">
  <b>Taktikal 1v1 Turn-Based Memory Battler dengan Mekanik Shared-Board & Progresi Roguelike.</b><br>
  Menggabungkan permainan memori klasik dengan pertarungan RPG, 21 kartu cyber unik, AI adaptif, dan Web Audio synthesizer engine.
</p>

[🎮 **Mainkan di Vercel**](https://memory-card-battle.vercel.app/) •
[📖 **Dokumentasi**](#-dokumentasi-arsitektur--spesifikasi) •
[⚙️ **Panduan Instalasi**](#-instalasi--menjalankan-lokal) •
[🧪 **Pengujian & Linting**](#-pengujian--verifikasi-kualitas) •
[☕ **Dukung Pengembang**](#-dukung-pengembang-support-the-developer)

</div>

---

## 🎮 Mode Permainan (Game Modes)

Permainan menyediakan dua mode pertarungan dengan karakteristik papan dan aturan yang berbeda:

| Parameter | ⚔️ RPG Journey (Roguelike) | 🐉 Boss Challenge (Abyss Omega Arena) |
| :--- | :--- | :--- |
| **Ukuran Grid** | Grid 4×4 (16 kartu / 8 pasang) | Grid 14×3 (42 kartu / 21 pasang lengkap) |
| **HP Awal** | Pemain: 100 HP \| Musuh: 70–150+ HP | Pemain: 200 HP \| Abyss Omega: 400 HP |
| **Komposisi Deck** | Mulai 8 kartu, bertambah +1 kartu tiap stage | Seluruh 21 kartu katalog aktif di papan sejak ronde 1 |
| **Progresi** | Stage bertingkat (Stage 1 s/d 13+ tanpa batas) | Pertarungan satu ronde eliminasi penuh |
| **Sistem Hadiah** | Layar Loot 3 pilihan kartu baru pasca-menang | Catatan rekor waktu penyelesaian (Speedrun Timer) |
| **Pity System** | Aktif (Bio-Shield Medkit saat HP < 50% / 3 mismatch) | Dinonaktifkan (Ujian memori murni) |
| **Leaderboard** | Top 10 Global: Stage tertinggi & total match | Top 10 Global: Waktu tercepat (menit & detik) |

---

## ⚔️ Mekanik Inti Pertarungan (Core Mechanics)

### 1. Papan Bersama (Shared-Board Combat)
* Setiap giliran, pemain atau AI musuh membuka 2 kartu tertutup di arena.
* **Match:** Pemain yang berhasil mencocokkan pasangan kartu langsung memperoleh efek aksi kartu tersebut dan mendapatkan giliran tambahan (*extra turn*).
* **Mismatch:** Jika kedua kartu tidak cocok atau waktu berpikir 15 detik habis, giliran berpindah ke lawan.
* **Shared Ownership:** Kartu baru yang Anda ambil dimasukkan ke dalam deck pertarungan, namun jika lawan yang mencocokkannya di arena, lawanlah yang menikmati efeknya.

### 2. Katalog 21 Kartu Cyberfantasy (11 Arketipe Aksi)
Katalog kartu dirancang dengan 21 efek yang saling berinteraksi:
* **Attack & Piercing:** Menyerang HP lawan. Kartu seperti *Quantum Piercer* menembus Shield/Armor lawan secara langsung (*True Damage*).
* **Shield & Block:** Membangun lapisan Armor untuk menyerap damage serangan lawan berikutnya.
* **Heal & Hybrid:** Pemulihan HP, termasuk kartu hibrida *Divine Wrath* (-20 HP musuh & +15 HP pengguna).
* **Board Vision:** *Neural Flash* membuka seluruh papan selama 1.5 detik; *X-Ray Vision* mengintip 3 posisi kartu acak.
* **Control & Freeze:** *Frostbite Stasis* membekukan lawan selama 1 giliran.
* **Tactical Gamble & Double Cast:** *Chaos Gamble* (peluang 50% 40 damage atau backfire) dan *Aether Mirage* (menggandakan efek kartu cocok berikutnya sebesar 2×).
* **Debuff & EMP:** *EMP Shockwave* meremukkan seluruh armor lawan dan mengacak memori AI menjadi 100% acak.

### 3. AI Memory Engine Adaptif
AI musuh mengingat posisi kartu yang pernah terbuka menggunakan simulasi probabilitas retensi:
* **🟢 Easy:** 35% akurasi memori (musuh pemula, Stage 1).
* **🟡 Medium:** 65% akurasi memori (pertarungan seimbang, Stage 2–3).
* **🔴 Hard:** 88% akurasi memori (komandan perang & Abyss Omega, Stage 4+).
* **🔄 Auto:** Tingkat kesulitan berskala otomatis mengikuti nomor stage saat ini.
* **AI Stratifikasi 3 Lapis:** AI selalu mengecek *Known Pair* di memori -> *Half-Known Pair* -> Pilihan kartu tertutup acak.

### 4. Sistem Bantuan Darurat (Emergency Pity System)
* **Kondisi Pemicu:** HP pemain berada di bawah 50% atau mengalami kegagalan cocok 3 kali berturut-turut.
* **Opsi Medkit:** Pada layar Loot Stage Clear, opsi ke-4 darurat terbuka: `🚑 Bio-Shield Medkit (+35 HP & +25 Armor)`.
* **Batas Kuota:** Dibatasi maksimal 2 kali pemakaian per petualangan untuk menjaga keseimbangan permainan.

---

## 🛠️ Arsitektur & Teknologi (Tech Stack)

| Lapisan | Teknologi | Peran dalam Proyek |
| :--- | :--- | :--- |
| **Framework UI** | React 19.2 | Arsitektur komponen reaktif & state management hook |
| **Build Tool** | Vite 8.1 | Hot Module Replacement (HMR) & bundling produksi cepat |
| **Linting & QA** | Oxlint 1.71 | Static analysis ultra-cepat tanpa warning/error |
| **Testing** | Node.js Test Runner | Unit & regression test suite logika game (58 test assertions) |
| **Backend & Data** | Supabase REST API | Penyimpanan real-time papan skor global RPG & Boss Challenge |
| **Audio Engine** | Web Audio API | Sintesis prosedural untuk SFX & BGM tanpa ketergantungan file audio berat |
| **Styling** | Vanilla CSS Tokens | Glassmorphism, Palet Cyberpunk, Dark Mode, & Kontras WCAG AA |
| **Aksesibilitas** | WAI-ARIA & WCAG 2.1 | Navigasi keyboard penuh (`Escape`, `Enter`, `Space`), `:focus-visible`, reduced-motion |

---

## 📂 Dokumentasi Lengkap Proyek

Spesifikasi dan rekam jejak pengembangan terdokumentasi terstruktur di folder [`docs/`](docs/):

1. [📄 1_REQUIREMENTS.md](docs/1_REQUIREMENTS.md) — Spesifikasi kebutuhan sistem, aturan mekanik, & formula pity.
2. [📄 2_DESIGN_SYSTEM.md](docs/2_DESIGN_SYSTEM.md) — Panduan desain visual, palet warna, tipografi, & komponen UI.
3. [📄 3_ROADMAP.md](docs/3_ROADMAP.md) — Roadmap pengembangan dari inisialisasi hingga rilis produksi.
4. [📄 4_CARDS_CATALOG.md](docs/4_CARDS_CATALOG.md) — Kompendium lengkap 21 kartu, statistik efek, arketipe, & kisah lore.
5. [📄 5_TESTING_REPORT.md](docs/5_TESTING_REPORT.md) — Laporan pengujian komprehensif seluruh modul game.
6. [📄 6_AI_ALGORITHM.md](docs/6_AI_ALGORITHM.md) — Spesifikasi teknis AI Memory Engine, probabilitas retensi, & algoritma pencarian.
7. [📄 7_AUDIT_REPORT.md](docs/7_AUDIT_REPORT.md) — Laporan audit performa, stabilitas arsitektur, & refactoring.
8. [📄 anti-slop/audit-001-2026-09-27.md](anti-slop/audit-001-2026-09-27.md) — Laporan audit antislop putaran 1 (Delivery Gate Passed).

---

## ⚙️ Instalasi & Menjalankan Lokal

### Prasyarat
* Node.js versi 18.0 atau lebih baru
* npm versi 9.0 atau lebih baru

### Langkah Instalasi

1. **Clone repository:**
   ```bash
   git clone https://github.com/Ajizzhx/MEMORY-CARD-BATTLE.git
   cd MEMORY-CARD-BATTLE
   ```

2. **Install dependensi:**
   ```bash
   npm install
   ```

3. **Konfigurasi Environment Variable (Opsional untuk Online Leaderboard):**
   Salin file `.env.example` menjadi `.env`:
   ```bash
   cp .env.example .env
   ```
   Isi nilai kredensial Supabase jika ingin menghubungkan leaderboard global:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-public-key
   ```
   *(Catatan: Jika `.env` tidak diisi, game otomatis beralih ke local storage fallback tanpa error).*

4. **Jalankan server development:**
   ```bash
   npm run dev
   ```
   Buka [http://localhost:5173/](http://localhost:5173/) pada browser Anda.

5. **Build untuk produksi:**
   ```bash
   npm run build
   ```
   Hasil build siap saji akan dibuat di folder `dist/`.

---

## 🧪 Pengujian & Verifikasi Kualitas

Proyek ini dilengkapi dengan unit test otomatis dan linter ketat untuk menjamin stabilitas logika gameplay:

```bash
# Menjalankan static code analysis (0 warnings & 0 errors)
npm run lint

# Menjalankan 58 test case logika game, AI memory, pity, & Boss challenge
node tests/game_logic_test.mjs

# Menjalankan build bundle produksi
npm run build
```

Hasil uji logika mencakup:
* Verifikasi 21 kartu unik tanpa duplikasi ID.
* Distribusi kartu di papan RPG (8 pasang) dan Boss Challenge (21 pasang).
* Akurasi AI Memory (35%, 65%, 88%) dan efek pengacakan EMP Jammer.
* Dual-condition trigger Pity System dan batas maksimal pemakaian 2×.
* Formula penskalaan HP musuh Stage 1 s/d Stage 5+.
* Mekanisme pencatatan waktu speedrun Boss Challenge.

---

## 💖 Dukung Pengembang (Support the Developer)

Jika Anda menikmati permainan **Memory Card Battle** ini dan ingin mendukung kelangsungan pembaruan serta project open-source berikutnya, Anda dapat memberikan apresiasi melalui link berikut:

<div align="center">

| 🇮🇩 Donasi Lokal Indonesia (QRIS / E-Wallet) | ☕ Donasi Internasional (PayPal / Card) |
| :---: | :---: |
| [![Saweria](https://img.shields.io/badge/Saweria-Dukung_Ajizxh-ffaa00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://saweria.co/Ajizxh) | [![Ko-fi](https://img.shields.io/badge/Ko--fi-Support_Ajizxh-ff5f5f?style=for-the-badge&logo=ko-fi&logoColor=white)](https://ko-fi.com/ajizxh) |
| [saweria.co/Ajizxh](https://saweria.co/Ajizxh) | [ko-fi.com/ajizxh](https://ko-fi.com/ajizxh) |

<br>

<sub>Dibuat oleh <b><a href="https://github.com/Ajizzhx">Ajizzhx</a></b> — 2026</sub><br>
<sub>[🎮 Mainkan di Vercel](https://memory-card-battle.vercel.app/) • [💛 Saweria](https://saweria.co/Ajizxh) • [☕ Ko-fi](https://ko-fi.com/ajizxh)</sub>

</div>
