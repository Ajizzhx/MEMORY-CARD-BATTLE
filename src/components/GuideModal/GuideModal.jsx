import React from 'react';
import './GuideModal.css';

const GuideModal = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="guide-modal-content glass-panel" style={{ position: 'relative' }}>
        <button className="modal-close-icon-btn" onClick={onClose} title="Tutup Buku Panduan">
          ✕
        </button>
        <h2 className="guide-modal-title">📖 BUKU PANDUAN GAME</h2>
        <p className="app-subtitle">Panduan Lengkap Alur Permainan, Aturan Arena, Fitur Pertolongan, &amp; Musuh AI:</p>

        <div className="guide-modal-body">
          {/* Section 1: Alur & Cara Bermain */}
          <div className="guide-section">
            <h3 className="guide-heading">⚔️ Alur &amp; Cara Bermain</h3>
            <div className="guide-steps-grid">
              <div className="guide-step-card">
                <div className="step-number">1</div>
                <div className="step-content">
                  <strong>Pilih Nama &amp; Mode AI:</strong>
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
                  <strong>Giliran Ekstra &amp; Batas Waktu 15 Detik:</strong>
                  <p>Pemain yang berhasil mencocokkan kartu mendapatkan giliran tambahan. Jika kartu tidak cocok atau waktu 15 detik habis, giliran berpindah ke lawan.</p>
                </div>
              </div>

              <div className="guide-step-card">
                <div className="step-number">4</div>
                <div className="step-content">
                  <strong>Hadiah Kartu &amp; Stage Baru:</strong>
                  <p>Kalahkan musuh untuk memilih 1 Kartu Hadiah baru yang belum Anda miliki dan lanjut bertualang ke Stage berikutnya!</p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Aturan Papan & Arena */}
          <div className="guide-section">
            <h3 className="guide-heading">🎲 Aturan Papan &amp; Arena Pertarungan</h3>
            <div className="guide-rules-list">
              <div className="rule-item">
                <strong>1. Papan Arena 4x4 (16 Kartu / 8 Pasang):</strong>
                <p>Di setiap stage, arena memilih 8 jenis kartu dari koleksi Deck Anda untuk membentuk 8 pasang kartu tertutup (total 16 kartu di papan).</p>
              </div>
              <div className="rule-item">
                <strong>2. Arena Milik Bersama (Shared Board):</strong>
                <p>Kartu hadiah yang Anda dapatkan dimasukkan ke Deck Anda. Namun saat bertarung, siapa pun yang berhasil mencocokkan kartu di papan (Pemain maupun Musuh AI) dialah yang memperoleh efek dari kartu tersebut!</p>
              </div>
              <div className="rule-item">
                <strong>3. Kelengkapan Kartu (15 Kartu Katalog):</strong>
                <p>Anda memulai perjalanan dengan 8 kartu awal dan dapat melengkapi seluruh 15 kartu katalog saat berhasil menaklukkan stage demi stage.</p>
              </div>
            </div>
          </div>

          {/* Section 3: Fitur Pertolongan & Medkit Darurat */}
          <div className="guide-section pity-section">
            <h3 className="guide-heading">🚑 Fitur Pertolongan &amp; Medkit Darurat (Maksimal 2x Pemakaian)</h3>
            <p className="pity-explanation">
              Jika HP Anda berada di bawah 50% atau mengalami kegagalan cocok 3 kali berturut-turut, <strong>Fitur Pertolongan Aktif!</strong>
              <br />
              Di layar Hadiah Kelulusan Stage, akan terbuka <strong>Opsi Ke-4: 🚑 Bio-Shield Medkit</strong> (+35 HP &amp; +25 Perisai instan).
              <br />
              <strong>⚠️ Kuota Medkit Darurat:</strong> Penggunaan Medkit Darurat <strong>dibatasi maksimal 2 kali</strong> sepanjang satu perjalanan bertarung. Jika kuota 2 kali sudah habis terpakai, opsi ini tidak akan muncul lagi.
              <br />
              <em>Pertimbangan Strategi: Mengambil Medkit akan menyelamatkan HP Anda, namun Anda tidak memperoleh kartu baru sehingga penambahan koleksi kartu katalog Anda berjalan lebih lambat.</em>
            </p>
          </div>

          {/* Section 4: Musuh AI per Stage */}
          <div className="guide-section">
            <h3 className="guide-heading">👾 Musuh AI Berdasarkan Stage</h3>
            <div className="enemy-guide-grid">
              <div className="enemy-guide-card">
                <div className="enemy-avatar-wrapper">
                  <img src="/assets/avatars/avatar_scout.png" alt="Cyber Scout" className="enemy-guide-img" />
                </div>
                <div className="enemy-info">
                  <strong>Stage 1: Cyber Scout</strong>
                  <span className="enemy-hp">HP: 70 | Kesulitan: Mudah (Memori 35%)</span>
                  <p>Musuh pengintai dasar untuk pemanasan pemain baru.</p>
                </div>
              </div>
              <div className="enemy-guide-card">
                <div className="enemy-avatar-wrapper">
                  <img src="/assets/avatars/avatar_golem.png" alt="Cybergolem" className="enemy-guide-img" />
                </div>
                <div className="enemy-info">
                  <strong>Stage 2: Cybergolem</strong>
                  <span className="enemy-hp">HP: 90 | Kesulitan: Sedang (Memori 65%)</span>
                  <p>Robot Golem tangguh dengan pertahanan HP &amp; Perisai yang lebih tebal.</p>
                </div>
              </div>
              <div className="enemy-guide-card">
                <div className="enemy-avatar-wrapper">
                  <img src="/assets/avatars/avatar_spectre.png" alt="Neon Spectre" className="enemy-guide-img" />
                </div>
                <div className="enemy-info">
                  <strong>Stage 3: Neon Spectre</strong>
                  <span className="enemy-hp">HP: 110 | Kesulitan: Sedang (Memori 65%)</span>
                  <p>Hantu cyber lincah yang mulai mengingat posisi kartu dengan akurat.</p>
                </div>
              </div>
              <div className="enemy-guide-card">
                <div className="enemy-avatar-wrapper">
                  <img src="/assets/avatars/avatar_warlord.png" alt="Aether Warlord" className="enemy-guide-img" />
                </div>
                <div className="enemy-info">
                  <strong>Stage 4: Aether Warlord</strong>
                  <span className="enemy-hp">HP: 140 | Kesulitan: Tinggi (Memori 88%)</span>
                  <p>Panglima perang kosmik dengan HP tebal &amp; daya serang yang mematikan.</p>
                </div>
              </div>
              <div className="enemy-guide-card boss">
                <div className="enemy-avatar-wrapper boss">
                  <img src="/assets/avatars/avatar_dragon.svg" alt="Abyss Omega" className="enemy-guide-img" />
                </div>
                <div className="enemy-info">
                  <strong>Stage 5+: Abyss Omega (Bos Akhir)</strong>
                  <span className="enemy-hp">HP: 150+ (Meningkat per Stage) | Kesulitan: Bos Akhir</span>
                  <p>Naga Cyber legendaris dalam arena pertarungan tanpa akhir!</p>
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
