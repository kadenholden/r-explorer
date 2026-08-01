import { useAppStore } from '../store/useAppStore'

export function ExplodeControl() {
  const explode = useAppStore((s) => s.explode)
  const setExplode = useAppStore((s) => s.setExplode)

  return (
    <div className="explode-control">
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
