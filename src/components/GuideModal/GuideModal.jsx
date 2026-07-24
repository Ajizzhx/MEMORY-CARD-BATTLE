import React from 'react';
import { t } from '../../utils/i18n';
import './GuideModal.css';

const GuideModal = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="guide-modal-content glass-panel" style={{ position: 'relative' }}>
        <button className="modal-close-icon-btn" onClick={onClose} title="Tutup Buku Panduan">
          ✕
        </button>
        <h2 className="guide-modal-title">{t('guide_modal_title')}</h2>
        <p className="app-subtitle">{t('guide_modal_subtitle')}</p>

        <div className="guide-modal-body">
          {/* Section 1: Alur & Cara Bermain */}
          <div className="guide-section">
            <h3 className="guide-heading">{t('section_flow')}</h3>
            <div className="guide-steps-grid">
              <div className="guide-step-card">
                <div className="step-number">1</div>
                <div className="step-content">
                  <strong>{t('step1_title')}</strong>
                  <p>{t('step1_desc')}</p>
                </div>
              </div>

              <div className="guide-step-card">
                <div className="step-number">2</div>
                <div className="step-content">
                  <strong>{t('step2_title')}</strong>
                  <p>{t('step2_desc')}</p>
                </div>
              </div>

              <div className="guide-step-card">
                <div className="step-number">3</div>
                <div className="step-content">
                  <strong>{t('step3_title')}</strong>
                  <p>{t('step3_desc')}</p>
                </div>
              </div>

              <div className="guide-step-card">
                <div className="step-number">4</div>
                <div className="step-content">
                  <strong>{t('step4_title')}</strong>
                  <p>{t('step4_desc')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Aturan Papan & Arena */}
          <div className="guide-section">
            <h3 className="guide-heading">{t('section_rules')}</h3>
            <div className="guide-rules-list">
              <div className="rule-item">
                <strong>{t('rule1_title')}</strong>
                <p>{t('rule1_desc')}</p>
              </div>
              <div className="rule-item">
                <strong>{t('rule2_title')}</strong>
                <p>{t('rule2_desc')}</p>
              </div>
              <div className="rule-item">
                <strong>{t('rule3_title')}</strong>
                <p>{t('rule3_desc')}</p>
              </div>
            </div>
          </div>

          {/* Section 3: Fitur Pertolongan & Medkit Darurat */}
          <div className="guide-section pity-section">
            <h3 className="guide-heading">{t('section_pity')}</h3>
            <p className="pity-explanation">
              {t('pity_text1')}<strong>{t('pity_text2')}</strong>
              <br />
              {t('pity_text3')}<strong>{t('pity_medkit_label')}</strong>
              <br />
              <strong>{t('pity_limit')}</strong>
              <br />
              <em>{t('pity_strategy')}</em>
            </p>
          </div>

          {/* Section 4: Musuh AI per Stage */}
          <div className="guide-section">
            <h3 className="guide-heading">{t('section_enemies')}</h3>
            <div className="enemy-guide-grid">
              <div className="enemy-guide-card">
                <div className="enemy-avatar-wrapper">
                  <img src="/assets/avatars/avatar_scout.png" alt="Cyber Scout" className="enemy-guide-img" />
                </div>
                <div className="enemy-info">
                  <strong>Stage 1: Cyber Scout</strong>
                  <span className="enemy-hp">HP: 70 | Easy (Memory 35%)</span>
                  <p>Basic reconnaissance drone for player warmup.</p>
                </div>
              </div>
              <div className="enemy-guide-card">
                <div className="enemy-avatar-wrapper">
                  <img src="/assets/avatars/avatar_golem.png" alt="Cybergolem" className="enemy-guide-img" />
                </div>
                <div className="enemy-info">
                  <strong>Stage 2: Cybergolem</strong>
                  <span className="enemy-hp">HP: 90 | Medium (Memory 65%)</span>
                  <p>Sturdy Golem robot with thick HP &amp; Shield defense.</p>
                </div>
              </div>
              <div className="enemy-guide-card">
                <div className="enemy-avatar-wrapper">
                  <img src="/assets/avatars/avatar_spectre.png" alt="Neon Spectre" className="enemy-guide-img" />
                </div>
                <div className="enemy-info">
                  <strong>Stage 3: Neon Spectre</strong>
                  <span className="enemy-hp">HP: 110 | Medium (Memory 65%)</span>
                  <p>Agile cyber phantom with sharp card memory accuracy.</p>
                </div>
              </div>
              <div className="enemy-guide-card">
                <div className="enemy-avatar-wrapper">
                  <img src="/assets/avatars/avatar_warlord.png" alt="Aether Warlord" className="enemy-guide-img" />
                </div>
                <div className="enemy-info">
                  <strong>Stage 4: Aether Warlord</strong>
                  <span className="enemy-hp">HP: 140 | Hard (Memory 88%)</span>
                  <p>Cosmic commander with massive HP &amp; deadly firepower.</p>
                </div>
              </div>
              <div className="enemy-guide-card boss">
                <div className="enemy-avatar-wrapper boss">
                  <img src="/assets/avatars/avatar_dragon.png" alt="Abyss Omega" className="enemy-guide-img" />
                </div>
                <div className="enemy-info">
                  <strong>Stage 5+: Abyss Omega (Final Boss)</strong>
                  <span className="enemy-hp">HP: 150+ (Scales per Stage) | Final Boss</span>
                  <p>Legendary Cyber Dragon in an endless arena battle!</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button className="close-modal-btn" onClick={onClose}>
          {t('close_guide_btn')}
        </button>
      </div>
    </div>
  );
};

export default GuideModal;
