import React, { Suspense, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import useStore from '@stores/useStore'
import { useAudio } from '@hooks/useAudio'
import GamingRoom from '@components/3d/Room/GamingRoom'
import CameraController from '@components/3d/Room/CameraController'
import InteractionPrompt from '@components/ui/InteractionPrompt'
import RoomTour from '@components/ui/RoomTour'
import AboutModal from '@components/ui/AboutModal'
import AchievementModal from '@components/ui/AchievementModal'
import WhiteboardModal from '@components/ui/WhiteboardModal'
import StickyNotesModal from '@components/ui/StickyNotesModal'
import styles from './WorldPage.module.css'

export default function WorldPage() {
  const {
    hoveredObject,
    activeModal,
    modalData,
    closeModal,
    qualitySettings,
    setIsMusicPlaying,
  } = useStore()

  const { stopBgm } = useAudio()

  // Stop all music when leaving the 3D room
  useEffect(() => {
    return () => {
      // Stop procedural BGM
      stopBgm()
      // Mark vinyl as stopped so it doesn't spin on re-enter until music starts again
      setIsMusicPlaying(false)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={styles.worldContainer}>
      {/* Three.js R3F Canvas */}
      <Canvas
        className={styles.canvas}
        shadows={qualitySettings?.shadows ?? true}
        dpr={[1, 1.5]}
        camera={{
          position: [0, 1.75, 2.6],
          fov: 48,
          near: 0.1,
          far: 20,
        }}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
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

      {/* Dynamic Interaction Hover Prompt */}
      <InteractionPrompt
        label={hoveredObject}
        visible={!!hoveredObject}
      />

      {/* First-visit onboarding tour */}
      <RoomTour />

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
