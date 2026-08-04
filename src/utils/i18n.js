/**
 * System Internationalization (i18n) - Dual Language (ID & EN)
 * Mengelola kamus terjemahan Bahasa Indonesia & English secara terpusat
 */

export const TRANSLATIONS = {
  ID: {
    // ── Global & Controls ──
    langName: 'Indonesia',
    langToggle: '🌐 ID',
    musicBtn: '🎵 Musik',
    sfxBtn: '🔔 SFX',
    guideBtn: '📖 Panduan',
    catalogBtn: '🂠 Kartu Stage',
    scoreBtn: '🏆 Skor',
    resetBtn: 'Reset',
    pauseTitle: 'MENU PAUSE',
    pauseBtn: 'Pause',
    resumeBtn: 'Lanjutkan',
    audioSettings: 'PENGATURAN AUDIO',
    menuSettings: 'PILIHAN MENU',

    // ── Player & Enemy Status ──
    yourTurn: 'GILIRAN ANDA',
    enemyTurn: 'GILIRAN MUSUH',
    matchesLabel: 'Match',
    aiDifficultyLabel: 'AI',

    // ── NameModal / Dashboard ──
    dashTitle: 'MEMORY CARD BATTLE',
    dashSubtitle: 'Cyberfantasy RPG & Memory Matching Game',
    featRpg: '⚔️ 1v1 Battle RPG',
    featCards: '🃏 21 Kartu Cyber',
    featPity: '🛡️ Pity System',
    nameInputPlaceholder: 'Ketik Nama Pemain...',
    aiSelectorLabel: '🧠 Mode Kesulitan AI Musuh:',
    aiModeAuto: '🔄 Otomatis (Stage)',
    aiModeEasy: '🟢 Mudah (35%)',
    aiModeMedium: '🟡 Sedang (65%)',
    aiModeHard: '🔴 Tinggi (88%)',
    aiDescAuto: 'ℹ️ Otomatis: Kesulitan AI naik bertahap dari Stage 1 (35%) hingga Stage 5+ (88%).',
    aiDescEasy: 'ℹ️ Mudah: AI Musuh mengingat 35% posisi kartu. Cocok untuk pemain baru!',
    aiDescMedium: 'ℹ️ Sedang: AI Musuh mengingat 65% posisi kartu. Pertarungan seimbang!',
    aiDescHard: 'ℹ️ Tinggi: AI Musuh mengingat 88% posisi kartu. Tantangan memori tingkat dewa!',
    dashGuideBtn: '📖 Panduan',
    dashCatalogBtn: '🂠 Katalog',
    dashTopscoreBtn: '🏆 Topskor',
    dashTipsBox: '💡 Tips Arena: Kumpulkan 21 kartu unik melalui Loot Stage Clear dan aktifkan Bio-Shield Medkit saat HP Kritis!',
    startBattleBtn: '⚔️ Mulai Pertarungan',

    // ── Game Mode Selector ──
    gameModeLabel: '🎮 Mode Permainan:',
    modeRpgTitle: '⚔️ RPG Journey',
    modeRpgDesc: 'Progresi bertahap Stage 1–13+ & buka kartu loot baru. Grid 4×4 (16 kartu).',
    modeBossTitle: '🐉 Boss Challenge',
    modeBossDesc: 'Tantangan 42 Kartu (21 Pasang) lawan Abyss Omega 400 HP! Disarankan bermain di Desktop untuk tata letak grid pas.',
    bossArenaStartMsg: '🐉 ABYSS OMEGA ARENA! Seluruh 21 Kartu Aktif. Kalahkan Bos 400 HP!',
    bossVictoryFloat: '🏆 BOS DIKALAHKAN!',
    bossElapsedLabel: '⏱️ Waktu',
    bossElapsedFormat: '{min}m {sec}d',
    bossChallengeHeader: '🐉 BOSS CHALLENGE',
    bossResultTime: '⏱️ Waktu Penyelesaian: {time}',

    // ── Support / Donation ──
    supportTitle: '☕ Dukung Developer',
    supportSaweria: '💛 Saweria',
    supportKofi: '☕ Ko-fi',
    supportFooterMsg: 'Dukungan Anda membantu kelangsungan & update game ini!',

    // ── GuideModal ──
    guideTitle: '📖 BUKU PANDUAN GAME',
    guideSub: 'Panduan Lengkap Alur Permainan, Aturan Arena, Fitur Pertolongan, & Musuh AI:',
    guideSec1Title: '⚔️ Alur & Cara Bermain',
    guideStep1Title: 'Pilih Nama & Mode AI:',
    guideStep1Desc: 'Ketik nama pemain, pilih mode permainan (RPG Journey atau Boss Challenge), dan pilih tingkat kecerdasan AI Musuh.',
    guideStep2Title: 'Buka Pasangan Kartu di Papan:',
    guideStep2Desc: 'Di setiap giliran, klik 2 kartu tertutup di papan. Jika 2 kartu cocok (Match), efek kartu langsung aktif!',
    guideStep3Title: 'Giliran Ekstra & Batas Waktu 15 Detik:',
    guideStep3Desc: 'Pemain yang berhasil mencocokkan kartu mendapatkan giliran tambahan. Jika kartu tidak cocok atau waktu 15 detik habis, giliran berpindah ke lawan.',
    guideStep4Title: 'Hadiah Kartu & Stage Baru:',
    guideStep4Desc: 'Kalahkan musuh untuk memilih 1 Kartu Hadiah baru yang belum Anda miliki dan lanjut bertualang ke Stage berikutnya!',
    guideSec2Title: '🎲 Aturan Papan & Arena Pertarungan',
    guideRule1Title: '1. Ukuran Papan Arena (RPG vs Boss):',
    guideRule1Desc: 'Mode RPG menggunakan papan 4x4 (16 kartu / 8 pasang) yang diambil dari deck Anda. Mode Boss menggunakan papan raksasa 42 kartu (21 pasang) memuat seluruh kartu di katalog (disarankan bermain di Desktop untuk tata letak grid pas)!',
    guideRule2Title: '2. Arena Milik Bersama (Shared Board):',
    guideRule2Desc: 'Kartu hadiah yang Anda dapatkan dimasukkan ke Deck Anda. Namun saat bertarung, siapa pun yang berhasil mencocokkan kartu di papan (Pemain maupun Musuh AI) dialah yang memperoleh efek dari kartu tersebut!',
    guideRule3Title: '3. Kelengkapan Kartu (21 Kartu Katalog):',
    guideRule3Desc: 'Anda memulai perjalanan dengan 8 kartu awal dan dapat melengkapi seluruh 21 kartu katalog setelah berhasil menaklukkan Stage 13.',
    guideSec3Title: '🚑 Fitur Pertolongan & Medkit Darurat (Maksimal 2x Pemakaian)',
    guidePityDesc1: 'Jika HP Anda berada di bawah 50% atau mengalami kegagalan cocok 3 kali berturut-turut, ',
    guidePityDesc1Bold: 'Fitur Pertolongan Aktif!',
    guidePityDesc2: 'Di layar Hadiah Kelulusan Stage, akan terbuka ',
    guidePityDesc2Bold: 'Opsi Ke-4: 🚑 Bio-Shield Medkit (+35 HP & +25 Perisai instan).',
    guidePityQuotaBold: '⚠️ Kuota Medkit Darurat: ',
    guidePityQuotaDesc: 'Penggunaan Medkit Darurat dibatasi maksimal 2 kali sepanjang satu perjalanan bertarung. Jika kuota 2 kali sudah habis terpakai, opsi ini tidak akan muncul lagi.',
    guidePityTip: 'Pertimbangan Strategi: Mengambil Medkit akan menyelamatkan HP Anda, namun Anda tidak memperoleh kartu baru sehingga penambahan koleksi 21 kartu katalog Anda berjalan lebih lambat.',
    guideSec4Title: '👾 Musuh AI Berdasarkan Stage',
    enemy1Desc: 'Musuh pengintai dasar untuk pemanasan pemain baru.',
    enemy2Desc: 'Robot Golem tangguh dengan pertahanan HP & Perisai yang lebih tebal.',
    enemy3Desc: 'Hantu cyber lincah yang mulai mengingat posisi kartu dengan akurat.',
    enemy4Desc: 'Panglima perang kosmik dengan HP tebal & daya serang yang mematikan.',
    enemy5Desc: 'Naga Cyber legendaris dalam arena pertarungan tanpa akhir!',
    closeGuideBtn: 'Tutup Buku Panduan',

    // ── CatalogModal ──
    catalogTitle15: '🂠 KATALOG 21 KARTU GAME',
    catalogSubDash: 'Kompendium Koleksi Statistik, Efek, & Gambar 3D Render 21 Kartu Cyberfantasy (Klik kartu untuk baca Kisah Lore):',
    catalogSubAllGame: 'Menampilkan seluruh 21 jenis kartu kompendium katalog (Klik kartu untuk cerita detail):',
    catalogTitleStage: '🂠 KARTU AKTIF STAGE ',
    catalogSubStage: 'jenis kartu di papan Stage ',
    toggleBackStage: '🎯 Kembali ke Kartu Stage ',
    toggleView15: '🂠 Lihat Semua 21 Kartu Katalog',
    badgePresent: 'Kartu di Papan',
    loreHint: '📜 Kisah Lore',
    closeCatalogBtn: 'Tutup Katalog',

    // ── CardDetailModal ──
    cardDetailTypeAttack: '⚔️ SERANGAN',
    cardDetailTypeDefense: '🛡️ PERTAHANAN',
    cardDetailTypeHeal: '🧪 PEMULIHAN',
    cardDetailTypeBuff: '👁️ BUFF PANTAU',
    cardDetailTypeDebuff: '☠️ DEBUFF GLITCH',
    cardDetailTypeEmergency: '🚑 MEDKIT DARURAT',
    cardDetailTypeUtility: '🌀 UTILITY/TIMER',
    cardDetailTypeDrain: '🧲 SEDOT ARMOR',
    cardDetailTypeControl: '❄️ KONTROL ES',
    cardDetailTypeRisk: '🎲 GAMBLING RESIKO',
    cardDetailTypeSpecial: '🪞 SPECIAL MIRAGE',
    loreArchiveHeader: 'CYBER LORE ARCHIVE',
    statEffectValue: 'NILAI EFEK',
    statPoints: 'Poin',
    statInspectEffect: 'Efek Pengintip',
    statFeature: 'KEISTIMEWAAN',
    statQuantumPiercing: '🗡️ Kuantum Penetrasi',
    closeCardDetailBtn: 'Tutup Detail Kartu',

    // ── LeaderboardModal ──
    leaderboardTitle: '🏆 PAPAN SKOR TOP GLOBAL',
    tabGlobal: '💻 RPG (Global)',
    tabBossGlobal: '👹 Boss (Global)',
    globalLBSub: 'Top 10 pahlawan terkuat dari seluruh dunia (RPG Leaderboard):',
    globalBossLBSub: 'Top 10 penyelesai Boss tercepat di dunia:',
    globalLBLoading: 'Mengambil data dari Supabase...',
    globalLBError: 'Koneksi ke Supabase gagal.',
    globalLBRetry: 'Coba Lagi',
    thRank: 'Peringkat',
    thPlayer: 'Pemain',
    thDiff: 'Kesulitan AI',
    thStage: 'Stage Max',
    thMatches: 'Total Cocok',
    thTime: 'Waktu (Detik)',
    thDate: 'Tanggal',
    noGlobalData: 'Belum ada data di Papan Peringkat Supabase.',
    noSessionData: 'Belum ada catatan skor RPG di sesi lokal ini.',
    noBossData: 'Belum ada catatan waktu Boss Challenge di sesi lokal ini.',
    closeLeaderboardBtn: 'Tutup Leaderboard',

    // ── LogModal ──
    logBtn: 'Log',
    logTitle: 'BATTLE LOG',
    logSub: 'Riwayat pertarungan sesi ini:',
    logEmpty: 'Belum ada aktivitas pertarungan...',
    closeLogBtn: 'Tutup Log',
    logMatch: 'berhasil mencocokkan {cardName}!',
    logMismatch: 'gagal mencocokkan kartu.',

    // ── LootModal ──
    lootTitle: '🎉 STAGE CLEAR!',
    lootSub: 'Selamat! Anda mengalahkan musuh. Pilih 1 Kartu Hadiah baru untuk memperkuat Deck Anda:',
    emergencyPityTag: 'BANTUAN DARURAT (PITY)',
    emergencyPityNotice: '🚑 Opsi Pity Medkit Aktif! Memberikan +35 HP & +25 Armor (Sisa kuota: ',
    emergencyPityNoticeEnd: 'x). Memilih Medkit tidak memberikan kartu baru.',
    claimCardBtn: 'Klaim Kartu',

    // ── GameOverModal ──
    victoryTitle: '🏆 KEMENANGAN ABADI!',
    victorySub: 'Luar Biasa! Anda berhasil menaklukkan seluruh Stage Pertarungan Cyber!',
    defeatTitle: '💥 PERTARUNGAN BERAKHIR',
    defeatSub: 'HP Anda habis tergerus serangan musuh. Jangan menyerah, bangun strategi baru!',
    statFinalStage: 'Stage Terakhir Reach',
    statTotalMatches: 'Total Match Terkumpul',
    statAiMode: 'Mode Kesulitan AI',
    viewLeaderboardBtn: '🏆 Lihat Topskor Global',
    playAgainBtn: '⚔️ Main Lagi (Stage 1)',
    backDashBtn: '🏠 Halaman Depan',

    // ── ResetConfirmModal ──
    resetTitle: 'KONFIRMASI RESET GAME',
    resetBody: 'Apakah Anda yakin ingin mengulang permainan dari Stage 1? Progresi HP, Armor, dan Deck kartu Anda saat ini akan di-reset.',
    resetConfirmBtn: 'Ya, Reset dari Stage 1',
    resetCancelBtn: 'Batal',

    // ── Game Messages & Floating Texts ──
    msgStageStart: 'Stage {stage}: Pertarungan melawan {enemy}!',
    msgMatched: '{name} mencocokkan {card}! ({effect})',
    msgMismatch: 'Mismatch! Giliran {name} berakhir.',
    msgTimeOut: 'Waktu 15 Detik Habis! Giliran berpindah.',
    msgStageCleared: '🎉 Stage {stage} Clear! Musuh dikalahkan.',
    floatTurnPlayer: '⚔️ Giliran Anda!',
    floatTurnEnemy: '🤖 Giliran Musuh!',
    floatExtraTurn: '✨ Match! Giliran Ekstra!',
    floatDamage: '-{val} HP',
    floatBlock: '+{val} Armor',
    floatHeal: '+{val} HP',
    floatScan: '👁️ Mengintip Papan!',
    startAttackMsg: 'Pilih 2 kartu untuk menyerang musuh!',
    reloadWarnMsg: 'Pertarungan Anda sedang berlangsung! Memuat ulang web akan mereset pertarungan dari awal.',
    timeoutFloat: '⏰ WAKTU HABIS!',
    timeoutMsg: '⏰ Waktu berpikir Anda habis! Giliran berpindah ke Musuh!',
    aiDifficultyChange: '🧠 Mode Kesulitan AI Diubah ke: {mode}',
    playerFrozenFloat: '🧊 Anda Terbeku! Giliran Lewat!',
    playerFrozenMsg: '🧊 Anda dibekukan oleh Frostbite Stasis! Giliran berpindah ke Musuh.',
    enemyFrozenFloat: '🧊 Musuh Terbeku! Giliran Lewat!',
    enemyFrozenMsg: '🧊 {enemy} dibekukan oleh Frostbite Stasis! Giliran kembali ke Anda.',
    aiThinkingMsg: '🤖 {enemy} (AI {difficulty}) sedang berpikir...',
    matchTitleFloat: '✨ MATCH: {name}!',
    roundResetFloat: '🔄 Ronde Baru! Papan Direset',
    roundResetMsg: '🔄 Seluruh 16 kartu cocok! Mengocok papan untuk Ronde berikutnya...',
    matchSuccessMsg: '✨ Match! {actor} berhasil menggunakan efek {card}!',
    mismatchMsg: '❌ Mismatch! Giliran {actor} berakhir.',
    mirageActiveFloat: '🪞 MIRAGE 2X EFEK AKTIF!',
    pierceFloat: '🗡️ PIERCE -{damage} HP',
    armorAbsorbFloat: '-{val} Armor',
    divineWrathFloat: '⚡ DIVINE WRATH +{healBonus} HP!',
    neuralFlashPlayerFloat: '🧠 NEURAL FLASH: Seluruh Papan Terbuka!',
    neuralFlashEnemyFloat: '🤖 MUSUH FLASH HACK PAPAN!',
    xrayScanFloat: '👁️ X-RAY SCAN: {name}!',
    xrayScanEnemyFloat: '🤖 MUSUH SCAN PAPAN!',
    empFloat: '⚡ EMP! Armor dihancurkan! -{damage} HP',
    glitchFloat: '👾 GLITCH -{damage} HP!',
    virusFloat: '☠️ VIRUS -{damage} HP!',
    rewindMistakeActiveFloat: '🌀 MISTAKE REWIND ACTIVE: Kesalahan dimaafkan!',
    rewindMistakeTriggeredFloat: '⏳ REWOUND: Giliran Anda lagi!',
    drainFloat: '🧲 DRAIN: +{stolen} Armor & -{damage} HP!',
    drainEnemyFloat: '🧲 MUSUH DRAIN: +{stolen} Armor!',
    frostbiteFloat: '❄️ FROSTBITE: Musuh Terbeku (1 Turn)!',
    frostbiteEnemyFloat: '❄️ FROSTBITE MUSUH: Giliran Anda Terbeku!',
    gambleWinFloat: '🎲 LUCKY WIN! {damage} DAMAGE!',
    gambleLossFloat: '💥 BACKFIRE! -{damage} HP & Target +{heal} HP!',
    mirageCastFloat: '🪞 MIRAGE: Kartu Berikutnya Efek 2x!',
    mirageCastEnemyFloat: '🪞 MIRAGE MUSUH: Efek 2x Active!',
    emergencyPityFloat: '🚑 BANTUAN DARURAT! +35 HP & +25 ARMOR',
    deckCompleteFloat: '💖 +50 HP BONUS DECK LENGKAP!',

    // ── Card Descriptions & Lore Stories ──
    cards: {
      atk_dagger: {
        description: 'Menyerang musuh sebesar 12 damage.',
        lore: 'Belati sihir foton yang ditempa oleh Penyihir Rune di Laboratorium Alkimia Neo-Veridia. Diukir dengan inskripsi mantra suci kuno yang dialiri energi neon, senjata ini menembus jiwa dan memori musuh dalam sekejap.'
      },
      def_nano: {
        description: 'Memberikan 10 Armor/Block.',
        lore: 'Perisai gaib gabungan Sihir Perlindungan Elven dan matriks Nanobot. Diciptakan oleh Para Penyihir Cybermedis, jaring kristal ini memancarkan mantra pelindung suci secara instan saat ancaman bahaya mendekat.'
      },
      heal_nectar: {
        description: 'Memulihkan 10 HP.',
        lore: 'Cairan mana bioluminesensi murni yang diekstrak dari Bunga Abadi Hutan Aether. Dikenal oleh para Penyihir Cyber sebagai ramuan mukjizat penyembuh jiwa yang mampu menutup luka fusi sel dalam sekejap.'
      },
      atk_plasma: {
        description: 'Menyerang musuh sebesar 22 damage.',
        lore: 'Pedang plasma terionisasi yang disuntikkan Jiwa Naga Api Kuno. Senjata pusaka garapan Pandai Besi Alkemis ini memancarkan kobaran api magis 10.000°C yang mampu membelah inti matriks kegelapan.'
      },
      def_aura: {
        description: 'Memberikan 18 Armor/Block.',
        lore: 'Tameng energi bertuliskan Geometri Suci Mandala yang dipancarkan dari jimat intan sihir kuno. Pelindung bertuah ini membiaskan kutukan musuh dan menahan gempuran fisik dengan benteng aura mistik.'
      },
      heal_elixir: {
        description: 'Memulihkan 20 HP.',
        lore: 'Elixir rahasia ciptaan para Alkemis Takdir dari Kuil Digital Neo-Kyoto. Meramu sari benih kehidupan mistis dengan molekul regeneratif untuk membangkitkan vitalitas jiwa dan fisik penggunanya secara dramatis.'
      },
      buff_vision: {
        description: 'Mengintip 2 kartu tertutup di papan.',
        lore: 'Relik mata peramal suci milik Sang Oracle Kuno dari Kuil Sektor 0. Menggabungkan penglihatan gaib dengan pindaian spektral dimensi tinggi, mata mistik ini menembus tabir takdir untuk menyingkap rahasia kartu tertutup.'
      },
      debuff_poison: {
        description: 'Virus mengikis HP musuh (16 Damage).',
        lore: 'Kutukan sihir hitam berkode virus bio-digital yang menyebar di alam mimpi musuh. Racun gaib molekuler ini menggerogoti jiwa dan perisai pertahanan musuh secara perlahan tanpa bisa ditolak jimat pelindung.'
      },
      atk_pierce: {
        description: 'Penetrasi 18 Damage MENEMBUS Armor musuh secara langsung!',
        lore: 'Tombak kuantum bertatahkan Rune Valkyrie berenergi foton suci. Membelah takdir ruang dan waktu untuk mengabaikan segala armor fisik maupun perisai sihir musuh, menghantam titik vital secara mematikan.'
      },
      atk_aether: {
        description: 'Serangan tebasan kosmik sebesar 30 damage!',
        lore: 'Tebasan pedang kosmik Malaikat Agung bertatahkan Kristal Aether Murni. Membelah dimensi astral dan melepaskan ledakan sihir kosmik berkekuatan tinggi yang meremukkan musuh paling tangguh.'
      },
      def_aegis: {
        description: 'Benteng energi kokoh sebesar 32 Armor!',
        lore: 'Mantra pertahanan tertinggi ciptaan Parlemen Penyihir Agung Sektor Atas. Memanggil Sanctuary bertatahkan kristal pelindung suci yang memantulkan gempuran musuh dalam keabadian benteng sihir.'
      },
      heal_phoenix: {
        description: 'Pemulihan regenerasi besar 35 HP!',
        lore: 'Relik suci yang menyimpan Jiwa Api Burung Phoenix Abadi. Saat dipicu dalam ritual pertarungan, gelombang kobaran api regenerasi membakar seluruh sel mati dan memulihkan 35 HP secara sempurna.'
      },
      debuff_glitch: {
        description: 'Gangguan sistem musuh & berikan 24 Damage.',
        lore: 'Kutukan ilusi fraktal sihir yang mengacaukan kognisi musuh. Memancarkan matriks ilusi rusak yang membuat musuh terjerat dalam labirin bawah sadar sekaligus merusak sirkuit pertahanan lawan.'
      },
      debuff_emp: {
        description: 'Pulsa EMP melumpuhkan perisai & berikan 28 Damage.',
        lore: 'Mantra Pulsa Petir Elektromagnetik yang ditempa dari Badai Elemental Kuno. Saat dilepaskan, ledakan shockwave petir gaib melumpuhkan sirkuit musuh, meremukkan armor, dan mengacak memori musuh.'
      },
      pity_wrath: {
        description: 'Serangan petir suci 40 Damage + Heal 15 HP!',
        lore: 'Manifestasi Amarah Titan Kuno dari Alam Para Dewa Cybernetic. Terpanggil saat pejuang suci berada di ambang maut, melepaskan sambaran petir gaib 40 Damage sekaligus memulihkan 15 HP.'
      },
      chrono_rewind: {
        description: 'Rewind Mistake: Kesalahan tebakan (mismatch) berikutnya dimaafkan, giliran tidak pindah!',
        lore: 'Relik jam pasir kristal foton garapan Chrono-Mage. Memutar balik waktu untuk membatalkan takdir buruk.'
      },
      drain_syphon: {
        description: 'Mencuri 15 Armor musuh menjadi Armor sendiri + 10 Damage!',
        lore: 'Sedotan matriks energi bioluminesensi dari Sektor Alkimia. Menyerap benteng pertahanan lawan untuk memperkuat pelindung pribadi.'
      },
      ctrl_frostbite: {
        description: 'Membekukan giliran AI Musuh! (Musuh kehilangan 1 Turn)',
        lore: 'Mantra segel Es Abadi Frost-Byte dari Pegunungan Cyberia. Membekukan kognisi memori musuh dalam kubah es murni.'
      },
      buff_neural: {
        description: 'Membuka SELURUH kartu di papan selama 1.5 detik! (Musuh AI dibatasi maks 2-6 kartu).',
        lore: 'Implan peretas otak spektral. Menyuntikkan pulsa cahaya yang menyingkap seluruh isi papan dalam sekejap mata.'
      },
      gamble_cosmic: {
        description: '50% Peluang: 35 Damage Kosmik atau 50% Peluang: Menerima 10 Damage & Target +10 HP!',
        lore: 'Artefak Dadu Alkemis Chaos dari Dimensi Void. Keberuntungan para dewa menentukan apakah sihir ini memusnahkan musuh atau memakan tuannya.'
      },
      special_mirage: {
        description: 'Menggandakan (2x) Efek Kartu berikutnya yang berhasil dicocokkan!',
        lore: 'Cermin ilusi fraktal dimensi astral yang membiaskan 1 jejak mantra menjadi 2 bayangan nyata.'
      }
    },
    // ── Additional Modals Lokalisasi ──
    deckFullBadge: '✨ DECK LENGKAP 100% ✨',
    deckFullDesc: 'Selamat! Semua 21 kartu katalog telah terkumpul di Deck Anda. Dapatkan bonus pemulihan HP maksimal!',
    claimBonusBtn: 'Klaim Bonus +50 HP & Lanjut',
    emergencyMedkitBtn: '🚑 Ambil Medkit',
    globalLBLoading: 'Memuat data leaderboard global...',
    globalLBSub: 'Top 10 Pemain Terbaik Dunia — Memory Card Battle',
    globalLBError: 'Gagal memuat data. Periksa koneksi internet Anda.',
    globalLBRetry: 'Coba Lagi',
    youPill: 'Anda',
    clickToOpenLore: 'Klik untuk membuka Kisah Lore & Detail Kartu',
    loreFallback: 'Arsip rahasia kartu ini tersimpan dalam intisari memori Sektor Neo-Veridia.',
  },

  EN: {
    // ── Global & Controls ──
    langName: 'English',
    langToggle: '🌐 EN',
    musicBtn: '🎵 Music',
    sfxBtn: '🔔 SFX',
    guideBtn: '📖 Guide',
    catalogBtn: '🂠 Stage Cards',
    scoreBtn: '🏆 Scores',
    resetBtn: 'Reset',
    pauseTitle: 'PAUSE MENU',
    pauseBtn: 'Pause',
    resumeBtn: 'Resume',
    audioSettings: 'AUDIO SETTINGS',
    menuSettings: 'MENU OPTIONS',

    // ── Player & Enemy Status ──
    yourTurn: 'YOUR TURN',
    enemyTurn: 'ENEMY TURN',
    matchesLabel: 'Matches',
    aiDifficultyLabel: 'AI',

    // ── NameModal / Dashboard ──
    dashTitle: 'MEMORY CARD BATTLE',
    dashSubtitle: 'Cyberfantasy RPG & Memory Matching Game',
    featRpg: '⚔️ 1v1 Battle RPG',
    featCards: '🃏 21 Cyber Cards',
    featPity: '🛡️ Pity System',
    nameInputPlaceholder: 'Enter Player Name...',
    aiSelectorLabel: '🧠 Enemy AI Difficulty Mode:',
    aiModeAuto: '🔄 Auto (Stage)',
    aiModeEasy: '🟢 Easy (35%)',
    aiModeMedium: '🟡 Medium (65%)',
    aiModeHard: '🔴 Hard (88%)',
    aiDescAuto: 'ℹ️ Auto: AI difficulty scales progressively from Stage 1 (35%) up to Stage 5+ (88%).',
    aiDescEasy: 'ℹ️ Easy: Enemy AI remembers 35% of flipped cards. Great for beginners!',
    aiDescMedium: 'ℹ️ Medium: Enemy AI remembers 65% of flipped cards. Balanced battle!',
    aiDescHard: 'ℹ️ Hard: Enemy AI remembers 88% of flipped cards. Ultimate memory challenge!',
    dashGuideBtn: '📖 Guide',
    dashCatalogBtn: '🂠 Catalog',
    dashTopscoreBtn: '🏆 Top Scores',
    dashTipsBox: '💡 Arena Tip: Collect 21 unique cards through Stage Clear Loot and activate Bio-Shield Medkit when HP is critical!',
    startBattleBtn: '⚔️ Start Battle',

    // ── Game Mode Selector ──
    gameModeLabel: '🎮 Game Mode:',
    modeRpgTitle: '⚔️ RPG Journey',
    modeRpgDesc: 'Stage 1–13+ progression & unlock loot cards. 4×4 Grid (16 cards).',
    modeBossTitle: '🐉 Boss Challenge',
    modeBossDesc: 'All 42 Cards (21 Pairs) vs Abyss Omega 400 HP! Recommended on Desktop for optimal grid layout.',
    bossArenaStartMsg: '🐉 ABYSS OMEGA ARENA! All 21 Cards Active. Defeat the 400 HP Boss!',
    bossVictoryFloat: '🏆 BOSS DEFEATED!',
    bossElapsedLabel: '⏱️ Time',
    bossElapsedFormat: '{min}m {sec}s',
    bossChallengeHeader: '🐉 BOSS CHALLENGE',
    bossResultTime: '⏱️ Completion Time: {time}',

    // ── Support / Donation ──
    supportTitle: '☕ Support Developer',
    supportSaweria: '💛 Saweria',
    supportKofi: '☕ Ko-fi',
    supportFooterMsg: 'Your support helps fund future game updates!',

    // ── GuideModal ──
    guideTitle: '📖 GAME GUIDEBOOK',
    guideSub: 'Comprehensive Guide to Gameplay Flow, Arena Rules, Emergency Pity & Enemy AIs:',
    guideSec1Title: '⚔️ Gameplay Flow & Mechanics',
    guideStep1Title: 'Choose Name & AI Mode:',
    guideStep1Desc: 'Enter your player name, select a game mode (RPG Journey or Boss Challenge), and choose the enemy AI difficulty.',
    guideStep2Title: 'Flip Card Pairs on the Board:',
    guideStep2Desc: 'On your turn, click 2 face-down cards on the grid. Matching 2 cards immediately triggers their action effect!',
    guideStep3Title: 'Extra Turn & 15s Time Limit:',
    guideStep3Desc: 'Making a match grants an extra turn. If you mismatch or the 15-second timer runs out, turn switches to your opponent.',
    guideStep4Title: 'Loot Rewards & New Stages:',
    guideStep4Desc: 'Defeat enemies to select 1 new unowned Loot Card from the catalog and advance to the next stage!',
    guideSec2Title: '🎲 Board & Arena Rules',
    guideRule1Title: '1. Arena Grid Size (RPG vs Boss):',
    guideRule1Desc: 'RPG mode uses a 4x4 grid (16 cards / 8 pairs) drawn from your deck. Boss mode uses a massive 42-card grid (21 pairs) featuring every card in the catalog (recommended to play on Desktop for optimal grid layout)!',
    guideRule2Title: '2. Shared Board Mechanics:',
    guideRule2Desc: 'Loot cards you earn are added to your deck. However during battle, whoever matches a pair on the board (Player or AI) gets its effect!',
    guideRule3Title: '3. Full Card Collection (21 Catalog Cards):',
    guideRule3Desc: 'You start with 8 starter cards and can complete all 21 catalog cards upon clearing Stage 13.',
    guideSec3Title: '🚑 Emergency Pity & Medkit (Max 2 Uses Per Run)',
    guidePityDesc1: 'If your HP drops below 50% or you encounter 3 consecutive mismatches, ',
    guidePityDesc1Bold: 'Pity Feature Activates!',
    guidePityDesc2: 'On the Stage Clear reward screen, option #4 unlocks: ',
    guidePityDesc2Bold: '🚑 Bio-Shield Medkit (+35 HP & +25 Shield instantly).',
    guidePityQuotaBold: '⚠️ Emergency Medkit Quota: ',
    guidePityQuotaDesc: 'Emergency Medkit usage is limited to a maximum of 2 times per run. Once the 2-use quota is exhausted, this option will no longer appear.',
    guidePityTip: 'Strategy Trade-Off: Choosing the Medkit saves your life but awards no new card, slowing down your 21-card catalog progress.',
    guideSec4Title: '👾 Enemy AIs by Stage',
    enemy1Desc: 'Basic scout drone enemy for player warm-up.',
    enemy2Desc: 'Heavy Robot Golem with thick HP and Shield armor.',
    enemy3Desc: 'Swift cyber ghost that accurately recalls card positions.',
    enemy4Desc: 'Cosmic warlord commander with massive HP and lethal damage.',
    enemy5Desc: 'Legendary Cyber Dragon in an endless boss battle stage!',
    closeGuideBtn: 'Close Guidebook',

    // ── CatalogModal ──
    catalogTitle15: '🂠 21 CARDS CATALOG',
    catalogSubDash: 'Compendium of Stats, Effects & 3D Rendered Art for 21 Cyberfantasy Cards (Click card to read Lore):',
    catalogSubAllGame: 'Displaying all 21 catalog compendium cards (Click any card for lore detail):',
    catalogTitleStage: '🂠 ACTIVE CARDS STAGE ',
    catalogSubStage: 'card types currently on Stage ',
    toggleBackStage: '🎯 Back to Stage ',
    toggleView15: '🂠 View All 21 Catalog Cards',
    badgePresent: 'Cards on Board',
    loreHint: '📜 Lore Story',
    closeCatalogBtn: 'Close Catalog',

    // ── CardDetailModal ──
    cardDetailTypeAttack: '⚔️ ATTACK',
    cardDetailTypeDefense: '🛡️ DEFENSE',
    cardDetailTypeHeal: '🧪 HEAL',
    cardDetailTypeBuff: '👁️ BUFF SCAN',
    cardDetailTypeDebuff: '☠️ DEBUFF GLITCH',
    cardDetailTypeEmergency: '🚑 EMERGENCY MEDKIT',
    cardDetailTypeUtility: '🌀 UTILITY/TIMER',
    cardDetailTypeDrain: '🧲 DRAIN ARMOR',
    cardDetailTypeControl: '❄️ ICE CONTROL',
    cardDetailTypeRisk: '🎲 RISK GAMBLE',
    cardDetailTypeSpecial: '🪞 SPECIAL MIRAGE',
    loreArchiveHeader: 'CYBER LORE ARCHIVE',
    statEffectValue: 'EFFECT VALUE',
    statPoints: 'Pts',
    statInspectEffect: 'Scan Effect',
    statFeature: 'SPECIAL TRAIT',
    statQuantumPiercing: '🗡️ Quantum Armor Piercing',
    closeCardDetailBtn: 'Close Card Detail',

    // ── LeaderboardModal ──
    leaderboardTitle: '🏆 GLOBAL TOP SCORES',
    tabGlobal: '💻 RPG (Global)',
    tabBossGlobal: '👹 Boss (Global)',
    globalLBSub: 'Top 10 strongest heroes from around the world (RPG Leaderboard):',
    globalBossLBSub: 'Top 10 fastest Boss clearers in the world:',
    globalLBLoading: 'Fetching data from Supabase...',
    globalLBError: 'Connection to Supabase failed.',
    globalLBRetry: 'Retry',
    thRank: 'Rank',
    thPlayer: 'Player',
    thDiff: 'AI Difficulty',
    thStage: 'Max Stage',
    thMatches: 'Total Matches',
    thTime: 'Time (Seconds)',
    thDate: 'Date',
    noGlobalData: 'No data yet in Supabase Leaderboard.',
    noSessionData: 'No RPG score records in this local session yet.',
    noBossData: 'No Boss Challenge time records in this local session yet.',
    closeLeaderboardBtn: 'Close Leaderboard',

    // ── LogModal ──
    logBtn: 'Log',
    logTitle: 'BATTLE LOG',
    logSub: 'Combat history for this session:',
    logEmpty: 'No combat activity yet...',
    closeLogBtn: 'Close Log',
    logMatch: 'matched {cardName}!',
    logMismatch: 'failed to match.',

    // ── LootModal ──
    lootTitle: '🎉 STAGE CLEAR!',
    lootSub: 'Congratulations! You defeated the enemy. Choose 1 new Reward Card to empower your Deck:',
    emergencyPityTag: 'EMERGENCY ASSIST (PITY)',
    emergencyPityNotice: '🚑 Medkit Pity Option Active! Grants +35 HP & +25 Armor (Uses left: ',
    emergencyPityNoticeEnd: 'x). Choosing Medkit grants no new card.',
    claimCardBtn: 'Claim Card',

    // ── GameOverModal ──
    victoryTitle: '🏆 ETERNAL VICTORY!',
    victorySub: 'Outstanding! You conquered all Cyber Battle Stages!',
    defeatTitle: '💥 BATTLE OVER',
    defeatSub: 'Your HP was depleted by enemy attacks. Never give up, build a new strategy!',
    statFinalStage: 'Final Stage Reached',
    statTotalMatches: 'Total Matches Made',
    statAiMode: 'AI Difficulty Mode',
    viewLeaderboardBtn: '🏆 View Global Top Scores',
    playAgainBtn: '⚔️ Play Again (Stage 1)',
    backDashBtn: '🏠 Return to Dashboard',

    // ── ResetConfirmModal ──
    resetTitle: 'GAME RESET CONFIRMATION',
    resetBody: 'Are you sure you want to restart from Stage 1? Your current HP, Armor, and Deck progress will be reset.',
    resetConfirmBtn: 'Yes, Reset from Stage 1',
    resetCancelBtn: 'Cancel',

    // ── Game Messages & Floating Texts ──
    msgStageStart: 'Stage {stage}: Battle against {enemy}!',
    msgMatched: '{name} matched {card}! ({effect})',
    msgMismatch: 'Mismatch! {name}\'s turn ends.',
    msgTimeOut: '15-Second Time Limit Expired! Turn switched.',
    msgStageCleared: '🎉 Stage {stage} Clear! Enemy defeated.',
    floatTurnPlayer: '⚔️ Your Turn!',
    floatTurnEnemy: '🤖 Enemy Turn!',
    floatExtraTurn: '✨ Match! Extra Turn!',
    floatDamage: '-{val} HP',
    floatBlock: '+{val} Armor',
    floatHeal: '+{val} HP',
    floatScan: '👁️ Board Scanned!',
    startAttackMsg: 'Choose 2 cards to attack the enemy!',
    reloadWarnMsg: 'Your battle is in progress! Refreshing the web will reset the battle from the beginning.',
    timeoutFloat: '⏰ TIME OUT!',
    timeoutMsg: '⏰ Your thinking time expired! Turn switched to Enemy!',
    aiDifficultyChange: '🧠 AI Difficulty Mode Changed to: {mode}',
    playerFrozenFloat: '🧊 You are Frozen! Turn Skipped!',
    playerFrozenMsg: '🧊 You are frozen by Frostbite Stasis! Turn switched to Enemy.',
    enemyFrozenFloat: '🧊 Enemy Frozen! Turn Skipped!',
    enemyFrozenMsg: '🧊 {enemy} is frozen by Frostbite Stasis! Turn switches back to You.',
    aiThinkingMsg: '🤖 {enemy} (AI {difficulty}) is thinking...',
    matchTitleFloat: '✨ MATCH: {name}!',
    roundResetFloat: '🔄 New Round! Board Reset',
    roundResetMsg: '🔄 All 16 cards matched! Shuffling board for the next Round...',
    matchSuccessMsg: '✨ Match! {actor} successfully used {card} effect!',
    mismatchMsg: '❌ Mismatch! {actor}\'s turn ends.',
    mirageActiveFloat: '🪞 MIRAGE 2X EFFECT ACTIVE!',
    pierceFloat: '🗡️ PIERCE -{damage} HP',
    armorAbsorbFloat: '-{val} Armor',
    divineWrathFloat: '⚡ DIVINE WRATH +{healBonus} HP!',
    neuralFlashPlayerFloat: '🧠 NEURAL FLASH: Entire Board Revealed!',
    neuralFlashEnemyFloat: '🤖 ENEMY FLASH HACKED THE BOARD!',
    xrayScanFloat: '👁️ X-RAY SCAN: {name}!',
    xrayScanEnemyFloat: '🤖 ENEMY SCANNED THE BOARD!',
    empFloat: '⚡ EMP! Armor destroyed! -{damage} HP',
    glitchFloat: '👾 GLITCH -{damage} HP!',
    virusFloat: '☠️ VIRUS -{damage} HP!',
    rewindMistakeActiveFloat: '🌀 MISTAKE REWIND ACTIVE: Next mistake forgiven!',
    rewindMistakeTriggeredFloat: '⏳ REWOUND: Your turn again!',
    drainFloat: '🧲 DRAIN: +{stolen} Armor & -{damage} HP!',
    drainEnemyFloat: '🧲 ENEMY DRAIN: +{stolen} Armor!',
    frostbiteFloat: '❄️ FROSTBITE: Enemy Frozen (1 Turn)!',
    frostbiteEnemyFloat: '❄️ ENEMY FROSTBITE: Your Turn Frozen!',
    gambleWinFloat: '🎲 LUCKY WIN! {damage} DAMAGE!',
    gambleLossFloat: '💥 BACKFIRE! -{damage} HP & Target +{heal} HP!',
    mirageCastFloat: '🪞 MIRAGE: Next Card 2x Effect!',
    mirageCastEnemyFloat: '🪞 ENEMY MIRAGE: 2x Effect Active!',
    emergencyPityFloat: '🚑 EMERGENCY ASSISTANCE! +35 HP & +25 ARMOR',
    deckCompleteFloat: '💖 +50 HP FULL DECK BONUS!',

    // ── Card Descriptions & Lore Stories ──
    cards: {
      atk_dagger: {
        description: 'Deals 12 damage to the enemy.',
        lore: 'A photon spell dagger forged by Rune Sorcerers in Neo-Veridia Alchemy Lab. Engraved with ancient sacred incantations imbued with neon energy, it pierces the enemy soul and memory in a blink.'
      },
      def_nano: {
        description: 'Grants 10 Armor/Block.',
        lore: 'A mystical barrier fusing Elven Protection Magic and Nanobot matrices. Created by Cybermedis Sorcerers, this crystal mesh instantly manifests a sacred protective shield upon sensing danger.'
      },
      heal_nectar: {
        description: 'Restores 10 HP.',
        lore: 'Pure bioluminescent mana liquid extracted from Everlasting Flowers of Aether Forest. Known by Cyber Mages as a miraculous soul-healing potion capable of sealing cell fusion wounds in seconds.'
      },
      atk_plasma: {
        description: 'Deals 22 damage to the enemy.',
        lore: 'An ionized plasma blade infused with Ancient Fire Dragonsoul. Crafted by Alchemist Blacksmiths, this heirloom weapon emits 10,000°C magical flames capable of cleaving dark matrix cores.'
      },
      def_aura: {
        description: 'Grants 18 Armor/Block.',
        lore: 'An energy shield engraved with Sacred Mandala Geometry projected from an ancient magic diamond talisman. This enchanted defender deflects enemy curses and withstands physical strikes with mystic aura.'
      },
      heal_elixir: {
        description: 'Restores 20 HP.',
        lore: 'A secret elixir concocted by Destiny Alchemists of Neo-Kyoto Digital Temple. Blending mystical life-seed essence with regenerative molecules to dramatically awaken vital soul and physical strength.'
      },
      buff_vision: {
        description: 'Peeks at 2 face-down cards on the board.',
        lore: 'A sacred oracle eye relic belonging to the Ancient Oracle of Sector 0 Shrine. Combining clairvoyance with high-dimensional spectral scanning, this mystic lens pierces the veil of fate to reveal hidden cards.'
      },
      debuff_poison: {
        description: 'Corrosive virus erodes enemy HP (16 Damage).',
        lore: 'A black magic curse encoded as a bio-digital virus invading enemy dreamscapes. This molecular poison slowly erodes the enemy\'s soul and defensive shields beyond any warding talisman.'
      },
      atk_pierce: {
        description: '18 Damage Penetration PIERCES enemy Armor directly!',
        lore: 'A quantum spear inlaid with sacred photon Valkyrie Runes. Cleaving fate across space and time, it completely bypasses physical armor or magical shields to strike lethal vital points.'
      },
      atk_aether: {
        description: 'Deals a massive cosmic slash of 30 damage!',
        lore: 'A cosmic blade slash of Archangels embedded with Pure Aether Crystals. Cleaving astral dimensions, it releases high-tier cosmic magic shockwaves that shatter even the fiercest foes.'
      },
      def_aegis: {
        description: 'Grants a stout energy fortress of 32 Armor!',
        lore: 'The supreme defense spell crafted by High Sorcerer Parliament of Upper Sector. Summons a Sanctuary inlaid with sacred warding crystals reflecting heavy assaults within an eternal magic fortress.'
      },
      heal_phoenix: {
        description: 'Restores a massive 35 HP regeneration!',
        lore: 'A sacred relic storing the Fire Essence of the Eternal Phoenix. When triggered in battle rituals, warm regeneration flames burn away dead cells and restore 35 HP to perfection.'
      },
      debuff_glitch: {
        description: 'Disrupts enemy system & deals 24 Damage.',
        lore: 'A fractal magic glitch hex disrupting enemy cognition. Projecting corrupted illusion matrices that trap enemies in subconscious labyrinths while eroding defensive circuits.'
      },
      debuff_emp: {
        description: 'EMP pulse disables shield & deals 28 Damage.',
        lore: 'An Electromagnetic Lightning Pulse Incantation forged from Ancient Elemental Storms. When unleashed, lightning shockwaves paralyze enemy circuits, crush armor, and scramble memories.'
      },
      pity_wrath: {
        description: 'Divine lightning strikes 40 Damage + Heals 15 HP!',
        lore: 'Manifestation of Ancient Titan Wrath from the Realm of Cybernetic Gods. Summoned when sacred warriors stand on the brink of death, striking enemies with 40 Divine Lightning Damage while healing 15 HP.'
      },
      chrono_rewind: {
        description: 'Rewind Mistake: Your next mismatch is forgiven, you keep your turn!',
        lore: 'Crystal hourglass relic crafted by Chrono-Mages. Rewinds time to undo bad fate.'
      },
      drain_syphon: {
        description: 'Steals 15 enemy Armor to self + deals 10 Damage!',
        lore: 'A bioluminescent energy matrix syphon from the Alchemy Sector. Absorbs enemy defensive bulwarks to reinforce personal shielding.'
      },
      ctrl_frostbite: {
        description: 'Freezes the enemy AI turn! (Enemy loses 1 Turn)',
        lore: 'A Frost-Byte Eternal Ice seal spell from the mountains of Cyberia. Freezes enemy cognitive memories within a dome of pure ice.'
      },
      buff_neural: {
        description: 'Reveals ALL face-down cards for 1.5 seconds! (AI limited to 2-6 cards).',
        lore: 'Spectral brain-hacker implant. Injects a pulse of light that reveals the entire board in a blink.'
      },
      gamble_cosmic: {
        description: '50% Chance: 35 Cosmic Damage OR 50% Chance: Receive 10 Damage & Target +10 HP!',
        lore: 'Chaos Alchemist Dice artifact from the Void Dimension. Divine luck decides whether this spell obliterates the enemy or backfires.'
      },
      special_mirage: {
        description: 'Doubles (2x) the effect of the next successfully matched card!',
        lore: 'An astral dimension fractal illusion mirror that refracts 1 spell trace into 2 real shadows.'
      }
    },
    // ── Additional Modals Lokalisasi ──
    deckFullBadge: '✨ DECK COMPLETE 100% ✨',
    deckFullDesc: 'Congratulations! All 21 catalog cards have been collected in your Deck. Receive maximum HP recovery bonus!',
    claimBonusBtn: 'Claim Bonus +50 HP & Continue',
    emergencyMedkitBtn: '🚑 Take Medkit',
    globalLBLoading: 'Loading global scores...',
    globalLBSub: 'Top 10 Players Worldwide — Memory Card Battle',
    globalLBError: 'Failed to load leaderboard data. Check your internet connection.',
    globalLBRetry: 'Retry',
    youPill: 'You',
    clickToOpenLore: 'Click to open Lore story & Card Details',
    loreFallback: 'This card\'s secret archive is stored within the memory core of the Neo-Veridia Sector.',
  }
};

/** Helper function to get current language code from localStorage (Default: 'ID') */
export const getCurrentLang = () => {
  return localStorage.getItem('memory_game_lang') || 'ID';
};

/** Helper function to set language code in localStorage */
export const setGameLang = (langCode) => {
  localStorage.setItem('memory_game_lang', langCode);
};

/** Helper function to fetch translation text by key with optional fallback */
export const t = (key, lang = getCurrentLang()) => {
  const dict = TRANSLATIONS[lang] || TRANSLATIONS.ID;
  return dict[key] !== undefined ? dict[key] : (TRANSLATIONS.ID[key] || key);
};
