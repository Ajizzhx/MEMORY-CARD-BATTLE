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

        {/* Header Animasi */}
        <div className="loot-header">
          <div className="loot-title-icon">🎉</div>
          <h2 className="loot-modal-title">{t('lootTitle', currentLang)}</h2>
          <p className="loot-modal-sub">{t('lootSub', currentLang)}</p>
        </div>

        {/* Notifikasi Pity System */}
        {isPityActive && (
          <div className="pity-active-banner">
            <span className="pity-banner-icon">🚑</span>
            <span>
              {t('emergencyPityNotice', currentLang)}
              <strong>{pityUsesLeft}</strong>
              {t('emergencyPityNoticeEnd', currentLang)}
            </span>
          </div>
        )}

        {/* Kartu Pilihan */}
        <div className="loot-cards-grid">
          {choices.map((card, idx) => (
            <div
              key={card.id || idx}
              className={`loot-card-item ${card.isEmergencyPity ? 'emergency-pity-card' : ''}`}
              style={{
                '--card-color': card.color || '#00f0ff',
                borderColor: card.isEmergencyPity ? '#ff0055' : (card.color || 'rgba(0, 240, 255, 0.4)'),
                boxShadow: card.isEmergencyPity
                  ? '0 0 25px rgba(255, 0, 85, 0.5)'
                  : `0 0 18px ${card.color || '#00f0ff'}55`
              }}
              onClick={() => handleChoiceClick(card)}
            >
              {/* Rarity Badge */}
              <div
                className="loot-rarity-badge"
                style={{
                  background: card.isEmergencyPity
                    ? 'rgba(255, 0, 85, 0.25)'
                    : `${card.color || '#00f0ff'}22`,
                  color: card.isEmergencyPity ? '#ff3377' : (card.color || '#00f0ff'),
                  borderColor: card.isEmergencyPity ? '#ff0055' : (card.color || '#00f0ff')
                }}
              >
                {card.isEmergencyPity ? '🚑 MEDKIT' : card.rarity}
              </div>

              {/* Card Art / Icon */}
              <div className="loot-card-art">
                {card.img ? (
                  <img
                    src={card.img}
                    alt={card.name}
                    className="card-art-img"
                    style={{ borderColor: card.isEmergencyPity ? '#ff0055' : (card.color || '#00f0ff') }}
                  />
                ) : (
                  <span className="card-art-emoji" style={{ filter: `drop-shadow(0 0 10px ${card.color || '#00f0ff'})` }}>
                    {card.icon}
                  </span>
                )}
              </div>

              {/* Card Name */}
              <div
                className="loot-card-name"
                style={{ color: card.isEmergencyPity ? '#ff5588' : (card.color || '#00f0ff') }}
              >
                {card.name}
              </div>

              {/* Card Desc */}
              <div className="loot-card-desc">{card.description}</div>

              {/* Tombol Klaim - Redesigned */}
              <button
                className={`claim-card-btn ${card.isEmergencyPity ? 'claim-btn-pity' : 'claim-btn-normal'}`}
                style={
                  !card.isEmergencyPity
                    ? {
                        '--btn-color': card.color || '#00f0ff',
                        borderColor: card.color || '#00f0ff',
                        color: card.color || '#00f0ff'
                      }
                    : {}
                }
              >
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
