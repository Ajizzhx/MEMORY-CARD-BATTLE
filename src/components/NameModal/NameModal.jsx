import React, { useState } from 'react';
import { soundManager } from '../../utils/soundSystem';
import { t, getLanguage, setLanguage, LANGUAGES } from '../../utils/i18n';
import './NameModal.css';

const NameModal = ({ onSubmitName, onOpenGuide, onOpenCatalog, onOpenLeaderboard, onLanguageChange }) => {
  const [nameInput, setNameInput] = useState(() => localStorage.getItem('memory_player_name') || '');
  const [selectedAiMode, setSelectedAiMode] = useState('AUTO');
  const [currentLang, setCurrentLang] = useState(getLanguage());

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

  const handleToggleLanguage = () => {
    soundManager.playClickSFX();
    const nextLang = currentLang === LANGUAGES.ID ? LANGUAGES.EN : LANGUAGES.ID;
    setLanguage(nextLang);
    setCurrentLang(nextLang);
    if (onLanguageChange) onLanguageChange(nextLang);
  };

  return (
    <div className="modal-overlay">
      <div className="name-modal-content glass-panel" style={{ position: 'relative' }}>
        {/* Language Switcher Button Top Left */}
        <button
          type="button"
          className="dash-lang-toggle-btn"
          onClick={handleToggleLanguage}
          title="Ganti Bahasa / Switch Language"
        >
          {currentLang === LANGUAGES.ID ? '🌐 ID 🇮🇩' : '🌐 EN 🇬🇧'}
        </button>

        <h2 className="name-modal-title">{t('app_title')}</h2>
        <p className="app-subtitle">{t('app_subtitle')}</p>

        {/* Feature Badges Summary */}
        <div className="dash-features-bar">
          <span className="feature-pill">{t('feat_battle')}</span>
          <span className="feature-pill">{t('feat_cards')}</span>
          <span className="feature-pill">{t('feat_pity')}</span>
        </div>

        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <input
            type="text"
            className="name-input-field"
            placeholder={t('input_placeholder')}
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            maxLength={15}
            autoFocus
            required
          />

          {/* AI Difficulty Selector */}
          <div className="ai-selector-container">
            <label className="ai-selector-label">{t('ai_mode_label')}</label>
            <div className="ai-selector-grid">
              <button
                type="button"
                data-mode="AUTO"
                className={`ai-opt-btn ${selectedAiMode === 'AUTO' ? 'active' : ''}`}
                onClick={() => handleSelectAi('AUTO')}
              >
                {t('ai_auto')}
              </button>
              <button
                type="button"
                data-mode="EASY"
                className={`ai-opt-btn ${selectedAiMode === 'EASY' ? 'active' : ''}`}
                onClick={() => handleSelectAi('EASY')}
              >
                {t('ai_easy')}
              </button>
              <button
                type="button"
                data-mode="MEDIUM"
                className={`ai-opt-btn ${selectedAiMode === 'MEDIUM' ? 'active' : ''}`}
                onClick={() => handleSelectAi('MEDIUM')}
              >
                {t('ai_medium')}
              </button>
              <button
                type="button"
                data-mode="HARD"
                className={`ai-opt-btn ${selectedAiMode === 'HARD' ? 'active' : ''}`}
                onClick={() => handleSelectAi('HARD')}
              >
                {t('ai_hard')}
              </button>
            </div>
          </div>

          {/* Dynamic AI Mode Explanation Text */}
          <div className="ai-mode-desc-banner">
            {selectedAiMode === 'AUTO' && t('ai_desc_auto')}
            {selectedAiMode === 'EASY' && t('ai_desc_easy')}
            {selectedAiMode === 'MEDIUM' && t('ai_desc_medium')}
            {selectedAiMode === 'HARD' && t('ai_desc_hard')}
          </div>

          {/* Navigasi Terpisah: Buku Panduan Game vs Katalog Kartu vs Leaderboard */}
          <div className="game-guide-actions">
            {onOpenGuide && (
              <button
                type="button"
                className="guide-toggle-btn"
                onClick={onOpenGuide}
              >
                {t('nav_guide')}
              </button>
            )}

            {onOpenCatalog && (
              <button
                type="button"
                className="guide-catalog-btn"
                onClick={onOpenCatalog}
              >
                {t('nav_catalog')}
              </button>
            )}

            {onOpenLeaderboard && (
              <button
                type="button"
                className="guide-leaderboard-btn"
                onClick={onOpenLeaderboard}
              >
                {t('nav_scores')}
              </button>
            )}
          </div>

          {/* Dashboard Info Box */}
          <div className="dash-info-box">
            <span>{t('dash_tip')}</span>
          </div>

          <button type="submit" className="start-journey-btn">
            {t('start_battle_btn')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NameModal;
