import React, { useRef, useEffect } from 'react';
import { t } from '../../utils/i18n';
import './LogModal.css';

const LogModal = ({ logs, onClose, currentLang = 'ID' }) => {
  const logContainerRef = useRef(null);

  // Auto-scroll to bottom when new logs are added
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="modal-overlay">
      <div className="log-modal-content glass-panel">
        <h2 className="app-title">{t('logTitle', currentLang)}</h2>
        <p className="app-subtitle">{t('logSub', currentLang)}</p>

        <div className="log-list-container" ref={logContainerRef}>
          {logs.length === 0 ? (
            <div className="log-empty">
              {t('logEmpty', currentLang)}
            </div>
          ) : (
            logs.map((log, index) => {
              const isPlayer = log.actor === 'PLAYER';
              return (
                <div key={index} className={`log-item ${isPlayer ? 'log-player' : 'log-enemy'}`}>
                  <span className="log-time">[{log.time}]</span>
                  <span className="log-actor">
                    {isPlayer ? '🟦 ' : '🟥 '}
                    <strong>{log.actorName}</strong>
                  </span>
                  <span className="log-message">{log.message}</span>
                  {log.details && (
                    <div className="log-details">↳ {log.details}</div>
                  )}
                </div>
              );
            })
          )}
        </div>

        <button className="close-modal-btn" onClick={onClose}>
          {t('closeLogBtn', currentLang)}
        </button>
      </div>
    </div>
  );
};

export default LogModal;
