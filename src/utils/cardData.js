// Database Kartu Lengkap (100% Unified 3D Cyberfantasy Render Art Style)
export const CARD_DATABASE = [
  // --- COMMON (Tingkat Biasa) ---
  {
    id: 'atk_dagger',
    name: 'Cyber Dagger',
    type: 'ATTACK',
    rarity: 'common',
    value: 12,
    icon: '⚔️',
    img: '/assets/cards/atk_dagger.png',
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
    img: '/assets/cards/def_nano.png',
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
    img: '/assets/cards/heal_potion.png',
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
    img: '/assets/cards/atk_plasma.png',
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
    img: '/assets/cards/def_shield.png',
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
    img: '/assets/cards/heal_potion.png',
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
    img: '/assets/cards/buff_eye.png',
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
    img: '/assets/cards/debuff_virus.png',
    description: 'Virus mengikis HP musuh (16 Damage).',
    color: '#ef4444'
  },
  {
    id: 'atk_pierce',
    name: 'Quantum Piercer',
    type: 'ATTACK',
    rarity: 'rare',
    value: 18,
    isPiercing: true,
    icon: '🗡️',
    img: '/assets/cards/atk_dagger.png',
    description: 'Penetrasi 18 Damage MENEMBUS Armor musuh secara langsung!',
    color: '#00f0ff'
  },

  // --- EPIC (Tingkat Sangat Langka) ---
  {
    id: 'atk_aether',
    name: 'Aether Strike',
    type: 'ATTACK',
    rarity: 'epic',
    value: 30,
    icon: '🔱',
    img: '/assets/cards/atk_plasma.png',
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
    img: '/assets/cards/def_shield.png',
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
    img: '/assets/cards/heal_potion.png',
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
    img: '/assets/cards/debuff_virus.png',
    description: 'Ganggui sistem musuh & berikan 24 Damage.',
    color: '#d946ef'
  },
  {
    id: 'debuff_emp',
    name: 'EMP Disrupter',
    type: 'DEBUFF',
    rarity: 'epic',
    value: 28,
    icon: '⚡',
    img: '/assets/cards/debuff_virus.png',
    description: 'Pulsa EMP melumpuhkan perisai & berikan 28 Damage.',
    color: '#00ffaa'
  },

  // --- LEGENDARY / PITY (Bantuan Darurat Kuno) ---
  {
    id: 'pity_wrath',
    name: 'Divine Wrath',
    type: 'ATTACK',
    rarity: 'epic',
    value: 40,
    icon: '⚡',
    img: '/assets/cards/atk_plasma.png',
    description: 'Serangan petir suci 40 Damage + Heal 15 HP!',
    color: '#eab308'
  }
];

// Catatan: Pembuatan papan dilakukan oleh fungsi resetBoardForStage di GameBoard.jsx
// menggunakan Fisher-Yates Shuffle pada deck aktif pemain.
