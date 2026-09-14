import React from 'react'
import { useNavigate } from 'react-router-dom'
import { profile } from '@data/profile'
import { useAudio } from '@hooks/useAudio'
import styles from './ContactPage.module.css'

export default function ContactPage() {
  const navigate = useNavigate()
  const { playClick } = useAudio()
  const { contact } = profile

  return (
    <div className={styles.page}>
      <main className={styles.card}>
        <div className={styles.taglineBadge}>
          <span className={styles.dot}>●</span> READY TO COLLABORATE
        </div>

        <h1 className={styles.title}>Let&apos;s build something interesting.</h1>

        <p className={styles.intro}>
          Whether you have a game project in mind, an opportunity at your studio,
          or simply want to talk game mechanics and Unity architecture — feel free to reach out.
        </p>

        <div className={styles.linksGrid}>
          {/* Email */}
          {contact.email && (
            <a
              href={`mailto:${contact.email}`}
              className={styles.linkTile}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={styles.tileIcon}>✉</div>
              <div className={styles.tileInfo}>
                <span className={styles.tileLabel}>EMAIL</span>
                <span className={styles.tileVal}>{contact.email}</span>
              </div>
              <span className={styles.tileArrow}>↗</span>
            </a>
          )}

          {/* GitHub */}
          {contact.github && (
            <a
              href={contact.github}
              className={styles.linkTile}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={styles.tileIcon}>◈</div>
              <div className={styles.tileInfo}>
                <span className={styles.tileLabel}>GITHUB</span>
                <span className={styles.tileVal}>Repositories &amp; Code</span>
              </div>
              <span className={styles.tileArrow}>↗</span>
            </a>
          )}

          {/* LinkedIn */}
          {contact.linkedin && (
            <a
              href={contact.linkedin}
              className={styles.linkTile}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={styles.tileIcon}>in</div>
              <div className={styles.tileInfo}>
                <span className={styles.tileLabel}>LINKEDIN</span>
                <span className={styles.tileVal}>Professional Profile</span>
              </div>
              <span className={styles.tileArrow}>↗</span>
            </a>
          )}

          {/* Resume */}
          {contact.resume && (
            <a
              href={contact.resume}
              className={styles.linkTile}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={styles.tileIcon}>📄</div>
              <div className={styles.tileInfo}>
                <span className={styles.tileLabel}>RESUME</span>
                <span className={styles.tileVal}>Download PDF</span>
              </div>
              <span className={styles.tileArrow}>↓</span>
            </a>
          )}
        </div>

        <div className={styles.footerRow}>
          <button
            className={styles.backBtn}
            onClick={() => {
              playClick()
              navigate('/world')
            }}
          >
            <span>◈</span> BACK TO WORKSPACE
          </button>
        </div>
      </main>
    </div>
  )
}
