// Database Kartu berdasarkan 4_CARDS_CATALOG.md
export const CARD_DATABASE = [
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
    id: 'heal_nectar',
    name: 'Bio Nectar',
    type: 'HEAL',
    rarity: 'common',
    value: 10,
    icon: '🧪',
    description: 'Memulihkan 10 HP.',
    color: '#00ffaa'
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
    description: 'Mengintip kartu selama beberapa detik.',
    color: '#3b82f6'
  },
  {
    id: 'debuff_poison',
    name: 'Corrosive Virus',
    type: 'DEBUFF',
    rarity: 'rare',
    value: 16,
    icon: '☠️',
    description: 'Memberikan efek racun pada musuh (16 Damage).',
    color: '#ef4444'
  }
];

// Helper untuk menghasilkan starter deck (16 kartu = 8 pasang)
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
