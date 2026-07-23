import React from 'react';
import './LeaderboardModal.css';

const LeaderboardModal = ({ leaderboard, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="leaderboard-modal-content glass-panel">
        <h2 className="leaderboard-title">🏆 SESSION LEADERBOARD</h2>
        <p className="app-subtitle">Pemain dengan Stage Tertinggi pada Sesi Ini:</p>

        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Peringkat</th>
              <th>Nama Pemain</th>
              <th>Stage Tertinggi</th>
              <th>Total Match</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.length === 0 ? (
              <tr>
                <td colSpan="4">Belum ada catatan skor. Jadilah yang pertama!</td>
              </tr>
            ) : (
              leaderboard.map((item, index) => (
                <tr key={index}>
                  <td className="rank-badge">#{index + 1}</td>
                  <td style={{ fontWeight: 700 }}>{item.name}</td>
                  <td style={{ color: 'var(--color-primary)', fontWeight: 800 }}>Stage {item.stage}</td>
                  <td>{item.totalMatches} Pasangan</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <button className="close-modal-btn" onClick={onClose}>
          Tutup Leaderboard
        </button>
      </div>
    </div>
  );
};

export default LeaderboardModal;
