import { useRef, useCallback } from 'react'
import Dither from './components/Dither/Dither'
import './App.css'

function App() {
  const ditherRef = useRef(null)

  const setMask = useCallback((x, y) => {
    if (ditherRef.current) {
      const mask = `radial-gradient(circle 150px at ${x}px ${y}px, transparent 0%, transparent 20%, black 100%)`
      ditherRef.current.style.maskImage = mask
      ditherRef.current.style.webkitMaskImage = mask
    }
  }, [])

  const clearMask = useCallback(() => {
    if (ditherRef.current) {
      ditherRef.current.style.maskImage = ''
      ditherRef.current.style.webkitMaskImage = ''
    }
  }, [])

  const handleMouseMove = useCallback((e) => setMask(e.clientX, e.clientY), [setMask])

  const handleTouchMove = useCallback((e) => {
    const touch = e.touches[0]
    if (touch) setMask(touch.clientX, touch.clientY)
  }, [setMask])

  return (
    <div
      className="app-container"
      onMouseMove={handleMouseMove}
      onMouseLeave={clearMask}
      onTouchMove={handleTouchMove}
      onTouchEnd={clearMask}
    >
      <div className="background-text">
        Nick Sajer
      </div>

      <a
        href="https://www.instagram.com/nicksajer/"
        target="_blank"
        rel="noopener noreferrer"
        className="instagram-link"
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

      <div className="dither-layer" ref={ditherRef}>
        <Dither
          waveColor={[0.32941176470588235, 0.403921568627451, 0.6274509803921569]}
          disableAnimation={false}
          enableMouseInteraction
          mouseRadius={0.2}
          colorNum={5}
          pixelSize={2}
          waveAmplitude={0.4}
          waveFrequency={3}
          waveSpeed={0.03}
        />
      </div>
    </div>
  )
}

export default App
