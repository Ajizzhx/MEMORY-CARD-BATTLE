/**
 * Logika Kecerdasan Buatan (AI Memory Engine)
 * Mengatur ingatan AI musuh berdasarkan tingkat kesulitan (Stage Scaling)
 */

export const AI_DIFFICULTY_LEVELS = {
  EASY: { name: 'Mudah', memoryAccuracy: 0.35 },      // 35% Ingatan
  MEDIUM: { name: 'Sedang', memoryAccuracy: 0.65 },    // 65% Ingatan
  HARD: { name: 'Tinggi', memoryAccuracy: 0.88 }       // 88% Ingatan
};

/**
 * Memperbarui memori AI ketika ada kartu yang terbuka di papan
 * @param {Object} currentMemory - Object memori AI saat ini { uniqueId: pairId }
 * @param {Array} flippedCards - Kartu-kartu yang baru saja terbuka
 * @param {number} accuracy - Probabilitas AI berhasil mengingat (0 - 1)
 * @returns {Object} Memori AI yang diperbarui
 */
export const updateAiMemory = (currentMemory, flippedCards, accuracy) => {
  const updatedMemory = { ...currentMemory };

  flippedCards.forEach((card) => {
    // Cek apakah AI berhasil merekam kartu ini ke memorinya berdasarkan akurasi
    if (Math.random() <= accuracy) {
      updatedMemory[card.uniqueId] = card.pairId;
    }
  });

  return updatedMemory;
};

/**
 * Keputusan AI untuk memilih 2 kartu di papan
 * @param {Array} cards - Seluruh kartu di papan
 * @param {Array} matchedCardIds - ID pasangan kartu yang sudah cocok
 * @param {Object} aiMemory - Memori AI saat ini
 * @param {number} accuracy - Probabilitas keberhasilan ingatan
 * @param {boolean} isJammerActive - Apakah musuh kena debuff EMP Jammer (memori diacak)
 * @returns {Array} 2 objek kartu yang dipilih oleh AI
 */
export const getAiCardChoices = (cards, matchedCardIds, aiMemory, accuracy, isJammerActive = false) => {
  // Ambil semua kartu yang belum cocok di papan
  const availableCards = cards.filter((c) => !matchedCardIds.includes(c.pairId));

  if (availableCards.length < 2) return [];

  // Jika EMP Jammer aktif, AI lupa total (pilih 100% acak)
  if (isJammerActive) {
    const idx1 = Math.floor(Math.random() * availableCards.length);
    let idx2 = Math.floor(Math.random() * availableCards.length);
    while (idx2 === idx1) {
      idx2 = Math.floor(Math.random() * availableCards.length);
    }
    return [availableCards[idx1], availableCards[idx2]];
  }

  // 1. STRATEGI 1: Cek apakah di memori AI ada 2 kartu yang diketahui PASANGAN COCOK
  const memoryPairs = {}; // pairId -> array of uniqueIds in memory
  Object.keys(aiMemory).forEach((uniqueId) => {
    // Pastikan kartu di memori belum terpasang di papan
    const cardObj = availableCards.find((c) => c.uniqueId === uniqueId);
    if (cardObj) {
      const pairId = cardObj.pairId;
      if (!memoryPairs[pairId]) memoryPairs[pairId] = [];
      memoryPairs[pairId].push(cardObj);
    }
  });

  // Cari apakah ada pairId yang punya 2 kartu di memori
  let knownMatchPairId = null;
  Object.keys(memoryPairs).forEach((pairId) => {
    if (memoryPairs[pairId].length === 2) {
      knownMatchPairId = pairId;
    }
  });

  // Jika AI ingat ada 2 kartu cocok dan lolos uji akurasi -> Pilih pasangan itu!
  if (knownMatchPairId && Math.random() <= accuracy) {
    return memoryPairs[knownMatchPairId];
  }

  // 2. STRATEGI 2: Jika tidak tahu pasangan pasti, pilih Kartu 1 secara acak
  const card1Index = Math.floor(Math.random() * availableCards.length);
  const card1 = availableCards[card1Index];

  // Cek apakah pasangan dari Card 1 ada di memori AI
  const rememberedPairCard = availableCards.find(
    (c) => c.uniqueId !== card1.uniqueId && c.pairId === card1.pairId && aiMemory[c.uniqueId]
  );

  // Jika ada pasangan Card 1 di memori dan lolos uji akurasi -> Pilih kartu tersebut sebagai Card 2!
  if (rememberedPairCard && Math.random() <= accuracy) {
    return [card1, rememberedPairCard];
  }

  // 3. STRATEGI 3: Jika tidak tahu pasangan Card 1, pilih Card 2 secara acak
  const remainingCards = availableCards.filter((c) => c.uniqueId !== card1.uniqueId);
  const card2Index = Math.floor(Math.random() * remainingCards.length);
  const card2 = remainingCards[card2Index];

  return [card1, card2];
};
