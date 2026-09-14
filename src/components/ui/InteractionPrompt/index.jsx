import React from 'react'
import styles from './InteractionPrompt.module.css'

function InteractionPrompt({ label, sublabel, visible, position }) {
  if (!visible) return null

  return (
    <div
      className={styles.prompt}
      style={position ? { left: position.x, top: position.y } : undefined}
      role="tooltip"
      aria-live="polite"
    >
      <div className={styles.inner}>
        <span className={styles.icon}>◈</span>
        <div className={styles.textBlock}>
          <span className={styles.label}>{label}</span>
          {sublabel && <span className={styles.sublabel}>{sublabel}</span>}
        </div>
      </div>
    </div>
  )
}

export default InteractionPrompt
