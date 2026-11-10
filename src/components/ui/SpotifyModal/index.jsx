import React, { useState, useRef, useEffect } from 'react'
import useStore from '@stores/useStore'
import { useAudio } from '@hooks/useAudio'
import styles from './SpotifyModal.module.css'

// 100% Reliable Online Ad-Free Music Channels:
// - 'stream': Direct online continuous MP3 stream (Zero ads, instant play via HTML5 audio)
// - 'youtube': Single proven embeddable YouTube video (Privacy mode, no playlist errors)
const CURATED_PRESETS = [
  {
    id: 'nightwave-synth',
    name: 'Nightwave Plaza',
    desc: '24/7 Vaporwave & Synthwave Radio',
    icon: '🌌',
    type: 'stream',
    streamUrl: 'https://radio.plaza.one/mp3',
    bitrate: 'Online Stream • No Ads',
  },
  {
    id: 'groove-salad',
    name: 'Groove Salad (Chill)',
    desc: 'World-famous ambient & lofi chill',
    icon: '☕',
    type: 'stream',
    streamUrl: 'https://ice1.somafm.com/groovesalad-128-mp3',
    bitrate: 'Online Stream • No Ads',
  },
  {
    id: 'defcon-beats',
    name: 'DEF CON Cyber Beats',
    desc: 'Music for game developers & coders',
    icon: '💻',
    type: 'stream',
    streamUrl: 'https://ice2.somafm.com/defcon-128-mp3',
    bitrate: 'Online Stream • No Ads',
  },
  {
    id: 'secret-agent',
    name: 'Secret Agent OST',
    desc: 'Spy & stealth game atmosphere',
    icon: '🕵️',
    type: 'stream',
    streamUrl: 'https://ice1.somafm.com/secretagent-128-mp3',
    bitrate: 'Online Stream • No Ads',
  },
  {
    id: 'zelda-chill',
    name: 'Zelda & Chill OST',
    desc: 'Hyrule acoustic lo-fi mix',
    icon: '🗡️',
    type: 'youtube',
    embedUrl: 'https://www.youtube-nocookie.com/embed/fefIWqBiLsI?autoplay=1&loop=1&playlist=fefIWqBiLsI&enablejsapi=1&rel=0&modestbranding=1',
    bitrate: 'GameChops OST (Infinite Loop)',
  },
  {
    id: 'minecraft-c418',
    name: 'Minecraft Calm (C418)',
    desc: 'Peaceful exploration game score',
    icon: '⛏️',
    type: 'youtube',
    embedUrl: 'https://www.youtube-nocookie.com/embed/WYHbSSOV2xw?autoplay=1&loop=1&playlist=WYHbSSOV2xw&enablejsapi=1&rel=0&modestbranding=1',
    bitrate: 'C418 Ambient Score (Infinite Loop)',
  },
  {
    id: 'lofi-girl',
    name: 'Lofi Gaming Beats',
    desc: 'Peaceful study & focus melodies',
    icon: '🎧',
    type: 'youtube',
    embedUrl: 'https://www.youtube-nocookie.com/embed/jfKfPfyJRdk?autoplay=1&loop=1&playlist=jfKfPfyJRdk&enablejsapi=1&rel=0&modestbranding=1',
    bitrate: 'Lofi Records Live (Continuous)',
  },
  {
    id: 'synthwave-arcade',
    name: '80s Arcade Synthwave',
    desc: 'Retro neon driving game soundtrack',
    icon: '🕹️',
    type: 'youtube',
    embedUrl: 'https://www.youtube-nocookie.com/embed/4xDzrJKXOOY?autoplay=1&loop=1&playlist=4xDzrJKXOOY&enablejsapi=1&rel=0&modestbranding=1',
    bitrate: 'Synthwave Live Radio (Continuous)',
  },
]

// Convert any custom music link into an embeddable URL
function convertToEmbedUrl(inputUrl) {
  if (!inputUrl) return null
  const trimmed = inputUrl.trim()

  if (trimmed.includes('youtube-nocookie.com/embed') || trimmed.includes('w.soundcloud.com/player')) {
    return trimmed
  }

  // YouTube video watch ID — add infinite loop parameters
  const ytVideoMatch = trimmed.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
  if (ytVideoMatch) {
    const vid = ytVideoMatch[1]
    return `https://www.youtube-nocookie.com/embed/${vid}?autoplay=1&loop=1&playlist=${vid}&rel=0&modestbranding=1`
  }

  // SoundCloud
  const scMatch = trimmed.match(/soundcloud\.com\/([^?]+)/)
  if (scMatch) {
    return `https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/${scMatch[1]}&color=%237c3aed&auto_play=true&hide_related=true&show_comments=false&show_user=false`
  }

  // Spotify link
  const spotifyMatch = trimmed.match(/open\.spotify\.com\/(track|playlist|album)\/([a-zA-Z0-9]+)/)
  if (spotifyMatch) {
    return `https://open.spotify.com/embed/${spotifyMatch[1]}/${spotifyMatch[2]}?utm_source=generator&theme=0`
  }

  return trimmed
}

export default function SpotifyModal({ isOpen, onClose }) {
  const { isMusicPlaying, setIsMusicPlaying } = useStore()
  const { toggleBgm, isBgmPlaying } = useAudio()

  const [activePreset, setActivePreset] = useState(CURATED_PRESETS[0])
  const [activeTab, setActiveTab] = useState('presets') // 'presets' | 'custom'
  const [customInput, setCustomInput] = useState('')
  const [customEmbedUrl, setCustomEmbedUrl] = useState(null)
  const [inputError, setInputError] = useState('')
  const [volume, setVolume] = useState(0.8)
  const [streamError, setStreamError] = useState(false)
  const [playNonce, setPlayNonce] = useState(0)

  // Direct HTML5 Audio element for online radio streams
  const audioRef = useRef(null)

  // Sync volume with audio element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  // Automatically loop/replay stream if it ever ends
  const handleAudioEnded = () => {
    if (audioRef.current && activePreset.type === 'stream') {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch(() => {})
    }
  }

  // Master Play / Pause Toggle
  const handleTogglePlay = () => {
    if (isMusicPlaying) {
      if (audioRef.current) {
        audioRef.current.pause()
      }
      setIsMusicPlaying(false)
    } else {
      setIsMusicPlaying(true)
      if (activePreset.type === 'stream') {
        if (audioRef.current) {
          audioRef.current.play().catch(() => setStreamError(true))
        }
      } else {
        // Increment nonce to reload & play YouTube embed
        setPlayNonce((n) => n + 1)
      }
    }
  }

  // Quick preset button click handler — 100% reliable continuous playback
  const handleSelectPreset = (preset) => {
    setStreamError(false)
    setActivePreset(preset)
    setCustomEmbedUrl(null)
    setPlayNonce((n) => n + 1)
    setIsMusicPlaying(true)

    if (preset.type === 'stream') {
      if (audioRef.current) {
        audioRef.current.src = preset.streamUrl
        audioRef.current.load()
        audioRef.current
          .play()
          .catch((err) => {
            console.warn('Audio play restricted by autoplay policy:', err)
          })
      }
    } else {
      // Pause audio stream when playing YouTube embed
      if (audioRef.current) {
        audioRef.current.pause()
      }
    }
  }

  // Handle custom URL load
  const handleLoadCustom = (e) => {
    e.preventDefault()
    setInputError('')
    if (!customInput.trim()) {
      setInputError('Please paste a YouTube, SoundCloud, or Spotify link.')
      return
    }

    const embedUrl = convertToEmbedUrl(customInput)
    if (embedUrl) {
      if (audioRef.current) audioRef.current.pause()
      setCustomEmbedUrl(embedUrl)
      setPlayNonce((n) => n + 1)
      setActivePreset({
        id: 'custom',
        name: 'Custom Online Stream',
        desc: customInput,
        icon: '🔗',
        type: 'youtube',
        embedUrl: embedUrl,
      })
      setIsMusicPlaying(true)
      setCustomInput('')
    } else {
      setInputError('Could not recognize the URL. Try a YouTube or SoundCloud link.')
    }
  }

  const currentEmbedUrl = customEmbedUrl || (activePreset.type === 'youtube' ? activePreset.embedUrl : null)

  return (
    <div
      className={styles.persistentOverlay}
      style={{ display: isOpen ? 'flex' : 'none' }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Vinyl Jukebox & Music Player"
    >
      {/* Background HTML5 Audio Element for Online Streams (with auto-loop & recovery) */}
      <audio
        ref={audioRef}
        src={activePreset.type === 'stream' ? activePreset.streamUrl : undefined}
        preload="auto"
        loop
        onEnded={handleAudioEnded}
        onError={() => {
          if (activePreset.type === 'stream' && isMusicPlaying) {
            setTimeout(() => {
              if (audioRef.current) {
                audioRef.current.load()
                audioRef.current.play().catch(() => setStreamError(true))
              }
            }, 1000)
          }
        }}
      />

      <div className={styles.persistentDialog}>
        {/* Header */}
        <div className={styles.persistentHeader}>
          <div className={styles.headerTitleGroup}>
            <span className={styles.headerIcon}>💿</span>
            <div>
              <h2 className={styles.persistentTitle}>VINYL JUKEBOX &amp; ONLINE PLAYER</h2>
              <span className={styles.headerSubtitle}>AD-FREE LO-FI, RETRO CHILL &amp; GAME OSTs</span>
            </div>
          </div>
          <button
            className={styles.persistentClose}
            onClick={onClose}
            aria-label="Close — music keeps playing"
            title="Close modal (music continues in room)"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className={styles.persistentBody}>
          <div className={styles.container}>
            {/* Active Playing Banner */}
            <div className={styles.nowPlayingCard}>
              <div className={styles.nowPlayingLeft}>
                <div className={`${styles.recordGraphic} ${isMusicPlaying ? styles.recordSpinning : ''}`}>
                  💿
                </div>
                <div className={styles.trackInfo}>
                  <div className={styles.statusIndicator}>
                    <span className={`${styles.statusDotLive} ${isMusicPlaying ? styles.statusPlaying : ''}`} />
                    <span className={styles.statusText}>
                      {isMusicPlaying ? 'NOW PLAYING ONLINE (NO ADS)' : 'PAUSED (CLICK TO PLAY)'}
                    </span>
                  </div>
                  <h3 className={styles.activeTrackName}>{activePreset.name}</h3>
                  <p className={styles.activeTrackDesc}>{activePreset.desc}</p>
                </div>
              </div>

              {/* Master Play/Pause & Volume */}
              <div className={styles.nowPlayingControls}>
                <button
                  className={`${styles.playPauseMasterBtn} ${isMusicPlaying ? styles.btnIsPlaying : ''}`}
                  onClick={handleTogglePlay}
                  title={isMusicPlaying ? 'Pause Music' : 'Play Music'}
                >
                  {isMusicPlaying ? '⏸ PAUSE' : '▶ PLAY'}
                </button>

                <div className={styles.volumeGroup}>
                  <span className={styles.volIcon}>🔊</span>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className={styles.volumeSlider}
                    aria-label="Volume slider"
                  />
                </div>
              </div>
            </div>

            {/* If YouTube / Custom Embed is active */}
            {currentEmbedUrl && isMusicPlaying && (
              <div className={styles.playerFrameWrapper}>
                <iframe
                  key={`${currentEmbedUrl}-${playNonce}`}
                  className={styles.spotifyFrame}
                  src={currentEmbedUrl}
                  width="100%"
                  height="210"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  allowFullScreen
                  title="Online Music Player"
                />
              </div>
            )}

            {/* Stream Status notification */}
            {streamError && (
              <p className={styles.errorMessage}>
                ⚠️ Online stream connection interrupted. Try clicking another station below!
              </p>
            )}

            {/* Navigation Tabs */}
            <div className={styles.tabs}>
              <button
                className={`${styles.tabBtn} ${activeTab === 'presets' ? styles.tabActive : ''}`}
                onClick={() => setActiveTab('presets')}
              >
                📻 Quick Stations (Click to Play)
              </button>
              <button
                className={`${styles.tabBtn} ${activeTab === 'custom' ? styles.tabActive : ''}`}
                onClick={() => setActiveTab('custom')}
              >
                🔗 Custom Link (YouTube / Spotify)
              </button>
            </div>

            {/* Quick Preset Stations Grid */}
            {activeTab === 'presets' && (
              <div className={styles.presetSection}>
                <div className={styles.presetSectionHeader}>
                  <span className={styles.sectionLabel}>CHOOSE YOUR VIBE — CLICK TO SWITCH INSTANTLY</span>
                </div>

                <div className={styles.presetGrid}>
                  {CURATED_PRESETS.map((preset) => {
                    const isSelected = activePreset.id === preset.id
                    return (
                      <button
                        key={preset.id}
                        className={`${styles.presetBtn} ${isSelected ? styles.activePreset : ''}`}
                        onClick={() => handleSelectPreset(preset)}
                      >
                        <span className={styles.presetIcon}>{preset.icon}</span>
                        <div className={styles.presetText}>
                          <div className={styles.presetNameRow}>
                            <span className={styles.presetTitle}>{preset.name}</span>
                            {preset.type === 'stream' && (
                              <span className={styles.liveBadge}>LIVE</span>
                            )}
                          </div>
                          <span className={styles.presetDesc}>{preset.desc}</span>
                        </div>

                        {isSelected && isMusicPlaying ? (
                          <div className={styles.eqWaveContainer}>
                            <span className={styles.eqBarWave} />
                            <span className={styles.eqBarWave} />
                            <span className={styles.eqBarWave} />
                          </div>
                        ) : (
                          <span className={styles.presetPlayAction}>▶</span>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Custom URL Input */}
            {activeTab === 'custom' && (
              <form className={styles.customSection} onSubmit={handleLoadCustom}>
                <label className={styles.sectionLabel} htmlFor="customMusicInput">
                  PASTE ANY YOUTUBE, SOUNDCLOUD, OR SPOTIFY LINK
                </label>
                <div className={styles.inputGroup}>
                  <input
                    id="customMusicInput"
                    type="text"
                    className={styles.urlInput}
                    placeholder="https://www.youtube.com/watch?v=... or soundcloud.com/..."
                    value={customInput}
                    onChange={(e) => {
                      setCustomInput(e.target.value)
                      setInputError('')
                    }}
                  />
                  <button type="submit" className={styles.loadBtn}>
                    Play Track 🎧
                  </button>
                </div>
                {inputError && <span className={styles.errorMessage}>{inputError}</span>}
                <span className={styles.hint}>
                  💡 Supports direct YouTube video links, SoundCloud playlists, and Spotify embed URLs.
                </span>
              </form>
            )}

            {/* Bottom Procedural BGM Bar */}
            <div className={styles.bottomControls}>
              <div className={styles.bottomLeft}>
                <button
                  className={`${styles.builtInTrackBtn} ${isBgmPlaying() ? styles.activeControl : ''}`}
                  onClick={toggleBgm}
                  title="Generate retro synth tones using Web Audio API"
                >
                  <span>{isBgmPlaying() ? '⏸' : '▶'}</span>
                  <span>Procedural Game Synth ({isBgmPlaying() ? 'ON' : 'OFF'})</span>
                </button>
              </div>

              <div className={styles.hintNote}>
                ✅ Audio keeps playing smoothly when you close this window &amp; explore the 3D room.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
