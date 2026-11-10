import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import { gsap } from 'gsap'
import useStore from '@stores/useStore'
import { useAudio } from '@hooks/useAudio'
import styles from './RobotGuide3D.module.css'

// Room Attraction 3D Coordinates
const TOUR_STOPS = [
  {
    id: 'welcome',
    title: "Hi there! I'm Byte! 🤖",
    spokenText: "Hi there! I'm Byte, your virtual room assistant! Let me give you a quick 30-second tour of Satvik's 3D workspace.",
    desc: "Welcome to Satvik's 3D workspace! Would you like a quick interactive tour to see the hidden games, music, and developer secrets?",
    pos: [0, 1.45, 1.4],
    color: '#38bdf8',
    expression: 'wave',
    boxSide: 'right',
    facingY: 0,
  },
  {
    id: 'arcade',
    title: 'Arcade Cabinet 🕹️',
    spokenText: 'Over on the right is a retro arcade machine! Click it to inspect Unity game prototypes or play a full session of classic Pac-Man directly in your browser.',
    desc: "Over on the right is a retro arcade machine! Click it to inspect Satvik's Unity game prototypes or play a full round of classic Pac-Man.",
    pos: [1.65, 1.45, 0.4],
    color: '#06b6d4',
    expression: 'game',
    boxSide: 'left',
    facingY: -Math.PI * 0.35,
  },
  {
    id: 'vinyl',
    title: 'Vinyl Jukebox 💿',
    spokenText: 'Mounted on the back-right wall is a turntable. Click it to open the ad-free music player with curated video game soundtracks and lo-fi chill beats.',
    desc: 'Mounted on the back-right wall is a turntable. Click it to open the ad-free music player with curated game soundtracks and chill beats.',
    pos: [0.85, 1.95, -0.85],
    color: '#a855f7',
    expression: 'music',
    boxSide: 'left',
    facingY: -Math.PI * 0.25,
  },
  {
    id: 'monitors',
    title: 'Battle Station 🖥️',
    spokenText: 'The curved monitors directly ahead showcase real Unity gameplay code, IDE setups, and shader workflows from recent projects.',
    desc: 'The dual curved screens showcase real Unity gameplay code, IDE setups, and shader workflows from Satvik’s recent projects.',
    pos: [0, 1.5, 0.3],
    color: '#38bdf8',
    expression: 'code',
    boxSide: 'right',
    facingY: 0,
  },
  {
    id: 'bookshelf',
    title: 'Skills & Background 📚',
    spokenText: "Over on the left wall is the bookshelf with Satvik's engineering backstory, C# and Unity mechanics, and studio internship details.",
    desc: 'Click the tall bookshelf on the left wall to open Satvik’s technical bio, skill matrix (C#, Unity, physics mechanics), and studio internship details.',
    pos: [-2.05, 1.45, -0.2],
    color: '#10b981',
    expression: 'books',
    boxSide: 'right',
    facingY: Math.PI * 0.35,
  },
  {
    id: 'trophy',
    title: 'Trophy Shelf 🏆',
    spokenText: 'Mounted high on the back wall above the screens is the trophy shelf. Click it to browse awards, hackathon highlights, and developer achievements.',
    desc: 'Mounted above the monitors is the trophy display. Click it to browse awards, hackathon highlights, and developer achievements.',
    pos: [0, 2.05, -0.3],
    color: '#f59e0b',
    expression: 'star',
    boxSide: 'left',
    facingY: 0,
  },
  {
    id: 'chair',
    title: 'Interactive 3D Freedom 🪑',
    spokenText: 'You have full control! Drag anywhere to orbit the camera, scroll to zoom, click the chair to spin it, or tap the whiteboard to sketch notes.',
    desc: 'You have full control! Drag to orbit the camera, scroll to zoom, click the chair to spin it, or tap the whiteboard on the left wall to sketch notes.',
    pos: [0.4, 1.3, 0.9],
    color: '#ec4899',
    expression: 'cheer',
    boxSide: 'left',
    facingY: -Math.PI * 0.15,
  },
]

export default function RobotGuide3D() {
  const groupRef = useRef()
  const bodyRef = useRef()
  const leftHandRef = useRef()
  const rightHandRef = useRef()
  const thrusterFlameRef = useRef()
  const antennaOrbRef = useRef()
  const visorMeshRef = useRef()

  const tourStep = useStore((s) => s.tourStep)
  const tourActive = useStore((s) => s.tourActive)
  const setTourStep = useStore((s) => s.setTourStep)
  const setTourActive = useStore((s) => s.setTourActive)
  const completeTour = useStore((s) => s.completeTour)

  const { playInteract, playHover, playRobotChirp, speakRobotVoice, stopRobotVoice } = useAudio()

  const [voiceEnabled, setVoiceEnabled] = useState(true)
  const [activeExpression, setActiveExpression] = useState('wave')
  const [isBlinking, setIsBlinking] = useState(false)
  const [isLanded, setIsLanded] = useState(true)

  const currentPos = useRef({ x: 0, y: 1.45, z: 1.4 })
  const isFlying = useRef(false)

  // 1. Dynamic Visor Canvas Texture (Draws cute animated pixel/LED eyes)
  const { visorTexture, canvas } = useMemo(() => {
    const cvs = document.createElement('canvas')
    cvs.width = 128
    cvs.height = 64
    const tex = new THREE.CanvasTexture(cvs)
    tex.generateMipmaps = false
    tex.minFilter = THREE.LinearFilter
    return { visorTexture: tex, canvas: cvs }
  }, [])

  // Draw facial expressions on the visor texture
  const drawVisorExpression = useCallback(
    (expr, blink = false) => {
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      // Dark digital visor background
      ctx.fillStyle = '#060814'
      ctx.fillRect(0, 0, 128, 64)

      // Color based on active expression
      const eyeColor =
        expr === 'star' ? '#fbbf24' : expr === 'books' ? '#34d399' : expr === 'cheer' ? '#f43f5e' : '#38bdf8'

      ctx.fillStyle = eyeColor
      ctx.strokeStyle = eyeColor
      ctx.lineWidth = 3
      ctx.lineCap = 'round'

      if (blink) {
        // Closed horizontal lines
        ctx.beginPath()
        ctx.moveTo(32, 34)
        ctx.lineTo(50, 34)
        ctx.moveTo(78, 34)
        ctx.lineTo(96, 34)
        ctx.stroke()
        visorTexture.needsUpdate = true
        return
      }

      switch (expr) {
        case 'game':
          // Left: D-Pad cross; Right: Action buttons
          ctx.fillRect(36, 26, 8, 18)
          ctx.fillRect(31, 31, 18, 8)
          ctx.beginPath()
          ctx.arc(84, 30, 4, 0, Math.PI * 2)
          ctx.arc(92, 40, 4, 0, Math.PI * 2)
          ctx.fill()
          break

        case 'music':
          // Jamming closed happy lines with music note
          ctx.beginPath()
          ctx.moveTo(34, 33)
          ctx.lineTo(48, 33)
          ctx.moveTo(80, 33)
          ctx.lineTo(94, 33)
          ctx.stroke()
          ctx.font = 'bold 16px sans-serif'
          ctx.fillText('♪', 60, 26)
          break

        case 'star':
          // Big shining stars
          ctx.font = 'bold 20px sans-serif'
          ctx.textAlign = 'center'
          ctx.fillText('★', 42, 42)
          ctx.fillText('★', 86, 42)
          break

        case 'code':
          // Angle brackets < >
          ctx.font = 'bold 20px monospace'
          ctx.textAlign = 'center'
          ctx.fillText('<', 40, 40)
          ctx.fillText('>', 88, 40)
          break

        case 'books':
          // Anime wide happy eyes
          ctx.beginPath()
          ctx.arc(42, 34, 9, 0, Math.PI * 2)
          ctx.arc(86, 34, 9, 0, Math.PI * 2)
          ctx.fill()
          ctx.fillStyle = '#ffffff'
          ctx.beginPath()
          ctx.arc(40, 31, 3, 0, Math.PI * 2)
          ctx.arc(84, 31, 3, 0, Math.PI * 2)
          ctx.fill()
          break

        case 'cheer':
          // Winking left eye + heart right eye
          ctx.beginPath()
          ctx.arc(42, 36, 8, Math.PI, 0, false)
          ctx.stroke()
          ctx.font = 'bold 18px sans-serif'
          ctx.textAlign = 'center'
          ctx.fillText('♥', 86, 40)
          break

        case 'glitch':
          // Spiral / dizzy eyes
          ctx.font = 'bold 20px sans-serif'
          ctx.textAlign = 'center'
          ctx.fillText('@', 42, 42)
          ctx.fillText('@', 86, 42)
          break

        case 'wave':
        default:
          // Happy curved arcs ^ ^
          ctx.beginPath()
          ctx.arc(42, 36, 8, Math.PI, 0, false)
          ctx.arc(86, 36, 8, Math.PI, 0, false)
          ctx.stroke()
          break
      }

      // Cute pink blush dots
      ctx.fillStyle = '#f43f5e'
      ctx.globalAlpha = 0.55
      ctx.beginPath()
      ctx.arc(28, 44, 4, 0, Math.PI * 2)
      ctx.arc(100, 44, 4, 0, Math.PI * 2)
      ctx.fill()
      ctx.globalAlpha = 1.0

      visorTexture.needsUpdate = true
    },
    [canvas, visorTexture]
  )

  // Periodic random blinking
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true)
      drawVisorExpression(activeExpression, true)
      setTimeout(() => {
        setIsBlinking(false)
        drawVisorExpression(activeExpression, false)
      }, 150)
    }, 3800)
    return () => clearInterval(blinkInterval)
  }, [activeExpression, drawVisorExpression])

  // Update expression on step change
  useEffect(() => {
    const stepConfig = TOUR_STOPS[tourStep] || TOUR_STOPS[0]
    setActiveExpression(stepConfig.expression)
    drawVisorExpression(stepConfig.expression, false)
  }, [tourStep, drawVisorExpression])

  // 2. Physical 3D Flight & Waypoint Hop Animation
  useEffect(() => {
    if (!groupRef.current) return

    const waypointIndex = Math.min(Math.max(tourStep, 0), TOUR_STOPS.length - 1)
    const target = TOUR_STOPS[waypointIndex]

    isFlying.current = true
    setIsLanded(false)
    stopRobotVoice()

    const startY = currentPos.current.y
    const targetY = target.pos[1]
    const midY = Math.max(startY, targetY) + 0.35

    const deltaX = target.pos[0] - currentPos.current.x
    const deltaZ = target.pos[2] - currentPos.current.z
    const flightDist = Math.hypot(deltaX, deltaZ)

    // Dynamic flight heading: turn face & body toward travel direction!
    const flightHeadingY = flightDist > 0.05 ? Math.atan2(deltaX, deltaZ) : 0
    const bankZ = Math.min(Math.max(-deltaX * 0.45, -0.38), 0.38)
    const landingFacingY = target.facingY || 0

    const tl = gsap.timeline({
      onComplete: () => {
        isFlying.current = false
        setIsLanded(true)
        if (bodyRef.current) {
          gsap.to(bodyRef.current.rotation, {
            z: 0,
            x: 0,
            y: landingFacingY,
            duration: 0.35,
            ease: 'back.out(2)',
          })
        }
        // Speak once Byte safely lands at the attraction!
        if (tourActive && voiceEnabled) {
          speakRobotVoice(target.id || target.expression)
        } else if (tourActive) {
          playRobotChirp('happy')
        }
      },
    })

    if (bodyRef.current) {
      // 1. Turn face & body toward travel vector and tilt forward into the flight
      tl.to(
        bodyRef.current.rotation,
        {
          y: flightHeadingY,
          z: bankZ,
          x: -0.22,
          duration: 0.3,
          ease: 'power2.out',
        },
        0
      )

      // 2. Towards landing, pivot face smoothly to look at user/attraction!
      tl.to(
        bodyRef.current.rotation,
        {
          y: landingFacingY,
          z: 0,
          x: 0,
          duration: 0.45,
          ease: 'power2.inOut',
        },
        0.65
      )
    }

    tl.to(
      currentPos.current,
      {
        x: target.pos[0],
        z: target.pos[2],
        duration: 1.0,
        ease: 'power2.inOut',
        onUpdate: () => {
          if (groupRef.current) {
            groupRef.current.position.x = currentPos.current.x
            groupRef.current.position.z = currentPos.current.z
          }
        },
      },
      0
    )

    tl.to(
      currentPos.current,
      {
        y: midY,
        duration: 0.45,
        ease: 'power2.out',
        onUpdate: () => {
          if (groupRef.current) groupRef.current.position.y = currentPos.current.y
        },
      },
      0
    )
    tl.to(
      currentPos.current,
      {
        y: targetY,
        duration: 0.55,
        ease: 'bounce.out',
        onUpdate: () => {
          if (groupRef.current) groupRef.current.position.y = currentPos.current.y
        },
      },
      0.45
    )

    return () => {
      tl.kill()
    }
  }, [tourStep, tourActive, voiceEnabled, speakRobotVoice, stopRobotVoice, playRobotChirp])

  // Continuous animation frame: idle hover bobbing, hand flapping, thruster cone
  // IMPORTANT: Bobbing is applied to bodyRef ONLY so the speech bubble group stays 100% stable!
  useFrame((state) => {
    const time = state.clock.getElapsedTime()

    if (bodyRef.current && !isFlying.current) {
      bodyRef.current.position.y = Math.sin(time * 3.2) * 0.035
      const currentStop = TOUR_STOPS[tourStep] || TOUR_STOPS[0]
      const targetFacing = currentStop.facingY || 0
      bodyRef.current.rotation.y = targetFacing + Math.sin(time * 1.5) * 0.06
    }

    if (leftHandRef.current && rightHandRef.current) {
      leftHandRef.current.position.y = -0.06 + Math.sin(time * 4.5) * 0.02
      rightHandRef.current.position.y = -0.06 + Math.cos(time * 4.5) * 0.02
    }

    if (thrusterFlameRef.current) {
      const flameScale = 0.85 + Math.sin(time * 18) * 0.3
      thrusterFlameRef.current.scale.y = isFlying.current ? flameScale * 1.7 : flameScale
      thrusterFlameRef.current.scale.x = isFlying.current ? 1.25 : 1.0
    }

    if (antennaOrbRef.current) {
      antennaOrbRef.current.scale.setScalar(0.9 + Math.sin(time * 4) * 0.2)
    }
  })

  // Interactive Click: Byte backflips, giggles, and changes expression
  const handleRobotClick = (e) => {
    e.stopPropagation()
    playInteract()
    speakRobotVoice('giggle')

    // Visor glitch / winking face
    drawVisorExpression('cheer', false)
    setTimeout(() => drawVisorExpression(activeExpression, false), 900)

    if (bodyRef.current) {
      const currentStop = TOUR_STOPS[tourStep] || TOUR_STOPS[0]
      const targetFacing = currentStop.facingY || 0

      gsap.to(bodyRef.current.rotation, {
        x: bodyRef.current.rotation.x + Math.PI * 2,
        y: targetFacing,
        duration: 0.6,
        ease: 'power2.out',
      })
      gsap.to(bodyRef.current.position, {
        y: 0.16,
        duration: 0.25,
        yoyo: true,
        repeat: 1,
        ease: 'power2.out',
      })
    }

    // If tour is not active, clicking Byte starts/restarts the tour!
    if (!tourActive) {
      setTourActive(true)
      setTourStep(0)
    }
  }

  // Navigation handlers
  const handleNextStep = (e) => {
    e.stopPropagation()
    playInteract()
    if (tourStep < TOUR_STOPS.length - 1) {
      setTourStep(tourStep + 1)
    } else {
      handleCloseTour(e)
    }
  }

  const handlePrevStep = (e) => {
    e.stopPropagation()
    playInteract()
    if (tourStep > 0) {
      setTourStep(tourStep - 1)
    }
  }

  const handleCloseTour = (e) => {
    e?.stopPropagation()
    playInteract()
    stopRobotVoice()
    setTourActive(false)
    completeTour()
  }

  const toggleVoice = (e) => {
    e.stopPropagation()
    playInteract()
    if (voiceEnabled) {
      stopRobotVoice()
      setVoiceEnabled(false)
    } else {
      setVoiceEnabled(true)
      const stepConfig = TOUR_STOPS[tourStep] || TOUR_STOPS[0]
      speakRobotVoice(stepConfig.id || stepConfig.expression)
    }
  }

  const currentStopData = TOUR_STOPS[tourStep] || TOUR_STOPS[0]

  return (
    <group
      ref={groupRef}
      position={[currentPos.current.x, currentPos.current.y, currentPos.current.z]}
      onClick={handleRobotClick}
      onPointerOver={() => playHover()}
    >
      {/* ─── 3D ROBOT BODY ─── */}
      <group ref={bodyRef}>
        {/* Main Torso/Head Capsule */}
        <mesh castShadow position={[0, 0, 0]}>
          <capsuleGeometry args={[0.09, 0.08, 16, 16]} />
          <meshStandardMaterial color="#221b38" roughness={0.35} metalness={0.7} />
        </mesh>

        {/* Visor Screen Mesh with Dynamic Canvas Texture */}
        <mesh ref={visorMeshRef} position={[0, 0.02, 0.082]}>
          <boxGeometry args={[0.13, 0.065, 0.02]} />
          <meshBasicMaterial map={visorTexture} />
        </mesh>

        {/* Headphone Ears */}
        <mesh position={[-0.105, 0.02, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.03, 0.03, 0.02, 16]} />
          <meshStandardMaterial color="#64748b" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[0.105, 0.02, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.03, 0.03, 0.02, 16]} />
          <meshStandardMaterial color="#64748b" metalness={0.8} roughness={0.3} />
        </mesh>

        {/* Antenna Stem */}
        <mesh position={[0, 0.14, 0]}>
          <cylinderGeometry args={[0.004, 0.004, 0.05, 8]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Glowing Antenna Orb */}
        <mesh ref={antennaOrbRef} position={[0, 0.17, 0]}>
          <sphereGeometry args={[0.014, 16, 16]} />
          <meshBasicMaterial color={currentStopData.color} />
        </mesh>

        {/* Floating Robotic Hands */}
        <mesh ref={leftHandRef} position={[-0.12, -0.06, 0.03]}>
          <sphereGeometry args={[0.018, 12, 12]} />
          <meshStandardMaterial color="#475569" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh ref={rightHandRef} position={[0.12, -0.06, 0.03]}>
          <sphereGeometry args={[0.018, 12, 12]} />
          <meshStandardMaterial color="#475569" metalness={0.8} roughness={0.3} />
        </mesh>

        {/* Thruster Ring & Jet Flame */}
        <mesh position={[0, -0.1, 0]}>
          <torusGeometry args={[0.04, 0.008, 12, 24]} />
          <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.2} />
        </mesh>

        <mesh ref={thrusterFlameRef} position={[0, -0.14, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.026, 0.07, 16]} />
          <meshBasicMaterial color={currentStopData.color} opacity={0.85} transparent />
        </mesh>

        {/* Ground Glow */}
        <pointLight position={[0, -0.1, 0]} color={currentStopData.color} intensity={0.7} distance={1.2} />
      </group>

      {/* ─── 3D FLOATING SPEECH BUBBLE (BESIDE BYTE AT ATTRACTION, 100% STABLE!) ─── */}
      {tourActive && isLanded && (
        <Html
          position={currentStopData.boxSide === 'left' ? [-0.22, 0.04, 0] : [0.22, 0.04, 0]}
          style={{ pointerEvents: 'auto' }}
        >
          <div
            className={`${styles.speechBubbleContainer} ${
              currentStopData.boxSide === 'left' ? styles.sideLeft : styles.sideRight
            }`}
            style={{ '--bubble-accent': currentStopData.color }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className={styles.bubbleHeader}>
              <div className={styles.botBadgeGroup}>
                <span className={styles.botIconAvatar}>🤖</span>
                <span className={styles.botName}>BYTE</span>
                <span className={styles.stepIndicator}>
                  {tourStep + 1} / {TOUR_STOPS.length}
                </span>
              </div>

              <div className={styles.headerActions}>
                <button
                  className={`${styles.voiceToggleBtn} ${voiceEnabled ? styles.voiceActive : ''}`}
                  onClick={toggleVoice}
                  title={voiceEnabled ? 'Mute Anime Voice' : 'Enable Anime Voice'}
                >
                  {voiceEnabled ? '🔊 SFX' : '🔇 OFF'}
                </button>
                <button
                  className={styles.closeBubbleBtn}
                  onClick={handleCloseTour}
                  title="Close Guide"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Spoken Dialog Body */}
            <div className={styles.bubbleBody}>
              <h4 className={styles.bubbleTitle}>{currentStopData.title}</h4>
              <p className={styles.bubbleText}>{currentStopData.desc}</p>
            </div>

            {/* Interactive Footer Controls */}
            <div className={styles.bubbleFooter}>
              <button
                className={styles.navBtnSmall}
                onClick={handlePrevStep}
                disabled={tourStep === 0}
              >
                ◀ Prev
              </button>

              <button className={styles.nextBtnAction} onClick={handleNextStep}>
                {tourStep === TOUR_STOPS.length - 1 ? 'FINISH 🎮' : 'NEXT ▶'}
              </button>
            </div>
          </div>
        </Html>
      )}

      {/* Idle Prompt Badge when tour is inactive: strictly beside Byte */}
      {!tourActive && (
        <Html position={[0.2, 0.04, 0]}>
          <div className={`${styles.idlePromptBadge} ${styles.sideRight}`} onClick={handleRobotClick}>
            <span className={styles.badgeWink}>🤖</span>
            <span>Click Byte for Tour!</span>
          </div>
        </Html>
      )}
    </group>
  )
}
