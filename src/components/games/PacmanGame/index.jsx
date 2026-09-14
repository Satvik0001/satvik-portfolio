import React, { useRef, useEffect, useState, useCallback } from 'react'
import GameHUD from './GameHUD'
import GameOverScreen from './GameOverScreen'
import { useAudio } from '@hooks/useAudio'
import styles from './PacmanGame.module.css'

// 19 cols x 21 rows classic layout
// 1 = Wall, 0 = Pellet, 2 = Power Pellet, 3 = Empty, 4 = Ghost House
const INITIAL_MAZE = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 2, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 2, 1],
  [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1],
  [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 0, 1, 1, 1, 3, 1, 3, 1, 1, 1, 0, 1, 1, 1, 1],
  [3, 3, 3, 1, 0, 1, 3, 3, 3, 3, 3, 3, 3, 1, 0, 1, 3, 3, 3],
  [1, 1, 1, 1, 0, 1, 3, 1, 1, 3, 1, 1, 3, 1, 0, 1, 1, 1, 1],
  [3, 3, 3, 3, 0, 3, 3, 1, 4, 4, 4, 1, 3, 3, 0, 3, 3, 3, 3],
  [1, 1, 1, 1, 0, 1, 3, 1, 1, 1, 1, 1, 3, 1, 0, 1, 1, 1, 1],
  [3, 3, 3, 1, 0, 1, 3, 3, 3, 3, 3, 3, 3, 1, 0, 1, 3, 3, 3],
  [1, 1, 1, 1, 0, 1, 3, 1, 1, 1, 1, 1, 3, 1, 0, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1],
  [1, 2, 0, 1, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 1, 0, 2, 1],
  [1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1],
  [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
]

const CELL_SIZE = 22
const COLS = 19
const ROWS = 21

const SPEED_PROFILES = {
  chill: { pac: 1.45, ghost: 0.82, label: 'CHILL' },
  normal: { pac: 1.55, ghost: 0.98, label: 'NORMAL' },
  turbo: { pac: 1.85, ghost: 1.25, label: 'TURBO' },
}

const GHOST_DEFS = [
  { id: 'blinky', name: 'Blinky', color: '#ef4444', startX: 9, startY: 8, releaseDelay: 0 },
  { id: 'pinky', name: 'Pinky', color: '#f472b6', startX: 9, startY: 10, releaseDelay: 120 },
  { id: 'inky', name: 'Inky', color: '#38bdf8', startX: 8, startY: 10, releaseDelay: 280 },
  { id: 'clyde', name: 'Clyde', color: '#fb923c', startX: 10, startY: 10, releaseDelay: 450 },
]

export default function PacmanGame({ onViewProjects, isPaused = false }) {
  const canvasRef = useRef(null)
  const { playPacmanChomp, playPacmanDeath, playPacmanWin } = useAudio()

  const [difficulty, setDifficulty] = useState('normal')
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('satvik-pacman-high') || '2500', 10)
  })
  const [lives, setLives] = useState(5) // 5 lives for a relaxed, enjoyable experience
  const [dotsRemaining, setDotsRemaining] = useState(136)
  const [gameState, setGameState] = useState('playing')
  const [powerActive, setPowerActive] = useState(false)

  // Game references
  const mazeRef = useRef(INITIAL_MAZE.map((r) => [...r]))
  const pacmanRef = useRef({
    x: 9 * CELL_SIZE + CELL_SIZE / 2,
    y: 16 * CELL_SIZE + CELL_SIZE / 2,
    dirX: 0,
    dirY: 0,
    nextDirX: 0,
    nextDirY: 0,
    speed: SPEED_PROFILES.normal.pac,
    mouthAngle: 0.2,
    mouthDir: 1,
  })

  const ghostsRef = useRef(
    GHOST_DEFS.map((g) => ({
      ...g,
      x: g.startX * CELL_SIZE + CELL_SIZE / 2,
      y: g.startY * CELL_SIZE + CELL_SIZE / 2,
      dirX: 0,
      dirY: g.id === 'blinky' ? -1 : 1,
      speed: SPEED_PROFILES.normal.ghost,
      frightened: 0,
      state: g.id === 'blinky' ? 'roaming' : 'in_house',
      timer: g.releaseDelay,
      bobOffset: 0,
    }))
  )

  const frightenedTimerRef = useRef(0)
  const frameCountRef = useRef(0)

  // Update speeds on difficulty change
  useEffect(() => {
    const profile = SPEED_PROFILES[difficulty]
    pacmanRef.current.speed = profile.pac
    ghostsRef.current.forEach((g) => {
      g.speed = profile.ghost
    })
  }, [difficulty])

  // Restart function
  const restartGame = useCallback(() => {
    mazeRef.current = INITIAL_MAZE.map((r) => [...r])
    let dots = 0
    mazeRef.current.forEach((r) =>
      r.forEach((c) => {
        if (c === 0 || c === 2) dots++
      })
    )
    setDotsRemaining(dots)
    setScore(0)
    setLives(5)
    setGameState('playing')
    setPowerActive(false)
    frameCountRef.current = 0

    const profile = SPEED_PROFILES[difficulty]
    pacmanRef.current = {
      x: 9 * CELL_SIZE + CELL_SIZE / 2,
      y: 16 * CELL_SIZE + CELL_SIZE / 2,
      dirX: 0,
      dirY: 0,
      nextDirX: 0,
      nextDirY: 0,
      speed: profile.pac,
      mouthAngle: 0.2,
      mouthDir: 1,
    }

    ghostsRef.current = GHOST_DEFS.map((g) => ({
      ...g,
      x: g.startX * CELL_SIZE + CELL_SIZE / 2,
      y: g.startY * CELL_SIZE + CELL_SIZE / 2,
      dirX: 0,
      dirY: g.id === 'blinky' ? -1 : 1,
      speed: profile.ghost,
      frightened: 0,
      state: g.id === 'blinky' ? 'roaming' : 'in_house',
      timer: g.releaseDelay,
      bobOffset: 0,
    }))
  }, [difficulty])

  // Input Handling
  const setDirection = useCallback((dx, dy) => {
    pacmanRef.current.nextDirX = dx
    pacmanRef.current.nextDirY = dy
  }, [])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameState !== 'playing' || isPaused) return
      if (['ArrowUp', 'KeyW'].includes(e.code)) {
        e.preventDefault()
        setDirection(0, -1)
      } else if (['ArrowDown', 'KeyS'].includes(e.code)) {
        e.preventDefault()
        setDirection(0, 1)
      } else if (['ArrowLeft', 'KeyA'].includes(e.code)) {
        e.preventDefault()
        setDirection(-1, 0)
      } else if (['ArrowRight', 'KeyD'].includes(e.code)) {
        e.preventDefault()
        setDirection(1, 0)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [gameState, isPaused, setDirection])

  // Count initial dots on mount
  useEffect(() => {
    let count = 0
    INITIAL_MAZE.forEach((r) =>
      r.forEach((c) => {
        if (c === 0 || c === 2) count++
      })
    )
    setDotsRemaining(count)
  }, [])

  // Main Game Loop
  useEffect(() => {
    if (gameState !== 'playing' || isPaused) return

    let animId
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const isSolidForPac = (gridX, gridY) => {
      if (gridX < 0 || gridX >= COLS || gridY < 0 || gridY >= ROWS) return false
      const cell = mazeRef.current[gridY]?.[gridX]
      return cell === 1 || cell === 4
    }

    const isSolidForGhost = (gridX, gridY) => {
      if (gridX < 0 || gridX >= COLS || gridY < 0 || gridY >= ROWS) return false
      const cell = mazeRef.current[gridY]?.[gridX]
      return cell === 1 || cell === 4
    }

    const gameLoop = () => {
      frameCountRef.current++
      const pac = pacmanRef.current
      const ghosts = ghostsRef.current

      // Frightened countdown
      if (frightenedTimerRef.current > 0) {
        frightenedTimerRef.current -= 1
        if (frightenedTimerRef.current === 0) {
          ghosts.forEach((g) => (g.frightened = 0))
          setPowerActive(false)
        }
      }

      // ---- 1. MOVE PAC-MAN ----
      const currentGridX = Math.floor(pac.x / CELL_SIZE)
      const currentGridY = Math.floor(pac.y / CELL_SIZE)
      const centerX = currentGridX * CELL_SIZE + CELL_SIZE / 2
      const centerY = currentGridY * CELL_SIZE + CELL_SIZE / 2

      const distToCenter = Math.hypot(pac.x - centerX, pac.y - centerY)

      if (distToCenter < 5 && (pac.nextDirX !== 0 || pac.nextDirY !== 0)) {
        const nextTargetX = currentGridX + pac.nextDirX
        const nextTargetY = currentGridY + pac.nextDirY
        if (!isSolidForPac(nextTargetX, nextTargetY)) {
          pac.dirX = pac.nextDirX
          pac.dirY = pac.nextDirY
          pac.x = centerX
          pac.y = centerY
          pac.nextDirX = 0
          pac.nextDirY = 0
        }
      }

      const targetGridX = currentGridX + pac.dirX
      const targetGridY = currentGridY + pac.dirY

      if (
        !isSolidForPac(targetGridX, targetGridY) ||
        (pac.dirX > 0 && pac.x < centerX) ||
        (pac.dirX < 0 && pac.x > centerX) ||
        (pac.dirY > 0 && pac.y < centerY) ||
        (pac.dirY < 0 && pac.y > centerY)
      ) {
        pac.x += pac.dirX * pac.speed
        pac.y += pac.dirY * pac.speed
      } else {
        pac.x = centerX
        pac.y = centerY
      }

      if (pac.x < -CELL_SIZE / 2) pac.x = COLS * CELL_SIZE + CELL_SIZE / 2
      if (pac.x > COLS * CELL_SIZE + CELL_SIZE / 2) pac.x = -CELL_SIZE / 2

      pac.mouthAngle += 0.05 * pac.mouthDir
      if (pac.mouthAngle > 0.42 || pac.mouthAngle < 0.06) {
        pac.mouthDir *= -1
      }

      // ---- 2. EAT PELLETS ----
      const pacTileX = Math.floor(pac.x / CELL_SIZE)
      const pacTileY = Math.floor(pac.y / CELL_SIZE)
      if (pacTileX >= 0 && pacTileX < COLS && pacTileY >= 0 && pacTileY < ROWS) {
        const cell = mazeRef.current[pacTileY][pacTileX]
        if (cell === 0) {
          mazeRef.current[pacTileY][pacTileX] = 3
          playPacmanChomp()
          setScore((s) => {
            const next = s + 10
            if (next > highScore) {
              setHighScore(next)
              localStorage.setItem('satvik-pacman-high', next.toString())
            }
            return next
          })
          setDotsRemaining((d) => {
            const left = d - 1
            if (left <= 0) {
              setGameState('win')
              playPacmanWin()
            }
            return left
          })
        } else if (cell === 2) {
          mazeRef.current[pacTileY][pacTileX] = 3
          playPacmanChomp()
          frightenedTimerRef.current = 650 // ~11 seconds of frightened time
          ghosts.forEach((g) => (g.frightened = 1))
          setPowerActive(true)
          setScore((s) => s + 50)
          setDotsRemaining((d) => {
            const left = d - 1
            if (left <= 0) {
              setGameState('win')
              playPacmanWin()
            }
            return left
          })
        }
      }

      // ---- 3. GHOST LOGIC & MOVEMENT ----
      const doorX = 9 * CELL_SIZE + CELL_SIZE / 2
      const outsideY = 8 * CELL_SIZE + CELL_SIZE / 2

      ghosts.forEach((g) => {
        if (g.state === 'in_house') {
          if (g.timer > 0) {
            g.timer -= 1
            g.bobOffset = Math.sin(frameCountRef.current * 0.08) * 3
          } else {
            g.state = 'exiting'
          }
          return
        }

        if (g.state === 'exiting') {
          g.bobOffset = 0
          if (Math.abs(g.x - doorX) > 1.5) {
            g.x += (doorX - g.x > 0 ? 1 : -1) * 1.0
          } else {
            g.x = doorX
            if (g.y > outsideY) {
              g.y -= 1.0
            } else {
              g.y = outsideY
              g.state = 'roaming'
              g.dirX = Math.random() > 0.5 ? 1 : -1
              g.dirY = 0
            }
          }
          return
        }

        const gx = Math.floor(g.x / CELL_SIZE)
        const gy = Math.floor(g.y / CELL_SIZE)
        const gCenterX = gx * CELL_SIZE + CELL_SIZE / 2
        const gCenterY = gy * CELL_SIZE + CELL_SIZE / 2

        if (Math.hypot(g.x - gCenterX, g.y - gCenterY) < 2) {
          const possibleDirs = [
            { x: 0, y: -1 },
            { x: 0, y: 1 },
            { x: -1, y: 0 },
            { x: 1, y: 0 },
          ].filter(
            (d) =>
              !(d.x === -g.dirX && d.y === -g.dirY) &&
              !isSolidForGhost(gx + d.x, gy + d.y)
          )

          if (possibleDirs.length > 0) {
            if (g.frightened) {
              const pick = possibleDirs[Math.floor(Math.random() * possibleDirs.length)]
              g.dirX = pick.x
              g.dirY = pick.y
            } else {
              possibleDirs.sort((a, b) => {
                const distA = Math.hypot(
                  (gx + a.x) * CELL_SIZE - pac.x,
                  (gy + a.y) * CELL_SIZE - pac.y
                )
                const distB = Math.hypot(
                  (gx + b.x) * CELL_SIZE - pac.x,
                  (gy + b.y) * CELL_SIZE - pac.y
                )
                return distA - distB
              })
              g.dirX = possibleDirs[0].x
              g.dirY = possibleDirs[0].y
            }
          } else {
            g.dirX = -g.dirX
            g.dirY = -g.dirY
          }
        }

        const moveSpeed = g.frightened ? g.speed * 0.45 : g.speed
        g.x += g.dirX * moveSpeed
        g.y += g.dirY * moveSpeed

        if (g.x < -CELL_SIZE / 2) g.x = COLS * CELL_SIZE + CELL_SIZE / 2
        if (g.x > COLS * CELL_SIZE + CELL_SIZE / 2) g.x = -CELL_SIZE / 2

        const distToPac = Math.hypot(g.x - pac.x, g.y - pac.y)
        if (distToPac < CELL_SIZE * 0.52) {
          if (g.frightened) {
            setScore((s) => s + 200)
            g.x = doorX
            g.y = 10 * CELL_SIZE + CELL_SIZE / 2
            g.state = 'in_house'
            g.timer = 120
            g.frightened = 0
          } else {
            playPacmanDeath()
            setLives((l) => {
              const remaining = l - 1
              if (remaining <= 0) {
                setGameState('gameover')
              } else {
                pac.x = 9 * CELL_SIZE + CELL_SIZE / 2
                pac.y = 16 * CELL_SIZE + CELL_SIZE / 2
                pac.dirX = 0
                pac.dirY = 0
                pac.nextDirX = 0
                pac.nextDirY = 0
              }
              return remaining
            })
          }
        }
      })

      // ---- 4. RENDER CANVAS ----
      ctx.fillStyle = '#05030a'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const cell = mazeRef.current[r][c]
          const px = c * CELL_SIZE
          const py = r * CELL_SIZE

          if (cell === 1) {
            ctx.fillStyle = '#1e1438'
            ctx.fillRect(px, py, CELL_SIZE, CELL_SIZE)
            ctx.strokeStyle = '#6d28d9'
            ctx.lineWidth = 1.5
            ctx.strokeRect(px + 1, py + 1, CELL_SIZE - 2, CELL_SIZE - 2)
          } else if (cell === 4) {
            ctx.fillStyle = '#120d22'
            ctx.fillRect(px, py, CELL_SIZE, CELL_SIZE)
          } else if (cell === 0) {
            ctx.fillStyle = '#fde047'
            ctx.beginPath()
            ctx.arc(px + CELL_SIZE / 2, py + CELL_SIZE / 2, 2.5, 0, Math.PI * 2)
            ctx.fill()
          } else if (cell === 2) {
            const pulse = 4.2 + Math.sin(Date.now() * 0.006) * 1.5
            ctx.fillStyle = '#c084fc'
            ctx.shadowColor = '#c084fc'
            ctx.shadowBlur = 8
            ctx.beginPath()
            ctx.arc(px + CELL_SIZE / 2, py + CELL_SIZE / 2, pulse, 0, Math.PI * 2)
            ctx.fill()
            ctx.shadowBlur = 0
          }
        }
      }

      // Ghost House Door bar
      ctx.fillStyle = '#ec4899'
      ctx.fillRect(9 * CELL_SIZE, 9 * CELL_SIZE + CELL_SIZE - 3, CELL_SIZE, 4)

      const canvasW = canvas.width
      const canvasH = canvas.height

      // Helper: draw pacman at given pixel coords
      const drawPacman = (drawX, drawY) => {
        let baseAngle = 0
        if (pac.dirX === 1) baseAngle = 0
        else if (pac.dirX === -1) baseAngle = Math.PI
        else if (pac.dirY === 1) baseAngle = Math.PI / 2
        else if (pac.dirY === -1) baseAngle = -Math.PI / 2

        ctx.fillStyle = '#facc15'
        ctx.beginPath()
        ctx.arc(
          drawX,
          drawY,
          CELL_SIZE * 0.44,
          baseAngle + pac.mouthAngle,
          baseAngle + Math.PI * 2 - pac.mouthAngle
        )
        ctx.lineTo(drawX, drawY)
        ctx.fill()
      }

      // Render Pac-Man — also render at wrapped position if in tunnel
      ctx.save()
      ctx.beginPath()
      ctx.rect(0, 0, canvasW, canvasH)
      ctx.clip()

      // Primary draw position
      drawPacman(pac.x, pac.y)

      // If pac is in the tunnel (near horizontal edges), also draw at wrapped position
      const halfCell = CELL_SIZE / 2
      if (pac.x < halfCell) {
        // Near left edge — also draw at right side
        drawPacman(pac.x + COLS * CELL_SIZE, pac.y)
      } else if (pac.x > COLS * CELL_SIZE - halfCell) {
        // Near right edge — also draw at left side
        drawPacman(pac.x - COLS * CELL_SIZE, pac.y)
      }

      ctx.restore()

      // Helper: draw a ghost at given pixel coords
      const drawGhost = (g, drawX, drawY) => {
        const radius = CELL_SIZE * 0.42
        ctx.fillStyle = g.frightened ? '#3b82f6' : g.color

        ctx.beginPath()
        ctx.arc(drawX, drawY - 2, radius, Math.PI, 0, false)
        ctx.lineTo(drawX + radius, drawY + radius)
        ctx.lineTo(drawX + radius * 0.5, drawY + radius * 0.6)
        ctx.lineTo(drawX, drawY + radius)
        ctx.lineTo(drawX - radius * 0.5, drawY + radius * 0.6)
        ctx.lineTo(drawX - radius, drawY + radius)
        ctx.closePath()
        ctx.fill()

        ctx.fillStyle = '#ffffff'
        ctx.beginPath()
        ctx.arc(drawX - 3.5, drawY - 4, 3, 0, Math.PI * 2)
        ctx.arc(drawX + 3.5, drawY - 4, 3, 0, Math.PI * 2)
        ctx.fill()

        ctx.fillStyle = g.frightened ? '#f8fafc' : '#1e1b4b'
        ctx.beginPath()
        ctx.arc(
          drawX - 3.5 + (g.dirX || 0) * 1.5,
          drawY - 4 + (g.dirY || 0) * 1.5,
          1.5, 0, Math.PI * 2
        )
        ctx.arc(
          drawX + 3.5 + (g.dirX || 0) * 1.5,
          drawY - 4 + (g.dirY || 0) * 1.5,
          1.5, 0, Math.PI * 2
        )
        ctx.fill()
      }

      // Render Ghosts — also render at wrapped position if in tunnel
      ctx.save()
      ctx.beginPath()
      ctx.rect(0, 0, canvasW, canvasH)
      ctx.clip()

      ghosts.forEach((g) => {
        const drawY = g.y + (g.bobOffset || 0)
        drawGhost(g, g.x, drawY)

        // Wrap rendering for ghosts in tunnel
        if (g.x < halfCell) {
          drawGhost(g, g.x + COLS * CELL_SIZE, drawY)
        } else if (g.x > COLS * CELL_SIZE - halfCell) {
          drawGhost(g, g.x - COLS * CELL_SIZE, drawY)
        }
      })

      ctx.restore()

      animId = requestAnimationFrame(gameLoop)
    }

    animId = requestAnimationFrame(gameLoop)
    return () => cancelAnimationFrame(animId)
  }, [gameState, isPaused, highScore, playPacmanChomp, playPacmanDeath, playPacmanWin])

  return (
    <div className={styles.gameWrapper}>
      {/* Speed & Difficulty Selector Toolbar */}
      <div className={styles.difficultyRow}>
        <span className={styles.diffLabel}>SPEED:</span>
        {Object.keys(SPEED_PROFILES).map((key) => (
          <button
            key={key}
            className={`${styles.diffBtn} ${difficulty === key ? styles.activeDiff : ''}`}
            onClick={() => setDifficulty(key)}
          >
            {SPEED_PROFILES[key].label}
          </button>
        ))}
        {powerActive && (
          <span className={styles.powerBadge}>⚡ POWER PELLET ACTIVE</span>
        )}
      </div>

      <GameHUD
        score={score}
        highScore={highScore}
        lives={lives}
        dotsLeft={dotsRemaining}
      />

      <div className={styles.mainPlayArea}>
        <div className={styles.canvasContainer}>
          <canvas
            ref={canvasRef}
            width={COLS * CELL_SIZE}
            height={ROWS * CELL_SIZE}
            className={styles.canvas}
          />

          {gameState !== 'playing' && (
            <GameOverScreen
              status={gameState}
              score={score}
              onRestart={restartGame}
              onViewProjects={onViewProjects}
            />
          )}
        </div>

        {/* Retro Leaderboard Hall of Fame */}
        <div className={styles.leaderboardCard}>
          <div className={styles.leadHeader}>
            <span>🏆 HALL OF FAME</span>
          </div>
          <div className={styles.leadList}>
            <div className={styles.leadRow}>
              <span className={styles.leadRank}>1ST</span>
              <span className={styles.leadName}>SAT (Satvik)</span>
              <span className={styles.leadScore}>99990</span>
            </div>
            <div className={`${styles.leadRow} ${styles.userRank}`}>
              <span className={styles.leadRank}>2ND</span>
              <span className={styles.leadName}>YOU (Player)</span>
              <span className={styles.leadScore}>{highScore}</span>
            </div>
            <div className={styles.leadRow}>
              <span className={styles.leadRank}>3RD</span>
              <span className={styles.leadName}>CYBER_ACE</span>
              <span className={styles.leadScore}>14200</span>
            </div>
            <div className={styles.leadRow}>
              <span className={styles.leadRank}>4TH</span>
              <span className={styles.leadName}>PIXEL_PRO</span>
              <span className={styles.leadScore}>09400</span>
            </div>
            <div className={styles.leadRow}>
              <span className={styles.leadRank}>5TH</span>
              <span className={styles.leadName}>DEV_GUEST</span>
              <span className={styles.leadScore}>04800</span>
            </div>
          </div>
          <div className={styles.leadFooter}>
            <span>YOUR CURRENT: {score}</span>
          </div>
        </div>
      </div>

      {/* On-Screen Mobile Controls (D-Pad) */}
      <div className={styles.dpad} aria-label="Touch Controls">
        <button
          className={`${styles.dpadBtn} ${styles.up}`}
          onClick={() => setDirection(0, -1)}
          aria-label="Up"
        >
          ▲
        </button>
        <div className={styles.dpadMiddle}>
          <button
            className={`${styles.dpadBtn} ${styles.left}`}
            onClick={() => setDirection(-1, 0)}
            aria-label="Left"
          >
            ◀
          </button>
          <div className={styles.dpadCenter}>ᗧ</div>
          <button
            className={`${styles.dpadBtn} ${styles.right}`}
            onClick={() => setDirection(1, 0)}
            aria-label="Right"
          >
            ▶
          </button>
        </div>
        <button
          className={`${styles.dpadBtn} ${styles.down}`}
          onClick={() => setDirection(0, 1)}
          aria-label="Down"
        >
          ▼
        </button>
      </div>

      <p className={styles.controlsHint}>Controls: Arrow Keys or WASD &bull; Speed Mode: {SPEED_PROFILES[difficulty].label}</p>
    </div>
  )
}
