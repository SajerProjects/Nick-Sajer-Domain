import { useRef, useCallback } from 'react'
import Dither from './components/Dither/Dither'
import './App.css'

function App() {
  const ditherRef = useRef(null)

  const handleMouseMove = useCallback((e) => {
    if (ditherRef.current) {
      const mask = `radial-gradient(circle 150px at ${e.clientX}px ${e.clientY}px, transparent 0%, transparent 20%, black 100%)`
      ditherRef.current.style.maskImage = mask
      ditherRef.current.style.webkitMaskImage = mask
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (ditherRef.current) {
      ditherRef.current.style.maskImage = ''
      ditherRef.current.style.webkitMaskImage = ''
    }
  }, [])

  return (
    <div className="app-container" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <div className="background-text">
        Nick Sajer
      </div>

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
