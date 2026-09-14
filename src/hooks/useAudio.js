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

  return {
    playHover,
    playClick,
    playInteract,
    playPacmanChomp,
    playPacmanDeath,
    playPacmanWin,
    toggleBgm,
    stopBgm,
    isBgmPlaying: () => isBgmPlaying,
  }
}
