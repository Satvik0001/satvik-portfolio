import React from 'react'
import Modal from '@components/ui/Modal'
import styles from './StickyNotesModal.module.css'

export default function StickyNotesModal({ isOpen, onClose }) {
  if (!isOpen) return null

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="// SATVIK'S DESK NOTES & EASTER EGGS"
      size="md"
    >
      <div className={styles.container}>
        <div className={styles.noteGrid}>
          {/* Note 1 */}
          <div className={`${styles.note} ${styles.yellow}`}>
            <span className={styles.pin}>📌</span>
            <p className={styles.noteTitle}>GAME SECRETS</p>
            <p className={styles.noteText}>
              🕹️ <strong>Pac-Man Arcade:</strong> Power pellets frighten ghosts for 7.5 seconds. Eating all 4 ghosts awards massive multiplier points!
            </p>
          </div>

          {/* Note 2 */}
          <div className={`${styles.note} ${styles.purple}`}>
            <span className={styles.pin}>📌</span>
            <p className={styles.noteTitle}>3D WORKSPACE</p>
            <p className={styles.noteText}>
              🪑 <strong>Gaming Chair:</strong> Click the chair for an instant 360° spin or click &amp; drag with your mouse for high-inertia free-spinning!
            </p>
          </div>

          {/* Note 3 */}
          <div className={`${styles.note} ${styles.cyan}`}>
            <span className={styles.pin}>📌</span>
            <p className={styles.noteTitle}>LOFI RADIO</p>
            <p className={styles.noteText}>
              📻 <strong>Cyber Radio:</strong> Click the desktop speaker next to the right monitor to toggle relaxing procedural synthwave ambient beats!
            </p>
          </div>

          {/* Note 4 */}
          <div className={`${styles.note} ${styles.green}`}>
            <span className={styles.pin}>📌</span>
            <p className={styles.noteTitle}>DEV PHILOSOPHY</p>
            <p className={styles.noteText}>
              💡 <em>&quot;Great games are not just written; they are felt. Juice every input, polish every interaction, optimize every frame.&quot;</em>
            </p>
          </div>
        </div>
      </div>
    </Modal>
  )
}
