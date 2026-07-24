import React, { useState, useEffect } from 'react';
import { fetchTopScores, formatRelativeTime } from '../../utils/leaderboardService';
import { t } from '../../utils/i18n';
import './LeaderboardModal.css';

const MEDAL = ['🥇', '🥈', '🥉'];

const LeaderboardModal = ({ leaderboard, currentPlayerName, onClose, currentLang = 'ID' }) => {
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
        setFetchError(currentLang === 'ID' ? 'Gagal memuat data. Periksa koneksi internet Anda.' : 'Failed to load leaderboard data. Check your internet connection.');
        console.error('[LeaderboardModal]', err);
      })
      .finally(() => setIsLoading(false));
  }, [activeTab, currentLang]);

  return (
    <div className="modal-overlay">
      <div className="leaderboard-modal-content glass-panel">
        <h2 className="leaderboard-title">{t('leaderboardTitle', currentLang)}</h2>

        {/* Tab Selector */}
        <div className="lb-tabs">
          <button
            className={`lb-tab-btn ${activeTab === 'online' ? 'active' : ''}`}
            onClick={() => setActiveTab('online')}
          >
            {t('tabGlobal', currentLang)}
          </button>
          <button
            className={`lb-tab-btn ${activeTab === 'local' ? 'active' : ''}`}
            onClick={() => setActiveTab('local')}
          >
            {t('tabSession', currentLang)}
          </button>
        </div>

        {/* ── ONLINE TAB ── */}
        {activeTab === 'online' && (
          <div className="lb-online-container">
            <p className="app-subtitle">
              {currentLang === 'ID' ? 'Top 10 Pemain Terbaik Dunia — Memory Card Battle' : 'Top 10 Players Worldwide — Memory Card Battle'}
            </p>

            {isLoading && (
              <div className="lb-loading">
                <div className="lb-spinner" />
                <span>{currentLang === 'ID' ? 'Memuat data leaderboard online...' : 'Loading global scores...'}</span>
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
                  {currentLang === 'ID' ? 'Coba Lagi' : 'Retry'}
                </button>
              </div>
            )}

            {!isLoading && !fetchError && (
              <table className="leaderboard-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>{t('thPlayer', currentLang)}</th>
                    <th>{t('thDiff', currentLang)}</th>
                    <th>{t('thStage', currentLang)}</th>
                    <th>{t('thMatches', currentLang)}</th>
                    <th>{t('thDate', currentLang)}</th>
                  </tr>
                </thead>
                <tbody>
                  {onlineScores.length === 0 ? (
                    <tr>
                      <td colSpan="6" style={{ textAlign: 'center', padding: '20px', color: 'var(--color-text-muted)' }}>
                        {t('noGlobalData', currentLang)} 🚀
                      </td>
                    </tr>
                  ) : (
                    onlineScores.map((item, index) => {
                      const isMe = item.name === currentPlayerName;
                      return (
                        <tr key={item.id || index} className={`${index === 0 ? 'top-1' : ''} ${isMe ? 'my-rank-row' : ''}`}>
                          <td className="rank-cell">
                            {MEDAL[index] || index + 1}
                          </td>
                          <td className="player-cell">
                            {item.name}
                            {isMe && <span className="you-badge"> ({currentLang === 'ID' ? 'Anda' : 'You'})</span>}
                          </td>
                          <td>
                            <span className="lb-diff-badge">{item.difficulty || '-'}</span>
                          </td>
                          <td className="stage-cell">Stage {item.stage}</td>
                          <td className="matches-cell">{item.total_matches ?? item.totalMatches}</td>
                          <td className="time-cell">{formatRelativeTime(item.created_at)}</td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* ── LOCAL TAB ── */}
        {activeTab === 'local' && (
          <table className="leaderboard-table">
            <thead>
              <tr>
                <th>#</th>
                <th>{t('thPlayer', currentLang)}</th>
                <th>{t('thDiff', currentLang)}</th>
                <th>{t('thStage', currentLang)}</th>
                <th>{t('thMatches', currentLang)}</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '20px', color: 'var(--color-text-muted)' }}>
                    {t('noSessionData', currentLang)}
                  </td>
                </tr>
              ) : (
                leaderboard.map((item, index) => (
                  <tr key={index} className={index === 0 ? 'top-1' : ''}>
                    <td className="rank-cell">{MEDAL[index] || index + 1}</td>
                    <td className="player-cell">{item.name}</td>
                    <td>
                      <span className="lb-diff-badge">{item.difficulty || 'Auto'}</span>
                    </td>
                    <td className="stage-cell">Stage {item.stage}</td>
                    <td className="matches-cell">{item.totalMatches}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}

        <button className="close-modal-btn" onClick={onClose}>
          {t('closeLeaderboardBtn', currentLang)}
        </button>
      </div>
    </div>
  );
};

export default LeaderboardModal;
