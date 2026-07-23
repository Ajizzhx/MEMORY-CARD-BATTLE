# Project Requirements: Memory Card Battle

## 1. Konsep Utama
- **Genre:** Memory Card Game + RPG Turn-Based Battle + Roguelike.
- **Platform:** Web Browser (Desktop & Mobile Responsive).
- **Tech Stack:** React.js + Vite, Vanilla CSS / CSS Modules.
- **Tema Visual:** **Cyberfantasy** (Estetika berbudaya yang memadukan dunia fantasi modern dengan elemen futuristik/cyber. Desain yang mewah, memanjakan mata, dengan banyak ilustrasi detail pada setiap kartu dan latar belakang).

## 2. Mekanik Gameplay & Peraturan
### A. Papan Permainan (Board)
- **Sistem Grid:** Papan terdiri dari kisi-kisi kartu tertutup (misal: 4x4 untuk stage awal, berukuran dinamis seiring level).
- **UI/UX Papan:** Harus sangat responsif, memiliki efek animasi 3D *flip* yang mulus saat dibuka, dan efek pendaran *glow* atau hologram ala Cyberfantasy.
- **HP System:** Pemain dan musuh (AI) masing-masing memiliki indikator HP yang divisualisasikan dengan animasi interaktif (mis. screen shake saat berkurang).

### B. Tipe-Tipe Kartu & Efek
Setiap kartu memberikan efek instan apabila pemain/musuh berhasil membuka 2 kartu yang sama:
1. ⚔️ **Attack (Serangan):** Mengurangi HP lawan.
2. 🛡️ **Defense (Bertahan):** Mendapatkan Block/Armor untuk menahan damage dari serangan lawan di giliran selanjutnya.
3. 🧪 **Heal (Pemulihan):** Memulihkan HP diri sendiri.
4. ⚡ **Buff:** Memberikan efek positif sementara (misal: "Vision" - dapat mengintip 2 kartu acak, atau "Double Damage" untuk serangan berikutnya).
5. ☠️ **Debuff:** Memberikan efek negatif pada lawan (misal: "Blind" - menyembunyikan sebagian kartu lawan, atau "Poison" - mengurangi HP lawan setiap giliran).

### C. Sistem Giliran (Turn System)
- Pemain atau Musuh bergantian memilih 2 kartu untuk dibuka.
- Jika 2 kartu **cocok (match)**: Efek kartu aktif, kartu tersebut menghilang dari papan (atau tetap terbuka), dan pemain/musuh yang mencocokkan mendapat kesempatan satu kali tambahan (atau langsung pindah giliran, dapat disesuaikan pada balancing).
- Jika 2 kartu **tidak cocok (mismatch)**: Kartu ditutup kembali dan giliran langsung berpindah ke lawan.

### D. Sistem AI Musuh
- **Tingkat Kesulitan (Scaling):** Semakin tinggi Stage, musuh semakin cerdas. AI akan "mengingat" sebagian kartu yang telah dibuka pada giliran sebelumnya.
- Probabilitas ingatan AI:
  - *Stage Awal:* AI mudah lupa (20% kemungkinan mengingat kartu).
  - *Stage Lanjut:* AI memiliki memori tajam (80% kemungkinan mengingat kartu yang sudah terlihat).

### E. Progresi & Drop System (Loot)
Setiap pemain menyelesaikan sebuah pertarungan (Stage Cleared), mereka akan mendapatkan Loot berupa kartu baru untuk dimasukkan ke *deck* mereka di stage berikutnya.
- **Rarity Kartu:**
  - *Common:* 60% Chance (Efek standar).
  - *Rare:* 30% Chance (Efek lebih kuat).
  - *Epic:* 10% Chance (Efek luar biasa, ilustrasi sangat mewah).
- **Pity System / Comeback Mechanic:**
  - Jika HP pemain **berada di bawah 50%** dan telah melakukan banyak kesalahan (*mismatch* beruntun) dalam stage, probabilitas kemunculan kartu Rare/Epic sebagai hadiah kemenangan *ditingkatkan sebesar 25%*.
  - Di dalam pertempuran itu sendiri, jika HP kritis, pemain akan diberikan 1 kartu bantuan (misal: Kartu yang langsung mengungkap letak 1 pasangan kartu Heal/Buff).

## 3. Kondisi Menang / Kalah & Leaderboard
- **Menang (Stage Clear):** HP musuh mencapai 0. Pemain melanjutkan ke stage berikutnya, mendapatkan Loot, dan sisa HP dibawa ke stage selanjutnya.
- **Kalah (Game Over / Permadeath):** HP pemain mencapai 0. Progres pemain di-reset kembali ke Stage 1. Skor (Stage Tertinggi + Total Match) akan dicatat ke dalam Leaderboard Sesi.
- **Leaderboard (Session-Based):** 
  - Sebelum memulai permainan, pemain memasukkan nama.
  - Skor pemain (Nama, Stage Tertinggi, Total Match) dicatat dalam tabel Leaderboard.
  - Tersedia tombol/modal untuk melihat daftar *High Scores* pemain.

## 4. Fitur Tambahan & UX
- **Katalog Kartu (Card Compendium/Encyclopedia):** Fitur modal/halaman khusus untuk melihat seluruh daftar kartu yang ada di game (Attack, Defense, Heal, Buff, Debuff, Legendary) beserta visual, statistik, dan deskripsinya untuk pemain baru.
- **Batas Waktu Berpikir (Turn Timer):** Memiliki timer hitung mundur 15 detik pada giliran pemain. Jika waktu habis sebelum memilih 2 kartu, giliran otomatis hangus dan berpindah ke musuh.
