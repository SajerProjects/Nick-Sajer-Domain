import { useState } from 'react'
import LightRays from './components/LightRays/LightRays'
import WaitlistModal from './components/WaitlistModal/WaitlistModal'
import profilePicture from './assets/profile-picture.jpeg'
import './App.css'

function App() {
  const [waitlistOpen, setWaitlistOpen] = useState(false)

  return (
    <div className="app-container">
      <div className="center-stack">
        <img
          className="profile-picture"
          src={profilePicture}
          alt="Nick Sajer"
        />

        <h1 className="site-name">Nick Sajer</h1>
        <p className="tagline">AI / Finance</p>

        <div className="social-links">
          <a
            href="https://www.instagram.com/nicksajer/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            aria-label="Instagram"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="38"
              height="38"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="5" />
              <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
            </svg>
          </a>
          <a
            href="https://www.youtube.com/@NickSajer"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            aria-label="YouTube"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="38"
              height="38"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.546 12 3.546 12 3.546s-7.505 0-9.377.504A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.504 9.376.504 9.376.504s7.505 0 9.377-.504a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </a>
          <a
            href="https://x.com/Sajer_Projects"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            aria-label="X"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="34"
              height="34"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <a
            href="https://www.tiktok.com/@nicksajer"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            aria-label="TikTok"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="34"
              height="34"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.18 8.18 0 0 0 4.76 1.52V6.84a4.84 4.84 0 0 1-1-.15z" />
            </svg>
          </a>
        </div>

        <button className="waitlist-button" onClick={() => setWaitlistOpen(true)}>
          Join Waitlist
        </button>
      </div>

      <WaitlistModal isOpen={waitlistOpen} onClose={() => setWaitlistOpen(false)} />

      <div className="dither-layer">
        <LightRays
          raysOrigin="top-center"
          raysColor="#7b8fc6"
          raysSpeed={1}
          lightSpread={1}
          rayLength={2}
          followMouse
          mouseInfluence={0.1}
        />
      </div>
    </div>
  )
}

export default App
