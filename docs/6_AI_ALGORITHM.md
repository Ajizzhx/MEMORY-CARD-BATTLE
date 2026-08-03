# AI Memory Engine & Decision Algorithm Documentation

Dokumentasi teknis algoritma Kecerdasan Buatan (*AI Memory Engine*) pada game Memory Card Battle.

---

## 1. Ringkasan Arsitektur

AI musuh bekerja menggunakan sistem **Probabilistic Memory & Tree Decision**. AI tidak melakukan kecurangan (*cheating*) dengan membaca state papan secara langsung, melainkan menyimulasikan ingatan manusia berdasarkan tingkat akurasi (*memory accuracy*) yang disesuaikan dengan tingkat kesulitan (Stage Scaling).

---

## 2. Tingkat Kesulitan (Difficulty Levels)

Tingkat akurasi ingatan AI terbagi menjadi 3 tingkatan utama (`AI_DIFFICULTY_LEVELS`):

| Tingkat Kesulitan | Parameter (`memoryAccuracy`) | Deskripsi Peluang Ingatan |
| :--- | :--- | :--- |
| **Mudah (EASY)** | `0.35` (35%) | AI sering lupa posisi kartu yang sudah terbuka. |
| **Sedang (MEDIUM)** | `0.65` (65%) | AI mengingat mayoritas kartu, namun masih bisa meleset. |
| **Tinggi (HARD)** | `0.88` (88%) | AI hampir selalu mengingat setiap kartu yang terbuka. |

---

## 3. Alur Kerja Logika Utama

### A. Perekaman Memori (`updateAiMemory`)
Setiap kali ada kartu yang terbuka di papan (baik diputar oleh Pemain maupun AI), fungsi `updateAiMemory` dipanggil.

```
[Kartu Terbuka] -> Loop setiap kartu -> Generate nilai random (0 - 1)
                       |
                       +--> Jika (random <= accuracy) -> Simpan { uniqueId: pairId } ke memori AI
                       +--> Jika (random > accuracy)  -> Abaikan (AI lupa kartu tersebut)
```

### B. Pohon Keputusan Ambil Kartu (`getAiCardChoices`)
Saat giliran AI tiba, AI menentukan 2 kartu yang akan diputar melalui urutan hierarki keputusan berikut:

```
                  [Mulai Turn AI]
                         |
             Is EMP Jammer Active?
             /                   \
        (Ya) /                     \ (Tidak)
            v                       v
[Pilih 2 Kartu Acak]      Cek Pasangan Utuh di Memori
  (Amnesia Total)                   |
                     +--------------+--------------+
                     |                             |
             (Ada & Lolos Akurasi)       (Tidak Ada / Gagal)
                     v                             v
           [Pilih Pasangan Pasti]       Pilih Kartu 1 Secara Acak
                                                   |
                                       Pasangan Kartu 1 Ada di Memori?
                                       /                           \
                                  (Ya & Lolos)                 (Tidak)
                                      v                           v
                           [Pilih Kartu 2 Pasti]       [Pilih Kartu 2 Acak]
```

---

## 4. Rincian Strategi Algoritma

1. **Status Debuff / EMP Effect**
   - Ketika efek kartu `EMP Disrupter` aktif (atau flag `isJammerActive = true`), seluruh memori AI diacak/direset.
   - AI memilih 2 indeks kartu secara acak murni dari sisa kartu di papan (`availableCards`).

2. **Strategi 1: Known Pair Matching**
   - AI memindai isi memorinya (`aiMemory`).
   - Jika AI mencatat 2 kartu berbeda yang memiliki `pairId` sama dan lolos uji akurasi (`Math.random() <= accuracy`), AI langsung memilih 2 kartu tersebut.

3. **Strategi 2: Single Known Match**
   - AI memilih **Kartu 1** secara acak.
   - AI memeriksa apakah pasangan dari **Kartu 1** sudah ada di memorinya.
   - Jika ada dan lolos uji akurasi (`Math.random() <= accuracy`), AI memilih kartu memori tersebut sebagai **Kartu 2**.

4. **Strategi 3: Random Selection (Blind Guess)**
   - Jika Strategi 1 dan 2 gagal/tidak terpenuhi, AI memilih **Kartu 2** secara acak dari sisa kartu di papan (`remainingCards`).

---

## 5. Lokasi Kode Sumber

- **Definisi & Logika AI**: `src/utils/aiLogic.js`
- **Eksekusi State Game**: `src/components/GameBoard/GameBoard.jsx`
