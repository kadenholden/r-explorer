import { useState } from 'react'
import { MOT_ITEMS, SERVICE_ITEMS } from '../data/service'
import { JOBS, startJob } from '../data/jobs'
import type { ServiceItem } from '../data/service'
import { partById, partWorldDirection, partWorldPosition } from '../data/loader'
import { useAppStore } from '../store/useAppStore'

/**
 * The operator's service reference: everything routinely serviced on the
 * car, with fluids, capacities, torques and — the point — a "Show me"
 * button that isolates the involved parts and flies the camera to them.
 */

function ServiceCard({ item, ruleLabel }: { item: ServiceItem; ruleLabel: string }) {
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
        focusOn(partWorldPosition(part), partWorldDirection(part))
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
          <span className="plate-label">{ruleLabel}</span>
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
  const [tab, setTab] = useState<'service' | 'mot' | 'jobs'>('service')
  if (!open) return null

  const items = tab === 'mot' ? MOT_ITEMS : SERVICE_ITEMS
  const ruleLabel = tab === 'service' ? 'Interval' : 'MOT rule'

  return (
    <aside className="service-panel" aria-label="Service and MOT reference">
      <div className="p2015-header">
        <span className="p2015-code">
          {tab === 'service' ? 'SERVICE' : tab === 'mot' ? 'MOT' : 'JOBS'}
        </span>
        <span className="p2015-title">
          {tab === 'service'
            ? 'Everything you routinely service — with real numbers'
            : tab === 'mot'
              ? 'Pre-MOT walk-round — this car\u2019s known weak points included'
              : 'Guided jobs — the 3D car walks you through the work'}
        </span>
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
      <div className="service-tabs" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'service'}
          className={`avs-btn${tab === 'service' ? ' is-large' : ''}`}
          onClick={() => setTab('service')}
        >
          Servicing
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'mot'}
          className={`avs-btn${tab === 'mot' ? ' is-large' : ''}`}
          onClick={() => setTab('mot')}
        >
          Pre-MOT check
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'jobs'}
          className={`avs-btn${tab === 'jobs' ? ' is-large' : ''}`}
          onClick={() => setTab('jobs')}
        >
          Guided jobs
        </button>
      </div>
      <p className="plate-note service-disclaimer">
        {tab === 'service'
          ? 'Values come from the project\u2019s research with sources on each part; anything marked as a conflict or unverified must be confirmed in erWin/Bentley before real spanner work. "Show me" hides everything except the parts involved \u2014 the \u2715 or the "show all" chip brings the car back.'
          : tab === 'mot'
            ? 'Work top to bottom the week before the test \u2014 most of these cost pennies to fix in advance and a retest if the tester finds them first. "Show me" flies the camera to the parts being checked.'
            : 'Each job steps the 3D car through the real procedure \u2014 the bonnet opens, the camera moves, parts lift off as you would lift them. Read every step once before touching the car.'}
      </p>
      <div className="service-list">
        {tab === 'jobs'
          ? JOBS.map((job) => (
              <article key={job.id} className="service-card">
                <div className="service-card-head">
                  <h3>{job.title}</h3>
                  <button
                    type="button"
                    className="avs-btn is-large"
                    onClick={() => {
                      setOpen(false)
                      startJob(job.id)
                    }}
                  >
                    Start ›
                  </button>
                </div>
                <p className="plate-note">{job.blurb}</p>
                <div className="plate-row">
                  <span className="plate-label">Difficulty</span>
                  <span className="plate-value">{job.difficulty}</span>
                </div>
                <div className="plate-row">
                  <span className="plate-label">You need</span>
                  <span className="plate-value">{job.tools}</span>
                </div>
              </article>
            ))
          : items.map((item) => <ServiceCard key={item.id} item={item} ruleLabel={ruleLabel} />)}
      </div>
    </aside>
  )
}
