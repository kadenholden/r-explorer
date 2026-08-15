import { useAppStore } from '../store/useAppStore'

export function ExplodeControl() {
  const explode = useAppStore((s) => s.explode)
  const setExplode = useAppStore((s) => s.setExplode)
  const isolatedCount = useAppStore((s) => Object.keys(s.isolated).length)
  const clearIsolation = useAppStore((s) => s.clearIsolation)
  const bonnetOpen = useAppStore((s) => s.bonnetOpen)
  const toggleBonnet = useAppStore((s) => s.toggleBonnet)
  const panMode = useAppStore((s) => s.panMode)
  const togglePanMode = useAppStore((s) => s.togglePanMode)
  const showOrientation = useAppStore((s) => s.showOrientation)
  const toggleOrientation = useAppStore((s) => s.toggleOrientation)

  return (
    <div className="explode-control">
      <button
        type="button"
        className={`isolation-chip${showOrientation ? ' is-on' : ''}`}
        onClick={toggleOrientation}
        title="Show FRONT / DRIVER / PASSENGER / REAR labels around the car"
      >
        ⊕ Sides
      </button>
      <button
        type="button"
        className={`isolation-chip${panMode ? ' is-on' : ''}`}
        onClick={togglePanMode}
        title="Switch drag between orbiting the car and sliding the camera (arrow keys always pan; right-drag pans too)"
      >
        {panMode ? '✥ Pan mode' : '⟳ Orbit mode'}
      </button>
      <button
        type="button"
        className="isolation-chip"
        onClick={toggleBonnet}
        title="Hinge the bonnet open or closed"
      >
        {bonnetOpen ? 'Close bonnet' : 'Open bonnet'}
      </button>
      {isolatedCount > 0 && (
        <button
          type="button"
          className="isolation-chip"
          onClick={clearIsolation}
          title="Clear isolation and show every part again"
        >
          Isolating {isolatedCount} — show all ✕
        </button>
      )}
      <label htmlFor="explode-slider">Explode</label>
      <input
        id="explode-slider"
        type="range"
        min={0}
        max={100}
        value={Math.round(explode * 100)}
        onChange={(e) => setExplode(Number(e.target.value) / 100)}
      />
      <span className="explode-value">{Math.round(explode * 100)}%</span>
    </div>
  )
}
