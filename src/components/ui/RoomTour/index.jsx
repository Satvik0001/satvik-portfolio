import React, { useState, useEffect } from 'react'
import useStore from '@stores/useStore'
import { useAudio } from '@hooks/useAudio'
import styles from './RoomTour.module.css'

const TOUR_STOPS = [
  {
    id: 'welcome',
    title: "Hi! I'm Byte, your room guide! 🤖",
    tagline: 'VIRTUAL ASSISTANT & TOUR BOT',
    desc: "Welcome to Satvik's 3D workspace! Would you like a quick interactive tour to see the hidden games, ad-free music, and project secrets?",
    hint: 'Takes under 30 seconds • You can orbit the room anytime',
    badge: 'WELCOME TO WORKSPACE',
    color: '#38bdf8',
    expression: 'wave',
  },
  {
    id: 'arcade',
    title: 'Arcade Cabinet 🕹️',
    tagline: 'PLAYABLE GAMES & PROTOTYPES',
    desc: "Over on the right is a retro arcade machine! Click it to inspect Satvik's Unity game prototypes or play a full round of classic Pac-Man directly in your browser.",
    hint: '💡 Tip: Click the machine anytime to launch the arcade experience.',
    badge: 'STOP 1 OF 6',
    color: '#06b6d4',
    expression: 'game',
  },
  {
    id: 'vinyl',
    title: 'Vinyl Jukebox 💿',
    tagline: 'AD-FREE GAME MUSIC & LO-FI',
    desc: 'Mounted on the back-right wall is a turntable. Click it to open the ad-free music player with curated video game soundtracks and lo-fi chill beats.',
    hint: '💡 Tip: Music continues playing in the background while you explore.',
    badge: 'STOP 2 OF 6',
    color: '#a855f7',
    expression: 'music',
  },
  {
    id: 'monitors',
    title: 'Curved Battle Station 🖥️',
    tagline: 'SYSTEMS & LIVE SHADERS',
    desc: 'The dual curved screens showcase real Unity gameplay code, IDE setups, and shader workflows from Satvik’s recent projects.',
    hint: '💡 Tip: Use your mouse wheel or pinch to zoom right in on the monitors.',
    badge: 'STOP 3 OF 6',
    color: '#38bdf8',
    expression: 'code',
  },
  {
    id: 'bookshelf',
    title: 'Skills & Background 📚',
    tagline: 'ENGINEERING BACKSTORY',
    desc: 'Click the tall bookshelf on the left wall to open Satvik’s technical bio, skill matrix (C#, Unity, physics mechanics), and studio internship details.',
    hint: '💡 Tip: Contains detailed breakdowns of his gameplay architecture.',
    badge: 'STOP 4 OF 6',
    color: '#10b981',
    expression: 'happy',
  },
  {
    id: 'trophy',
    title: 'Trophy Shelf 🏆',
    tagline: 'AWARDS & MILESTONES',
    desc: 'Mounted above the monitors is the trophy display. Click it to browse awards, hackathon highlights, and developer achievements.',
    hint: '💡 Tip: Every trophy has a backstory and achievement rank.',
    badge: 'STOP 5 OF 6',
    color: '#f59e0b',
    expression: 'star',
  },
  {
    id: 'chair',
    title: 'Interactive 3D Freedom 🪑',
    tagline: 'ROOM CONTROLS & SECRETS',
    desc: 'You have full control! Drag to orbit the camera, scroll to zoom, click the chair to spin it, or tap the whiteboard to sketch notes.',
    hint: '🎉 You are all set! Have an awesome time exploring.',
    badge: 'READY TO EXPLORE',
    color: '#ec4899',
    expression: 'cheer',
  },
]

// Animated SVG Mascot "Byte" with responsive expressions
function MascotAvatar({ expression = 'wave', color = '#38bdf8' }) {
  return (
    <div className={styles.mascotWrapper}>
      <svg
        className={styles.mascotSvg}
        viewBox="0 0 100 110"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Antenna */}
        <line x1="50" y1="20" x2="50" y2="6" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
        <circle cx="50" cy="5" r="5" fill={color} className={styles.antennaPulse} />

        {/* Headphones / Ears */}
        <rect x="14" y="32" width="8" height="24" rx="4" fill="#64748b" />
        <rect x="78" y="32" width="8" height="24" rx="4" fill="#64748b" />
        <path d="M 22 40 A 28 28 0 0 1 78 40" stroke="#475569" strokeWidth="4" fill="none" />

        {/* Robot Head Body */}
        <rect
          x="22"
          y="20"
          width="56"
          height="48"
          rx="14"
          fill="url(#botGrad)"
          stroke={color}
          strokeWidth="2.5"
        />

        {/* Visor Screen */}
        <rect
          x="28"
          y="28"
          width="44"
          height="28"
          rx="8"
          fill="#060913"
          stroke="#1e293b"
          strokeWidth="1.5"
        />

        {/* Expressions */}
        {expression === 'wave' && (
          <g fill={color}>
            {/* Happy eyes ^ ^ */}
            <path d="M 36 41 Q 40 34 44 41" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M 56 41 Q 60 34 64 41" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none" />
            {/* Cute smile */}
            <path d="M 46 47 Q 50 51 54 47" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
          </g>
        )}

        {expression === 'game' && (
          <g fill={color}>
            {/* Gaming D-Pad eye + button eye */}
            <rect x="36" y="37" width="8" height="3" rx="1" fill={color} />
            <rect x="38.5" y="34.5" width="3" height="8" rx="1" fill={color} />
            <circle cx="60" cy="38" r="3" fill="#f59e0b" />
            <circle cx="64" cy="42" r="2" fill="#ec4899" />
            <path d="M 47 48 Q 50 51 53 48" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
          </g>
        )}

        {expression === 'music' && (
          <g fill={color}>
            {/* Jamming closed eyes */}
            <path d="M 36 39 L 44 39" stroke={color} strokeWidth="3" strokeLinecap="round" />
            <path d="M 56 39 L 64 39" stroke={color} strokeWidth="3" strokeLinecap="round" />
            {/* O smile */}
            <circle cx="50" cy="46" r="2.5" fill={color} />
            {/* Note float */}
            <text x="70" y="24" fill="#c084fc" fontSize="12" fontWeight="bold">♪</text>
          </g>
        )}

        {expression === 'star' && (
          <g fill={color}>
            {/* Starry eyes ★ ★ */}
            <text x="34" y="44" fill="#fbbf24" fontSize="11" fontWeight="bold">★</text>
            <text x="54" y="44" fill="#fbbf24" fontSize="11" fontWeight="bold">★</text>
            <path d="M 46 48 Q 50 52 54 48" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
          </g>
        )}

        {expression === 'code' && (
          <g fill={color}>
            {/* Code angle eyes < > */}
            <text x="35" y="43" fill="#38bdf8" fontSize="10" fontFamily="monospace" fontWeight="bold">&lt;</text>
            <text x="57" y="43" fill="#38bdf8" fontSize="10" fontFamily="monospace" fontWeight="bold">&gt;</text>
            <rect x="47" y="47" width="6" height="2" fill="#34d399" />
          </g>
        )}

        {expression === 'happy' && (
          <g fill={color}>
            <circle cx="40" cy="39" r="3.5" fill={color} />
            <circle cx="60" cy="39" r="3.5" fill={color} />
            <circle cx="39" cy="38" r="1" fill="#fff" />
            <circle cx="59" cy="38" r="1" fill="#fff" />
            <path d="M 45 47 Q 50 52 55 47" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
          </g>
        )}

        {expression === 'cheer' && (
          <g fill={color}>
            {/* Winking eye + heart */}
            <path d="M 36 39 Q 40 33 44 39" stroke={color} strokeWidth="3" strokeLinecap="round" fill="none" />
            <text x="55" y="44" fill="#f43f5e" fontSize="11">♥</text>
            <path d="M 44 48 Q 50 54 56 48" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </g>
        )}

        {/* Cute blush cheeks */}
        <circle cx="33" cy="48" r="2.5" fill="#f43f5e" opacity="0.6" />
        <circle cx="67" cy="48" r="2.5" fill="#f43f5e" opacity="0.6" />

        {/* Little Neck & Floating Torso */}
        <rect x="45" y="70" width="10" height="4" rx="2" fill="#475569" />
        <path
          d="M 34 76 L 66 76 L 61 90 L 39 90 Z"
          fill="url(#botGrad)"
          stroke={color}
          strokeWidth="1.5"
        />

        {/* Cute floating hands */}
        <circle cx="27" cy="82" r="5" fill="#334155" stroke={color} strokeWidth="1" />
        <circle cx="73" cy="82" r="5" fill="#334155" stroke={color} strokeWidth="1" />

        {/* Hover thruster flame */}
        <ellipse cx="50" cy="94" rx="9" ry="3" fill="#1e293b" />
        <ellipse cx="50" cy="98" rx="5" ry="3.5" fill={color} className={styles.thrusterFlame} />

        <defs>
          <linearGradient id="botGrad" x1="22" y1="20" x2="78" y2="68" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1e1838" />
            <stop offset="1" stopColor="#0d0b1a" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

export default function RoomTour() {
  const { tourComplete, completeTour, setTourStep, setTourActive } = useStore()
  const { playClick, playHover } = useAudio()
  const [currentStep, setCurrentStep] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const [hasVisitedBefore, setHasVisitedBefore] = useState(true)

  // Sync with global store so 3D robot & camera follow in real-time
  useEffect(() => {
    setTourActive(isOpen)
    setTourStep(currentStep)
  }, [isOpen, currentStep, setTourActive, setTourStep])

  useEffect(() => {
    // Check if user has completed tour previously
    const stored = localStorage.getItem('sp-tour-complete') === '1'
    setHasVisitedBefore(stored)
    if (!stored) {
      // First time user: open the cute guide automatically after room entrance zoom completes
      const timer = setTimeout(() => {
        setIsOpen(true)
        setTourActive(true)
      }, 1900)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleStartTour = () => {
    playClick()
    setCurrentStep(1)
  }

  const handleNext = () => {
    playClick()
    if (currentStep < TOUR_STOPS.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleFinish()
    }
  }

  const handlePrev = () => {
    playClick()
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleFinish = () => {
    playClick()
    completeTour()
    localStorage.setItem('sp-tour-complete', '1')
    setHasVisitedBefore(true)
    setIsOpen(false)
    setCurrentStep(0)
  }

  const handleReopen = () => {
    playClick()
    setCurrentStep(0)
    setIsOpen(true)
  }

  const stepData = TOUR_STOPS[currentStep] || TOUR_STOPS[0]
  const isFirstStep = currentStep === 0
  const isLastStep = currentStep === TOUR_STOPS.length - 1
  const progressPercent = Math.round(((currentStep + 1) / TOUR_STOPS.length) * 100)

  return (
    <>
      {/* Floating Re-open Badge (always available in room corner) */}
      {!isOpen && (
        <button
          className={styles.reopenPill}
          onClick={handleReopen}
          onMouseEnter={playHover}
          title="Open Room Guide"
          aria-label="Open 3D Room Guide"
        >
          <span className={styles.reopenAvatar}>🤖</span>
          <span className={styles.reopenLabel}>ROOM GUIDE</span>
          <span className={styles.reopenHelp}>?</span>
        </button>
      )}

      {/* Main Cute Tour Modal / Tooltip Card */}
      {isOpen && (
        <div className={styles.tourOverlay} role="dialog" aria-modal="false" aria-label="Room Tour Guide">
          <div
            className={styles.tourCard}
            style={{
              '--step-color': stepData.color,
            }}
          >
            {/* Top decorative header with cute mascot */}
            <div className={styles.cardHeader}>
              <div className={styles.mascotContainer}>
                <MascotAvatar expression={stepData.expression} color={stepData.color} />
              </div>

              <div className={styles.headerMeta}>
                <div className={styles.badgeRow}>
                  <span className={styles.stepBadge} style={{ borderColor: stepData.color, color: stepData.color }}>
                    {stepData.badge}
                  </span>
                  <span className={styles.stepCounter}>
                    {currentStep + 1} / {TOUR_STOPS.length}
                  </span>
                </div>
                <h3 className={styles.cardTitle}>{stepData.title}</h3>
                <span className={styles.cardTagline}>{stepData.tagline}</span>
              </div>

              <button
                className={styles.closeBtn}
                onClick={handleFinish}
                onMouseEnter={playHover}
                title="Close Tour"
                aria-label="Close Tour"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className={styles.cardBody}>
              <p className={styles.cardDesc}>{stepData.desc}</p>
              <div className={styles.hintBox}>
                <span className={styles.hintIcon}>✨</span>
                <span className={styles.hintText}>{stepData.hint}</span>
              </div>
            </div>

            {/* Progress bar */}
            <div className={styles.progressBarBg}>
              <div
                className={styles.progressBarFill}
                style={{
                  width: `${progressPercent}%`,
                  backgroundColor: stepData.color,
                }}
              />
            </div>

            {/* Footer controls */}
            <div className={styles.cardFooter}>
              {isFirstStep ? (
                <>
                  <button className={styles.skipBtn} onClick={handleFinish} onMouseEnter={playHover}>
                    Skip Tour
                  </button>
                  <button
                    className={styles.primaryActionBtn}
                    style={{ background: stepData.color }}
                    onClick={handleStartTour}
                    onMouseEnter={playHover}
                  >
                    <span>START TOUR 🚀</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    className={styles.navBtn}
                    onClick={handlePrev}
                    onMouseEnter={playHover}
                    disabled={currentStep === 0}
                  >
                    ← Back
                  </button>

                  <div className={styles.dotsRow}>
                    {TOUR_STOPS.map((s, idx) => (
                      <span
                        key={s.id}
                        className={`${styles.stepDot} ${idx === currentStep ? styles.activeDot : ''}`}
                        style={{
                          backgroundColor: idx === currentStep ? stepData.color : undefined,
                        }}
                        onClick={() => {
                          playClick()
                          setCurrentStep(idx)
                        }}
                        title={s.title}
                      />
                    ))}
                  </div>

                  <button
                    className={styles.primaryActionBtn}
                    style={{ background: stepData.color }}
                    onClick={handleNext}
                    onMouseEnter={playHover}
                  >
                    <span>{isLastStep ? 'GOT IT! 🎮' : 'NEXT →'}</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
