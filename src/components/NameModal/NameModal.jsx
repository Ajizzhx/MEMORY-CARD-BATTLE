import React, { useState, useEffect } from 'react';
import { fetchTopScores } from '../../utils/leaderboardService';
import { soundManager } from '../../utils/soundSystem';
import './NameModal.css';

const NameModal = ({ onSubmitName, onOpenGuide, onOpenCatalog }) => {
  const [nameInput, setNameInput] = useState(() => localStorage.getItem('memory_player_name') || '');
  const [selectedAiMode, setSelectedAiMode] = useState('AUTO');
  const [topScores, setTopScores] = useState([]);
  const [loadingScores, setLoadingScores] = useState(true);

  useEffect(() => {
    let isMounted = true;
    fetchTopScores(3)
      .then((data) => {
        if (isMounted && data && Array.isArray(data)) {
          setTopScores(data);
        }
      })
      .catch(() => {})
      .finally(() => {
        if (isMounted) setLoadingScores(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

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

        {/* Feature Badges Summary */}
        <div className="dash-features-bar">
          <span className="feature-pill">⚔️ 1v1 Battle RPG</span>
          <span className="feature-pill">🃏 15 Kartu Cyber</span>
          <span className="feature-pill">🛡️ Pity System</span>
        </div>

        {/* Top 3 Global High Scores Widget */}
        <div className="dash-leaderboard-section">
          <div className="dash-lb-header">
            🏆 <span>TOP 3 SKOR GLOBAL WORLD</span>
          </div>
          {loadingScores ? (
            <div className="dash-lb-loading">Memuat Skor Global...</div>
          ) : topScores.length > 0 ? (
            <div className="dash-lb-grid">
              {topScores.map((score, idx) => {
                const medalEmoji = idx === 0 ? '🥇' : idx === 1 ? '🥈' : '🥉';
                const rankClass = idx === 0 ? 'rank-1' : idx === 1 ? 'rank-2' : 'rank-3';
                return (
                  <div key={score.id || idx} className={`dash-lb-card ${rankClass}`}>
                    <div className="dash-lb-rank">
                      {medalEmoji} #{idx + 1}
                    </div>
                    <div className="dash-lb-player-name">{score.name}</div>
                    <div className="dash-lb-details">
                      <span>Stage <strong>{score.stage}</strong></span> • <span><strong>{score.total_matches}</strong> Match</span>
                    </div>
                    <div className="dash-lb-diff">{score.difficulty}</div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="dash-lb-empty">Belum ada skor global recorded. Jadilah yang pertama!</div>
          )}
        </div>

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

          {/* Dynamic AI Mode Explanation Text */}
          <div className="ai-mode-desc-banner">
            {selectedAiMode === 'AUTO' && 'ℹ️ Otomatis: Kesulitan AI naik bertahap dari Stage 1 (35%) hingga Stage 5+ (88%).'}
            {selectedAiMode === 'EASY' && 'ℹ️ Mudah: AI Musuh mengingat 35% posisi kartu. Cocok untuk pemain baru!'}
            {selectedAiMode === 'MEDIUM' && 'ℹ️ Sedang: AI Musuh mengingat 65% posisi kartu. Pertarungan seimbang!'}
            {selectedAiMode === 'HARD' && 'ℹ️ Tinggi: AI Musuh mengingat 88% posisi kartu. Tantangan memori tingkat dewa!'}
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

          {/* Dashboard Info Box */}
          <div className="dash-info-box">
            <span>💡 <strong>Tips Arena:</strong> Kumpulkan 15 kartu unik melalui Loot Stage Clear dan aktifkan Bio-Shield Medkit saat HP Kritis!</span>
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
