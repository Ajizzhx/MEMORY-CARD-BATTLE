import React from 'react';
import { soundManager } from '../../utils/soundSystem';
import './CardDetailModal.css';

const CardDetailModal = ({ card, onClose }) => {
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
        <button className="modal-close-icon-btn" onClick={handleClose} title="Tutup Detail Kartu">
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
              {card.type === 'ATTACK' && '⚔️ SERANGAN'}
              {card.type === 'DEFENSE' && '🛡️ PERTAHANAN'}
              {card.type === 'HEAL' && '🧪 PEMULIHAN'}
              {card.type === 'BUFF' && '👁️ BUFF PANTAU'}
              {card.type === 'DEBUFF' && '☠️ DEBUFF GLITCH'}
              {card.type === 'EMERGENCY' && '🚑 MEDKIT DARURAT'}
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
            <span className="lore-title">CYBER LORE ARCHIVE</span>
          </div>
          <p className="lore-content">
            "{card.lore || 'Arsip rahasia kartu ini tersimpan dalam intisari memori Sektor Neo-Veridia.'}"
          </p>
        </div>

        {/* Footer Stats Box */}
        <div className="card-detail-stats-bar">
          <div className="stat-pill">
            <span className="stat-label">NILAI EFEK</span>
            <span className="stat-val" style={{ color: card.color }}>
              {card.value > 0 ? `${card.value} Poin` : 'Efek Pengintip'}
            </span>
          </div>
          {card.isPiercing && (
            <div className="stat-pill piercing">
              <span className="stat-label">KEISTIMEWAAN</span>
              <span className="stat-val">🗡️ Kuantum Penetrasik</span>
            </div>
          )}
        </div>

        <button className="card-detail-close-btn" onClick={handleClose}>
          Tutup Detail Kartu
        </button>
      </div>
    </div>
  );
};

export default CardDetailModal;
