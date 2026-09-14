import React, { useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useAudio } from '@hooks/useAudio'
import styles from './Navigation.module.css'

function Navigation() {
  const location = useLocation()
  const navigate = useNavigate()
  const { playClick, playHover } = useAudio()
  const [menuOpen, setMenuOpen] = useState(false)

  // Hide nav on arcade page to keep full arcade cabinet immersion
  const isArcade = location.pathname === '/arcade'
  if (isArcade) return null

  const handleSectionClick = (sectionId) => {
    playClick()
    setMenuOpen(false)
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
      }, 150)
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleNavClick = () => {
    playClick()
    setMenuOpen(false)
  }

  return (
    <>
      {/* Single Unified Top Navigation Bar */}
      <header className={styles.navBar} aria-label="Main navigation">
        <div className={styles.navContainer}>
          {/* Brand Logo & Status */}
          <NavLink
            to="/"
            className={styles.brand}
            onClick={handleNavClick}
            onMouseEnter={playHover}
          >
            <span className={styles.statusDot}>●</span>
            <span className={styles.brandTitle}>GAME DEVELOPER</span>
          </NavLink>

          {/* Desktop Navigation Links */}
          <nav className={styles.navLinks}>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `${styles.navItem} ${isActive ? styles.active : ''}`
              }
              onClick={handleNavClick}
              onMouseEnter={playHover}
            >
              <span className={styles.navIcon} aria-hidden="true">⌂</span>
              <span>HOME</span>
            </NavLink>

            <NavLink
              to="/world"
              className={({ isActive }) =>
                `${styles.navItem} ${isActive ? styles.active : ''}`
              }
              onClick={handleNavClick}
              onMouseEnter={playHover}
            >
              <span className={styles.navIcon} aria-hidden="true">◈</span>
              <span>3D WORKSPACE</span>
            </NavLink>

            <button
              className={styles.navItem}
              onClick={() => handleSectionClick('featured-games')}
              onMouseEnter={playHover}
            >
              <span className={styles.navIcon} aria-hidden="true">🎮</span>
              <span>GAMES</span>
            </button>

            <button
              className={styles.navItem}
              onClick={() => handleSectionClick('experience')}
              onMouseEnter={playHover}
            >
              <span className={styles.navIcon} aria-hidden="true">💼</span>
              <span>EXPERIENCE</span>
            </button>

            <NavLink
              to="/achievements"
              className={({ isActive }) =>
                `${styles.navItem} ${isActive ? styles.active : ''}`
              }
              onClick={handleNavClick}
              onMouseEnter={playHover}
            >
              <span className={styles.navIcon} aria-hidden="true">★</span>
              <span>ACHIEVEMENTS</span>
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `${styles.navItem} ${isActive ? styles.active : ''}`
              }
              onClick={handleNavClick}
              onMouseEnter={playHover}
            >
              <span className={styles.navIcon} aria-hidden="true">✉</span>
              <span>CONTACT</span>
            </NavLink>
          </nav>

          {/* Mobile Hamburger Button */}
          <button
            className={styles.menuToggle}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`} />
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {menuOpen && (
        <div className={styles.mobileMenu} role="dialog" aria-label="Mobile navigation">
          <div className={styles.mobileMenuInner}>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `${styles.mobileItem} ${isActive ? styles.activeMobile : ''}`
              }
              onClick={handleNavClick}
            >
              <span className={styles.mobileIcon}>⌂</span>
              <span>HOME</span>
            </NavLink>

            <NavLink
              to="/world"
              className={({ isActive }) =>
                `${styles.mobileItem} ${isActive ? styles.activeMobile : ''}`
              }
              onClick={handleNavClick}
            >
              <span className={styles.mobileIcon}>◈</span>
              <span>3D WORKSPACE</span>
            </NavLink>

            <button
              className={styles.mobileItem}
              onClick={() => handleSectionClick('featured-games')}
            >
              <span className={styles.mobileIcon}>🎮</span>
              <span>FEATURED GAMES</span>
            </button>

            <button
              className={styles.mobileItem}
              onClick={() => handleSectionClick('experience')}
            >
              <span className={styles.mobileIcon}>💼</span>
              <span>EXPERIENCE</span>
            </button>

            <NavLink
              to="/achievements"
              className={({ isActive }) =>
                `${styles.mobileItem} ${isActive ? styles.activeMobile : ''}`
              }
              onClick={handleNavClick}
            >
              <span className={styles.mobileIcon}>★</span>
              <span>ACHIEVEMENTS</span>
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `${styles.mobileItem} ${isActive ? styles.activeMobile : ''}`
              }
              onClick={handleNavClick}
            >
              <span className={styles.mobileIcon}>✉</span>
              <span>CONTACT</span>
            </NavLink>
          </div>
        </div>
      )}
    </>
  )
}

export default Navigation
