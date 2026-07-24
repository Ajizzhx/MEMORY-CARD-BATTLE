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
  onOpenLeaderboard,
  onBackToDashboard,
  currentLang = 'ID'
}) => {
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
            <span className="stat-label">{t('statFinalStage', currentLang)}</span>
            <span className="stat-value">Stage {stage}</span>
          </div>

          <div className="gameover-stat-card">
            <span className="stat-label">{t('statTotalMatches', currentLang)}</span>
            <span className="stat-value">✨ {totalMatches}</span>
          </div>

          <div className="gameover-stat-card">
            <span className="stat-label">{t('statAiMode', currentLang)}</span>
            <span className="stat-value">{difficultyName || 'Auto'}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="gameover-actions">
          {onOpenLeaderboard && (
            <button
              className="lb-btn-secondary"
              onClick={() => {
                soundManager.playClickSFX();
                onOpenLeaderboard();
              }}
            >
              {t('viewLeaderboardBtn', currentLang)}
            </button>
          )}

          <button
            className="play-again-btn"
            onClick={() => {
              soundManager.playClickSFX();
              onPlayAgain();
            }}
          >
            {t('playAgainBtn', currentLang)}
          </button>

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
      </div>
    </div>
  );
};

export default GameOverModal;
