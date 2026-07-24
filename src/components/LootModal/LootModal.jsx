import React from 'react';
import { soundManager } from '../../utils/soundSystem';
import { t } from '../../utils/i18n';
import './LootModal.css';

const LootModal = ({ stage, choices = [], isPityActive = false, pityUsesLeft = 2, onSelectLoot, currentLang = 'ID' }) => {
  const handleChoiceClick = (card) => {
    soundManager.playClickSFX();
    onSelectLoot(card);
  };

  return (
    <div className="modal-overlay">
      <div className="loot-modal-content glass-panel">
        <h2 className="loot-modal-title">{t('lootTitle', currentLang)}</h2>
        <p className="app-subtitle">
          {t('lootSub', currentLang)}
        </p>

        {/* Notifikasi Pity System */}
        {isPityActive && (
          <div className="pity-active-banner">
            <span>
              {t('emergencyPityNotice', currentLang)}<strong>{pityUsesLeft}</strong>{t('emergencyPityNoticeEnd', currentLang)}
            </span>
          </div>
        )}

        <div className="loot-cards-grid">
          {choices.map((card, idx) => (
            <div
              key={card.id || idx}
              className={`loot-card-item ${card.isEmergencyPity ? 'emergency-pity-card' : ''}`}
              style={{
                borderColor: card.color || 'rgba(0, 240, 255, 0.4)',
                boxShadow: card.isEmergencyPity
                  ? '0 0 25px rgba(255, 0, 85, 0.6)'
                  : `0 0 16px ${card.color || '#00f0ff'}40`
              }}
              onClick={() => handleChoiceClick(card)}
            >
              <div className="loot-rarity-tag" style={{ color: card.color }}>
                {card.isEmergencyPity ? t('emergencyPityTag', currentLang) : card.rarity}
              </div>

              <div className="loot-card-icon" style={{ color: card.color }}>
                {card.img ? (
                  <img src={card.img} alt={card.name} className="card-art-img" style={{ borderColor: card.color }} />
                ) : (
                  card.icon
                )}
              </div>

              <div className="loot-card-name" style={{ color: card.color }}>
                {card.name}
              </div>

              <div className="loot-card-desc">{card.description}</div>

              <button className="claim-card-btn" style={{ backgroundColor: card.color, color: '#000' }}>
                {card.isEmergencyPity ? '🚑 Ambil Medkit' : t('claimCardBtn', currentLang)}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LootModal;
