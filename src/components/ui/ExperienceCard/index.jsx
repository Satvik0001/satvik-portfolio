import React from 'react'
import styles from './ExperienceCard.module.css'

const typeLabels = {
  'full-time': 'Full-time',
  'part-time': 'Part-time',
  'internship': 'Internship',
  'freelance': 'Freelance',
  'contract': 'Contract',
}

function ExperienceCard({ experience }) {
  const { company, role, duration, type, description, responsibilities, technologies } = experience
  const isPlaceholder = company?.startsWith('[PLACEHOLDER]')

  return (
    <article className={`${styles.card} ${isPlaceholder ? styles.placeholder : ''}`}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h3 className={styles.role}>{role}</h3>
          <p className={styles.company}>{company}</p>
        </div>
        <div className={styles.headerRight}>
          <span className={styles.duration}>{duration}</span>
          {type && <span className={styles.typeBadge}>{typeLabels[type] || type}</span>}
        </div>
      </div>

      {description && !isPlaceholder && (
        <p className={styles.description}>{description}</p>
      )}

      {responsibilities?.filter(r => !r.startsWith('[PLACEHOLDER]')).length > 0 && (
        <ul className={styles.responsibilities}>
          {responsibilities.filter(r => !r.startsWith('[PLACEHOLDER]')).map((r, i) => (
            <li key={i} className={styles.responsibility}>{r}</li>
          ))}
        </ul>
      )}

      {technologies?.length > 0 && (
        <div className={styles.techStack}>
          {technologies.map((tech) => (
            <span key={tech} className={styles.techTag}>{tech}</span>
          ))}
        </div>
      )}
    </article>
  )
}

export default ExperienceCard
