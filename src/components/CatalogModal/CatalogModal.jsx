import React, { useState } from 'react';
import { CARD_DATABASE } from '../../utils/cardData';
import './CatalogModal.css';

const CatalogModal = ({ onClose }) => {
  const [activeFilter, setActiveFilter] = useState('ALL');

  const filteredCards =
    activeFilter === 'ALL'
      ? CARD_DATABASE
      : CARD_DATABASE.filter((card) => card.type === activeFilter);

  return (
    <div className="modal-overlay">
      <div className="catalog-modal-content glass-panel">
        <h2 className="catalog-title">📖 KATALOG KARTU GAME</h2>
        <p className="app-subtitle">Kompendium Efek & Statistik Kartu untuk Pemain Baru:</p>

        <div className="catalog-tabs">
          {['ALL', 'ATTACK', 'DEFENSE', 'HEAL', 'BUFF', 'DEBUFF'].map((type) => (
            <button
              key={type}
              className={`tab-btn ${activeFilter === type ? 'active' : ''}`}
              onClick={() => setActiveFilter(type)}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="catalog-grid">
          {filteredCards.map((card) => (
            <div key={card.id} className="catalog-card-item">
              <span className="loot-rarity-tag" style={{ color: card.color }}>
                {card.rarity}
              </span>
              <div className="catalog-card-icon" style={{ color: card.color }}>
                {card.img ? (
                  <img src={card.img} alt={card.name} className="card-art-img" style={{ borderColor: card.color }} />
                ) : (
                  card.icon
                )}
              </div>
              <div className="catalog-card-name">{card.name}</div>
              <div className="catalog-card-desc">{card.description}</div>
            </div>
          ))}
        </div>

        <button className="close-modal-btn" onClick={onClose}>
          Tutup Katalog
        </button>
      </div>
    </div>
  );
};

export default CatalogModal;
