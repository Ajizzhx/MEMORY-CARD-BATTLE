import React from 'react';
import './ResetConfirmModal.css';

const ResetConfirmModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="reset-confirm-modal glass-panel">
        <div className="reset-modal-header">
          <span className="reset-icon-warning">⚠️</span>
          <h3>Konfirmasi Reset Perjalanan</h3>
        </div>

        <p className="reset-modal-text">
          Apakah Anda yakin ingin mereset permainan saat ini?
          <br />
          <span className="reset-subtext">
            Seluruh progres kartu dan stage akan dihapus dan Anda akan kembali ke <strong>Dashboard Pembuatan Nama</strong>.
          </span>
        </p>

        <div className="reset-modal-actions">
          <button className="reset-btn-cancel" onClick={onCancel}>
            ❌ Batal
          </button>
          <button className="reset-btn-confirm" onClick={onConfirm}>
            🔄 Ya, Reset Perjalanan
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetConfirmModal;
