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
import ResetConfirmModal from '../ResetConfirmModal/ResetConfirmModal';
import { CARD_DATABASE } from '../../utils/cardData';
import { AI_DIFFICULTY_LEVELS, updateAiMemory, getAiCardChoices } from '../../utils/aiLogic';
import { generateLootChoices, getStageEnemyConfig } from '../../utils/lootSystem';
import { submitScore } from '../../utils/leaderboardService';
import { soundManager } from '../../utils/soundSystem';
import './GameBoard.css';

const TURN_TIME_LIMIT = 15; // 15 detik batas waktu berpikir

const GameBoard = () => {
  // Audio Controls State
  const [isBgmMuted, setIsBgmMuted] = useState(soundManager.isBgmMuted);
  const [isSfxMuted, setIsSfxMuted] = useState(soundManager.isSfxMuted);

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
  const [statusMessage, setStatusMessage] = useState('Pilih 2 kartu untuk menyerang musuh!');

  // Modal UI states
  const [isCatalogFromDashboard, setIsCatalogFromDashboard] = useState(false);

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

  // Compute Active AI Difficulty
  const activeAiDifficulty = selectedAiMode === 'AUTO'
    ? getStageEnemyConfig(stage).difficulty
    : selectedAiMode;

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
        e.returnValue = 'Pertarungan Anda sedang berlangsung! Me-refresh web akan mereset pertarungan dari awal.';
        return e.returnValue;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [playerName, showNameModal, player.hp, enemy.hp]);

  // Turn Timer Countdown Effect (15s)
  useEffect(() => {
    let interval = null;
    if (currentTurn === 'PLAYER' && !isProcessing && player.hp > 0 && enemy.hp > 0 && !showNameModal) {
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
    } else if (currentTurn === 'ENEMY') {
      setTurnTimer(TURN_TIME_LIMIT);
    }
    return () => clearInterval(interval);
  }, [currentTurn, isProcessing, player.hp, enemy.hp, showNameModal]);

  // Catatan: Reset papan sudah ditangani di handleMatchResult ketika semua kartu cocok.

  // Waktu Berpikir Habis Handler
  const handleTurnTimeout = () => {
    setFlippedCards([]);
    setIsProcessing(true);
    soundManager.playMismatchSFX();
    spawnFloatingText('⏰ WAKTU HABIS!', 'damage');
    setStatusMessage('⏰ Waktu berpikir Anda habis! Giliran berpindah ke Musuh!');

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
      AUTO: 'Otomatis (Scaling Stage)',
      EASY: 'Mudah (35%)',
      MEDIUM: 'Sedang (65%)',
      HARD: 'Tinggi (88%)'
    };

    spawnFloatingText(`🧠 Mode AI: ${modeLabels[nextMode]}`, 'match');
    setStatusMessage(`🧠 Mode Kesulitan AI Diubah ke: ${modeLabels[nextMode]}`);
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
  const handleNameSubmit = (name, mode = 'AUTO') => {
    soundManager.startBgm();
    soundManager.playClickSFX();
    localStorage.setItem('memory_player_name', name);
    localStorage.setItem('memory_ai_mode', mode);
    setPlayerName(name);
    setSelectedAiMode(mode);
    setPlayer((prev) => ({ ...prev, name }));
    setShowNameModal(false);
  };

  // Catat Skor ke Leaderboard Lokal (Sesi) & Online (Supabase)
  const recordLeaderboardScore = (finalStage, matches) => {
    const activeDifficultyLabel = AI_DIFFICULTY_LEVELS[activeAiDifficulty]?.name || 'Otomatis';
    const newEntry = {
      name: playerName || 'Cyber Hero',
      difficulty: activeDifficultyLabel,
      stage: finalStage,
      totalMatches: matches
    };
    const updated = [...leaderboard, newEntry]
      .sort((a, b) => b.stage - a.stage || b.totalMatches - a.totalMatches)
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
    localStorage.removeItem('memory_game_saved_state');
    localStorage.removeItem('memory_player_name');
    setPlayerName('');
    setShowNameModal(true);
    returnToDashboard();
  };

  // Inisialisasi papan baru setelah player mengisi nama (pertama kali / fresh start)
  const initBoardForNewPlayer = () => {
    localStorage.removeItem('memory_game_saved_state');
    const enemyConfig = getStageEnemyConfig(1);
    setStage(1);
    setPlayerDeck(CARD_DATABASE.slice(0, 8));
    setPlayer((prev) => ({ ...prev, hp: 100, maxHp: 100, block: 0 }));
    setEnemy({ name: enemyConfig.name, hp: enemyConfig.hp, maxHp: enemyConfig.maxHp, block: 0 });
    setMismatchStreak(0);
    setTotalMatchesMade(0);
    setTurnTimer(TURN_TIME_LIMIT);
    setPityUsesLeft(2);
    setPlayerMatches(0);
    setEnemyMatches(0);
    setStageRound(1);
    setShowLootModal(false);
    setShowGameOverModal(false);
    resetBoardForStage(1, CARD_DATABASE.slice(0, 8), true);
  };

  // Kembali ke Dashboard Nama (dipanggil dari Game Over / Reset)
  const returnToDashboard = () => {
    localStorage.removeItem('memory_game_saved_state');
    localStorage.removeItem('memory_player_name');
    const enemyConfig = getStageEnemyConfig(1);
    setStage(1);
    setPlayerDeck(CARD_DATABASE.slice(0, 8));
    setPlayer({ name: 'Cyber Hero', hp: 100, maxHp: 100, block: 0 });
    setEnemy({ name: enemyConfig.name, hp: enemyConfig.hp, maxHp: enemyConfig.maxHp, block: 0 });
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
  };

  // Alias untuk kompatibilitas (dipanggil dari GameOverModal)
  const startNewJourney = returnToDashboard;

  // Reset Board untuk Stage / Ronde baru
  const resetBoardForStage = (stageNum, deckToUse, isNewStage = false) => {
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

    // Acak & ambil tepat 8 jenis kartu unik untuk membentuk 8 pasang kartu (16 kartu di papan)
    const shuffledDeck = [...uniqueCardTypes].sort(() => Math.random() - 0.5);
    const selectedTypes = shuffledDeck.slice(0, 8);

    selectedTypes.forEach((card) => {
      boardCards.push({ uniqueId: `${card.id}-a-${Math.random()}`, pairId: card.id, ...card });
      boardCards.push({ uniqueId: `${card.id}-b-${Math.random()}`, pairId: card.id, ...card });
    });

    // Pengocokan 16 kartu di papan (4x4) menggunakan Algoritma Fisher-Yates Shuffle
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
    setIsProcessing(false);
    setCurrentTurn('PLAYER');
    setTurnTimer(TURN_TIME_LIMIT);

    if (isNewStage) {
      setStageRound(1);
    } else {
      setStageRound((prev) => prev + 1);
    }

    setStatusMessage(`⚔️ Stage ${stageNum}: Pertarungan melawan ${getStageEnemyConfig(stageNum).name}!`);

    // Pemicu Animasi Realistis Casino Dealer Riffle & Deal Shuffle
    setIsShufflingBoard(true);
    soundManager.playShuffleSFX();
    setTimeout(() => {
      setIsShufflingBoard(false);
    }, 850);
  };

  // AI Turn Handling
  useEffect(() => {
    if (currentTurn === 'ENEMY' && !isProcessing && player.hp > 0 && enemy.hp > 0) {
      const available = cards.filter((c) => !matchedCardIds.includes(c.pairId));
      if (available.length < 2) return;

      setIsProcessing(true);
      setStatusMessage(`🤖 ${enemy.name} (AI ${AI_DIFFICULTY_LEVELS[activeAiDifficulty].name}) sedang berpikir...`);

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
  }, [currentTurn, isProcessing, cards, matchedCardIds, aiMemory, activeAiDifficulty, isEmpJammerActive, player.hp, enemy.hp]);

  // Handle Player Card Click
  const handleCardClick = (clickedCard) => {
    if (
      currentTurn !== 'PLAYER' ||
      isProcessing ||
      flippedCards.some((c) => c.uniqueId === clickedCard.uniqueId) ||
      matchedCardIds.includes(clickedCard.pairId) ||
      player.hp <= 0 ||
      enemy.hp <= 0
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
    const actorName = actor === 'PLAYER' ? playerName || 'Anda' : enemy.name;

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
        spawnFloatingText(`✨ MATCH: ${card1.name}!`, 'match');
      }
      applyCardEffect(card1, actor);

      const nextMatched = [...matchedCardIds, card1.pairId];
      setMatchedCardIds(nextMatched);

      if (nextMatched.length === cards.length / 2) {
        setFlippedCards([]);
        setIsProcessing(false);

        setTimeout(() => {
          setEnemy((latestEnemy) => {
            setPlayer((latestPlayer) => {
              if (latestEnemy.hp > 0 && latestPlayer.hp > 0) {
                spawnFloatingText('🔄 Ronde Baru! Papan Direset', 'match');
                setStatusMessage('🔄 Seluruh 16 kartu cocok! Mengocok papan untuk Ronde berikutnya...');
                resetBoardForStage(stage, playerDeck, false);
              }
              return latestPlayer;
            });
            return latestEnemy;
          });
        }, 1200);
      } else {
        setStatusMessage(`✨ Match! ${actorName} berhasil menggunakan efek ${card1.name}!`);
        setFlippedCards([]);
        setIsProcessing(false);
        if (actor === 'ENEMY') setIsEmpJammerActive(false);
      }
    } else {
      soundManager.playMismatchSFX();
      if (actor === 'PLAYER') {
        setMismatchStreak((prev) => prev + 1);
      }

      setStatusMessage(`❌ Mismatch! Giliran ${actorName} berakhir.`);
      setTimeout(() => {
        setFlippedCards([]);
        setIsProcessing(false);
        setCurrentTurn(actor === 'PLAYER' ? 'ENEMY' : 'PLAYER');
        setTurnTimer(TURN_TIME_LIMIT);
        if (actor === 'ENEMY') setIsEmpJammerActive(false);
      }, 1000);
    }
  };

  // Aplikasikan Efek Kartu
  const applyCardEffect = (card, actor) => {
    const isPlayer = actor === 'PLAYER';

    switch (card.type) {
      case 'ATTACK': {
        soundManager.playAttackSFX();
        const damage = card.value;
        triggerScreenShake();

        if (card.isPiercing) {
          // Quantum Piercer: Menembus armor langsung ke HP
          spawnFloatingText(`🗡️ PIERCE -${damage} HP`, 'damage');
          if (isPlayer) {
            setEnemy((prev) => {
              const updatedHp = Math.max(0, prev.hp - damage);
              if (updatedHp === 0) triggerStageClear();
              return { ...prev, hp: updatedHp };
            });
          } else {
            setPlayer((prev) => {
              const updatedHp = Math.max(0, prev.hp - damage);
              if (updatedHp === 0) triggerGameOver();
              return { ...prev, hp: updatedHp };
            });
          }
        } else {
          spawnFloatingText(`-${damage} HP`, 'damage');
          if (isPlayer) {
            setEnemy((prev) => {
              let newBlock = prev.block - damage;
              let hpDamage = 0;
              if (newBlock < 0) {
                hpDamage = Math.abs(newBlock);
                newBlock = 0;
              }
              const updatedHp = Math.max(0, prev.hp - hpDamage);
              if (updatedHp === 0) triggerStageClear();
              return { ...prev, block: newBlock, hp: updatedHp };
            });
          } else {
            setPlayer((prev) => {
              let newBlock = prev.block - damage;
              let hpDamage = 0;
              if (newBlock < 0) {
                hpDamage = Math.abs(newBlock);
                newBlock = 0;
              }
              const updatedHp = Math.max(0, prev.hp - hpDamage);
              if (updatedHp === 0) triggerGameOver();
              return { ...prev, block: newBlock, hp: updatedHp };
            });
          }
        }

        // Divine Wrath: Efek unik Attack + Heal +15 HP untuk penyerang
        if (card.id === 'pity_wrath' && isPlayer) {
          soundManager.playHealSFX();
          spawnFloatingText(`⚡ DIVINE WRATH +15 HP!`, 'heal');
          setPlayer((prev) => ({ ...prev, hp: Math.min(prev.maxHp, prev.hp + 15) }));
        } else if (card.id === 'pity_wrath' && !isPlayer) {
          setEnemy((prev) => ({ ...prev, hp: Math.min(prev.maxHp, prev.hp + 15) }));
        }
        break;
      }
      case 'DEFENSE': {
        soundManager.playBlockSFX();
        spawnFloatingText(`+${card.value} Armor`, 'block');
        if (isPlayer) {
          setPlayer((prev) => ({ ...prev, block: prev.block + card.value }));
        } else {
          setEnemy((prev) => ({ ...prev, block: prev.block + card.value }));
        }
        break;
      }
      case 'HEAL': {
        soundManager.playHealSFX();
        spawnFloatingText(`+${card.value} HP`, 'heal');
        if (isPlayer) {
          setPlayer((prev) => ({ ...prev, hp: Math.min(prev.maxHp, prev.hp + card.value) }));
        } else {
          setEnemy((prev) => ({ ...prev, hp: Math.min(prev.maxHp, prev.hp + card.value) }));
        }
        break;
      }
      case 'BUFF': {
        if (isPlayer) {
          spawnFloatingText(`👁️ X-RAY SCAN: ${card.name}!`, 'match');
          const unmatched = cards.filter((c) => !matchedCardIds.includes(c.pairId));
          if (unmatched.length >= 2) {
            const sample = unmatched.slice(0, 2).map((c) => c.uniqueId);
            setTemporaryRevealed(sample);
            setTimeout(() => {
              setTemporaryRevealed([]);
            }, 2500);
          }
        } else {
          // Musuh (AI) Buff -> AI merekam ingatan tanpa membocorkan ke tampilan pemain
          spawnFloatingText(`🤖 MUSUH SCAN PAPAN!`, 'damage');
          const unmatched = cards.filter((c) => !matchedCardIds.includes(c.pairId));
          if (unmatched.length >= 2) {
            const sample = unmatched.slice(0, 2);
            const accuracy = AI_DIFFICULTY_LEVELS[activeAiDifficulty].memoryAccuracy;
            setAiMemory((prevMem) => updateAiMemory(prevMem, sample, accuracy));
          }
        }
        break;
      }
      case 'DEBUFF': {
        soundManager.playAttackSFX();
        triggerScreenShake();
        // EMP Disrupter: melumpuhkan armor musuh terlebih dahulu
        const isEmpAttack = card.id === 'debuff_emp';
        if (isEmpAttack) {
          spawnFloatingText(`⚡ EMP! Armor dihancurkan! -${card.value} HP`, 'damage');
        } else {
          spawnFloatingText(`☠️ VIRUS -${card.value} HP!`, 'damage');
        }
        if (isPlayer) {
          setIsEmpJammerActive(true);
          setEnemy((prev) => {
            const newBlock = isEmpAttack ? 0 : prev.block;
            const updatedHp = Math.max(0, prev.hp - card.value);
            if (updatedHp === 0) triggerStageClear();
            return { ...prev, block: newBlock, hp: updatedHp };
          });
        } else {
          setPlayer((prev) => {
            const newBlock = isEmpAttack ? 0 : prev.block;
            const updatedHp = Math.max(0, prev.hp - card.value);
            if (updatedHp === 0) triggerGameOver();
            return { ...prev, block: newBlock, hp: updatedHp };
          });
        }
        break;
      }
      default:
        break;
    }
  };

  const triggerStageClear = () => {
    soundManager.playVictorySFX();
    recordLeaderboardScore(stage, totalMatchesMade + 1);
    setTimeout(() => {
      const choices = generateLootChoices(playerDeck, isPityActive, pityUsesLeft > 0);
      setLootChoices(choices);
      setShowLootModal(true);
    }, 600);
  };

  const triggerGameOver = () => {
    soundManager.playDefeatSFX();
    localStorage.removeItem('memory_game_saved_state');
    recordLeaderboardScore(stage, totalMatchesMade);
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
        spawnFloatingText('🚑 BANTUAN DARURAT! +35 HP & +25 ARMOR', 'heal');
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
      spawnFloatingText('💖 +50 HP BONUS DECK LENGKAP!', 'heal');
      setPlayer((prev) => ({ ...prev, hp: Math.min(prev.maxHp, prev.hp + 50) }));
    }

    const nextStage = stage + 1;
    setStage(nextStage);

    const nextEnemyConfig = getStageEnemyConfig(nextStage);
    setEnemy({
      name: nextEnemyConfig.name,
      hp: nextEnemyConfig.hp,
      maxHp: nextEnemyConfig.maxHp,
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
      />

      {/* Pity Indicator Banner jika Pity Active */}
      {isPityActive && (
        <div className="pity-active-banner">
          🌟 <strong>Pity System Active!</strong> Bantuan Darurat Diaktifkan (+25% Rare/Epic Drop).
        </div>
      )}

      {/* Board Header Status & Controls */}
      <div className="game-board-header glass-panel">
        <div className="board-status">
          <span className="stage-badge">STAGE {stage}</span>
          <span className="round-badge">RONDE {stageRound}</span>
          {currentTurn === 'PLAYER' && !isProcessing && (
            <span className="turn-timer-badge">⏳ {turnTimer}s</span>
          )}
          {statusMessage}
        </div>

        <div className="header-controls">
          <button className="nav-icon-btn" onClick={handleToggleBgm} title="Toggle Musik BGM">
            {isBgmMuted ? '🔇 Musik' : '🔊 Musik'}
          </button>
          <button className="nav-icon-btn" onClick={handleToggleSfx} title="Toggle SFX Suara">
            {isSfxMuted ? '🔕 SFX' : '🔔 SFX'}
          </button>
          <button
            className="nav-icon-btn"
            onClick={() => {
              soundManager.playClickSFX();
              setShowGuideModal(true);
            }}
            title="Buku Panduan Game"
          >
            📖 Panduan
          </button>
          <button
            className="nav-icon-btn"
            onClick={() => {
              soundManager.playClickSFX();
              setIsCatalogFromDashboard(false);
              setShowCatalogModal(true);
            }}
            title="Kartu Aktif Stage Ini"
          >
            🂠 Kartu Stage
          </button>
          <button className="nav-icon-btn" onClick={() => { soundManager.playClickSFX(); setShowLeaderboardModal(true); }} title="Leaderboard Sesi">
            🏆 Skor
          </button>
          <button className="reset-btn" onClick={handleResetButtonClick}>
            Reset
          </button>
        </div>
      </div>

      {/* Grid Kartu dengan Animasi Kocok */}
      <div className={`cards-grid ${isShufflingBoard ? 'shuffling' : ''}`}>
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

      {/* Modal Input Nama di Awal */}
      {showNameModal && (
        <NameModal
          onSubmitName={handleNameSubmit}
          onOpenGuide={() => {
            soundManager.playClickSFX();
            setShowGuideModal(true);
          }}
          onOpenCatalog={() => {
            soundManager.playClickSFX();
            setIsCatalogFromDashboard(true);
            setShowCatalogModal(true);
          }}
        />
      )}

      {/* Modal Leaderboard Online + Lokal */}
      {showLeaderboardModal && (
        <LeaderboardModal
          leaderboard={leaderboard}
          currentPlayerName={playerName}
          onClose={() => { soundManager.playClickSFX(); setShowLeaderboardModal(false); }}
        />
      )}

      {/* Modal Buku Panduan Game */}
      {showGuideModal && (
        <GuideModal
          onClose={() => { soundManager.playClickSFX(); setShowGuideModal(false); }}
        />
      )}

      {/* Modal Katalog Kartu dengan Indikator Kartu Aktif Stage */}
      {showCatalogModal && (
        <CatalogModal
          isDashboard={isCatalogFromDashboard}
          activeStageCards={cards}
          stage={stage}
          onClose={() => { soundManager.playClickSFX(); setShowCatalogModal(false); }}
        />
      )}

      {/* Modal Custom UI Konfirmasi Reset */}
      {showResetConfirmModal && (
        <ResetConfirmModal
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
          onSelectLoot={handleSelectLoot}
        />
      )}

      {/* Modal Game Over saat Permadeath */}
      {showGameOverModal && (
        <GameOverModal
          stage={stage}
          totalMatches={totalMatchesMade}
          onRestartJourney={startNewJourney}
        />
      )}
    </div>
  );
};

export default GameBoard;
