// UnityScreen.js — Creates a Unity Editor-inspired canvas texture

/**
 * Draws a Unity Editor-inspired UI onto a canvas and returns it
 * as a Three.js CanvasTexture-ready canvas element.
 */
export function createUnityCanvas(width = 512, height = 896) {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')

  const BG = '#0f1117'
  const TOOLBAR = '#1c1f26'
  const PANEL = '#181b21'
  const BORDER = '#2a2d36'
  const ACCENT = '#5a3fa0'
  const TEXT_MAIN = '#c8c8c8'
  const TEXT_DIM = '#666870'
  const TEXT_BLUE = '#6ab0f5'
  const TEXT_GREEN = '#8bc44a'
  const TEXT_YELLOW = '#ffc66d'
  const TEXT_PURPLE = '#cc99cd'

  // Fill background
  ctx.fillStyle = BG
  ctx.fillRect(0, 0, width, height)

  // === TOP TOOLBAR ===
  ctx.fillStyle = TOOLBAR
  ctx.fillRect(0, 0, width, 28)
  ctx.fillStyle = BORDER
  ctx.fillRect(0, 28, width, 1)

  // Menu items
  ctx.fillStyle = TEXT_DIM
  ctx.font = '11px monospace'
  const menus = ['File', 'Edit', 'Assets', 'GameObject', 'Component', 'Window']
  let mx = 8
  menus.forEach(m => {
    ctx.fillText(m, mx, 18)
    mx += ctx.measureText(m).width + 16
  })

  // === HIERARCHY PANEL (left column) ===
  const hWidth = 160
  ctx.fillStyle = PANEL
  ctx.fillRect(0, 29, hWidth, height - 29)
  ctx.fillStyle = BORDER
  ctx.fillRect(hWidth, 29, 1, height - 29)

  // Panel header
  ctx.fillStyle = TOOLBAR
  ctx.fillRect(0, 29, hWidth, 22)
  ctx.fillStyle = TEXT_DIM
  ctx.font = '10px monospace'
  ctx.fillText('Hierarchy', 6, 43)

  // Scene objects
  const objects = [
    { name: 'Main Camera', indent: 0, color: TEXT_BLUE },
    { name: 'Directional Light', indent: 0, color: TEXT_YELLOW },
    { name: 'GameManager', indent: 0, color: TEXT_GREEN },
    { name: '─ Player', indent: 1, color: TEXT_MAIN },
    { name: '  ─ PlayerMesh', indent: 2, color: TEXT_DIM },
    { name: '  ─ Collider', indent: 2, color: TEXT_DIM },
    { name: 'Environment', indent: 0, color: TEXT_MAIN },
    { name: '─ Ground', indent: 1, color: TEXT_MAIN },
    { name: '─ Platforms', indent: 1, color: TEXT_MAIN },
    { name: 'UI Canvas', indent: 0, color: TEXT_BLUE },
    { name: '─ HUD', indent: 1, color: TEXT_MAIN },
    { name: 'EnemySpawner', indent: 0, color: TEXT_GREEN },
  ]

  objects.forEach((obj, i) => {
    const y = 60 + i * 18
    ctx.fillStyle = obj.name === '─ Player' ? 'rgba(90,63,160,0.3)' : 'transparent'
    if (obj.name === '─ Player') ctx.fillRect(0, y - 13, hWidth, 17)
    ctx.fillStyle = obj.color
    ctx.font = '10px monospace'
    ctx.fillText(obj.name, 8 + obj.indent * 8, y)
  })

  // === MAIN SCENE VIEW (center) ===
  const svX = hWidth + 1
  const svWidth = width - hWidth
  const svHeight = Math.floor((height - 29) * 0.62)

  // Scene view background
  ctx.fillStyle = '#1a1d24'
  ctx.fillRect(svX, 29, svWidth, svHeight)

  // Scene toolbar
  ctx.fillStyle = TOOLBAR
  ctx.fillRect(svX, 29, svWidth, 24)
  ctx.fillStyle = TEXT_DIM
  ctx.font = '10px monospace'
  ctx.fillText('Scene', svX + 8, 44)

  // Grid
  ctx.strokeStyle = 'rgba(255,255,255,0.04)'
  ctx.lineWidth = 1
  const gridSize = 20
  for (let gx = svX; gx < svX + svWidth; gx += gridSize) {
    ctx.beginPath()
    ctx.moveTo(gx, 53)
    ctx.lineTo(gx, 29 + svHeight)
    ctx.stroke()
  }
  for (let gy = 53; gy < 29 + svHeight; gy += gridSize) {
    ctx.beginPath()
    ctx.moveTo(svX, gy)
    ctx.lineTo(svX + svWidth, gy)
    ctx.stroke()
  }

  // Gizmo helpers - simple shapes representing game objects
  const sceneCenter = { x: svX + svWidth / 2, y: 29 + svHeight / 2 + 10 }

  // Ground plane
  ctx.fillStyle = 'rgba(60,80,100,0.4)'
  ctx.fillRect(svX + 20, sceneCenter.y + 30, svWidth - 40, 8)

  // Player box (selected - blue outline)
  ctx.strokeStyle = '#5b9bd5'
  ctx.lineWidth = 2
  ctx.strokeRect(sceneCenter.x - 12, sceneCenter.y - 20, 24, 30)
  ctx.fillStyle = 'rgba(91,155,213,0.25)'
  ctx.fillRect(sceneCenter.x - 12, sceneCenter.y - 20, 24, 30)

  // Platforms
  ctx.fillStyle = 'rgba(80,100,60,0.5)'
  ctx.fillRect(svX + 30, sceneCenter.y + 5, 50, 8)
  ctx.fillRect(svX + svWidth - 80, sceneCenter.y - 10, 50, 8)

  // Enemy box
  ctx.fillStyle = 'rgba(180,60,60,0.4)'
  ctx.fillRect(sceneCenter.x + 50, sceneCenter.y - 10, 18, 22)

  // Transform gizmo (simplified)
  ctx.strokeStyle = '#f05252'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(sceneCenter.x, sceneCenter.y - 20)
  ctx.lineTo(sceneCenter.x + 20, sceneCenter.y - 20)
  ctx.stroke()
  ctx.strokeStyle = '#52b54b'
  ctx.beginPath()
  ctx.moveTo(sceneCenter.x, sceneCenter.y - 20)
  ctx.lineTo(sceneCenter.x, sceneCenter.y - 40)
  ctx.stroke()

  // === INSPECTOR PANEL (below scene) ===
  const inspY = 29 + svHeight
  const inspHeight = height - inspY
  ctx.fillStyle = PANEL
  ctx.fillRect(svX, inspY, svWidth, inspHeight)
  ctx.fillStyle = BORDER
  ctx.fillRect(svX, inspY, svWidth, 1)

  // Inspector header
  ctx.fillStyle = TOOLBAR
  ctx.fillRect(svX, inspY, svWidth, 22)
  ctx.fillStyle = TEXT_DIM
  ctx.font = '10px monospace'
  ctx.fillText('Inspector', svX + 8, inspY + 15)

  // Component name
  ctx.fillStyle = TEXT_MAIN
  ctx.font = 'bold 11px monospace'
  ctx.fillText('Player', svX + 8, inspY + 40)

  // Components
  const components = [
    { name: '▸ Transform', type: 'component' },
    { name: '▸ PlayerController', type: 'script', color: TEXT_GREEN },
    { name: '▸ Rigidbody', type: 'component' },
    { name: '▸ CapsuleCollider', type: 'component' },
  ]

  components.forEach((comp, i) => {
    const y = inspY + 58 + i * 26
    ctx.fillStyle = 'rgba(255,255,255,0.03)'
    ctx.fillRect(svX + 4, y - 14, svWidth - 8, 22)
    ctx.strokeStyle = BORDER
    ctx.lineWidth = 1
    ctx.strokeRect(svX + 4, y - 14, svWidth - 8, 22)
    ctx.fillStyle = comp.color || TEXT_DIM
    ctx.font = '10px monospace'
    ctx.fillText(comp.name, svX + 10, y)
  })

  return canvas
}

// Animation helper — call this to get animated frames
export function animateUnityCanvas(canvasEl, width = 512, height = 896) {
  let frame = 0
  let animId = null

  const tick = () => {
    // Subtle: blink cursor in scene view to suggest activity
    const ctx = canvasEl.getContext('2d')
    frame++
    // Redraw minimal animated elements to avoid full redraws
    // Blink status bar
    const blink = Math.floor(frame / 30) % 2 === 0
    ctx.fillStyle = '#1c1f26'
    ctx.fillRect(canvasEl.width - 80, 6, 70, 16)
    ctx.fillStyle = blink ? '#52b54b' : 'transparent'
    ctx.font = '9px monospace'
    ctx.fillText('● Playing', canvasEl.width - 76, 18)

    animId = requestAnimationFrame(tick)
  }

  animId = requestAnimationFrame(tick)
  return () => { if (animId) cancelAnimationFrame(animId) }
}
