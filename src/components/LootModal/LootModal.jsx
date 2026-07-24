import React from 'react';
import './LootModal.css';

const LootModal = ({ stage, choices = [], isPityActive, pityUsesLeft = 2, onSelectLoot }) => {
  // Filter pilihan kartu biasa (non-emergency) vs emergency
  const cardChoices = choices.filter((c) => !c.isEmergencyPity);
  const emergencyChoice = choices.find((c) => c.isEmergencyPity);
  const choicesCount = cardChoices.length;

  let subtitleText = "Pilih 1 Hadiah untuk Memperkuat Perjalanan Anda:";
  if (isPityActive && emergencyChoice) {
    subtitleText = `⚠️ Pity System Aktif! Opsi ke-4 Terbuka (Sisa Kuota Bantuan: ${pityUsesLeft}/2x)!`;
  } else if (choicesCount === 2) {
    subtitleText = "Tersisa 2 Kartu Baru di Katalog! Pilih 1 dari 2 pilihan berikut:";
  } else if (choicesCount === 1) {
    subtitleText = "Tersisa 1 Kartu Baru di Katalog! Klaim kartu terakhir Anda:";
  }

  return (
    <div className="modal-overlay">
      <div className="loot-modal-content glass-panel">
        <h2 className="loot-modal-title">🏆 STAGE {stage} CLEARED!</h2>

        {choicesCount === 0 && !emergencyChoice ? (
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

            {isPityActive && emergencyChoice && (
              <div className="pity-notice active-pity-banner">
                🚑 <strong>Pity Emergency Activated!</strong> Opsi <strong>"Bio-Shield Medkit"</strong> terbuka (+35 HP & +25 Armor, tanpa menambah kartu baru). Sisa Kuota Pemakaian: <strong>{pityUsesLeft}/2x</strong> per perjalanan.
              </div>
            )}

            <div className={`loot-choices-grid count-${choices.length}`}>
              {choices.map((card) => {
                const isEmergency = card.isEmergencyPity;

                return (
                  <div
                    key={card.id}
                    className={`loot-card-item ${isEmergency ? 'emergency-pity-item' : card.rarity}`}
                    onClick={() => onSelectLoot(card)}
                  >
                    <span
                      className="loot-rarity-tag"
                      style={{
                        color: card.color,
                        background: isEmergency ? 'rgba(255, 0, 85, 0.25)' : 'rgba(0, 0, 0, 0.5)',
                        borderColor: isEmergency ? '#ff0055' : 'transparent'
                      }}
                    >
                      {isEmergency ? `🚑 SAVIOR (${pityUsesLeft}/2x)` : card.rarity}
                    </span>

                    <div className="loot-card-icon" style={{ color: card.color }}>
                      {card.img ? (
                        <img src={card.img} alt={card.name} className="card-art-img" style={{ borderColor: card.color }} />
                      ) : (
                        <span className={isEmergency ? 'emergency-pulse-icon' : ''}>{card.icon}</span>
                      )}
                    </div>

                    <div className="loot-card-name" style={{ color: card.color }}>{card.name}</div>
                    <div className="loot-card-desc">{card.description}</div>

                    {isEmergency && (
                      <div className="emergency-reward-badge">
                        💖 +35 HP &nbsp;|&nbsp; 🛡️ +25 Armor
                      </div>
                    )}
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
