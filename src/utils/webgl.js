// webgl.js — WebGL capability detection

/**
 * Detects WebGL support and performance tier.
 * Returns { supported: boolean, performance: 'high' | 'medium' | 'low' | 'none' }
 */
export function detectWebGL() {
  if (typeof window === 'undefined') return { supported: false, performance: 'none' }

  try {
    const canvas = document.createElement('canvas')
    
    // Try WebGL2 first
    const gl2 = canvas.getContext('webgl2')
    if (gl2) {
      const renderer = gl2.getParameter(gl2.RENDERER) || ''
      const isSoftware = /swiftshader|llvmpipe|software/i.test(renderer)
      return {
        supported: true,
        version: 2,
        performance: isSoftware ? 'low' : 'high',
        renderer,
      }
    }

    // Fall back to WebGL1
    const gl1 = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    if (gl1) {
      return { supported: true, version: 1, performance: 'medium', renderer: '' }
    }

    return { supported: false, performance: 'none' }
  } catch (e) {
    return { supported: false, performance: 'none' }
  }
}

/**
 * Returns true if the device is likely mobile/low-power
 */
export function isMobileDevice() {
  if (typeof navigator === 'undefined') return false
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    || (navigator.maxTouchPoints > 1 && window.innerWidth < 1024)
}

/**
 * Returns recommended quality settings based on device
 */
export function getQualitySettings() {
  const webgl = detectWebGL()
  const mobile = isMobileDevice()

  if (!webgl.supported) {
    return { shadows: false, particles: false, postprocessing: false, dpr: 1, detail: 'none' }
  }

  if (mobile || webgl.performance === 'low') {
    return { shadows: false, particles: false, postprocessing: false, dpr: 1, detail: 'low' }
  }

  if (webgl.performance === 'medium') {
    return { shadows: true, particles: true, postprocessing: false, dpr: 1.5, detail: 'medium' }
  }

  return { shadows: true, particles: true, postprocessing: false, dpr: Math.min(window.devicePixelRatio, 2), detail: 'high' }
}
