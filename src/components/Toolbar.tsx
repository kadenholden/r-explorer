import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { BOOKMARK_VIEWS, STANDARD_VIEWS } from '../data/views'
import { useAppStore } from '../store/useAppStore'
import type { InspectorTab } from '../store/useAppStore'
import { PartSearch } from './PartSearch'

/** One dark strip across the top: navigator, brand, search, views, display,
 *  and the inspector's task tabs. Nothing else lives up here. */

function Menu({ label, children }: { label: ReactNode; children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!open) return
    const onDoc = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])
  return (
    <div className={`menu${open ? ' is-open' : ''}`} ref={ref}>
      <button type="button" className="tb-btn" aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        {label} <span className="tb-caret">▾</span>
      </button>
      {open && (
        <div className="menu-pop" role="menu" onClick={() => setOpen(false)}>
          {children}
        </div>
      )}
    </div>
  )
}

export function Toolbar() {
  const preset = useAppStore((s) => s.cameraPreset)
  const applyPreset = useAppStore((s) => s.applyPreset)
  const navOpen = useAppStore((s) => s.navOpen)
  const setNavOpen = useAppStore((s) => s.setNavOpen)
  const colorMode = useAppStore((s) => s.colorMode)
  const setColorMode = useAppStore((s) => s.setColorMode)
  const inspectorTab = useAppStore((s) => s.inspectorTab)
  const inspectorOpen = useAppStore((s) => s.inspectorOpen)
  const setInspectorTab = useAppStore((s) => s.setInspectorTab)
  const setInspectorOpen = useAppStore((s) => s.setInspectorOpen)

  const task = (tab: InspectorTab, label: string) => (
    <button
      type="button"
      className={`tb-btn tb-task${inspectorOpen && inspectorTab === tab ? ' is-active' : ''}`}
      onClick={() => (inspectorOpen && inspectorTab === tab ? setInspectorOpen(false) : setInspectorTab(tab))}
    >
      {label}
    </button>
  )

  return (
    <header className="toolbar">
      <button
        type="button"
        className={`tb-btn tb-icon${navOpen ? ' is-active' : ''}`}
        aria-label="Parts navigator"
        title="Parts navigator"
        onClick={() => setNavOpen(!navOpen)}
      >
        <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
          <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </button>
      <div className="brand">
        <span className="brand-name">R-Explorer</span>
        <span className="brand-sub">Golf R Mk7 · EA888 Gen 3</span>
      </div>

      <PartSearch />

      <div className="tb-group">
        <Menu label="View">
          <div className="menu-title">Standard</div>
          {STANDARD_VIEWS.map(([name, v]) => (
            <button
              key={name}
              type="button"
              role="menuitem"
              className={`menu-item${preset === name ? ' is-active' : ''}`}
              onClick={() => applyPreset(name)}
            >
              {v.label}
              {v.hint && <em>{v.hint}</em>}
            </button>
          ))}
          <div className="menu-title">Go to</div>
          {BOOKMARK_VIEWS.map(([name, v]) => (
            <button
              key={name}
              type="button"
              role="menuitem"
              className={`menu-item${preset === name ? ' is-active' : ''}`}
              onClick={() => applyPreset(name)}
            >
              {v.label}
            </button>
          ))}
        </Menu>
        <div className="seg" role="group" aria-label="Colour mode">
          <button
            type="button"
            className={`seg-btn${colorMode === 'real' ? ' is-active' : ''}`}
            onClick={() => setColorMode('real')}
            title="Realistic part colours"
          >
            Real
          </button>
          <button
            type="button"
            className={`seg-btn${colorMode === 'system' ? ' is-active' : ''}`}
            onClick={() => setColorMode('system')}
            title="Colour by system"
          >
            System
          </button>
        </div>
      </div>

      <div className="tb-spacer" />

      <div className="tb-group tb-tasks">
        {task('part', 'Part')}
        {task('service', 'Service')}
        {task('mot', 'MOT')}
        {task('jobs', 'Jobs')}
        {task('leak', 'Oil leak')}
      </div>
    </header>
  )
}
