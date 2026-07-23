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
        <h2 className="catalog-title">📖 KATALOG & PANDUAN GAME</h2>
        <p className="app-subtitle">Kompendium Efek, Statistik Kartu, dan Panduan Stage Musuh:</p>

        <div className="catalog-tabs">
          {['ALL', 'ATTACK', 'DEFENSE', 'HEAL', 'BUFF', 'DEBUFF', 'GUIDE'].map((type) => (
            <button
              key={type}
              className={`tab-btn ${activeFilter === type ? 'active' : ''}`}
              onClick={() => setActiveFilter(type)}
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
                  <strong>3. Kelengkapan Kartu (13 Kartu Katalog):</strong>
                  <p>Anda memulainya dengan 8 kartu starter dan bisa melengkapi seluruh 13 kartu katalog saat berhasil menyelesaikan hingga Stage 5.</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
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
        )}

        <button className="close-modal-btn" onClick={onClose}>
          Tutup Katalog
        </button>
      </div>
    </div>
  );
};

export default CatalogModal;
