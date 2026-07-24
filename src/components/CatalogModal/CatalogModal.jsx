import React, { useState } from 'react';
import { CARD_DATABASE } from '../../utils/cardData';
import { soundManager } from '../../utils/soundSystem';
import './CatalogModal.css';

const CatalogModal = ({ isDashboard = false, activeStageCards = [], stage = 1, onClose }) => {
  // Jika di Dashboard: default tab ke 'GUIDE', jika di Game: default tab ke 'ALL'
  const [activeFilter, setActiveFilter] = useState(isDashboard ? 'GUIDE' : 'ALL');
  const [showFullGuideInGame, setShowFullGuideInGame] = useState(false);

  // Hitung kartu yang ada di papan stage saat ini
  const boardCardCounts = {};
  activeStageCards.forEach((c) => {
    const key = c.pairId || c.id;
    boardCardCounts[key] = (boardCardCounts[key] || 0) + 1;
  });

  // Jika di dalam game dan tidak sedang membuka panduan full, FILTER HANYA KARTU YANG ADA DI PAPAN!
  const baseCards = (!isDashboard && !showFullGuideInGame)
    ? CARD_DATABASE.filter((card) => (boardCardCounts[card.id] || 0) > 0)
    : CARD_DATABASE;

  const filteredCards =
    activeFilter === 'ALL' || activeFilter === 'GUIDE'
      ? baseCards
      : baseCards.filter((card) => card.type === activeFilter);

  return (
    <div className="modal-overlay">
      <div className="catalog-modal-content glass-panel">
        {/* Header Modal - Berbeda antara Dashboard & In-Game */}
        {isDashboard ? (
          <>
            <h2 className="catalog-title">📘 BUKU PANDUAN & KATALOG GAME</h2>
            <p className="app-subtitle">Panduan Musuh AI per Stage, Aturan Game, dan Kompendium 15 Kartu Lengkap:</p>
          </>
        ) : (
          <>
            <h2 className="catalog-title">🂠 KARTU AKTIF STAGE {stage}</h2>
            <p className="app-subtitle">
              Menampilkan {baseCards.length} jenis kartu yang sedang ada di papan pertarungan Stage {stage}:
            </p>
          </>
        )}

        {/* Tab Navigasi Filter */}
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

        {/* Tombol Khusus In-Game untuk beralih ke Panduan Lengkap */}
        {!isDashboard && (
          <div className="in-game-guide-toggle">
            <button
              className="toggle-view-btn"
              onClick={() => {
                soundManager.playClickSFX();
                setShowFullGuideInGame(!showFullGuideInGame);
              }}
            >
              {showFullGuideInGame
                ? `🎯 Kembali ke Kartu Stage ${stage}`
                : `📘 Lihat Semua 15 Kartu Katalog`}
            </button>
          </div>
        )}

        {/* Tampilan Konten: Tab Panduan vs Grid Kartu */}
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
              <h3 className="guide-heading">🎲 Aturan Papan & Arena Pertarungan</h3>
              <div className="guide-rules-list">
                <div className="rule-item">
                  <strong>1. Papan Arena 4x4 (16 Kartu / 8 Pasang Unik):</strong>
                  <p>Di setiap stage, sistem mengambil 8 jenis kartu unik (tanpa duplikat jenis) dari Deck Anda dan membentuk 8 pasang (16 kartu tertutup di papan 4x4).</p>
                </div>
                <div className="rule-item">
                  <strong>2. Arena Milik Bersama (Shared Board):</strong>
                  <p>Kartu Loot yang Anda dapatkan dimasukkan ke Deck Anda. Namun saat bertarung, siapa pun yang berhasil mencocokkan kartu di papan (Pemain maupun AI) dialah yang akan mendapatkan efek dari kartu tersebut!</p>
                </div>
                <div className="rule-item">
                  <strong>3. Kelengkapan Kartu (15 Kartu Katalog):</strong>
                  <p>Anda memulai dengan 8 kartu starter dan dapat melengkapi semua 15 kartu katalog saat berhasil mencapai Stage 7 Clear. Setiap Stage Clear menawarkan 1 kartu baru dari katalog yang belum dimiliki (Strict Non-Duplicate).</p>
                </div>
                <div className="rule-item">
                  <strong>4. Pity System & Bantuan Darurat (Risk vs Reward):</strong>
                  <p>Jika HP &lt; 50% atau Mismatch 3x beruntun, Pity System Aktif! Terbuka pilihan ke-4 <strong>🚑 Bio-Shield Medkit</strong> (+35 HP &amp; +25 Armor). Memilih Medkit menyelamatkan nyawa Anda, namun tidak menambah kartu baru (+0 progresi) sehingga kelengkapan 15 kartu akan bergeser ke Stage 8+.</p>
                </div>
                <div className="rule-item">
                  <strong>5. Giliran Extra & Batas Waktu 15 Detik:</strong>
                  <p>Setiap giliran dibatasi 15 detik. Jika berhasil mencocokkan kartu (Match), Anda mendapatkan giliran ekstra! Jika Mismatch atau waktu habis, giliran berpindah ke Musuh.</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
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
        )}

        <button className="close-modal-btn" onClick={onClose}>
          Tutup
        </button>
      </div>
    </div>
  );
};

export default CatalogModal;
