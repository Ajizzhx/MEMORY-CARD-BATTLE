import React, { useState } from 'react';
import './NameModal.css';

const NameModal = ({ onSubmitName }) => {
  const [nameInput, setNameInput] = useState('');
  const [selectedAiMode, setSelectedAiMode] = useState('AUTO');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nameInput.trim().length > 0) {
      onSubmitName(nameInput.trim(), selectedAiMode);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="name-modal-content glass-panel">
        <h2 className="app-title">MEMORY CARD BATTLE</h2>
        <p className="app-subtitle">Masukkan Nama & Pilih Mode Kesulitan AI Musuh:</p>

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
                onClick={() => setSelectedAiMode('AUTO')}
              >
                🔄 Otomatis (Stage)
              </button>
              <button
                type="button"
                className={`ai-opt-btn easy ${selectedAiMode === 'EASY' ? 'active' : ''}`}
                onClick={() => setSelectedAiMode('EASY')}
              >
                🟢 Mudah (35%)
              </button>
              <button
                type="button"
                className={`ai-opt-btn medium ${selectedAiMode === 'MEDIUM' ? 'active' : ''}`}
                onClick={() => setSelectedAiMode('MEDIUM')}
              >
                🟡 Sedang (65%)
              </button>
              <button
                type="button"
                className={`ai-opt-btn hard ${selectedAiMode === 'HARD' ? 'active' : ''}`}
                onClick={() => setSelectedAiMode('HARD')}
              >
                🔴 Tinggi (88%)
              </button>
            </div>
          </div>

          <button type="submit" className="start-journey-btn" style={{ marginTop: '16px' }}>
            ⚔️ Mulai Pertarungan
          </button>
        </form>
      </div>
    </div>
  );
};

export default NameModal;
