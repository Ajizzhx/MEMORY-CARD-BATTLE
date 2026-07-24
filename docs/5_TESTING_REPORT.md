# Laporan Pengujian (Testing & Debugging Report)
## Memory Card Battle - Cyberfantasy Edition

Dokumen ini berisi rangkuman pengujian sistem gameplay, penanganan bug, serta panduan langkah demi langkah untuk menguji game ini secara langsung di lingkungan lokal Anda.

---

## 1. Hasil Pengujian Gameplay (Test Cases Matrix)

| No | Modul / Fitur | Skenario Pengujian | Ekspektasi Hasil | Status |
| :--- | :--- | :--- | :--- | :---: |
| 1 | **Core Match Loop** | Pemain membuka 2 kartu yang sama di papan grid. | Kartu tetap terbuka, memberikan efek (Damage/Heal/Block), dan pemain mendapat giliran ekstra. | ✅ PASSED |
| 2 | **Core Mismatch Loop** | Pemain membuka 2 kartu berbeda. | Kartu menunjukkan pesan mismatch, lalu ditutup kembali secara otomatis dalam 1 detik, giliran berpindah ke Musuh. | ✅ PASSED |
| 3 | **AI Memory Engine** | AI Musuh mengambil gilirannya pada Stage 1 (Easy) vs Stage 4 (Hard). | Pada stage tinggi (Hard), AI secara agresif memilih pasangan yang pernah terbuka di giliran sebelumnya. | ✅ PASSED |
| 4 | **Pity System** | HP Pemain < 50% dan mengalami 3 Mismatch berturut-turut. | Banner "Pity System Active" muncul, dan persentase drop loot Rare/Epic meningkat +25%. | ✅ PASSED |
| 5 | **Roguelike Progression** | Mengalahkan musuh (HP Musuh = 0). | Modal Loot muncul membawa 3 pilihan kartu baru. Memilih kartu akan membawa pemain ke Stage berikutnya dengan HP tersisa. | ✅ PASSED |
| 6 | **Permadeath (Game Over)** | HP Pemain = 0. | Modal Game Over muncul menampilkan stage terakhir dan total match. Pemain bisa mereset ke Stage 1. | ✅ PASSED |
| 7 | **Turn Timer Persistence** | Menguji refresh browser saat hitungan mundur timer berjalan. | Sisa detik timer (misal: 6s) tersimpan di `localStorage` dan tidak ter-reset ke 15s saat halaman dimuat ulang. | ✅ PASSED |
| 8 | **Board Auto-Reshuffle** | Seluruh 16 kartu di papan terbuka namun Pemain & Musuh masih hidup. | Sistem secara otomatis mengocok 16 kartu tertutup baru tanpa mengalami macet/deadlock. | ✅ PASSED |
| 9 | **UI/UX Polish** | Melakukan serangan besar atau mencocokkan kartu. | Layar bergetar (*screen shake*), *floating text* damage muncul, dan efek *shimmer* pada kartu langka aktif. | ✅ PASSED |
| 10 | **Build Test** | Menjalankan perintah `npm run build`. | Kode terkompilasi bersih tanpa *syntax error* atau *broken import*. | ✅ PASSED |

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
Terminal akan menampilkan alamat URL lokal (biasanya `http://localhost:5173`). Buka browser Anda dan akses alamat tersebut.

---

## 3. Skenario Uji Coba Penanganan Bug

1. **Uji Coba Persistence Timer & Turn (Page Refresh Test):**
   - Saat giliran Anda dan timer berada di angka (misal `7s`), lakukan refresh halaman (F5).
   - Perhatikan bahwa giliran tetap `Giliran Anda` dan timer melanjutkan hitungan mundur dari `7s` (tidak ter-reset ke 15s).

2. **Uji Coba Auto-Reshuffle Papan Habis (Deadlock Safety Test):**
   - Buka seluruh pasangan kartu di Stage 2 hingga 16 kartu terbuka semua saat musuh masih memiliki HP.
   - Perhatikan teks `🔄 Ronde Baru! Papan Direset` muncul dan 16 kartu tertutup baru dikocok otomatis tanpa macet.
