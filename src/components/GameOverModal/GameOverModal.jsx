import React from 'react';
import './GameOverModal.css';

const GameOverModal = ({ stage, totalMatches, onRestartJourney }) => {
  return (
    <div className="modal-overlay">
      <div className="gameover-modal-content glass-panel">
        <h2 className="gameover-title">💀 GAME OVER</h2>
        <p className="app-subtitle">Perjalanan Anda Terhenti di Dunia Cyberfantasy</p>

        <div className="gameover-stats">
          <div className="stat-row">
            <span>Stage Terakhir:</span>
            <span className="stat-value">Stage {stage}</span>
          </div>
          <div className="stat-row">
            <span>Total Pasangan Terbuka:</span>
            <span className="stat-value">{totalMatches} Pasangan</span>
          </div>
        </div>

        <button className="restart-journey-btn" onClick={onRestartJourney}>
          🔄 Mulai Perjalanan Baru (Stage 1)
        </button>
      </div>
    </div>
  );
};

export default GameOverModal;
