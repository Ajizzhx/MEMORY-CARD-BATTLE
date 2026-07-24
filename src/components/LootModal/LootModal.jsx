import React from 'react';
import './LootModal.css';

const PITY_AID_CARD = {
  id: 'pity_emergency_aid',
  name: 'Emergency Aid',
  type: 'PITY_AID',
  rarity: 'epic',
  value: 35,
  icon: '🚑',
  color: '#ff0055',
  description: 'Bantuan Darurat! Pulihkan +35 HP & +20 Armor (Tidak menambah kartu ke deck).'
};

const LootModal = ({ stage, choices = [], isPityActive, onSelectLoot }) => {
  const choicesCount = choices.length;

  let subtitleText = "Pilih 1 Kartu Hadiah Baru untuk Perjalanan Selanjutnya:";
  if (choicesCount === 2) {
    subtitleText = "Tersisa 2 Kartu Baru di Katalog! Pilih 1 dari 2 pilihan berikut:";
  } else if (choicesCount === 1) {
    subtitleText = "Tersisa 1 Kartu Baru di Katalog! Klaim kartu terakhir Anda:";
  }

  // Jika Pity System Aktif, tambahkan Pity Aid Card sebagai Pilihan Ke-4 (Emergency Aid)
  const displayChoices = isPityActive && choicesCount > 0
    ? [...choices, PITY_AID_CARD]
    : choices;

  return (
    <div className="modal-overlay">
      <div className="loot-modal-content glass-panel">
        <h2 className="loot-modal-title">🏆 STAGE {stage} CLEARED!</h2>

        {choicesCount === 0 ? (
          <div className="deck-full-container">
            <div className="deck-full-badge">🎉 KOLEKSI DECK LENGKAP (15/15)</div>
            <p className="deck-full-desc">
              Luar biasa! Anda telah berhasil mengumpulkan seluruh <strong>15 Kartu Katalog</strong> ke dalam Deck Anda!
              <br /><br />
              Sebagai bonus kelengkapan, Anda mendapatkan <strong>+50 HP Pemulihan Maksimal</strong> untuk menghadapi pertarungan Stage selanjutnya.
            </p>
            <button className="claim-bonus-btn" onClick={() => onSelectLoot(null)}>
              💖 Klaim Bonus +50 HP & Lanjut Stage {stage + 1}
            </button>
          </div>
        ) : (
          <>
            <p className="app-subtitle">{subtitleText}</p>

            {isPityActive && (
              <div className="pity-notice">
                🌟 <strong>Pity System Active!</strong> Pilihan Ke-4 "Bantuan Darurat (+35 HP & +20 Armor)" Diaktifkan untuk menyelamatkan Anda!
              </div>
            )}

            <div className={`loot-choices-grid count-${displayChoices.length}`}>
              {displayChoices.map((card) => {
                const isPityCard = card.id === 'pity_emergency_aid';

                return (
                  <div
                    key={card.id}
                    className={`loot-card-item ${card.rarity} ${isPityCard ? 'pity-aid-item' : ''}`}
                    onClick={() => onSelectLoot(card)}
                  >
                    <span className="loot-rarity-tag" style={{ color: card.color }}>
                      {isPityCard ? 'PITY AID' : card.rarity}
                    </span>
                    <div className="loot-card-icon" style={{ color: card.color }}>
                      {card.img ? (
                        <img src={card.img} alt={card.name} className="card-art-img" style={{ borderColor: card.color }} />
                      ) : (
                        card.icon
                      )}
                    </div>
                    <div className="loot-card-name" style={{ color: isPityCard ? '#ff0055' : 'inherit' }}>
                      {card.name}
                    </div>
                    <div className="loot-card-desc">{card.description}</div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LootModal;
