import React from 'react';
import GameBoard from './components/GameBoard/GameBoard';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">MEMORY CARD BATTLE</h1>
        <p className="app-subtitle">Cyberfantasy Edition - 1vs1 Battle System</p>
      </header>

      <main className="app-main">
        <GameBoard />
      </main>

      <footer className="app-footer">
        <p>Memory Card Battle &copy; 2026 | Dibuat oleh <strong>Ajizzhx</strong> untuk Percobaan Proyek</p>
      </footer>
    </div>
  );
}

export default App;
