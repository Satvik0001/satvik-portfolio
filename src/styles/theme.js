// Theme constants mirrored from globals.css for use in Three.js and JS code

export const COLORS = {
  purple: {
    50: '#f5f3ff',
    100: '#ede9fe',
    200: '#ddd6fe',
    300: '#c4b5fd',
    400: '#a78bfa',
    500: '#8b5cf6',
    600: '#7c3aed',
    700: '#6d28d9',
    800: '#5b21b6',
    900: '#4c1d95',
  },
  bg: {
    deep: '#050308',
    dark: '#0a0612',
    room: '#0d0818',
    card: '#100c1e',
    panel: '#140f22',
  },
  text: {
    primary: '#f0ebff',
    secondary: '#c4b5fd',
    muted: '#7c6fa0',
    dim: '#4a3f6b',
  },
  // Three.js friendly hex numbers
  three: {
    purpleAmbient: 0x4c1d95,
    purpleAccent: 0x7c3aed,
    purpleLight: 0x8b5cf6,
    purpleGlow: 0xa78bfa,
    warmLight: 0xfff4e0,
    coolFill: 0x7090ff,
    monitorGlow: 0x6b4dff,
    floor: 0x0e0b1a,
    wall: 0x12102a,
    deskDark: 0x1a1520,
    deskWood: 0x2a2030,
    chairBase: 0x1a1a2e,
    chairAccent: 0x7c3aed,
    metalDark: 0x1c1c2e,
    metalMid: 0x2d2d44,
    ledPurple: 0x8b5cf6,
    screenDark: 0x050308,
    bookColors: [0x7c3aed, 0x2d5a9e, 0x1a6b3c, 0x8b2020, 0xb87333],
  }
}

export const FONTS = {
  sans: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  mono: "'JetBrains Mono', 'Fira Code', monospace",
  display: "'Orbitron', 'Inter', sans-serif",
}

export const TRANSITIONS = {
  fast: 0.15,
  base: 0.25,
  slow: 0.4,
  camera: 0.8,
}
