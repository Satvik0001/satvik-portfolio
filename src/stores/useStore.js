// useStore.js — Global Zustand state store

import { create } from 'zustand'

const useStore = create((set, get) => ({
  // ---- WebGL & Device ----
  webglSupported: true,
  qualitySettings: null,
  setWebglSupported: (v) => set({ webglSupported: v }),
  setQualitySettings: (q) => set({ qualitySettings: q }),

  // ---- Navigation state ----
  currentPage: 'home', // 'home' | 'world' | 'achievements' | 'contact' | 'arcade'
  setCurrentPage: (page) => set({ currentPage: page }),

  // ---- Modal state ----
  activeModal: null,  // null | 'about' | 'skills' | 'achievement' | 'project' | 'whiteboard' | 'notes' | 'spotify'
  modalData: null,    // data passed to the modal
  openModal: (type, data = null) => set({ activeModal: type, modalData: data }),
  closeModal: () => set({ activeModal: null, modalData: null }),

  // ---- Room interaction ----
  hoveredObject: null,        // name of currently hovered 3D object
  setHoveredObject: (name) => set({ hoveredObject: name }),

  chairRotating: false,       // is user rotating the chair?
  setChairRotating: (v) => set({ chairRotating: v }),

  // ---- Music & Vinyl Turntable ----
  isMusicPlaying: false,
  setIsMusicPlaying: (v) => set({ isMusicPlaying: v }),
  spotifyEmbedUrl: 'https://www.youtube.com/embed/videoseries?list=PLw-VjHDlEOgs658kAHR_88KZFV-KN-6u3&autoplay=1&mute=0',
  setSpotifyEmbedUrl: (url) => set({ spotifyEmbedUrl: url }),

  // ---- Onboarding tour ----
  tourComplete: false,
  tourStep: 0,
  completeTour: () => {
    localStorage.setItem('sp-tour-complete', '1')
    set({ tourComplete: true })
  },
  initTour: () => {
    const done = localStorage.getItem('sp-tour-complete') === '1'
    set({ tourComplete: done })
  },

  // ---- Audio ----
  audioEnabled: false, // Default off to respect autoplay policy
  toggleAudio: () => set((s) => ({ audioEnabled: !s.audioEnabled })),

  // ---- Arcade / Pac-Man ----
  arcadeExperienceOpen: false,
  setArcadeExperienceOpen: (v) => set({ arcadeExperienceOpen: v }),
  
  gameState: 'attract', // 'attract' | 'playing' | 'paused' | 'gameover' | 'win'
  setGameState: (state) => set({ gameState: state }),

  // ---- Page transition ----
  isTransitioning: false,
  transitionTo: null,
  startTransition: (target) => set({ isTransitioning: true, transitionTo: target }),
  endTransition: () => set({ isTransitioning: false, transitionTo: null }),
}))

export default useStore
