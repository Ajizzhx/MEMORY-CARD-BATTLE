import React from 'react';
import './GuideModal.css';

const GuideModal = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="guide-modal-content glass-panel">
        <h2 className="guide-modal-title">📖 BUKU PANDUAN GAME</h2>
        <p className="app-subtitle">Panduan Lengkap Alur Permainan, Aturan Papan, Pity System, & Musuh AI:</p>

        <div className="guide-modal-body">
          {/* Section 1: Alur & Cara Bermain */}
          <div className="guide-section">
            <h3 className="guide-heading">⚔️ Alur & Cara Bermain</h3>
            <div className="guide-steps-grid">
              <div className="guide-step-card">
                <div className="step-number">1</div>
                <div className="step-content">
                  <strong>Pilih Nama & Mode AI:</strong>
                  <p>Ketik nama pemain dan pilih tingkat kecerdasan AI Musuh (Otomatis, Mudah 35%, Sedang 65%, atau Tinggi 88%).</p>
                </div>
              </div>

              <div className="guide-step-card">
                <div className="step-number">2</div>
                <div className="step-content">
                  <strong>Buka Pasangan Kartu di Papan:</strong>
                  <p>Di setiap giliran, klik 2 kartu tertutup di papan 4x4. Jika 2 kartu cocok (Match), efek kartu langsung aktif!</p>
                </div>
              </div>

              <div className="guide-step-card">
                <div className="step-number">3</div>
                <div className="step-content">
                  <strong>Giliran Ekstra & Batas Waktu 15 Detik:</strong>
                  <p>Pemain yang berhasil Match mendapatkan giliran tambahan. Jika Mismatch atau waktu 15 detik habis, giliran berpindah ke lawan.</p>
                </div>
              </div>

              <div className="guide-step-card">
                <div className="step-number">4</div>
                <div className="step-content">
                  <strong>Loot Hadiah & Roguelike Stage:</strong>
                  <p>Kalahkan musuh untuk klaim 1 kartu loot baru dari katalog yang belum dimiliki (Strict Non-Duplicate) dan lanjut ke Stage berikutnya!</p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Aturan Papan & Arena */}
          <div className="guide-section">
            <h3 className="guide-heading">🎲 Aturan Papan & Arena Pertarungan</h3>
            <div className="guide-rules-list">
              <div className="rule-item">
                <strong>1. Papan Arena 4x4 (16 Kartu / 8 Pasang Unik):</strong>
                <p>Di setiap stage, sistem mengambil 8 jenis kartu unik (tanpa duplikat jenis) dari Deck Anda dan membentuk 8 pasang (16 kartu tertutup).</p>
              </div>
              <div className="rule-item">
                <strong>2. Arena Milik Bersama (Shared Board):</strong>
                <p>Kartu Loot yang Anda dapatkan dimasukkan ke Deck Anda. Namun saat bertarung, siapa pun yang berhasil mencocokkan kartu di papan (Pemain maupun AI) dialah yang mendapatkan efek dari kartu tersebut!</p>
              </div>
              <div className="rule-item">
                <strong>3. Kelengkapan Kartu (15 Kartu Katalog):</strong>
                <p>Anda memulai dengan 8 kartu starter dan dapat melengkapi semua 15 kartu katalog saat berhasil mencapai Stage 7 Clear.</p>
              </div>
            </div>
          </div>

          {/* Section 3: Pity System & Bantuan Darurat */}
          <div className="guide-section pity-section">
            <h3 className="guide-heading">🚑 Pity System & Bantuan Darurat (Risk vs Reward)</h3>
            <p className="pity-explanation">
              Jika HP Anda &lt; 50% atau mengalami Mismatch 3x beruntun, <strong>Pity System Aktif!</strong>
              <br />
              Di layar Loot Stage Clear, terbuka <strong>Opsi Ke-4: 🚑 Bio-Shield Medkit</strong> (+35 HP &amp; +25 Armor instant).
              <br />
              <em>Dilema Strategi: Memilih Medkit menyelamatkan nyawa Anda, namun TIDAK mendapat kartu baru (+0 progresi) sehingga kelengkapan 15 kartu katalog akan bergeser ke Stage 8+.</em>
            </p>
          </div>

          {/* Section 4: Musuh AI per Stage */}
          <div className="guide-section">
            <h3 className="guide-heading">👾 Musuh AI Berdasarkan Stage</h3>
            <div className="enemy-guide-grid">
              <div className="enemy-guide-card">
                <span className="enemy-icon">🤖</span>
                <div className="enemy-info">
                  <strong>Stage 1: Cyber Scout</strong>
                  <span className="enemy-hp">HP: 70 | Kesulitan: Mudah (Memori 35%)</span>
                  <p>Musuh pengintai dasar untuk pemanasan pemain baru.</p>
                </div>
              </div>
              <div className="enemy-guide-card">
                <span className="enemy-icon">🦾</span>
                <div className="enemy-info">
                  <strong>Stage 2: Cybergolem</strong>
                  <span className="enemy-hp">HP: 90 | Kesulitan: Sedang (Memori 65%)</span>
                  <p>Robot Golem tangguh dengan pertahanan HP &amp; Block lebih tebal.</p>
                </div>
              </div>
              <div className="enemy-guide-card">
                <span className="enemy-icon">👻</span>
                <div className="enemy-info">
                  <strong>Stage 3: Neon Spectre</strong>
                  <span className="enemy-hp">HP: 110 | Kesulitan: Sedang (Memori 65%)</span>
                  <p>Hantu cyber lincah yang mulai mengingat posisi kartu dengan akurat.</p>
                </div>
              </div>
              <div className="enemy-guide-card">
                <span className="enemy-icon">👹</span>
                <div className="enemy-info">
                  <strong>Stage 4: Aether Warlord</strong>
                  <span className="enemy-hp">HP: 140 | Kesulitan: Tinggi (Memori 88%)</span>
                  <p>Panglima perang kosmik dengan HP tebal &amp; daya serang tinggi.</p>
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
        </div>

        <button className="close-modal-btn" onClick={onClose}>
          Tutup Buku Panduan
        </button>
      </div>
    </div>
  );
};

export default GuideModal;
