import { SERVICE_ITEMS } from '../data/service'
import type { ServiceItem } from '../data/service'
import { partById, partWorldPosition } from '../data/loader'
import { useAppStore } from '../store/useAppStore'

/**
 * The operator's service reference: everything routinely serviced on the
 * car, with fluids, capacities, torques and — the point — a "Show me"
 * button that isolates the involved parts and flies the camera to them.
 */

function ServiceCard({ item }: { item: ServiceItem }) {
  const setIsolation = useAppStore((s) => s.setIsolation)
  const select = useAppStore((s) => s.select)
  const focusOn = useAppStore((s) => s.focusOn)

  const showMe = () => {
    if (item.showTargets.length === 0) return
    setIsolation(item.showTargets)
    if (item.focusPartId) {
      const part = partById(item.focusPartId)
      if (part) {
        select(part.id)
        focusOn(partWorldPosition(part))
      }
    }
  }

  return (
    <article className="service-card">
      <div className="service-card-head">
        <h3>{item.title}</h3>
        {item.showTargets.length > 0 && (
          <button type="button" className="avs-btn" onClick={showMe}>
            Show me
          </button>
        )}
      </div>
      <div className="service-rows">
        <div className="plate-row">
          <span className="plate-label">Interval</span>
          <span className="plate-value">{item.interval}</span>
        </div>
        {item.fluid && (
          <div className="plate-row">
            <span className="plate-label">Fluid / part</span>
            <span className="plate-value plate-value--mono">{item.fluid}</span>
          </div>
        )}
        {item.capacity && (
          <div className="plate-row">
            <span className="plate-label">Capacity</span>
            <span className="plate-value">{item.capacity}</span>
          </div>
        )}
        {item.torque && (
          <div className="plate-row">
            <span className="plate-label">Torque</span>
            <span className="plate-value">{item.torque}</span>
          </div>
        )}
      </div>
      <p className="plate-note">{item.where}</p>
      {item.notes && <p className="plate-note service-note-strong">{item.notes}</p>}
      {item.flags && <p className="plate-note service-flag">⚠ {item.flags}</p>}
    </article>
  )
}

export function ServicePanel() {
  const open = useAppStore((s) => s.servicePanelOpen)
  const setOpen = useAppStore((s) => s.setServicePanelOpen)
  const clearIsolation = useAppStore((s) => s.clearIsolation)
  if (!open) return null

  return (
    <aside className="service-panel" aria-label="Service reference">
      <div className="p2015-header">
        <span className="p2015-code">SERVICE</span>
        <span className="p2015-title">Everything you routinely service — with real numbers</span>
        <button
          type="button"
          className="panel-close"
          aria-label="Close service reference"
          onClick={() => {
            clearIsolation()
            setOpen(false)
          }}
        >
          ✕
        </button>
      </div>
      <p className="plate-note service-disclaimer">
        Values come from the project's research with sources on each part; anything marked as a
        conflict or unverified must be confirmed in erWin/Bentley before real spanner work.
        "Show me" hides everything except the parts involved — the ✕ or the "show all" chip
        brings the car back.
      </p>
      <div className="service-list">
        {SERVICE_ITEMS.map((item) => (
          <ServiceCard key={item.id} item={item} />
        ))}
      </div>
    </aside>
  )
}
