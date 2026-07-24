import React, { useState, useEffect } from 'react';
import { fetchTopScores } from '../../utils/leaderboardService';
import { soundManager } from '../../utils/soundSystem';
import { t } from '../../utils/i18n';
import './LeaderboardModal.css';

const LeaderboardModal = ({ leaderboard = [], currentPlayerName = '', onClose }) => {
  const [activeTab, setActiveTab] = useState('GLOBAL');
  const [globalScores, setGlobalScores] = useState([]);
  const [isLoadingGlobal, setIsLoadingGlobal] = useState(false);
  const [globalError, setGlobalError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadGlobal = async () => {
      setIsLoadingGlobal(true);
      setGlobalError(null);
      try {
        const data = await fetchTopScores();
        if (isMounted) {
          setGlobalScores(data || []);
          setIsLoadingGlobal(false);
        }
      } catch (err) {
        if (isMounted) {
          setGlobalError('Gagal memuat papan skor online.');
          setIsLoadingGlobal(false);
        }
      }
    };

    if (activeTab === 'GLOBAL') {
      loadGlobal();
    }

    return () => { isMounted = false; };
  }, [activeTab]);

  return (
    <div className="modal-overlay">
      <div className="leaderboard-modal-content glass-panel" style={{ position: 'relative' }}>
        <button className="modal-close-icon-btn" onClick={onClose} title="Tutup Leaderboard">
          ✕
        </button>

        <h2 className="leaderboard-title">{t('lb_title')}</h2>

        <div className="leaderboard-tabs">
          <button
            className={`tab-btn ${activeTab === 'GLOBAL' ? 'active' : ''}`}
            onClick={() => {
              soundManager.playClickSFX();
              setActiveTab('GLOBAL');
            }}
          >
            {t('tab_global')}
          </button>
          <button
            className={`tab-btn ${activeTab === 'SESSION' ? 'active' : ''}`}
            onClick={() => {
              soundManager.playClickSFX();
              setActiveTab('SESSION');
            }}
          >
            {t('tab_session')}
          </button>
        </div>

        {activeTab === 'GLOBAL' ? (
          <div className="leaderboard-table-container">
            {isLoadingGlobal ? (
              <div className="loading-state">
                <span className="spinner">⏳</span> Memuat Topskor Online...
              </div>
            ) : globalError ? (
              <div className="error-state">⚠️ {globalError}</div>
            ) : globalScores.length === 0 ? (
              <div className="empty-state">{t('empty_global')}</div>
            ) : (
              <table className="leaderboard-table">
                <thead>
                  <tr>
                    <th>{t('col_rank')}</th>
                    <th>{t('col_name')}</th>
                    <th>{t('col_diff')}</th>
                    <th>{t('col_stage')}</th>
                    <th>{t('col_matches')}</th>
                  </tr>
                </thead>
                <tbody>
                  {globalScores.map((entry, index) => {
                    const isSelf = currentPlayerName && entry.player_name?.toLowerCase() === currentPlayerName.toLowerCase();
                    return (
                      <tr key={entry.id || index} className={isSelf ? 'highlight-self' : ''}>
                        <td className="rank-col">
                          {index === 0 && '🥇'}
                          {index === 1 && '🥈'}
                          {index === 2 && '🥉'}
                          {index > 2 && `#${index + 1}`}
                        </td>
                        <td className="name-col">{entry.player_name || 'Cyber Hero'}</td>
                        <td className="diff-col">{entry.difficulty_mode || 'Auto'}</td>
                        <td className="stage-col">Stage {entry.stage_reached}</td>
                        <td className="match-col">✨ {entry.total_matches}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        ) : (
          <div className="leaderboard-table-container">
            {leaderboard.length === 0 ? (
              <div className="empty-state">{t('empty_session')}</div>
            ) : (
              <table className="leaderboard-table">
                <thead>
                  <tr>
                    <th>{t('col_rank')}</th>
                    <th>{t('col_name')}</th>
                    <th>{t('col_diff')}</th>
                    <th>{t('col_stage')}</th>
                    <th>{t('col_matches')}</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((entry, index) => (
                    <tr key={index}>
                      <td className="rank-col">#{index + 1}</td>
                      <td className="name-col">{entry.name}</td>
                      <td className="diff-col">{entry.difficulty || 'Auto'}</td>
                      <td className="stage-col">Stage {entry.stage}</td>
                      <td className="match-col">✨ {entry.totalMatches}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        <button className="close-modal-btn" onClick={onClose}>
          {t('close_scores_btn')}
        </button>
      </div>
    </div>
  );
};

export default LeaderboardModal;
