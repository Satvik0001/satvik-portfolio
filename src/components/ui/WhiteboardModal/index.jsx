import React from 'react'
import Modal from '@components/ui/Modal'
import styles from './WhiteboardModal.module.css'

export default function WhiteboardModal({ isOpen, onClose }) {
  if (!isOpen) return null

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="// GAME ARCHITECTURE & TECH STACK"
      size="lg"
    >
      <div className={styles.container}>
        <div className={styles.introBlock}>
          <span className={styles.badge}>◈ ENGINEERING PRINCIPLES</span>
          <h3 className={styles.heading}>Building Scalable, High-Performance Game Systems</h3>
          <p className={styles.subtext}>
            Deep dive into design patterns, memory optimization, and technical architecture used in my game projects.
          </p>
        </div>

        <div className={styles.grid}>
          {/* Card 1: Architecture Patterns */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.cardIcon}>⚙</span>
              <h4 className={styles.cardTitle}>Core Design Patterns</h4>
            </div>
            <ul className={styles.list}>
              <li><strong>Hierarchical State Machines (HSM):</strong> Robust character controller states (Walk, Run, Jump, Dash, Attack, Fall).</li>
              <li><strong>ScriptableObject Architecture:</strong> Decoupled event-driven game architecture with modular game events &amp; variables.</li>
              <li><strong>Object Pooling System:</strong> Zero-garbage-collection instantiation for high-frequency projectiles, particles, and enemies.</li>
              <li><strong>Service Locator &amp; Dependency Injection:</strong> Clean access to Audio, Save, and Input systems without static god-classes.</li>
            </ul>
          </div>

          {/* Card 2: Performance & Optimization */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.cardIcon}>⚡</span>
              <h4 className={styles.cardTitle}>Profiling &amp; Optimization</h4>
            </div>
            <ul className={styles.list}>
              <li><strong>Draw Call Reduction:</strong> Static &amp; dynamic batching, GPU instancing, texture atlasing.</li>
              <li><strong>Garbage Collection Mitigation:</strong> Structs, pooled collections, non-allocating physics query overloads (<code>Physics.OverlapSphereNonAlloc</code>).</li>
              <li><strong>Physics Optimization:</strong> Layer collision matrix optimization, simplified compound primitive colliders.</li>
              <li><strong>Unity Profiler:</strong> Memory snapshots, frame timing analysis, deep profile diagnostics.</li>
            </ul>
          </div>

          {/* Card 3: Modern Unity Tech Stack */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.cardIcon}>🎮</span>
              <h4 className={styles.cardTitle}>Unity Technology Stack</h4>
            </div>
            <div className={styles.tagGroup}>
              <span className={styles.tag}>Unity 2022 / 2023 LTS</span>
              <span className={styles.tag}>Universal Render Pipeline (URP)</span>
              <span className={styles.tag}>Shader Graph</span>
              <span className={styles.tag}>VFX Graph</span>
              <span className={styles.tag}>Cinemachine</span>
              <span className={styles.tag}>New Input System</span>
              <span className={styles.tag}>Addressables Asset System</span>
              <span className={styles.tag}>C# 9 / .NET Standard</span>
            </div>
          </div>

          {/* Card 4: Current Roadmap */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.cardIcon}>🚀</span>
              <h4 className={styles.cardTitle}>Active Research &amp; Roadmap</h4>
            </div>
            <ul className={styles.list}>
              <li><strong>DOTS / Unity ECS:</strong> High-performance entity component systems for massive crowd simulations.</li>
              <li><strong>Custom HLSL Compute Shaders:</strong> GPU-driven fluid &amp; particle physics.</li>
              <li><strong>Procedural Generation:</strong> Wave Function Collapse &amp; Cellular Automata dungeon generation.</li>
            </ul>
          </div>
        </div>
      </div>
    </Modal>
  )
}
