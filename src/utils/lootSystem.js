import { CARD_DATABASE } from './cardData';

/**
 * Objek Opsi Pity System Bantuan Darurat (Opsi ke-4 saat Pity Active)
 * Memberikan Pemulihan HP & Armor instant untuk keselamatan pemain (Risk vs Reward)
 */
export const PITY_EMERGENCY_OPTION = {
  id: 'pity_medkit_emergency',
  isEmergencyPity: true,
  name: 'Bio-Shield Medkit',
  type: 'EMERGENCY',
  rarity: 'pity',
  value: 35,
  blockValue: 25,
  icon: '🚑',
  img: null,
  description: 'Bantuan Darurat: +35 HP & +25 Armor instant! (Pilih ini untuk selamat, namun TIDAK mendapat kartu baru).',
  color: '#ff0055'
};

/**
 * Menghasilkan pilihan kartu Loot setelah pemain menyelesaikan sebuah Stage
 * ATURAN STRICT & PITY SYSTEM REVISED:
 * 1. HANYA menawarkan kartu yang BELUM ADA di Deck Pemain (Tanpa Duplikat!).
 * 2. Jika Pity System Aktif -> Tambahkan Opsi ke-4 "🚑 Bio-Shield Medkit" sebagai pilihan keselamatan!
 * 3. Pemain bebas memilih: High Risk (Kartu Baru) vs Safe Choice (Medkit Darurat).
 * 4. Jika memilih Medkit Darurat, target kelengkapan 15 kartu di Stage 7 akan bergeser mundur (Stage 8+).
 * 
 * @param {Array} playerDeck - Koleksi deck pemain saat ini
 * @param {boolean} isPityActive - Apakah mekanisme Pity System terpicu
 * @returns {Array} Pilihan kartu hadiah acak + opsi Pity jika aktif
 */
export const generateLootChoices = (playerDeck = [], isPityActive = false) => {
  const playerCardIds = new Set((playerDeck || []).map((c) => c.id));
  const unownedCards = CARD_DATABASE.filter((c) => !playerCardIds.has(c.id));

  // Jika seluruh 15 kartu katalog sudah terkumpul 100% di deck
  if (unownedCards.length === 0) {
    return [];
  }

  const targetCount = Math.min(3, unownedCards.length);
  const choices = [];
  const chosenIds = new Set();

  while (choices.length < targetCount) {
    const roll = Math.random();
    let targetRarity = 'common';

    if (isPityActive) {
      // Pity System: Peluang Rare (45%) dan Epic (35%)
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
      } else if (roll < 0.40) {
        targetRarity = 'rare';
      } else {
        targetRarity = 'common';
      }
    }

    // Filter kartu yang BELUM DIMILIKI berdasarkan rarity
    let pool = unownedCards.filter((c) => c.rarity === targetRarity && !chosenIds.has(c.id));

    // Fallback jika pool rarity tertentu habis di antara kartu unowned
    if (pool.length === 0) {
      pool = unownedCards.filter((c) => !chosenIds.has(c.id));
    }

    const randomCard = pool[Math.floor(Math.random() * pool.length)];
    if (randomCard) {
      chosenIds.add(randomCard.id);
      choices.push(randomCard);
    }
  }

  // Jika Pity System Aktif -> Tambahkan Opsi ke-4 "Bio-Shield Medkit" untuk Keselamatan Pemain!
  if (isPityActive) {
    choices.push(PITY_EMERGENCY_OPTION);
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
