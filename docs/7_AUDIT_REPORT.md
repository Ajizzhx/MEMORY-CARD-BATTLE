# Hasil Audit Keseluruhan Codebase & Status Perbaikan
**Proyek:** Memory Card Battle

Dokumen ini berisi semua temuan dari audit codebase komprehensif pada game ini, meliputi aspek Keamanan (Security), Logika/Algoritma, Arsitektur, dan UI/UX. Item yang diberi tanda centang (✅) telah diperbaiki.

---

## 🔴 CRITICAL (Temuan Sangat Krusial)

- [✅] **Leaderboard Score Spoofing — Validasi Payload & Sanitasi Input**
  - **File:** `src/utils/leaderboardService.js`
  - **Deskripsi:** Score dikirim langsung dari client ke Supabase REST API.
  - **Fix:** Menambahkan sanitasi string input, sanitasi nilai angka (stage >= 1, matches >= 0), dan pengecekan kelayakan skor sebelum dikirim ke database.
- [✅] **Client-Side Leaderboard DELETE**
  - **File:** `src/utils/leaderboardService.js`
  - **Deskripsi:** Terdapat fungsi `DELETE` melalui endpoint yang dipanggil sisi client untuk menghapus baris lama, ini membahayakan data karena anon role memiliki hak hapus.
  - **Fix:** Fungsi client-side DELETE (`pruneExtraDatabaseScores`) sudah dihapus total dari kode client. Pembersihan kini bergantung 100% pada PostgreSQL Trigger di database Supabase.
- [✅] **God Component — GameBoard.jsx**
  - **File:** `src/components/GameBoard/GameBoard.jsx`
  - **Deskripsi:** Seluruh sistem state dalam satu file komponen besar.
  - **Fix:** Struktur logika diperbaiki, un-nesting state setters, dan menguraikan ketergantungan side-effects.
- [✅] **Logika DEBUFF yang Merusak Balance Permainan**
  - **File:** `src/components/GameBoard/GameBoard.jsx`
  - **Deskripsi:** Kartu DEBUFF bypass armor (langsung potong HP). Saat ini dikombinasikan dengan modifier boss, damage bisa instan membunuh player.
  - **Fix:** Kartu DEBUFF (`Corrosive Virus` & `Glitch Overlay`) kini dikurangi armor/perisai terlebih dahulu sebelum memotong HP (kecuali EMP Disrupter yang secara khusus membakar armor ke 0).
- [✅] **Infinite Loop pada Loot System**
  - **File:** `src/utils/lootSystem.js`
  - **Deskripsi:** Jika sisa kartu yang tidak dimiliki kurang dari 3, fungsi pembagian kartu bonus akan masuk ke infinite loop dan membekukan game.
  - **Fix:** Menambahkan guard clause `if (pool.length === 0) break;` di dalam `generateLootChoices()`.

---

## 🟠 HIGH (Risiko Tinggi)

- [✅] **API Key Terekspos di `.env`**
  - **File:** `.env.example` (sebelumnya `.env`)
  - **Deskripsi:** Ditemukan real API key yang tidak terpakai, dan Supabase URL + Anon Key.
  - **Fix:** Key rahasia telah dihapus dan file diganti menjadi `.env.example` dengan placeholder aman. `.env` diabaikan oleh `.gitignore`.
- [✅] **Stale Closure Bug di Turn Timer (`handleTurnTimeout`)**
  - **File:** `src/components/GameBoard/GameBoard.jsx`
  - **Deskripsi:** Pemanggilan `setTimeout` pada turn timer mengambil `currentTurn` versi lawas sehingga menghasilkan output status giliran yang tidak sinkron.
  - **Fix:** Penangan waktu diisolasi dan di-handle dengan pengubah state yang aman.
- [✅] **Potensi Serangan XSS pada Nama Player**
  - **File:** `src/components/NameModal/NameModal.jsx` & `src/utils/leaderboardService.js`
  - **Deskripsi:** Tidak ada filter atau validasi pada saat user memasukkan nama sebelum masuk ke localstorage/leaderboard.
  - **Fix:** Diberikan regex sanitasi `nameInput.replace(/[<>&"'/]/g, '').trim()` untuk mencegah inject elemen HTML.
- [✅] **Nested State Setter Anti-Pattern**
  - **File:** `src/components/GameBoard/GameBoard.jsx`
  - **Deskripsi:** Pemanggilan fungsi `setPlayer` di dalam `setEnemy` (saling bersarang) dapat tidak sinkron.
  - **Fix:** Pemanggilan state updater dipisahkan secara terisolasi tanpa nesting.

---

## 🟡 MEDIUM & 🟢 LOW (Isolasi Bug Ringan & UI)

- [✅] **Exploitable Pity System:** Kuota Pity System Medkit Darurat dibatasi maksimal 2x pemakaian per perjalanan.
- [✅] **Oracle Eye Buff Predictability:** `case 'BUFF'` diacak secara dinamis (`unmatched.sort(() => 0.5 - Math.random()).slice(0, 2)`) sehingga tidak selalu menampilkan indeks 0 dan 1.
- [✅] **Duplicated i18n Translation Keys:** Kunci dwibahasa di `i18n.js` sudah disinkronkan dan dirapikan.

---

*Laporan disatukan oleh agen per 4 Agustus 2026. File hasil ini ditulis ulang untuk referensi iterasi pengembangan selanjutnya.*