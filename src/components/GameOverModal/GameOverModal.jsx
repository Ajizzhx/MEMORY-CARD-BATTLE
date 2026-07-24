import React from 'react';
import './GameOverModal.css';

const GameOverModal = ({ stage, totalMatches, enemyName = 'Musuh Arena', playerName = 'Pemain', onRestartJourney, onOpenLeaderboard }) => {
  return (
    <div className="modal-overlay">
      <div className="gameover-modal-content glass-panel">
        <div className="gameover-header-icon">💀</div>
        <h2 className="gameover-title">PERJALANAN TERHENTI</h2>
        <p className="gameover-subtitle">
          Penjelajah <strong className="highlight-player">{playerName}</strong> telah gugur dalam pertarungan di dunia Cyberfantasy...
        </p>

        <div className="gameover-stats-grid">
          <div className="gameover-stat-card">
            <span className="stat-card-label">Stage Terakhir</span>
            <strong className="stat-card-value primary">Stage {stage}</strong>
          </div>
          <div className="gameover-stat-card">
            <span className="stat-card-label">Musuh Terakhir</span>
            <strong className="stat-card-value enemy">{enemyName}</strong>
          </div>
          <div className="gameover-stat-card">
            <span className="stat-card-label">Total Match Pasangan</span>
            <strong className="stat-card-value match">✨ {totalMatches} Pasangan</strong>
          </div>
          <div className="gameover-stat-card">
            <span className="stat-card-label">Gelar Perjuangan</span>
            <strong className="stat-card-value title">⚔️ Pendekar Memory</strong>
          </div>
        </div>

        <div className="gameover-actions">
          <button className="restart-journey-btn" onClick={onRestartJourney}>
            🔄 Mulai Perjalanan Baru (Stage 1)
          </button>
          {onOpenLeaderboard && (
            <button className="view-leaderboard-btn" onClick={onOpenLeaderboard}>
              🏆 Lihat Leaderboard Skor
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameOverModal;
