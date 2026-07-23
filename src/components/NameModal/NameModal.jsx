import React, { useState } from 'react';
import './NameModal.css';

const NameModal = ({ onSubmitName }) => {
  const [nameInput, setNameInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nameInput.trim().length > 0) {
      onSubmitName(nameInput.trim());
    }
  };

  return (
    <div className="modal-overlay">
      <div className="name-modal-content glass-panel">
        <h2 className="app-title">MEMORY CARD BATTLE</h2>
        <p className="app-subtitle">Masukkan Nama Anda Sebelum Memulai Perjalanan Cyberfantasy:</p>

        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <input
            type="text"
            className="name-input-field"
            placeholder="Ketik Nama Pemain..."
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            maxLength={15}
            autoFocus
            required
          />

          <button type="submit" className="start-journey-btn" style={{ marginTop: '16px' }}>
            ⚔️ Mulai Pertarungan
          </button>
        </form>
      </div>
    </div>
  );
};

export default NameModal;
