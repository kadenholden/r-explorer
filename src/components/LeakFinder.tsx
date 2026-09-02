import { useEffect, useState } from 'react'
import type { MouseEvent } from 'react'
import { LEAK_ZONES, OIL_SUSPECTS, RANK_META, suspectsForZone, type LeakZone } from '../data/leaks'
import { partById, partWorldDirection, partWorldPosition } from '../data/loader'
import { useAppStore } from '../store/useAppStore'

/**
 * The oil-leak finder. Two halves:
 *  - the 3D view lights every oil joint by likelihood and ghosts the rest
 *    (PartMesh does the painting; this turns it on),
 *  - the list asks WHERE the oil shows up and answers with what can put it
 *    there, because gravity means the source is usually higher up.
 */

export function LeakFinderTab() {
  const setLeakMode = useAppStore((s) => s.setLeakMode)
  const setLeakSuspect = useAppStore((s) => s.setLeakSuspect)
  const leakSuspectId = useAppStore((s) => s.leakSuspectId)
  const select = useAppStore((s) => s.select)
  const setInspectorTab = useAppStore((s) => s.setInspectorTab)
  const focusOn = useAppStore((s) => s.focusOn)
  const applyPreset = useAppStore((s) => s.applyPreset)
  const clearIsolation = useAppStore((s) => s.clearIsolation)
  const [zone, setZone] = useState<LeakZone | null>(null)

  // opening the tab IS the switch — the view goes into leak colours, the
  // bonnet comes up and the camera takes a three-quarter look at the engine
  useEffect(() => {
    clearIsolation()
    setLeakMode(true)
    applyPreset('engine')
    useAppStore.setState({ bonnetOpen: true })
    return () => {
      setLeakMode(false)
      setLeakSuspect(null)
    }
  }, [setLeakMode, setLeakSuspect, applyPreset, clearIsolation])

  const list = suspectsForZone(zone)

  const showMe = (e: MouseEvent, id: string, partId: string) => {
    e.preventDefault()
    e.stopPropagation()
    setLeakSuspect(leakSuspectId === id ? null : id)
    const part = partById(partId)
    if (part) {
      select(part.id)
      setInspectorTab('leak')
      focusOn(partWorldPosition(part), partWorldDirection(part))
    }
  }

  return (
    <>
      <div className="zones">
        <h4>Where do you see the oil?</h4>
        <div className="chips">
          <button type="button" className={`chip${zone === null ? ' is-on' : ''}`} onClick={() => setZone(null)}>
            Not sure — show all
          </button>
          {LEAK_ZONES.map((z) => (
            <button
              key={z.id}
              type="button"
              className={`chip${zone === z.id ? ' is-on' : ''}`}
              onClick={() => setZone(z.id)}
              title={z.hint}
            >
              {z.label}
            </button>
          ))}
        </div>
        {zone && <p className="muted">{LEAK_ZONES.find((z) => z.id === zone)?.hint}</p>}
        {zone && list.length < OIL_SUSPECTS.length && (
          <p className="muted">
            {list.length} of {OIL_SUSPECTS.length} suspects can put oil there — the rest are below it or on the
            wrong end of the engine.
          </p>
        )}
      </div>

      {list.map((s) => {
        const meta = RANK_META[s.rank]
        const open = leakSuspectId === s.id
        return (
          <details key={s.id} className={`row row--leak${open ? ' is-open' : ''}`} style={{ borderLeftColor: meta.color }}>
            <summary>
              <span className="rank" style={{ background: meta.color }}>
                {meta.label}
              </span>
              <span className="row-title">{s.title}</span>
              <button type="button" className={`btn btn--small${open ? ' is-on' : ''}`} onClick={(e) => showMe(e, s.id, s.partId)}>
                {open ? 'Shown' : 'Show'}
              </button>
            </summary>
            <div className="row-body">
              {s.pressuriser && (
                <p className="flag">
                  ⚠ Can be the hidden cause of a leak somewhere else — check it before spending money on anything
                  below.
                </p>
              )}
              <p className="callout-note">{s.tell}</p>
              <table className="spec spec--list">
                <tbody>
                  <tr>
                    <th>Fix</th>
                    <td>{s.fix}</td>
                  </tr>
                  <tr>
                    <th>Cost / effort</th>
                    <td>{s.cost}</td>
                  </tr>
                  <tr>
                    <th>Shows up</th>
                    <td>{s.reaches.map((z) => LEAK_ZONES.find((x) => x.id === z)?.label).join(' · ')}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </details>
        )
      })}
    </>
  )
}

/** Key for the colours while the leak view is on. */
export function LeakLegend() {
  const setLeakMode = useAppStore((s) => s.setLeakMode)
  const setInspectorTab = useAppStore((s) => s.setInspectorTab)
  return (
    <aside className="context-card context-card--key" aria-label="Oil leak view key">
      <div className="context-head">
        <span className="context-code">Key</span>
        <span className="context-title">Oil leak view</span>
        <button
          type="button"
          className="panel-close"
          aria-label="Exit leak view"
          onClick={() => {
            setLeakMode(false)
            setInspectorTab('part')
          }}
        >
          ✕
        </button>
      </div>
      <div className="context-body key-rows">
        {([1, 2, 3, 4] as const).map((r) => (
          <div key={r} className="key-row">
            <span className="key-dot" style={{ background: RANK_META[r].color }} />
            {RANK_META[r].label}
          </div>
        ))}
        <div className="key-row">
          <span className="key-dot" style={{ background: '#7a8290' }} />
          Oil-carrying, rarely leaks
        </div>
      </div>
    </aside>
  )
}
