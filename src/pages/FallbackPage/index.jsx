import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ProjectCard from '@components/ui/ProjectCard'
import ExperienceCard from '@components/ui/ExperienceCard'
import AchievementCard from '@components/ui/AchievementCard'
import { profile } from '@data/profile'
import { projects } from '@data/projects'
import { experience } from '@data/experience'
import { achievements } from '@data/achievements'
import { skills } from '@data/skills'
import styles from './FallbackPage.module.css'

export default function FallbackPage() {
  const [activeTab, setActiveTab] = useState('projects')

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.notice}>
          <span>ℹ</span> CLASSIC MODE (2D PORTFOLIO)
        </div>
        <h1 className={styles.name}>{profile.name}</h1>
        <p className={styles.role}>{profile.role}</p>
        <p className={styles.tagline}>{profile.tagline}</p>

        <div className={styles.navTabs}>
          {['projects', 'about', 'skills', 'experience', 'achievements', 'contact'].map(
            (tab) => (
              <button
                key={tab}
                className={`${styles.tabBtn} ${activeTab === tab ? styles.activeTab : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.toUpperCase()}
              </button>
            )
          )}
        </div>
      </header>

      <main className={styles.main}>
        {/* PROJECTS TAB */}
        {activeTab === 'projects' && (
          <section className={styles.section}>
            <h2 className={styles.secTitle}>PROJECTS</h2>
            <div className={styles.grid}>
              {projects.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          </section>
        )}

        {/* ABOUT TAB */}
        {activeTab === 'about' && (
          <section className={styles.section}>
            <h2 className={styles.secTitle}>ABOUT ME</h2>
            <div className={styles.aboutCard}>
              <p className={styles.bioText}>{profile.bio}</p>
            </div>
          </section>
        )}

        {/* SKILLS TAB */}
        {activeTab === 'skills' && (
          <section className={styles.section}>
            <h2 className={styles.secTitle}>TECHNICAL SKILLS</h2>
            <div className={styles.skillsGrid}>
              {Object.entries(skills).map(([category, list]) => (
                <div key={category} className={styles.skillBox}>
                  <h3 className={styles.skillCatTitle}>{category}</h3>
                  <div className={styles.tags}>
                    {list.map((s) => (
                      <span key={s.name} className={styles.tag}>
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* EXPERIENCE TAB */}
        {activeTab === 'experience' && (
          <section className={styles.section}>
            <h2 className={styles.secTitle}>EXPERIENCE</h2>
            <div className={styles.list}>
              {experience.map((exp) => (
                <ExperienceCard key={exp.id} experience={exp} />
              ))}
            </div>
          </section>
        )}

        {/* ACHIEVEMENTS TAB */}
        {activeTab === 'achievements' && (
          <section className={styles.section}>
            <h2 className={styles.secTitle}>ACHIEVEMENTS</h2>
            <div className={styles.grid}>
              {achievements.map((ach) => (
                <AchievementCard key={ach.id} achievement={ach} />
              ))}
            </div>
          </section>
        )}

        {/* CONTACT TAB */}
        {activeTab === 'contact' && (
          <section className={styles.section}>
            <h2 className={styles.secTitle}>CONTACT</h2>
            <div className={styles.contactBox}>
              <p>Email: <a href={`mailto:${profile.contact.email}`}>{profile.contact.email}</a></p>
              {profile.contact.github && (
                <p>GitHub: <a href={profile.contact.github} target="_blank" rel="noreferrer">{profile.contact.github}</a></p>
              )}
              {profile.contact.linkedin && (
                <p>LinkedIn: <a href={profile.contact.linkedin} target="_blank" rel="noreferrer">{profile.contact.linkedin}</a></p>
              )}
            </div>
          </section>
        )}
      </main>

      <footer className={styles.footer}>
        <Link to="/world" className={styles.switchBtn}>
          Try 3D Workspace Mode →
        </Link>
      </footer>
    </div>
  )
}
