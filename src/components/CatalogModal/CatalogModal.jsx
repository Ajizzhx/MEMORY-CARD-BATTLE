import React, { useState } from 'react';
import { CARD_DATABASE } from '../../utils/cardData';
import { soundManager } from '../../utils/soundSystem';
import './CatalogModal.css';

const CatalogModal = ({ isDashboard = false, activeStageCards = [], stage = 1, onClose }) => {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [showAll15CardsInGame, setShowAll15CardsInGame] = useState(false);

  // Hitung kartu yang ada di papan stage saat ini
  const boardCardCounts = {};
  activeStageCards.forEach((c) => {
    const key = c.pairId || c.id;
    boardCardCounts[key] = (boardCardCounts[key] || 0) + 1;
  });

  // Jika di dalam game dan tidak sedang membuka 15 kartu lengkap, FILTER HANYA KARTU YANG ADA DI PAPAN STAGE!
  const baseCards = (!isDashboard && !showAll15CardsInGame)
    ? CARD_DATABASE.filter((card) => (boardCardCounts[card.id] || 0) > 0)
    : CARD_DATABASE;

  const filteredCards =
    activeFilter === 'ALL'
      ? baseCards
      : baseCards.filter((card) => card.type === activeFilter);

  return (
    <div className="modal-overlay">
      <div className="catalog-modal-content glass-panel" style={{ position: 'relative' }}>
        <button className="modal-close-icon-btn" onClick={onClose} title="Tutup Katalog Kartu">
          ✕
        </button>
        {/* Header Modal */}
        {isDashboard || showAll15CardsInGame ? (
          <>
            <h2 className="catalog-title">🂠 KATALOG 15 KARTU GAME</h2>
            <p className="app-subtitle">
              {isDashboard
                ? 'Kompendium Koleksi Statistik, Efek, & Gambar 3D Render 15 Kartu Cyberfantasy:'
                : 'Menampilkan seluruh 15 jenis kartu kompendium katalog dalam game:'}
            </p>
          </>
        ) : (
          <>
            <h2 className="catalog-title">🂠 KARTU AKTIF STAGE {stage}</h2>
            <p className="app-subtitle">
              Menampilkan {baseCards.length} jenis kartu yang sedang ada di papan pertarungan Stage {stage}:
            </p>
          </>
        )}

        {/* Tab Navigasi Filter Elemen Kartu */}
        <div className="catalog-tabs">
          {['ALL', 'ATTACK', 'DEFENSE', 'HEAL', 'BUFF', 'DEBUFF'].map((type) => (
            <button
              key={type}
              className={`tab-btn ${activeFilter === type ? 'active' : ''}`}
              onClick={() => {
                soundManager.playClickSFX();
                setActiveFilter(type);
              }}
            >
              {type}
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
                ? `🎯 Kembali ke Kartu Stage ${stage}`
                : `🂠 Lihat Semua 15 Kartu Katalog`}
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
                className={`catalog-card-item ${isPresent ? 'present-on-stage' : ''}`}
              >
                {!isDashboard && isPresent && (
                  <div className="card-stage-status-badge">
                    <span className="badge-present">🟢 {countOnBoard} Kartu di Papan</span>
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
              </div>
            );
          })}
        </div>

        <button className="close-modal-btn" onClick={onClose}>
          Tutup Katalog
        </button>
      </div>
    </div>
  );
};

export default CatalogModal;
