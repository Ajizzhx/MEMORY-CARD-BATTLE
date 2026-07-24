import React from 'react';
import { t } from '../../utils/i18n';
import './ResetConfirmModal.css';

const ResetConfirmModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="reset-confirm-modal glass-panel">
        <h2 className="reset-title">{t('reset_title')}</h2>
        <p className="reset-desc">{t('reset_desc')}</p>

        <div className="reset-actions">
          <button className="confirm-btn" onClick={onConfirm}>
            {t('confirm_reset_btn')}
          </button>
          <button className="cancel-btn" onClick={onCancel}>
            {t('cancel_btn')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetConfirmModal;
