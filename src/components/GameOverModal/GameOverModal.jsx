import React from 'react';
import { t } from '../../utils/i18n';
import './GameOverModal.css';

const GameOverModal = ({ stage, totalMatches, isVictory = false, onRestart, onViewLeaderboard }) => {
  return (
    <div className="modal-overlay">
      <div className={`gameover-modal-content glass-panel ${isVictory ? 'victory' : 'defeat'}`}>
        <h2 className="gameover-title">
          {isVictory ? t('victory_title') : t('defeat_title')}
        </h2>
        <p className="gameover-subtitle">
          {isVictory
            ? 'Selamat! Anda berhasil menaklukkan seluruh musuh cyber arena!'
            : 'HP Pemain telah habis di arena pertarungan.'}
        </p>

        <div className="gameover-stats-container">
          <div className="stat-card">
            <span className="stat-label">{t('final_stage')}</span>
            <span className="stat-value stage-val">Stage {stage}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">{t('total_matches_stat')}</span>
            <span className="stat-value match-val">✨ {totalMatches}</span>
          </div>
        </div>

        <div className="gameover-actions">
          {onViewLeaderboard && (
            <button className="gameover-btn leaderboard-btn" onClick={onViewLeaderboard}>
              {t('view_leaderboard_btn')}
            </button>
          )}
          <button className="gameover-btn restart-btn" onClick={onRestart}>
            {t('restart_btn')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOverModal;
