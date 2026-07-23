import React, { useState, useEffect } from 'react';
import Card from '../Card/Card';
import PlayerStatus from '../PlayerStatus/PlayerStatus';
import LootModal from '../LootModal/LootModal';
import GameOverModal from '../GameOverModal/GameOverModal';
import FloatingText from '../FloatingText/FloatingText';
import NameModal from '../NameModal/NameModal';
import LeaderboardModal from '../LeaderboardModal/LeaderboardModal';
import CatalogModal from '../CatalogModal/CatalogModal';
import { generateStarterBoard, CARD_DATABASE } from '../../utils/cardData';
import { AI_DIFFICULTY_LEVELS, updateAiMemory, getAiCardChoices } from '../../utils/aiLogic';
import { generateLootChoices, getStageEnemyConfig } from '../../utils/lootSystem';
import './GameBoard.css';

const TURN_TIME_LIMIT = 15; // 15 detik batas waktu berpikir

const GameBoard = () => {
  // Player Name & Leaderboard States
  const [playerName, setPlayerName] = useState(localStorage.getItem('memory_player_name') || '');
  const [showNameModal, setShowNameModal] = useState(!localStorage.getItem('memory_player_name'));
  const [showLeaderboardModal, setShowLeaderboardModal] = useState(false);
  const [showCatalogModal, setShowCatalogModal] = useState(false);
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

  // Game Board States
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCardIds, setMatchedCardIds] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState('Pilih 2 kartu untuk menyerang musuh!');

  // Polish UI/UX States
  const [floatingTexts, setFloatingTexts] = useState([]);
  const [isShaking, setIsShaking] = useState(false);

  // Entity States
  const [player, setPlayer] = useState({ name: playerName || 'Cyber Hero', hp: 100, maxHp: 100, block: 0 });
  const [enemy, setEnemy] = useState({ name: 'Cyber Scout', hp: 70, maxHp: 70, block: 0 });
  const [currentTurn, setCurrentTurn] = useState('PLAYER');
  const [temporaryRevealed, setTemporaryRevealed] = useState([]);

  // AI State
  const [aiDifficulty, setAiDifficulty] = useState('EASY');
  const [aiMemory, setAiMemory] = useState({});
  const [isEmpJammerActive, setIsEmpJammerActive] = useState(false);

  // Dynamic Pity System State
  const isPityActive = (player.hp / player.maxHp) < 0.5 && mismatchStreak >= 3;

  // Initialize & Restore Saved Progress on Mount
  useEffect(() => {
    if (playerName) {
      const savedState = localStorage.getItem('memory_game_saved_state');
      if (savedState) {
        try {
          const parsed = JSON.parse(savedState);
          if (parsed && parsed.player && parsed.player.hp > 0 && parsed.stage >= 1) {
            setStage(parsed.stage);
            setPlayer({ ...parsed.player, name: playerName });
            setEnemy(parsed.enemy);
            setPlayerDeck(parsed.playerDeck || CARD_DATABASE.slice(0, 8));
            setTotalMatchesMade(parsed.totalMatchesMade || 0);

            const enemyConfig = getStageEnemyConfig(parsed.stage);
            setAiDifficulty(enemyConfig.difficulty);

            // RESTORE EXACT CARDS LAYOUT & MATCHED CARDS!
            if (parsed.cards && parsed.cards.length > 0) {
              setCards(parsed.cards);
              setMatchedCardIds(parsed.matchedCardIds || []);
            } else {
              resetBoardForStage(parsed.stage, parsed.playerDeck || CARD_DATABASE.slice(0, 8));
            }

            setStatusMessage(`✨ Melanjutkan pertarungan Stage ${parsed.stage}!`);
            return;
          }
        } catch (err) {
          console.error("Error parsing saved progress:", err);
        }
      }
      startNewJourney();
    }
  }, [playerName]);

  // Auto-Save progress whenever stage, entities, cards, or matchedCardIds change
  useEffect(() => {
    if (playerName && player.hp > 0 && stage >= 1 && cards.length > 0) {
      const progress = {
        stage,
        player,
        enemy,
        playerDeck,
        cards,           // SAVE BOARD CARDS LAYOUT
        matchedCardIds,  // SAVE OPEN MATCHED CARDS
        totalMatchesMade
      };
      localStorage.setItem('memory_game_saved_state', JSON.stringify(progress));
    }
  }, [stage, player, enemy, playerDeck, cards, matchedCardIds, totalMatchesMade, playerName]);

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
    } else {
      setTurnTimer(TURN_TIME_LIMIT);
    }
    return () => clearInterval(interval);
  }, [currentTurn, isProcessing, player.hp, enemy.hp, showNameModal]);

  // Waktu Berpikir Habis Handler
  const handleTurnTimeout = () => {
    setFlippedCards([]);
    setIsProcessing(true);
    spawnFloatingText('⏰ WAKTU HABIS!', 'damage');
    setStatusMessage('⏰ Waktu berpikir Anda habis! Giliran berpindah ke Musuh!');

    setTimeout(() => {
      setIsProcessing(false);
      setCurrentTurn('ENEMY');
    }, 1200);
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

  // Handle Nama Pemain
  const handleNameSubmit = (name) => {
    localStorage.setItem('memory_player_name', name);
    setPlayerName(name);
    setPlayer((prev) => ({ ...prev, name }));
    setShowNameModal(false);
  };

  // Catat Skor ke Leaderboard Sesi
  const recordLeaderboardScore = (finalStage, matches) => {
    const newEntry = { name: playerName || 'Cyber Hero', stage: finalStage, totalMatches: matches };
    const updated = [...leaderboard, newEntry]
      .sort((a, b) => b.stage - a.stage || b.totalMatches - a.totalMatches)
      .slice(0, 10);

    setLeaderboard(updated);
    localStorage.setItem('memory_card_leaderboard', JSON.stringify(updated));
  };

  // Mulai Perjalanan Baru dari Stage 1
  const startNewJourney = () => {
    localStorage.removeItem('memory_game_saved_state');
    const enemyConfig = getStageEnemyConfig(1);
    setStage(1);
    setPlayerDeck(CARD_DATABASE.slice(0, 8));
    setPlayer({ name: playerName || 'Cyber Hero', hp: 100, maxHp: 100, block: 0 });
    setEnemy({ name: enemyConfig.name, hp: enemyConfig.hp, maxHp: enemyConfig.maxHp, block: 0 });
    setAiDifficulty(enemyConfig.difficulty);
    setMismatchStreak(0);
    setTotalMatchesMade(0);
    setTurnTimer(TURN_TIME_LIMIT);
    setShowLootModal(false);
    setShowGameOverModal(false);
    resetBoardForStage(1, CARD_DATABASE.slice(0, 8));
  };

  // Reset Board untuk Stage tertentu
  const resetBoardForStage = (stageNum, deckToUse) => {
    const boardCards = [];
    const activeDeck = deckToUse || playerDeck;
    
    const selectedTypes = activeDeck.slice(0, 8);
    selectedTypes.forEach((card) => {
      boardCards.push({ uniqueId: `${card.id}-a-${Math.random()}`, pairId: card.id, ...card });
      boardCards.push({ uniqueId: `${card.id}-b-${Math.random()}`, pairId: card.id, ...card });
    });

    for (let i = boardCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [boardCards[i], boardCards[j]] = [boardCards[j], boardCards[i]];
    }

    setCards(boardCards);
    setFlippedCards([]);
    setMatchedCardIds([]);
    setAiMemory({});
    setIsEmpJammerActive(false);
    setIsProcessing(false);
    setCurrentTurn('PLAYER');
    setTurnTimer(TURN_TIME_LIMIT);
    setStatusMessage(`⚔️ Stage ${stageNum}: Pertarungan melawan ${getStageEnemyConfig(stageNum).name}!`);
  };

  // AI Turn Handling
  useEffect(() => {
    if (currentTurn === 'ENEMY' && !isProcessing && player.hp > 0 && enemy.hp > 0) {
      const available = cards.filter((c) => !matchedCardIds.includes(c.pairId));
      if (available.length < 2) return;

      setIsProcessing(true);
      setStatusMessage(`🤖 ${enemy.name} (AI ${AI_DIFFICULTY_LEVELS[aiDifficulty].name}) sedang berpikir...`);

      const accuracy = AI_DIFFICULTY_LEVELS[aiDifficulty].memoryAccuracy;

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
  }, [currentTurn, isProcessing, cards, matchedCardIds, aiMemory, aiDifficulty, isEmpJammerActive, player.hp, enemy.hp]);

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

    const newFlipped = [...flippedCards, clickedCard];
    setFlippedCards(newFlipped);

    const accuracy = AI_DIFFICULTY_LEVELS[aiDifficulty].memoryAccuracy;
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
      if (actor === 'PLAYER') {
        setMismatchStreak(0);
        setTotalMatchesMade((prev) => prev + 1);
      }

      spawnFloatingText(`✨ MATCH: ${card1.name}!`, 'match');
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
                setStatusMessage('🔄 Seluruh kartu cocok! Mengocok ulang papan untuk ronde berikutnya...');
                resetBoardForStage(stage, playerDeck);
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
        const damage = card.value;
        triggerScreenShake();
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
        break;
      }
      case 'DEFENSE': {
        spawnFloatingText(`+${card.value} Armor`, 'block');
        if (isPlayer) {
          setPlayer((prev) => ({ ...prev, block: prev.block + card.value }));
        } else {
          setEnemy((prev) => ({ ...prev, block: prev.block + card.value }));
        }
        break;
      }
      case 'HEAL': {
        spawnFloatingText(`+${card.value} HP`, 'heal');
        if (isPlayer) {
          setPlayer((prev) => ({ ...prev, hp: Math.min(prev.maxHp, prev.hp + card.value) }));
        } else {
          setEnemy((prev) => ({ ...prev, hp: Math.min(prev.maxHp, prev.hp + card.value) }));
        }
        break;
      }
      case 'BUFF': {
        spawnFloatingText(`👁️ VISION ACTIVE!`, 'match');
        const unmatched = cards.filter((c) => !matchedCardIds.includes(c.pairId));
        if (unmatched.length >= 2) {
          const sample = unmatched.slice(0, 2).map((c) => c.uniqueId);
          setTemporaryRevealed(sample);
          setTimeout(() => {
            setTemporaryRevealed([]);
          }, 2000);
        }
        break;
      }
      case 'DEBUFF': {
        triggerScreenShake();
        spawnFloatingText(`☠️ VIRUS -16 HP!`, 'damage');
        if (isPlayer) {
          setIsEmpJammerActive(true);
          setEnemy((prev) => {
            const updatedHp = Math.max(0, prev.hp - 16);
            if (updatedHp === 0) triggerStageClear();
            return { ...prev, hp: updatedHp };
          });
        } else {
          setPlayer((prev) => {
            const updatedHp = Math.max(0, prev.hp - 16);
            if (updatedHp === 0) triggerGameOver();
            return { ...prev, hp: updatedHp };
          });
        }
        break;
      }
      default:
        break;
    }
  };

  const triggerStageClear = () => {
    recordLeaderboardScore(stage, totalMatchesMade + 1);
    setTimeout(() => {
      const choices = generateLootChoices(isPityActive);
      setLootChoices(choices);
      setShowLootModal(true);
    }, 600);
  };

  const triggerGameOver = () => {
    localStorage.removeItem('memory_game_saved_state');
    recordLeaderboardScore(stage, totalMatchesMade);
    setTimeout(() => {
      setShowGameOverModal(true);
    }, 600);
  };

  const handleSelectLoot = (selectedCard) => {
    setShowLootModal(false);
    const newDeck = [selectedCard, ...playerDeck];
    setPlayerDeck(newDeck);

    const nextStage = stage + 1;
    setStage(nextStage);

    const nextEnemyConfig = getStageEnemyConfig(nextStage);
    setEnemy({
      name: nextEnemyConfig.name,
      hp: nextEnemyConfig.hp,
      maxHp: nextEnemyConfig.maxHp,
      block: 0
    });
    setAiDifficulty(nextEnemyConfig.difficulty);
    setMismatchStreak(0);

    resetBoardForStage(nextStage, newDeck);
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
        currentTurn={currentTurn}
        difficultyName={AI_DIFFICULTY_LEVELS[aiDifficulty].name}
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
          {currentTurn === 'PLAYER' && !isProcessing && (
            <span className="turn-timer-badge">⏳ {turnTimer}s</span>
          )}
          {statusMessage}
        </div>

        <div className="header-controls">
          <button className="nav-icon-btn" onClick={() => setShowCatalogModal(true)} title="Katalog Kartu">
            📖 Kartu
          </button>
          <button className="nav-icon-btn" onClick={() => setShowLeaderboardModal(true)} title="Leaderboard Sesi">
            🏆 Skor
          </button>
          <button className="reset-btn" onClick={startNewJourney}>
            Reset
          </button>
        </div>
      </div>

      {/* Grid Kartu */}
      <div className="cards-grid">
        {cards.map((card) => {
          const isFlipped =
            flippedCards.some((c) => c.uniqueId === card.uniqueId) ||
            matchedCardIds.includes(card.pairId) ||
            temporaryRevealed.includes(card.uniqueId);
          const isMatched = matchedCardIds.includes(card.pairId);

          return (
            <Card
              key={card.uniqueId}
              card={card}
              isFlipped={isFlipped}
              isMatched={isMatched}
              isDisabled={isProcessing || currentTurn !== 'PLAYER' || isGameOver}
              onClick={handleCardClick}
            />
          );
        })}
      </div>

      {/* Modal Input Nama di Awal */}
      {showNameModal && <NameModal onSubmitName={handleNameSubmit} />}

      {/* Modal Leaderboard */}
      {showLeaderboardModal && (
        <LeaderboardModal
          leaderboard={leaderboard}
          onClose={() => setShowLeaderboardModal(false)}
        />
      )}

      {/* Modal Katalog Kartu */}
      {showCatalogModal && (
        <CatalogModal onClose={() => setShowCatalogModal(false)} />
      )}

      {/* Modal Loot saat Stage Cleared */}
      {showLootModal && (
        <LootModal
          stage={stage}
          choices={lootChoices}
          isPityActive={isPityActive}
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
