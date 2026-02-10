import Dither from './components/Dither/Dither'

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
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
  )
}

export default App
