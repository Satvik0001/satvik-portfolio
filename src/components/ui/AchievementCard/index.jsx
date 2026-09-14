import React from 'react'
import styles from './AchievementCard.module.css'

function AchievementCard({ achievement, onClick }) {
  const { title, organization, date, description, image, link, icon } = achievement
  const isPlaceholder = title?.startsWith('[PLACEHOLDER]')

  return (
    <button
      className={`${styles.card} ${isPlaceholder ? styles.placeholder : ''}`}
      onClick={() => !isPlaceholder && onClick?.(achievement)}
      aria-label={`Achievement: ${title}`}
      disabled={isPlaceholder}
    >
      <div className={styles.iconArea}>
        <span className={styles.icon} aria-hidden="true">{icon || '🏆'}</span>
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.org}>{organization}</p>
        <p className={styles.date}>{date}</p>
        {description && !isPlaceholder && (
          <p className={styles.description}>{description}</p>
        )}
      </div>

      <div className={styles.arrow} aria-hidden="true">›</div>
    </button>
  )
}

export default AchievementCard
