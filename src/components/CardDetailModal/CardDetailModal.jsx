import React from 'react';
import { soundManager } from '../../utils/soundSystem';
import { t } from '../../utils/i18n';
import './CardDetailModal.css';

const CardDetailModal = ({ card, onClose, currentLang = 'ID' }) => {
  if (!card) return null;

  const handleClose = () => {
    soundManager.playClickSFX();
    onClose();
  };

  return (
    <div className="card-detail-overlay" onClick={handleClose}>
      <div
        className="card-detail-modal glass-panel"
        onClick={(e) => e.stopPropagation()}
        style={{
          borderColor: card.color || '#00f0ff',
          boxShadow: `0 0 35px ${card.color || '#00f0ff'}45`
        }}
      >
        <button className="modal-close-icon-btn" onClick={handleClose} title={t('closeCardDetailBtn', currentLang)}>
          ✕
        </button>

        {/* Art Container dengan Glowing Ring */}
        <div className="card-detail-art-wrapper" style={{ borderColor: card.color }}>
          {card.img ? (
            <img src={card.img} alt={card.name} className="card-detail-img" />
          ) : (
            <span className="card-detail-icon-fallback" style={{ color: card.color }}>
              {card.icon}
            </span>
          )}
        </div>

        {/* Header Info */}
        <div className="card-detail-header">
          <div className="card-detail-badges">
            <span className="card-rarity-badge" style={{ background: `${card.color}22`, borderColor: card.color, color: card.color }}>
              {card.rarity?.toUpperCase()}
            </span>
            <span className="card-type-badge">
              {card.type === 'ATTACK' && t('cardDetailTypeAttack', currentLang)}
              {card.type === 'DEFENSE' && t('cardDetailTypeDefense', currentLang)}
              {card.type === 'HEAL' && t('cardDetailTypeHeal', currentLang)}
              {card.type === 'BUFF' && t('cardDetailTypeBuff', currentLang)}
              {card.type === 'DEBUFF' && t('cardDetailTypeDebuff', currentLang)}
              {card.type === 'EMERGENCY' && t('cardDetailTypeEmergency', currentLang)}
            </span>
          </div>

          <h2 className="card-detail-title" style={{ color: card.color, textShadow: `0 0 16px ${card.color}` }}>
            {card.name}
          </h2>

          <p className="card-detail-desc">{card.description}</p>
        </div>

        {/* Lore Background Story Box */}
        <div className="card-detail-lore-box">
          <div className="lore-box-header">
            <span className="lore-icon">📜</span>
            <span className="lore-title">{t('loreArchiveHeader', currentLang)}</span>
          </div>
          <p className="lore-content">
            "{card.lore || 'Arsip rahasia kartu ini tersimpan dalam intisari memori Sektor Neo-Veridia.'}"
          </p>
        </div>

        {/* Footer Stats Box */}
        <div className="card-detail-stats-bar">
          <div className="stat-pill">
            <span className="stat-label">{t('statEffectValue', currentLang)}</span>
            <span className="stat-val" style={{ color: card.color }}>
              {card.value > 0 ? `${card.value} ${t('statPoints', currentLang)}` : t('statInspectEffect', currentLang)}
            </span>
          </div>
          {card.isPiercing && (
            <div className="stat-pill piercing">
              <span className="stat-label">{t('statFeature', currentLang)}</span>
              <span className="stat-val">{t('statQuantumPiercing', currentLang)}</span>
            </div>
          )}
        </div>

        <button className="card-detail-close-btn" onClick={handleClose}>
          {t('closeCardDetailBtn', currentLang)}
        </button>
      </div>
    </div>
  );
};

export default CardDetailModal;
