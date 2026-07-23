
# Development Roadmap: Memory Card Battle

Roadmap ini membagi pengembangan proyek menjadi langkah-langkah yang jelas, dari inisiasi hingga *deployment* ke server langsung.

## Fase 1: Setup Proyek & Infrastruktur (Hari 1)
- [x] Inisialisasi proyek React menggunakan Vite di direktori `C:\Users\adovan\Documents\belajar_coding\kartu_ingatan`.
- [x] Instalasi dependensi (opsional jika menggunakan Zustand/Redux atau hanya React Context).
- [x] Penyiapan struktur folder (Komponen, Context, Utils, Assets).
- [x] Konfigurasi arsitektur CSS (Variabel tema dasar, warna Cyberfantasy).

## Fase 2: Prototipe Core Loop Papan Permainan (Hari 2-3)
- [x] Membuat UI Papan Kartu Grid yang responsif.
- [x] Mengimplementasikan kelas dan komponen Kartu (Bagian depan, belakang, animasi *flip* 3D).
- [x] Logika Dasar: Membuka kartu maksimal 2 buah per giliran.
- [x] Logika *Match* (Cocok) vs *Mismatch* (Tidak Cocok) menggunakan state.
- [x] Transisi waktu tunda (jeda saat *mismatch* sebelum kartu ditutup kembali).

## Fase 3: Integrasi Sistem HP, Turn & Tipe Kartu (Hari 4-5)
- [x] Menambahkan UI indikator HP untuk Pemain dan Musuh.
- [x] Memisahkan logika kartu ke dalam tipe: Attack, Defense, Heal.
- [x] Integrasi Tipe Baru: Menambahkan logika **Buff** dan **Debuff**.
- [x] Menyambungkan logika *Match* agar memberikan *damage* ke HP, atau menambah HP.
- [x] Logika Giliran (Turn System): Perpindahan antara Pemain dan Musuh setelah aksi.

## Fase 4: Kecerdasan Buatan (AI) Musuh (Hari 6)
- [x] Membuat logika AI yang bisa memilih 2 kartu acak.
- [x] Mengimplementasikan *Memori AI*: Sebuah state array di sisi musuh untuk merekam koordinat kartu yang pernah terbuka.
- [x] Mengatur tingkat probabilitas AI (mis. Stage rendah AI lambat belajar, Stage tinggi AI mengingat 80%).

## Fase 5: Sistem Roguelike & Progresi Stage (Hari 7-8)
- [x] Logika Kemenangan/Kekalahan (Transisi antar layar/modal Game Over / Stage Cleared).
- [x] Sistem Drop Loot (*Deck Building*): Implementasi persentase drop (Common 60%, Rare 30%, Epic 10%). UI untuk pemain memilih hadiah kartu baru.
- [x] **Pity System:** Deteksi kondisi jika HP < 50% dan banyak *mismatch* beruntun -> Memicu kartu bantuan / peningkatan persentase loot.
- [x] Perpindahan Stage (Scaling HP musuh & kesulitan).

## Fase 6: Polish UI/UX "Pro Max" (Hari 9)
- [x] Menerapkan *Glassmorphism* dan animasi level tinggi secara menyeluruh.
- [x] Mengaplikasikan gambar latar belakang Cyberfantasy dan aset ilustrasi kartu (menggunakan generator aset AI atau *placeholder* cantik).
- [x] Menambahkan *floating text* damage, efek layar bergetar (*screen shake*), dan kilauan kartu langka.
- [x] Evaluasi responsivitas di layar Mobile dan Desktop.

## Fase 7: Pengujian (Testing) & Debugging (Hari 10)
- [x] Pengujian Gameplay (Balance testing HP, Damage, Probabilitas AI).
- [x] Mencari dan memperbaiki *bug* logika state (mis. kartu menumpuk, giliran error).

## Fase 8: Deployment (Hari 11)
- [x] Mempersiapkan versi *Build* produksi (`npm run build`).
- [x] Memastikan tidak ada *asset* yang *broken link*.
- [x] Fitur Tambahan Deployment: Leaderboard Sesi, Input Nama, Katalog Kartu, & Turn Timer 15s.
- [x] Finalisasi dokumentasi repository.
