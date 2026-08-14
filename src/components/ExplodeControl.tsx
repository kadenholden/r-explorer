import { useAppStore } from '../store/useAppStore'

export function ExplodeControl() {
  const explode = useAppStore((s) => s.explode)
  const setExplode = useAppStore((s) => s.setExplode)
  const isolatedCount = useAppStore((s) => Object.keys(s.isolated).length)
  const clearIsolation = useAppStore((s) => s.clearIsolation)

  return (
    <div className="explode-control">
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
