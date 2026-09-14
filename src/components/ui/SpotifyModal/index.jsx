import React, { useState } from 'react'
import useStore from '@stores/useStore'
import { useAudio } from '@hooks/useAudio'
import styles from './SpotifyModal.module.css'

// Curated game music — YouTube embeds (free, full songs, no ads, no login needed)
const CURATED_PRESETS = [
  {
    id: 'game-lofi',
    name: 'Video Game Lo-Fi',
    desc: 'Chill retro gaming beats & piano',
    icon: '🎮',
    type: 'youtube',
    url: 'https://www.youtube.com/embed/videoseries?list=PLw-VjHDlEOgs658kAHR_88KZFV-KN-6u3&autoplay=1&mute=0',
  },
  {
    id: 'zelda-chill',
    name: 'Zelda & Chill',
    desc: 'Lofi Hyrule acoustic chill mix',
    icon: '🗡️',
    type: 'youtube',
    url: 'https://www.youtube.com/embed/fefIWqBiLsI?autoplay=1&mute=0',
  },
  {
    id: 'synthwave',
    name: 'Synthwave Odyssey',
    desc: 'Cyberpunk neon arcade vibes',
    icon: '🌌',
    type: 'youtube',
    url: 'https://www.youtube.com/embed/videoseries?list=PLGqB3S8f_uiLkCQziivGYI-hom1zJCyIz&autoplay=1&mute=0',
  },
  {
    id: 'minecraft',
    name: 'Minecraft Calm',
    desc: 'C418 peaceful exploration score',
    icon: '⛏️',
    type: 'youtube',
    url: 'https://www.youtube.com/embed/WYHbSSOV2xw?autoplay=1&mute=0',
  },
  {
    id: 'stardew',
    name: 'Stardew Valley OST',
    desc: 'Cozy farm life ambient vibes',
    icon: '🌻',
    type: 'youtube',
    url: 'https://www.youtube.com/embed/videoseries?list=PLy4fD8t2B4EMUDqWVXETBP-sCt9VBrQD6&autoplay=1&mute=0',
  },
  {
    id: 'hollow-knight',
    name: 'Hollow Knight OST',
    desc: 'Dark atmospheric indie game score',
    icon: '🦋',
    type: 'youtube',
    url: 'https://www.youtube.com/embed/videoseries?list=PL3-p1LdE3k5z-LOHM8GpFrpBflY2D5FTL&autoplay=1&mute=0',
  },
]

// Convert any music URL to a valid embed URL
function convertToEmbedUrl(inputUrl) {
  if (!inputUrl) return null
  const trimmed = inputUrl.trim()

  // Already an embed
  if (trimmed.includes('/embed/') || trimmed.includes('embed?')) return trimmed

  // YouTube video: youtube.com/watch?v=ID or youtu.be/ID
  const ytVideoMatch = trimmed.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
  if (ytVideoMatch) {
    return `https://www.youtube.com/embed/${ytVideoMatch[1]}?autoplay=1`
  }

  // YouTube playlist: youtube.com/playlist?list=ID
  const ytPlaylistMatch = trimmed.match(/youtube\.com\/playlist\?list=([a-zA-Z0-9_-]+)/)
  if (ytPlaylistMatch) {
    return `https://www.youtube.com/embed/videoseries?list=${ytPlaylistMatch[1]}&autoplay=1`
  }

  // Spotify track/playlist/album (will have ads — user's choice)
  const spotifyMatch = trimmed.match(/open\.spotify\.com\/(track|playlist|album|artist|episode)\/([a-zA-Z0-9]+)/)
  if (spotifyMatch) {
    return `https://open.spotify.com/embed/${spotifyMatch[1]}/${spotifyMatch[2]}?utm_source=generator&theme=0`
  }

  // SoundCloud — just return as-is (user can paste SoundCloud embed code)
  return trimmed
}


export default function SpotifyModal({ isOpen, onClose }) {
  const {
    spotifyEmbedUrl,
    setSpotifyEmbedUrl,
    isMusicPlaying,
    setIsMusicPlaying,
  } = useStore()

  const { toggleBgm, isBgmPlaying } = useAudio()
  const [customInput, setCustomInput] = useState('')
  const [inputError, setInputError] = useState('')

  const handleLoadCustom = (e) => {
    e.preventDefault()
    setInputError('')
    if (!customInput.trim()) {
      setInputError('Paste a YouTube or Spotify URL.')
      return
    }
    const embedUrl = convertToEmbedUrl(customInput)
    if (embedUrl) {
      setSpotifyEmbedUrl(embedUrl)
      setIsMusicPlaying(true)
      setCustomInput('')
    } else {
      setInputError('Could not recognize the URL. Try a YouTube or Spotify link.')
    }
  }

  const handleSelectPreset = (preset) => {
    setSpotifyEmbedUrl(preset.url)
    setIsMusicPlaying(true)
  }

  const handleToggleVinylSpin = () => {
    setIsMusicPlaying(!isMusicPlaying)
  }

  // Overlay hidden but DOM stays — so iframe audio never stops
  return (
    <div
      className={styles.persistentOverlay}
      style={{ display: isOpen ? 'flex' : 'none' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      role="dialog"
      aria-modal="true"
      aria-label="Vinyl Jukebox & Spotify Player"
    >
      <div className={styles.persistentDialog}>
        {/* Header */}
        <div className={styles.persistentHeader}>
          <h2 className={styles.persistentTitle}>// VINYL JUKEBOX & SPOTIFY PLAYER</h2>
          <button
            className={styles.persistentClose}
            onClick={onClose}
            aria-label="Close — music keeps playing"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className={styles.persistentBody}>
          <div className={styles.container}>
            {/* Status Bar */}
            <div className={styles.intro}>
              <span className={styles.badge}>
                {isMusicPlaying && <span className={styles.spinningRecord}>💿 </span>}
                WALL-MOUNTED TURNTABLE
              </span>
              <div className={`${styles.vinylStatus} ${isMusicPlaying ? styles.activeStatus : ''}`}>
                <span>VINYL: </span>
                <span>{isMusicPlaying ? '● SPINNING (33 RPM)' : '○ IDLE'}</span>
              </div>
            </div>

            {/* ─── Persistent Music Player (YouTube / Spotify embed) ─── 
                Stays mounted so audio plays after modal closes. */}
            <div className={styles.playerFrameWrapper}>
              <iframe
                className={styles.spotifyFrame}
                src={spotifyEmbedUrl}
                width="100%"
                height={spotifyEmbedUrl.includes('youtube') ? '220' : '152'}
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                allowFullScreen
                title="Music Player"
              />
            </div>

            <p className={styles.hint} style={{ marginTop: '0.5rem', color: '#10b981', fontWeight: 600 }}>
              ✅ Full songs, no ads. Music keeps playing even after you close this. Stops when you leave the room.
            </p>

            {/* Custom URL Input */}
            <form className={styles.customSection} onSubmit={handleLoadCustom}>
              <label className={styles.sectionLabel} htmlFor="musicUrlInput">
                🎵 Play Your Own Music (YouTube or Spotify link)
              </label>
              <div className={styles.inputGroup}>
                <input
                  id="musicUrlInput"
                  type="text"
                  className={styles.urlInput}
                  placeholder="Paste YouTube or Spotify link..."
                  value={customInput}
                  onChange={(e) => {
                    setCustomInput(e.target.value)
                    setInputError('')
                  }}
                />
                <button type="submit" className={styles.loadBtn}>
                  Load 🎧
                </button>
              </div>
              {inputError && <span style={{ color: '#f87171', fontSize: '0.75rem' }}>{inputError}</span>}
              <span className={styles.hint}>
                Tip: Paste any Spotify link — track, album, artist, or playlist.
              </span>
            </form>

            {/* Curated Presets */}
            <div className={styles.presetSection}>
              <span className={styles.sectionLabel}>Curated Game Soundtracks &amp; Chill Beats</span>
              <div className={styles.presetGrid}>
                {CURATED_PRESETS.map((preset) => {
                  // Check if this preset is currently loaded (match by embed URL base)
                  const presetBase = preset.url.split('?')[0].split('&')[0]
                  const isActive = spotifyEmbedUrl.startsWith(presetBase)
                  return (
                    <button
                      key={preset.id}
                      className={`${styles.presetBtn} ${isActive ? styles.activePreset : ''}`}
                      onClick={() => handleSelectPreset(preset)}
                    >
                      <span className={styles.presetIcon}>{preset.icon}</span>
                      <div>
                        <div style={{ fontWeight: 600 }}>{preset.name}</div>
                        <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{preset.desc}</div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Bottom Controls */}
            <div className={styles.bottomControls}>
              <button
                className={`${styles.builtInTrackBtn} ${isBgmPlaying() ? styles.activeControl : ''}`}
                onClick={toggleBgm}
              >
                <span>{isBgmPlaying() ? '⏸' : '▶'}</span>
                <span>Procedural Game Synth ({isBgmPlaying() ? 'ON' : 'OFF'})</span>
              </button>

              <button
                className={`${styles.spinToggleBtn} ${isMusicPlaying ? styles.activeControl : ''}`}
                onClick={handleToggleVinylSpin}
              >
                <span>💿</span>
                <span>{isMusicPlaying ? 'Stop Vinyl Spin' : 'Spin Vinyl'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
