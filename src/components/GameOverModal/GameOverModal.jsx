import React from 'react';
import { soundManager } from '../../utils/soundSystem';
import { t } from '../../utils/i18n';
import './GameOverModal.css';

const GameOverModal = ({
  stage,
  totalMatches,
  difficultyName,
  isVictory = false,
  onPlayAgain,
  onRestartJourney,
  onOpenLeaderboard,
  onBackToDashboard,
  currentLang = 'ID'
}) => {
  // Mendukung kedua nama prop agar kompatibel
  const handlePlayAgain = onPlayAgain || onRestartJourney;
  return (
    <div className="modal-overlay">
      <div className={`gameover-modal-content glass-panel ${isVictory ? 'victory' : 'defeat'}`}>
        <h2 className="gameover-title">
          {isVictory ? t('victoryTitle', currentLang) : t('defeatTitle', currentLang)}
        </h2>

        <p className="app-subtitle">
          {isVictory ? t('victorySub', currentLang) : t('defeatSub', currentLang)}
        </p>

        {/* Ringkasan Statistik */}
        <div className="gameover-stats-grid">
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
