import React, { useState } from 'react';
import { soundManager } from '../../utils/soundSystem';
import './NameModal.css';

const NameModal = ({ onSubmitName, onOpenCatalog }) => {
  const [nameInput, setNameInput] = useState(() => localStorage.getItem('memory_player_name') || '');
  const [selectedAiMode, setSelectedAiMode] = useState('AUTO');
  const [showHowToPlay, setShowHowToPlay] = useState(false);

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
        <h2 className="app-title">MEMORY CARD BATTLE</h2>
        <p className="app-subtitle">Cyberfantasy RPG & Memory Matching Game</p>

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
                className={`ai-opt-btn ${selectedAiMode === 'AUTO' ? 'active' : ''}`}
                onClick={() => handleSelectAi('AUTO')}
              >
                🔄 Otomatis (Stage)
              </button>
              <button
                type="button"
                className={`ai-opt-btn easy ${selectedAiMode === 'EASY' ? 'active' : ''}`}
                onClick={() => handleSelectAi('EASY')}
              >
                🟢 Mudah (35%)
              </button>
              <button
                type="button"
                className={`ai-opt-btn medium ${selectedAiMode === 'MEDIUM' ? 'active' : ''}`}
                onClick={() => handleSelectAi('MEDIUM')}
              >
                🟡 Sedang (65%)
              </button>
              <button
                type="button"
                className={`ai-opt-btn hard ${selectedAiMode === 'HARD' ? 'active' : ''}`}
                onClick={() => handleSelectAi('HARD')}
              >
                🔴 Tinggi (88%)
              </button>
            </div>
          </div>

          {/* Panduan Alur Permainan & Katalog Bar */}
          <div className="game-guide-actions">
            <button
              type="button"
              className="guide-toggle-btn"
              onClick={() => {
                soundManager.playClickSFX();
                setShowHowToPlay(!showHowToPlay);
              }}
            >
              ℹ️ {showHowToPlay ? 'Tutup Panduan Alur' : 'Panduan Alur Permainan'}
            </button>

            {onOpenCatalog && (
              <button
                type="button"
                className="guide-catalog-btn"
                onClick={onOpenCatalog}
              >
                📖 Katalog Kartu
              </button>
            )}
          </div>

          {/* Panduan Alur Collapsible Panel */}
          {showHowToPlay && (
            <div className="game-flow-panel">
              <h4>⚔️ Alur & Cara Bermain:</h4>
              <ul>
                <li><strong>🂠 Pencocokan Kartu:</strong> Pilih 2 kartu di papan. Jika pasangan cocok, efek kartu (Attack, Defense, Heal, Buff, Debuff) langsung aktif!</li>
                <li><strong>🔄 Giliran Ekstra:</strong> Jika berhasil match, Anda mendapat giliran tambahan. Jika mismatch, giliran berpindah ke Musuh.</li>
                <li><strong>⏳ Batas Waktu 15s:</strong> Setiap giliran pemain dibatasi 15 detik.</li>
                <li><strong>🏆 Roguelike Stage:</strong> Kalahkan musuh untuk lanjut ke Stage berikutnya dan memilih kartu loot baru!</li>
              </ul>
            </div>
          )}

          <button type="submit" className="start-journey-btn" style={{ marginTop: '16px' }}>
            ⚔️ Mulai Pertarungan
          </button>
        </form>
      </div>
    </div>
  );
};

export default NameModal;
