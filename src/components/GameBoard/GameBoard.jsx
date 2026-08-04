import React, { useState, useEffect } from 'react';
import Card from '../Card/Card';
import PlayerStatus from '../PlayerStatus/PlayerStatus';
import LootModal from '../LootModal/LootModal';
import GameOverModal from '../GameOverModal/GameOverModal';
import FloatingText from '../FloatingText/FloatingText';
import NameModal from '../NameModal/NameModal';
import LeaderboardModal from '../LeaderboardModal/LeaderboardModal';
import CatalogModal from '../CatalogModal/CatalogModal';
import GuideModal from '../GuideModal/GuideModal';
import LogModal from '../LogModal/LogModal';
import ResetConfirmModal from '../ResetConfirmModal/ResetConfirmModal';
import PauseModal from '../PauseModal/PauseModal';
import { CARD_DATABASE } from '../../utils/cardData';
import { AI_DIFFICULTY_LEVELS, updateAiMemory, getAiCardChoices } from '../../utils/aiLogic';
import { generateLootChoices, getStageEnemyConfig } from '../../utils/lootSystem';
import { submitScore, submitBossScore } from '../../utils/leaderboardService';
import { soundManager } from '../../utils/soundSystem';
import { getCurrentLang, setGameLang, t } from '../../utils/i18n';
import './GameBoard.css';

const TURN_TIME_LIMIT = 15; // 15 detik batas waktu berpikir

const GameBoard = () => {
  // Audio & Language Controls State
  const [isBgmMuted, setIsBgmMuted] = useState(soundManager.isBgmMuted);
  const [isSfxMuted, setIsSfxMuted] = useState(soundManager.isSfxMuted);
  const [currentLang, setCurrentLangState] = useState(getCurrentLang());

  // Player Name & Leaderboard States
  const [playerName, setPlayerName] = useState(localStorage.getItem('memory_player_name') || '');
  const [showNameModal, setShowNameModal] = useState(!localStorage.getItem('memory_player_name'));
  const [showLeaderboardModal, setShowLeaderboardModal] = useState(false);
  const [showCatalogModal, setShowCatalogModal] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [showResetConfirmModal, setShowResetConfirmModal] = useState(false);
  const [leaderboard, setLeaderboard] = useState(() => {
    const saved = localStorage.getItem('memory_card_leaderboard');
    return saved ? JSON.parse(saved) : [];
  });

  // Turn Timer State
  const [turnTimer, setTurnTimer] = useState(TURN_TIME_LIMIT);

  // Game Mode State ('RPG' or 'BOSS_CHALLENGE')
  const [gameMode, setGameMode] = useState('RPG');
  const [bossStartTime, setBossStartTime] = useState(null);
  const [bossElapsedTime, setBossElapsedTime] = useState(0);

  // Roguelike Progression States
  const [stage, setStage] = useState(1);
  const [playerDeck, setPlayerDeck] = useState(CARD_DATABASE.slice(0, 8));
  const [mismatchStreak, setMismatchStreak] = useState(0);
  const [showLootModal, setShowLootModal] = useState(false);
  const [showGameOverModal, setShowGameOverModal] = useState(false);
  const [lootChoices, setLootChoices] = useState([]);
  const [totalMatchesMade, setTotalMatchesMade] = useState(0);
  const [pityUsesLeft, setPityUsesLeft] = useState(2);

  // Per-Stage Matches & Round Counter
  const [playerMatches, setPlayerMatches] = useState(0);
  const [enemyMatches, setEnemyMatches] = useState(0);
  const [stageRound, setStageRound] = useState(1);

  // Game Board States
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCardIds, setMatchedCardIds] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState(() => t('startAttackMsg', getCurrentLang()));

  // Modal UI states
  const [isCatalogFromDashboard, setIsCatalogFromDashboard] = useState(false);
  const [showPauseModal, setShowPauseModal] = useState(false);
  const [showLogModal, setShowLogModal] = useState(false);
  const [battleLogs, setBattleLogs] = useState([]);

  // Polish UI/UX States
  const [floatingTexts, setFloatingTexts] = useState([]);
  const [isShaking, setIsShaking] = useState(false);
  const [isShufflingBoard, setIsShufflingBoard] = useState(false);

  // Entity States
  const [player, setPlayer] = useState({ name: playerName || 'Cyber Hero', hp: 100, maxHp: 100, block: 0 });
  const [enemy, setEnemy] = useState({ name: 'Cyber Scout', hp: 70, maxHp: 70, block: 0 });
  const [currentTurn, setCurrentTurn] = useState('PLAYER');
  const [temporaryRevealed, setTemporaryRevealed] = useState([]);

  // AI Difficulty Mode State ('AUTO' | 'EASY' | 'MEDIUM' | 'HARD')
  const [selectedAiMode, setSelectedAiMode] = useState(localStorage.getItem('memory_ai_mode') || 'AUTO');
  const [aiMemory, setAiMemory] = useState({});
  const [isEmpJammerActive, setIsEmpJammerActive] = useState(false);

  // New Unique Skill States
  const [isEnemyFrozen, setIsEnemyFrozen] = useState(false);
  const [isPlayerFrozen, setIsPlayerFrozen] = useState(false);
  const [isDoubleCastActive, setIsDoubleCastActive] = useState(false);
  const [isEnemyDoubleCastActive, setIsEnemyDoubleCastActive] = useState(false);
  const [isPlayerRewindActive, setIsPlayerRewindActive] = useState(false);
  const [isEnemyRewindActive, setIsEnemyRewindActive] = useState(false);

  // Compute Active AI Difficulty
  const activeAiDifficulty = selectedAiMode === 'AUTO'
    ? getStageEnemyConfig(stage).difficulty
    : selectedAiMode;

  // Battle Log helper
  const addBattleLog = (actor, action, message, details = '') => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const actorName = actor === 'PLAYER' ? (playerName || 'Cyber Hero') : enemy.name;
    setBattleLogs((prev) => [...prev, { time, actor, actorName, action, message, details }]);
  };

  const updateStatus = () => {
    if (player.hp === 0 || enemy.hp === 0) return;
    setStatusMessage(
      currentTurn === 'PLAYER' 
        ? t('playerTurnMsg', currentLang) 
        : t('enemyTurnMsg', currentLang)
    );
  };

  // Dynamic Pity System State
  const isPityActive = (player.hp / player.maxHp) < 0.5 && mismatchStreak >= 3;

  // Audio Toggle Handlers
  const handleToggleBgm = () => {
    soundManager.playClickSFX();
    const isNowActive = soundManager.toggleBgm();
    setIsBgmMuted(!isNowActive);
  };

  const handleToggleSfx = () => {
    soundManager.playClickSFX();
    const isNowActive = soundManager.toggleSfx();
    setIsSfxMuted(!isNowActive);
  };

  const handleToggleLang = () => {
    soundManager.playClickSFX();
    const nextLang = currentLang === 'ID' ? 'EN' : 'ID';
    setGameLang(nextLang);
    setCurrentLangState(nextLang);
  };

  // Always clear any leftover saved state on mount (Refreshing resets progress back to clean start)
  useEffect(() => {
    localStorage.removeItem('memory_game_saved_state');
    if (playerName) {
      soundManager.startBgm();
      initBoardForNewPlayer();
    }
  }, [playerName]);

  // Peringatan Browser saat pemain mencoba Refresh / Tutup Tab saat pertarungan berlangsung
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (playerName && !showNameModal && player.hp > 0 && enemy.hp > 0) {
        e.preventDefault();
        e.returnValue = t('reloadWarnMsg', currentLang);
        return e.returnValue;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [playerName, showNameModal, player.hp, enemy.hp]);

  // Efek Samping Pemantau Nyawa (Mencegah anti-pattern React updaters)
  useEffect(() => {
    if (playerName && !showNameModal) {
      if (enemy.hp === 0 && player.hp > 0 && !showLootModal && !showGameOverModal) {
        triggerStageClear();
      } else if (player.hp === 0 && enemy.hp > 0 && !showGameOverModal) {
        triggerGameOver();
      }
    }
  }, [player.hp, enemy.hp, playerName, showNameModal]);

  // Turn Timer Countdown Effect (15s)
  useEffect(() => {
    let interval = null;
    const isAnyModalOpen = showCatalogModal || showGuideModal || showLeaderboardModal || showResetConfirmModal || showPauseModal;
    if (currentTurn === 'PLAYER' && !isProcessing && player.hp > 0 && enemy.hp > 0 && !showNameModal && !isAnyModalOpen) {
      interval = setInterval(() => {
        setTurnTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            handleTurnTimeout();
            return TURN_TIME_LIMIT;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (currentTurn === 'ENEMY' || isAnyModalOpen) {
      // Do not countdown, keep current time or reset
    }
    return () => clearInterval(interval);
  }, [currentTurn, isProcessing, player.hp, enemy.hp, showNameModal, showCatalogModal, showGuideModal, showLeaderboardModal, showResetConfirmModal, showPauseModal]);

  // Boss Challenge Elapsed Time Ticker
  useEffect(() => {
    let interval = null;
    if (gameMode === 'BOSS_CHALLENGE' && bossStartTime && player.hp > 0 && enemy.hp > 0 && !showNameModal && !showGameOverModal) {
      interval = setInterval(() => {
        setBossElapsedTime(Date.now() - bossStartTime);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameMode, bossStartTime, player.hp, enemy.hp, showNameModal, showGameOverModal]);

  // Catatan: Reset papan sudah ditangani di handleMatchResult ketika semua kartu cocok.

  // Waktu Berpikir Habis Handler
  const handleTurnTimeout = () => {
    setFlippedCards([]);
    setIsProcessing(true);
    setIsPlayerFrozen(false);
    soundManager.playMismatchSFX();
    spawnFloatingText(t('timeoutFloat', currentLang), 'damage');
    updateStatus();

    setTimeout(() => {
      setIsProcessing(false);
      setCurrentTurn('ENEMY');
    }, 1200);
  };

  // Cycle AI Difficulty Manually on Badge Click
  const handleCycleDifficulty = () => {
    soundManager.playClickSFX();
    const modes = ['AUTO', 'EASY', 'MEDIUM', 'HARD'];
    const nextIdx = (modes.indexOf(selectedAiMode) + 1) % modes.length;
    const nextMode = modes[nextIdx];
    setSelectedAiMode(nextMode);
    localStorage.setItem('memory_ai_mode', nextMode);

    const modeLabels = {
      AUTO: t('aiModeAuto', currentLang),
      EASY: t('aiModeEasy', currentLang),
      MEDIUM: t('aiModeMedium', currentLang),
      HARD: t('aiModeHard', currentLang)
    };

    const nextModeLabel = modeLabels[nextMode];
    spawnFloatingText(t('aiDifficultyChange', currentLang).replace('{mode}', nextModeLabel), 'match');
    updateStatus();
  };

  // Spawn Floating Text
  const spawnFloatingText = (text, type) => {
    const newItem = { id: Date.now() + Math.random(), text, type };
    setFloatingTexts((prev) => [...prev, newItem]);
    setTimeout(() => {
      setFloatingTexts((prev) => prev.filter((item) => item.id !== newItem.id));
    }, 1200);
  };

  // Trigger Screen Shake
  const triggerScreenShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 400);
  };

  // Handle Nama & Mode AI Pemain
  const handleNameSubmit = (name, mode = 'AUTO', gameModeSel = 'RPG') => {
    soundManager.startBgm();
    soundManager.playClickSFX();
    localStorage.setItem('memory_player_name', name);
    localStorage.setItem('memory_ai_mode', mode);
    setPlayerName(name);
    setSelectedAiMode(mode);
    setGameMode(gameModeSel);
    setPlayer((prev) => ({ ...prev, name }));
    setShowNameModal(false);

    if (gameModeSel === 'BOSS_CHALLENGE') {
      initBoardForBossChallenge(name);
    }
  };

  // Catat Skor ke Leaderboard Lokal (Sesi) & Online (Supabase)
  const recordLeaderboardScore = (finalStage, matches, elapsedMs = 0) => {
    const activeDifficultyLabel = AI_DIFFICULTY_LEVELS[activeAiDifficulty]?.name || 'Otomatis';
    
    if (gameMode === 'BOSS_CHALLENGE') {
      const newEntry = {
        name: playerName || 'Cyber Hero',
        difficulty: activeDifficultyLabel,
        stage: 'Omega',
        totalMatches: matches,
        elapsedMs: elapsedMs,
        created_at: new Date().toISOString()
      };
      
      const savedBoss = localStorage.getItem('memory_boss_leaderboard');
      let bossLeaderboard = [];
      if (savedBoss) {
        try {
          bossLeaderboard = JSON.parse(savedBoss);
        } catch (e) {}
      }
      
      const updatedBoss = [...bossLeaderboard, newEntry]
        .sort((a, b) => a.elapsedMs - b.elapsedMs)
        .slice(0, 10);
        
      localStorage.setItem('memory_boss_leaderboard', JSON.stringify(updatedBoss));
      
      // Submit Boss Score ke Supabase
      submitBossScore(newEntry);
      
      return;
    }

    const newEntry = {
      name: playerName || 'Cyber Hero',
      difficulty: activeDifficultyLabel,
      stage: finalStage,
      totalMatches: matches
    };
    const updated = [...leaderboard, newEntry]
      .sort((a, b) => (b.stage - a.stage) || (b.totalMatches - a.totalMatches))
      .slice(0, 10);

    setLeaderboard(updated);
    localStorage.setItem('memory_card_leaderboard', JSON.stringify(updated));

    // Submit ke Online Leaderboard Supabase (fire-and-forget, tidak block gameplay)
    submitScore(newEntry);
  };

  // Handler untuk Buka Modal Validasi Reset Desain UI Custom
  const handleResetButtonClick = () => {
    soundManager.playClickSFX();
    setShowResetConfirmModal(true);
  };

  // Handler Konfirmasi Reset dari Modal Custom UI
  const handleConfirmReset = () => {
    soundManager.playClickSFX();
    setShowResetConfirmModal(false);
    setShowPauseModal(false); // Tutup juga modal pause saat reset dilakukan
    localStorage.removeItem('memory_game_saved_state');
    localStorage.removeItem('memory_player_name');
    setPlayerName('');
    setShowNameModal(true);
    returnToDashboard();
  };

  // Inisialisasi papan baru setelah player mengisi nama (pertama kali / fresh start)
  const initBoardForNewPlayer = () => {
    if (gameMode === 'BOSS_CHALLENGE') return; // Boss Challenge punya init sendiri
    localStorage.removeItem('memory_game_saved_state');
    const enemyConfig = getStageEnemyConfig(1);
    setStage(1);
    setPlayerDeck(CARD_DATABASE.slice(0, 8));
    setPlayer((prev) => ({ ...prev, hp: 100, maxHp: 100, block: 0 }));
    setEnemy({
      name: enemyConfig.name,
      hp: enemyConfig.hp,
      maxHp: enemyConfig.maxHp,
      avatar: enemyConfig.avatar,
      avatarImg: enemyConfig.avatarImg,
      block: 0
    });
    setMismatchStreak(0);
    setTotalMatchesMade(0);
    setTurnTimer(TURN_TIME_LIMIT);
    setPityUsesLeft(2);
    setPlayerMatches(0);
    setEnemyMatches(0);
    setStageRound(1);
    setShowLootModal(false);
    setShowGameOverModal(false);
    setBattleLogs([]); // Reset logs on new game
    resetBoardForStage(1, CARD_DATABASE.slice(0, 8), true);
  };

  // Inisialisasi papan untuk Boss Challenge (42 kartu / 21 pasang, Player 200 HP, Boss 400 HP)
  const initBoardForBossChallenge = (name) => {
    localStorage.removeItem('memory_game_saved_state');
    setStage(1);
    const fullDeck = [...CARD_DATABASE];
    setPlayerDeck(fullDeck);
    setPlayer({ name: name || 'Cyber Hero', hp: 200, maxHp: 200, block: 0 });
    setEnemy({
      name: 'Abyss Omega',
      hp: 400,
      maxHp: 400,
      avatar: '🐉',
      avatarImg: '/assets/avatars/avatar_dragon.png',
      block: 0
    });
    setMismatchStreak(0);
    setTotalMatchesMade(0);
    setTurnTimer(TURN_TIME_LIMIT);
    setPityUsesLeft(0);
    setPlayerMatches(0);
    setEnemyMatches(0);
    setStageRound(1);
    setShowLootModal(false);
    setShowGameOverModal(false);
    setBattleLogs([]); // Reset logs on new boss challenge
    setBossStartTime(Date.now());
    setBossElapsedTime(0);
    resetBoardForStage(1, fullDeck, true, true);
  };

  // Kembali ke Dashboard Nama (dipanggil dari Game Over / Reset)
  const returnToDashboard = () => {
    localStorage.removeItem('memory_game_saved_state');
    localStorage.removeItem('memory_player_name');
    const enemyConfig = getStageEnemyConfig(1);
    setStage(1);
    setPlayerDeck(CARD_DATABASE.slice(0, 8));
    setPlayer({ name: 'Cyber Hero', hp: 100, maxHp: 100, block: 0 });
    setEnemy({
      name: enemyConfig.name,
      hp: enemyConfig.hp,
      maxHp: enemyConfig.maxHp,
      avatar: enemyConfig.avatar,
      avatarImg: enemyConfig.avatarImg,
      block: 0
    });
    setMismatchStreak(0);
    setTotalMatchesMade(0);
    setTurnTimer(TURN_TIME_LIMIT);
    setPityUsesLeft(2);
    setPlayerMatches(0);
    setEnemyMatches(0);
    setStageRound(1);
    setShowLootModal(false);
    setShowGameOverModal(false);
    setPlayerName('');
    setShowNameModal(true);
    setGameMode('RPG');
    setBossStartTime(null);
    setBossElapsedTime(0);
  };

  // Alias untuk kompatibilitas (dipanggil dari GameOverModal)
  const startNewJourney = returnToDashboard;

  // Reset Board untuk Stage / Ronde baru (supports both RPG 4x4 and Boss Challenge 14x3)
  const resetBoardForStage = (stageNum, deckToUse, isNewStage = false, isBossMode = false) => {
    const boardCards = [];
    const activeDeck = deckToUse || playerDeck;

    // Dapatkan daftar jenis kartu unik (tanpa duplikat ID) dari activeDeck pemain
    const uniqueCardTypesMap = new Map();
    activeDeck.forEach((card) => {
      if (!uniqueCardTypesMap.has(card.id)) {
        uniqueCardTypesMap.set(card.id, card);
      }
    });
    const uniqueCardTypes = Array.from(uniqueCardTypesMap.values());

    // Boss Challenge: Gunakan SELURUH 21 kartu unik (42 kartu / 21 pasang)
    // RPG Mode: Ambil 8 jenis kartu unik (16 kartu / 8 pasang)
    const pairCount = isBossMode ? uniqueCardTypes.length : 8;
    const shuffledDeck = [...uniqueCardTypes].sort(() => Math.random() - 0.5);
    const selectedTypes = shuffledDeck.slice(0, pairCount);

    selectedTypes.forEach((card) => {
      boardCards.push({ uniqueId: `${card.id}-a-${Math.random()}`, pairId: card.id, ...card });
      boardCards.push({ uniqueId: `${card.id}-b-${Math.random()}`, pairId: card.id, ...card });
    });

    // Pengocokan kartu di papan menggunakan Algoritma Fisher-Yates Shuffle
    for (let i = boardCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [boardCards[i], boardCards[j]] = [boardCards[j], boardCards[i]];
    }

    setCards(boardCards);
    setFlippedCards([]);
    setMatchedCardIds([]);
    setTemporaryRevealed([]);
    setAiMemory({});
    setIsEmpJammerActive(false);
    setIsEnemyFrozen(false);
    setIsPlayerFrozen(false);
    setIsDoubleCastActive(false);
    setIsEnemyDoubleCastActive(false);
    setIsProcessing(false);
    setCurrentTurn('PLAYER');
    setTurnTimer(TURN_TIME_LIMIT);

    if (isNewStage) {
      setStageRound(1);
      setMismatchStreak(0);
    } else {
      setStageRound((prev) => prev + 1);
    }

    if (isBossMode) {
      updateStatus();
    } else {
      updateStatus();
    }

    // Pemicu Animasi Realistis Casino Dealer Riffle & Deal Shuffle
    setIsShufflingBoard(true);
    soundManager.playShuffleSFX();
    setTimeout(() => {
      setIsShufflingBoard(false);
    }, 850);
  };

  // Player Turn Frozen Skip Effect
  useEffect(() => {
    if (currentTurn === 'PLAYER' && isPlayerFrozen && !isProcessing && player.hp > 0 && enemy.hp > 0 && !showNameModal) {
      setIsPlayerFrozen(false);
      soundManager.playBlockSFX();
      spawnFloatingText(t('playerFrozenFloat', currentLang), 'damage');
      updateStatus();
      setCurrentTurn('ENEMY');
    }
  }, [currentTurn, isPlayerFrozen, isProcessing, player.hp, enemy.hp, showNameModal]);

  // AI Turn Handling
  useEffect(() => {
    if (currentTurn === 'ENEMY' && !isProcessing && player.hp > 0 && enemy.hp > 0 && !showPauseModal) {
      if (isEnemyFrozen) {
        setIsEnemyFrozen(false);
        soundManager.playBlockSFX();
        spawnFloatingText(t('enemyFrozenFloat', currentLang), 'match');
        updateStatus();
        setCurrentTurn('PLAYER');
        setTurnTimer(TURN_TIME_LIMIT);
        return;
      }

      const available = cards.filter((c) => !matchedCardIds.includes(c.pairId));
      if (available.length < 2) return;

      setIsProcessing(true);
      updateStatus();

      const accuracy = AI_DIFFICULTY_LEVELS[activeAiDifficulty].memoryAccuracy;

      setTimeout(() => {
        const choices = getAiCardChoices(
          cards,
          matchedCardIds,
          aiMemory,
          accuracy,
          isEmpJammerActive
        );

        if (choices.length === 2) {
          const [c1, c2] = choices;
          soundManager.playFlipSFX();
          setFlippedCards([c1, c2]);
          setAiMemory((prevMem) => updateAiMemory(prevMem, [c1, c2], accuracy));

          setTimeout(() => {
            handleMatchResult(c1, c2, 'ENEMY');
          }, 1000);
        } else {
          setIsProcessing(false);
        }
      }, 1100);
    }
  }, [currentTurn, isProcessing, cards, matchedCardIds, aiMemory, activeAiDifficulty, isEmpJammerActive, isEnemyFrozen, player.hp, enemy.hp, showPauseModal]);

  // Handle Player Card Click
  const handleCardClick = (clickedCard) => {
    if (
      currentTurn !== 'PLAYER' ||
      isProcessing ||
      flippedCards.some((c) => c.uniqueId === clickedCard.uniqueId) ||
      matchedCardIds.includes(clickedCard.pairId) ||
      player.hp <= 0 ||
      enemy.hp <= 0 ||
      showPauseModal
    ) {
      return;
    }

    soundManager.playFlipSFX();
    const newFlipped = [...flippedCards, clickedCard];
    setFlippedCards(newFlipped);

    const accuracy = AI_DIFFICULTY_LEVELS[activeAiDifficulty].memoryAccuracy;
    setAiMemory((prevMem) => updateAiMemory(prevMem, [clickedCard], accuracy));

    if (newFlipped.length === 2) {
      setIsProcessing(true);
      const [c1, c2] = newFlipped;
      setTimeout(() => {
        handleMatchResult(c1, c2, 'PLAYER');
      }, 800);
    }
  };

  // Process Match vs Mismatch
  const handleMatchResult = (card1, card2, actor) => {
    const isMatch = card1.pairId === card2.pairId;

    if (isMatch) {
      soundManager.playMatchSFX();
      if (actor === 'PLAYER') {
        setMismatchStreak(0);
        setTotalMatchesMade((prev) => prev + 1);
        setPlayerMatches((prev) => prev + 1);
      } else {
        setEnemyMatches((prev) => prev + 1);
      }

      if (card1.type !== 'BUFF') {
        spawnFloatingText(t('matchTitleFloat', currentLang).replace('{name}', card1.name), 'match');
      }
      
      const details = applyCardEffect(card1, actor);
      addBattleLog(actor, 'MATCH', t('logMatch', currentLang).replace('{cardName}', card1.name), details);

      const nextMatched = [...matchedCardIds, card1.pairId];
      setMatchedCardIds(nextMatched);

      // Pembersihan ingatan AI untuk kartu yang sudah match agar efisien
      setAiMemory((prevMem) => {
        const cleaned = { ...prevMem };
        // Temukan uniqueIds dari kartu-kartu yang sudah cocok
        cards.forEach((c) => {
          if (c.pairId === card1.pairId) {
            delete cleaned[c.uniqueId];
          }
        });
        return cleaned;
      });

      if (nextMatched.length === cards.length / 2) {
        setFlippedCards([]);
        setIsProcessing(false);
        if (actor === 'PLAYER') setTurnTimer(TURN_TIME_LIMIT);

        setTimeout(() => {
          setEnemy((latestEnemy) => {
            setPlayer((latestPlayer) => {
              if (latestEnemy.hp > 0 && latestPlayer.hp > 0) {
                spawnFloatingText(t('roundResetFloat', currentLang), 'match');
                updateStatus();
                resetBoardForStage(stage, playerDeck, false, gameMode === 'BOSS_CHALLENGE');
              }
              return latestPlayer;
            });
            return latestEnemy;
          });
        }, 1200);
      } else {
        updateStatus();
        setFlippedCards([]);
        setIsProcessing(false);
        if (actor === 'PLAYER') setTurnTimer(TURN_TIME_LIMIT);
      }
    } else {
      soundManager.playMismatchSFX();
      if (actor === 'PLAYER') {
        setMismatchStreak((prev) => prev + 1);
      }
      
      addBattleLog(actor, 'MISMATCH', t('logMismatch', currentLang));

      updateStatus();
      setTimeout(() => {
        setFlippedCards([]);
        setIsProcessing(false);
        
        if (actor === 'PLAYER' && isPlayerRewindActive) {
          setIsPlayerRewindActive(false);
          spawnFloatingText(t('rewindMistakeTriggeredFloat', currentLang), 'heal');
          setTurnTimer(TURN_TIME_LIMIT);
          // Giliran TETAP di pemain
        } else if (actor === 'ENEMY' && isEnemyRewindActive) {
          setIsEnemyRewindActive(false);
          spawnFloatingText(t('rewindMistakeTriggeredFloat', currentLang), 'damage');
          setTurnTimer(TURN_TIME_LIMIT);
          // Giliran TETAP di musuh
        } else {
          setCurrentTurn(actor === 'PLAYER' ? 'ENEMY' : 'PLAYER');
          setTurnTimer(TURN_TIME_LIMIT);
          if (actor === 'ENEMY') setIsEmpJammerActive(false);
        }
      }, 1000);
    }
  };

  // Aplikasikan Efek Kartu
  const applyCardEffect = (card, actor) => {
    const isPlayer = actor === 'PLAYER';
    const isDouble = isPlayer ? isDoubleCastActive : isEnemyDoubleCastActive;
    const mult = (isDouble && card.type !== 'SPECIAL') ? 2 : 1;
    let logDetail = '';

    if (isDouble && card.type !== 'SPECIAL') {
      spawnFloatingText(t('mirageActiveFloat', currentLang), 'match');
      if (isPlayer) setIsDoubleCastActive(false);
      else setIsEnemyDoubleCastActive(false);
    }

    switch (card.type) {
      case 'ATTACK': {
        soundManager.playAttackSFX();
        const damage = card.value * mult;
        triggerScreenShake();

        if (card.isPiercing) {
          // Quantum Piercer: Menembus armor langsung ke HP
          spawnFloatingText(t('pierceFloat', currentLang).replace('{damage}', damage), 'damage');
          logDetail = `Piercing attack dealt ${damage} HP damage.`;
          if (isPlayer) {
            setEnemy((prev) => ({ ...prev, hp: Math.max(0, prev.hp - damage) }));
          } else {
            setPlayer((prev) => ({ ...prev, hp: Math.max(0, prev.hp - damage) }));
          }
        } else {
          if (isPlayer) {
            setEnemy((prev) => {
              let newBlock = prev.block - damage;
              let hpDamage = 0;
              let absorbed = damage;
              if (newBlock < 0) {
                hpDamage = Math.abs(newBlock);
                absorbed = prev.block;
                newBlock = 0;
              }
              if (hpDamage > 0) {
                spawnFloatingText(t('floatDamage', currentLang).replace('{val}', hpDamage), 'damage');
              }
              if (absorbed > 0) {
                spawnFloatingText(t('armorAbsorbFloat', currentLang).replace('{val}', absorbed), 'block');
              }
              logDetail = `Dealt ${damage} damage (Armor absorbed ${absorbed}, HP took ${hpDamage}).`;
              return { ...prev, block: newBlock, hp: Math.max(0, prev.hp - hpDamage) };
            });
          } else {
            setPlayer((prev) => {
              let newBlock = prev.block - damage;
              let hpDamage = 0;
              let absorbed = damage;
              if (newBlock < 0) {
                hpDamage = Math.abs(newBlock);
                absorbed = prev.block;
                newBlock = 0;
              }
              if (hpDamage > 0) {
                spawnFloatingText(t('floatDamage', currentLang).replace('{val}', hpDamage), 'damage');
              }
              if (absorbed > 0) {
                spawnFloatingText(t('armorAbsorbFloat', currentLang).replace('{val}', absorbed), 'block');
              }
              logDetail = `Dealt ${damage} damage (Armor absorbed ${absorbed}, HP took ${hpDamage}).`;
              return { ...prev, block: newBlock, hp: Math.max(0, prev.hp - hpDamage) };
            });
          }
        }

        // Divine Wrath: Efek unik Attack + Heal +15 HP (dikali mult)
        if (card.id === 'pity_wrath') {
          soundManager.playHealSFX();
          const healBonus = 15 * mult;
          if (isPlayer) {
            spawnFloatingText(t('divineWrathFloat', currentLang).replace('{healBonus}', healBonus), 'heal');
            setPlayer((prev) => ({ ...prev, hp: Math.min(prev.maxHp, prev.hp + healBonus) }));
          } else {
            setEnemy((prev) => ({ ...prev, hp: Math.min(prev.maxHp, prev.hp + healBonus) }));
          }
        }
        break;
      }
      case 'DEFENSE': {
        soundManager.playBlockSFX();
        const blockVal = card.value * mult;
        spawnFloatingText(t('floatBlock', currentLang).replace('{val}', blockVal), 'block');
        logDetail = `Gained ${blockVal} Armor.`;
        if (isPlayer) {
          setPlayer((prev) => ({ ...prev, block: prev.block + blockVal }));
        } else {
          setEnemy((prev) => ({ ...prev, block: prev.block + blockVal }));
        }
        break;
      }
      case 'HEAL': {
        soundManager.playHealSFX();
        const healVal = card.value * mult;
        spawnFloatingText(t('floatHeal', currentLang).replace('{val}', healVal), 'heal');
        logDetail = `Recovered ${healVal} HP.`;
        if (isPlayer) {
          setPlayer((prev) => ({ ...prev, hp: Math.min(prev.maxHp, prev.hp + healVal) }));
        } else {
          setEnemy((prev) => ({ ...prev, hp: Math.min(prev.maxHp, prev.hp + healVal) }));
        }
        break;
      }
      case 'BUFF': {
        if (card.id === 'buff_neural') {
          // Neural Flash: Membuka SEMUA kartu tertutup di papan selama 1.5 detik
          if (isPlayer) {
            spawnFloatingText(t('neuralFlashPlayerFloat', currentLang), 'match');
            const unmatchedUniques = cards.filter((c) => !matchedCardIds.includes(c.pairId)).map((c) => c.uniqueId);
            setTemporaryRevealed(unmatchedUniques);
            setTimeout(() => {
              setTemporaryRevealed([]);
            }, 1500);
          } else {
            spawnFloatingText(t('neuralFlashEnemyFloat', currentLang), 'damage');
            const unmatched = cards.filter((c) => !matchedCardIds.includes(c.pairId));
            
            // NERF: Simulasikan batasan fokus mata manusia dalam 1.5 detik
            let maxSamples = 4;
            if (activeAiDifficulty === 'HARD') maxSamples = 6;
            else if (activeAiDifficulty === 'EASY') maxSamples = 2;
            
            const shuffledUnmatched = [...unmatched].sort(() => 0.5 - Math.random());
            const sample = shuffledUnmatched.slice(0, maxSamples);

            const accuracy = AI_DIFFICULTY_LEVELS[activeAiDifficulty].memoryAccuracy;
            setAiMemory((prevMem) => updateAiMemory(prevMem, sample, accuracy));
          }
        } else {
          // Oracle Eye
          if (isPlayer) {
            spawnFloatingText(t('xrayScanFloat', currentLang).replace('{name}', card.name), 'match');
            const unmatched = cards.filter((c) => !matchedCardIds.includes(c.pairId));
            if (unmatched.length >= 2) {
              const sample = [...unmatched].sort(() => 0.5 - Math.random()).slice(0, 2).map((c) => c.uniqueId);
              setTemporaryRevealed(sample);
              setTimeout(() => {
                setTemporaryRevealed([]);
              }, 2500);
            }
          } else {
            // Musuh (AI) Buff -> AI merekam ingatan tanpa membocorkan ke tampilan pemain
            spawnFloatingText(t('xrayScanEnemyFloat', currentLang), 'damage');
            const unmatched = cards.filter((c) => !matchedCardIds.includes(c.pairId));
            if (unmatched.length >= 2) {
              const sample = [...unmatched].sort(() => 0.5 - Math.random()).slice(0, 2);
              const accuracy = AI_DIFFICULTY_LEVELS[activeAiDifficulty].memoryAccuracy;
              setAiMemory((prevMem) => updateAiMemory(prevMem, sample, accuracy));
            }
          }
        }
        break;
      }
      case 'DEBUFF': {
        soundManager.playAttackSFX();
        triggerScreenShake();
        const damage = card.value * mult;
        const isEmpAttack = card.id === 'debuff_emp';
        const isGlitchAttack = card.id === 'debuff_glitch';
        if (isEmpAttack) {
          spawnFloatingText(t('empFloat', currentLang).replace('{damage}', damage), 'damage');
        } else if (isGlitchAttack) {
          spawnFloatingText(t('glitchFloat', currentLang).replace('{damage}', damage), 'damage');
        } else {
          spawnFloatingText(t('virusFloat', currentLang).replace('{damage}', damage), 'damage');
        }

        const applyDebuff = (target) => {
          if (isEmpAttack) {
            // EMP Disrupter membakar seluruh armor ke 0 dan sisa damage mengurangi HP
            const updatedHp = Math.max(0, target.hp - damage);
            return { ...target, block: 0, hp: updatedHp };
          }
          // Corrosive Virus & Glitch Overlay: Armor menyerap damage terlebih dahulu
          const blocked = Math.min(target.block, damage);
          const remainingDamage = damage - blocked;
          const newBlock = target.block - blocked;
          const newHp = Math.max(0, target.hp - remainingDamage);
          return { ...target, block: newBlock, hp: newHp };
        };

        if (isPlayer) {
          setIsEmpJammerActive(true);
          setEnemy((prev) => applyDebuff(prev));
        } else {
          setPlayer((prev) => applyDebuff(prev));
        }
        break;
      }
      case 'UTILITY': {
        // Chronos Rewind: Rewind Mistake - next mismatch forgiven
        soundManager.playHealSFX(); 
        triggerScreenShake();
        if (isPlayer) {
          setIsPlayerRewindActive(true);
        } else {
          setIsEnemyRewindActive(true);
        }
        spawnFloatingText(t('rewindMistakeActiveFloat', currentLang), 'match');
        break;
      }
      case 'DRAIN': {
        soundManager.playAttackSFX();
        const stealBase = 15 * mult;
        const damage = 10 * mult;
        if (isPlayer) {
          const stolen = Math.min(enemy.block, stealBase);
          setEnemy((prev) => ({
            ...prev,
            block: prev.block - stolen,
            hp: Math.max(0, prev.hp - damage)
          }));
          setPlayer((prev) => ({
            ...prev,
            block: prev.block + stolen
          }));
          spawnFloatingText(t('drainFloat', currentLang).replace('{stolen}', stolen).replace('{damage}', damage), 'match');
        } else {
          const stolen = Math.min(player.block, stealBase);
          setPlayer((prev) => ({
            ...prev,
            block: prev.block - stolen,
            hp: Math.max(0, prev.hp - damage)
          }));
          setEnemy((prev) => ({
            ...prev,
            block: prev.block + stolen
          }));
          spawnFloatingText(t('drainEnemyFloat', currentLang).replace('{stolen}', stolen), 'damage');
        }
        break;
      }
      case 'CONTROL': {
        soundManager.playBlockSFX();
        if (isPlayer) {
          setIsEnemyFrozen(true);
          spawnFloatingText(t('frostbiteFloat', currentLang), 'match');
        } else {
          setIsPlayerFrozen(true);
          spawnFloatingText(t('frostbiteEnemyFloat', currentLang), 'damage');
        }
        break;
      }
      case 'RISK': {
        const isWin = Math.random() < 0.5;
        if (isWin) {
          soundManager.playVictorySFX();
          triggerScreenShake();
          const dmg = 35 * mult;
          spawnFloatingText(t('gambleWinFloat', currentLang).replace('{damage}', dmg), 'match');
          if (isPlayer) {
            setEnemy((prev) => ({ ...prev, hp: Math.max(0, prev.hp - dmg) }));
          } else {
            setPlayer((prev) => ({ ...prev, hp: Math.max(0, prev.hp - dmg) }));
          }
        } else {
          soundManager.playMismatchSFX();
          const selfDmg = 10 * mult;
          const targetHeal = 10 * mult;
          spawnFloatingText(t('gambleLossFloat', currentLang).replace('{damage}', selfDmg).replace('{heal}', targetHeal), 'damage');
          if (isPlayer) {
            setPlayer((p) => ({ ...p, hp: Math.max(0, p.hp - selfDmg) }));
            setEnemy((e) => ({ ...e, hp: Math.min(e.maxHp, e.hp + targetHeal) }));
          } else {
            setEnemy((e) => ({ ...e, hp: Math.max(0, e.hp - selfDmg) }));
            setPlayer((p) => ({ ...p, hp: Math.min(p.maxHp, p.hp + targetHeal) }));
          }
        }
        break;
      }
      case 'SPECIAL': {
        soundManager.playMatchSFX();
        if (isPlayer) {
          setIsDoubleCastActive(true);
          spawnFloatingText(t('mirageCastFloat', currentLang), 'match');
        } else {
          setIsEnemyDoubleCastActive(true);
          spawnFloatingText(t('mirageCastEnemyFloat', currentLang), 'damage');
        }
        break;
      }
      default:
        break;
    }
    return logDetail;
  };

  const triggerStageClear = () => {
    soundManager.playVictorySFX();

    // Boss Challenge Mode: Tidak ada Loot — langsung Game Over Victory + catat waktu
    if (gameMode === 'BOSS_CHALLENGE') {
      const elapsedMs = Date.now() - (bossStartTime || Date.now());
      setBossElapsedTime(elapsedMs);
      spawnFloatingText(t('bossVictoryFloat', currentLang), 'match');
      recordLeaderboardScore(stage, totalMatchesMade, elapsedMs);
      setTimeout(() => {
        setShowGameOverModal(true);
      }, 600);
      return;
    }

    setTimeout(() => {
      const choices = generateLootChoices(playerDeck, isPityActive, pityUsesLeft > 0);
      setLootChoices(choices);
      setShowLootModal(true);
    }, 600);
  };

  const triggerGameOver = () => {
    soundManager.playDefeatSFX();
    localStorage.removeItem('memory_game_saved_state');

    let finalElapsedMs = 0;
    if (gameMode === 'BOSS_CHALLENGE') {
      finalElapsedMs = Date.now() - (bossStartTime || Date.now());
      setBossElapsedTime(finalElapsedMs);
    } else {
      // Hanya rekam skor jika RPG mode (berdasarkan stage tertinggi yang dicapai)
      recordLeaderboardScore(stage, totalMatchesMade, finalElapsedMs);
    }
    setTimeout(() => {
      setShowGameOverModal(true);
    }, 600);
  };

  const handleSelectLoot = (selectedCard) => {
    soundManager.playClickSFX();
    setShowLootModal(false);

    let updatedDeck = playerDeck;
    if (selectedCard) {
      if (selectedCard.isEmergencyPity) {
        // Pity Emergency Option (Bio-Shield Medkit) Dipilih Pemain! (Potong Kuota 1x)
        setPityUsesLeft((prev) => Math.max(0, prev - 1));
        soundManager.playHealSFX();
        spawnFloatingText(t('emergencyPityFloat', currentLang), 'heal');
        setPlayer((prev) => ({
          ...prev,
          hp: Math.min(prev.maxHp, prev.hp + selectedCard.value),
          block: prev.block + selectedCard.blockValue
        }));
        // Deck tidak bertambah kartu baru (updatedDeck tetap playerDeck)
      } else {
        // Kartu Loot Baru Dipilih -> Bonus Istirahat Stage (+10 HP)
        updatedDeck = [selectedCard, ...playerDeck];
        setPlayerDeck(updatedDeck);
        setPlayer((prev) => ({ ...prev, hp: Math.min(prev.maxHp, prev.hp + 10) }));
      }
    } else {
      // Bonus +50 HP jika Deck 100% Lengkap!
      soundManager.playHealSFX();
      spawnFloatingText(t('deckCompleteFloat', currentLang), 'heal');
      setPlayer((prev) => ({ ...prev, hp: Math.min(prev.maxHp, prev.hp + 50) }));
    }

    const nextStage = stage + 1;
    setStage(nextStage);

    const nextEnemyConfig = getStageEnemyConfig(nextStage);
    setEnemy({
      name: nextEnemyConfig.name,
      hp: nextEnemyConfig.hp,
      maxHp: nextEnemyConfig.maxHp,
      avatar: nextEnemyConfig.avatar,
      avatarImg: nextEnemyConfig.avatarImg,
      block: 0
    });

    resetBoardForStage(nextStage, updatedDeck, true);
  };

  const isGameOver = player.hp <= 0 || enemy.hp <= 0;

  return (
    <div className={`game-board-container ${isShaking ? 'screen-shake' : ''}`}>
      {/* Floating Text Animation Overlay */}
      <FloatingText items={floatingTexts} />

      {/* Player Status Component */}
      <PlayerStatus
        player={player}
        enemy={enemy}
        playerMatches={playerMatches}
        enemyMatches={enemyMatches}
        currentTurn={currentTurn}
        difficultyName={AI_DIFFICULTY_LEVELS[activeAiDifficulty].name}
        currentLang={currentLang}
      />

      {/* Pity Indicator Banner jika Pity Active (RPG Mode Only) */}
      {isPityActive && gameMode !== 'BOSS_CHALLENGE' && (
        <div className="pity-active-banner">
          🌟 <strong>{currentLang === 'ID' ? 'Pity System Aktif!' : 'Pity System Active!'}</strong> {currentLang === 'ID' ? 'Bantuan Darurat Diaktifkan (+25% Rare/Epic Drop).' : 'Emergency Assistance Activated (+25% Rare/Epic Drop).'}
        </div>
      )}

      {/* Board Header Status & Controls */}
      <div className={`game-board-header glass-panel ${gameMode === 'BOSS_CHALLENGE' ? 'boss-header' : ''}`}>
        <div className="board-status">
          {gameMode === 'BOSS_CHALLENGE' ? (
            <>
              <span className="stage-badge boss-badge">{t('bossChallengeHeader', currentLang)}</span>
              <span className="round-badge">
                {t('bossElapsedLabel', currentLang)} {Math.floor(bossElapsedTime / 60000)}m {Math.floor((bossElapsedTime % 60000) / 1000)}s
              </span>
            </>
          ) : (
            <>
              <span className="stage-badge">STAGE {stage}</span>
              <span className="round-badge">RONDE {stageRound}</span>
            </>
          )}
          {currentTurn === 'PLAYER' && !isProcessing && (
            <span className="turn-timer-badge">⏳ {turnTimer}s</span>
          )}
          {statusMessage}
        </div>

        <div className="header-controls">
          <button className="header-btn log-btn" onClick={() => setShowLogModal(true)}>
            {t('logBtn', currentLang)}
          </button>
          <button
            className="header-btn pause-btn"
            onClick={() => {
              soundManager.playClickSFX();
              setShowPauseModal(true);
            }}
            title="Pause Menu"
          >
            ⏸️ {t('pauseBtn', currentLang)}
          </button>
        </div>
      </div>

      {/* Grid Kartu dengan Animasi Kocok */}
      <div className={`cards-grid ${gameMode === 'BOSS_CHALLENGE' ? 'boss-grid-14x3' : ''} ${isShufflingBoard ? 'shuffling' : ''}`}>
        {cards.map((card, index) => {
          const isFlipped =
            flippedCards.some((c) => c.uniqueId === card.uniqueId) ||
            matchedCardIds.includes(card.pairId);
          const isMatched = matchedCardIds.includes(card.pairId);
          const isXrayVision = temporaryRevealed.includes(card.uniqueId);
          const shuffleSide = index % 2 === 0 ? 1 : -1;

          return (
            <div
              key={card.uniqueId}
              style={{
                animationDelay: `${index * 0.038}s`,
                '--shuffle-side': shuffleSide,
                height: '100%'
              }}
            >
              <Card
                card={card}
                isFlipped={isFlipped}
                isMatched={isMatched}
                isXrayVision={isXrayVision}
                isDisabled={isProcessing || currentTurn !== 'PLAYER' || isGameOver}
                onClick={handleCardClick}
              />
            </div>
          );
        })}
      </div>

      {/* Modal Menu Pause (Dirender lebih awal di DOM agar sub-menu menumpuk di atasnya) */}
      {showPauseModal && (
        <PauseModal
          onResume={() => setShowPauseModal(false)}
          isBgmMuted={isBgmMuted}
          onToggleBgm={handleToggleBgm}
          isSfxMuted={isSfxMuted}
          onToggleSfx={handleToggleSfx}
          currentLang={currentLang}
          onToggleLang={handleToggleLang}
          onOpenGuide={() => {
            soundManager.playClickSFX();
            setShowGuideModal(true);
          }}
          onOpenCatalog={() => {
            soundManager.playClickSFX();
            setIsCatalogFromDashboard(false);
            setShowCatalogModal(true);
          }}
          onOpenLeaderboard={() => {
            soundManager.playClickSFX();
            setShowLeaderboardModal(true);
          }}
          onResetClick={handleResetButtonClick}
        />
      )}

      {/* Modal Input Nama di Awal */}
      {showNameModal && (
        <NameModal
          onSubmitName={handleNameSubmit}
          currentLang={currentLang}
          onToggleLang={handleToggleLang}
          onOpenGuide={() => {
            soundManager.playClickSFX();
            setShowGuideModal(true);
          }}
          onOpenCatalog={() => {
            soundManager.playClickSFX();
            setIsCatalogFromDashboard(true);
            setShowCatalogModal(true);
          }}
          onOpenLeaderboard={() => {
            soundManager.playClickSFX();
            setShowLeaderboardModal(true);
          }}
        />
      )}

      {/* Modal Leaderboard Online + Lokal */}
      {showLeaderboardModal && (
        <LeaderboardModal
          leaderboard={leaderboard}
          currentPlayerName={playerName}
          currentLang={currentLang}
          onClose={() => {
            soundManager.playClickSFX();
            setShowLeaderboardModal(false);
            if (player.hp <= 0 || enemy.hp <= 0) {
              setShowGameOverModal(true);
            }
          }}
        />
      )}

      {/* Modal Buku Panduan Game */}
      {showGuideModal && (
        <GuideModal
          currentLang={currentLang}
          onClose={() => { soundManager.playClickSFX(); setShowGuideModal(false); }}
        />
      )}

      {/* Modal Log Pertempuran */}
      {showLogModal && (
        <LogModal
          logs={battleLogs}
          onClose={() => setShowLogModal(false)}
          currentLang={currentLang}
        />
      )}

      {/* Modal Katalog Kartu dengan Indikator Kartu Aktif Stage */}
      {showCatalogModal && (
        <CatalogModal
          isDashboard={isCatalogFromDashboard}
          activeStageCards={cards}
          stage={stage}
          currentLang={currentLang}
          onClose={() => { soundManager.playClickSFX(); setShowCatalogModal(false); }}
        />
      )}

      {/* Modal Custom UI Konfirmasi Reset */}
      {showResetConfirmModal && (
        <ResetConfirmModal
          currentLang={currentLang}
          onConfirm={handleConfirmReset}
          onCancel={() => { soundManager.playClickSFX(); setShowResetConfirmModal(false); }}
        />
      )}

      {/* Modal Hadiah Loot Stage Clear */}
      {showLootModal && (
        <LootModal
          stage={stage}
          choices={lootChoices}
          isPityActive={isPityActive}
          pityUsesLeft={pityUsesLeft}
          currentLang={currentLang}
          onSelectLoot={handleSelectLoot}
        />
      )}

      {/* Modal Game Over saat Permadeath */}
      {showGameOverModal && (
        <GameOverModal
          stage={stage}
          totalMatches={playerMatches}
          difficultyName={AI_DIFFICULTY_LEVELS[activeAiDifficulty]?.name}
          isVictory={player.hp > 0 && enemy.hp === 0}
          gameMode={gameMode}
          bossElapsedTime={bossElapsedTime}
          onRestartJourney={startNewJourney}
          onBackToDashboard={returnToDashboard}
          currentLang={currentLang}
          onOpenLeaderboard={() => {
            soundManager.playClickSFX();
            setShowGameOverModal(false);
            setShowLeaderboardModal(true);
          }}
        />
      )}
    </div>
  );
};

export default GameBoard;
