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

        <h2 className="reset-confirm-title">{t('resetTitle', currentLang)}</h2>

        <p className="reset-confirm-body">
          {t('resetBody', currentLang)}
        </p>

        <div className="reset-confirm-actions">
          <button className="reset-action-btn cancel" onClick={onCancel}>
            {t('resetCancelBtn', currentLang)}
          </button>
          <button className="reset-action-btn confirm" onClick={onConfirm}>
            {t('resetConfirmBtn', currentLang)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetConfirmModal;
