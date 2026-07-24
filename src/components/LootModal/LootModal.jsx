import React from 'react';
import { soundManager } from '../../utils/soundSystem';
import { t, getTranslatedCard } from '../../utils/i18n';
import './LootModal.css';

const LootModal = ({ stage, choices = [], isPityActive = false, pityUsesLeft = 2, onSelectLoot }) => {
  const handleSelect = (card) => {
    soundManager.playClickSFX();
    onSelectLoot(card);
  };

  return (
    <div className="modal-overlay">
      <div className="loot-modal-content glass-panel">
        <h2 className="loot-modal-title">{t('loot_title', { stage })}</h2>
        <p className="loot-modal-subtitle">{t('loot_subtitle')}</p>

        {isPityActive && (
          <div className="pity-active-badge">
            <span>{t('pity_badge')} ({pityUsesLeft} Uses Left)</span>
          </div>
        )}

        <div className="loot-cards-grid">
          {choices.map((rawCard, idx) => {
            const card = rawCard.isEmergencyPity ? rawCard : getTranslatedCard(rawCard);
            const isEmergency = card.isEmergencyPity;

            return (
              <div
                key={card.id || idx}
                className={`loot-card-item ${isEmergency ? 'emergency-pity' : `rarity-${card.rarity}`}`}
                style={{
                  borderColor: card.color || 'rgba(0, 240, 255, 0.5)',
                  boxShadow: `0 0 15px ${card.color || '#00f0ff'}40`
                }}
                onClick={() => handleSelect(rawCard)}
              >
                <span className="loot-rarity-tag" style={{ color: card.color }}>
                  {isEmergency ? 'EMERGENCY' : card.rarity}
                </span>

                <div className="loot-card-icon" style={{ color: card.color }}>
                  {card.img ? (
                    <img src={card.img} alt={card.name} className="loot-card-img" />
                  ) : (
                    card.icon
                  )}
                </div>

                <div className="loot-card-name" style={{ color: card.color }}>{card.name}</div>
                <div className="loot-card-desc">{card.description}</div>

                <button className="claim-loot-btn" style={{ background: card.color }}>
                  {isEmergency ? '🚑 Claim Medkit' : '✨ Select Card'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LootModal;
