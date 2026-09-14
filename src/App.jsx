import React, { useEffect, lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import useStore from '@stores/useStore'
import { detectWebGL, getQualitySettings } from '@utils/webgl'
import Navigation from '@components/ui/Navigation'
import LoadingScreen from '@components/ui/LoadingScreen'
import SpotifyModal from '@components/ui/SpotifyModal'

// Lazy load pages for code splitting
const HomePage = lazy(() => import('@pages/HomePage'))
const WorldPage = lazy(() => import('@pages/WorldPage'))
const AchievementsPage = lazy(() => import('@pages/AchievementsPage'))
const ContactPage = lazy(() => import('@pages/ContactPage'))
const ArcadePage = lazy(() => import('@pages/ArcadePage'))
const FallbackPage = lazy(() => import('@pages/FallbackPage'))

function App() {
  const {
    setWebglSupported,
    setQualitySettings,
    initTour,
    webglSupported,
    activeModal,
    closeModal,
    spotifyEmbedUrl,
    isMusicPlaying,
  } = useStore()

  useEffect(() => {
    // Detect WebGL on mount
    const webgl = detectWebGL()
    const quality = getQualitySettings()
    setWebglSupported(webgl.supported)
    setQualitySettings(quality)

    // Initialize tour state from localStorage
    initTour()
  }, [])

  return (
    <>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/world" element={webglSupported ? <WorldPage /> : <FallbackPage />} />
          <Route path="/achievements" element={<AchievementsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/arcade" element={<ArcadePage />} />
          <Route path="/fallback" element={<FallbackPage />} />
          {/* Catch-all */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </Suspense>

      <Navigation />

      {/* Music Jukebox & Spotify/YouTube Player Modal (Always stays mounted in DOM so music keeps playing) */}
      <SpotifyModal isOpen={activeModal === 'spotify'} onClose={closeModal} />
    </>
  )
}

export default App
