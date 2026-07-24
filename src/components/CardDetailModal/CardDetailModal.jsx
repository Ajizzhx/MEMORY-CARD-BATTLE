import React from 'react';
import { soundManager } from '../../utils/soundSystem';
import { t, getTranslatedCard } from '../../utils/i18n';
import './CardDetailModal.css';

const CardDetailModal = ({ card: rawCard, onClose }) => {
  if (!rawCard) return null;

  const card = getTranslatedCard(rawCard);

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
        <button className="modal-close-icon-btn" onClick={handleClose} title="Close Card Detail">
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
              {card.type === 'ATTACK' && '⚔️ ATTACK'}
              {card.type === 'DEFENSE' && '🛡️ DEFENSE'}
              {card.type === 'HEAL' && '🧪 HEAL'}
              {card.type === 'BUFF' && '👁️ BUFF'}
              {card.type === 'DEBUFF' && '☠️ DEBUFF'}
              {card.type === 'EMERGENCY' && '🚑 EMERGENCY MEDKIT'}
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
            <span className="lore-title">{t('lore_archive_header')}</span>
          </div>
          <p className="lore-content">
            "{card.lore || 'Secret archive records of this card are encrypted in Neo-Veridia Sector memory.'}"
          </p>
        </div>

        {/* Footer Stats Box */}
        <div className="card-detail-stats-bar">
          <div className="stat-pill">
            <span className="stat-label">{t('effect_val')}</span>
            <span className="stat-val" style={{ color: card.color }}>
              {card.value > 0 ? `${card.value}` : 'Scan 2 Cards'}
            </span>
          </div>
          {card.isPiercing && (
            <div className="stat-pill piercing">
              <span className="stat-label">SPECIAL</span>
              <span className="stat-val">{t('special_piercing')}</span>
            </div>
          )}
        </div>

        <button className="card-detail-close-btn" onClick={handleClose}>
          {t('close_detail_btn')}
        </button>
      </div>
    </div>
  );
};

export default CardDetailModal;
