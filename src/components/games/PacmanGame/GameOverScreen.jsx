import React from 'react'
import styles from './GameOverScreen.module.css'

export default function GameOverScreen({ status, score, onRestart, onViewProjects }) {
  const isWin = status === 'win'

  return (
    <div className={styles.overlay}>
      <div className={styles.dialog}>
        <h2 className={isWin ? styles.winTitle : styles.loseTitle}>
          {isWin ? '★ YOU WIN! ★' : 'GAME OVER'}
        </h2>

        <p className={styles.scoreText}>
          FINAL SCORE: <span className={styles.scoreVal}>{score}</span>
        </p>

        <p className={styles.message}>
          {isWin
            ? 'Awesome reflexes! You cleared the entire maze.'
            : 'Close run! Care to play again or explore my projects?'}
        </p>

        <div className={styles.btnRow}>
          <button className={styles.restartBtn} onClick={onRestart}>
            ↺ PLAY AGAIN
          </button>
          <button className={styles.projectsBtn} onClick={onViewProjects}>
            ◈ VIEW PROJECTS
          </button>
        </div>
      </div>
    </div>
  )
}
