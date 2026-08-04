import React, { useState, useEffect } from 'react';
import { fetchTopScores, fetchBossScores, formatRelativeTime } from '../../utils/leaderboardService';
import { t } from '../../utils/i18n';
import './LeaderboardModal.css';

const MEDAL = ['🥇', '🥈', '🥉'];

const LeaderboardModal = ({ leaderboard, currentPlayerName, onClose, currentLang = 'ID' }) => {
  const [activeTab, setActiveTab] = useState('online');
  const [onlineScores, setOnlineScores] = useState([]);
  const [bossLeaderboard, setBossLeaderboard] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  // Fetch RPG online scores
  useEffect(() => {
    if (activeTab !== 'online') return;

    setIsLoading(true);
    setFetchError(null);

    fetchTopScores(10)
      .then((data) => {
        setOnlineScores((data || []).slice(0, 10));
      })
      .catch((err) => {
        setFetchError(t('globalLBError', currentLang));
        console.error('[LeaderboardModal]', err);
      })
      .finally(() => setIsLoading(false));
  }, [activeTab, currentLang]);

  // Fetch Boss online scores (with local fallback)
  useEffect(() => {
    if (activeTab !== 'boss') return;

    setIsLoading(true);
    setFetchError(null);

    fetchBossScores(10)
      .then((data) => {
        if (data && data.length > 0) {
          setBossLeaderboard(data.slice(0, 10));
        } else {
          // Fallback ke local storage jika belum ada skor global
          const savedBoss = localStorage.getItem('memory_boss_leaderboard');
          if (savedBoss) {
            try {
              setBossLeaderboard(JSON.parse(savedBoss));
            } catch (e) {
              setBossLeaderboard([]);
            }
          } else {
            setBossLeaderboard([]);
          }
        }
      })
      .catch((err) => {
        // Fallback ke local storage jika offline/error
        const savedBoss = localStorage.getItem('memory_boss_leaderboard');
        if (savedBoss) {
          try {
            setBossLeaderboard(JSON.parse(savedBoss));
          } catch (e) {
            setFetchError(t('globalLBError', currentLang));
          }
        } else {
          setFetchError(t('globalLBError', currentLang));
        }
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
            className={`lb-tab-btn ${activeTab === 'boss' ? 'active' : ''}`}
            onClick={() => setActiveTab('boss')}
          >
            {t('tabBossGlobal', currentLang)}
          </button>
        </div>

        {/* ── ONLINE TAB ── */}
        {activeTab === 'online' && (
          <div className="lb-online-container">
            <p className="app-subtitle">
              {t('globalLBSub', currentLang)}
            </p>

            {isLoading && (
              <div className="lb-loading">
                <div className="lb-spinner" />
                <span>{t('globalLBLoading', currentLang)}</span>
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
                  {t('globalLBRetry', currentLang)}
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
                    onlineScores.slice(0, 10).map((item, index) => {
                      const isMe = item.name === currentPlayerName;
                      return (
                        <tr key={item.id || index} className={`${index === 0 ? 'top-1' : ''} ${isMe ? 'my-rank-row' : ''}`}>
                          <td className="rank-cell">
                            {MEDAL[index] || index + 1}
                          </td>
                          <td className="player-cell">
                            {item.name}
                            {isMe && <span className="you-badge"> ({t('youPill', currentLang)})</span>}
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

        {/* ── BOSS TAB ── */}
        {activeTab === 'boss' && (
          <div className="lb-online-container">
            <p className="app-subtitle">
              {t('globalBossLBSub', currentLang)}
            </p>

            {isLoading && (
              <div className="lb-loading">
                <div className="lb-spinner" />
                <span>{t('globalLBLoading', currentLang)}</span>
              </div>
            )}

            {fetchError && !isLoading && (
              <div className="lb-error">
                ⚠️ {fetchError}
                <button
                  className="lb-retry-btn"
                  onClick={() => {
                    setActiveTab('online');
                    setTimeout(() => setActiveTab('boss'), 50);
                  }}
                >
                  {t('globalLBRetry', currentLang)}
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
                    <th>{t('thTime', currentLang)}</th>
                    <th>{t('thMatches', currentLang)}</th>
                    <th>{t('thDate', currentLang)}</th>
                  </tr>
                </thead>
                <tbody>
                  {bossLeaderboard.length === 0 ? (
                    <tr>
                      <td colSpan="6" style={{ textAlign: 'center', padding: '20px', color: 'var(--color-text-muted)' }}>
                        {t('noBossData', currentLang)} 🚀
                      </td>
                    </tr>
                  ) : (
                    bossLeaderboard.slice(0, 10).map((item, index) => {
                      const isMe = item.name === currentPlayerName;
                      const ms = item.elapsed_ms || item.elapsedMs || 0;
                      const minutes = Math.floor(ms / 60000);
                      const seconds = ((ms % 60000) / 1000).toFixed(1);
                      return (
                        <tr key={item.id || index} className={`${index === 0 ? 'top-1' : ''} ${isMe ? 'my-rank-row' : ''}`}>
                          <td className="rank-cell">{MEDAL[index] || index + 1}</td>
                          <td className="player-cell">
                            {item.name}
                            {isMe && <span className="you-badge"> ({t('youPill', currentLang)})</span>}
                          </td>
                          <td>
                            <span className="lb-diff-badge">{item.difficulty || 'Auto'}</span>
                          </td>
                          <td className="time-cell">{minutes}:{seconds.padStart(4, '0')}</td>
                          <td className="matches-cell">{item.total_matches ?? item.totalMatches}</td>
                          <td className="time-cell">{formatRelativeTime(item.created_at)}</td>
                        </tr>
                      )
                    })
                  )}
                </tbody>
              </table>
            )}
          </div>
        )}

        <button className="close-modal-btn" onClick={onClose}>
          {t('closeLeaderboardBtn', currentLang)}
        </button>
      </div>
    </div>
  );
};

export default LeaderboardModal;
