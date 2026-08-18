import { useEffect, useState } from 'react'
import {
  LEAK_ZONES,
  OIL_SUSPECTS,
  RANK_META,
  suspectsForZone,
  type LeakZone,
} from '../data/leaks'
import { partById, partWorldDirection, partWorldPosition } from '../data/loader'
import { useAppStore } from '../store/useAppStore'

/**
 * The oil-leak finder. Two halves:
 *  - the 3D view lights every oil joint by likelihood and ghosts the rest
 *    (PartMesh does the painting; this turns it on),
 *  - the list asks WHERE the oil shows up and answers with what can put it
 *    there, because gravity means the source is usually higher up.
 */

function ZonePicker({
  zone,
  setZone,
}: {
  zone: LeakZone | null
  setZone: (z: LeakZone | null) => void
}) {
  return (
    <div className="leak-zones">
      <span className="leak-zones-label">Where do you see the oil?</span>
      <div className="leak-zone-chips">
        <button
          type="button"
          className={`isolation-chip${zone === null ? ' is-on' : ''}`}
          onClick={() => setZone(null)}
        >
          Not sure — show all
        </button>
        {LEAK_ZONES.map((z) => (
          <button
            key={z.id}
            type="button"
            className={`isolation-chip${zone === z.id ? ' is-on' : ''}`}
            onClick={() => setZone(z.id)}
            title={z.hint}
          >
            {z.label}
          </button>
        ))}
      </div>
      {zone && <p className="plate-note leak-zone-hint">{LEAK_ZONES.find((z) => z.id === zone)?.hint}</p>}
    </div>
  )
}

export function LeakFinderTab() {
  const setLeakMode = useAppStore((s) => s.setLeakMode)
  const setLeakSuspect = useAppStore((s) => s.setLeakSuspect)
  const leakSuspectId = useAppStore((s) => s.leakSuspectId)
  const select = useAppStore((s) => s.select)
  const focusOn = useAppStore((s) => s.focusOn)
  const applyPreset = useAppStore((s) => s.applyPreset)
  const clearIsolation = useAppStore((s) => s.clearIsolation)
  const [zone, setZone] = useState<LeakZone | null>(null)

  // opening the tab IS the switch — the view goes into leak colours, the
  // bonnet comes up and the camera looks down at the engine
  useEffect(() => {
    clearIsolation()
    setLeakMode(true)
    // three-quarter rather than plan view: straight down, the cam bridge
    // hides everything under it
    applyPreset('engine')
    useAppStore.setState({ bonnetOpen: true })
    return () => {
      setLeakMode(false)
      setLeakSuspect(null)
    }
  }, [setLeakMode, setLeakSuspect, applyPreset, clearIsolation])

  const list = suspectsForZone(zone)

  const showMe = (id: string, partId: string) => {
    setLeakSuspect(leakSuspectId === id ? null : id)
    const part = partById(partId)
    if (part) {
      select(part.id)
      focusOn(partWorldPosition(part), partWorldDirection(part))
    }
  }

  return (
    <>
      <ZonePicker zone={zone} setZone={setZone} />
      <div className="service-list">
        {zone && list.length < OIL_SUSPECTS.length && (
          <p className="plate-note leak-filter-note">
            {list.length} of {OIL_SUSPECTS.length} suspects can put oil there — the rest are
            physically below it or on the wrong end of the engine.
          </p>
        )}
        {list.map((s) => {
          const meta = RANK_META[s.rank]
          const open = leakSuspectId === s.id
          return (
            <article
              key={s.id}
              className={`service-card leak-card${open ? ' is-open' : ''}`}
              style={{ borderLeft: `3px solid ${meta.color}` }}
            >
              <div className="service-card-head">
                <h3>
                  <span className="leak-rank" style={{ background: meta.color }}>
                    {meta.label}
                  </span>
                  {s.title}
                </h3>
                <button type="button" className="avs-btn" onClick={() => showMe(s.id, s.partId)}>
                  {open ? 'Done' : 'Show me'}
                </button>
              </div>
              {s.pressuriser && (
                <p className="plate-note service-flag">
                  ⚠ This one can be the hidden cause of a leak somewhere else — check it before
                  you spend money anywhere on this list.
                </p>
              )}
              <p className="plate-note service-note-strong">{s.tell}</p>
              <div className="plate-row">
                <span className="plate-label">Fix</span>
                <span className="plate-value">{s.fix}</span>
              </div>
              <div className="plate-row">
                <span className="plate-label">Cost / effort</span>
                <span className="plate-value">{s.cost}</span>
              </div>
              <div className="plate-row">
                <span className="plate-label">Shows up</span>
                <span className="plate-value">
                  {s.reaches.map((z) => LEAK_ZONES.find((x) => x.id === z)?.label).join(' · ')}
                </span>
              </div>
            </article>
          )
        })}
      </div>
    </>
  )
}

/** Floating key while the leak view is on, so the colours mean something. */
export function LeakLegend() {
  const leakMode = useAppStore((s) => s.leakMode)
  const setLeakMode = useAppStore((s) => s.setLeakMode)
  if (!leakMode) return null
  return (
    <aside className="leak-legend" aria-label="Oil leak view key">
      <div className="leak-legend-head">
        <span>Oil leak view</span>
        <button type="button" className="panel-close" aria-label="Exit leak view" onClick={() => setLeakMode(false)}>
          ✕
        </button>
      </div>
      {([1, 2, 3, 4] as const).map((r) => (
        <div key={r} className="leak-legend-row">
          <span className="leak-dot" style={{ background: RANK_META[r].color }} />
          {RANK_META[r].label}
        </div>
      ))}
      <div className="leak-legend-row">
        <span className="leak-dot leak-dot--grey" />
        Oil-carrying, rarely leaks
      </div>
    </aside>
  )
}
