import { CARD_DATABASE } from './cardData';

/**
 * Menghasilkan 3 kartu Loot pilihan setelah pemain menyelesaikan sebuah Stage
 * Sesuai dengan persentase drop rate di 1_REQUIREMENTS.md:
 * - Common: 60%
 * - Rare: 30%
 * - Epic: 10%
 * Jika Pity System aktif (HP < 50% & Mismatch beruntun), tambahkan +25% chance untuk Rare/Epic.
 * 
 * @param {boolean} isPityActive - Apakah mekanisme Pity System terpicu
 * @returns {Array} 3 kartu hadiah acak
 */
export const generateLootChoices = (isPityActive = false) => {
  const choices = [];
  const usedIds = new Set();

  while (choices.length < 3) {
    const roll = Math.random(); // 0.0 - 1.0

    let targetRarity = 'common';
    
    if (isPityActive) {
      // Pity System: Boost peluang Rare (45%) dan Epic (35%)
      if (roll < 0.35) {
        targetRarity = 'epic';
      } else if (roll < 0.80) {
        targetRarity = 'rare';
      } else {
        targetRarity = 'common';
      }
    } else {
      // Normal Drop Rate
      if (roll < 0.10) {
        targetRarity = 'epic';
      } else if (roll < 0.40) { // 0.10 + 0.30 = 0.40
        targetRarity = 'rare';
      } else {
        targetRarity = 'common';
      }
    }

    // Filter kartu dari database berdasarkan rarity
    let pool = CARD_DATABASE.filter((c) => c.rarity === targetRarity && !usedIds.has(c.id));
    
    // Fallback jika pool kosong
    if (pool.length === 0) {
      pool = CARD_DATABASE.filter((c) => !usedIds.has(c.id));
    }

    const randomCard = pool[Math.floor(Math.random() * pool.length)];
    if (randomCard) {
      usedIds.add(randomCard.id);
      choices.push(randomCard);
    }
  }

  return choices;
};

/**
 * Menentukan statistik musuh dan AI berdasarkan level Stage
 * @param {number} stageLevel - Level stage saat ini (1, 2, 3, dst)
 */
export const getStageEnemyConfig = (stageLevel) => {
  if (stageLevel === 1) {
    return { name: 'Cyber Scout', hp: 70, maxHp: 70, difficulty: 'EASY', avatar: '🤖' };
  } else if (stageLevel === 2) {
    return { name: 'Cybergolem', hp: 90, maxHp: 90, difficulty: 'MEDIUM', avatar: '🦾' };
  } else if (stageLevel === 3) {
    return { name: 'Neon Spectre', hp: 110, maxHp: 110, difficulty: 'MEDIUM', avatar: '👻' };
  } else if (stageLevel === 4) {
    return { name: 'Aether Warlord', hp: 140, maxHp: 140, difficulty: 'HARD', avatar: '👹' };
  } else {
    // Stage 5+ Boss Fight
    return {
      name: `Abyss Omega (Boss Stage ${stageLevel})`,
      hp: 150 + (stageLevel - 5) * 30,
      maxHp: 150 + (stageLevel - 5) * 30,
      difficulty: 'HARD',
      avatar: '🐉'
    };
  }
};
