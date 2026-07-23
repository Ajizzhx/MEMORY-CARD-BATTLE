import React from 'react';
import './Card.css';

const Card = ({ card, isFlipped, isMatched, isXrayVision, onClick, isDisabled }) => {
  const handleClick = () => {
    if (!isFlipped && !isMatched && !isDisabled && onClick) {
      onClick(card);
    }
  };

  return (
    <div
      className={`card-container ${isFlipped ? 'flipped' : ''} ${isMatched ? 'matched' : ''} ${isXrayVision ? 'xray-active' : ''}`}
      onClick={handleClick}
    >
      <div className="card-inner">
        {/* Punggung Kartu (Tampak Belakang — Tajam & Jelas Tanpa Blur) */}
        <div className="card-back">
          {/* Animasi X-Ray Vision Scan (Khusus Efek BUFF Penerima) */}
          {isXrayVision && (
            <div className="xray-overlay">
              <div className="xray-scan-beam" />
              <div className="xray-badge">
                <span className="xray-eye">👁️ SCAN</span>
              </div>
              <div className="xray-card-info">
                <span className="xray-icon" style={{ color: card.color }}>{card.icon}</span>
                <span className="xray-title">{card.name}</span>
                <span className="xray-type-pill" style={{ borderColor: card.color, color: card.color }}>{card.type}</span>
              </div>
            </div>
          )}
        </div>

        {/* Muka Kartu (Tampak Depan saat 3D Flip) */}
        <div className={`card-front ${card.rarity}`}>
          <div className="card-header">
            <span className="card-type-badge" style={{ color: card.color }}>
              {card.type}
            </span>
            <span className="card-rarity">{card.rarity[0].toUpperCase()}</span>
          </div>

          <div className="card-icon" style={{ color: card.color }}>
            {card.icon}
          </div>

          <div className="card-name">{card.name}</div>

          <div className="card-value">
            {card.type === 'ATTACK' && `-${card.value} HP`}
            {card.type === 'HEAL' && `+${card.value} HP`}
            {card.type === 'DEFENSE' && `+${card.value} Armor`}
            {card.type === 'BUFF' && 'BUFF'}
            {card.type === 'DEBUFF' && 'DEBUFF'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
