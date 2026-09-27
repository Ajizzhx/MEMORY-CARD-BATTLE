# PROJECT AUDIT REPORT: MEMORY CARD BATTLE

## 1. Project Overview
- **Project Name:** Memory Card Battle (Cyberfantasy Edition)
- **Repository / Corpus:** `Ajizzhx/MEMORY-CARD-BATTLE`
- **Application Type:** Web Application (Single Page Application)
- **Genre:** Roguelike Turn-Based RPG + Memory Card Matching Arena
- **Framework & Libraries:** React 19, Vite 8, Modern Vanilla CSS (Design Tokens, Glassmorphism, Micro-animations), Web Audio API Synthesizer, Supabase REST API Client (Serverless Online Leaderboard)
- **Target Platform:** Cross-Platform Modern Web Browsers (Mobile & Desktop Responsive)

---

## 2. Architecture
```text
┌────────────────────────────────────────────────────────────────────────┐
│                        USER INTERFACE LAYER                            │
│  App.jsx ── Main Screen & Modal Overlays (Catalog, Leaderboard, Guide, │
│             Log, Loot, GameOver, Name, Pause, ResetConfirm, Detail)    │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        STATE & ENGINE LAYER                            │
│  GameBoard.jsx ── Battle State Machine:                                │
│    ├── Shared Card Board (4x4 RPG Grid & 14x3 Boss Challenge Grid)    │
│    ├── Entity Stats (Player & Enemy HP, Max HP, Block, Stasis, Rewind) │
│    ├── Turn Management (Player 15s Timer, Freeze Skip, Enemy AI Turn)  │
│    └── Roguelike Progression (Stages 1-13+, Enemy Scaling, Loot Drop)  │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        UTILITIES & SERVICES                            │
│  ├── cardData.js           (21 Unique Cards, Rarity, Piercing, Lore)   │
│  ├── lootSystem.js         (Strict Non-Duplicate Loot, Pity System)    │
│  ├── aiLogic.js            (3-Layer Decision Tree + EMP Jammer)        │
│  ├── soundSystem.js        (Synthesized Web Audio Engine, Zero 404s)   │
│  ├── i18n.js               (Bilingual ID/EN Translation Engine)        │
│  └── leaderboardService.js (Supabase REST API + Local Storage Cache)   │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                       DATA & STORAGE LAYER                             │
│  ├── Supabase PostgreSQL   (Tables: `leaderboard`, `boss_leaderboard`) │
│  └── Browser localStorage  (Offline Cache & Session Fallbacks)         │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Features
1. **RPG Journey Mode:** Roguelike multi-stage campaign (Stages 1 to 13+) played on a 4x4 card grid (8 card pairs) with stage enemy progression, scaling HP, and stage-clear loot selections.
2. **Boss Challenge Mode (Abyss Omega Arena):** High-stakes boss duel played on a 14x3 grid (42 cards / 21 unique pairs) against 400 HP Abyss Omega with live elapsed time tracking and high-score ranking.
3. **Card Mechanics (21 Unique Cards):** Spans 11 gameplay archetypes (Attack, Armor Piercing, Defense, Heal, Buff/Peek, Debuff, Utility/Rewind, Drain, Control/Freeze, Risk/Gamble, Special/Mirage Duplicator).
4. **AI Memory Engine:** 3-layer probabilistic decision tree (Known Pair → Half-Known Partner → Random) with difficulty scaling (35% Easy, 65% Medium, 88% Hard), disruptable by EMP Jammer cards.
5. **Emergency Pity System:** Dual-trigger assistance (+35 HP, +25 Armor) activated when player HP is < 50% and mismatch streak is >= 3 (strictly limited to 2 uses per journey).
6. **Bilingual Support (ID / EN):** Centralized translation matrix providing instantaneous UI language toggling between Indonesian and English.
7. **Online & Offline Leaderboards:** Real-time top 10 global leaderboard powered by direct Supabase REST requests with resilient local storage fallback for offline resilience.
8. **Synthesized Web Audio Engine:** Pure Web Audio API oscillators producing ambient pad chord BGM and 10 dynamic SFX with zero external asset loading dependencies.
9. **Interactive Card Compendium & Battle Logs:** Comprehensive 21-card compendium with lore, stats, active-stage indicators, and complete battle event logs.

---

## 4. Database & Storage Mapping
- **Supabase REST API Endpoints:**
  - `POST/GET /rest/v1/leaderboard`: Schema columns: `id`, `name`, `stage`, `total_matches`, `difficulty`, `created_at`.
  - `POST/GET /rest/v1/boss_leaderboard`: Schema columns: `id`, `name`, `difficulty`, `elapsed_ms`, `total_matches`, `created_at`.
- **Browser localStorage Keys:**
  - `memory_player_name`: Current active player profile.
  - `memory_card_leaderboard`: Local fallback for RPG mode scores.
  - `memory_boss_leaderboard`: Local fallback for Boss Challenge mode scores.
  - `memory_ai_mode`: AI difficulty preference (`AUTO`, `EASY`, `MEDIUM`, `HARD`).
  - `memory_game_lang`: Language preference (`ID` or `EN`).
  - `memory_bgm_muted`: BGM audio mute toggle.
  - `memory_sfx_muted`: SFX audio mute toggle.

---

## 5. Audit Cycles

### Cycle 1
- **FOUND:** 8 issues identified (BUG-001 through BUG-008).
- **ANALYZED:** Root causes investigated across card balancing, timestamp formatting, prop wiring, modal state tracking, dictionary deduplication, and dead code.
- **FIXED:** All 8 issues addressed directly at root cause.
- **VERIFIED:** 58/58 test cases passed, linter reduced from 30 warnings to 0 warnings / 0 errors, build succeeds in <300ms.
- **NEXT:** `→ FOUND (AUDIT AGAIN)`

### Cycle 2 (Audit Again)
- **SCOPE:** Full re-examination of all 24 source files across components, utils, styles, and configuration.
- **CHECKED:**
  - Core logic in `GameBoard.jsx`, `aiLogic.js`, `cardData.js`, `lootSystem.js`
  - Integration in `leaderboardService.js` and Supabase endpoints
  - Audio synthesizer in `soundSystem.js`
  - Modal components (`NameModal`, `LeaderboardModal`, `CatalogModal`, `GameOverModal`, `GuideModal`, `LogModal`, `LootModal`, `PauseModal`, `ResetConfirmModal`)
  - CSS layout and responsiveness across desktop, tablet (768px), and mobile (480px)
- **RESULT:** `NO NEW ISSUE`
- **STATUS:** `FINAL VERIFIED`

---

## 6. Findings & Root Causes

### [BUG-001] Card Data & Localization Discrepancies
- **Severity:** HIGH
- **Status:** FIXED & VERIFIED
- **Files:** `src/utils/cardData.js`, `src/utils/i18n.js`, `src/components/GameBoard/GameBoard.jsx`
- **Description:** 
  1. `debuff_poison` (Corrosive Virus) dealt 18 Piercing Damage in battle logic, but `i18n.js` described it as 16 Piercing Damage.
  2. `pity_wrath` (Divine Wrath) dealt 32 Damage in battle logic, but `i18n.js` described it as 40 Damage.
  3. `gamble_cosmic` (Cosmic Gamble) dealt 40 Damage / +5 HP in battle logic, but `cardData.js` had `value: 35` and `i18n.js` described 35 Damage.
- **Root Cause:** Incremental balance adjustments in `GameBoard.jsx` were not backported to `cardData.js` and `i18n.js`.
- **Solution:** Synchronized `cardData.js` value to 40, updated Indonesian and English descriptions for `debuff_poison` (18 Piercing), `pity_wrath` (32 Damage), and `gamble_cosmic` (40 Damage / +5 HP).
- **Verification:** Verified in both languages via `getLocalizedCards()` and verified in battle logic.

### [BUG-002] Leaderboard Timestamp "NaN hari lalu" & Missing RPG created_at
- **Severity:** HIGH
- **Status:** FIXED & VERIFIED
- **Files:** `src/utils/leaderboardService.js`, `src/components/GameBoard/GameBoard.jsx`
- **Description:** `formatRelativeTime` produced `"NaN hari lalu"` when passed missing/malformed date strings. In `GameBoard.jsx`, `newEntry` for RPG mode omitted `created_at: new Date().toISOString()`, resulting in invalid timestamps for local offline scores.
- **Root Cause:** Missing `created_at` property in RPG score creation object; lack of defensive parsing in relative time helper.
- **Solution:** Added `created_at: new Date().toISOString()` to RPG `newEntry` in `GameBoard.jsx`. Implemented strict `isNaN` validation in `formatRelativeTime` with localized `"Baru saja"` / `"Just now"` fallbacks.
- **Verification:** Tested valid timestamps, future timestamps, and invalid/undefined inputs across both languages.

### [BUG-003] Difficulty Badge Unclickable & handleCycleDifficulty Unused
- **Severity:** MEDIUM
- **Status:** FIXED & VERIFIED
- **Files:** `src/components/GameBoard/GameBoard.jsx`, `src/components/PlayerStatus/PlayerStatus.jsx`, `src/components/PlayerStatus/PlayerStatus.css`
- **Description:** `handleCycleDifficulty` was defined in `GameBoard.jsx` to let players click the difficulty badge to manually switch AI modes (`AUTO` → `EASY` → `MEDIUM` → `HARD`), but was never passed to `<PlayerStatus />`, triggering linter warnings and disabling the feature.
- **Root Cause:** Prop wiring was omitted during component extraction.
- **Solution:** Passed `onCycleDifficulty={handleCycleDifficulty}` to `<PlayerStatus />`. Added interactive cursor, hover glow, and transform micro-animation in `PlayerStatus.css`.
- **Verification:** Verified badge click triggers mode rotation, floating notification, and audio feedback.

### [BUG-004] showLogModal Omitted from Modal Active Checks
- **Severity:** MEDIUM
- **Status:** FIXED & VERIFIED
- **Files:** `src/components/GameBoard/GameBoard.jsx`
- **Description:** `showLogModal` was absent from `isAnyModalOpen` in `handleCardClick` and the Turn Timer effect. While reading battle logs, the 15-second turn timer continued running and cards could be clicked in the background.
- **Root Cause:** `showLogModal` was introduced after existing modal states and wasn't included in composite boolean checks.
- **Solution:** Appended `showLogModal` to `isAnyModalOpen` in both `handleCardClick` and the Turn Timer `useEffect`.
- **Verification:** Verified turn timer pauses and card clicks are blocked when LogModal is open.

### [BUG-005] Duplicate Keys in i18n Translation Dictionary
- **Severity:** LOW
- **Status:** FIXED & VERIFIED
- **Files:** `src/utils/i18n.js`
- **Description:** 10 duplicate keys detected in `i18n.js` (`playAgainBtn`, `globalLBSub`, `globalLBLoading`, `globalLBError`, `globalLBRetry` defined twice in both ID and EN dictionaries).
- **Root Cause:** Merge artifact from appending modal keys to the bottom of the dictionary.
- **Solution:** Removed duplicate key declarations while keeping full translation coverage.
- **Verification:** Clean dictionary parse with zero duplicate key overrides.

### [BUG-006] Unused Variables and Dead Code
- **Severity:** LOW
- **Status:** FIXED & VERIFIED
- **Files:** `src/components/PauseModal/PauseModal.jsx`, `src/components/LootModal/LootModal.jsx`, `src/components/LeaderboardModal/LeaderboardModal.jsx`, `src/utils/soundSystem.js`, `tests/game_logic_test.mjs`
- **Description:** 
  1. `soundManager` imported but never used in `PauseModal.jsx`.
  2. `stage` prop unreferenced in `LootModal.jsx`.
  3. `leaderboard` prop unreferenced in `LeaderboardModal.jsx`.
  4. `this.bgmOscillators = []` declared in `SoundSystem` constructor but never referenced.
  5. `cardValues`, `enemyConfigMatches`, and unused `i` parameter in `tests/game_logic_test.mjs`.
- **Root Cause:** Iterative code updates leaving unused artifacts.
- **Solution:** Wired `leaderboard` as offline fallback in `LeaderboardModal`; removed unused import in `PauseModal`; cleaned `LootModal` and `soundSystem.js`; cleaned test file declarations.
- **Verification:** Linter confirms 0 unused variable warnings.

### [BUG-007] React Hook Dependency Inconsistencies & Optional Catch Bindings
- **Severity:** MEDIUM
- **Status:** FIXED & VERIFIED
- **Files:** `src/components/GameBoard/GameBoard.jsx`, `src/components/LeaderboardModal/LeaderboardModal.jsx`
- **Description:** Multiple `useEffect` hooks lacked dependencies (`currentLang`, modal booleans) or caused cyclic re-renders when callback functions changed. Also, empty `catch (e)` blocks triggered unused catch parameter warnings.
- **Root Cause:** Omission of locale/modal dependencies and use of parameter-bound catch blocks instead of ES2019 optional catch bindings.
- **Solution:** Added missing dependencies (`currentLang`, `showGameOverModal`, `showLootModal`, `showLogModal`), placed explicit ESLint hook directive guards where lifecycle semantics require mount-only execution, and adopted ES2019 parameterless `catch { ... }`.
- **Verification:** `npm run lint` reported 0 errors and 0 warnings across all 24 files.

### [BUG-008] Missing Environment Variable Template
- **Severity:** LOW
- **Status:** FIXED & VERIFIED
- **Files:** `.env.example`, `.gitignore`
- **Description:** Repository lacked a `.env.example` file to guide developers on configuring Supabase URL and Anon key.
- **Root Cause:** Environment template was not included in initial setup.
- **Solution:** Created `.env.example` with documented placeholders (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) and ensured `.gitignore` permits `!.env.example`.
- **Verification:** Verified file existence and clean git tracking status.

---

## 7. Testing & Verification

### Test Suite Execution
- **Command:** `node tests/game_logic_test.mjs`
- **Total Test Cases:** 58
- **Passed:** 58 (100%)
- **Failed:** 0 (0%)
- **Categories Verified:**
  - Section 1: Card Database Integrity (TC-01 to TC-08) — 8/8 Passed
  - Section 2: Board Generation Logic (TC-09 to TC-13) — 5/5 Passed
  - Section 3: AI Memory Engine (TC-14 to TC-18) — 5/5 Passed
  - Section 4: Loot & Pity System (TC-19 to TC-23) — 5/5 Passed
  - Section 5: Enemy Stage Scaling (TC-24 to TC-28) — 5/5 Passed
  - Section 6: Boss Challenge Mode (TC-29 to TC-39) — 11/11 Passed
  - Section 7: Boss Challenge UI & CSS (TC-40 to TC-45) — 6/6 Passed
  - Section 8: i18n Boss Challenge Keys (TC-46 to TC-47) — 2/2 Passed
  - Section 9: Core Game Mechanics (TC-48 to TC-55) — 8/8 Passed
  - Section 10: Responsive & Accessibility (TC-56 to TC-58) — 3/3 Passed

### Code Quality & Static Analysis
- **Command:** `npm run lint` (`oxlint`)
- **Files Analyzed:** 24 files
- **Rules Evaluated:** 91 rules
- **Errors:** 0
- **Warnings:** 0

### Production Build
- **Command:** `npm run build` (`vite build`)
- **Modules Transformed:** 51 modules
- **Build Status:** SUCCESS (Built in 277ms)
- **Output Artifacts:**
  - `dist/index.html`: 0.85 kB (gzip: 0.47 kB)
  - `dist/assets/index-DsnRJaD0.css`: 57.80 kB (gzip: 10.70 kB)
  - `dist/assets/index-DFMvGcjf.js`: 299.33 kB (gzip: 89.95 kB)

---

## 8. Regression Check
- **Game Modes:** Both RPG Journey Mode (4x4) and Boss Challenge Mode (14x3) function properly without state collisions.
- **Card Balance:** Piercing damage, healing, armor calculations, freeze control, and cosmic gamble mechanics operate with mathematical accuracy and matching UI text.
- **Audio Synthesizer:** BGM and SFX continue to generate audio via Web Audio API without missing asset errors or audio context suspensions.
- **Leaderboard:** Both Supabase online submissions and offline local storage caching remain operational with dual-language relative time rendering.
- **Test Invariants:** All code assertions in `tests/game_logic_test.mjs` (including AST string placements in `GameBoard.jsx`) are intact.

---

## 9. Cleanup Summary
1. Removed all duplicate translation keys from `src/utils/i18n.js`.
2. Removed unused imports (`soundManager` in `PauseModal.jsx`).
3. Removed unreferenced constructor property (`this.bgmOscillators`) in `src/utils/soundSystem.js`.
4. Modernized catch blocks across `GameBoard.jsx` and `LeaderboardModal.jsx` to parameterless optional catch bindings (`catch {}`).
5. Documented environment configurations in `.env.example` and adjusted `.gitignore`.
6. Verified no temporary, orphaned, or debug files remain in the project directory.

---

## 10. Remaining Issues
- **None.** All known issues have been resolved at root cause.

---

## 11. Final Verification & Conclusion
- **Continuous Audit Status:** `FOUND → ANALYZED → FIXED → VERIFIED → FOUND (AUDIT AGAIN) → NO NEW ISSUE → FINAL VERIFIED`
- **Overall Project Health:** **EXCELLENT (100% stable, 0 lint warnings, 58/58 tests passing, production build ready).**
- **Final Classification:** **FINAL VERIFIED**
