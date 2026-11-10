import React, { Suspense, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import useStore from '@stores/useStore'
import { useAudio } from '@hooks/useAudio'
import { isMobileDevice } from '@utils/webgl'
import GamingRoom from '@components/3d/Room/GamingRoom'
import CameraController from '@components/3d/Room/CameraController'
import InteractionPrompt from '@components/ui/InteractionPrompt'
import AboutModal from '@components/ui/AboutModal'
import AchievementModal from '@components/ui/AchievementModal'
import WhiteboardModal from '@components/ui/WhiteboardModal'
import StickyNotesModal from '@components/ui/StickyNotesModal'
import styles from './WorldPage.module.css'

const isMobile = isMobileDevice()

export default function WorldPage() {
  const {
    hoveredObject,
    activeModal,
    modalData,
    closeModal,
    qualitySettings,
    setIsMusicPlaying,
    setTourActive,
    setTourStep,
  } = useStore()

  const { stopBgm } = useAudio()

  // First time visitor: activate Byte's 3D tour after the camera entrance zoom completes
  useEffect(() => {
    const done = localStorage.getItem('sp-tour-complete') === '1'
    if (!done) {
      const timer = setTimeout(() => {
        setTourActive(true)
        setTourStep(0)
      }, 2100)
      return () => clearTimeout(timer)
    }
  }, [setTourActive, setTourStep])

  // Stop procedural room BGM when leaving the 3D room
  useEffect(() => {
    return () => {
      stopBgm()
    }
  }, [stopBgm])

  return (
    <div className={styles.worldContainer}>
      {/* Three.js R3F Canvas */}
      <Canvas
        className={styles.canvas}
        shadows={qualitySettings?.shadows ?? (!isMobile)}
        frameloop="always"
        dpr={isMobile ? [1, 1] : [1, Math.min(window.devicePixelRatio, 1.5)]}
        camera={{
          position: [0, 1.75, 2.6],
          fov: isMobile ? 55 : 48,
          near: 0.1,
          far: 15,
        }}
        gl={{
          antialias: !isMobile,
          powerPreference: 'high-performance',
          alpha: false,
          stencil: false,
          depth: true,
        }}
      >
        <Suspense fallback={null}>
          <CameraController />
          <GamingRoom />
        </Suspense>
      </Canvas>

      {/* Top Header / Breadcrumb */}
      <header className={styles.header}>
        <div className={styles.headerPill}>
          <span className={styles.statusDot}>●</span>
          <span className={styles.headerTitle}>SATVIK&apos;S WORKSPACE</span>
          <span className={styles.headerSub}>INTERACTIVE ROOM</span>
        </div>
      </header>

      {/* Cinematic Entrance Zoom Vignette & Room Announcement Banner */}
      <div className={styles.entranceVignette} aria-hidden="true" />
      <div className={styles.entranceBanner} aria-hidden="true">
        <span className={styles.entranceLabel}>// ENTERING 3D ENVIRONMENT</span>
        <h2 className={styles.entranceRoomTitle}>SATVIK&apos;S STUDIO</h2>
      </div>

      {/* Dynamic Interaction Hover Prompt */}
      <InteractionPrompt
        label={hoveredObject}
        visible={!!hoveredObject}
      />

      {/* Modals triggered by 3D room objects */}
      <AboutModal
        isOpen={activeModal === 'about'}
        onClose={closeModal}
      />

      <AchievementModal
        isOpen={activeModal === 'achievement'}
        onClose={closeModal}
        achievement={modalData}
      />

      <WhiteboardModal
        isOpen={activeModal === 'whiteboard'}
        onClose={closeModal}
      />

      <StickyNotesModal
        isOpen={activeModal === 'notes'}
        onClose={closeModal}
      />
    </div>
  )
}
