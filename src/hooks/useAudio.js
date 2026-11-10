// useAudio.js — Procedural Web Audio API Sound Effects & Groovy Chill Game Theme

import { useCallback } from 'react'
import useStore from '@stores/useStore'

let audioCtx = null
let bgmInterval = null
let isBgmPlaying = false

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)()
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume()
  }
  return audioCtx
}

// Gentle audio envelope player with warmth
function playTone({
  frequency = 440,
  type = 'sine',
  duration = 0.1,
  gain = 0.12,
  attack = 0.01,
} = {}) {
  try {
    const ctx = getAudioContext()
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)

    oscillator.type = type
    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime)

    gainNode.gain.setValueAtTime(0, ctx.currentTime)
    gainNode.gain.linearRampToValueAtTime(gain, ctx.currentTime + attack)
    gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration)

    oscillator.start(ctx.currentTime)
    oscillator.stop(ctx.currentTime + duration)
  } catch (e) {
    // Ignore audio errors
  }
}

// Warm Rhodes electric piano chime with gentle envelope
function playElectricPiano(freq, duration = 0.65, gain = 0.04) {
  try {
    const ctx = getAudioContext()
    const osc = ctx.createOscillator()
    const gainNode = ctx.createGain()
    const filter = ctx.createBiquadFilter()

    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(1400, ctx.currentTime)

    osc.type = 'triangle'
    osc.frequency.setValueAtTime(freq, ctx.currentTime)

    osc.connect(filter)
    filter.connect(gainNode)
    gainNode.connect(ctx.destination)

    gainNode.gain.setValueAtTime(0, ctx.currentTime)
    gainNode.gain.linearRampToValueAtTime(gain, ctx.currentTime + 0.02)
    gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration)

    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + duration)
  } catch (e) {
    // Ignore
  }
}

// Catchy, chill, groovy game melody notes (Persona / Stardew / Animal Crossing inspired)
// 16-step rhythmic groove pattern: [frequency, isBass, duration]
const GROOVE_STEPS = [
  { note: 440.00, bass: 110.00 }, // A4 + A2
  { note: 523.25, bass: null },   // C5
  { note: 659.25, bass: null },   // E5
  { note: 587.33, bass: 110.00 }, // D5 + A2
  { note: 523.25, bass: null },   // C5
  { note: 440.00, bass: null },   // A4
  { note: 392.00, bass: 130.81 }, // G4 + C3
  { note: 440.00, bass: null },   // A4

  { note: 349.23, bass: 87.31 },  // F4 + F2
  { note: 440.00, bass: null },   // A4
  { note: 523.25, bass: null },   // C5
  { note: 659.25, bass: 87.31 },  // E5 + F2
  { note: 587.33, bass: null },   // D5
  { note: 493.88, bass: 98.00 },  // B4 + G2
  { note: 523.25, bass: null },   // C5
  { note: 440.00, bass: 110.00 }, // A4 + A2
]

export function useAudio() {
  const audioEnabled = useStore((s) => s.audioEnabled)

  const playHover = useCallback(() => {
    if (!audioEnabled) return
    playTone({ frequency: 580, type: 'sine', duration: 0.06, gain: 0.05 })
  }, [audioEnabled])

  const playClick = useCallback(() => {
    if (!audioEnabled) return
    playTone({ frequency: 440, type: 'sine', duration: 0.1, gain: 0.08 })
    setTimeout(() => playTone({ frequency: 660, type: 'sine', duration: 0.08, gain: 0.06 }), 60)
  }, [audioEnabled])

  const playInteract = useCallback(() => {
    if (!audioEnabled) return
    playTone({ frequency: 780, type: 'sine', duration: 0.15, gain: 0.08, attack: 0.02 })
    setTimeout(() => playTone({ frequency: 1046, type: 'sine', duration: 0.14, gain: 0.07 }), 80)
  }, [audioEnabled])

  const playPacmanChomp = useCallback(() => {
    if (!audioEnabled) return
    playTone({ frequency: 240, type: 'square', duration: 0.04, gain: 0.06 })
  }, [audioEnabled])

  const playPacmanDeath = useCallback(() => {
    if (!audioEnabled) return
    const freqs = [784, 587, 440, 330, 220]
    freqs.forEach((f, i) => {
      setTimeout(() => playTone({ frequency: f, type: 'sawtooth', duration: 0.1, gain: 0.08 }), i * 75)
    })
  }, [audioEnabled])

  const playPacmanWin = useCallback(() => {
    if (!audioEnabled) return
    const melody = [440, 554, 659, 880]
    melody.forEach((f, i) => {
      setTimeout(() => playTone({ frequency: f, type: 'sine', duration: 0.2, gain: 0.12 }), i * 140)
    })
  }, [audioEnabled])

  // Fresh, cool, groovy melodic chill game track
  const toggleBgm = useCallback(() => {
    const setIsMusicPlaying = useStore.getState().setIsMusicPlaying

    if (isBgmPlaying) {
      if (bgmInterval) clearInterval(bgmInterval)
      isBgmPlaying = false
      setIsMusicPlaying(false)
      return false
    } else {
      isBgmPlaying = true
      setIsMusicPlaying(true)
      let stepIndex = 0

      bgmInterval = setInterval(() => {
        if (!isBgmPlaying) return
        const step = GROOVE_STEPS[stepIndex % GROOVE_STEPS.length]
        stepIndex++

        // Melodic keyboard note
        if (step.note) {
          playElectricPiano(step.note, 0.55, 0.035)
        }

        // Bass fundamental note
        if (step.bass) {
          playTone({
            frequency: step.bass,
            type: 'sine',
            duration: 0.5,
            gain: 0.055,
            attack: 0.03
          })
        }

        // Gentle off-beat shaker click
        if (stepIndex % 2 === 1) {
          playTone({
            frequency: 1800,
            type: 'sine',
            duration: 0.02,
            gain: 0.015,
            attack: 0.005
          })
        }
      }, 340) // ~88 BPM relaxed groove tempo

      return true
    }
  }, [])

  // Hard-stop BGM (called on room exit)
  const stopBgm = useCallback(() => {
    const setIsMusicPlaying = useStore.getState().setIsMusicPlaying
    if (bgmInterval) clearInterval(bgmInterval)
    bgmInterval = null
    isBgmPlaying = false
    setIsMusicPlaying(false)
  }, [])

  // Anime-style cute robot voice engine with distinct melodic personality for each room attraction!
  const chatterTimeoutsRef = { current: [] }

  const stopRobotVoice = useCallback(() => {
    chatterTimeoutsRef.current.forEach((t) => clearTimeout(t))
    chatterTimeoutsRef.current = []
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel()
      } catch (e) {}
    }
  }, [])

  // Handcrafted cute anime robot voices — each stop has its own adorable, unique melody!
  const playCuteRobotVoice = useCallback(
    (mood = 'welcome', onEnd) => {
      try {
        stopRobotVoice()
        const ctx = getAudioContext()

        // Preset melodic sound patterns for each unique attraction & emotion:
        // [freq, duration, type, pitchGlideMultiplier, delayFromPrevious]
        let notes = []

        const normalizedMood = (mood || 'welcome').toLowerCase()

        if (normalizedMood.includes('welcome') || normalizedMood.includes('wave') || normalizedMood.includes('intro')) {
          // Adorable rising anime greeting: "Bip-bip-be-doop! ✨"
          notes = [
            { f: 587.33, d: 0.05, type: 'triangle', g: 1.1, pause: 0.035 }, // D5
            { f: 740.0, d: 0.05, type: 'triangle', g: 1.15, pause: 0.04 }, // F#5
            { f: 880.0, d: 0.06, type: 'sine', g: 1.2, pause: 0.05 }, // A5
            { f: 1174.66, d: 0.12, type: 'sine', g: 1.05, pause: 0.06 }, // D6 glissando
            { f: 1480.0, d: 0.04, type: 'triangle', g: 1.3, pause: 0.02 }, // Cute high squeak
          ]
        } else if (normalizedMood.includes('arcade') || normalizedMood.includes('game')) {
          // Retro 8-bit chiptune coin bounce: "Bo-di-ling-bop! 👾"
          notes = [
            { f: 659.25, d: 0.04, type: 'square', g: 1.0, pause: 0.03 }, // E5
            { f: 880.0, d: 0.04, type: 'square', g: 1.0, pause: 0.03 }, // A5
            { f: 1318.5, d: 0.05, type: 'square', g: 1.0, pause: 0.04 }, // E6
            { f: 1046.5, d: 0.04, type: 'square', g: 1.0, pause: 0.03 }, // C6
            { f: 1760.0, d: 0.09, type: 'square', g: 1.05, pause: 0.05 }, // High A6 1-Up!
          ]
        } else if (normalizedMood.includes('vinyl') || normalizedMood.includes('music')) {
          // Funky sliding wah-wah robot song: "Wah-doo-be-doo! 🎵"
          notes = [
            { f: 440.0, d: 0.07, type: 'sawtooth', g: 1.35, pause: 0.05 }, // sliding wah
            { f: 659.25, d: 0.06, type: 'sine', g: 0.85, pause: 0.04 }, // doo
            { f: 554.37, d: 0.06, type: 'triangle', g: 1.25, pause: 0.04 }, // be
            { f: 880.0, d: 0.14, type: 'sine', g: 1.1, pause: 0.06 }, // doo!
          ]
        } else if (normalizedMood.includes('monitors') || normalizedMood.includes('code')) {
          // Inquisitive tech trill ending on a cute questioning squeak: "Pip-ti-ri-ri-kweep? 💻"
          notes = [
            { f: 987.77, d: 0.03, type: 'square', g: 1.0, pause: 0.025 },
            { f: 1174.66, d: 0.03, type: 'square', g: 1.0, pause: 0.025 },
            { f: 1318.51, d: 0.03, type: 'square', g: 1.0, pause: 0.025 },
            { f: 1567.98, d: 0.03, type: 'square', g: 1.0, pause: 0.03 },
            { f: 1400.0, d: 0.12, type: 'sine', g: 1.35, pause: 0.04 }, // Curious rising squeak?
          ]
        } else if (normalizedMood.includes('bookshelf') || normalizedMood.includes('books')) {
          // Warm studious flute chime: "Do-re-mi-poot 📚"
          notes = [
            { f: 523.25, d: 0.06, type: 'triangle', g: 1.0, pause: 0.04 }, // C5
            { f: 659.25, d: 0.06, type: 'triangle', g: 1.0, pause: 0.04 }, // E5
            { f: 783.99, d: 0.07, type: 'sine', g: 1.0, pause: 0.04 }, // G5
            { f: 1046.5, d: 0.13, type: 'sine', g: 0.95, pause: 0.05 }, // Gentle C6
          ]
        } else if (normalizedMood.includes('trophy') || normalizedMood.includes('star')) {
          // Triumphant cute brass fanfare: "Ta-da-da-da-DA! 🏆"
          notes = [
            { f: 523.25, d: 0.04, type: 'triangle', g: 1.0, pause: 0.03 },
            { f: 523.25, d: 0.04, type: 'triangle', g: 1.0, pause: 0.03 },
            { f: 523.25, d: 0.04, type: 'triangle', g: 1.0, pause: 0.03 },
            { f: 659.25, d: 0.06, type: 'triangle', g: 1.0, pause: 0.04 },
            { f: 783.99, d: 0.06, type: 'sine', g: 1.0, pause: 0.04 },
            { f: 1046.5, d: 0.16, type: 'sine', g: 1.1, pause: 0.06 },
          ]
        } else if (normalizedMood.includes('giggle') || normalizedMood.includes('tickle')) {
          // Playful tickle giggles when tapping Byte: "Kwi-kwee! 😄"
          notes = [
            { f: 880.0, d: 0.04, type: 'sine', g: 1.45, pause: 0.03 },
            { f: 1320.0, d: 0.06, type: 'triangle', g: 1.35, pause: 0.05 },
            { f: 1100.0, d: 0.04, type: 'sine', g: 1.45, pause: 0.03 },
            { f: 1650.0, d: 0.08, type: 'triangle', g: 1.3, pause: 0.04 },
          ]
        } else {
          // Cheerful celebration trill: "Yaaay! Pip-pip-hurray! 🎉"
          notes = [
            { f: 783.99, d: 0.04, type: 'sine', g: 1.1, pause: 0.03 },
            { f: 987.77, d: 0.04, type: 'sine', g: 1.1, pause: 0.03 },
            { f: 1174.66, d: 0.05, type: 'sine', g: 1.15, pause: 0.04 },
            { f: 1567.98, d: 0.05, type: 'triangle', g: 1.2, pause: 0.04 },
            { f: 2093.0, d: 0.12, type: 'sine', g: 1.05, pause: 0.06 },
          ]
        }

        let timeOffset = 0
        notes.forEach((note) => {
          const timeoutId = setTimeout(() => {
            try {
              const now = ctx.currentTime
              const osc = ctx.createOscillator()
              const gain = ctx.createGain()
              const filter = ctx.createBiquadFilter()

              osc.type = note.type || 'sine'
              osc.frequency.setValueAtTime(note.f, now)
              if (note.g && note.g !== 1.0) {
                osc.frequency.exponentialRampToValueAtTime(
                  Math.max(100, note.f * note.g),
                  now + note.d
                )
              }

              // Warm lowpass filter to remove harshness and give sweet anime chime feel
              filter.type = 'lowpass'
              filter.frequency.setValueAtTime(2800, now)

              // Soft cute envelope
              gain.gain.setValueAtTime(0, now)
              gain.gain.linearRampToValueAtTime(0.045, now + 0.006)
              gain.gain.exponentialRampToValueAtTime(0.0001, now + note.d)

              osc.connect(filter)
              filter.connect(gain)
              gain.connect(ctx.destination)

              osc.start(now)
              osc.stop(now + note.d)
            } catch (err) {}
          }, timeOffset * 1000)

          chatterTimeoutsRef.current.push(timeoutId)
          timeOffset += note.d + (note.pause || 0.03)
        })

        const endTimeout = setTimeout(() => {
          onEnd?.()
        }, (timeOffset + 0.04) * 1000)
        chatterTimeoutsRef.current.push(endTimeout)
      } catch (e) {
        onEnd?.()
      }
    },
    [stopRobotVoice]
  )

  // Speaks using cute anime robot voice mapped to mood/stop
  const speakRobotVoice = useCallback(
    (moodOrText, onEnd) => {
      playCuteRobotVoice(moodOrText, onEnd)
    },
    [playCuteRobotVoice]
  )

  // Glitchy robotic droid chirps for single clicks or jumps
  const playRobotChirp = useCallback((type = 'happy') => {
    try {
      const ctx = getAudioContext()
      const freqs =
        type === 'happy'
          ? [700, 1100, 1500]
          : type === 'glitch'
          ? [1200, 420, 1600, 310]
          : [800, 1200]

      freqs.forEach((f, i) => {
        setTimeout(() => {
          const osc = ctx.createOscillator()
          const gain = ctx.createGain()
          osc.type = i % 2 === 0 ? 'sine' : 'triangle'
          osc.frequency.setValueAtTime(f, ctx.currentTime)
          osc.frequency.exponentialRampToValueAtTime(f * (i % 2 === 0 ? 1.3 : 0.7), ctx.currentTime + 0.035)
          gain.gain.setValueAtTime(0.038, ctx.currentTime)
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04)
          osc.connect(gain)
          gain.connect(ctx.destination)
          osc.start()
          osc.stop(ctx.currentTime + 0.04)
        }, i * 35)
      })
    } catch (e) {
      // Ignore
    }
  }, [])

  return {
    playHover,
    playClick,
    playInteract,
    playPacmanChomp,
    playPacmanDeath,
    playPacmanWin,
    playRobotChirp,
    speakRobotVoice,
    stopRobotVoice,
    toggleBgm,
    stopBgm,
    isBgmPlaying: () => isBgmPlaying,
  }
}
