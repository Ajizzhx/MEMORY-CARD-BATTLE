# Laporan Pengujian (Testing & Debugging Report)
## Memory Card Battle - Cyberfantasy Edition

Dokumen ini berisi rangkuman pengujian sistem gameplay, penanganan bug, serta panduan langkah demi langkah untuk menguji game ini secara langsung di lingkungan lokal Anda.

---

## 1. Hasil Pengujian Gameplay (Test Cases Matrix)

| No | Modul / Fitur | Skenario Pengujian | Ekspektasi Hasil | Status |
| :--- | :--- | :--- | :--- | :---: |
| 1 | **Core Match Loop** | Pemain membuka 2 kartu yang sama di papan grid. | Kartu tetap terbuka, memberikan efek (Damage/Heal/Block/Piercing), dan pemain mendapat giliran ekstra. | ✅ PASSED |
| 2 | **Core Mismatch Loop** | Pemain membuka 2 kartu berbeda. | Kartu menunjukkan pesan mismatch, ditutup kembali dalam 1 detik, giliran berpindah ke Musuh. | ✅ PASSED |
| 3 | **AI Memory Engine** | AI Musuh mengambil gilirannya pada Stage 1 (Easy) vs Stage 4 (Hard). | Pada stage tinggi (Hard), AI secara agresif memilih pasangan yang pernah terbuka di giliran sebelumnya. | ✅ PASSED |
| 4 | **Pity System (4th Emergency Option)** | HP Pemain < 50% atau Mismatch 3x beruntun. | Terbuka Opsi Ke-4 `🚑 Bio-Shield Medkit` (+35 HP & +25 Armor) tanpa menambah kartu baru ke deck. | ✅ PASSED |
| 5 | **Strict Non-Duplicate Loot** | Menyelesaikan Stage Clear. | Modal Loot HANYA menawarkan kartu yang BELUM dimilik oleh pemain dari katalog 21 kartu. Tidak ada duplikat kartu di deck. | ✅ PASSED |
| 6 | **Armor Piercing Damage** | Menggunakan kartu `Quantum Piercer`. | 18 Damage MENEMBUS perisai/block lawan secara langsung ke HP. | ✅ PASSED |
| 7 | **Online Leaderboard (Supabase)** | Menyelesaikan Stage atau Game Over. | Skor otomatis terkirim ke Supabase REST API; Modal Leaderboard menampilkan Top 10 Global & Sesi Lokal. | ✅ PASSED |
| 8 | **Refresh Safety Warning** | Melakukan F5 / Refresh browser saat pertarungan berlangsung. | Browser menanyakan dialog konfirmasi sebelum reload; reload mereset game secara bersih ke Dashboard. | ✅ PASSED |
| 9 | **Board Type Deduplication** | Pengocokan papan 4x4 saat stage baru. | Map Deduplication menjamin tepat 8 jenis kartu unik (16 kartu tertutup / 8 pasang) di papan. | ✅ PASSED |
| 10 | **Chronos Rewind Skill** | Mencocokkan kartu `Chronos Rewind`. | Turn Timer terisi kembali ke 15s dan posisi kartu tertutup di papan teracak ulang secara aman. | ✅ PASSED |
| 11 | **Aether Syphon Skill** | Mencocokkan kartu `Aether Syphon`. | Mencuri 15 Armor musuh menjadi milik pemain + memberikan 10 damage langsung. | ✅ PASSED |
| 12 | **Frostbite Stasis Skill** | Mencocokkan kartu `Frostbite Stasis`. | Musuh terbeku dan kehilangan 1 giliran; giliran langsung kembali ke pemain secara aman tanpa hang. | ✅ PASSED |
| 13 | **Neural Flash Skill** | Mencocokkan kartu `Neural Flash`. | Seluruh kartu tertutup di papan terbuka selama 1.5 detik lalu tertutup kembali. | ✅ PASSED |
| 14 | **Cosmic Gamble Skill** | Mencocokkan kartu `Cosmic Gamble`. | 50% peluang mendapat 35 damage kosmik, 50% peluang backfire (-10 HP & musuh +10 HP). | ✅ PASSED |
| 15 | **Mirage Duplicator Skill** | Mencocokkan kartu `Mirage Duplicator`. | Efek kartu berikutnya yang dicocokkan berlipat 2x (Double Cast) secara akurat dan tidak terjadi loop tak terbatas. | ✅ PASSED |
| 16 | **Build Test** | Menjalankan perintah `npm run build`. | Kode terkompilasi bersih tanpa *syntax error* atau *broken import*. | ✅ PASSED |

---

## 2. Panduan Menguji Game Secara Langsung (Manual Testing Guide)

Anda dapat menguji dan memainkan game ini langsung di komputer Anda dengan mengikuti langkah-langkah berikut:

### Step 1: Buka Terminal di Folder Proyek
Pastikan lokasi terminal berada di folder proyek:
`C:\Users\adovan\Documents\belajar_coding\kartu_ingatan`

### Step 2: Jalankan Server Development
Ketik perintah berikut di terminal:
```bash
npm run dev
```

### Step 3: Buka Game di Browser
Terminal akan menampilkan alamat URL lokal (`http://localhost:5173`). Buka browser Anda dan akses alamat tersebut.
