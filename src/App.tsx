import { useState, useCallback } from 'react'
import './App.css'

const EMBED_URL = 'http://localhost:5173/'

// ─── Analytics Modal ───────────────────────────────────────────────────────────

function AnalyticsModal({ onClose }: { onClose: () => void }) {
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) onClose()
    },
    [onClose],
  )

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">Advanced Analytics Dashboard</h2>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            ✕
          </button>
        </div>
        <div className="modal-body">
          <iframe
            className="embed-iframe"
            src={EMBED_URL}
            title="Advanced Analytics Dashboard"
            allow="fullscreen"
          />
        </div>
      </div>
    </div>
  )
}

// ─── App ───────────────────────────────────────────────────────────────────────

const ORGANIZATIONS = ['CoVet Organization Test', 'Org Alpha', 'Org Beta']

function App() {
  const [selectedOrg, setSelectedOrg] = useState(ORGANIZATIONS[0])
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = useCallback(() => setIsModalOpen(true), [])
  const closeModal = useCallback(() => setIsModalOpen(false), [])

  return (
    <div className="app-wrapper">
      <header className="dashboard-header">
        <h1 className="dashboard-title">Enterprise Dashboard</h1>
        <div className="header-controls">
          <select
            className="org-select"
            value={selectedOrg}
            onChange={(e) => setSelectedOrg(e.target.value)}
            aria-label="Select organization"
          >
            {ORGANIZATIONS.map((org) => (
              <option key={org} value={org}>
                {org}
              </option>
            ))}
          </select>

          <button className="icon-btn" aria-label="Export CSV">
            <CsvIcon />
          </button>

          <button className="icon-btn" aria-label="Settings">
            <SettingsIcon />
          </button>
        </div>
      </header>

      <main className="dashboard-content">
        <div className="analytics-card">
          <div className="analytics-card-info">
            <h2 className="analytics-card-title">Advanced Analytics Dashboard</h2>
            <p className="analytics-card-subtitle">
              Gain insight into your practice with real-time AI analytics
            </p>
          </div>
          <button className="view-analytics-btn" onClick={openModal}>
            View Analytics
          </button>
        </div>
      </main>

      {isModalOpen && <AnalyticsModal onClose={closeModal} />}
    </div>
  )
}

// ─── Icons ─────────────────────────────────────────────────────────────────────

function CsvIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  )
}

function SettingsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  )
}

export default App
