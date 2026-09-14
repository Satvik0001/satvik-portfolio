import React, { useState } from 'react'
import Modal from '@components/ui/Modal'
import { profile } from '@data/profile'
import { skills } from '@data/skills'
import styles from './AboutModal.module.css'

const levelLabels = {
  primary: { label: 'Strong', color: '#8b5cf6' },
  secondary: { label: 'Comfortable', color: '#6d6f80' },
  learning: { label: 'Learning', color: '#5a6e5a' },
}

function AboutModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('about')

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="// ABOUT ME" size="lg">
      {/* Tab switcher */}
      <div className={styles.tabs} role="tablist">
        {['about', 'skills'].map((tab) => (
          <button
            key={tab}
            role="tab"
            aria-selected={activeTab === tab}
            className={`${styles.tab} ${activeTab === tab ? styles.activeTab : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'about' ? '▸ Bio' : '▸ Skills'}
          </button>
        ))}
      </div>

      {activeTab === 'about' && (
        <div className={styles.aboutContent} role="tabpanel">
          <div className={styles.nameBlock}>
            <h3 className={styles.bigName}>{profile.name}</h3>
            <p className={styles.bigRole}>{profile.role}</p>
            {profile.available && (
              <span className={styles.availBadge}>● Open to opportunities</span>
            )}
          </div>

          <div className={styles.bioText}>
            {profile.bio.split('\n').map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>

          <div className={styles.focusAreas}>
            {['Unity', 'C#', 'Gameplay Systems', 'Interactive Experiences'].map((focus) => (
              <span key={focus} className={styles.focusTag}>{focus}</span>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'skills' && (
        <div className={styles.skillsContent} role="tabpanel">
          {Object.entries(skills).map(([category, items]) => (
            items.length > 0 && (
              <div key={category} className={styles.skillCategory}>
                <h4 className={styles.categoryName}>{category}</h4>
                <div className={styles.skillList}>
                  {items.map((skill) => {
                    const level = levelLabels[skill.level] || levelLabels.secondary
                    return (
                      <div key={skill.name} className={styles.skillItem}>
                        <span className={styles.skillName}>{skill.name}</span>
                        <span
                          className={styles.skillLevel}
                          style={{ color: level.color }}
                        >
                          {level.label}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          ))}
        </div>
      )}
    </Modal>
  )
}

export default AboutModal
