import React from 'react';
import GameBoard from './components/GameBoard/GameBoard';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">MEMORY CARD BATTLE</h1>
        <p className="app-subtitle">Cyberfantasy Edition - 1vs1 Battle System Prototype</p>
      </header>

      <main className="app-main">
        <GameBoard />
      </main>

      <footer className="app-footer">
        <p>Fase 2: Prototipe Core Loop Papan Permainan</p>
      </footer>
    </div>
  );
}

export default App;
