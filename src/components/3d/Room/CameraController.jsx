import React, { useRef, useEffect, useState } from 'react'
import { useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { gsap } from 'gsap'
import useStore from '@stores/useStore'

export default function CameraController() {
  const controlsRef = useRef(null)
  const { chairRotating } = useStore()
  const tourActive = useStore((s) => s.tourActive)
  const tourStep = useStore((s) => s.tourStep)
  const { camera, invalidate } = useThree()
  const [isEntering, setIsEntering] = useState(true)

  // Guided Tour dynamic camera focusing
  useEffect(() => {
    if (!tourActive || isEntering || !controlsRef.current) return

    const TOUR_CAMERA_TARGETS = [
      { target: [0, 1.1, 0.1], pos: [0, 1.75, 2.6] },        // 0: Welcome
      { target: [1.8, 1.25, 0.4], pos: [-0.6, 1.7, 2.3] },  // 1: Arcade (LOOK RIGHT)
      { target: [1.1, 1.95, -1.0], pos: [-0.5, 1.75, 2.3] }, // 2: Vinyl (LOOK BACK-RIGHT)
      { target: [0, 1.25, -0.2], pos: [0, 1.6, 2.0] },       // 3: Monitors (LOOK CENTER)
      { target: [-2.2, 1.35, -0.2], pos: [0.7, 1.7, 2.2] },  // 4: Bookshelf (LOOK LEFT AT WALL)
      { target: [0, 1.95, -0.6], pos: [0, 1.65, 2.4] },      // 5: Trophies (LOOK HIGH BACK)
      { target: [0, 0.9, 0.6], pos: [0, 1.75, 2.6] },        // 6: Chair (LOOK ROOM CENTER)
    ]

    const config = TOUR_CAMERA_TARGETS[tourStep] || TOUR_CAMERA_TARGETS[0]

    const tweenTarget = gsap.to(controlsRef.current.target, {
      x: config.target[0],
      y: config.target[1],
      z: config.target[2],
      duration: 1.3,
      ease: 'power2.out',
      onUpdate: () => {
        if (controlsRef.current) controlsRef.current.update()
        invalidate()
      },
    })

    const tweenPos = gsap.to(camera.position, {
      x: config.pos[0],
      y: config.pos[1],
      z: config.pos[2],
      duration: 1.3,
      ease: 'power2.out',
      onUpdate: () => {
        if (controlsRef.current) controlsRef.current.update()
        invalidate()
      },
    })

    return () => {
      tweenTarget.kill()
      tweenPos.kill()
    }
  }, [tourActive, tourStep, isEntering, camera, invalidate])

  useEffect(() => {
    // Start camera pulled back & elevated for cinematic zoom-in entrance
    camera.position.set(0, 3.2, 5.4)
    camera.lookAt(0, 1.4, 0)

    if (controlsRef.current) {
      controlsRef.current.target.set(0, 1.4, 0)
      controlsRef.current.update()
    }
    invalidate()

    // Smooth power3 zoom-in animation into the gaming room
    const targetPos = { x: 0, y: 1.75, z: 2.6 }
    const targetLook = { x: 0, y: 1.1, z: 0.1 }

    const tweenPos = gsap.to(camera.position, {
      x: targetPos.x,
      y: targetPos.y,
      z: targetPos.z,
      duration: 2.0,
      ease: 'power3.out',
      onUpdate: () => {
        if (controlsRef.current) {
          controlsRef.current.update()
        }
        invalidate()
      },
      onComplete: () => {
        setIsEntering(false)
        if (controlsRef.current) {
          controlsRef.current.update()
        }
        invalidate()
      },
    })

    const tweenTarget = controlsRef.current
      ? gsap.to(controlsRef.current.target, {
          x: targetLook.x,
          y: targetLook.y,
          z: targetLook.z,
          duration: 2.0,
          ease: 'power3.out',
        })
      : null

    return () => {
      tweenPos.kill()
      if (tweenTarget) tweenTarget.kill()
    }
  }, [camera, invalidate])

  return (
    <OrbitControls
      ref={controlsRef}
      target={[0, 1.1, 0.1]}
      enabled={!chairRotating && !isEntering}
      enableDamping
      dampingFactor={0.04}   // softer, more cinematic follow-through
      // Limit zoom to stay inside the room
      minDistance={1.2}
      maxDistance={3.8}
      // Limit vertical angle (no floor or ceiling flipping)
      minPolarAngle={Math.PI / 6}
      maxPolarAngle={Math.PI / 2 - 0.05}
      // Limit horizontal sweep — stays focused on workspace
      minAzimuthAngle={-Math.PI / 2.6}
      maxAzimuthAngle={Math.PI / 2.6}
      enablePan={false}
      rotateSpeed={0.55}     // slightly slower = feels more deliberate and smooth
    />
  )
}
