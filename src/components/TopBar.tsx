import { CAMERA_PRESETS } from './Viewport'
import { useAppStore } from '../store/useAppStore'

export function TopBar() {
  const preset = useAppStore((s) => s.cameraPreset)
  const applyPreset = useAppStore((s) => s.applyPreset)
  const setTreeDrawerOpen = useAppStore((s) => s.setTreeDrawerOpen)

  return (
    <header className="topbar">
      <button
        type="button"
        className="topbar-menu"
        aria-label="Open component tree"
        onClick={() => setTreeDrawerOpen(true)}
      >
        ☰
      </button>
      <div className="brand">
        <span className="brand-name">R-Explorer</span>
        <span className="brand-sub">Golf R Mk7 · EA888 Gen 3 · CJXB/CJXC</span>
      </div>
      <nav className="preset-bar" aria-label="Camera presets">
        {Object.entries(CAMERA_PRESETS).map(([name, p]) => (
          <button
            key={name}
            type="button"
            className={`preset-btn${preset === name ? ' is-active' : ''}`}
            onClick={() => applyPreset(name)}
          >
            {p.label}
          </button>
        ))}
      </nav>
    </header>
  )
}
