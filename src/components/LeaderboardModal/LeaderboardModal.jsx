import React, { useState, useEffect } from 'react';
import { fetchTopScores, formatRelativeTime } from '../../utils/leaderboardService';
import './LeaderboardModal.css';

const MEDAL = ['🥇', '🥈', '🥉'];

const LeaderboardModal = ({ leaderboard, currentPlayerName, onClose }) => {
  const [activeTab, setActiveTab] = useState('online');
  const [onlineScores, setOnlineScores] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  // Fetch online scores saat tab online aktif
  useEffect(() => {
    if (activeTab !== 'online') return;

    setIsLoading(true);
    setFetchError(null);

    fetchTopScores(25)
      .then((data) => {
        setOnlineScores(data || []);
      })
      .catch((err) => {
        setFetchError('Gagal memuat data. Periksa koneksi internet Anda.');
        console.error('[LeaderboardModal]', err);
      })
      .finally(() => setIsLoading(false));
  }, [activeTab]);

  return (
    <div className="modal-overlay">
      <div className="leaderboard-modal-content glass-panel">
        <h2 className="leaderboard-title">🏆 LEADERBOARD</h2>

        {/* Tab Selector */}
        <div className="lb-tabs">
          <button
            className={`lb-tab-btn ${activeTab === 'online' ? 'active' : ''}`}
            onClick={() => setActiveTab('online')}
          >
            🌐 Global Online
          </button>
          <button
            className={`lb-tab-btn ${activeTab === 'local' ? 'active' : ''}`}
            onClick={() => setActiveTab('local')}
          >
            📱 Sesi Ini
          </button>
        </div>

        {/* ── ONLINE TAB ── */}
        {activeTab === 'online' && (
          <div className="lb-online-container">
            <p className="app-subtitle">Top 10 Pemain Terbaik Dunia — Memory Card Battle</p>

            {isLoading && (
              <div className="lb-loading">
                <div className="lb-spinner" />
                <span>Memuat data leaderboard online...</span>
              </div>
            )}

            {fetchError && !isLoading && (
              <div className="lb-error">
                ⚠️ {fetchError}
                <button
                  className="lb-retry-btn"
                  onClick={() => {
                    setActiveTab('local');
                    setTimeout(() => setActiveTab('online'), 50);
                  }}
                >
                  Coba Lagi
                </button>
              </div>
            )}

            {!isLoading && !fetchError && (
              <table className="leaderboard-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Pemain</th>
                    <th>AI</th>
                    <th>Stage</th>
                    <th>Match</th>
                    <th>Waktu</th>
                  </tr>
                </thead>
                <tbody>
                  {onlineScores.length === 0 ? (
                    <tr>
                      <td colSpan="6" style={{ textAlign: 'center', padding: '20px', color: 'var(--color-text-muted)' }}>
                        Belum ada skor. Jadilah yang pertama! 🚀
                      </td>
                    </tr>
                  ) : (
                    onlineScores.map((item, index) => {
                      const isMe = item.name === currentPlayerName;
                      return (
                        <tr key={index} className={isMe ? 'my-score-row' : ''}>
                          <td className="rank-badge">
                            {index < 3 ? MEDAL[index] : `#${index + 1}`}
                          </td>
                          <td style={{ fontWeight: 700 }}>
                            {item.name}
                            {isMe && <span className="me-badge">YOU</span>}
                          </td>
                          <td>
                            <span className="diff-pill-badge">{item.difficulty || 'Otomatis'}</span>
                          </td>
                          <td style={{ color: 'var(--color-primary)', fontWeight: 800 }}>
                            Stage {item.stage}
                          </td>
                          <td>{item.total_matches}</td>
                          <td className="time-cell">
                            {item.created_at ? formatRelativeTime(item.created_at) : '-'}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* ── LOCAL/SESSION TAB ── */}
        {activeTab === 'local' && (
          <div>
            <p className="app-subtitle">Skor terbaik Anda pada sesi bermain saat ini:</p>
            <table className="leaderboard-table">
              <thead>
                <tr>
                  <th>Peringkat</th>
                  <th>Nama Pemain</th>
                  <th>Kesulitan AI</th>
                  <th>Stage Tertinggi</th>
                  <th>Total Match</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', padding: '20px', color: 'var(--color-text-muted)' }}>
                      Belum ada catatan skor. Jadilah yang pertama!
                    </td>
                  </tr>
                ) : (
                  leaderboard.map((item, index) => (
                    <tr key={index}>
                      <td className="rank-badge">#{index + 1}</td>
                      <td style={{ fontWeight: 700 }}>{item.name}</td>
                      <td>
                        <span className="diff-pill-badge">{item.difficulty || 'Otomatis'}</span>
                      </td>
                      <td style={{ color: 'var(--color-primary)', fontWeight: 800 }}>
                        Stage {item.stage}
                      </td>
                      <td>{item.totalMatches} Pasangan</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        <button className="close-modal-btn" onClick={onClose}>
          Tutup Leaderboard
        </button>
      </div>
    </div>
  );
};

export default LeaderboardModal;
