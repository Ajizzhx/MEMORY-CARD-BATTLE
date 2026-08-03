import { TRANSLATIONS } from './i18n';

// Database Base Kartu Lengkap
export const CARD_DATABASE = [
  // --- COMMON ---
  {
    id: 'atk_dagger',
    name: 'Cyber Dagger',
    type: 'ATTACK',
    rarity: 'common',
    value: 12,
    icon: '⚔️',
    img: '/assets/cards/atk_dagger.png',
    description: 'Menyerang musuh sebesar 12 damage.',
    lore: 'Belati sihir foton yang ditempa oleh Penyihir Rune di Laboratorium Alkimia Neo-Veridia. Diukir dengan inskripsi mantra suci kuno yang dialiri energi neon, senjata ini menembus jiwa dan memori musuh dalam sekejap.',
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
    lore: 'Perisai gaib gabungan Sihir Perlindungan Elven dan matriks Nanobot. Diciptakan oleh Para Penyihir Cybermedis, jaring kristal ini memancarkan mantra pelindung suci secara instan saat ancaman bahaya mendekat.',
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
    lore: 'Cairan mana bioluminesensi murni yang diekstrak dari Bunga Abadi Hutan Aether. Dikenal oleh para Penyihir Cyber sebagai ramuan mukjizat penyembuh jiwa yang mampu menutup luka fusi sel dalam sekejap.',
    color: '#00ffaa'
  },

  // --- RARE ---
  {
    id: 'atk_plasma',
    name: 'Plasma Blade',
    type: 'ATTACK',
    rarity: 'rare',
    value: 22,
    icon: '🗡️',
    img: '/assets/cards/atk_plasma.png',
    description: 'Menyerang musuh sebesar 22 damage.',
    lore: 'Pedang plasma terionisasi yang disuntikkan Jiwa Naga Api Kuno. Senjata pusaka garapan Pandai Besi Alkemis ini memancarkan kobaran api magis 10.000°C yang mampu membelah inti matriks kegelapan.',
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
    lore: 'Tameng energi bertuliskan Geometri Suci Mandala yang dipancarkan dari jimat intan sihir kuno. Pelindung bertuah ini membiaskan kutukan musuh dan menahan gempuran fisik dengan benteng aura mistik.',
    color: '#ffd700'
  },
  {
    id: 'heal_elixir',
    name: 'Cyber Elixir',
    type: 'HEAL',
    rarity: 'rare',
    value: 20,
    icon: '💊',
    img: '/assets/cards/heal_elixir.png',
    description: 'Memulihkan 20 HP.',
    lore: 'Elixir rahasia ciptaan para Alkemis Takdir dari Kuil Digital Neo-Kyoto. Meramu sari benih kehidupan mistis dengan molekul regeneratif untuk membangkitkan vitalitas jiwa dan fisik penggunanya secara dramatis.',
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
    lore: 'Relik mata peramal suci milik Sang Oracle Kuno dari Kuil Sektor 0. Menggabungkan penglihatan gaib dengan pindaian spektral dimensi tinggi, mata mistik ini menembus tabir takdir untuk menyingkap rahasia kartu tertutup.',
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
    lore: 'Kutukan sihir hitam berkode virus bio-digital yang menyebar di alam mimpi musuh. Racun gaib molekuler ini menggerogoti jiwa dan perisai pertahanan musuh secara perlahan tanpa bisa ditolak jimat pelindung.',
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
    img: '/assets/cards/atk_pierce.png',
    description: 'Penetrasi 18 Damage MENEMBUS Armor musuh secara langsung!',
    lore: 'Tombak kuantum bertatahkan Rune Valkyrie berenergi foton suci. Membelah takdir ruang dan waktu untuk mengabaikan segala armor fisik maupun perisai sihir musuh, menghantam titik vital secara mematikan.',
    color: '#00f0ff'
  },

  // --- EPIC ---
  {
    id: 'atk_aether',
    name: 'Aether Strike',
    type: 'ATTACK',
    rarity: 'epic',
    value: 30,
    icon: '🔱',
    img: '/assets/cards/atk_aether.png',
    description: 'Serangan tebasan kosmik sebesar 30 damage!',
    lore: 'Tebasan pedang kosmik Malaikat Agung bertatahkan Kristal Aether Murni. Membelah dimensi astral dan melepaskan ledakan sihir kosmik berkekuatan tinggi yang meremukkan musuh paling tangguh.',
    color: '#ec4899'
  },
  {
    id: 'def_aegis',
    name: 'Aegis Protocol',
    type: 'DEFENSE',
    rarity: 'epic',
    value: 32,
    icon: '🏰',
    img: '/assets/cards/def_aegis.png',
    description: 'Benteng energi kokoh sebesar 32 Armor!',
    lore: 'Mantra pertahanan tertinggi ciptaan Parlemen Penyihir Agung Sektor Atas. Memanggil Sanctuary bertatahkan kristal pelindung suci yang memantulkan gempuran musuh dalam keabadian benteng sihir.',
    color: '#8b5cf6'
  },
  {
    id: 'heal_phoenix',
    name: 'Phoenix Catalyst',
    type: 'HEAL',
    rarity: 'epic',
    value: 35,
    icon: '🔥',
    img: '/assets/cards/heal_phoenix.png',
    description: 'Pemulihan regenerasi besar 35 HP!',
    lore: 'Relik suci yang menyimpan Jiwa Api Burung Phoenix Abadi. Saat dipicu dalam ritual pertarungan, gelombang kobaran api regenerasi membakar seluruh sel mati dan memulihkan 35 HP secara sempurna.',
    color: '#f97316'
  },
  {
    id: 'debuff_glitch',
    name: 'Glitch Overlay',
    type: 'DEBUFF',
    rarity: 'epic',
    value: 24,
    icon: '👾',
    img: '/assets/cards/debuff_glitch.png',
    description: 'Ganggui sistem musuh & berikan 24 Damage.',
    lore: 'Kutukan ilusi fraktal sihir yang mengacaukan kognisi musuh. Memancarkan matriks ilusi rusak yang membuat musuh terjerat dalam labirin bawah sadar sekaligus merusak sirkuit pertahanan lawan.',
    color: '#d946ef'
  },
  {
    id: 'debuff_emp',
    name: 'EMP Disrupter',
    type: 'DEBUFF',
    rarity: 'epic',
    value: 28,
    icon: '⚡',
    img: '/assets/cards/debuff_emp.png',
    description: 'Pulsa EMP melumpuhkan perisai & berikan 28 Damage.',
    lore: 'Mantera Pulsa Petir Elektromagnetik yang ditempa dari Badai Elemental Kuno. Saat dilepaskan, ledakan shockwave petir gaib melumpuhkan sirkuit musuh, meremukkan armor, dan mengacak memori musuh.',
    color: '#00ffaa'
  },

  // --- LEGENDARY / PITY ---
  {
    id: 'pity_wrath',
    name: 'Divine Wrath',
    type: 'ATTACK',
    rarity: 'epic',
    value: 40,
    icon: '⚡',
    img: '/assets/cards/pity_wrath.png',
    description: 'Serangan petir suci 40 Damage + Heal 15 HP!',
    lore: 'Manifestasi Amarah Titan Kuno dari Alam Para Dewa Cybernetic. Terpanggil saat pejuang suci berada di ambang maut, melepaskan sambaran petir gaib 40 Damage sekaligus memulihkan 15 HP.',
    color: '#eab308'
  },

  // --- UNIQUE NEW MECHANIC CARDS ---
  {
    id: 'chrono_rewind',
    name: 'Chronos Rewind',
    type: 'UTILITY',
    rarity: 'epic',
    value: 0,
    icon: '🌀',
    img: '/assets/cards/chrono_rewind.png',
    description: 'Rewind Mistake: Kesalahan tebakan (mismatch) Anda berikutnya dimaafkan dan giliran tidak akan berpindah ke musuh!',
    lore: 'Relik jam pasir kristal foton garapan Chrono-Mage. Memutar balik waktu untuk membatalkan takdir buruk, memberikan penggunanya kesempatan kedua yang absolut.',
    color: '#00f0ff'
  },
  {
    id: 'drain_syphon',
    name: 'Aether Syphon',
    type: 'DRAIN',
    rarity: 'rare',
    value: 15,
    icon: '🧲',
    img: '/assets/cards/drain_syphon.png',
    description: 'Mencuri 15 Armor musuh menjadi Armor sendiri + 10 Damage!',
    lore: 'Sedotan matriks energi bioluminesensi dari Sektor Alkimia. Menyerap benteng pertahanan lawan untuk memperkuat pelindung pribadi.',
    color: '#a855f7'
  },
  {
    id: 'ctrl_frostbite',
    name: 'Frostbite Stasis',
    type: 'CONTROL',
    rarity: 'epic',
    value: 0,
    icon: '❄️',
    img: '/assets/cards/ctrl_frostbite.png',
    description: 'Membekukan giliran AI Musuh! (Musuh kehilangan 1 Turn)',
    lore: 'Mantra segel Es Abadi Frost-Byte dari Pegunungan Cyberia. Membekukan kognisi memori musuh dalam kubah es murni.',
    color: '#38bdf8'
  },
  {
    id: 'buff_neural',
    name: 'Neural Flash',
    type: 'BUFF',
    rarity: 'epic',
    value: 0,
    icon: '🧠',
    img: '/assets/cards/buff_neural.png',
    description: 'Membuka SELURUH kartu di papan selama 1.5 detik! (Musuh AI dibatasi maks 2-6 kartu).',
    lore: 'Implan peretas otak spektral. Menyuntikkan pulsa cahaya yang menyingkap seluruh isi papan dalam sekejap mata.',
    color: '#39ff14'
  },
  {
    id: 'gamble_cosmic',
    name: 'Cosmic Gamble',
    type: 'RISK',
    rarity: 'rare',
    value: 35,
    icon: '🎲',
    img: '/assets/cards/gamble_cosmic.png',
    description: '50% Peluang: 35 Damage Kosmik OR 50% Peluang: Menerima 10 Damage & Target +10 HP!',
    lore: 'Artefak Dadu Alkemis Chaos dari Dimensi Void. Keberuntungan para dewa menentukan apakah sihir ini memusnahkan musuh atau memakan tuannya.',
    color: '#f59e0b'
  },
  {
    id: 'special_mirage',
    name: 'Mirage Duplicator',
    type: 'SPECIAL',
    rarity: 'epic',
    value: 0,
    icon: '🪞',
    img: '/assets/cards/special_mirage.png',
    description: 'Menggandakan (2x) Efek Kartu berikutnya yang berhasil dicocokkan!',
    lore: 'Cermin ilusi fraktal dimensi astral yang membiaskan 1 jejak mantra menjadi 2 bayangan nyata.',
    color: '#ff007f'
  }
];

/**
 * Mengambil daftar kartu yang sudah disesuaikan dengan bahasa terpilih (ID / EN)
 * @param {string} lang - Bahasa ('ID' | 'EN')
 */
export const getLocalizedCards = (lang = 'ID') => {
  const cardDict = (TRANSLATIONS[lang] || TRANSLATIONS.ID).cards || {};
  return CARD_DATABASE.map((card) => {
    const loc = cardDict[card.id];
    if (!loc) return card;
    return {
      ...card,
      description: loc.description || card.description,
      lore: loc.lore || card.lore
    };
  });
};
