// VSCodeScreen.js — VS Code-inspired canvas texture with C# code

export function createVSCodeCanvas(width = 512, height = 896) {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')

  const BG = '#1e1e2e'
  const SIDEBAR = '#181825'
  const TOOLBAR = '#11111b'
  const LINE_NUMBER = '#45475a'
  const GUTTER = '#181825'
  const STATUS_BAR = '#7c3aed'

  // Syntax highlight colors (Catppuccin-like)
  const KW = '#cba6f7'    // purple - keywords
  const FUNC = '#89b4fa'  // blue - functions
  const TYPE = '#89dceb'  // cyan - types
  const STR = '#a6e3a1'   // green - strings
  const COMMENT = '#6c7086' // gray - comments
  const NUM = '#fab387'   // orange - numbers
  const PLAIN = '#cdd6f4' // plain text

  ctx.fillStyle = BG
  ctx.fillRect(0, 0, width, height)

  // === TOP TOOLBAR ===
  ctx.fillStyle = TOOLBAR
  ctx.fillRect(0, 0, width, 26)

  // Window title
  ctx.fillStyle = '#7f849c'
  ctx.font = '10px monospace'
  ctx.fillText('PlayerController.cs — Unity Project', 12, 17)

  // Traffic lights (decorative)
  ;[['#ff5f57', 8], ['#febc2e', 24], ['#28c840', 40]].forEach(([c, x]) => {
    ctx.fillStyle = c
    ctx.beginPath()
    ctx.arc(x + width - 60, 13, 5, 0, Math.PI * 2)
    ctx.fill()
  })

  // === SIDEBAR (file tree) ===
  const sw = 140
  ctx.fillStyle = SIDEBAR
  ctx.fillRect(0, 26, sw, height - 44)

  // Sidebar header
  ctx.fillStyle = '#313244'
  ctx.fillRect(0, 26, sw, 22)
  ctx.fillStyle = '#cdd6f4'
  ctx.font = 'bold 9px monospace'
  ctx.fillText('EXPLORER', 8, 41)

  // File tree
  const files = [
    { name: '▸ Assets', indent: 0, bold: true },
    { name: '▸ Scripts', indent: 1, bold: false },
    { name: 'PlayerController', indent: 2, active: true },
    { name: 'GameManager', indent: 2 },
    { name: 'EnemyAI', indent: 2 },
    { name: 'UIManager', indent: 2 },
    { name: 'ScoreSystem', indent: 2 },
    { name: '▸ Scenes', indent: 1 },
    { name: 'MainScene', indent: 2 },
    { name: 'MainMenu', indent: 2 },
    { name: '▸ Prefabs', indent: 1 },
    { name: '▸ Materials', indent: 1 },
  ]

  files.forEach((f, i) => {
    const y = 64 + i * 17
    if (f.active) {
      ctx.fillStyle = 'rgba(124,58,237,0.25)'
      ctx.fillRect(0, y - 12, sw, 16)
      ctx.fillStyle = '#a78bfa'
    } else {
      ctx.fillStyle = f.bold ? '#cdd6f4' : '#a6adc8'
    }
    ctx.font = f.bold ? 'bold 10px monospace' : '10px monospace'
    ctx.fillText(f.name, 6 + f.indent * 10, y)
  })

  // === CODE AREA ===
  const codeX = sw + 1
  const codeWidth = width - sw
  ctx.fillStyle = BG
  ctx.fillRect(codeX, 26, codeWidth, height - 70)

  // Gutter
  const gutterW = 28
  ctx.fillStyle = GUTTER
  ctx.fillRect(codeX, 26, gutterW, height - 70)

  // Code lines
  const lines = [
    [{ t: 'using', c: KW }, { t: ' UnityEngine;', c: PLAIN }],
    [{ t: 'using', c: KW }, { t: ' System.Collections;', c: PLAIN }],
    [{ t: '', c: PLAIN }],
    [{ t: '[RequireComponent(typeof(Rigidbody))]', c: COMMENT }],
    [{ t: 'public', c: KW }, { t: ' class', c: KW }, { t: ' PlayerController', c: TYPE }, { t: ' : MonoBehaviour', c: PLAIN }],
    [{ t: '{', c: PLAIN }],
    [{ t: '    [Header("Movement")]', c: COMMENT }],
    [{ t: '    ', c: '' }, { t: 'public', c: KW }, { t: ' float', c: TYPE }, { t: ' moveSpeed', c: PLAIN }, { t: ' = ', c: PLAIN }, { t: '8f', c: NUM }, { t: ';', c: PLAIN }],
    [{ t: '    ', c: '' }, { t: 'public', c: KW }, { t: ' float', c: TYPE }, { t: ' jumpForce', c: PLAIN }, { t: ' = ', c: PLAIN }, { t: '12f', c: NUM }, { t: ';', c: PLAIN }],
    [{ t: '', c: '' }],
    [{ t: '    ', c: '' }, { t: 'private', c: KW }, { t: ' Rigidbody', c: TYPE }, { t: ' _rb;', c: PLAIN }],
    [{ t: '    ', c: '' }, { t: 'private', c: KW }, { t: ' bool', c: TYPE }, { t: ' _isGrounded;', c: PLAIN }],
    [{ t: '', c: '' }],
    [{ t: '    ', c: '' }, { t: 'void', c: KW }, { t: ' ', c: '' }, { t: 'Start', c: FUNC }, { t: '()', c: PLAIN }],
    [{ t: '    {', c: PLAIN }],
    [{ t: '        _rb = ', c: PLAIN }, { t: 'GetComponent', c: FUNC }, { t: '<Rigidbody>();', c: PLAIN }],
    [{ t: '    }', c: PLAIN }],
    [{ t: '', c: '' }],
    [{ t: '    ', c: '' }, { t: 'void', c: KW }, { t: ' ', c: '' }, { t: 'Update', c: FUNC }, { t: '()', c: PLAIN }],
    [{ t: '    {', c: PLAIN }],
    [{ t: '        float', c: KW }, { t: ' h = ', c: PLAIN }, { t: 'Input', c: TYPE }, { t: '.GetAxis(', c: PLAIN }, { t: '"Horizontal"', c: STR }, { t: ');', c: PLAIN }],
    [{ t: '        ', c: '' }, { t: 'Move', c: FUNC }, { t: '(h);', c: PLAIN }],
    [{ t: '', c: '' }],
    [{ t: '        ', c: '' }, { t: 'if', c: KW }, { t: ' (', c: PLAIN }, { t: 'Input', c: TYPE }, { t: '.GetButtonDown(', c: PLAIN }],
    [{ t: '            ', c: '' }, { t: '"Jump"', c: STR }, { t: ') && _isGrounded)', c: PLAIN }],
    [{ t: '        {', c: PLAIN }],
    [{ t: '            ', c: '' }, { t: 'Jump', c: FUNC }, { t: '();', c: PLAIN }],
    [{ t: '        }', c: PLAIN }],
    [{ t: '    }', c: PLAIN }],
  ]

  const lineHeight = 16
  const startY = 48

  lines.forEach((tokens, i) => {
    const lineNum = i + 1
    // Line number
    ctx.fillStyle = LINE_NUMBER
    ctx.font = '9px monospace'
    ctx.textAlign = 'right'
    ctx.fillText(lineNum, codeX + gutterW - 4, startY + i * lineHeight)
    ctx.textAlign = 'left'

    // Current line highlight (line 21 = the Move call)
    if (i === 20) {
      ctx.fillStyle = 'rgba(124,58,237,0.12)'
      ctx.fillRect(codeX + gutterW, startY + i * lineHeight - 12, codeWidth - gutterW, lineHeight)
    }

    // Tokens
    let tx = codeX + gutterW + 6
    tokens.forEach(({ t, c }) => {
      ctx.fillStyle = c || PLAIN
      ctx.font = '10px "JetBrains Mono", monospace'
      ctx.fillText(t, tx, startY + i * lineHeight)
      tx += ctx.measureText(t).width
    })
  })

  // === STATUS BAR ===
  ctx.fillStyle = STATUS_BAR
  ctx.fillRect(0, height - 44, width, 20)
  ctx.fillStyle = 'rgba(255,255,255,0.85)'
  ctx.font = '9px monospace'
  ctx.fillText('  ◉ C#   Unity 2023.2.0f1   UTF-8   Ln 21, Col 16', 0, height - 31)

  return canvas
}

export function animateVSCodeCanvas(canvasEl) {
  let frame = 0
  let animId = null

  const tick = () => {
    frame++
    // Blink cursor every 30 frames
    const ctx = canvasEl.getContext('2d')
    const cursorOn = Math.floor(frame / 30) % 2 === 0
    const codeX = 141
    const lineY = 48 + 20 * 16  // Line 21

    ctx.fillStyle = cursorOn ? '#cba6f7' : '#1e1e2e'
    ctx.fillRect(codeX + 28 + 6 + 82, lineY - 11, 1, 13) // blinking caret

    animId = requestAnimationFrame(tick)
  }

  animId = requestAnimationFrame(tick)
  return () => { if (animId) cancelAnimationFrame(animId) }
}
