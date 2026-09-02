import { useAppStore } from '../store/useAppStore'

/**
 * The PCV-diaphragm diagnosis card (R13 fault library) — the operator's
 * own live fault. Healthy regulation ~100 mbar of crankcase depression;
 * a torn diaphragm passes manifold vacuum straight through (up to
 * ~22 inHg at the oil cap), whistles, hunts at idle and pushes oil past
 * seals.
 */
export function PcvOverlay() {
  const pcvTorn = useAppStore((s) => s.pcvTorn)
  const togglePcv = useAppStore((s) => s.togglePcv)
  if (!pcvTorn) return null

  return (
    <aside className="context-card context-card--fault" role="status" aria-label="PCV fault demonstration">
      <div className="context-head">
        <span className="context-code">PCV</span>
        <span className="context-title">Crankcase breather diaphragm — torn</span>
        <button type="button" className="panel-close" aria-label="Clear fault" onClick={togglePcv}>
          ✕
        </button>
      </div>
      <div className="context-body">
        <div className="readouts">
          <span className="readout-label">Crankcase depression</span>
          <span>
            Healthy <strong>~100 mbar regulated</strong>
          </span>
          <span className="bad">
            Torn <strong>up to ~22 inHg — unregulated</strong>
          </span>
        </div>
        <ol>
          <li>
            <strong>Listen:</strong> a whistle/whine from the engine top is the classic tell; idle hunts, and codes
            P0171/P2187 (lean) may or may not set.
          </li>
          <li>
            <strong>Oil-cap test at idle:</strong> a torn diaphragm sucks the cap down hard and the idle changes
            sharply when it's lifted.
          </li>
          <li>
            <strong>Look for oil</strong> pushed past seals — rear main especially — and smoke after hard
            cornering: crankcase pressure has to go somewhere.
          </li>
          <li>
            <strong>Fix:</strong> the separator is a bolt-on module — fit the latest revision (
            <strong>06K103495BL/BM</strong>, or the Gen 4 evo retrofit). No coding needed.
          </li>
          <li>
            Leak persists after the PCV? Re-seal the <strong>cam bridge</strong> (anaerobic sealant D174003M2, new
            one-time bolts) — the other half of this car's leak story.
          </li>
        </ol>
      </div>
    </aside>
  )
}
