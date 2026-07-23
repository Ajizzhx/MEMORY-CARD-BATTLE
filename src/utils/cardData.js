// Database Kartu Lengkap berdasarkan 4_CARDS_CATALOG.md
export const CARD_DATABASE = [
  // --- COMMON (Tingkat Biasa) ---
  {
    id: 'atk_dagger',
    name: 'Cyber Dagger',
    type: 'ATTACK',
    rarity: 'common',
    value: 12,
    icon: '⚔️',
    description: 'Menyerang musuh sebesar 12 damage.',
    color: '#00f0ff'
  },
  {
    id: 'def_nano',
    name: 'Nano Barrier',
    type: 'DEFENSE',
    rarity: 'common',
    value: 10,
    icon: '🛡️',
    description: 'Memberikan 10 Armor/Block.',
    color: '#00ff88'
  },
  {
    id: 'heal_nectar',
    name: 'Bio Nectar',
    type: 'HEAL',
    rarity: 'common',
    value: 10,
    icon: '🧪',
    description: 'Memulihkan 10 HP.',
    color: '#00ffaa'
  },

  // --- RARE (Tingkat Langka) ---
  {
    id: 'atk_plasma',
    name: 'Plasma Blade',
    type: 'ATTACK',
    rarity: 'rare',
    value: 22,
    icon: '🗡️',
    description: 'Menyerang musuh sebesar 22 damage.',
    color: '#00c3ff'
  },
  {
    id: 'def_aura',
    name: 'Aura Shield',
    type: 'DEFENSE',
    rarity: 'rare',
    value: 18,
    icon: '🔰',
    description: 'Memberikan 18 Armor/Block.',
    color: '#ffd700'
  },
  {
    id: 'heal_elixir',
    name: 'Cyber Elixir',
    type: 'HEAL',
    rarity: 'rare',
    value: 20,
    icon: '💊',
    description: 'Memulihkan 20 HP.',
    color: '#a855f7'
  },
  {
    id: 'buff_vision',
    name: 'Oracle Eye',
    type: 'BUFF',
    rarity: 'rare',
    value: 0,
    icon: '👁️',
    description: 'Mengintip 2 kartu tertutup di papan.',
    color: '#3b82f6'
  },
  {
    id: 'debuff_poison',
    name: 'Corrosive Virus',
    type: 'DEBUFF',
    rarity: 'rare',
    value: 16,
    icon: '☠️',
    description: 'Virus mengikis HP musuh (16 Damage).',
    color: '#ef4444'
  },

  // --- EPIC (Tingkat Sangat Langka) ---
  {
    id: 'atk_aether',
    name: 'Aether Strike',
    type: 'ATTACK',
    rarity: 'epic',
    value: 30,
    icon: '🔱',
    description: 'Serangan tebasan kosmik sebesar 30 damage!',
    color: '#ec4899'
  },
  {
    id: 'def_aegis',
    name: 'Aegis Protocol',
    type: 'DEFENSE',
    rarity: 'epic',
    value: 32,
    icon: '🏰',
    description: 'Benteng energi kokoh sebesar 32 Armor!',
    color: '#8b5cf6'
  },
  {
    id: 'heal_phoenix',
    name: 'Phoenix Catalyst',
    type: 'HEAL',
    rarity: 'epic',
    value: 35,
    icon: '🔥',
    description: 'Pemulihan regenerasi besar 35 HP!',
    color: '#f97316'
  },
  {
    id: 'debuff_glitch',
    name: 'Glitch Overlay',
    type: 'DEBUFF',
    rarity: 'epic',
    value: 24,
    icon: '👾',
    description: 'Ganggui sistem musuh & berikan 24 Damage.',
    color: '#d946ef'
  },

  // --- LEGENDARY / PITY (Bantuan Darurat Kuno) ---
  {
    id: 'pity_wrath',
    name: 'Divine Wrath',
    type: 'ATTACK',
    rarity: 'epic',
    value: 40,
    icon: '⚡',
    description: 'Serangan petir suci 40 Damage + Heal 15 HP!',
    color: '#eab308'
  }
];

// Helper untuk menghasilkan starter board (16 kartu = 8 pasang)
export const generateStarterBoard = () => {
  const selectedTypes = CARD_DATABASE.slice(0, 8);
  const boardCards = [];
  selectedTypes.forEach((card) => {
    boardCards.push({
      uniqueId: `${card.id}-a-${Math.random()}`,
      pairId: card.id,
      ...card
    });
    boardCards.push({
      uniqueId: `${card.id}-b-${Math.random()}`,
      pairId: card.id,
      ...card
    });
  });

  for (let i = boardCards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [boardCards[i], boardCards[j]] = [boardCards[j], boardCards[i]];
  }

  return boardCards;
};
