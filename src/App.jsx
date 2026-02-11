import Dither from './components/Dither/Dither'
import ScrollReveal from './components/ScrollReveal/ScrollReveal'

function App() {
  return (
    <div style={{ width: '100vw', minHeight: '100vh', position: 'relative' }}>
      <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
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
      <div style={{ position: 'relative', zIndex: 1, color: '#a0a0a0', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', minHeight: '200vh', paddingBottom: '10vh', pointerEvents: 'none' }}>
        <ScrollReveal
          baseOpacity={0.1}
          enableBlur
          baseRotation={3}
          blurStrength={4}
        >
          Nick Sajer
        </ScrollReveal>
      </div>
    </div>
  )
}

export default App
