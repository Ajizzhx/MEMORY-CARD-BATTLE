import { CARD_DATABASE } from './cardData';

/**
 * Objek Opsi Pity System Bantuan Darurat (Opsi ke-4 saat Pity Active & Kuota Masih Ada)
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

/** Batas maksimal kuota pemakaian Bantuan Darurat Medkit per perjalanan */
export const MAX_PITY_USES = 2;

/**
 * Menghasilkan pilihan kartu Loot setelah pemain menyelesaikan sebuah Stage
 * ATURAN STRICT & LIMITED PITY SYSTEM:
 * 1. HANYA menawarkan kartu yang BELUM ADA di Deck Pemain (Tanpa Duplikat!).
 * 2. Jika Pity System Aktif DAN Kuota Bantuan Darurat Masih Ada (>0) -> Tambahkan Opsi ke-4 "🚑 Bio-Shield Medkit"!
 * 3. Pemain diberikan batas maksimal 2x Kuota Bantuan Darurat sepanjang perjalanan.
 * 
 * @param {Array} playerDeck - Koleksi deck pemain saat ini
 * @param {boolean} isPityActive - Apakah mekanisme Pity System terpicu
 * @param {boolean} canUseEmergencyPity - Apakah kuota Bantuan Darurat masih tersedia (>0)
 * @returns {Array} Pilihan kartu hadiah acak + opsi Pity jika aktif & kuota ada
 */
export const generateLootChoices = (playerDeck = [], isPityActive = false, canUseEmergencyPity = true) => {
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

  // Jika Pity System Aktif DAN Kuota Bantuan Darurat Masih Ada -> Tambahkan Opsi ke-4 "Bio-Shield Medkit"!
  if (isPityActive && canUseEmergencyPity) {
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
    return { name: 'Cyber Scout', hp: 70, maxHp: 70, difficulty: 'EASY', avatar: '🤖', avatarImg: '/assets/avatars/avatar_scout.png' };
  } else if (stageLevel === 2) {
    return { name: 'Cybergolem', hp: 90, maxHp: 90, difficulty: 'MEDIUM', avatar: '🦾', avatarImg: '/assets/avatars/avatar_golem.png' };
  } else if (stageLevel === 3) {
    return { name: 'Neon Spectre', hp: 110, maxHp: 110, difficulty: 'MEDIUM', avatar: '👻', avatarImg: '/assets/avatars/avatar_spectre.png' };
  } else if (stageLevel === 4) {
    return { name: 'Aether Warlord', hp: 140, maxHp: 140, difficulty: 'HARD', avatar: '👹', avatarImg: '/assets/avatars/avatar_warlord.png' };
  } else {
    // Stage 5+ Boss Fight
    return {
      name: `Abyss Omega (Boss Stage ${stageLevel})`,
      hp: 150 + (stageLevel - 5) * 30,
      maxHp: 150 + (stageLevel - 5) * 30,
      difficulty: 'HARD',
      avatar: '🐉',
      avatarImg: '/assets/avatars/avatar_dragon.png'
    };
  }
};
