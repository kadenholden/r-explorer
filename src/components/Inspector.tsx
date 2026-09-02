import { useMemo } from 'react'
import type { MouseEvent } from 'react'
import type { PartRecord, TorqueSpec } from '../types/parts'
import { systemDef } from '../data/taxonomy'
import { ASSEMBLIES, partById, partWorldDirection, partWorldPosition } from '../data/loader'
import { MOT_ITEMS, SERVICE_ITEMS } from '../data/service'
import type { ServiceItem } from '../data/service'
import { JOBS, startJob } from '../data/jobs'
import { useAppStore } from '../store/useAppStore'
import type { InspectorTab } from '../store/useAppStore'
import { LeakFinderTab } from './LeakFinder'

/**
 * The right-hand inspector. One panel, five tabs. The Part tab is a title
 * block first — the numbers you need at the car — and prose last.
 */

const TABS: { id: InspectorTab; label: string }[] = [
  { id: 'part', label: 'Part' },
  { id: 'service', label: 'Service' },
  { id: 'mot', label: 'MOT' },
  { id: 'jobs', label: 'Jobs' },
  { id: 'leak', label: 'Oil leak' },
]

function formatTorque(t: TorqueSpec): string {
  let s = `${t.valueNm} Nm`
  if (t.angle) s += ` ${t.angle}`
  return s
}

/** Plain-English location derived from where the part sits in the model —
 *  the translation layer between the 3D view and the real bay. */
function describeLocation(part: PartRecord): string {
  const [x, y, z] = partWorldPosition(part)
  const side = x > 0.15 ? "driver's side" : x < -0.15 ? 'passenger side' : 'centre'
  const zone = z > -0.5 ? 'engine bay' : z < -2.7 ? 'rear' : 'cabin / underfloor'
  const height = y > 0.25 ? 'high' : y < -0.1 ? 'low' : 'mid-height'
  return `${zone} · ${side} · ${height}`
}

function provenance(part: PartRecord): { label: string; tone: 'good' | 'warn' | 'plain' } {
  if (part.tags.includes('position-unverified')) return { label: 'Position estimated', tone: 'warn' }
  if (part.tags.includes('photo-verified')) return { label: 'Photo-verified', tone: 'good' }
  if (part.tags.includes('operator-confirmed')) return { label: 'Operator-confirmed', tone: 'good' }
  return { label: 'From research', tone: 'plain' }
}

/* ── demos that live on specific parts ─────────────────────────────────── */

function AvsToggle() {
  const avsLargeLobe = useAppStore((s) => s.avsLargeLobe)
  const toggleAvs = useAppStore((s) => s.toggleAvs)
  return (
    <section className="block">
      <h4>AVS lift demo</h4>
      <button type="button" className={`btn${avsLargeLobe ? ' is-on' : ''}`} onClick={toggleAvs} aria-pressed={avsLargeLobe}>
        {avsLargeLobe ? 'Large lobe (>~3,100 rpm)' : 'Small lobe (low rpm)'}
      </button>
      <p className="muted">Slides the elements axially — exactly what the electromagnetic actuators do on the real cam.</p>
    </section>
  )
}

function PcvControls() {
  const pcvTorn = useAppStore((s) => s.pcvTorn)
  const togglePcv = useAppStore((s) => s.togglePcv)
  return (
    <section className="block">
      <h4>PCV diaphragm demo</h4>
      <button type="button" className={`btn btn--fault${pcvTorn ? ' is-on' : ''}`} onClick={togglePcv} aria-pressed={pcvTorn}>
        {pcvTorn ? 'Diaphragm torn — clear fault' : 'Simulate torn diaphragm'}
      </button>
      <p className="muted">
        Healthy, the diaphragm holds ~100 mbar of crankcase depression. Torn, manifold vacuum pulls straight
        through — whistle, hunting idle, oil-cap suction, oil pushed past the seals.
      </p>
    </section>
  )
}

function FlapControls() {
  const flapsOpen = useAppStore((s) => s.flapsOpen)
  const toggleFlaps = useAppStore((s) => s.toggleFlaps)
  const p2015 = useAppStore((s) => s.p2015)
  const toggleP2015 = useAppStore((s) => s.toggleP2015)
  return (
    <section className="block">
      <h4>Runner-flap demo</h4>
      <div className="btn-row">
        <button type="button" className={`btn${flapsOpen ? ' is-on' : ''}`} onClick={toggleFlaps} aria-pressed={flapsOpen} disabled={p2015}>
          {p2015 ? 'Flaps not responding…' : flapsOpen ? 'Commanded: open (~99%)' : 'Commanded: closed (0%)'}
        </button>
        <button type="button" className={`btn btn--fault${p2015 ? ' is-on' : ''}`} onClick={toggleP2015} aria-pressed={p2015}>
          {p2015 ? 'P2015 active — clear' : 'Simulate P2015'}
        </button>
      </div>
      <p className="muted">
        Healthy flaps track the V157's command. The fault jams them mid-travel so the G336 reading no longer
        matches — what VCDS measuring block 142 exposes.
      </p>
    </section>
  )
}

/* ── the Part tab ──────────────────────────────────────────────────────── */

function TitleBlock({ part }: { part: PartRecord }) {
  const focusOn = useAppStore((s) => s.focusOn)
  const toggleIsolate = useAppStore((s) => s.toggleIsolate)
  const clearIsolation = useAppStore((s) => s.clearIsolation)
  const isolatedThis = useAppStore((s) => !!s.isolated[part.id])
  const assemblyNode = `${part.system}/${part.assembly}`
  const isolatedAssembly = useAppStore((s) => !!s.isolated[assemblyNode])
  const isolationActive = useAppStore((s) => Object.keys(s.isolated).length > 0)
  const sys = systemDef(part.system)
  const prov = provenance(part)

  return (
    <>
      <div className="tb-head">
        <span className="tb-callout">{part.callout}</span>
        <div>
          <h2>{part.name}</h2>
          <div className="tb-sys">
            <span className="crumb-swatch" style={{ background: sys.color }} />
            {sys.name}
          </div>
        </div>
      </div>

      <table className="spec">
        <tbody>
          <tr>
            <th>Part no.</th>
            <td className={part.oemPartNumber ? 'mono' : 'muted'}>{part.oemPartNumber ?? 'not verified'}</td>
            <th>Qty</th>
            <td>{part.transforms.length}</td>
          </tr>
          <tr>
            <th>Torque</th>
            <td>{part.torqueSpec ? formatTorque(part.torqueSpec) : '—'}</td>
            <th>Material</th>
            <td>{part.material ?? '—'}</td>
          </tr>
          {/* hero meshes carry no meaningful placement of their own */}
          {!part.tags.includes('glb') && (
            <tr>
              <th>Where</th>
              <td colSpan={3}>{describeLocation(part)}</td>
            </tr>
          )}
          <tr>
            <th>Source</th>
            <td colSpan={3}>
              <span className={`tag tag--${prov.tone}`}>{prov.label}</span>
            </td>
          </tr>
        </tbody>
      </table>
      {part.torqueSpec?.note && <p className="note">{part.torqueSpec.note}</p>}

      <div className="btn-row">
        <button type="button" className="btn" onClick={() => focusOn(partWorldPosition(part), partWorldDirection(part))}>
          Fly to
        </button>
        <button type="button" className={`btn${isolatedThis ? ' is-on' : ''}`} onClick={() => toggleIsolate(part.id)} aria-pressed={isolatedThis}>
          Isolate
        </button>
        <button type="button" className={`btn${isolatedAssembly ? ' is-on' : ''}`} onClick={() => toggleIsolate(assemblyNode)} aria-pressed={isolatedAssembly}>
          + assembly
        </button>
        {isolationActive && (
          <button type="button" className="btn btn--quiet" onClick={clearIsolation}>
            Show all
          </button>
        )}
      </div>

      {part.tags.includes('avs') && <AvsToggle />}
      {part.tags.includes('p2015') && <FlapControls />}
      {part.tags.includes('PCV') && <PcvControls />}

      {part.knownIssues.length > 0 && (
        <section className="block">
          <h4>Known issues</h4>
          <ul className="issues">
            {part.knownIssues.map((issue) => (
              <li key={issue}>{issue}</li>
            ))}
          </ul>
        </section>
      )}

      <details className="row row--prose">
        <summary>
          <span className="row-title">Notes</span>
          <span className="row-meta">from the research dossier</span>
        </summary>
        <div className="row-body">
          <p>{part.description}</p>
          {part.tags.length > 0 && (
            <div className="tags">
              {part.tags.map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </details>
    </>
  )
}

function EmptyPart() {
  const applyPreset = useAppStore((s) => s.applyPreset)
  const setInspectorTab = useAppStore((s) => s.setInspectorTab)
  const setNavOpen = useAppStore((s) => s.setNavOpen)
  return (
    <div className="empty">
      <p>
        Click any part for its title block, or press <kbd>/</kbd> to find one by name or part number.
      </p>
      <div className="btn-col">
        <button type="button" className="btn" onClick={() => setNavOpen(true)}>
          Browse the parts tree
        </button>
        <button type="button" className="btn" onClick={() => applyPreset('engine')}>
          Look at the engine
        </button>
        <button type="button" className="btn" onClick={() => setInspectorTab('leak')}>
          Open the oil-leak finder
        </button>
      </div>
      <p className="muted">
        Drag to orbit · right-drag or arrow keys to pan · scroll dives toward the cursor · double-click a part
        to fly to it · click a face of the cube for a standard view.
      </p>
    </div>
  )
}

/* ── Service / MOT rows ────────────────────────────────────────────────── */

function ServiceRow({ item, ruleLabel }: { item: ServiceItem; ruleLabel: string }) {
  const setIsolation = useAppStore((s) => s.setIsolation)
  const select = useAppStore((s) => s.select)
  const focusOn = useAppStore((s) => s.focusOn)
  const setInspectorTab = useAppStore((s) => s.setInspectorTab)
  const tab = useAppStore((s) => s.inspectorTab)

  const showMe = (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (item.showTargets.length === 0) return
    setIsolation(item.showTargets)
    if (item.focusPartId) {
      const part = partById(item.focusPartId)
      if (part) {
        // select() flips to the Part tab; stay on the list the user is reading
        select(part.id)
        setInspectorTab(tab)
        focusOn(partWorldPosition(part), partWorldDirection(part))
      }
    }
  }

  return (
    <details className="row">
      <summary>
        <span className="row-title">{item.title}</span>
        <span className="row-meta">{item.interval}</span>
        {item.showTargets.length > 0 && (
          <button type="button" className="btn btn--small" onClick={showMe}>
            Show
          </button>
        )}
      </summary>
      <div className="row-body">
        <table className="spec spec--list">
          <tbody>
            <tr>
              <th>{ruleLabel}</th>
              <td>{item.interval}</td>
            </tr>
            {item.fluid && (
              <tr>
                <th>Fluid / part</th>
                <td className="mono">{item.fluid}</td>
              </tr>
            )}
            {item.capacity && (
              <tr>
                <th>Capacity</th>
                <td>{item.capacity}</td>
              </tr>
            )}
            {item.torque && (
              <tr>
                <th>Torque</th>
                <td>{item.torque}</td>
              </tr>
            )}
          </tbody>
        </table>
        <p>{item.where}</p>
        {item.notes && <p className="callout-note">{item.notes}</p>}
        {item.flags && <p className="flag">⚠ {item.flags}</p>}
      </div>
    </details>
  )
}

function JobRow({ id }: { id: string }) {
  const job = JOBS.find((j) => j.id === id)
  if (!job) return null
  return (
    <details className="row">
      <summary>
        <span className="row-title">{job.title}</span>
        <span className="row-meta">{job.difficulty}</span>
        <button
          type="button"
          className="btn btn--small btn--primary"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            startJob(job.id)
          }}
        >
          Start
        </button>
      </summary>
      <div className="row-body">
        <p>{job.blurb}</p>
        <table className="spec spec--list">
          <tbody>
            <tr>
              <th>Difficulty</th>
              <td>{job.difficulty}</td>
            </tr>
            <tr>
              <th>You need</th>
              <td>{job.tools}</td>
            </tr>
            <tr>
              <th>Steps</th>
              <td>{job.steps.length}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </details>
  )
}

/* ── the panel ─────────────────────────────────────────────────────────── */

const INTRO: Record<InspectorTab, string> = {
  part: '',
  service:
    'Everything routinely serviced, with real numbers. Anything marked as a conflict or unverified must be confirmed in erWin/Bentley before spanner work.',
  mot: 'Work top to bottom the week before the test. "Show" flies the camera to the parts being checked.',
  jobs: 'Each job steps the 3D car through the real procedure — the bonnet opens, the camera moves, parts lift off. Read every step once before touching the car.',
  leak: 'Oil runs downhill and blows back down the block, so where you SEE it is rarely where it comes from. Say where the oil shows up and only the joints that can physically put it there are listed — cheapest checks first.',
}

export function Inspector() {
  const open = useAppStore((s) => s.inspectorOpen)
  const tab = useAppStore((s) => s.inspectorTab)
  const setTab = useAppStore((s) => s.setInspectorTab)
  const setOpen = useAppStore((s) => s.setInspectorOpen)
  const selectedPartId = useAppStore((s) => s.selectedPartId)
  const part = useMemo(() => (selectedPartId ? partById(selectedPartId) : undefined), [selectedPartId])
  if (!open) return null

  return (
    <aside className="inspector" aria-label="Inspector">
      <div className="tabs" role="tablist">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            className={`tab${tab === t.id ? ' is-active' : ''}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
        <button type="button" className="panel-close" aria-label="Close inspector" onClick={() => setOpen(false)}>
          ✕
        </button>
      </div>
      <div className="inspector-body">
        {tab === 'part' && (part ? <TitleBlock part={part} /> : <EmptyPart />)}
        {tab !== 'part' && INTRO[tab] && <p className="intro">{INTRO[tab]}</p>}
        {tab === 'service' && SERVICE_ITEMS.map((i) => <ServiceRow key={i.id} item={i} ruleLabel="Interval" />)}
        {tab === 'mot' && MOT_ITEMS.map((i) => <ServiceRow key={i.id} item={i} ruleLabel="MOT rule" />)}
        {tab === 'jobs' && JOBS.map((j) => <JobRow key={j.id} id={j.id} />)}
        {tab === 'leak' && <LeakFinderTab />}
      </div>
      {ASSEMBLIES.length === 0 && <p className="muted">No data loaded.</p>}
    </aside>
  )
}
