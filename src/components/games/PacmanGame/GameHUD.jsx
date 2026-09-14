import React from 'react'
import styles from './GameHUD.module.css'

export default function GameHUD({ score, highScore, lives, dotsLeft }) {
  return (
    <div className={styles.hudContainer}>
      <div className={styles.scoreBlock}>
        <span className={styles.label}>1UP</span>
        <span className={styles.value}>{score.toString().padStart(5, '0')}</span>
      </div>

      <div className={styles.scoreBlock}>
        <span className={styles.label}>HIGH SCORE</span>
        <span className={styles.value}>{highScore.toString().padStart(5, '0')}</span>
      </div>

      <div className={styles.livesBlock}>
        <span className={styles.label}>LIVES</span>
        <div className={styles.livesRow}>
          {Array.from({ length: Math.max(0, lives) }).map((_, i) => (
            <span key={i} className={styles.pacIcon}>ᗧ</span>
          ))}
        </div>
      </div>

      <div className={styles.dotsBlock}>
        <span className={styles.label}>PELLETS</span>
        <span className={styles.value}>{dotsLeft}</span>
      </div>
    </div>
  )
}
