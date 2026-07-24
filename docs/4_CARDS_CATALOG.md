# Dokumen Katalog Kartu (Card Database Catalog)
## Memory Card Battle - Cyberfantasy Edition

Dokumen ini berisi daftar lengkap 15 kartu yang ada di dalam game, mencakup statistik, efek, tingkat kelangkaan (rarity), dan gambar 3D artwork seragam.

---

## 1. Skema Kelangkaan (Rarity System)
- ⚪ **Common (Biasa):** Drop rate 60%. Efek standar (Cyber Dagger, Nano Barrier, Bio Nectar).
- 🔵 **Rare (Langka):** Drop rate 30%. Efek lebih kuat & spesifik (Plasma Blade, Quantum Piercer, Aura Shield, Cyber Elixir, Oracle Eye, Corrosive Virus).
- 🟣 **Epic (Sangat Langka):** Drop rate 10%. Efek dahsyat yang membalikkan keadaan (Aether Strike, Aegis Protocol, Phoenix Catalyst, Glitch Overlay, EMP Disrupter, Divine Wrath).

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
| `def_aegis` | **Aegis Protocol** | DEFENSE | Epic | **32 Block** | `/assets/cards/def_shield.png` |
| `heal_phoenix` | **Phoenix Catalyst** | HEAL | Epic | **35 HP Heal** | `/assets/cards/heal_potion.png` |
| `debuff_glitch` | **Glitch Overlay** | DEBUFF | Epic | **24 Damage** | `/assets/cards/debuff_virus.png` |
| `debuff_emp` | **EMP Disrupter** | DEBUFF | Epic | **28 Damage (Lumpuhkan Perisai)** | `/assets/cards/debuff_virus.png` |
| `pity_wrath` | **Divine Wrath** | ATTACK | Epic | **40 Damage + 15 Heal** | `/assets/cards/atk_plasma.png` |

---

## 3. Logika Progresi Loot & Kelengkapan Deck (Strict Non-Duplicate System)
1. **Pemain Mulai di Stage 1:** Memiliki 8 Kartu Starter di Deck. Sisa kartu katalog yang belum dimiliki = **7 Kartu**.
2. **Aturan Loot Strict:** Loot Modal **HANYA menawarkan kartu yang BELUM dimiliki** oleh pemain.
3. **Penyesuaian Jumlah Pilihan Loot:**
   - Kartu Belum Dimiliki >= 3 -> Menampilkan **3 Pilihan**.
   - Kartu Belum Dimiliki == 2 -> Menampilkan **2 Pilihan**.
   - Kartu Belum Dimiliki == 1 -> Menampilkan **1 Pilihan Terakhir**.
   - Kartu Belum Dimiliki == 0 -> Deck 100% Lengkap! Menampilkan **🎉 Bonus +50 HP Pemulihan Maksimal**.
4. **Target Stage Kelengkapan Deck:**
   Seluruh 15 kartu katalog berhasil terkumpul 100% lengkap pada penyelesaian **STAGE 7 CLEAR**.
