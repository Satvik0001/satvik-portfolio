import React from 'react'
import Modal from '@components/ui/Modal'
import styles from './AchievementModal.module.css'

export default function AchievementModal({ isOpen, onClose, achievement }) {
  if (!achievement) return null

  const { title, organization, date, description, image, link, icon } = achievement
  const isPlaceholder = title?.startsWith('[PLACEHOLDER]')

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="// ACHIEVEMENT DETAILS"
      size="md"
    >
      <div className={styles.container}>
        <div className={styles.badgeRow}>
          <div className={styles.iconCircle}>
            <span>{icon || '🏆'}</span>
          </div>
          <div>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.org}>{organization}</p>
            <p className={styles.date}>{date}</p>
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.body}>
          <h4 className={styles.sectionLabel}>About this achievement</h4>
          <p className={styles.description}>
            {isPlaceholder
              ? 'This is a placeholder entry. Replace this with details of your actual competition wins, certifications, awards, or hackathon recognitions in src/data/achievements.js.'
              : description}
          </p>
        </div>

        {link && (
          <div className={styles.actions}>
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkBtn}
            >
              Verify Certificate →
            </a>
          </div>
        )}
      </div>
    </Modal>
  )
}
