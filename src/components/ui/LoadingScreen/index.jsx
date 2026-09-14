import React, { useEffect, useRef, useState } from 'react'
import { useProgress } from '@react-three/drei'
import styles from './LoadingScreen.module.css'

function LoadingScreen({ minimal = false }) {
  const { progress, active } = useProgress()
  const [dots, setDots] = useState('')
  const [show, setShow] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(d => d.length >= 3 ? '' : d + '.')
    }, 400)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (!active && progress >= 100) {
      const timer = setTimeout(() => setShow(false), 600)
      return () => clearTimeout(timer)
    }
  }, [active, progress])

  if (!show && !minimal) return null

  return (
    <div className={styles.overlay} aria-live="polite" aria-label="Loading portfolio">
      <div className={styles.content}>
        <div className={styles.logoMark}>
          <span className={styles.logoLetter}>S</span>
        </div>

        <h1 className={styles.name}>SATVIK PRAJAPATI</h1>
        <p className={styles.role}>GAME DEVELOPER</p>

        <div className={styles.loadingRow}>
          <span className={styles.loadingText}>Loading World{dots}</span>
          <span className={styles.progressNum}>{Math.round(progress)}%</span>
        </div>

        <div className={styles.progressTrack} role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
          <div className={styles.progressFill} style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className={styles.particles}>
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} className={styles.particle} style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
          }} />
        ))}
      </div>
    </div>
  )
}

export default LoadingScreen
