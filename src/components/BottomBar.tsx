import { ALL_PARTS } from '../data/loader'
import { useAppStore } from '../store/useAppStore'

/** The status strip along the bottom: how the mouse behaves, explode,
 *  bonnet, display toggles, and what is currently isolated. */
export function BottomBar() {
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
  const showEdges = useAppStore((s) => s.showEdges)
  const toggleEdges = useAppStore((s) => s.toggleEdges)
  const leakMode = useAppStore((s) => s.leakMode)
  const inspectorOpen = useAppStore((s) => s.inspectorOpen)
  const setInspectorOpen = useAppStore((s) => s.setInspectorOpen)

  return (
    <footer className="bottombar">
      <div className="seg" role="group" aria-label="Drag behaviour">
        <button
          type="button"
          className={`seg-btn${!panMode ? ' is-active' : ''}`}
          onClick={() => panMode && togglePanMode()}
          title="Left-drag orbits the car (right-drag and arrow keys always pan)"
        >
          ⟳ Orbit
        </button>
        <button
          type="button"
          className={`seg-btn${panMode ? ' is-active' : ''}`}
          onClick={() => !panMode && togglePanMode()}
          title="Left-drag slides the camera"
        >
          ✥ Pan
        </button>
      </div>

      <label className="explode" htmlFor="explode-slider">
        <span>Explode</span>
        <input
          id="explode-slider"
          type="range"
          min={0}
          max={100}
          value={Math.round(explode * 100)}
          onChange={(e) => setExplode(Number(e.target.value) / 100)}
        />
        <b>{Math.round(explode * 100)}%</b>
      </label>

      <button type="button" className={`bb-btn${bonnetOpen ? ' is-active' : ''}`} onClick={toggleBonnet} title="Hinge the bonnet">
        Bonnet {bonnetOpen ? 'open' : 'closed'}
      </button>
      <button
        type="button"
        className={`bb-btn${showEdges ? ' is-active' : ''}`}
        onClick={toggleEdges}
        title="Ink edge lines on every part"
        aria-pressed={showEdges}
      >
        Edges
      </button>
      <button
        type="button"
        className={`bb-btn${showOrientation ? ' is-active' : ''}`}
        onClick={toggleOrientation}
        title="FRONT / REAR / DRIVER'S / PASSENGER markers on the ground"
        aria-pressed={showOrientation}
      >
        Sides
      </button>

      {isolatedCount > 0 && !leakMode && (
        <button type="button" className="bb-btn bb-btn--accent" onClick={clearIsolation} title="Clear isolation and show every part again">
          Isolating {isolatedCount} · show all ✕
        </button>
      )}

      <div className="bb-spacer" />
      {!inspectorOpen && (
        <button type="button" className="bb-btn" onClick={() => setInspectorOpen(true)} title="Reopen the inspector panel">
          Inspector
        </button>
      )}
      <span className="bb-meta">{ALL_PARTS.length} parts</span>
    </footer>
  )
}
