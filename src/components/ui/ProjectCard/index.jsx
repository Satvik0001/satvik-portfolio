import React from 'react'
import styles from './ProjectCard.module.css'

function ProjectCard({ project }) {
  const { title, description, technologies, role, features, learned, image, github, demo, year } = project

  const isPlaceholder = title?.startsWith('[PLACEHOLDER]')

  return (
    <article className={`${styles.card} ${isPlaceholder ? styles.placeholder : ''}`}>
      {/* Image area */}
      <div className={styles.imageArea}>
        {image ? (
          <img src={image} alt={`${title} screenshot`} className={styles.image} />
        ) : (
          <div className={styles.imageFallback}>
            <span className={styles.imageFallbackIcon}>◈</span>
            <span className={styles.imageFallbackText}>{isPlaceholder ? 'Add screenshot' : 'Preview'}</span>
          </div>
        )}
        {year && <span className={styles.yearBadge}>{year}</span>}
      </div>

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
          {role && <span className={styles.role}>{role}</span>}
        </div>

        {description && <p className={styles.description}>{description}</p>}

        {/* Tech stack */}
        {technologies?.length > 0 && (
          <div className={styles.techStack}>
            {technologies.map((tech) => (
              <span key={tech} className={styles.techTag}>{tech}</span>
            ))}
          </div>
        )}

        {/* Key features */}
        {features?.filter(f => !f.startsWith('[PLACEHOLDER]')).length > 0 && (
          <ul className={styles.features}>
            {features.filter(f => !f.startsWith('[PLACEHOLDER]')).map((f, i) => (
              <li key={i} className={styles.feature}>{f}</li>
            ))}
          </ul>
        )}

        {/* Links */}
        <div className={styles.links}>
          {github && (
            <a href={github} target="_blank" rel="noopener noreferrer" className={styles.linkBtn}>
              <span>GitHub</span>
              <span aria-hidden="true">→</span>
            </a>
          )}
          {demo && (
            <a href={demo} target="_blank" rel="noopener noreferrer" className={`${styles.linkBtn} ${styles.linkBtnPrimary}`}>
              <span>Play Demo</span>
              <span aria-hidden="true">▶</span>
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

export default ProjectCard
