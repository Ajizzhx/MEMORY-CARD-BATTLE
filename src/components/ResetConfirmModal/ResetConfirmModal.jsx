import React from 'react';
import { t } from '../../utils/i18n';
import './ResetConfirmModal.css';

const ResetConfirmModal = ({ onConfirm, onCancel, currentLang = 'ID' }) => {
  return (
    <div className="modal-overlay">
      <div className="reset-confirm-modal glass-panel" style={{ position: 'relative' }}>
        <button className="modal-close-icon-btn" onClick={onCancel} title={t('resetCancelBtn', currentLang)}>
          ✕
        </button>

        <div className="reset-modal-header">
          <span className="reset-icon-warning">⚠️</span>
          <h3>{t('resetTitle', currentLang)}</h3>
        </div>

        <p className="reset-modal-text">
          {t('resetBody', currentLang)}
        </p>

        <div className="reset-modal-actions">
          <button className="reset-btn-cancel" onClick={onCancel}>
            {t('resetCancelBtn', currentLang)}
          </button>
          <button className="reset-btn-confirm" onClick={onConfirm}>
            {t('resetConfirmBtn', currentLang)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetConfirmModal;
