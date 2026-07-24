# Dokumen Katalog Kartu (Card Database Catalog)
## Memory Card Battle - Cyberfantasy Edition

Dokumen ini berisi daftar lengkap 15 kartu yang ada di dalam game, mencakup statistik, efek, tingkat kelangkaan (rarity), dan gambar 3D artwork seragam.

---

## 1. Skema Kelangkaan (Rarity System)
- ⚪ **Common (Biasa):** Drop rate 60%. Efek standar (Cyber Dagger, Nano Barrier, Bio Nectar).
- 🔵 **Rare (Langka):** Drop rate 30%. Efek lebih kuat & spesifik (Plasma Blade, Quantum Piercer, Aura Shield, Cyber Elixir, Oracle Eye, Corrosive Virus).
- 🟣 **Epic (Sangat Langka):** Drop rate 10%. Efek dahsyat yang membalikkan keadaan (Aether Strike, Aegis Protocol, Phoenix Catalyst, Glitch Overlay, EMP Disrupter, Divine Wrath).
- 🚑 **Pity Aid (Bantuan Darurat):** Opsi Pilihan Ke-4 khusus yang aktif jika pemain mengalami krisis HP (< 50%) & Mismatch Streak (>= 3).

---

## 2. Katalog Lengkap 15 Kartu Game (100% 3D Cyberfantasy Artwork)

| ID Kartu | Nama Kartu | Kategori | Rarity | Efek Utama | Gambar Asset 3D |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `atk_dagger` | **Cyber Dagger** | ATTACK | Common | **12 Damage** | `/assets/cards/atk_dagger.png` |
| `def_nano` | **Nano Barrier** | DEFENSE | Common | **10 Block** | `/assets/cards/def_nano.png` |
| `heal_nectar` | **Bio Nectar** | HEAL | Common | **10 HP Heal** | `/assets/cards/heal_potion.png` |
| `atk_plasma` | **Plasma Blade** | ATTACK | Rare | **22 Damage** | `/assets/cards/atk_plasma.png` |
| `atk_pierce` | **Quantum Piercer** | ATTACK | Rare | **18 Damage MENEMBUS Armor** | `/assets/cards/atk_dagger.png` |
| `def_aura` | **Aura Shield** | DEFENSE | Rare | **18 Block** | `/assets/cards/def_shield.png` |
| `heal_elixir` | **Cyber Elixir** | HEAL | Rare | **20 HP Heal** | `/assets/cards/heal_potion.png` |
| `buff_vision` | **Oracle Eye** | BUFF | Rare | **Scan 2 Kartu** | `/assets/cards/buff_eye.png` |
| `debuff_poison` | **Corrosive Virus** | DEBUFF | Rare | **16 Damage** | `/assets/cards/debuff_virus.png` |
| `atk_aether` | **Aether Strike** | ATTACK | Epic | **30 Damage** | `/assets/cards/atk_plasma.png` |
| `def_aegis` | **Aegis Protocol** | EPIC | Epic | **32 Block** | `/assets/cards/def_shield.png` |
| `heal_phoenix` | **Phoenix Catalyst** | HEAL | Epic | **35 HP Heal** | `/assets/cards/heal_potion.png` |
| `debuff_glitch` | **Glitch Overlay** | DEBUFF | Epic | **24 Damage** | `/assets/cards/debuff_virus.png` |
| `debuff_emp` | **EMP Disrupter** | DEBUFF | Epic | **28 Damage (Lumpuhkan Perisai)** | `/assets/cards/debuff_virus.png` |
| `pity_wrath` | **Divine Wrath** | ATTACK | Epic | **40 Damage + 15 Heal** | `/assets/cards/atk_plasma.png` |

---

## 3. Logika Progresi Loot & Mekanik Pity Emergency Aid (Risk vs Reward)

1. **Pemain Mulai di Stage 1:** Memiliki 8 Kartu Starter di Deck. Sisa kartu katalog yang belum dimiliki = **7 Kartu**.
2. **Aturan Loot Strict:** Loot Modal **HANYA menawarkan kartu yang BELUM dimiliki** oleh pemain.
3. **Mekanisme Pity System (Pilihan Ke-4 Bantuan Darurat):**
   - **Terpicu Saat:** HP Pemain < 50% DAN Mismatch Streak >= 3 pada stage tersebut.
   - **Tampilan Loot:** Menyediakan **Pilihan Ke-4: 🚑 Emergency Aid (+35 HP & +20 Armor)**.
   - **Dilema Takstis (Risk vs Reward):**
     - Jika pemain memilih **Emergency Aid**: Pemain memulihkan 35 HP & 20 Armor untuk bertahan hidup, TETAPI tidak mengambil kartu baru. Progresi kartu katalog tertunda!
     - Jika pemain memilih **Kartu Loot Baru**: Pemain mengembangkan deck (High Risk), tetapi tidak mendapat pemulihan darurat.
4. **Target Stage Kelengkapan Deck:**
   - **Skenario Tanpa Pity Aid:** Kelengkapan 15 kartu tercapai di **Stage 7 Clear**.
   - **Skenario Menggunakan Pity Aid:** Setiap kali Pity Aid diambil, target kelengkapan kartu bergeser ke **Stage 8, Stage 9, dst**, tergantung berapa kali pemain memilih untuk menyelamatkan diri.
