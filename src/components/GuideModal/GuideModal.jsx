import React from 'react';
import { t } from '../../utils/i18n';
import './GuideModal.css';

const GuideModal = ({ onClose, currentLang = 'ID' }) => {
  return (
    <div className="modal-overlay">
      <div className="guide-modal-content glass-panel" style={{ position: 'relative' }}>
        <button className="modal-close-icon-btn" onClick={onClose} title={t('closeGuideBtn', currentLang)}>
          ✕
        </button>
        <h2 className="guide-modal-title">{t('guideTitle', currentLang)}</h2>
        <p className="app-subtitle">{t('guideSub', currentLang)}</p>

        <div className="guide-modal-body">
          {/* Section 1: Alur & Cara Bermain */}
          <div className="guide-section">
            <h3 className="guide-heading">{t('guideSec1Title', currentLang)}</h3>
            <div className="guide-steps-grid">
              <div className="guide-step-card">
                <div className="step-number">1</div>
                <div className="step-content">
                  <strong>{t('guideStep1Title', currentLang)}</strong>
                  <p>{t('guideStep1Desc', currentLang)}</p>
                </div>
              </div>

              <div className="guide-step-card">
                <div className="step-number">2</div>
                <div className="step-content">
                  <strong>{t('guideStep2Title', currentLang)}</strong>
                  <p>{t('guideStep2Desc', currentLang)}</p>
                </div>
              </div>

              <div className="guide-step-card">
                <div className="step-number">3</div>
                <div className="step-content">
                  <strong>{t('guideStep3Title', currentLang)}</strong>
                  <p>{t('guideStep3Desc', currentLang)}</p>
                </div>
              </div>

              <div className="guide-step-card">
                <div className="step-number">4</div>
                <div className="step-content">
                  <strong>{t('guideStep4Title', currentLang)}</strong>
                  <p>{t('guideStep4Desc', currentLang)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Aturan Papan & Arena */}
          <div className="guide-section">
            <h3 className="guide-heading">{t('guideSec2Title', currentLang)}</h3>
            <div className="guide-rules-list">
              <div className="rule-item">
                <strong>{t('guideRule1Title', currentLang)}</strong>
                <p>{t('guideRule1Desc', currentLang)}</p>
              </div>
              <div className="rule-item">
                <strong>{t('guideRule2Title', currentLang)}</strong>
                <p>{t('guideRule2Desc', currentLang)}</p>
              </div>
              <div className="rule-item">
                <strong>{t('guideRule3Title', currentLang)}</strong>
                <p>{t('guideRule3Desc', currentLang)}</p>
              </div>
            </div>
          </div>

          {/* Section 3: Fitur Pertolongan & Medkit Darurat */}
          <div className="guide-section pity-section">
            <h3 className="guide-heading">{t('guideSec3Title', currentLang)}</h3>
            <p className="pity-explanation">
              {t('guidePityDesc1', currentLang)}
              <strong>{t('guidePityDesc1Bold', currentLang)}</strong>
              <br />
              {t('guidePityDesc2', currentLang)}
              <strong>{t('guidePityDesc2Bold', currentLang)}</strong>
              <br />
              <strong>{t('guidePityQuotaBold', currentLang)}</strong>
              {t('guidePityQuotaDesc', currentLang)}
              <br />
              <em>{t('guidePityTip', currentLang)}</em>
            </p>
          </div>

          {/* Section 4: Musuh AI Berdasarkan Stage */}
          <div className="guide-section">
            <h3 className="guide-heading">{t('guideSec4Title', currentLang)}</h3>
            <div className="enemy-guide-grid">
              <div className="enemy-guide-card">
                <div className="enemy-avatar-wrapper">
                  <img src="/assets/avatars/avatar_scout.png" alt="Cyber Scout" className="enemy-guide-img" />
                </div>
                <div className="enemy-info">
                  <strong>Stage 1: Cyber Scout</strong>
                  <span className="enemy-hp">HP: 70 | {currentLang === 'ID' ? 'Kesulitan: Mudah (Memori 35%)' : 'Difficulty: Easy (Memory 35%)'}</span>
                  <p>{t('enemy1Desc', currentLang)}</p>
                </div>
              </div>
              <div className="enemy-guide-card">
                <div className="enemy-avatar-wrapper">
                  <img src="/assets/avatars/avatar_golem.png" alt="Cybergolem" className="enemy-guide-img" />
                </div>
                <div className="enemy-info">
                  <strong>Stage 2: Cybergolem</strong>
                  <span className="enemy-hp">HP: 90 | {currentLang === 'ID' ? 'Kesulitan: Sedang (Memori 65%)' : 'Difficulty: Medium (Memory 65%)'}</span>
                  <p>{t('enemy2Desc', currentLang)}</p>
                </div>
              </div>
              <div className="enemy-guide-card">
                <div className="enemy-avatar-wrapper">
                  <img src="/assets/avatars/avatar_spectre.png" alt="Neon Spectre" className="enemy-guide-img" />
                </div>
                <div className="enemy-info">
                  <strong>Stage 3: Neon Spectre</strong>
                  <span className="enemy-hp">HP: 110 | {currentLang === 'ID' ? 'Kesulitan: Sedang (Memori 65%)' : 'Difficulty: Medium (Memory 65%)'}</span>
                  <p>{t('enemy3Desc', currentLang)}</p>
                </div>
              </div>
              <div className="enemy-guide-card">
                <div className="enemy-avatar-wrapper">
                  <img src="/assets/avatars/avatar_warlord.png" alt="Aether Warlord" className="enemy-guide-img" />
                </div>
                <div className="enemy-info">
                  <strong>Stage 4: Aether Warlord</strong>
                  <span className="enemy-hp">HP: 140 | {currentLang === 'ID' ? 'Kesulitan: Tinggi (Memori 88%)' : 'Difficulty: Hard (Memory 88%)'}</span>
                  <p>{t('enemy4Desc', currentLang)}</p>
                </div>
              </div>
              <div className="enemy-guide-card boss">
                <div className="enemy-avatar-wrapper boss">
                  <img src="/assets/avatars/avatar_dragon.png" alt="Abyss Omega" className="enemy-guide-img" />
                </div>
                <div className="enemy-info">
                  <strong>Stage 5+: Abyss Omega ({currentLang === 'ID' ? 'Bos Akhir' : 'Final Boss'})</strong>
                  <span className="enemy-hp">HP: 150+ ({currentLang === 'ID' ? 'Meningkat per Stage' : 'Scales per Stage'}) | {currentLang === 'ID' ? 'Kesulitan: Bos Akhir' : 'Difficulty: Boss'}</span>
                  <p>{t('enemy5Desc', currentLang)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button className="close-modal-btn" onClick={onClose}>
          {t('closeGuideBtn', currentLang)}
        </button>
      </div>
    </div>
  );
};

export default GuideModal;
