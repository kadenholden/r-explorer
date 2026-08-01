import { useAppStore } from '../store/useAppStore'

/**
 * The P2015 diagnosis card, shown while the fault simulation is active.
 * Content follows dossier §2: the Ross-Tech definition, the MVB-142
 * specified-vs-actual mismatch, and the real repair decision tree
 * (sensor 06K907386D vs complete manifold 06L133201FP).
 */
export function P2015Overlay() {
  const p2015 = useAppStore((s) => s.p2015)
  const flapsOpen = useAppStore((s) => s.flapsOpen)
  const toggleP2015 = useAppStore((s) => s.toggleP2015)
  if (!p2015) return null

  const specified = flapsOpen ? '99%' : '0%'

  return (
    <aside className="p2015-overlay" role="status" aria-label="P2015 fault demonstration">
      <div className="p2015-header">
        <span className="p2015-code">P2015</span>
        <span className="p2015-title">
          Intake Manifold Flap Position Sensor (Bank 1): Implausible Signal
        </span>
        <button type="button" className="panel-close" aria-label="Clear fault" onClick={toggleP2015}>
          ✕
        </button>
      </div>
      <div className="p2015-body">
        <div className="p2015-mvb">
          <span className="plate-label">VCDS measuring block 142</span>
          <div className="p2015-readouts">
            <span>
              Specified <strong>{specified}</strong>
            </span>
            <span className="p2015-bad">
              Actual <strong>37% — stuck</strong>
            </span>
          </div>
        </div>
        <ol>
          <li>
            <strong>Output Test [03]</strong> — command V157: do the flaps physically move?
          </li>
          <li>
            <strong>MVB 142</strong> — actual should track specified (0% idle → ~99% actuated).
          </li>
          <li>
            Linkage intact but signal implausible → sensor alone: <strong>06K907386D</strong>.
          </li>
          <li>
            Flap arm worn/detached → complete manifold: <strong>06L133201FP</strong> (V157 is
            not sold separately).
          </li>
          <li>
            After any swap: <strong>Basic Settings, Group 142</strong> adaptation (re-teach
            end-stops); "ERROR" status = fault persists.
          </li>
        </ol>
      </div>
    </aside>
  )
}
