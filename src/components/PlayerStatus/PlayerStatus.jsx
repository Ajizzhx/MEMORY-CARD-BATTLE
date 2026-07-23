import React from 'react';
import './PlayerStatus.css';

const PlayerStatus = ({ player, enemy, currentTurn, difficultyName }) => {
  const playerHpPct = Math.max(0, Math.min(100, (player.hp / player.maxHp) * 100));
  const enemyHpPct = Math.max(0, Math.min(100, (enemy.hp / enemy.maxHp) * 100));

  return (
    <div className="player-status-container glass-panel">
      {/* Player Entity */}
      <div className={`entity-card ${currentTurn === 'PLAYER' ? 'active-turn' : ''}`}>
        <div className="entity-avatar">🧙‍♂️</div>
        <div className="entity-info">
          <div className="entity-header">
            <span className="entity-name">{player.name}</span>
            {player.block > 0 && <span className="entity-block">🛡️ {player.block}</span>}
          </div>
          <div className="hp-bar-bg">
            <div
              className={`hp-bar-fill ${playerHpPct <= 30 ? 'low' : ''}`}
              style={{ width: `${playerHpPct}%` }}
            />
          </div>
          <div className="hp-text">
            HP: {player.hp} / {player.maxHp}
          </div>
        </div>
      </div>

      {/* Turn & Difficulty Badge */}
      <div className="status-center-badge">
        <div className={`turn-badge ${currentTurn === 'PLAYER' ? 'player' : 'enemy'}`}>
          {currentTurn === 'PLAYER' ? 'Giliran Pemain' : 'Giliran Musuh'}
        </div>
        {difficultyName && (
          <div className="difficulty-tag">
            🧠 AI: {difficultyName}
          </div>
        )}
      </div>

      {/* Enemy Entity */}
      <div className={`entity-card enemy ${currentTurn === 'ENEMY' ? 'active-turn' : ''}`}>
        <div className="entity-info">
          <div className="entity-header">
            <span className="entity-name">{enemy.name}</span>
            {enemy.block > 0 && <span className="entity-block">🛡️ {enemy.block}</span>}
          </div>
          <div className="hp-bar-bg">
            <div
              className={`hp-bar-fill ${enemyHpPct <= 30 ? 'low' : ''}`}
              style={{ width: `${enemyHpPct}%` }}
            />
          </div>
          <div className="hp-text">
            HP: {enemy.hp} / {enemy.maxHp}
          </div>
        </div>
        <div className="entity-avatar">🤖</div>
      </div>
    </div>
  );
};

export default PlayerStatus;
