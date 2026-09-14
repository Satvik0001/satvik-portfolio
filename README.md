# Satvik Prajapati — Interactive 3D Game Developer Portfolio

A playable, interactive 3D game developer portfolio website designed to feel like a game level rather than a traditional resume page. Built with modern web technologies, Three.js, React Three Fiber, and customized procedural 3D environments.

---

## 🎮 Features

- **Cinematic Home Page**: Dark atmospheric main menu with interactive GSAP reveals, floating particles, and audio toggles.
- **Interactive 3D Gaming Room**:
  - **Desk & Three Monitors**: Left vertical monitor running Unity Editor, Center widescreen displaying animated gameplay, Right vertical monitor showing C# scripts in VS Code.
  - **Interactive Gaming Chair**: Smooth mouse drag rotation with realistic inertia damping.
  - **Mechanical Keyboard & RGB**: Dynamic sub-key lighting waves and accent keycaps.
  - **Retro Pac-Man Arcade Cabinet**: Fully playable 2D Pac-Man mini-game with ghost AI, scoring, lives, and mobile touch D-Pad controls.
  - **Bookshelf & Trophy Shelf**: Clickable objects opening detailed About Me, Skills, and Achievement modals.
- **Dedicated Pages**:
  - `/` — Main Menu (Play, View Achievements, Contact)
  - `/#/world` — Full 3D Interactive Room
  - `/#/arcade` — Full viewport Pac-Man Arcade with pauseable project overlay
  - `/#/achievements` — Trophy & award gallery
  - `/#/contact` — Recruiter-friendly contact dashboard
  - `/#/fallback` — Complete 2D accessible fallback mode for non-WebGL devices
- **Sound Effects**: Procedurally generated via the Web Audio API — zero external audio files needed.
- **GitHub Pages Ready**: Configured with `HashRouter` and Vite base path for static hosting.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install --legacy-peer-deps
```

### 2. Run Local Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

---

## 📝 Updating Your Portfolio Content

All personal content is clean and decoupled from the 3D graphics in `src/data/`:

| Data File | Description |
| :--- | :--- |
| `src/data/profile.js` | Name, bio, email, GitHub, LinkedIn, and resume links |
| `src/data/projects.js` | Projects list with titles, descriptions, features, and demo links |
| `src/data/experience.js` | Work history, roles, companies, and responsibilities |
| `src/data/achievements.js` | Competitions, certifications, and awards |
| `src/data/skills.js` | Categorized tech stack (Game Dev, Programming, Tools) |

Simply open any of these files and replace the `[PLACEHOLDER]` text with your real data.

---

## 🌐 Deploying to GitHub Pages

1. In `vite.config.js`, set `base` to match your repository name:
   ```javascript
   export default defineConfig({
     base: '/<your-repo-name>/',
     // ...
   })
   ```
2. Build the production files:
   ```bash
   npm run build
   ```
3. Push the `dist` folder to your `gh-pages` branch, or use the `gh-pages` npm package:
   ```bash
   npx gh-pages -d dist
   ```
