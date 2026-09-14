import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PacmanGame from '@components/games/PacmanGame'
import ExperienceOverlay from '@components/ui/ExperienceOverlay'
import { useAudio } from '@hooks/useAudio'
import styles from './ArcadePage.module.css'

export default function ArcadePage() {
  const navigate = useNavigate()
  const { playClick } = useAudio()
  const [overlayOpen, setOverlayOpen] = useState(false)

  const handleBackToRoom = () => {
    playClick()
    navigate('/world')
  }

  const handleExit = () => {
    playClick()
    navigate('/')
  }

  return (
    <div className={styles.page}>
      {/* Top Arcade Navigation Bar */}
      <header className={styles.topBar}>
        <div className={styles.barLeft}>
          <button className={styles.navBtn} onClick={handleBackToRoom}>
            <span>←</span> BACK TO ROOM
          </button>
        </div>

        <div className={styles.barCenter}>
          <button
            className={`${styles.navBtn} ${styles.projectsBtn}`}
            onClick={() => setOverlayOpen(true)}
          >
            ◈ VIEW EXPERIENCE &amp; PROJECTS
          </button>
        </div>

        <div className={styles.barRight}>
          <button className={`${styles.navBtn} ${styles.exitBtn}`} onClick={handleExit}>
            EXIT GAME ✕
          </button>
        </div>
      </header>

      {/* Main Arcade Viewport */}
      <main className={styles.cabinetScreen}>
        <PacmanGame
          onViewProjects={() => setOverlayOpen(true)}
          isPaused={overlayOpen}
        />
      </main>

      {/* Experience & Projects Overlay */}
      <ExperienceOverlay
        isOpen={overlayOpen}
        onClose={() => setOverlayOpen(false)}
      />
    </div>
  )
}
