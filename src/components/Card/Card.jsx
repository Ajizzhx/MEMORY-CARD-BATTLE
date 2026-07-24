import React from 'react';
import { CARD_DATABASE } from '../../utils/cardData';
import './Card.css';

const Card = ({ card, isFlipped, isMatched, isXrayVision, onClick, isDisabled }) => {
  const handleClick = () => {
    if (!isFlipped && !isMatched && !isDisabled && onClick) {
      onClick(card);
    }
  };

  // Cari image artwork dari object kartu atau fallback database
  const cardImage = card.img || CARD_DATABASE.find((c) => c.id === (card.pairId || card.id))?.img;

  return (
    <div
      className={`card-container ${isFlipped ? 'flipped' : ''} ${isMatched ? 'matched' : ''} ${isXrayVision ? 'xray-active' : ''}`}
      onClick={handleClick}
    >
      <div className="card-inner">
        {/* Punggung Kartu (Tampak Belakang) */}
        <div className="card-back">
          {/* Animasi X-Ray Vision Scan (Khusus Efek BUFF Penerima) */}
          {isXrayVision && (
            <div className="xray-overlay">
              <div className="xray-scan-beam" />
              <div className="xray-badge">
                <span className="xray-eye">👁️ SCAN</span>
              </div>
              <div className="xray-card-info">
                {cardImage ? (
                  <img src={cardImage} alt={card.name} className="xray-card-art-img" style={{ borderColor: card.color }} />
                ) : (
                  <span className="xray-icon" style={{ color: card.color }}>{card.icon}</span>
                )}
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
            {cardImage ? (
              <img src={cardImage} alt={card.name} className="card-art-img" style={{ borderColor: card.color }} />
            ) : (
              card.icon
            )}
          </div>

          <div className="card-name">{card.name}</div>

          <div className="card-value">
            {card.type === 'ATTACK' && card.isPiercing && `🗡️ -${card.value} PIERCE`}
            {card.type === 'ATTACK' && !card.isPiercing && card.id === 'pity_wrath' && `⚡ -${card.value} +15`}
            {card.type === 'ATTACK' && !card.isPiercing && card.id !== 'pity_wrath' && `-${card.value} HP`}
            {card.type === 'HEAL' && `+${card.value} HP`}
            {card.type === 'DEFENSE' && `+${card.value} Armor`}
            {card.type === 'BUFF' && 'BUFF'}
            {card.type === 'DEBUFF' && card.id === 'debuff_emp' && `⚡ EMP -${card.value}`}
            {card.type === 'DEBUFF' && card.id !== 'debuff_emp' && `DEBUFF`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
