/**
 * Sistem Pengaturan Bahasa (i18n - Internationalization)
 * Mendukung Bahasa Indonesia (id) 🇮🇩 & English (en) 🇬🇧
 */

export const LANGUAGES = {
  ID: 'id',
  EN: 'en'
};

export const getLanguage = () => {
  return localStorage.getItem('memory_game_lang') || LANGUAGES.ID;
};

export const setLanguage = (lang) => {
  localStorage.setItem('memory_game_lang', lang);
};

export const TRANSLATIONS = {
  id: {
    // ── NameModal / Dashboard ──
    app_title: 'MEMORY CARD BATTLE',
    app_subtitle: 'Cyberfantasy RPG & Memory Matching Game',
    feat_battle: '⚔️ 1v1 Battle RPG',
    feat_cards: '🃏 15 Kartu Cyber',
    feat_pity: '🛡️ Pity System',
    input_placeholder: 'Ketik Nama Pemain...',
    ai_mode_label: '🧠 Mode Kesulitan AI Musuh:',
    ai_auto: '🔄 Otomatis (Stage)',
    ai_easy: '🟢 Mudah (35%)',
    ai_medium: '🟡 Sedang (65%)',
    ai_hard: '🔴 Tinggi (88%)',
    ai_desc_auto: 'ℹ️ Otomatis: Kesulitan AI naik bertahap dari Stage 1 (35%) hingga Stage 5+ (88%).',
    ai_desc_easy: 'ℹ️ Mudah: AI Musuh mengingat 35% posisi kartu. Cocok untuk pemain baru!',
    ai_desc_medium: 'ℹ️ Sedang: AI Musuh mengingat 65% posisi kartu. Pertarungan seimbang!',
    ai_desc_hard: 'ℹ️ Tinggi: AI Musuh mengingat 88% posisi kartu. Tantangan memori tingkat dewa!',
    nav_guide: '📖 Panduan',
    nav_catalog: '🂠 Katalog',
    nav_scores: '🏆 Topskor',
    dash_tip: '💡 Tips Arena: Kumpulkan 15 kartu unik melalui Loot Stage Clear dan aktifkan Bio-Shield Medkit saat HP Kritis!',
    start_battle_btn: '⚔️ Mulai Pertarungan',
    lang_toggle_btn: '🌐 Bahasa: Indonesia 🇮🇩',

    // ── GameBoard HUD ──
    turn_player_banner: '• GILIRAN ANDA',
    turn_enemy_banner: '• GILIRAN MUSUH',
    ai_badge: '🧠 AI:',
    stage_label: 'STAGE',
    round_label: 'RONDE',
    music_btn: 'Musik',
    sfx_btn: 'SFX',
    guide_btn: 'Panduan',
    catalog_btn: 'Kartu Stage',
    scores_btn: 'Skor',
    reset_btn: 'Reset',
    status_initial: 'Stage {stage}: Pertarungan melawan {enemy}!',
    status_mismatch_player: '❌ Mismatch! Giliran Anda berakhir.',
    status_mismatch_enemy: '❌ Mismatch! Giliran {enemy} berakhir.',
    status_timeout: '⏰ Waktu 15 detik habis! Giliran berpindah.',

    // ── PlayerStatus ──
    matches_count: '✨ {count} Match',
    total_match_global: 'Total Match: {count}',

    // ── Catalog & Detail Modal ──
    catalog_title_dashboard: '🂠 KATALOG 15 KARTU GAME',
    catalog_sub_dashboard: 'Kompendium Koleksi Statistik, Efek, & Gambar 3D Render 15 Kartu Cyberfantasy (Klik kartu untuk baca Kisah Lore):',
    catalog_title_stage: '🂠 KARTU AKTIF STAGE {stage}',
    catalog_sub_stage: 'Menampilkan {count} jenis kartu di papan Stage {stage} (Klik kartu untuk baca Kisah Lore):',
    catalog_sub_all_ingame: 'Menampilkan seluruh 15 jenis kartu kompendium katalog (Klik kartu untuk cerita detail):',
    toggle_view_stage: '🎯 Kembali ke Kartu Stage {stage}',
    toggle_view_all: '🂠 Lihat Semua 15 Kartu Katalog',
    close_catalog_btn: 'Tutup Katalog',
    lore_hint: '📜 Kisah Lore',
    lore_archive_header: 'CYBER LORE ARCHIVE',
    effect_val: 'NILAI EFEK',
    special_piercing: '🗡️ Kuantum Penetrasik',
    close_detail_btn: 'Tutup Detail Kartu',
    click_to_read: 'Klik untuk membuka Kisah Lore & Detail Kartu',

    // ── GuideModal ──
    guide_modal_title: '📖 BUKU PANDUAN GAME',
    guide_modal_subtitle: 'Panduan Lengkap Alur Permainan, Aturan Arena, Fitur Pertolongan, & Musuh AI:',
    section_flow: '⚔️ Alur & Cara Bermain',
    step1_title: 'Pilih Nama & Mode AI:',
    step1_desc: 'Ketik nama pemain dan pilih tingkat kecerdasan AI Musuh (Otomatis, Mudah 35%, Sedang 65%, atau Tinggi 88%).',
    step2_title: 'Buka Pasangan Kartu di Papan:',
    step2_desc: 'Di setiap giliran, klik 2 kartu tertutup di papan 4x4. Jika 2 kartu cocok (Match), efek kartu langsung aktif!',
    step3_title: 'Giliran Ekstra & Batas Waktu 15 Detik:',
    step3_desc: 'Pemain yang berhasil mencocokkan kartu mendapatkan giliran tambahan. Jika kartu tidak cocok atau waktu 15 detik habis, giliran berpindah ke lawan.',
    step4_title: 'Hadiah Kartu & Stage Baru:',
    step4_desc: 'Kalahkan musuh untuk memilih 1 Kartu Hadiah baru yang belum Anda miliki dan lanjut bertualang ke Stage berikutnya!',
    section_rules: '🎲 Aturan Papan & Arena Pertarungan',
    rule1_title: '1. Papan Arena 4x4 (16 Kartu / 8 Pasang):',
    rule1_desc: 'Di setiap stage, arena memilih 8 jenis kartu dari koleksi Deck Anda untuk membentuk 8 pasang kartu tertutup (total 16 kartu di papan).',
    rule2_title: '2. Arena Milik Bersama (Shared Board):',
    rule2_desc: 'Kartu hadiah yang Anda dapatkan dimasukkan ke Deck Anda. Namun saat bertarung, siapa pun yang berhasil mencocokkan kartu di papan (Pemain maupun Musuh AI) dialah yang memperoleh efek dari kartu tersebut!',
    rule3_title: '3. Kelengkapan Kartu (15 Kartu Katalog):',
    rule3_desc: 'Anda memulai perjalanan dengan 8 kartu awal dan dapat melengkapi seluruh 15 kartu katalog saat berhasil menaklukkan stage demi stage.',
    section_pity: '🚑 Fitur Pertolongan & Medkit Darurat (Maksimal 2x Pemakaian)',
    pity_text1: 'Jika HP Anda berada di bawah 50% atau mengalami kegagalan cocok 3 kali berturut-turut, ',
    pity_text2: 'Fitur Pertolongan Aktif!',
    pity_text3: 'Di layar Hadiah Kelulusan Stage, akan terbuka ',
    pity_medkit_label: 'Opsi Ke-4: 🚑 Bio-Shield Medkit (+35 HP & +25 Perisai instan).',
    pity_limit: '⚠️ Kuota Medkit Darurat: Penggunaan Medkit Darurat dibatasi maksimal 2 kali sepanjang satu perjalanan bertarung. Jika kuota 2 kali sudah habis terpakai, opsi ini tidak akan muncul lagi.',
    pity_strategy: 'Pertimbangan Strategi: Mengambil Medkit akan menyelamatkan HP Anda, namun Anda tidak memperoleh kartu baru sehingga penambahan koleksi kartu katalog Anda berjalan lebih lambat.',
    section_enemies: '👾 Musuh AI Berdasarkan Stage',
    close_guide_btn: 'Tutup Buku Panduan',

    // ── GameOverModal ──
    victory_title: '🏆 KEMENANGAN ARENA!',
    defeat_title: '💀 GAME OVER',
    final_stage: 'Stage Terakhir Dijangkau:',
    total_matches_stat: 'Total Match Pemain:',
    view_leaderboard_btn: '🏆 Lihat Topskor Global',
    restart_btn: '🔄 Main Lagi / Kembali ke Dashboard',

    // ── ResetConfirmModal ──
    reset_title: '⚠️ KONFIRMASI RESET PERMAINAN',
    reset_desc: 'Apakah Anda yakin ingin mengulang permainan dari Stage 1? Progresi stage dan match saat ini akan di-reset.',
    confirm_reset_btn: 'Ya, Reset Game',
    cancel_btn: 'Batal',

    // ── LootModal ──
    loot_title: '🎁 HADIAH KELULUSAN STAGE {stage}',
    loot_subtitle: 'Selamat! Pilih 1 Kartu Baru untuk Ditambahkan ke Deck Anda:',
    pity_badge: '🛡️ PITY SYSTEM AKTIF!',

    // ── LeaderboardModal ──
    lb_title: '🏆 PAPAN SKOR GLOBAL & SESI',
    tab_global: '🌐 Top 10 Global (Online)',
    tab_session: '💻 Skor Sesi Lokal',
    col_rank: 'PERINGKAT',
    col_name: 'NAMA PEMAIN',
    col_diff: 'DIFFICULTY',
    col_stage: 'STAGE',
    col_matches: 'TOTAL MATCH',
    empty_global: 'Belum ada data skor global. Jadilah yang pertama mencapai puncak!',
    empty_session: 'Belum ada skor sesi lokal tercatat.',
    close_scores_btn: 'Tutup Papan Skor'
  },

  en: {
    // ── NameModal / Dashboard ──
    app_title: 'MEMORY CARD BATTLE',
    app_subtitle: 'Cyberfantasy RPG & Memory Matching Game',
    feat_battle: '⚔️ 1v1 Battle RPG',
    feat_cards: '🃏 15 Cyber Cards',
    feat_pity: '🛡️ Pity System',
    input_placeholder: 'Enter Player Name...',
    ai_mode_label: '🧠 Enemy AI Difficulty Mode:',
    ai_auto: '🔄 Auto (Stage Scaling)',
    ai_easy: '🟢 Easy (35%)',
    ai_medium: '🟡 Medium (65%)',
    ai_hard: '🔴 Hard (88%)',
    ai_desc_auto: 'ℹ️ Auto: AI difficulty scales dynamically from Stage 1 (35%) to Stage 5+ (88%).',
    ai_desc_easy: 'ℹ️ Easy: Enemy AI remembers 35% of card positions. Perfect for beginners!',
    ai_desc_medium: 'ℹ️ Medium: Enemy AI remembers 65% of card positions. Balanced battle!',
    ai_desc_hard: 'ℹ️ Hard: Enemy AI remembers 88% of card positions. Extreme memory challenge!',
    nav_guide: '📖 Guide',
    nav_catalog: '🂠 Catalog',
    nav_scores: '🏆 Scores',
    dash_tip: '💡 Arena Tip: Collect 15 unique cards via Stage Clear Loot and activate Bio-Shield Medkit when HP is Critical!',
    start_battle_btn: '⚔️ Start Battle',
    lang_toggle_btn: '🌐 Language: English 🇬🇧',

    // ── GameBoard HUD ──
    turn_player_banner: '• YOUR TURN',
    turn_enemy_banner: '• ENEMY TURN',
    ai_badge: '🧠 AI:',
    stage_label: 'STAGE',
    round_label: 'ROUND',
    music_btn: 'Music',
    sfx_btn: 'SFX',
    guide_btn: 'Guide',
    catalog_btn: 'Stage Cards',
    scores_btn: 'Scores',
    reset_btn: 'Reset',
    status_initial: 'Stage {stage}: Battle against {enemy}!',
    status_mismatch_player: '❌ Mismatch! Your turn has ended.',
    status_mismatch_enemy: '❌ Mismatch! {enemy}\'s turn has ended.',
    status_timeout: '⏰ Time\'s up! Turn switched.',

    // ── PlayerStatus ──
    matches_count: '✨ {count} Matches',
    total_match_global: 'Total Matches: {count}',

    // ── Catalog & Detail Modal ──
    catalog_title_dashboard: '🂠 15 CARD COMPENDIUM',
    catalog_sub_dashboard: 'Full Stats, Effects, & 3D Render Artwork of 15 Cyberfantasy Cards (Click card to read Lore):',
    catalog_title_stage: '🂠 ACTIVE CARDS STAGE {stage}',
    catalog_sub_stage: 'Showing {count} card types currently on Stage {stage} board (Click card to read Lore):',
    catalog_sub_all_ingame: 'Showing all 15 catalog compendium cards (Click card for detailed story):',
    toggle_view_stage: '🎯 Back to Stage {stage} Cards',
    toggle_view_all: '🂠 View All 15 Catalog Cards',
    close_catalog_btn: 'Close Catalog',
    lore_hint: '📜 Lore Story',
    lore_archive_header: 'CYBER LORE ARCHIVE',
    effect_val: 'EFFECT VALUE',
    special_piercing: '🗡️ Quantum Armor Piercing',
    close_detail_btn: 'Close Card Detail',
    click_to_read: 'Click to open Lore Story & Card Details',

    // ── GuideModal ──
    guide_modal_title: '📖 GAME GUIDEBOOK',
    guide_modal_subtitle: 'Complete Guide to Gameplay Flow, Board Rules, Pity System, & AI Enemies:',
    section_flow: '⚔️ Flow & How to Play',
    step1_title: 'Set Name & AI Mode:',
    step1_desc: 'Type player name and select Enemy AI memory accuracy (Auto, Easy 35%, Medium 65%, or Hard 88%).',
    step2_title: 'Flip Card Pairs on Board:',
    step2_desc: 'On each turn, click 2 face-down cards on the 4x4 board. Matching pairs instantly activate card effects!',
    step3_title: 'Extra Turn & 15s Time Limit:',
    step3_desc: 'Matching a pair grants an extra turn. Mismatching or timing out (15s) passes the turn to your opponent.',
    step4_title: 'Loot Rewards & Stage Clear:',
    step4_desc: 'Defeat enemies to select 1 unowned new Loot Card and advance to the next Stage!',
    section_rules: '🎲 Arena & Board Mechanics',
    rule1_title: '1. 4x4 Arena Board (16 Cards / 8 Pairs):',
    rule1_desc: 'On each stage, the arena picks 8 unique card types from your Deck to form 8 pairs (16 face-down cards).',
    rule2_title: '2. Shared Board Mechanics:',
    rule2_desc: 'Loot cards are added to your Deck. However, during battle, whoever matches the pair (Player or AI) activates its effect!',
    rule3_title: '3. Full Collection (15 Catalog Cards):',
    rule3_desc: 'You start with 8 starter cards and can collect all 15 catalog cards as you conquer stage after stage.',
    section_pity: '🚑 Emergency Medkit & Pity System (Max 2 Uses)',
    pity_text1: 'If your HP drops below 50% or you suffer 3 consecutive mismatches, ',
    pity_text2: 'Pity System Activates!',
    pity_text3: 'On the Stage Clear reward screen, ',
    pity_medkit_label: 'Option 4 opens: 🚑 Bio-Shield Medkit (+35 HP & +25 Shield instant).',
    pity_limit: '⚠️ Emergency Medkit Limit: Usage is strictly limited to 2 times per battle run. Once 2 charges are spent, this option won\'t appear again.',
    pity_strategy: 'Strategic Trade-off: Taking Medkit saves your life, but grants no new card, slowing down your 15-card collection progress.',
    section_enemies: '👾 AI Enemies by Stage',
    close_guide_btn: 'Close Guidebook',

    // ── GameOverModal ──
    victory_title: '🏆 ARENA VICTORY!',
    defeat_title: '💀 GAME OVER',
    final_stage: 'Final Stage Reached:',
    total_matches_stat: 'Player Total Matches:',
    view_leaderboard_btn: '🏆 View Global Leaderboard',
    restart_btn: '🔄 Play Again / Return to Dashboard',

    // ── ResetConfirmModal ──
    reset_title: '⚠️ CONFIRM GAME RESET',
    reset_desc: 'Are you sure you want to restart from Stage 1? Current stage and match progress will be reset.',
    confirm_reset_btn: 'Yes, Reset Game',
    cancel_btn: 'Cancel',

    // ── LootModal ──
    loot_title: '🎁 STAGE {stage} CLEAR REWARD',
    loot_subtitle: 'Congratulations! Choose 1 New Card to add to your Deck:',
    pity_badge: '🛡️ PITY SYSTEM ACTIVE!',

    // ── LeaderboardModal ──
    lb_title: '🏆 GLOBAL & SESSION LEADERBOARD',
    tab_global: '🌐 Top 10 Global (Online)',
    tab_session: '💻 Local Session Scores',
    col_rank: 'RANK',
    col_name: 'PLAYER NAME',
    col_diff: 'DIFFICULTY',
    col_stage: 'STAGE',
    col_matches: 'TOTAL MATCHES',
    empty_global: 'No global scores yet. Be the first to reach the top!',
    empty_session: 'No local session scores recorded yet.',
    close_scores_btn: 'Close Leaderboard'
  }
};

/**
 * Utility translation getter
 * Usage: t('app_title') or t('status_initial', { stage: 1, enemy: 'Cyber Scout' })
 */
export const t = (key, params = {}) => {
  const currentLang = getLanguage();
  let text = TRANSLATIONS[currentLang]?.[key] || TRANSLATIONS.id[key] || key;

  Object.keys(params).forEach((paramKey) => {
    text = text.replace(`{${paramKey}}`, params[paramKey]);
  });

  return text;
};

/**
 * Translates Card objects dynamically based on current language
 */
export const getTranslatedCard = (card) => {
  if (!card) return card;
  const currentLang = getLanguage();
  if (currentLang === LANGUAGES.ID) return card;

  // English Card Translations Dictionary
  const cardEnMap = {
    atk_dagger: {
      name: 'Cyber Dagger',
      description: 'Deals 12 damage to enemy.',
      lore: 'A photon spell blade forged by Rune Sorcerers in the Neo-Veridia Alchemy Lab. Engraved with ancient sacred mantras and infused with neon energy, it pierces enemy soul and memory instantly.'
    },
    def_nano: {
      name: 'Nano Barrier',
      description: 'Grants 10 Armor/Block.',
      lore: 'A magical shield combining Elven Protection Magic and Nanobot matrices. Created by Cybermedis Sorcerers, this crystal net projects a holy protective barrier instantly when danger approaches.'
    },
    heal_nectar: {
      name: 'Bio Nectar',
      description: 'Restores 10 HP.',
      lore: 'Pure bioluminescent mana liquid extracted from Eternal Flowers in the Aether Forest. Known by Cyber Mages as a miraculous soul-healing elixir capable of closing cell fusion wounds in seconds.'
    },
    atk_plasma: {
      name: 'Plasma Blade',
      description: 'Deals 22 damage to enemy.',
      lore: 'An ionized plasma blade infused with Ancient Fire Dragon Soul. This relic weapon crafted by Alchemist Blacksmiths radiates 10,000°C magical flames capable of slicing through dark matrix cores.'
    },
    def_aura: {
      name: 'Aura Shield',
      description: 'Grants 18 Armor/Block.',
      lore: 'An energy shield engraved with Sacred Mandala Geometry projected from an ancient magic diamond talisman. This blessed protector deflects enemy curses and holds off physical strikes with mystical aura.'
    },
    heal_elixir: {
      name: 'Cyber Elixir',
      description: 'Restores 20 HP.',
      lore: 'A secret elixir crafted by Destiny Alchemists from the Neo-Kyoto Digital Temple. Blending mystical seeds of life with regenerative molecules to dramatically awaken physical and soul vitality.'
    },
    buff_vision: {
      name: 'Oracle Eye',
      description: 'Peeks at 2 face-down cards on board.',
      lore: 'A holy seer eye relic belonging to the Ancient Oracle of Sector 0 Temple. Combining divine vision with high-dimensional spectral scans, this mystic lens pierces the veil of destiny to reveal hidden cards.'
    },
    debuff_poison: {
      name: 'Corrosive Virus',
      description: 'Corrosive virus erodes HP (16 Damage).',
      lore: 'A dark magic curse coded as a bio-digital virus corrupting enemy dreamscapes. This molecular magic poison erodes enemy soul and armor steadily without being blocked by protective talismans.'
    },
    atk_pierce: {
      name: 'Quantum Piercer',
      description: '18 Damage PIERCES enemy Armor directly!',
      lore: 'A quantum spear embedded with Valkyrie Runes and holy photon energy. Slicing through space and time destiny to bypass all physical armor or magic shields, striking vital spots lethally.'
    },
    atk_aether: {
      name: 'Aether Strike',
      description: 'Cosmic slash dealing 30 damage!',
      lore: 'An Archangel cosmic blade slash studded with Pure Aether Crystals. Slicing astral dimensions and releasing high-power cosmic magic blasts that crush even the toughest foes.'
    },
    def_aegis: {
      name: 'Aegis Protocol',
      description: 'Sturdy energy sanctuary with 32 Armor!',
      lore: 'The ultimate defense incantation created by the High Wizard Parliament of Upper Sector. Summoning an 8-sided Sanctuary studded with holy protective crystals reflecting heavy blows in eternal magic fortress.'
    },
    heal_phoenix: {
      name: 'Phoenix Catalyst',
      description: 'Massive regeneration restoring 35 HP!',
      lore: 'A holy relic holding the Fire Soul of the Immortal Phoenix. Triggered in battle rituals, warm regeneration waves burn away dead cells and restore 35 HP flawlessly.'
    },
    debuff_glitch: {
      name: 'Glitch Overlay',
      description: 'Disrupts enemy system & deals 24 Damage.',
      lore: 'A magical fractal illusion hex distorting enemy cognition. Emitting glitch illusion matrices that trap enemies in subconscious labyrinths while destroying defense circuits.'
    },
    debuff_emp: {
      name: 'EMP Disrupter',
      description: 'EMP pulse shatters armor & deals 28 Damage.',
      lore: 'An Electromagnetic Lightning Pulse Incantation forged from Ancient Elemental Storms. When unleashed, shockwave arc lightning paralyzes enemy circuits, shatters armor, and scrambles memory.'
    },
    pity_wrath: {
      name: 'Divine Wrath',
      description: 'Sacred strike 40 Damage + Heal 15 HP!',
      lore: 'Manifestation of Ancient Titan Wrath from the Realm of Cybernetic Deities. Summoned when sacred warriors stand at death\'s door, unleashing 40 Damage holy lightning and restoring 15 HP.'
    }
  };

  const translated = cardEnMap[card.id];
  if (!translated) return card;

  return {
    ...card,
    name: translated.name,
    description: translated.description,
    lore: translated.lore
  };
};
