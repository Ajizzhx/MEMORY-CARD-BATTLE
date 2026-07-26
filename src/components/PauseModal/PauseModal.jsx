import React from 'react';
import { t } from '../../utils/i18n';
import { soundManager } from '../../utils/soundSystem';
import './PauseModal.css';

const PauseModal = ({
  onResume,
  isBgmMuted,
  onToggleBgm,
  isSfxMuted,
  onToggleSfx,
  currentLang,
  onToggleLang,
  onOpenGuide,
  onOpenCatalog,
  onOpenLeaderboard,
  onResetClick
}) => {
  return (
    <div className="modal-overlay">
      <div className="pause-modal-content glass-panel">
        {/* Header */}
        <div className="pause-header">
          <span className="pause-header-icon">⏸️</span>
          <h2 className="pause-title">{t('pauseTitle', currentLang)}</h2>
        </div>

        {/* Audio Controls */}
        <div className="pause-section">
          <h3 className="pause-section-title">{t('audioSettings', currentLang)}</h3>
          <div className="audio-controls-grid">
            <button
              className={`pause-btn-control ${isBgmMuted ? 'muted' : 'active'}`}
              onClick={onToggleBgm}
            >
              {isBgmMuted ? '🔇 BGM: OFF' : '🔊 BGM: ON'}
            </button>
            <button
              className={`pause-btn-control ${isSfxMuted ? 'muted' : 'active'}`}
              onClick={onToggleSfx}
            >
              {isSfxMuted ? '🔕 SFX: OFF' : '🔔 SFX: ON'}
            </button>
          </div>
        </div>

        {/* Menu Buttons Grid */}
        <div className="pause-section">
          <h3 className="pause-section-title">{t('menuSettings', currentLang)}</h3>
          <div className="menu-controls-grid">
            <button className="pause-menu-btn" onClick={onToggleLang}>
              🌐 {currentLang === 'ID' ? 'Bahasa: ID' : 'Language: EN'}
            </button>
            <button className="pause-menu-btn" onClick={onOpenGuide}>
              📖 {t('guideBtn', currentLang)}
            </button>
            <button className="pause-menu-btn" onClick={onOpenCatalog}>
              🂠 {t('catalogBtn', currentLang)}
            </button>
            <button className="pause-menu-btn" onClick={onOpenLeaderboard}>
              🏆 {t('scoreBtn', currentLang)}
            </button>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="pause-actions">
          <button className="pause-resume-btn" onClick={onResume}>
            ▶ {t('resumeBtn', currentLang)}
          </button>
          <button className="pause-reset-btn" onClick={onResetClick}>
            ⚠️ {t('resetBtn', currentLang)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PauseModal;
