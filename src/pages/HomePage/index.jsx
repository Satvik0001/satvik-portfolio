import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { useAudio } from '@hooks/useAudio'
import useStore from '@stores/useStore'
import { projects } from '@data/projects'
import { profile } from '@data/profile'
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

      {/* Main Content */}
      <main className={styles.mainContent}>
        {/* HERO SECTION */}
        <section ref={heroRef} className={styles.heroSection}>
          {/* Status Badge */}
          <div className={styles.badge}>
            <span className={styles.badgeDot}>●</span>
            <span>AVAILABLE FOR GAMEPLAY PROGRAMMING &amp; ENGINE ROLES</span>
          </div>

          {/* Maximized Luminous Name Header */}
          <div className={styles.nameWrapper}>
            <div className={styles.nameAura} aria-hidden="true" />
            <div className={styles.nameGridLines} aria-hidden="true" />
            <h1 className={styles.nameTitle}>SATVIK PRAJAPATI</h1>
          </div>

          {/* Subheading */}
          <h2 className={styles.heroTagline}>
            Game Developer &bull; <span className={styles.highlightText}>Gameplay Systems Programmer</span>
          </h2>

          {/* Professional Developer Overview */}
          <p className={styles.heroSubtitle}>
            Specializing in responsive character physics, state machines, and immersive gameplay mechanics in Unity &amp; C#.
            Focused on high-performance engine systems, tactile player game feel, and clean modular code architecture.
          </p>

          {/* Action CTAs */}
          <div className={styles.ctaGroup}>
            <button
              className={styles.primaryCta}
              onClick={handleExplore}
              onMouseEnter={playHover}
            >
              <div className={styles.ctaText}>
                <span className={styles.ctaMain}>EXPLORE 3D STUDIO</span>
                <span className={styles.ctaSub}>INTERACTIVE ROOM WITH BYTE THE ROBOT GUIDE</span>
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
                <span className={styles.ctaMain}>FEATURED GAMES</span>
                <span className={styles.ctaSub}>3 CUSTOM UNITY PROJECTS</span>
              </div>
            </button>

            <button
              className={styles.tertiaryCta}
              onClick={() => {
                playClick()
                navigate('/contact')
              }}
              onMouseEnter={playHover}
            >
              <span className={styles.secIcon}>✉️</span>
              <div className={styles.ctaText}>
                <span className={styles.ctaMain}>GET IN TOUCH</span>
                <span className={styles.ctaSub}>DIRECT COLLABORATION</span>
              </div>
            </button>
          </div>

          {/* Engineering Telemetry Strip */}
          <div className={styles.telemetryBar}>
            <div className={styles.telemetryItem}>
              <span className={styles.telemetryNum}>6+ Mos</span>
              <span className={styles.telemetryLabel}>STUDIO DEV (GAMEYOGI)</span>
            </div>
            <div className={styles.telemetryDivider} />
            <div className={styles.telemetryItem}>
              <span className={styles.telemetryNum}>WebGL / WASM</span>
              <span className={styles.telemetryLabel}>BROWSER GAME CONVERSIONS</span>
            </div>
            <div className={styles.telemetryDivider} />
            <div className={styles.telemetryItem}>
              <span className={styles.telemetryNum}>3rd-Party SDKs</span>
              <span className={styles.telemetryLabel}>ADS, IAP &amp; FIREBASE</span>
            </div>
            <div className={styles.telemetryDivider} />
            <div className={styles.telemetryItem}>
              <span className={styles.telemetryNum}>C# &amp; Unity</span>
              <span className={styles.telemetryLabel}>FSM STATE MACHINES &amp; MATH</span>
            </div>
            <div className={styles.telemetryDivider} />
            <div className={styles.telemetryItem}>
              <span className={styles.telemetryNum}>60 FPS</span>
              <span className={styles.telemetryLabel}>ZERO-GC &amp; DRAW CALLS</span>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* FEATURED GAMES SECTION — MODERN SHOWCASE CARDS */}
        {/* ========================================================= */}
        <section id="featured-games" ref={gamesRef} className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionBadge}>DEVELOPER SHOWCASE</div>
            <h2 className={styles.sectionTitle}>Featured Games</h2>
            <p className={styles.sectionDesc}>
              Custom physics simulations, procedural kinematics, AI pathfinding, and responsive player controllers.
            </p>
          </div>

          <div className={styles.gamesGrid}>
            {projects.map((game) => (
              <article key={game.id} className={styles.gameCard}>
                {/* Visual Banner Preview */}
                <div className={styles.gameMedia}>
                  <img
                    src={game.image}
                    alt={`${game.title} preview`}
                    className={styles.gameImage}
                    loading="lazy"
                  />
                  <div className={styles.genreBadge}>
                    {game.id === 'orbital-drift' && '3D Spherical Physics Racer'}
                    {game.id === 'intern-boss-escape' && '2D Stealth Action AI'}
                    {game.id === 'takeshis-castle-parkour' && '3D Physics Parkour'}
                  </div>
                </div>

                {/* Card Content */}
                <div className={styles.cardContent}>
                  <div className={styles.cardTop}>
                    <h3 className={styles.gameTitle}>{game.title}</h3>
                    <span className={styles.gameRole}>{game.role}</span>
                  </div>

                  <p className={styles.gameDesc}>{game.description}</p>

                  {/* Key Highlights */}
                  <div className={styles.highlightsContainer}>
                    <span className={styles.highlightsLabel}>Core Mechanics &amp; Systems:</span>
                    <ul className={styles.highlightsList}>
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

                  {/* Action Buttons */}
                  <div className={styles.gameActions}>
                    {game.github && (
                      <a
                        href={game.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.githubLink}
                        onMouseEnter={playHover}
                      >
                        <span>View Source Code &amp; Mechanics ↗</span>
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* STUDIO EXPERIENCE SPOTLIGHT */}
        {/* ========================================================= */}
        <section id="experience" ref={experienceRef} className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionBadge}>PROFESSIONAL HISTORY</div>
            <h2 className={styles.sectionTitle}>Studio Experience</h2>
            <p className={styles.sectionDesc}>
              Hands-on commercial game development, production pipelines, and multi-disciplinary teamwork.
            </p>
          </div>

          <div className={styles.experienceCard}>
            <div className={styles.expHeader}>
              <div className={styles.companyGroup}>
                <div className={styles.companyMonogram}>GY</div>
                <div>
                  <div className={styles.companyMeta}>
                    <span className={styles.expCompany}>Gameyogi</span>
                    <span className={styles.expLocation}>Ahmedabad, India</span>
                  </div>
                  <h3 className={styles.expRole}>Game Developer Intern</h3>
                </div>
              </div>
              <div className={styles.expMeta}>
                <span className={styles.expDuration}>6 Months Commercial Internship</span>
                <span className={styles.expBadge}>Completed</span>
              </div>
            </div>

            <p className={styles.expDesc}>
              Engineered gameplay mechanics, state machines, and dynamic UI flows in Unity &amp; C#.
              Spearheaded 3rd-party monetization SDK integrations (Ads &amp; IAP), engineered end-to-end WebGL browser game conversions,
              profiled garbage collection memory, and optimized draw calls for buttery-smooth 60 FPS performance.
            </p>

            <div className={styles.expGrid}>
              <div className={styles.expItemCard}>
                <div className={styles.expItemHeader}>
                  <span className={styles.expIconCyan}>🕹️</span>
                  <h4 className={styles.expItemTitle}>Character Physics &amp; Kinematics</h4>
                </div>
                <p className={styles.expItemDesc}>
                  Programmed responsive player controllers, camera follow damping, custom raycast wheels, and physics trigger interactions.
                </p>
              </div>

              <div className={styles.expItemCard}>
                <div className={styles.expItemHeader}>
                  <span className={styles.expIconPurple}>🌐</span>
                  <h4 className={styles.expItemTitle}>Unity to WebGL / WASM Conversion</h4>
                </div>
                <p className={styles.expItemDesc}>
                  Compiled native games to high-speed WebGL &amp; WebAssembly, tuned memory heap limits, asset streaming, and responsive canvas viewports.
                </p>
              </div>

              <div className={styles.expItemCard}>
                <div className={styles.expItemHeader}>
                  <span className={styles.expIconGold}>💰</span>
                  <h4 className={styles.expItemTitle}>3rd-Party SDKs &amp; Monetization</h4>
                </div>
                <p className={styles.expItemDesc}>
                  Integrated Unity Ads, Google AdMob, AppLovin mediation (rewarded video &amp; interstitials), Unity IAP, and Firebase telemetry.
                </p>
              </div>

              <div className={styles.expItemCard}>
                <div className={styles.expItemHeader}>
                  <span className={styles.expIconPurple}>🧠</span>
                  <h4 className={styles.expItemTitle}>Finite State Machine AI</h4>
                </div>
                <p className={styles.expItemDesc}>
                  Built modular decoupled state machines managing player behaviors, NPC field-of-view stealth cones, and boss phase transitions.
                </p>
              </div>

              <div className={styles.expItemCard}>
                <div className={styles.expItemHeader}>
                  <span className={styles.expIconEmerald}>⚡</span>
                  <h4 className={styles.expItemTitle}>Profiling &amp; Zero-GC Optimization</h4>
                </div>
                <p className={styles.expItemDesc}>
                  Profiled CPU/GPU memory, reduced batching draw calls, optimized collision matrices, and implemented object pools to eliminate GC spikes.
                </p>
              </div>

              <div className={styles.expItemCard}>
                <div className={styles.expItemHeader}>
                  <span className={styles.expIconCyan}>🎨</span>
                  <h4 className={styles.expItemTitle}>Responsive Game UI &amp; UX</h4>
                </div>
                <p className={styles.expItemDesc}>
                  Designed HUD meters, responsive dynamic menus, cross-platform touch/gamepad input mapping, and audio-synced juice feedback.
                </p>
              </div>
            </div>

            <div className={styles.techPills}>
              {['Unity 3D / 2D', 'C#', 'WebGL / WASM Conversion', 'Unity Ads & AdMob', 'In-App Purchases (IAP)', 'Firebase Analytics', 'State Machines', 'Zero-GC Profiler'].map((tech) => (
                <span key={tech} className={styles.techPill}>{tech}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* EDUCATION SECTION */}
        {/* ========================================================= */}
        <section id="education" className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionBadge}>ACADEMIC BACKGROUND</div>
            <h2 className={styles.sectionTitle}>Education</h2>
          </div>

          <div className={styles.educationGrid}>
            {profile.education.map((edu, idx) => (
              <div key={idx} className={styles.homeEduCard}>
                <div className={styles.homeEduHeader}>
                  <h3 className={styles.homeEduDegree}>{edu.degree}</h3>
                  <span className={styles.homeEduPeriod}>{edu.period}</span>
                </div>
                <p className={styles.homeEduInst}>{edu.institution}</p>
                <div className={styles.eduStatusRow}>
                  <span className={styles.homeEduStatus}>Status: {edu.status}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className={styles.footer}>
          <div className={styles.footerInner}>
            <p className={styles.copyright}>
              &copy; {new Date().getFullYear()} Satvik Prajapati &bull; Gameplay Systems Programmer &bull; Ahmedabad, India
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
