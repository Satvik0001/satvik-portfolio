// GameplayScreen.js — Animated game scene canvas texture (optimized lightweight resolution)

export function createGameplayCanvas(width = 512, height = 288) {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  return canvas
}

export function animateGameplayCanvas(canvas) {
  const ctx = canvas.getContext('2d')
  const W = canvas.width
  const H = canvas.height

  // Game state
  const player = { x: 100, y: 0, vy: 0, onGround: false, facing: 1 }
  const platforms = [
    { x: 0, y: H - 30, w: W, h: 30 },        // Ground
    { x: 100, y: H - 85, w: 70, h: 10 },
    { x: 210, y: H - 130, w: 60, h: 10 },
    { x: 310, y: H - 95, w: 75, h: 10 },
    { x: 400, y: H - 160, w: 55, h: 10 },
  ]
  const coins = [
    { x: 130, y: H - 105, collected: false },
    { x: 235, y: H - 150, collected: false },
    { x: 340, y: H - 115, collected: false },
    { x: 420, y: H - 180, collected: false },
  ]
  let score = 0
  let lives = 3
  let bgScroll = 0
  let frameCount = 0
  let playerDir = 1

  const animId = { current: null }

  function drawBackground() {
    // Sky
    ctx.fillStyle = '#080512'
    ctx.fillRect(0, 0, W, H)

    // Stars
    ctx.fillStyle = 'rgba(216, 180, 254, 0.5)'
    for (let i = 0; i < 24; i++) {
      const sx = ((i * 83 + bgScroll * 0.2) % W)
      const sy = (i * 47) % (H * 0.6)
      ctx.fillRect(sx, sy, 1.5, 1.5)
    }

    // Mid mountains
    ctx.fillStyle = '#150f24'
    ctx.beginPath()
    ctx.moveTo(0, H * 0.75)
    for (let x = 0; x < W; x += 30) {
      const h = 25 + Math.sin((x + bgScroll * 0.4) * 0.05) * 15
      ctx.lineTo(x + 15, H * 0.75 - h)
      ctx.lineTo(x + 30, H * 0.75)
    }
    ctx.lineTo(W, H)
    ctx.lineTo(0, H)
    ctx.closePath()
    ctx.fill()
  }

  function drawPlatform(p) {
    ctx.fillStyle = '#261b3d'
    ctx.fillRect(p.x, p.y + 4, p.w, p.h - 4)
    ctx.fillStyle = '#6d28d9'
    ctx.fillRect(p.x, p.y, p.w, 4)
    ctx.fillStyle = '#a855f7'
    ctx.fillRect(p.x, p.y, p.w, 1.5)
  }

  function drawGround(p) {
    ctx.fillStyle = '#1b142c'
    ctx.fillRect(p.x, p.y + 4, p.w, p.h - 4)
    ctx.fillStyle = '#581c87'
    ctx.fillRect(p.x, p.y, p.w, 4)
    ctx.fillStyle = '#9333ea'
    ctx.fillRect(p.x, p.y, p.w, 1.5)
  }

  function drawPlayer() {
    const px = player.x - 8
    const py = player.y - 18

    // Body
    ctx.fillStyle = '#a855f7'
    ctx.fillRect(px + 1, py + 5, 14, 12)

    // Head
    ctx.fillStyle = '#c084fc'
    ctx.fillRect(px + 2, py, 12, 8)

    // Eye
    ctx.fillStyle = '#05030a'
    const eyeX = player.facing > 0 ? px + 10 : px + 4
    ctx.fillRect(eyeX, py + 2, 2.5, 2.5)

    // Legs
    const legPhase = Math.sin(frameCount * 0.3) * 3
    ctx.fillStyle = '#7c3aed'
    ctx.fillRect(px + 2, py + 16, 4, 6 + (player.onGround ? legPhase : 0))
    ctx.fillRect(px + 8, py + 16, 4, 6 + (player.onGround ? -legPhase : 0))
  }

  function drawCoin(c) {
    if (c.collected) return
    ctx.fillStyle = '#facc15'
    ctx.beginPath()
    ctx.arc(c.x, c.y, 4, 0, Math.PI * 2)
    ctx.fill()
  }

  function drawHUD() {
    ctx.fillStyle = 'rgba(5, 3, 10, 0.65)'
    ctx.fillRect(0, 0, W, 20)

    ctx.fillStyle = '#facc15'
    ctx.font = 'bold 9px monospace'
    ctx.fillText(`SCORE: ${score.toString().padStart(5, '0')}`, 8, 14)

    ctx.fillStyle = '#ef4444'
    for (let i = 0; i < lives; i++) {
      ctx.fillText('♥', W / 2 - 15 + i * 12, 14)
    }

    ctx.fillStyle = '#a855f7'
    ctx.font = '9px monospace'
    ctx.fillText('LEVEL 1', W - 48, 14)
  }

  function update() {
    frameCount++
    bgScroll += 0.4

    player.x += playerDir * 1.2
    if (player.x > W - 30) { playerDir = -1; player.facing = -1 }
    if (player.x < 30) { playerDir = 1; player.facing = 1 }

    if (player.onGround && frameCount % 80 === 0) {
      player.vy = -7.5
    }

    player.vy += 0.35
    player.y += player.vy

    if (player.y > H - 15) {
      player.y = H - 15
      player.vy = 0
      player.onGround = true
    }

    player.onGround = false
    platforms.forEach((p, i) => {
      if (
        player.x > p.x - 8 &&
        player.x < p.x + p.w + 8 &&
        player.y > p.y - 2 &&
        player.y < p.y + 12 &&
        player.vy >= 0
      ) {
        player.y = p.y
        player.vy = 0
        player.onGround = true
      }
    })

    coins.forEach((c) => {
      if (!c.collected && Math.abs(player.x - c.x) < 14 && Math.abs(player.y - c.y) < 16) {
        c.collected = true
        score += 10
      }
    })
  }

  function draw() {
    update()
    drawBackground()

    platforms.forEach((p, i) => {
      if (i === 0) drawGround(p)
      else drawPlatform(p)
    })

    coins.forEach(drawCoin)
    drawPlayer()
    drawHUD()

    animId.current = requestAnimationFrame(draw)
  }

  animId.current = requestAnimationFrame(draw)

  return () => {
    if (animId.current) cancelAnimationFrame(animId.current)
  }
}
