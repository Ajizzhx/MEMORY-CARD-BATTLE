import React, { useState } from 'react';
import { soundManager } from '../../utils/soundSystem';
import './NameModal.css';

const NameModal = ({ onSubmitName, onOpenGuide, onOpenCatalog }) => {
  const [nameInput, setNameInput] = useState(() => localStorage.getItem('memory_player_name') || '');
  const [selectedAiMode, setSelectedAiMode] = useState('AUTO');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nameInput.trim().length > 0) {
      soundManager.playClickSFX();
      onSubmitName(nameInput.trim(), selectedAiMode);
    }
  };

  const handleSelectAi = (mode) => {
    soundManager.playClickSFX();
    setSelectedAiMode(mode);
  };

  return (
    <div className="modal-overlay">
      <div className="name-modal-content glass-panel">
        <h2 className="name-modal-title">MEMORY CARD BATTLE</h2>
        <p className="app-subtitle">Cyberfantasy RPG &amp; Memory Matching Game</p>

        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <input
            type="text"
            className="name-input-field"
            placeholder="Ketik Nama Pemain..."
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            maxLength={15}
            autoFocus
            required
          />

          {/* AI Difficulty Selector */}
          <div className="ai-selector-container">
            <label className="ai-selector-label">🧠 Mode Kesulitan AI Musuh:</label>
            <div className="ai-selector-grid">
              <button
                type="button"
                data-mode="AUTO"
                className={`ai-opt-btn ${selectedAiMode === 'AUTO' ? 'active' : ''}`}
                onClick={() => handleSelectAi('AUTO')}
              >
                🔄 Otomatis (Stage)
              </button>
              <button
                type="button"
                data-mode="EASY"
                className={`ai-opt-btn ${selectedAiMode === 'EASY' ? 'active' : ''}`}
                onClick={() => handleSelectAi('EASY')}
              >
                🟢 Mudah (35%)
              </button>
              <button
                type="button"
                data-mode="MEDIUM"
                className={`ai-opt-btn ${selectedAiMode === 'MEDIUM' ? 'active' : ''}`}
                onClick={() => handleSelectAi('MEDIUM')}
              >
                🟡 Sedang (65%)
              </button>
              <button
                type="button"
                data-mode="HARD"
                className={`ai-opt-btn ${selectedAiMode === 'HARD' ? 'active' : ''}`}
                onClick={() => handleSelectAi('HARD')}
              >
                🔴 Tinggi (88%)
              </button>
            </div>
          </div>

          {/* Navigasi Terpisah: Buku Panduan Game vs Katalog Kartu */}
          <div className="game-guide-actions">
            {onOpenGuide && (
              <button
                type="button"
                className="guide-toggle-btn"
                onClick={onOpenGuide}
              >
                📖 Buku Panduan
              </button>
            )}

            {onOpenCatalog && (
              <button
                type="button"
                className="guide-catalog-btn"
                onClick={onOpenCatalog}
              >
                🂠 Katalog Kartu
              </button>
            )}
          </div>

          <button type="submit" className="start-journey-btn">
            ⚔️ Mulai Pertarungan
          </button>
        </form>
      </div>
    </div>
  );
};

export default NameModal;
