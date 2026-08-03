import React, { useState } from 'react';
import { soundManager } from '../../utils/soundSystem';
import { t } from '../../utils/i18n';
import './NameModal.css';

const NameModal = ({
  onSubmitName,
  onOpenGuide,
  onOpenCatalog,
  onOpenLeaderboard,
  currentLang = 'ID',
  onToggleLang
}) => {
  const [nameInput, setNameInput] = useState(() => localStorage.getItem('memory_player_name') || '');
  const [selectedAiMode, setSelectedAiMode] = useState('AUTO');
  const [selectedGameMode, setSelectedGameMode] = useState('RPG');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nameInput.trim().length > 0) {
      soundManager.playClickSFX();
      onSubmitName(nameInput.trim(), selectedAiMode, selectedGameMode);
    }
  };

  const handleSelectAi = (mode) => {
    soundManager.playClickSFX();
    setSelectedAiMode(mode);
  };

  const handleSelectGameMode = (mode) => {
    soundManager.playClickSFX();
    setSelectedGameMode(mode);
    if (mode === 'BOSS_CHALLENGE' && selectedAiMode === 'AUTO') {
      setSelectedAiMode('HARD');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="name-modal-content glass-panel">
        {/* Dedicated Language Selector Row */}
        {onToggleLang && (
          <div className="dash-lang-bar">
            <span className="lang-bar-label">🌐 Language / Bahasa:</span>
            <div className="lang-bar-toggle-group">
              <button
                type="button"
                className={`lang-pill-btn ${currentLang === 'ID' ? 'active' : ''}`}
                onClick={() => {
                  if (currentLang !== 'ID') {
                    soundManager.playClickSFX();
                    onToggleLang('ID');
                  }
                }}
              >
                🇮🇩 ID
              </button>
              <button
                type="button"
                className={`lang-pill-btn ${currentLang === 'EN' ? 'active' : ''}`}
                onClick={() => {
                  if (currentLang !== 'EN') {
                    soundManager.playClickSFX();
                    onToggleLang('EN');
                  }
                }}
              >
                🇬🇧 EN
              </button>
            </div>
          </div>
        )}

        <h2 className="name-modal-title">{t('dashTitle', currentLang)}</h2>
        <p className="app-subtitle">{t('dashSubtitle', currentLang)}</p>

        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <input
            type="text"
            className="name-input-field"
            placeholder={t('nameInputPlaceholder', currentLang)}
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            maxLength={15}
            autoFocus
            required
          />

          {/* Game Mode Selector */}
          <div className="game-mode-selector-container">
            <label className="ai-selector-label">{t('gameModeLabel', currentLang)}</label>
            <div className="game-mode-grid">
              <button
                type="button"
                className={`game-mode-btn ${selectedGameMode === 'RPG' ? 'active rpg' : ''}`}
                onClick={() => handleSelectGameMode('RPG')}
              >
                <span className="mode-btn-title">{t('modeRpgTitle', currentLang)}</span>
                <span className="mode-btn-desc">{t('modeRpgDesc', currentLang)}</span>
              </button>
              <button
                type="button"
                className={`game-mode-btn ${selectedGameMode === 'BOSS_CHALLENGE' ? 'active boss' : ''}`}
                onClick={() => handleSelectGameMode('BOSS_CHALLENGE')}
              >
                <span className="mode-btn-title">{t('modeBossTitle', currentLang)}</span>
                <span className="mode-btn-desc">{t('modeBossDesc', currentLang)}</span>
              </button>
            </div>
          </div>

          {/* AI Difficulty Selector */}
          <div className="ai-selector-container">
            <label className="ai-selector-label">{t('aiSelectorLabel', currentLang)}</label>
            <div className="ai-selector-grid">
              {selectedGameMode !== 'BOSS_CHALLENGE' && (
                <button
                  type="button"
                  data-mode="AUTO"
                  className={`ai-opt-btn ${selectedAiMode === 'AUTO' ? 'active' : ''}`}
                  onClick={() => handleSelectAi('AUTO')}
                >
                  {t('aiModeAuto', currentLang)}
                </button>
              )}
              <button
                type="button"
                data-mode="EASY"
                className={`ai-opt-btn ${selectedAiMode === 'EASY' ? 'active' : ''}`}
                onClick={() => handleSelectAi('EASY')}
              >
                {t('aiModeEasy', currentLang)}
              </button>
              <button
                type="button"
                data-mode="MEDIUM"
                className={`ai-opt-btn ${selectedAiMode === 'MEDIUM' ? 'active' : ''}`}
                onClick={() => handleSelectAi('MEDIUM')}
              >
                {t('aiModeMedium', currentLang)}
              </button>
              <button
                type="button"
                data-mode="HARD"
                className={`ai-opt-btn ${selectedAiMode === 'HARD' ? 'active' : ''}`}
                onClick={() => handleSelectAi('HARD')}
              >
                {t('aiModeHard', currentLang)}
              </button>
            </div>
          </div>

          {/* Dynamic AI Mode Explanation Text */}
          <div className="ai-mode-desc-banner">
            {selectedAiMode === 'AUTO' && t('aiDescAuto', currentLang)}
            {selectedAiMode === 'EASY' && t('aiDescEasy', currentLang)}
            {selectedAiMode === 'MEDIUM' && t('aiDescMedium', currentLang)}
            {selectedAiMode === 'HARD' && t('aiDescHard', currentLang)}
          </div>

          {/* Navigasi Terpisah */}
          <div className="game-guide-actions">
            {onOpenGuide && (
              <button type="button" className="guide-toggle-btn" onClick={onOpenGuide}>
                {t('dashGuideBtn', currentLang)}
              </button>
            )}
            {onOpenCatalog && (
              <button type="button" className="guide-catalog-btn" onClick={onOpenCatalog}>
                {t('dashCatalogBtn', currentLang)}
              </button>
            )}
            {onOpenLeaderboard && (
              <button type="button" className="guide-leaderboard-btn" onClick={onOpenLeaderboard}>
                {t('dashTopscoreBtn', currentLang)}
              </button>
            )}
          </div>

          {/* Dashboard Info Box */}
          <div className="dash-info-box">
            <span>{t('dashTipsBox', currentLang)}</span>
          </div>

          <button type="submit" className="start-journey-btn">
            {selectedGameMode === 'BOSS_CHALLENGE'
              ? t('modeBossTitle', currentLang)
              : t('startBattleBtn', currentLang)}
          </button>
        </form>

        {/* Natural Support Developer Footer */}
        <div className="dash-support-footer">
          <span className="support-label">{t('supportTitle', currentLang)}:</span>
          <div className="support-links-group">
            <a
              href="https://saweria.co/Ajizxh"
              target="_blank"
              rel="noopener noreferrer"
              className="support-link-btn saweria"
              onClick={() => soundManager.playClickSFX()}
            >
              {t('supportSaweria', currentLang)}
            </a>
            <a
              href="https://ko-fi.com/ajizxh"
              target="_blank"
              rel="noopener noreferrer"
              className="support-link-btn kofi"
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

export default NameModal;
