import React from 'react';
import { CARD_DATABASE } from '../../utils/cardData';
import './Card.css';

const Card = ({ card, isFlipped, isMatched, isXrayVision, onClick, isDisabled }) => {
  const handleClick = () => {
    if (!isFlipped && !isMatched && !isDisabled && onClick) {
      onClick(card);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  // Cari image artwork dari object kartu atau fallback database
  const cardImage = card.img || CARD_DATABASE.find((c) => c.id === (card.pairId || card.id))?.img;

  return (
    <div
      className={`card-container ${isFlipped ? 'flipped' : ''} ${isMatched ? 'matched' : ''} ${isXrayVision ? 'xray-active' : ''}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={isFlipped || isMatched || isDisabled ? -1 : 0}
      aria-label={isFlipped ? `${card.name}, ${card.type}, ${card.rarity}` : 'Kartu tertutup'}
    >
      <div className="card-inner">
        {/* Punggung Kartu (Tampak Belakang) */}
        <div className="card-back">
          {/* Animasi X-Ray Vision Scan (Khusus Efek BUFF Penerima) */}
          {isXrayVision && (
            <div className="xray-overlay">
              <div className="xray-scan-beam" />
              <div className="xray-badge">
                <span className="xray-eye">SCAN</span>
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
          {/* 1. Header Bar: Type Tag di kiri, Rarity Gem di kanan */}
          <div className="card-header">
            <div className="card-type-tag" style={{ color: card.color }}>
              <span className="card-type-dot" style={{ backgroundColor: card.color, boxShadow: `0 0 6px ${card.color}` }} />
              <span className="card-type-text">{card.type}</span>
            </div>
            <div className={`card-rarity-gem rarity-${card.rarity}`}>
              <span className="gem-icon">◆</span>
              <span className="rarity-text">{card.rarity?.toUpperCase()}</span>
            </div>
          </div>

          {/* 2. Window Bingkai Artwork Kartu (Framed Art) */}
          <div className="card-art-frame" style={{ borderColor: `${card.color}66` }}>
            {cardImage ? (
              <img src={cardImage} alt={card.name} className="card-art-img" />
            ) : (
              <span className="card-icon-fallback" style={{ color: card.color }}>{card.icon}</span>
            )}
            <div
              className="card-art-tint"
              style={{ background: `radial-gradient(circle at 50% 100%, ${card.color}25 0%, transparent 75%)` }}
            />
          </div>

          {/* 3. Panel Bawah: Pelat Nama + Stat Ribbon */}
          <div className="card-bottom-panel">
            <div className="card-name" title={card.name}>{card.name}</div>
            <div className="card-stat-ribbon">
              {card.type === 'ATTACK' && card.isPiercing && `-${card.value} PIERCE`}
              {card.type === 'ATTACK' && !card.isPiercing && card.id === 'pity_wrath' && `-${card.value} +15`}
              {card.type === 'ATTACK' && !card.isPiercing && card.id !== 'pity_wrath' && `-${card.value} HP`}
              {card.type === 'HEAL' && `+${card.value} HP`}
              {card.type === 'DEFENSE' && `+${card.value} Armor`}
              {card.type === 'BUFF' && card.id === 'buff_neural' && 'FLASH BOARD'}
              {card.type === 'BUFF' && card.id !== 'buff_neural' && 'SCAN BOARD'}
              {card.type === 'DEBUFF' && card.id === 'debuff_emp' && `EMP -${card.value}`}
              {card.type === 'DEBUFF' && card.id === 'debuff_poison' && `-${card.value} PIERCE`}
              {card.type === 'DEBUFF' && card.id === 'debuff_glitch' && `-${card.value} DMG`}
              {card.type === 'DEBUFF' && card.id !== 'debuff_emp' && card.id !== 'debuff_poison' && card.id !== 'debuff_glitch' && `DEBUFF`}
              {card.type === 'UTILITY' && 'TIMER/SHUFFLE'}
              {card.type === 'DRAIN' && 'DRAIN -10/+15'}
              {card.type === 'CONTROL' && 'FREEZE 1 TURN'}
              {card.type === 'RISK' && 'GAMBLE 40/-10'}
              {card.type === 'SPECIAL' && 'DOUBLE CAST'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
