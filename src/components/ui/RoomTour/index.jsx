import React, { useState, useEffect } from 'react'
import useStore from '@stores/useStore'
import styles from './RoomTour.module.css'

const HINTS = [
  { id: 'arcade', icon: '🕹️', label: 'ARCADE MACHINE', desc: 'Projects & Experience + Playable Game' },
  { id: 'vinyl', icon: '💿', label: 'VINYL JUKEBOX', desc: 'Wall Turntable & Spotify Player' },
  { id: 'bookshelf', icon: '📚', label: 'BOOKSHELF', desc: 'About Me & Skills' },
  { id: 'trophy', icon: '🏆', label: 'TROPHY SHELF', desc: 'Achievements' },
  { id: 'chair', icon: '🪑', label: 'GAMING CHAIR', desc: 'Drag to rotate' },
]

function RoomTour() {
  const { tourComplete, completeTour } = useStore()
  const [step, setStep] = useState(0)
  const [dismissed, setDismissed] = useState(false)

  const handleSkip = () => {
    completeTour()
    setDismissed(true)
  }

  if (tourComplete || dismissed) return null

  if (step === 0) {
    return (
      <div className={styles.welcomeOverlay} role="dialog" aria-label="Welcome tour">
        <div className={styles.welcomeBox}>
          <p className={styles.welcomeTitle}>Welcome to my workspace.</p>
          <p className={styles.welcomeSub}>Explore the room to discover my work.</p>
          <div className={styles.welcomeActions}>
            <button className={styles.primaryBtn} onClick={() => setStep(1)}>
              Show me around
            </button>
            <button className={styles.skipBtn} onClick={handleSkip}>
              Skip Tour
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.hintsContainer} aria-label="Room hints">
      <div className={styles.hintsHeader}>
        <span className={styles.hintsTitle}>Explore the room</span>
        <button className={styles.skipBtn} onClick={handleSkip}>Got it</button>
      </div>
      <div className={styles.hintsList}>
        {HINTS.map((hint) => (
          <div key={hint.id} className={styles.hint}>
            <span className={styles.hintIcon}>{hint.icon}</span>
            <div>
              <p className={styles.hintLabel}>{hint.label}</p>
              <p className={styles.hintDesc}>{hint.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RoomTour
