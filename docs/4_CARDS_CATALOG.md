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

## 3. Logika Progresi Loot & Pity System Bantuan Darurat (Risk vs Reward Trade-Off)
1. **Pemain Mulai di Stage 1:** Memiliki 8 Kartu Starter di Deck (Sisa 7 Kartu Katalog).
2. **Strict Non-Duplicate Loot:** Pilihan Loot HANYA menawarkan kartu yang BELUM ADA di Deck pemain.
3. **Pity System Bantuan Darurat (Opsi ke-4):**
   - Terpicu jika pemain kesulitan (`HP < 50%` ATAU `Mismatch Streak >= 3`).
   - Saat Pity Active, Loot Modal menawarkan **Opsi ke-4: `🚑 Bio-Shield Medkit`** (+35 HP & +25 Armor).
4. **Dilema Strategi Pemain (Risk vs Reward):**
   - **Pilih Kartu Baru (High Risk):** Deck bertambah 1 kartu baru (+1 katalog progress), namun pemain tidak dapat heal/armor ekstra.
   - **Pilih Bio-Shield Medkit (Safe Choice):** Pemain mendapatkan +35 HP & +25 Armor instant untuk bertahan hidup, namun **TIDAK MENDAPAT KARTU BARU (+0 katalog progress)**.
5. **Dampak terhadap Stage Kelengkapan Katalog:**
   - Jika pemain SELALU memilih Kartu Baru ➡️ Seluruh 15 Kartu Katalog terkumpul lengkap di **Stage 7 Clear**.
   - Jika pemain memilih Medkit Darurat 1x atau lebih ➡️ Target kelengkapan bergeser ke **Stage 8, 9, dst.**
