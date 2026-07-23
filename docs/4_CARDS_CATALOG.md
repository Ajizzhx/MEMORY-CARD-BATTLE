# Dokumen Katalog Kartu (Card Database Catalog)
## Memory Card Battle - Cyberfantasy Edition

Dokumen ini berisi daftar lengkap kartu yang ada di dalam game, mencakup statistik, efek, tingkat kelangkaan (rarity), dan elemen desain visualnya.

---

## 1. Skema Kelangkaan (Rarity System)
- ⚪ **Common (Biasa):** Drop rate 60%. Efek standar, bingkai berornamen Besi/Perak dengan pendaran putih lembut.
- 🔵 **Rare (Langka):** Drop rate 30%. Efek lebih kuat/memiliki kombinasi khusus, bingkai berornamen Emas/Cyber Cyan dengan pendaran biru bercahaya.
- 🟣 **Epic (Sangat Langka):** Drop rate 10%. Efek dahsyat yang bisa membalikkan keadaan, bingkai berornamen Neon Purple/Amethyst dengan efek kilauan emas.
- 🟡 **Pity / Legendary (Kartu Darurat):** Memicu saat HP < 50%. Memiliki desain bertema Kuno/Ancient Rune dengan pendaran keemasan yang mencolok.

---

## 2. Katalog Kartu Berdasarkan Kategori

### A. Kartu Serangan (Attack Cards) ⚔️
Kartu ini fokus pada pengurangan HP musuh secara langsung ketika pasangan kartu cocok.

| ID Kartu | Nama Kartu | Rarity | Efek Utama | Deskripsi Visual & Tema |
| :--- | :--- | :--- | :--- | :--- |
| `atk_dagger` | **Cyber Dagger** | Common | **8 Damage** | Pisau energi futuristik berukiran ukiran fantasi kuno. |
| `atk_plasma` | **Plasma Blade** | Rare | **18 Damage** | Pedang panjang menyala dengan aura cyan terang. |
| `atk_aether` | **Aether Strike** | Epic | **30 Damage** | Tombak cahaya kosmik yang membelah dimensi, memiliki efek partikel kilat. |
| `atk_vampire` | **Vampiric Katana** | Rare | **12 Damage + Heal 5 HP** | Pedang merah bersinar yang menyerap daya tahan musuh. |

---

### B. Kartu Pertahanan (Defense Cards) 🛡️
Kartu ini memberikan *Block/Armor* yang akan menahan serangan musuh di giliran berikutnya sebelum mengurangi HP asli.

| ID Kartu | Nama Kartu | Rarity | Efek Utama | Deskripsi Visual & Tema |
| :--- | :--- | :--- | :--- | :--- |
| `def_nano` | **Nano Barrier** | Common | **10 Block** | Perisai berupa matriks pola segi enam (hexagonal grid) tembus pandang. |
| `def_aura` | **Aura Shield** | Rare | **20 Block** | Perisai energi berwarna emas berhiaskan simbol rune pelindung. |
| `def_aegis` | **Aegis Protocol** | Epic | **35 Block** | Benteng kubah energi ungu dengan efek *Glassmorphism* tebal. |

---

### C. Kartu Pemulihan (Heal Cards) 🧪
Kartu untuk memulihkan HP pemain yang berkurang.

| ID Kartu | Nama Kartu | Rarity | Efek Utama | Deskripsi Visual & Tema |
| :--- | :--- | :--- | :--- | :--- |
| `heal_nectar` | **Bio Nectar** | Common | **Heal 10 HP** | Botol ramuan kaca bercahaya hijau neon. |
| `heal_elixir` | **Cyber Elixir** | Rare | **Heal 22 HP** | Kapsul cairan luminesens berarsitektur perak mewah. |
| `heal_phoenix` | **Phoenix Catalyst** | Epic | **Heal 35 HP** | Bulu burung phoenix emas dalam tabung stasis berapi. |

---

### D. Kartu Buff (Efek Positif) ⚡
Kartu taktis yang memberikan keuntungan manipulasi permainan atau penggandaan damage.

| ID Kartu | Nama Kartu | Rarity | Efek Utama | Deskripsi Visual & Tema |
| :--- | :--- | :--- | :--- | :--- |
| `buff_vision` | **Oracle Eye** | Rare | **Vision 3s** (Mengintip 2 kartu tertutup secara acak selama 3 detik). | Mata mekanis bercahaya biru dengan lingkaran rune yang berputar. |
| `buff_charge` | **Overcharge** | Epic | **Double Damage** (Serangan berikutnya menghasilkan 2x lipat Damage). | Inti energi neon kuning meluap yang mengeluarkan percikan listrik. |
| `buff_turn` | **Time Warp** | Epic | **Extra Turn** (Mendapatkan 1 kesempatan giliran tambahan secara instan). | Jam pasir hologram yang bergerak berlawanan arah jarum jam. |

---

### E. Kartu Debuff (Efek Negatif pada Musuh) ☠️
Kartu yang mengganggu giliran musuh atau memberikan damage secara berkala (DoT).

| ID Kartu | Nama Kartu | Rarity | Efek Utama | Deskripsi Visual & Tema |
| :--- | :--- | :--- | :--- | :--- |
| `debuff_jam` | **EMP Jammer** | Rare | **Memory Wipe** (Menghapus sebagian ingatan AI musuh untuk 1 turn). | Bom gelombang elektromagnetik hitam-cyan. |
| `debuff_poison` | **Corrosive Virus** | Rare | **Poison 5/Turn** (Musuh terkena 5 damage tiap giliran selama 3 turn). | Tengkorak bercahaya hijau racun berwujud matriks piksel. |
| `debuff_blind` | **Glitch Overlay** | Epic | **Blind AI** (AI dipaksa memilih kartu acak pada turn berikutnya). | Efek layar rusak (*glitch*) berwarna magenta-hitam. |

---

### F. Kartu Pity / Bantuan Darurat (Comeback Mechanics) 🌟
Kartu istimewa yang akan otomatis dimunculkan/ditingkatkan peluang ketersediaannya jika HP pemain **< 50%**.

| ID Kartu | Nama Kartu | Rarity | Efek Utama | Deskripsi Visual & Tema |
| :--- | :--- | :--- | :--- | :--- |
| `pity_reveal` | **Chronos Rewind** | Legendary | **Instant Match** (Otomatis membuka dan mencocokkan 1 pasang kartu Heal/Shield di papan). | Jam emas bertatahkan permata yang bersinar sangat terang. |
| `pity_nuke` | **Divine Wrath** | Legendary | **40 Damage + Heal 15 HP** | Pedang raksasa jatuh dari langit dengan pendaran cahaya suci Cyberfantasy. |

---

## 3. Integrasi Sistem Deck-Building & Stage Scaling
1. **Starter Deck (Stage 1):** 
   - 4 Pasang *Attack* (Cyber Dagger)
   - 2 Pasang *Defense* (Nano Barrier)
   - 2 Pasang *Heal* (Bio Nectar)
2. **Loot Selection (Setiap Stage Clear):**
   - Pemain memilih 1 dari 3 kartu pilihan untuk menggantikan atau menambah isi *deck* mereka di stage berikutnya.
