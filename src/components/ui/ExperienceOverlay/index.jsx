import React, { useState } from 'react'
import ProjectCard from '@components/ui/ProjectCard'
import ExperienceCard from '@components/ui/ExperienceCard'
import { projects } from '@data/projects'
import { experience } from '@data/experience'
import styles from './ExperienceOverlay.module.css'

export default function ExperienceOverlay({ isOpen, onClose }) {
  const [tab, setTab] = useState('projects')

  if (!isOpen) return null

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true">
      <div className={styles.panel}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.tabGroup}>
            <button
              className={`${styles.tabBtn} ${tab === 'projects' ? styles.activeTab : ''}`}
              onClick={() => setTab('projects')}
            >
              ◈ PROJECTS ({projects.length})
            </button>
            <button
              className={`${styles.tabBtn} ${tab === 'experience' ? styles.activeTab : ''}`}
              onClick={() => setTab('experience')}
            >
              ◈ EXPERIENCE ({experience.length})
            </button>
          </div>

          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Resume Arcade Game"
          >
            ✕ RESUME GAME
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className={styles.content}>
          {tab === 'projects' && (
            <div className={styles.grid}>
              {projects.map((proj) => (
                <ProjectCard key={proj.id} project={proj} />
              ))}
            </div>
          )}

          {tab === 'experience' && (
            <div className={styles.list}>
              {experience.map((exp) => (
                <ExperienceCard key={exp.id} experience={exp} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
