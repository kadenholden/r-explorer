import { useMemo } from 'react'
import type { PartRecord, TorqueSpec } from '../types/parts'
import { systemDef } from '../data/taxonomy'
import { ASSEMBLIES, partById } from '../data/loader'
import { useAppStore } from '../store/useAppStore'

/** ETKA-plate-style info panel: breadcrumb, callout number, and the part's
 *  full metadata. With nothing selected it introduces the assembly. */

function formatTorque(t: TorqueSpec): string {
  let s = `${t.valueNm} Nm`
  if (t.angle) s += ` ${t.angle}`
  return s
}

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="plate-row">
      <span className="plate-label">{label}</span>
      <span className={`plate-value${mono ? ' plate-value--mono' : ''}`}>{value}</span>
    </div>
  )
}

function AvsToggle() {
  const avsLargeLobe = useAppStore((s) => s.avsLargeLobe)
  const toggleAvs = useAppStore((s) => s.toggleAvs)
  return (
    <div className="avs-toggle">
      <span className="plate-label">AVS lift demo</span>
      <button
        type="button"
        className={`avs-btn${avsLargeLobe ? ' is-large' : ''}`}
        onClick={toggleAvs}
        aria-pressed={avsLargeLobe}
      >
        {avsLargeLobe ? 'Large lobe (>~3,100 rpm)' : 'Small lobe (low rpm)'}
      </button>
      <p className="plate-note">
        Toggling slides the elements axially, exactly what the electromagnetic
        actuators do on the real cam.
      </p>
    </div>
  )
}

function PartPlate({ part }: { part: PartRecord }) {
  const select = useAppStore((s) => s.select)
  const sys = systemDef(part.system)
  const assemblyName =
    ASSEMBLIES.find((a) => a.assembly.id === part.assembly)?.assembly.name ?? part.assembly

  return (
    <section className="info-panel" aria-label="Part details">
      <div className="panel-header">
        <span className="plate-breadcrumb">
          {sys.name} › {assemblyName}
          {part.subAssembly ? ` › ${part.subAssembly}` : ''}
        </span>
        <button type="button" className="panel-close" aria-label="Close part details" onClick={() => select(null)}>
          ✕
        </button>
      </div>
      <div className="plate-title">
        <span className="plate-callout">{part.callout}</span>
        <h2>{part.name}</h2>
      </div>
      <div className="plate-body">
        <Row
          label="OEM part number"
          value={part.oemPartNumber ?? 'not verified — see docs/UNVERIFIED.md'}
          mono={part.oemPartNumber !== null}
        />
        <Row label="Torque" value={part.torqueSpec ? formatTorque(part.torqueSpec) : '—'} />
        {part.torqueSpec?.note && <p className="plate-note">{part.torqueSpec.note}</p>}
        <Row label="Material" value={part.material ?? '—'} />
        <Row label="Quantity" value={`${part.transforms.length}`} />
        <Row label="Geometry" value={part.geometryRef} mono />
        {part.tags.includes('avs') && <AvsToggle />}
        {part.knownIssues.length > 0 && (
          <div className="plate-issues">
            <span className="plate-label">Known issues</span>
            <ul>
              {part.knownIssues.map((issue) => (
                <li key={issue}>{issue}</li>
              ))}
            </ul>
          </div>
        )}
        <p className="plate-description">{part.description}</p>
        {part.tags.length > 0 && (
          <div className="plate-tags">
            {part.tags.map((t) => (
              <span key={t} className="plate-tag">
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export function InfoPanel() {
  const selectedPartId = useAppStore((s) => s.selectedPartId)
  const part = useMemo(
    () => (selectedPartId ? partById(selectedPartId) : undefined),
    [selectedPartId],
  )

  if (part) return <PartPlate part={part} />

  const first = ASSEMBLIES[0]
  if (!first) return null
  return (
    <section className="info-panel info-panel--intro" aria-label="Assembly overview">
      <div className="panel-header">
        <span className="plate-breadcrumb">{systemDef(first.assembly.system).name}</span>
      </div>
      <div className="plate-title">
        <h2>{first.assembly.name}</h2>
      </div>
      <div className="plate-body">
        <p className="plate-description">{first.assembly.description}</p>
        <p className="plate-hint">
          Drag to orbit · scroll to zoom · click any part (or its numbered callout) for its data ·
          pull the EXPLODE slider to take it apart.
        </p>
      </div>
    </section>
  )
}
