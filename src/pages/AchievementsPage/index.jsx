import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AchievementCard from '@components/ui/AchievementCard'
import AchievementModal from '@components/ui/AchievementModal'
import { achievements } from '@data/achievements'
import { useAudio } from '@hooks/useAudio'
import styles from './AchievementsPage.module.css'

export default function AchievementsPage() {
  const navigate = useNavigate()
  const { playClick } = useAudio()
  const [selectedAchievement, setSelectedAchievement] = useState(null)

  const handleCardClick = (ach) => {
    playClick()
    setSelectedAchievement(ach)
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.badge}>
          <span>★</span> RECOGNITIONS &amp; MILESTONES
        </div>
        <h1 className={styles.title}>ACHIEVEMENTS</h1>
        <p className={styles.subtitle}>
          Competitions, hackathons, certifications, and developer awards.
        </p>
      </header>

      <main className={styles.grid}>
        {achievements.map((ach) => (
          <AchievementCard
            key={ach.id}
            achievement={ach}
            onClick={handleCardClick}
          />
        ))}
      </main>

      <footer className={styles.footer}>
        <button
          className={styles.backBtn}
          onClick={() => {
            playClick()
            navigate('/world')
          }}
        >
          <span>◈</span> BACK TO WORKSPACE
        </button>
      </footer>

      {/* Detail Modal */}
      <AchievementModal
        isOpen={!!selectedAchievement}
        onClose={() => setSelectedAchievement(null)}
        achievement={selectedAchievement}
      />
    </div>
  )
}
