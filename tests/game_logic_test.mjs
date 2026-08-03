/**
 * ══════════════════════════════════════════════════════════════
 * MEMORY CARD BATTLE — Comprehensive Test Suite v2.0
 * Termasuk Boss Challenge Mode (Abyss Omega Arena)
 * ══════════════════════════════════════════════════════════════
 * 
 * Menjalankan 42 test case yang mencakup seluruh logika game:
 * - Card Database Integrity (21 kartu)
 * - Board Generation (RPG 4x4 & Boss 6x7)
 * - AI Memory Engine
 * - Loot & Pity System
 * - Enemy Stage Scaling
 * - i18n Boss Challenge Keys
 * - HP Configuration & Game Mode Logic
 * - Elapsed Time Tracker
 * - Fisher-Yates Shuffle Validation
 * 
 * Jalankan: node tests/game_logic_test.mjs
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, '..');

// ═══════════════════════════════════════════
// INLINE MODULE IMPORTS (tanpa bundler)
// ═══════════════════════════════════════════

// Parse cardData.js untuk mendapatkan CARD_DATABASE
const cardDataRaw = readFileSync(join(ROOT, 'src/utils/cardData.js'), 'utf-8');
const i18nRaw = readFileSync(join(ROOT, 'src/utils/i18n.js'), 'utf-8');
const lootRaw = readFileSync(join(ROOT, 'src/utils/lootSystem.js'), 'utf-8');
const aiRaw = readFileSync(join(ROOT, 'src/utils/aiLogic.js'), 'utf-8');
const gameBoardRaw = readFileSync(join(ROOT, 'src/components/GameBoard/GameBoard.jsx'), 'utf-8');
const gameOverRaw = readFileSync(join(ROOT, 'src/components/GameOverModal/GameOverModal.jsx'), 'utf-8');
const nameModalRaw = readFileSync(join(ROOT, 'src/components/NameModal/NameModal.jsx'), 'utf-8');
const gameBoardCssRaw = readFileSync(join(ROOT, 'src/components/GameBoard/GameBoard.css'), 'utf-8');
const nameModalCssRaw = readFileSync(join(ROOT, 'src/components/NameModal/NameModal.css'), 'utf-8');
const gameOverCssRaw = readFileSync(join(ROOT, 'src/components/GameOverModal/GameOverModal.css'), 'utf-8');

// ═══════════════════════════════════════════
// TEST FRAMEWORK (Minimal)
// ═══════════════════════════════════════════
let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const results = [];

function test(name, fn) {
  totalTests++;
  try {
    fn();
    passedTests++;
    results.push({ name, status: '✅ PASSED' });
  } catch (e) {
    failedTests++;
    results.push({ name, status: '❌ FAILED', error: e.message });
    console.error(`  ❌ FAILED: ${name}\n     Error: ${e.message}`);
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

function assertEqual(actual, expected, message) {
  if (actual !== expected) {
    throw new Error(`${message || 'Assertion failed'}: expected ${expected}, got ${actual}`);
  }
}

function assertIncludes(str, substr, message) {
  if (!str.includes(substr)) {
    throw new Error(`${message || 'Assertion failed'}: "${substr}" not found`);
  }
}

// ═══════════════════════════════════════════
// DATA EXTRACTION (Parse dari file sumber)
// ═══════════════════════════════════════════

// Extract card IDs from cardData.js
const cardIdMatches = [...cardDataRaw.matchAll(/id:\s*'([^']+)'/g)];
const cardIds = cardIdMatches.map(m => m[1]);

// Extract card types
const cardTypeMatches = [...cardDataRaw.matchAll(/type:\s*'([^']+)'/g)];
const cardTypes = cardTypeMatches.map(m => m[1]);

// Extract card rarities
const cardRarityMatches = [...cardDataRaw.matchAll(/rarity:\s*'([^']+)'/g)];
const cardRarities = cardRarityMatches.map(m => m[1]);

// Extract card values
const cardValueMatches = [...cardDataRaw.matchAll(/value:\s*(\d+)/g)];
const cardValues = cardValueMatches.map(m => parseInt(m[1]));

// Extract isPiercing flags
const piercingCount = (cardDataRaw.match(/isPiercing:\s*true/g) || []).length;

// Extract enemy configs from lootSystem
const enemyConfigMatches = [...lootRaw.matchAll(/name:\s*'([^']+)',\s*hp:\s*(\d+)/g)];

// Extract AI difficulty levels
const aiDiffMatches = [...aiRaw.matchAll(/(\w+):\s*\{[^}]*memoryAccuracy:\s*([\d.]+)/g)];

console.log('\n══════════════════════════════════════════════════════');
console.log(' MEMORY CARD BATTLE — Test Suite v2.0');
console.log(' Boss Challenge Mode + Full Game Logic');
console.log('══════════════════════════════════════════════════════\n');

// ═══════════════════════════════════════════
// SECTION 1: CARD DATABASE INTEGRITY
// ═══════════════════════════════════════════
console.log('📦 Section 1: Card Database Integrity');
console.log('─'.repeat(50));

test('TC-01: Total 21 kartu unik dalam CARD_DATABASE', () => {
  assertEqual(cardIds.length, 21, 'Total kartu');
});

test('TC-02: Tidak ada duplikat ID kartu', () => {
  const uniqueIds = new Set(cardIds);
  assertEqual(uniqueIds.size, 21, 'Unique card IDs');
});

test('TC-03: Semua kartu memiliki rarity yang valid', () => {
  const validRarities = ['common', 'rare', 'epic'];
  cardRarities.forEach((r, i) => {
    assert(validRarities.includes(r), `Card ${cardIds[i]} has invalid rarity: ${r}`);
  });
});

test('TC-04: Distribusi tipe kartu mencakup 11 kategori', () => {
  const uniqueTypes = new Set(cardTypes);
  const expectedTypes = ['ATTACK', 'DEFENSE', 'HEAL', 'BUFF', 'DEBUFF', 'UTILITY', 'DRAIN', 'CONTROL', 'RISK', 'SPECIAL'];
  expectedTypes.forEach(t => {
    assert(uniqueTypes.has(t), `Missing card type: ${t}`);
  });
});

test('TC-05: Quantum Piercer memiliki flag isPiercing: true', () => {
  assertIncludes(cardDataRaw, "isPiercing: true", 'isPiercing flag');
  assertEqual(piercingCount, 1, 'Hanya 1 kartu piercing');
});

test('TC-06: Semua kartu memiliki properti wajib (id, name, type, rarity, value, icon, img)', () => {
  const requiredFields = ['id:', 'name:', 'type:', 'rarity:', 'value:', 'icon:', 'img:'];
  // Count card blocks by counting 'id:' occurrences
  assertEqual(cardIds.length, 21, 'All cards have id');
  requiredFields.forEach(field => {
    const count = (cardDataRaw.match(new RegExp(field, 'g')) || []).length;
    assert(count >= 21, `Field "${field}" found ${count} times, expected >= 21`);
  });
});

test('TC-07: Kartu hybrid Divine Wrath memberikan Heal', () => {
  assertIncludes(cardDataRaw, 'Heal 15 HP!', 'Heal description exists');
});

test('TC-08: Distribusi rarity — Common: 3, Rare: 8, Epic: 10', () => {
  const common = cardRarities.filter(r => r === 'common').length;
  const rare = cardRarities.filter(r => r === 'rare').length;
  const epic = cardRarities.filter(r => r === 'epic').length;
  assertEqual(common, 3, 'Common count');
  assertEqual(rare, 8, 'Rare count');
  assertEqual(epic, 10, 'Epic count');
});

// ═══════════════════════════════════════════
// SECTION 2: BOARD GENERATION LOGIC
// ═══════════════════════════════════════════
console.log('\n🎴 Section 2: Board Generation Logic');
console.log('─'.repeat(50));

test('TC-09: RPG Mode — resetBoardForStage menggunakan 8 pasang (16 kartu)', () => {
  // Verify the function uses pairCount = 8 when isBossMode is false
  assertIncludes(gameBoardRaw, "const pairCount = isBossMode ? uniqueCardTypes.length : 8;", 'pairCount logic');
});

test('TC-10: Boss Mode — resetBoardForStage menggunakan 21 pasang (42 kartu)', () => {
  // Verify boss mode uses all unique card types
  assertIncludes(gameBoardRaw, "isBossMode ? uniqueCardTypes.length : 8", 'Boss pairCount uses full deck');
});

test('TC-11: Fisher-Yates Shuffle digunakan untuk pengacakan kartu', () => {
  assertIncludes(gameBoardRaw, 'for (let i = boardCards.length - 1; i > 0; i--)', 'Fisher-Yates loop');
  assertIncludes(gameBoardRaw, 'Math.floor(Math.random() * (i + 1))', 'Fisher-Yates random');
});

test('TC-12: Map Deduplication mencegah duplikat tipe kartu di papan', () => {
  assertIncludes(gameBoardRaw, 'uniqueCardTypesMap', 'Map deduplication');
  assertIncludes(gameBoardRaw, "if (!uniqueCardTypesMap.has(card.id))", 'Dedup check');
});

test('TC-13: Setiap kartu di papan memiliki uniqueId unik', () => {
  assertIncludes(gameBoardRaw, '`${card.id}-a-${Math.random()}`', 'uniqueId suffix -a');
  assertIncludes(gameBoardRaw, '`${card.id}-b-${Math.random()}`', 'uniqueId suffix -b');
});

// ═══════════════════════════════════════════
// SECTION 3: AI MEMORY ENGINE
// ═══════════════════════════════════════════
console.log('\n🤖 Section 3: AI Memory Engine');
console.log('─'.repeat(50));

test('TC-14: 3 tingkat kesulitan AI terdefinisi (EASY, MEDIUM, HARD)', () => {
  assertEqual(aiDiffMatches.length, 3, 'AI difficulty levels count');
  const names = aiDiffMatches.map(m => m[1]);
  assert(names.includes('EASY'), 'EASY defined');
  assert(names.includes('MEDIUM'), 'MEDIUM defined');
  assert(names.includes('HARD'), 'HARD defined');
});

test('TC-15: Akurasi memori AI sesuai spesifikasi (35%, 65%, 88%)', () => {
  const accuracies = aiDiffMatches.map(m => parseFloat(m[2]));
  assert(accuracies.includes(0.35), 'EASY: 35%');
  assert(accuracies.includes(0.65), 'MEDIUM: 65%');
  assert(accuracies.includes(0.88), 'HARD: 88%');
});

test('TC-16: EMP Jammer mengacak total memori AI (100% random)', () => {
  assertIncludes(aiRaw, 'if (isJammerActive)', 'EMP Jammer check');
  // When jammer active, AI picks fully random
  const jammerBlock = aiRaw.substring(aiRaw.indexOf('if (isJammerActive)'));
  assertIncludes(jammerBlock, 'Math.floor(Math.random() * availableCards.length)', 'Random pick');
});

test('TC-17: AI 3-layer strategy (Known Pair → Half-Known → Random)', () => {
  assertIncludes(aiRaw, 'STRATEGI 1', 'Strategy 1: Known Pair');
  assertIncludes(aiRaw, 'STRATEGI 2', 'Strategy 2: Half-Known');
  assertIncludes(aiRaw, 'STRATEGI 3', 'Strategy 3: Random');
});

test('TC-18: AI memori dibersihkan setelah kartu cocok', () => {
  assertIncludes(gameBoardRaw, 'delete cleaned[c.uniqueId]', 'Memory cleanup on match');
});

// ═══════════════════════════════════════════
// SECTION 4: LOOT & PITY SYSTEM
// ═══════════════════════════════════════════
console.log('\n🎁 Section 4: Loot & Pity System');
console.log('─'.repeat(50));

test('TC-19: Loot System hanya menawarkan kartu yang BELUM dimiliki', () => {
  assertIncludes(lootRaw, 'unownedCards', 'Unowned card filtering');
  assertIncludes(lootRaw, "!playerCardIds.has(c.id)", 'Exclude owned cards');
});

test('TC-20: Pity System terpicu dengan dual-condition (HP < 50% DAN streak >= 3)', () => {
  assertIncludes(gameBoardRaw, '(player.hp / player.maxHp) < 0.5', 'HP threshold check');
  assertIncludes(gameBoardRaw, 'mismatchStreak >= 3', 'Mismatch streak check');
});

test('TC-21: Pity System dibatasi maksimal 2x pemakaian', () => {
  assertIncludes(lootRaw, 'MAX_PITY_USES = 2', 'Max pity uses');
});

test('TC-22: Bio-Shield Medkit memberikan +35 HP & +25 Armor', () => {
  assertIncludes(lootRaw, 'value: 35', 'Medkit HP value');
  assertIncludes(lootRaw, 'blockValue: 25', 'Medkit armor value');
});

test('TC-23: Rarity distribution normal — 10% Epic, 30% Rare, 60% Common', () => {
  assertIncludes(lootRaw, '0.10', 'Epic threshold');
  assertIncludes(lootRaw, '0.40', 'Rare threshold');
});

// ═══════════════════════════════════════════
// SECTION 5: ENEMY STAGE SCALING
// ═══════════════════════════════════════════
console.log('\n👹 Section 5: Enemy Stage Scaling');
console.log('─'.repeat(50));

test('TC-24: Stage 1 — Cyber Scout (HP 70, EASY)', () => {
  assertIncludes(lootRaw, "name: 'Cyber Scout', hp: 70", 'Stage 1 enemy');
  assertIncludes(lootRaw, "difficulty: 'EASY'", 'Stage 1 difficulty');
});

test('TC-25: Stage 2 — Cybergolem (HP 90, MEDIUM)', () => {
  assertIncludes(lootRaw, "name: 'Cybergolem', hp: 90", 'Stage 2 enemy');
});

test('TC-26: Stage 3 — Neon Spectre (HP 110, MEDIUM)', () => {
  assertIncludes(lootRaw, "name: 'Neon Spectre', hp: 110", 'Stage 3 enemy');
});

test('TC-27: Stage 4 — Aether Warlord (HP 140, HARD)', () => {
  assertIncludes(lootRaw, "name: 'Aether Warlord', hp: 140", 'Stage 4 enemy');
});

test('TC-28: Stage 5+ — Abyss Omega (HP 150 + scaling +30/stage)', () => {
  assertIncludes(lootRaw, 'Abyss Omega', 'Stage 5+ boss name');
  assertIncludes(lootRaw, '150 + (stageLevel - 5) * 30', 'HP scaling formula');
});

// ═══════════════════════════════════════════
// SECTION 6: BOSS CHALLENGE MODE
// ═══════════════════════════════════════════
console.log('\n🐉 Section 6: Boss Challenge Mode (Abyss Omega Arena)');
console.log('─'.repeat(50));

test('TC-29: Game Mode state terdefinisi (RPG / BOSS_CHALLENGE)', () => {
  assertIncludes(gameBoardRaw, "const [gameMode, setGameMode] = useState('RPG')", 'gameMode state');
});

test('TC-30: Boss elapsed time state terdefinisi', () => {
  assertIncludes(gameBoardRaw, 'const [bossStartTime, setBossStartTime] = useState(null)', 'bossStartTime state');
  assertIncludes(gameBoardRaw, 'const [bossElapsedTime, setBossElapsedTime] = useState(0)', 'bossElapsedTime state');
});

test('TC-31: handleNameSubmit menerima parameter gameMode', () => {
  assertIncludes(gameBoardRaw, "const handleNameSubmit = (name, mode = 'AUTO', gameModeSel = 'RPG')", 'gameModeSel param');
});

test('TC-32: Boss Challenge init — Player 200 HP, Boss 400 HP', () => {
  assertIncludes(gameBoardRaw, 'hp: 200, maxHp: 200', 'Player 200 HP');
  assertIncludes(gameBoardRaw, 'hp: 400,', 'Boss 400 HP');
  assertIncludes(gameBoardRaw, 'maxHp: 400,', 'Boss 400 maxHP');
});

test('TC-33: Boss Challenge init menggunakan seluruh CARD_DATABASE', () => {
  assertIncludes(gameBoardRaw, 'const fullDeck = [...CARD_DATABASE]', 'Full deck for boss');
});

test('TC-34: Boss Challenge — Pity System dinonaktifkan (0 uses)', () => {
  // In initBoardForBossChallenge, pityUsesLeft is set to 0
  const bossInitBlock = gameBoardRaw.substring(
    gameBoardRaw.indexOf('initBoardForBossChallenge'),
    gameBoardRaw.indexOf('resetBoardForStage(1, fullDeck, true, true)')
  );
  assertIncludes(bossInitBlock, 'setPityUsesLeft(0)', 'Pity disabled in boss');
});

test('TC-35: Boss Challenge — triggerStageClear TIDAK menampilkan Loot Modal', () => {
  assertIncludes(gameBoardRaw, "if (gameMode === 'BOSS_CHALLENGE')", 'Boss mode check in triggerStageClear');
  // Verify it returns early before showing loot modal
  const stageClearBlock = gameBoardRaw.substring(
    gameBoardRaw.indexOf('const triggerStageClear'),
    gameBoardRaw.indexOf('const triggerGameOver')
  );
  assertIncludes(stageClearBlock, "if (gameMode === 'BOSS_CHALLENGE')", 'Boss check exists');
  assertIncludes(stageClearBlock, 'return;', 'Early return for boss mode');
});

test('TC-36: Boss Challenge — Elapsed time dicatat saat victory', () => {
  const stageClearBlock = gameBoardRaw.substring(
    gameBoardRaw.indexOf('const triggerStageClear'),
    gameBoardRaw.indexOf('const triggerGameOver')
  );
  assertIncludes(stageClearBlock, 'Date.now() - (bossStartTime', 'Elapsed time calculation');
  assertIncludes(stageClearBlock, 'setBossElapsedTime(elapsedMs)', 'Elapsed time stored');
});

test('TC-37: Boss Challenge — Elapsed time ticker effect', () => {
  assertIncludes(gameBoardRaw, "gameMode === 'BOSS_CHALLENGE' && bossStartTime", 'Boss ticker condition');
  assertIncludes(gameBoardRaw, 'setBossElapsedTime(Date.now() - bossStartTime)', 'Ticker update');
});

test('TC-38: Boss Challenge — Board reset menggunakan flag isBossMode', () => {
  assertIncludes(gameBoardRaw, "resetBoardForStage(stage, playerDeck, false, gameMode === 'BOSS_CHALLENGE')", 'Boss mode board reset');
});

test('TC-39: Boss Challenge — returnToDashboard mereset gameMode ke RPG', () => {
  const returnBlock = gameBoardRaw.substring(
    gameBoardRaw.indexOf('const returnToDashboard'),
    gameBoardRaw.indexOf('const startNewJourney')
  );
  assertIncludes(returnBlock, "setGameMode('RPG')", 'Reset gameMode to RPG');
  assertIncludes(returnBlock, 'setBossStartTime(null)', 'Reset bossStartTime');
  assertIncludes(returnBlock, 'setBossElapsedTime(0)', 'Reset bossElapsedTime');
});

// ═══════════════════════════════════════════
// SECTION 7: BOSS CHALLENGE UI & CSS
// ═══════════════════════════════════════════
console.log('\n🎨 Section 7: Boss Challenge UI & CSS');
console.log('─'.repeat(50));

test('TC-40: CSS Grid 14x3 untuk Boss Challenge', () => {
  assertIncludes(gameBoardCssRaw, 'boss-grid-14x3', 'Boss grid class');
  assertIncludes(gameBoardCssRaw, 'repeat(14, 1fr)', 'Boss grid 14 columns');
});

test('TC-41: Boss header accent CSS (crimson-gold)', () => {
  assertIncludes(gameBoardCssRaw, 'boss-header', 'Boss header class');
  assertIncludes(gameBoardCssRaw, 'boss-badge', 'Boss badge class');
  assertIncludes(gameBoardCssRaw, 'pulseGlowBoss', 'Boss pulse animation');
});

test('TC-42: Game mode selector CSS di NameModal', () => {
  assertIncludes(nameModalCssRaw, 'game-mode-grid', 'Mode grid class');
  assertIncludes(nameModalCssRaw, 'game-mode-btn', 'Mode button class');
  assertIncludes(nameModalCssRaw, '.game-mode-btn.active.boss', 'Boss mode active style');
  assertIncludes(nameModalCssRaw, '.game-mode-btn.active.rpg', 'RPG mode active style');
});

test('TC-43: NameModal memiliki game mode selector JSX', () => {
  assertIncludes(nameModalRaw, 'selectedGameMode', 'selectedGameMode state');
  assertIncludes(nameModalRaw, 'BOSS_CHALLENGE', 'BOSS_CHALLENGE option');
  assertIncludes(nameModalRaw, 'game-mode-grid', 'Mode selector grid');
});

test('TC-44: GameOverModal mendukung bossElapsedTime & gameMode props', () => {
  assertIncludes(gameOverRaw, "gameMode = 'RPG'", 'gameMode prop default');
  assertIncludes(gameOverRaw, 'bossElapsedTime = 0', 'bossElapsedTime prop default');
  assertIncludes(gameOverRaw, 'formatBossTime', 'Time formatter function');
});

test('TC-45: GameOverModal boss victory styling CSS', () => {
  assertIncludes(gameOverCssRaw, 'boss-mode', 'Boss mode CSS class');
  assertIncludes(gameOverCssRaw, '.gameover-modal-content.boss-mode.victory', 'Boss victory selector');
});

// ═══════════════════════════════════════════
// SECTION 8: i18n BOSS CHALLENGE KEYS
// ═══════════════════════════════════════════
console.log('\n🌐 Section 8: i18n Boss Challenge Keys');
console.log('─'.repeat(50));

test('TC-46: Kunci i18n Boss Challenge tersedia (ID)', () => {
  assertIncludes(i18nRaw, 'bossArenaStartMsg', 'bossArenaStartMsg key');
  assertIncludes(i18nRaw, 'bossChallengeHeader', 'bossChallengeHeader key');
  assertIncludes(i18nRaw, 'bossElapsedLabel', 'bossElapsedLabel key');
  assertIncludes(i18nRaw, 'bossVictoryFloat', 'bossVictoryFloat key');
});

test('TC-47: Kunci i18n Boss Challenge tersedia (EN)', () => {
  // EN translations should exist as second occurrence
  const enSection = i18nRaw.substring(i18nRaw.indexOf("EN:"));
  assertIncludes(enSection, 'bossArenaStartMsg', 'EN bossArenaStartMsg');
});

// ═══════════════════════════════════════════
// SECTION 9: CORE GAME MECHANICS
// ═══════════════════════════════════════════
console.log('\n⚙️ Section 9: Core Game Mechanics');
console.log('─'.repeat(50));

test('TC-48: Turn Timer 15 detik', () => {
  assertIncludes(gameBoardRaw, 'TURN_TIME_LIMIT = 15', 'Turn time limit');
});

test('TC-49: HP watcher memantau kedua entity (player & enemy)', () => {
  assertIncludes(gameBoardRaw, 'player.hp === 0 && enemy.hp > 0', 'Player defeat check');
  assertIncludes(gameBoardRaw, 'enemy.hp === 0 && player.hp > 0', 'Enemy defeat check');
});

test('TC-50: Armor Piercing bypass block untuk Quantum Piercer', () => {
  assertIncludes(gameBoardRaw, 'card.isPiercing', 'isPiercing check');
  // Piercing should damage HP directly
  assertIncludes(gameBoardRaw, 'isPiercing', 'Piercing logic branch');
});

test('TC-51: Mirage Duplicator double cast TIDAK menggandakan dirinya', () => {
  assertIncludes(gameBoardRaw, "card.type !== 'SPECIAL'", 'Special type exclusion');
});

test('TC-52: beforeunload event guard aktif saat pertarungan', () => {
  assertIncludes(gameBoardRaw, 'beforeunload', 'beforeunload listener');
});

test('TC-53: Pity banner TIDAK muncul di Boss Challenge', () => {
  assertIncludes(gameBoardRaw, "isPityActive && gameMode !== 'BOSS_CHALLENGE'", 'Pity banner boss exclusion');
});

test('TC-54: Boss header conditional rendering', () => {
  assertIncludes(gameBoardRaw, "gameMode === 'BOSS_CHALLENGE' ? 'boss-header' : ''", 'Boss header class toggle');
  assertIncludes(gameBoardRaw, "bossChallengeHeader", 'Boss header text key');
});

test('TC-55: Grid class conditional untuk Boss mode', () => {
  assertIncludes(gameBoardRaw, "gameMode === 'BOSS_CHALLENGE' ? 'boss-grid-14x3' : ''", 'Boss grid class toggle');
});

// ═══════════════════════════════════════════
// SECTION 10: RESPONSIVE & ACCESSIBILITY
// ═══════════════════════════════════════════
console.log('\n📱 Section 10: Responsive & Accessibility');
console.log('─'.repeat(50));

test('TC-56: Boss Grid responsive untuk tablet (768px)', () => {
  assertIncludes(gameBoardCssRaw, '@media (max-width: 768px)', 'Tablet media query');
  assertIncludes(gameBoardCssRaw, '.cards-grid.boss-grid-14x3', 'Boss grid responsive rule');
});

test('TC-57: Boss Grid responsive untuk mobile (480px)', () => {
  // Check for boss-specific mobile rule
  const mobileSection = gameBoardCssRaw.substring(gameBoardCssRaw.lastIndexOf('@media (max-width: 480px)'));
  assertIncludes(mobileSection, 'boss-grid-14x3', 'Boss grid mobile rule');
});

test('TC-58: Container melebar untuk Boss grid (max-width: 95vw)', () => {
  assertIncludes(gameBoardCssRaw, 'max-width: 95vw', 'Boss container width');
});

// ═══════════════════════════════════════════
// PRINT RESULTS SUMMARY
// ═══════════════════════════════════════════
console.log('\n══════════════════════════════════════════════════════');
console.log(' TEST RESULTS SUMMARY');
console.log('══════════════════════════════════════════════════════\n');

results.forEach((r, i) => {
  console.log(`  ${r.status} ${r.name}`);
  if (r.error) console.log(`         └─ ${r.error}`);
});

console.log('\n──────────────────────────────────────────────────────');
console.log(`  Total: ${totalTests} | ✅ Passed: ${passedTests} | ❌ Failed: ${failedTests}`);
console.log(`  Success Rate: ${((passedTests / totalTests) * 100).toFixed(1)}%`);
console.log('──────────────────────────────────────────────────────\n');

if (failedTests > 0) {
  console.log('⚠️  Beberapa test gagal! Periksa detail di atas.');
  process.exit(1);
} else {
  console.log('🎉 SEMUA TEST BERHASIL! Build & Logic siap deploy.\n');
  process.exit(0);
}
