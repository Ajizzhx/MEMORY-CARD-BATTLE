import React from 'react';
import { t } from '../../utils/i18n';
import './PlayerStatus.css';

const PlayerStatus = ({ player, enemy, playerMatches = 0, enemyMatches = 0, currentTurn, difficultyName }) => {
  const playerHpPct = Math.max(0, Math.min(100, (player.hp / player.maxHp) * 100));
  const enemyHpPct = Math.max(0, Math.min(100, (enemy.hp / enemy.maxHp) * 100));

  return (
    <div className="player-status-container glass-panel">
      {/* Baris Atas: Turn Badge & Indikator Kesulitan AI */}
      <div className="status-center-badge">
        <div className={`turn-badge ${currentTurn === 'PLAYER' ? 'player' : 'enemy'}`}>
          <span className="turn-pulse-dot" />
          {currentTurn === 'PLAYER' ? t('turn_player_banner') : t('turn_enemy_banner')}
        </div>
        {difficultyName && (
          <div className="difficulty-tag" title={`${t('ai_mode_label')} ${difficultyName}`}>
            {t('ai_badge')} {difficultyName}
          </div>
        )}
      </div>

      {/* Baris Utama: Entity Cards Pemain & Musuh */}
      <div className="player-status-entities">
        {/* Player Entity */}
        <div className={`entity-card player ${currentTurn === 'PLAYER' ? 'active-turn' : ''}`}>
          <div className="entity-avatar player-avatar">
            <img src="/assets/avatars/avatar_player.png" alt={player.name} className="avatar-img" />
          </div>
          <div className="entity-info">
            <div className="entity-header">
              <span className="entity-name" title={player.name}>{player.name}</span>
              {player.block > 0 && <span className="entity-block">🛡️ {player.block}</span>}
            </div>
            <div className="hp-bar-bg">
              <div
                className={`hp-bar-fill ${playerHpPct <= 30 ? 'low' : ''}`}
                style={{ width: `${playerHpPct}%` }}
              />
            </div>
            <div className="hp-text">
              <span>HP <strong>{player.hp}/{player.maxHp}</strong></span>
              <span className="entity-matches" title="Total Match Pemain">{t('matches_count', { count: playerMatches })}</span>
            </div>
          </div>
        </div>

        {/* Enemy Entity */}
        <div className={`entity-card enemy ${currentTurn === 'ENEMY' ? 'active-turn' : ''}`}>
          <div className="entity-info">
            <div className="entity-header">
              <span className="entity-name" title={enemy.name}>{enemy.name}</span>
              {enemy.block > 0 && <span className="entity-block">🛡️ {enemy.block}</span>}
            </div>
            <div className="hp-bar-bg">
              <div
                className={`hp-bar-fill enemy ${enemyHpPct <= 30 ? 'low' : ''}`}
                style={{ width: `${enemyHpPct}%` }}
              />
            </div>
            <div className="hp-text">
              <span>HP <strong>{enemy.hp}/{enemy.maxHp}</strong></span>
              <span className="entity-matches enemy-matches" title="Total Match Musuh">{t('matches_count', { count: enemyMatches })}</span>
            </div>
          </div>
          <div className="entity-avatar enemy-avatar">
            {enemy.avatarImg ? (
              <img src={enemy.avatarImg} alt={enemy.name} className="avatar-img" />
            ) : (
              enemy.avatar || '🤖'
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerStatus;
