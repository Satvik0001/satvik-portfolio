import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { useAudio } from '@hooks/useAudio'
import useStore from '@stores/useStore'
import { projects } from '@data/projects'
import styles from './HomePage.module.css'

function HomePage() {
  const navigate = useNavigate()
  const { playClick, playHover, toggleBgm } = useAudio()
  const containerRef = useRef(null)
  const heroRef = useRef(null)
  const gamesRef = useRef(null)
  const experienceRef = useRef(null)
  const audioEnabled = useStore((s) => s.audioEnabled)
  const toggleAudio = useStore((s) => s.toggleAudio)
  const [bgmPlaying, setBgmPlaying] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(heroRef.current, {
        opacity: 0,
        y: 28,
        duration: 0.9,
        ease: 'power3.out',
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const handleExplore = () => {
    playClick()
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.in',
      onComplete: () => navigate('/world'),
    })
  }

  const handleMusicToggle = () => {
    playClick()
    const active = toggleBgm()
    setBgmPlaying(active)
  }

  const scrollToSection = (ref) => {
    playClick()
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div ref={containerRef} className={styles.page}>
      {/* Ambient background glow — balanced violet and cyan */}
      <div className={styles.ambientGlow} aria-hidden="true" />

      {/* Main Content (Padded from fixed single navbar) */}
      <main className={styles.mainContent}>
        {/* HERO SECTION */}
        <section ref={heroRef} className={styles.heroSection}>
          {/* Status Badge with Cyber Cyan accent */}
          <div className={styles.badge}>
            <span className={styles.badgeDot}>◆</span>
            <span>UNITY &bull; C# &bull; GAMEPLAY &amp; UI DESIGN</span>
          </div>

          {/* NAME VISIBLE AS PROMINENT PAGE TITLE */}
          <h1 className={styles.nameTitle}>SATVIK PRAJAPATI</h1>

          {/* Subheading: "Dynamic Gameplay Systems" */}
          <h2 className={styles.heroTagline}>
            Crafting Immersive Worlds &amp; <span className={styles.highlightText}>Dynamic Gameplay Systems</span>
          </h2>

          {/* Passion for Game Development statement (no company name in hero description) */}
          <p className={styles.heroSubtitle}>
            To me, game development is the ultimate fusion of engineering precision and player emotion.
            There is nothing quite like translating raw physics math and logic into tactile movement that feels incredible in the player&apos;s hands.
            I am driven by designing responsive gameplay loops, fine-tuning game feel, and building interactive worlds that spark genuine joy and curiosity.
          </p>

          {/* Action CTAs — Pac-Man button removed from home page */}
          <div className={styles.ctaGroup}>
            <button
              className={styles.primaryCta}
              onClick={handleExplore}
              onMouseEnter={playHover}
            >
              <div className={styles.ctaText}>
                <span className={styles.ctaMain}>ENTER 3D WORKSPACE</span>
                <span className={styles.ctaSub}>INTERACTIVE ROOM EXPERIENCE</span>
              </div>
              <span className={styles.ctaArrow}>▶</span>
            </button>

            <button
              className={styles.secondaryCta}
              onClick={() => scrollToSection(gamesRef)}
              onMouseEnter={playHover}
            >
              <span className={styles.secIcon}>🎮</span>
              <div className={styles.ctaText}>
                <span className={styles.ctaMain}>VIEW FEATURED GAMES</span>
                <span className={styles.ctaSub}>3 SHIPPED PROTOTYPES</span>
              </div>
            </button>
          </div>

          {/* Metrics Bar with multi-color contrast (Emerald, Cyan, Gold, Purple) */}
          <div className={styles.metricsBar}>
            <div className={styles.metricItem}>
              <span className={`${styles.metricVal} ${styles.goldVal}`}>6 MONTHS</span>
              <span className={styles.metricLabel}>Studio Intern Experience</span>
            </div>
            <div className={styles.metricDivider} />
            <div className={styles.metricItem}>
              <span className={`${styles.metricVal} ${styles.cyanVal}`}>3 GAMES</span>
              <span className={styles.metricLabel}>Physics, Stealth &amp; Parkour</span>
            </div>
            <div className={styles.metricDivider} />
            <div className={styles.metricItem}>
              <span className={`${styles.metricVal} ${styles.purpleVal}`}>UNITY 3D / 2D</span>
              <span className={styles.metricLabel}>C# &amp; Systems Architecture</span>
            </div>
            <div className={styles.metricDivider} />
            <div className={styles.metricItem}>
              <span className={`${styles.metricVal} ${styles.emeraldVal}`}>UI / UX DESIGN</span>
              <span className={styles.metricLabel}>Game Interface Specialist</span>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* FEATURED GAMES SECTION WITH IN-GAME ARTWORK SCREENSHOTS */}
        {/* ========================================================= */}
        <section id="featured-games" ref={gamesRef} className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionBadge}>FEATURED PROJECTS</div>
            <h2 className={styles.sectionTitle}>Featured Games</h2>
            <p className={styles.sectionDesc}>
              Custom physics systems, procedural kinematics, AI pathfinding, and responsive game UI.
            </p>
          </div>

          <div className={styles.gamesGrid}>
            {projects.map((game, idx) => {
              const accentClass =
                idx === 0 ? styles.accentCyan : idx === 1 ? styles.accentGold : styles.accentEmerald

              return (
                <article key={game.id} className={`${styles.gameCard} ${accentClass}`}>
                  {/* Game Visual Screenshot Preview */}
                  <div className={styles.gameMedia}>
                    <img
                      src={game.image}
                      alt={`${game.title} gameplay preview`}
                      className={styles.gameImage}
                      loading="lazy"
                    />
                    <div className={styles.imageTag}>IN-GAME SHOWCASE</div>
                  </div>

                  <div className={styles.cardTop}>
                    <div className={styles.gameNumber}>0{idx + 1}</div>
                    <span className={styles.gameRole}>{game.role}</span>
                  </div>

                  <h3 className={styles.gameTitle}>{game.title}</h3>
                  <p className={styles.gameDesc}>{game.description}</p>

                  {/* Key Mechanics */}
                  <div className={styles.featuresBox}>
                    <h4 className={styles.featuresHeading}>KEY MECHANICS &amp; ARCHITECTURE</h4>
                    <ul className={styles.featuresList}>
                      {game.features.slice(0, 3).map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Tags */}
                  <div className={styles.techPills}>
                    {game.technologies.map((t) => (
                      <span key={t} className={styles.techPill}>{t}</span>
                    ))}
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        {/* ========================================================= */}
        {/* EXPERIENCE SPOTLIGHT (Studio Details preserved here) */}
        {/* ========================================================= */}
        <section id="experience" ref={experienceRef} className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionBadge}>PROFESSIONAL HISTORY</div>
            <h2 className={styles.sectionTitle}>Studio Experience</h2>
          </div>

          <div className={styles.experienceCard}>
            <div className={styles.expHeader}>
              <div>
                <span className={styles.expCompany}>Gameyogi</span>
                <span className={styles.expLocation}>Ahmedabad, India</span>
                <h3 className={styles.expRole}>Game Developer Intern</h3>
              </div>
              <div className={styles.expMeta}>
                <span className={styles.expDuration}>6 Months</span>
                <span className={styles.expBadge}>Internship</span>
              </div>
            </div>

            <p className={styles.expDesc}>
              Engineered gameplay mechanics, state machines, and dynamic UI flows in Unity &amp; C#.
              Collaborated across multi-disciplinary teams to integrate 3D/2D assets, optimize draw calls,
              and ensure smooth 60 FPS performance.
            </p>

            <div className={styles.expPoints}>
              <div className={styles.pointItem}>
                <span className={styles.pointDotCyan}>◈</span>
                <span>Programmed responsive character movement, camera controllers, and gameplay logic in Unity &amp; C#</span>
              </div>
              <div className={styles.pointItem}>
                <span className={styles.pointDotGold}>◈</span>
                <span>Designed and refined game UI/UX layouts, HUD meters, dynamic menus, and inventory navigation</span>
              </div>
              <div className={styles.pointItem}>
                <span className={styles.pointDotEmerald}>◈</span>
                <span>Profiled CPU/GPU memory, reduced draw calls, and optimized collision layers for stable frame rates</span>
              </div>
              <div className={styles.pointItem}>
                <span className={styles.pointDotPurple}>◈</span>
                <span>Built robust State Machine systems for player behaviors, boss encounters, and game state management</span>
              </div>
            </div>

            <div className={styles.techPills}>
              {['Unity 3D / 2D', 'C#', 'State Machines', 'UI / UX Design', 'Physics Optimization'].map((tech) => (
                <span key={tech} className={styles.techPill}>{tech}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className={styles.footer}>
          <div className={styles.footerInner}>
            <p className={styles.copyright}>
              &copy; {new Date().getFullYear()} Satvik Prajapati &bull; Game Developer &bull; Ahmedabad, India
            </p>
            <div className={styles.footerLinks}>
              <button onClick={() => navigate('/world')} className={styles.footerLink}>
                3D Workspace
              </button>
              <button onClick={() => navigate('/achievements')} className={styles.footerLink}>
                Achievements
              </button>
              <button onClick={() => navigate('/contact')} className={styles.footerLink}>
                Contact
              </button>
            </div>
          </div>
        </footer>
      </main>

      {/* Floating Audio Dock with calm game music toggle */}
      <div className={styles.audioDock}>
        <button
          className={`${styles.audioBtn} ${bgmPlaying ? styles.activeAudio : ''}`}
          onClick={handleMusicToggle}
          title={bgmPlaying ? 'Mute Calm Game Music' : 'Play Calm Game Music'}
        >
          <span>{bgmPlaying ? '🎵' : '🎧'}</span>
          <span>{bgmPlaying ? 'MUSIC: ON' : 'MUSIC: OFF'}</span>
        </button>

        <button
          className={styles.audioBtn}
          onClick={toggleAudio}
          title={audioEnabled ? 'Mute SFX' : 'Enable SFX'}
        >
          <span>{audioEnabled ? '🔊' : '🔇'}</span>
          <span>{audioEnabled ? 'SFX: ON' : 'SFX: OFF'}</span>
        </button>
      </div>
    </div>
  )
}

export default HomePage
