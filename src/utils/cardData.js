// Database Kartu Lengkap (100% Unique 3D Cyberfantasy Render Art Style Per Kartu)
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
    lore: 'Belati energi cyan yang ditempa di laboratorium bawah tanah Sektor Neo-Veridia. Diukir dengan serat foton frekuensi tinggi, senjata standar peretas memori ini mampu menembus selubung gelombang otak musuh dalam sekejap.',
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
    lore: 'Jaring mikroskopis nanobot pertahanan yang diaktifkan melalui impuls syaraf. Diciptakan oleh Guild Cybermedis, nanobot ini secara instan membentuk perisai foton berkepadatan tinggi saat menerima sinyal benturan.',
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
    lore: 'Cairan bioluminesensi murni yang diekstrak dari Bunga Sintetis Aether. Dikenal oleh para penjelajah cyber sebagai sumber pemulihan jaringan vital yang mampu menutup luka fusi sel dalam hitungan detik.',
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
    lore: 'Pedang plasma terionisasi yang memancarkan panas hingga 10.000°C. Senjata legendaris garapan Glitch Smith ini pernah digunakan untuk membelah inti mainframe raksasa pada era Perang Cyber Pertama.',
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
    lore: 'Tameng energi berkode geometri suci yang dipancarkan dari jimat intan cyber. Pelindung kuno ini membiaskan radiasi frekuensi tinggi dan menahan gempuran fisik dengan medan gravitasi buatan.',
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
    lore: 'Ramuan rahasia hasil formulasi Alkemis Digital Neo-Kyoto. Mengandung molekul regeneratif cair yang merekonstruksi kode genetik dan memulihkan vitalitas fisik serta mental penggunanya secara dramatis.',
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
    lore: 'Relik mata cybernetic buatan Oracle dari Inti Sektor 0. Menggunakan pindaian spektral dimensi tinggi, lensa ini menembus matriks maya untuk menyingkap rahasia kartu tertutup sebelum takdir terwujud.',
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
    lore: 'Virus korosif bio-digital yang menyebar melalui protokol memori terbuka. Begitu menginfeksi sistem musuh, racun molekuler ini mengikis sel pertahanan secara bertahap tanpa bisa dihentikan firewall standar.',
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
    lore: 'Tombak kuantum berenergi foton ganda yang mampu menembus ruang dan waktu. Diciptakan untuk mengabaikan segala bentuk armor atau perisai fisik, menghantam titik lemah musuh secara mematikan.',
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
    img: '/assets/cards/atk_aether.png',
    description: 'Serangan tebasan kosmik sebesar 30 damage!',
    lore: 'Tebasan pedang kosmik bertatahkan kristal Aether murni. Membelah struktur ruang dimensi dan melepaskan ledakan energi astral berkekuatan tinggi yang mampu meremukkan musuh paling tangguh sekalipun.',
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
    lore: 'Protokol pertahanan tertinggi buatan Konsorsium Keamanan Sektor Atas. Memanggil matriks perisai bersisi-banyak yang memantulkan benturan berat dan melindungi integritas pengguna dalam benteng energi abadi.',
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
    lore: 'Katalis api kosmik yang menyimpan esensi Burung Phoenix Abadi. Saat dipicu, gelombang regenerasi hangat membakar sel mati dan membangkitkan vitalitas tubuh hingga kapasitas puncak.',
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
    lore: 'Anomali matriks maya yang mengganggu sistem kognitif musuh. Memancarkan fraktal piksel rusak yang membuat musuh kebingungan sekaligus mengikis pertahanan lawan dengan gangguan sirkuit.',
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
    lore: 'Meriam pulsa elektromagnetik berdaya tinggi. Saat dilepaskan, gelombang shockwave EMP melumpuhkan komponen elektronik musuh, menghancurkan perisai armor, dan mengacak sistem ingatan musuh secara total.',
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
    img: '/assets/cards/pity_wrath.png',
    description: 'Serangan petir suci 40 Damage + Heal 15 HP!',
    lore: 'Manifestasi amarah kuno para Dewa Cybernetic. Diberikan oleh sistem pertolongan alam bawah sadar saat pejuang berada di ambang kekalahan, menyambar musuh dengan petir suci 40 Damage sekaligus memulihkan 15 HP.',
    color: '#eab308'
  }
];
