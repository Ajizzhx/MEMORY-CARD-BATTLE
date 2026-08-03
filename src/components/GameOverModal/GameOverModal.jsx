import React from 'react';
import { soundManager } from '../../utils/soundSystem';
import { t } from '../../utils/i18n';
import './GameOverModal.css';

const GameOverModal = ({
  stage,
  totalMatches,
  difficultyName,
  isVictory = false,
  gameMode = 'RPG',
  bossElapsedTime = 0,
  onPlayAgain,
  onRestartJourney,
  onOpenLeaderboard,
  onBackToDashboard,
  currentLang = 'ID'
}) => {
  // Mendukung kedua nama prop agar kompatibel
  const handlePlayAgain = onPlayAgain || onRestartJourney;

  // Format elapsed time for Boss Challenge
  const formatBossTime = (ms) => {
    const totalSec = Math.floor(ms / 1000);
    const min = Math.floor(totalSec / 60);
    const sec = totalSec % 60;
    return `${min}m ${sec}s`;
  };

  const isBossMode = gameMode === 'BOSS_CHALLENGE';

  return (
    <div className="modal-overlay">
      <div className={`gameover-modal-content glass-panel ${isVictory ? 'victory' : 'defeat'} ${isBossMode ? 'boss-mode' : ''}`}>
        <h2 className="gameover-title">
          {isBossMode && isVictory
            ? (currentLang === 'ID' ? '🐉 BOS DIKALAHKAN!' : '🐉 BOSS DEFEATED!')
            : isVictory ? t('victoryTitle', currentLang) : t('defeatTitle', currentLang)}
        </h2>

        <p className="app-subtitle">
          {isBossMode && isVictory
            ? (currentLang === 'ID' ? 'Abyss Omega telah dikalahkan! Rekor waktu Anda tercatat.' : 'Abyss Omega has been defeated! Your time record is saved.')
            : isVictory ? t('victorySub', currentLang) : t('defeatSub', currentLang)}
        </p>

        {/* Ringkasan Statistik */}
        <div className="gameover-stats-grid">
          {isBossMode ? (
            <>
              <div className="gameover-stat-card boss-time-card">
                <span className="stat-card-label">
                  {currentLang === 'ID' ? '⏱️ Waktu Penyelesaian' : '⏱️ Completion Time'}
                </span>
                <span className="stat-card-value primary">{formatBossTime(bossElapsedTime)}</span>
              </div>
              <div className="gameover-stat-card">
                <span className="stat-card-label">{t('statTotalMatches', currentLang)}</span>
                <span className="stat-card-value match">✨ {totalMatches}</span>
              </div>
              <div className="gameover-stat-card">
                <span className="stat-card-label">{t('statAiMode', currentLang)}</span>
                <span className="stat-card-value title">{difficultyName || 'Auto'}</span>
              </div>
            </>
          ) : (
            <>
              <div className="gameover-stat-card">
                <span className="stat-card-label">{t('statFinalStage', currentLang)}</span>
                <span className="stat-card-value primary">Stage {stage}</span>
              </div>
              <div className="gameover-stat-card">
                <span className="stat-card-label">{t('statTotalMatches', currentLang)}</span>
                <span className="stat-card-value match">✨ {totalMatches}</span>
              </div>
              <div className="gameover-stat-card">
                <span className="stat-card-label">{t('statAiMode', currentLang)}</span>
                <span className="stat-card-value title">{difficultyName || 'Auto'}</span>
              </div>
            </>
          )}
        </div>

        {/* Action Buttons */}
        <div className="gameover-actions">
          {onOpenLeaderboard && (
            <button
              className="view-leaderboard-btn"
              onClick={() => {
                soundManager.playClickSFX();
                onOpenLeaderboard();
              }}
            >
              {t('viewLeaderboardBtn', currentLang)}
            </button>
          )}

          {onBackToDashboard && (
            <button
              className="dash-return-btn"
              onClick={() => {
                soundManager.playClickSFX();
                onBackToDashboard();
              }}
            >
              {t('backDashBtn', currentLang)}
            </button>
          )}
        </div>

        {/* Subtle Support Developer Link */}
        <div className="gameover-support-row">
          <span className="support-subtle-text">{t('supportFooterMsg', currentLang)}</span>
          <div className="support-subtle-links">
            <a
              href="https://saweria.co/Ajizxh"
              target="_blank"
              rel="noopener noreferrer"
              className="subtle-link saweria"
              onClick={() => soundManager.playClickSFX()}
            >
              {t('supportSaweria', currentLang)}
            </a>
            <span className="link-divider">•</span>
            <a
              href="https://ko-fi.com/ajizxh"
              target="_blank"
              rel="noopener noreferrer"
              className="subtle-link kofi"
              onClick={() => soundManager.playClickSFX()}
            >
              {t('supportKofi', currentLang)}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameOverModal;
