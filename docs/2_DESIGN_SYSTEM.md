# Design System & UI/UX Guidelines: Memory Card Battle

## 1. Tema Visual Utama: Cyberfantasy
**Cyberfantasy** adalah perpaduan desain elegan, penuh ornamen budaya fantasi (ukiran magis, motif rune, kemewahan arsitektur kerajaan modern), dengan efek pencahayaan futuristik (neon, partikel cahaya, hologram). 

- **Warna Dasar (Backgrounds):** Gelap gulita (Hitam/Abyss) dengan gradasi warna malam (Midnight Blue atau Deep Purple) untuk menonjolkan pencahayaan UI.
- **Warna Aksen (Neon/Glow):**
  - HP Pemain (Sehat): Emerald Green Glowing.
  - HP Pemain (Sekarat): Crimson Red berkedip.
  - Elemen UI Aktif: Cyan atau Gold bersinar.
- **Tekstur & Material (UI Pro Max):**
  - Menggunakan efek **Glassmorphism** (Semi-transparan, dengan *backdrop-blur* 10px-20px) pada modal, panel status, dan punggung kartu.
  - Border tipis bercahaya di sekitar panel (Border 1px solid rgba(255, 255, 255, 0.1) dengan *box-shadow* tipis).

## 2. Ilustrasi & Desain Kartu (Card Design)
Kartu adalah pusat dari visual game.
- **Punggung Kartu (Card Back):** Desain seragam dengan motif rune Cyberfantasy bercahaya. Memiliki lapisan *Glassmorphism* saat dilihat dari sudut tertentu.
- **Bagian Depan (Card Face):**
  - Setiap kartu (Pedang, Perisai, Ramuan, Debuff/Buff) memiliki **Ilustrasi Mewah**.
  - Frame kartu menyesuaikan **Rarity** (Common: Silver/Besi, Rare: Emas/Kuningan, Epic: Ungu menyala dengan animasi aura).
- **Animasi (Juiciness):**
  - 🔄 **Flip Animation:** Menggunakan CSS 3D transform (`rotateY`). Transisi harus *smooth* dengan durasi sekitar 0.4s - 0.6s dan *easing* `cubic-bezier`.
  - ✨ **Hover Effect:** Saat kursor (mouse) berada di atas kartu, kartu sedikit terangkat (`translateY`) dan memancarkan *glow* menyesuaikan warna punggung kartu.

## 3. Papan Permainan (Board UI)
- Papan diletakkan di tengah layar, menggunakan CSS Grid (`display: grid`) agar selalu responsif dari Desktop hingga Mobile.
- Terdapat ruang di sisi kiri (atau atas untuk mobile) untuk menaruh informasi HP Pemain dan Buff/Debuff aktif, dan sisi kanan (bawah) untuk Musuh.
- Efek latar belakang (Background Game) menampilkan gambar pemandangan Cyberfantasy (mis. kastil berteknologi tinggi di malam hari) yang diaplikasikan *overlay* gelap agar kartu tetap terlihat jelas (kontras).

## 4. Animasi Status & Pertarungan
- **Damage Taken (Menerima Serangan):**
  - *Screen Shake:* Layar bergetar (translasi X/Y secara cepat) selama 0.3s.
  - *Damage Text:* Angka damage (mis. -15) muncul melayang (*floating text*) di atas indikator HP dengan warna merah menyala, lalu perlahan menghilang.
- **Heal/Buff:**
  - Efek partikel naik atau kilauan cahaya hijau pada ikon karakter pemain.
  - *Floating text* warna hijau (mis. +10 HP).
- **Pity System Activation:** Saat HP pemain di bawah 50% dan mekanisme bantuan aktif, layar akan sedikit diredupkan dan *highlight* kartu bantuan akan bersinar emas secara dramatis.

## 5. Tipografi (Typography)
- **Heading/Judul (Stage, Nama Musuh):** Font Serif yang elegan atau Font beraksen futuristik (Misal: *Cinzel*, *Orbitron*, atau *Playfair Display* yang dimodifikasi).
- **Teks Deskripsi / Angka (HP, Damage):** Font Sans-serif yang mudah dibaca (Misal: *Inter*, *Roboto*, atau *Poppins*) dengan ketebalan yang tegas.

## 6. Feedback Visual & Aksesibilitas
- Status pemain (giliran siapa sekarang) harus ditandai dengan sangat jelas, misalnya menggunakan border bercahaya (*glowing frame*) pada panel pemain yang sedang mengambil giliran.
- Warna yang digunakan harus kontras. Meskipun banyak menggunakan efek *glow*, informasi penting seperti jumlah HP tidak boleh buram.
