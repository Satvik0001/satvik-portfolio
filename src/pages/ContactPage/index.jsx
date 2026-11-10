import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { profile } from '@data/profile'
import { useAudio } from '@hooks/useAudio'
import styles from './ContactPage.module.css'

export default function ContactPage() {
  const navigate = useNavigate()
  const { playClick, playHover } = useAudio()
  const { contact } = profile

  const [copiedEmail, setCopiedEmail] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiryType: 'Studio Role / Full-time Opportunity',
    message: '',
  })
  const [copiedForm, setCopiedForm] = useState(false)

  const handleCopyEmail = (e) => {
    e.preventDefault()
    playClick()
    navigator.clipboard.writeText(contact.email)
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2400)
  }

  const handleFormChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSendMail = (e) => {
    e.preventDefault()
    playClick()
    const subject = encodeURIComponent(`[Portfolio Inquiry] ${formData.inquiryType} - from ${formData.name || 'Visitor'}`)
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nInquiry: ${formData.inquiryType}\n\nMessage:\n${formData.message}`
    )
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`
  }

  const handleCopyFormMessage = (e) => {
    e.preventDefault()
    playClick()
    const content = `To: ${contact.email}\nName: ${formData.name}\nEmail: ${formData.email}\nType: ${formData.inquiryType}\n\nMessage:\n${formData.message}`
    navigator.clipboard.writeText(content)
    setCopiedForm(true)
    setTimeout(() => setCopiedForm(false), 2400)
  }

  return (
    <div className={styles.page}>
      {/* Background ambient lighting */}
      <div className={styles.ambientGlow} aria-hidden="true" />

      <main className={styles.mainContainer}>
        {/* Page Top Header */}
        <header className={styles.header}>
          <div className={styles.statusBadge}>
            <span className={styles.statusDot}>●</span>
            <span>AVAILABLE FOR GAMEPLAY ENGINEERING ROLES</span>
          </div>
          <h1 className={styles.pageTitle}>Let&apos;s Build Something Memorable</h1>
          <p className={styles.pageSubtitle}>
            Whether you have a game project in mind, an opportunity at your studio,
            or want to talk Unity physics architectures and responsive gameplay feel — let&apos;s connect.
          </p>
        </header>

        {/* Two-Column Responsive Split */}
        <div className={styles.splitGrid}>
          {/* LEFT: Quick Direct Message Form */}
          <section className={styles.formCard}>
            <div className={styles.cardHeader}>
              <div className={styles.cardIcon}>✉️</div>
              <div>
                <h2 className={styles.cardTitle}>Send a Direct Message</h2>
                <p className={styles.cardDesc}>Fill out the inquiry details below to generate an email directly.</p>
              </div>
            </div>

            <form onSubmit={handleSendMail} className={styles.contactForm}>
              <div className={styles.formRow}>
                <div className={styles.inputGroup}>
                  <label htmlFor="name" className={styles.inputLabel}>
                    YOUR NAME
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="e.g. Alex Vance"
                    value={formData.name}
                    onChange={handleFormChange}
                    className={styles.textInput}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="email" className={styles.inputLabel}>
                    YOUR EMAIL
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="alex@studio.com"
                    value={formData.email}
                    onChange={handleFormChange}
                    className={styles.textInput}
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="inquiryType" className={styles.inputLabel}>
                  INQUIRY TYPE
                </label>
                <select
                  id="inquiryType"
                  name="inquiryType"
                  value={formData.inquiryType}
                  onChange={handleFormChange}
                  className={styles.selectInput}
                >
                  <option value="Studio Role / Full-time Opportunity">Studio Role / Full-time Opportunity</option>
                  <option value="Freelance / Game Prototype">Freelance / Game Prototype</option>
                  <option value="Game Mechanics & Tech Discussion">Game Mechanics & Tech Discussion</option>
                  <option value="General Networking">General Networking</option>
                </select>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="message" className={styles.inputLabel}>
                  MESSAGE / PROJECT DETAILS
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  placeholder="Tell me about your game vision, team requirements, or technical challenges..."
                  value={formData.message}
                  onChange={handleFormChange}
                  className={styles.textArea}
                />
              </div>

              <div className={styles.formActions}>
                <button
                  type="submit"
                  className={styles.submitBtn}
                  onMouseEnter={playHover}
                >
                  <span>SEND VIA EMAIL CLIENT</span>
                  <span className={styles.btnArrow}>↗</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyFormMessage}
                  className={styles.copyFormBtn}
                  onMouseEnter={playHover}
                >
                  {copiedForm ? '✓ COPIED DETAILS!' : '📋 COPY MESSAGE TEXT'}
                </button>
              </div>
            </form>
          </section>

          {/* RIGHT: Direct Channels & Studio Dossier */}
          <div className={styles.rightColumn}>
            {/* Direct Connect Links */}
            <section className={styles.channelsCard}>
              <h2 className={styles.subHeading}>DIRECT CHANNELS</h2>

              <div className={styles.channelTiles}>
                {/* Email with 1-click copy */}
                <div className={styles.channelTile}>
                  <div className={styles.tileIconCyan}>✉</div>
                  <div className={styles.tileMain}>
                    <span className={styles.tileLabel}>DIRECT EMAIL</span>
                    <a
                      href={`mailto:${contact.email}`}
                      className={styles.tileValueLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {contact.email}
                    </a>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className={styles.tileActionBtn}
                    title="Copy Email to Clipboard"
                    onMouseEnter={playHover}
                  >
                    {copiedEmail ? '✓ COPIED' : 'COPY'}
                  </button>
                </div>

                {/* GitHub */}
                {contact.github && (
                  <a
                    href={contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.channelTileLink}
                    onMouseEnter={playHover}
                  >
                    <div className={styles.tileIconPurple}>◈</div>
                    <div className={styles.tileMain}>
                      <span className={styles.tileLabel}>GITHUB CODEBASE</span>
                      <span className={styles.tileValue}>github.com/Satvik0001</span>
                    </div>
                    <span className={styles.tileArrow}>↗</span>
                  </a>
                )}

                {/* LinkedIn */}
                {contact.linkedin && (
                  <a
                    href={contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.channelTileLink}
                    onMouseEnter={playHover}
                  >
                    <div className={styles.tileIconBlue}>in</div>
                    <div className={styles.tileMain}>
                      <span className={styles.tileLabel}>LINKEDIN PROFILE</span>
                      <span className={styles.tileValue}>linkedin.com/in/satvik-prajapati</span>
                    </div>
                    <span className={styles.tileArrow}>↗</span>
                  </a>
                )}
              </div>
            </section>

            {/* Developer Dossier Card */}
            <section className={styles.dossierCard}>
              <h2 className={styles.subHeading}>DEVELOPER PROFILE</h2>

              <div className={styles.dossierList}>
                <div className={styles.dossierRow}>
                  <span className={styles.dossierKey}>LOCATION:</span>
                  <span className={styles.dossierVal}>Ahmedabad, Gujarat, India (IST / UTC+5:30)</span>
                </div>

                <div className={styles.dossierRow}>
                  <span className={styles.dossierKey}>AVAILABILITY:</span>
                  <span className={styles.dossierValHighlight}>Immediate • Full-time / Contract</span>
                </div>

                <div className={styles.dossierRow}>
                  <span className={styles.dossierKey}>FOCUS ROLES:</span>
                  <span className={styles.dossierVal}>Gameplay Programmer, Unity C# Dev, Mechanics Engineer</span>
                </div>

                <div className={styles.dossierRow}>
                  <span className={styles.dossierKey}>EXPERIENCE:</span>
                  <span className={styles.dossierVal}>6 Months Studio Internship at Gameyogi</span>
                </div>
              </div>
            </section>

            {/* Back to 3D Studio Workspace */}
            <div className={styles.navBackBox}>
              <button
                className={styles.backBtn}
                onClick={() => {
                  playClick()
                  navigate('/world')
                }}
                onMouseEnter={playHover}
              >
                <span>🤖 ENTER 3D STUDIO WORKSPACE</span>
                <span className={styles.btnArrow}>▶</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
