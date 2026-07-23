import React from 'react';
import './Card.css';

const Card = ({ card, isFlipped, isMatched, onClick, isDisabled }) => {
  const handleClick = () => {
    if (!isFlipped && !isMatched && !isDisabled && onClick) {
      onClick(card);
    }
  };

  return (
    <div
      className={`card-container ${isFlipped ? 'flipped' : ''} ${isMatched ? 'matched' : ''}`}
      onClick={handleClick}
    >
      <div className="card-inner">
        {/* Punggung Kartu (Tampak Belakang) */}
        <div className="card-back">
          <div className="card-back-pattern">
            <span>🔮</span>
          </div>
        </div>

        {/* Muka Kartu (Tampak Depan) */}
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
