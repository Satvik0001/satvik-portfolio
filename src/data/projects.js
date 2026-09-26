// projects.js — Satvik Prajapati's Featured Game Development Projects

const BASE = import.meta.env.BASE_URL || '/'

export const projects = [
  {
    id: 'orbital-drift',
    title: 'Orbital Drift: Meteor Mayhem',
    description:
      'A fast-paced 3D arcade driving game featuring custom spherical gravity physics. Players pilot an agile planetary rover around a spherical celestial planet while dodging a barrage of incoming meteors raining down from orbit, triggering dynamic crater hazards and shockwaves.',
    technologies: ['Unity 3D', 'C#', 'Spherical Gravity Math', 'Cinemachine', 'Particle VFX', 'URP'],
    role: 'Lead Gameplay Programmer & Technical Designer',
    features: [
      'Custom spherical gravity physics engine allowing full 360-degree planetary surface navigation without losing traction',
      'Dynamic meteor impact system with orbital trajectory calculation, ground shockwaves, and procedural hazard zones',
      'Drift mechanics, momentum management, and turbo boost tuned for high-speed evasion',
      'Dynamic Cinemachine orbital camera with smart orientation smoothing relative to planet normal vectors',
      'Progressive wave-based difficulty with escalating meteor density and atmospheric warning indicators'
    ],
    learned:
      'Mastered non-Euclidean spherical physics vectors, surface normal reorientation, and optimizing multi-particle meteor explosions.',
    image: `${BASE}projects/orbital-drift.svg`,
    github: 'https://github.com/Satvik0001/orbital-drift-meteor',
    demo: null,
    year: 2026,
    featured: true,
  },
  {
    id: 'intern-boss-escape',
    title: 'Intern Escape: Boss Rush',
    description:
      'A comedic stealth puzzle game where an overworked intern must sneak out of a labyrinthine corporate office at 5:00 PM without entering the field-of-view of the patrolling boss and micromanager supervisors.',
    technologies: ['Unity 2D', 'C#', 'Field-of-View Raycasting', 'A* Pathfinding', 'State Machines', '2D Lighting'],
    role: 'Solo Game Developer & UI Designer',
    features: [
      'Dynamic 2D raycast cone-of-vision system with real-time shadow occlusion around cubicle walls and office dividers',
      'Patrol & alert AI behavior tree (Idle, Patrol, Suspicious/Investigating, Chasing, Alarm State)',
      'Environmental distraction mechanics — throw coffee mugs, trigger malfunctioning printers, and ring desks phones',
      'Interactive stealth hiding spots (supply closets, under desks, behind water coolers)',
      'Humorous narrative pacing with situational sound cues and reactive comic-style alert bubbles'
    ],
    learned:
      'Built custom polygon vision cone mesh generation in real-time, fine-tuned stealth AI suspense curves, and designed responsive UI dialogue prompts.',
    image: `${BASE}projects/intern-escape.svg`,
    github: 'https://github.com/Satvik0001/intern-boss-escape',
    demo: null,
    year: 2026,
    featured: true,
  },
  {
    id: 'takeshis-castle-parkour',
    title: "Takeshi's Gauntlet: Obstacle Run",
    description:
      "A physics-driven 3D obstacle parkour game inspired by the legendary TV show 'Takeshi's Castle'. Players must leap, slide, wall-bounce, and balance across treacherous hazard courses filled with rotating logs, slippery stones, and swinging wrecking balls to reach the victory bell.",
    technologies: ['Unity 3D', 'C#', 'Rigidbody Physics', 'Ragdoll Dynamics', 'Procedural Hazards', 'Custom UI'],
    role: 'Gameplay Programmer & Level Designer',
    features: [
      'Physics-based responsive character controller supporting ledge grabbing, slide momentum, dynamic balance, and wall jumping',
      'Active kinematic hazards: rotating spiked cylinders, collapsing trapdoors, punch walls, and swinging pendulums with calibrated timing windows',
      'Seamless transition to active ragdoll physics upon sudden impacts with recovery get-up animations',
      'Checkpoint respawn mechanics and precision timer system for competitive speedrunning',
      'Punchy arcade sound effects, screen shakes, and high-energy stadium visual aesthetics'
    ],
    learned:
      'Developed deep expertise in physics simulation stability, kinematic moving platforms, physics interpolation, and designing challenging yet fair obstacle cadence.',
    image: `${BASE}projects/takeshis-gauntlet.svg`,
    github: 'https://github.com/Satvik0001/takeshis-gauntlet-parkour',
    demo: null,
    year: 2026,
    featured: true,
  }
]
