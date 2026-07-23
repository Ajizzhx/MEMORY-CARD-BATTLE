import React from 'react';
import './LootModal.css';

const LootModal = ({ stage, choices, isPityActive, onSelectLoot }) => {
  return (
    <div className="modal-overlay">
      <div className="loot-modal-content glass-panel">
        <h2 className="loot-modal-title">🏆 STAGE {stage} CLEARED!</h2>
        <p className="app-subtitle">Pilih 1 Kartu Hadiah untuk Perjalanan Selanjutnya:</p>

        {isPityActive && (
          <div className="pity-notice">
            🌟 <strong>Pity System Active!</strong> Peluang mendapatkan Kartu Rare & Epic meningkat +25%!
          </div>
        )}

        <div className="loot-choices-grid">
          {choices.map((card) => (
            <div
              key={card.id}
              className={`loot-card-item ${card.rarity}`}
              onClick={() => onSelectLoot(card)}
            >
              <span className="loot-rarity-tag" style={{ color: card.color }}>
                {card.rarity}
              </span>
              <div className="loot-card-icon" style={{ color: card.color }}>
                {card.img ? (
                  <img src={card.img} alt={card.name} className="card-art-img" style={{ borderColor: card.color }} />
                ) : (
                  card.icon
                )}
              </div>
              <div className="loot-card-name">{card.name}</div>
              <div className="loot-card-desc">{card.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LootModal;
