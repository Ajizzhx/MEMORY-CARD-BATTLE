import React, { useState } from 'react';
import { getLocalizedCards } from '../../utils/cardData';
import { soundManager } from '../../utils/soundSystem';
import { t } from '../../utils/i18n';
import CardDetailModal from '../CardDetailModal/CardDetailModal';
import './CatalogModal.css';

const CatalogModal = ({ isDashboard = false, activeStageCards = [], stage = 1, onClose, currentLang = 'ID' }) => {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [showAll15CardsInGame, setShowAll15CardsInGame] = useState(false);
  const [selectedCardForDetail, setSelectedCardForDetail] = useState(null);

  const localizedDatabase = getLocalizedCards(currentLang);

  // Hitung kartu yang ada di papan stage saat ini
  const boardCardCounts = {};
  activeStageCards.forEach((c) => {
    const key = c.pairId || c.id;
    boardCardCounts[key] = (boardCardCounts[key] || 0) + 1;
  });

  // Jika di dalam game dan tidak sedang membuka 15 kartu lengkap, FILTER HANYA KARTU YANG ADA DI PAPAN STAGE!
  const baseCards = (!isDashboard && !showAll15CardsInGame)
    ? localizedDatabase.filter((card) => (boardCardCounts[card.id] || 0) > 0)
    : localizedDatabase;

  const filteredCards =
    activeFilter === 'ALL'
      ? baseCards
      : baseCards.filter((card) => card.type === activeFilter);

  const handleCardClick = (card) => {
    soundManager.playClickSFX();
    setSelectedCardForDetail(card);
  };

  return (
    <div className="modal-overlay">
      <div className="catalog-modal-content glass-panel" style={{ position: 'relative' }}>
        <button className="modal-close-icon-btn" onClick={onClose} title={t('closeCatalogBtn', currentLang)}>
          ✕
        </button>

        {/* Header Modal */}
        {isDashboard || showAll15CardsInGame ? (
          <>
            <h2 className="catalog-title">{t('catalogTitle15', currentLang)}</h2>
            <p className="app-subtitle">
              {isDashboard
                ? t('catalogSubDash', currentLang)
                : t('catalogSubAllGame', currentLang)}
            </p>
          </>
        ) : (
          <>
            <h2 className="catalog-title">{t('catalogTitleStage', currentLang)}{stage}</h2>
            <p className="app-subtitle">
              {baseCards.length} {t('catalogSubStage', currentLang)}{stage}:
            </p>
          </>
        )}

        {/* Tab Filter Kartu */}
        <div className="catalog-tabs">
          {['ALL', 'ATTACK', 'DEFENSE', 'HEAL', 'BUFF', 'DEBUFF'].map((filter) => (
            <button
              key={filter}
              className={`tab-btn ${activeFilter === filter ? 'active' : ''}`}
              onClick={() => {
                soundManager.playClickSFX();
                setActiveFilter(filter);
              }}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Tombol Khusus In-Game untuk Beralih ke 15 Kartu Lengkap */}
        {!isDashboard && (
          <div className="in-game-guide-toggle">
            <button
              className="toggle-view-btn"
              onClick={() => {
                soundManager.playClickSFX();
                setShowAll15CardsInGame(!showAll15CardsInGame);
              }}
            >
              {showAll15CardsInGame
                ? `${t('toggleBackStage', currentLang)}${stage}`
                : t('toggleView15', currentLang)}
            </button>
          </div>
        )}

        {/* Grid Kartu Katalog */}
        <div className="catalog-grid">
          {filteredCards.map((card) => {
            const countOnBoard = boardCardCounts[card.id] || 0;
            const isPresent = countOnBoard > 0;

            return (
              <div
                key={card.id}
                className={`catalog-card-item rarity-${card.rarity} ${isPresent && !isDashboard ? 'present-on-stage' : ''}`}
                style={{
                  borderColor: card.color || 'rgba(0, 240, 255, 0.5)',
                  boxShadow: `0 0 14px ${card.color || '#00f0ff'}40`
                }}
                onClick={() => handleCardClick(card)}
                title="Klik untuk membuka Kisah Lore & Detail Kartu"
              >
                {!isDashboard && isPresent && (
                  <div className="card-stage-status-badge">
                    <span className="badge-present">🟢 {countOnBoard} {t('badgePresent', currentLang)}</span>
                  </div>
                )}

                <span className="loot-rarity-tag" style={{ color: card.color }}>
                  {card.rarity}
                </span>

                <div className="catalog-card-icon" style={{ color: card.color }}>
                  {card.img ? (
                    <img
                      src={card.img}
                      alt={card.name}
                      className="card-art-img"
                      style={{ borderColor: card.color }}
                    />
                  ) : (
                    card.icon
                  )}
                </div>

                <div className="catalog-card-name">{card.name}</div>
                <div className="catalog-card-desc">{card.description}</div>

                {/* Lore Hint Badge */}
                <div className="card-lore-hint-badge">
                  <span>{t('loreHint', currentLang)}</span>
                </div>
              </div>
            );
          })}
        </div>

        <button className="close-modal-btn" onClick={onClose}>
          {t('closeCatalogBtn', currentLang)}
        </button>
      </div>

      {/* Modal Interactive Lore & Card Story */}
      {selectedCardForDetail && (
        <CardDetailModal
          card={selectedCardForDetail}
          currentLang={currentLang}
          onClose={() => setSelectedCardForDetail(null)}
        />
      )}
    </div>
  );
};

export default CatalogModal;
