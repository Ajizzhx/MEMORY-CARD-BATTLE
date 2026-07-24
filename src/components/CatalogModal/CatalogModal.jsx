import React, { useState } from 'react';
import { CARD_DATABASE } from '../../utils/cardData';
import { soundManager } from '../../utils/soundSystem';
import './CatalogModal.css';

const CatalogModal = ({ activeStageCards = [], stage = 1, isDashboardMode = false, onClose }) => {
  const [activeFilter, setActiveFilter] = useState('ALL');

  const isDashboard = isDashboardMode || activeStageCards.length === 0;

  // Hitung jumlah kartu yang ada di papan stage saat ini (jika mode in-game)
  const boardCardCounts = {};
  if (!isDashboard) {
    activeStageCards.forEach((c) => {
      const key = c.pairId || c.id;
      boardCardCounts[key] = (boardCardCounts[key] || 0) + 1;
    });
  }

  const filteredCards =
    activeFilter === 'ALL'
      ? CARD_DATABASE
      : CARD_DATABASE.filter((card) => card.type === activeFilter);

  return (
    <div className="modal-overlay">
      <div className="catalog-modal-content glass-panel">
        <h2 className="catalog-title">
          {isDashboard ? '📖 KATALOG KARTU GAME' : `📖 KATALOG & PANDUAN STAGE ${stage}`}
        </h2>
        <p className="app-subtitle">
          {isDashboard
            ? 'Kompendium Lengkap 13 Kartu, Efek, dan Tingkat Kelangkaan Game:'
            : `Indikator Kartu Aktif di Papan Stage ${stage} & Kompendium Efek:`}
        </p>

        <div className="catalog-tabs">
          {['ALL', 'ATTACK', 'DEFENSE', 'HEAL', 'BUFF', 'DEBUFF', 'GUIDE'].map((type) => (
            <button
              key={type}
              className={`tab-btn ${activeFilter === type ? 'active' : ''}`}
              onClick={() => {
                soundManager.playClickSFX();
                setActiveFilter(type);
              }}
            >
              {type === 'GUIDE' ? 'ℹ️ PANDUAN GAME' : type}
            </button>
          ))}
        </div>

        {activeFilter === 'GUIDE' ? (
          <div className="game-guide-container">
            <div className="guide-section">
              <h3 className="guide-heading">👾 Musuh AI Berdasarkan Stage</h3>
              <div className="enemy-guide-grid">
                <div className="enemy-guide-card">
                  <span className="enemy-icon">🤖</span>
                  <div className="enemy-info">
                    <strong>Stage 1: Cyber Scout</strong>
                    <span className="enemy-hp">HP: 70 | Kesulitan: Mudah</span>
                    <p>Musuh pengintai dasar untuk pemanasan pemain baru.</p>
                  </div>
                </div>
                <div className="enemy-guide-card">
                  <span className="enemy-icon">🦾</span>
                  <div className="enemy-info">
                    <strong>Stage 2: Cybergolem</strong>
                    <span className="enemy-hp">HP: 90 | Kesulitan: Sedang</span>
                    <p>Robot Golem tangguh dengan pertahanan HP & Block lebih tebal.</p>
                  </div>
                </div>
                <div className="enemy-guide-card">
                  <span className="enemy-icon">👻</span>
                  <div className="enemy-info">
                    <strong>Stage 3: Neon Spectre</strong>
                    <span className="enemy-hp">HP: 110 | Kesulitan: Sedang</span>
                    <p>Hantu cyber lincah yang mulai mengingat posisi kartu dengan akurat.</p>
                  </div>
                </div>
                <div className="enemy-guide-card">
                  <span className="enemy-icon">👹</span>
                  <div className="enemy-info">
                    <strong>Stage 4: Aether Warlord</strong>
                    <span className="enemy-hp">HP: 140 | Kesulitan: Tinggi</span>
                    <p>Panglima perang kosmik dengan HP tebal & daya serang tinggi.</p>
                  </div>
                </div>
                <div className="enemy-guide-card boss">
                  <span className="enemy-icon">🐉</span>
                  <div className="enemy-info">
                    <strong>Stage 5+: Abyss Omega (Boss)</strong>
                    <span className="enemy-hp">HP: 150+ (+30 HP / Stage) | Kesulitan: Bos Akhir</span>
                    <p>Boss Naga Cyber legendaris dalam pertarungan endless tanpa batas!</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="guide-section">
              <h3 className="guide-heading">🎲 Aturan Papan & Kartu Loot</h3>
              <div className="guide-rules-list">
                <div className="rule-item">
                  <strong>1. Papan Arena 4x4 (16 Kartu / 8 Pasang):</strong>
                  <p>Di setiap stage, sistem mengambil 8 jenis kartu secara acak dari Deck Anda dan menduplikasinya menjadi 8 pasang (16 kartu tertutup).</p>
                </div>
                <div className="rule-item">
                  <strong>2. Arena Milik Bersama (Shared Board):</strong>
                  <p>Kartu Loot yang Anda dapatkan dimasukkan ke Deck Anda. Namun saat bertarung, siapa pun yang berhasil mencocokkan kartu di papan (Pemain maupun AI) dialah yang akan mendapatkan efek dari kartu tersebut!</p>
                </div>
                <div className="rule-item">
                  <strong>3. Indikator Kartu Aktif Stage:</strong>
                  <p>Di dalam pertarungan, kartu yang hadir di papan Stage saat ini ditandai dengan lencana hijau terang `🟢 Ada di Stage Ini (2 Kartu)`, sedangkan kartu yang sedang tidak ada di papan diberi efek redup/gelap `🌑 Tidak Ada di Stage Ini`.</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="catalog-grid">
            {filteredCards.map((card) => {
              const countOnBoard = boardCardCounts[card.id] || 0;
              const isPresent = isDashboard || countOnBoard > 0;

              return (
                <div
                  key={card.id}
                  className={`catalog-card-item ${isPresent ? 'present-on-stage' : 'absent-on-stage'}`}
                >
                  <div className="card-stage-status-badge">
                    {isDashboard ? (
                      <span className="badge-catalog">✨ KATEGORI: {card.type}</span>
                    ) : isPresent ? (
                      <span className="badge-present">🟢 Ada di Stage ({countOnBoard} Kartu)</span>
                    ) : (
                      <span className="badge-absent">🌑 Tidak Ada di Stage</span>
                    )}
                  </div>

                  <span className="loot-rarity-tag" style={{ color: isPresent ? card.color : '#888' }}>
                    {card.rarity}
                  </span>
                  <div className="catalog-card-icon" style={{ color: isPresent ? card.color : '#666' }}>
                    {card.img ? (
                      <img
                        src={card.img}
                        alt={card.name}
                        className={`card-art-img ${!isPresent ? 'darkened-art' : ''}`}
                        style={{ borderColor: isPresent ? card.color : '#444' }}
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
        )}

        <button className="close-modal-btn" onClick={onClose}>
          Tutup Katalog
        </button>
      </div>
    </div>
  );
};

export default CatalogModal;
