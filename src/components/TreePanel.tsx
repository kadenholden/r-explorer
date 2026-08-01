import { useEffect, useMemo } from 'react'
import type { ReactNode } from 'react'
import type { AssemblyFile, PartRecord } from '../types/parts'
import { SYSTEMS } from '../data/taxonomy'
import { ALL_PARTS, ASSEMBLIES, partById, partNodePath } from '../data/loader'
import { useAppStore } from '../store/useAppStore'

/** Hierarchy tree mirroring dossier Section 10: all ten systems always
 *  listed (empty ones carry their build-phase tag), populated ones expand
 *  system → assembly → sub-assembly → part. */

function EyeIcon({ off }: { off: boolean }) {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
      <path
        d="M1.5 8s2.4-4.2 6.5-4.2S14.5 8 14.5 8 12.1 12.2 8 12.2 1.5 8 1.5 8Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <circle cx="8" cy="8" r="1.9" fill="currentColor" />
      {off && <line x1="2.5" y1="13.5" x2="13.5" y2="2.5" stroke="currentColor" strokeWidth="1.4" />}
    </svg>
  )
}

function IsolateIcon() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
      <circle cx="8" cy="8" r="4.6" fill="none" stroke="currentColor" strokeWidth="1.3" />
      <line x1="8" y1="0.8" x2="8" y2="3.6" stroke="currentColor" strokeWidth="1.3" />
      <line x1="8" y1="12.4" x2="8" y2="15.2" stroke="currentColor" strokeWidth="1.3" />
      <line x1="0.8" y1="8" x2="3.6" y2="8" stroke="currentColor" strokeWidth="1.3" />
      <line x1="12.4" y1="8" x2="15.2" y2="8" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  )
}

interface RowProps {
  nodeId: string
  depth: number
  label: ReactNode
  count?: number
  expandable?: boolean
  selectable?: boolean
  onActivate?: () => void
  isSelected?: boolean
  swatch?: string
}

function TreeRow({ nodeId, depth, label, count, expandable, onActivate, isSelected, swatch }: RowProps) {
  const open = useAppStore((s) => !!s.openNodes[nodeId])
  const toggleOpen = useAppStore((s) => s.toggleOpen)
  const hiddenState = useAppStore((s) => !!s.hidden[nodeId])
  const toggleHidden = useAppStore((s) => s.toggleHidden)
  const isolated = useAppStore((s) => s.isolatedNodeId === nodeId)
  const toggleIsolate = useAppStore((s) => s.toggleIsolate)

  return (
    <div
      className={`tree-row${isSelected ? ' is-selected' : ''}${hiddenState ? ' is-hidden' : ''}`}
      style={{ paddingLeft: `${8 + depth * 14}px` }}
    >
      {expandable ? (
        <button
          type="button"
          className="tree-disclose"
          aria-expanded={open}
          onClick={() => toggleOpen(nodeId)}
        >
          {open ? '▾' : '▸'}
        </button>
      ) : (
        <span className="tree-disclose tree-disclose--leaf" aria-hidden="true" />
      )}
      {swatch && <span className="tree-swatch" style={{ background: swatch }} aria-hidden="true" />}
      <button
        type="button"
        className="tree-label"
        onClick={() => (onActivate ? onActivate() : expandable && toggleOpen(nodeId))}
      >
        {label}
        {typeof count === 'number' && <span className="tree-count">{count}</span>}
      </button>
      <span className="tree-actions">
        <button
          type="button"
          className={`tree-action${isolated ? ' is-active' : ''}`}
          title={isolated ? 'Exit isolate' : 'Isolate'}
          aria-label={isolated ? 'Exit isolate mode' : 'Isolate this branch'}
          onClick={() => toggleIsolate(nodeId)}
        >
          <IsolateIcon />
        </button>
        <button
          type="button"
          className="tree-action"
          title={hiddenState ? 'Show' : 'Hide'}
          aria-label={hiddenState ? 'Show this branch' : 'Hide this branch'}
          onClick={() => toggleHidden(nodeId)}
        >
          <EyeIcon off={hiddenState} />
        </button>
      </span>
    </div>
  )
}

function PartRow({ part, depth }: { part: PartRecord; depth: number }) {
  const isSelected = useAppStore((s) => s.selectedPartId === part.id)
  const select = useAppStore((s) => s.select)
  return (
    <TreeRow
      nodeId={part.id}
      depth={depth}
      isSelected={isSelected}
      onActivate={() => select(part.id)}
      label={
        <>
          <span className="tree-callout">{part.callout}</span> {part.name}
          {part.transforms.length > 1 && (
            <span className="tree-qty">×{part.transforms.length}</span>
          )}
        </>
      }
    />
  )
}

function AssemblyBranch({ file }: { file: AssemblyFile }) {
  const { assembly, parts } = file
  const nodeId = `${assembly.system}/${assembly.id}`
  const open = useAppStore((s) => !!s.openNodes[nodeId])

  const groups = useMemo(() => {
    const subs = new Map<string, PartRecord[]>()
    const direct: PartRecord[] = []
    for (const p of parts) {
      if (p.subAssembly) {
        const list = subs.get(p.subAssembly) ?? []
        list.push(p)
        subs.set(p.subAssembly, list)
      } else direct.push(p)
    }
    return { subs, direct }
  }, [parts])

  return (
    <>
      <TreeRow nodeId={nodeId} depth={1} label={assembly.name} count={parts.length} expandable />
      {open && (
        <>
          {groups.direct.map((p) => (
            <PartRow key={p.id} part={p} depth={2} />
          ))}
          {[...groups.subs.entries()].map(([sub, subParts]) => (
            <SubBranch key={sub} nodeId={`${nodeId}/${sub}`} name={sub} parts={subParts} />
          ))}
        </>
      )}
    </>
  )
}

function SubBranch({ nodeId, name, parts }: { nodeId: string; name: string; parts: PartRecord[] }) {
  const open = useAppStore((s) => !!s.openNodes[nodeId])
  return (
    <>
      <TreeRow nodeId={nodeId} depth={2} label={name} count={parts.length} expandable />
      {open && parts.map((p) => <PartRow key={p.id} part={p} depth={3} />)}
    </>
  )
}

export function TreePanel() {
  const drawerOpen = useAppStore((s) => s.treeDrawerOpen)
  const setDrawerOpen = useAppStore((s) => s.setTreeDrawerOpen)
  const selectedPartId = useAppStore((s) => s.selectedPartId)
  const openAncestors = useAppStore((s) => s.openAncestors)

  // Selecting a part (from the viewport or search-to-come) reveals it here.
  useEffect(() => {
    if (!selectedPartId) return
    const part = partById(selectedPartId)
    if (part) openAncestors(partNodePath(part).slice(0, -1))
  }, [selectedPartId, openAncestors])

  const bySystem = useMemo(() => {
    const map = new Map<string, AssemblyFile[]>()
    for (const a of ASSEMBLIES) {
      const list = map.get(a.assembly.system) ?? []
      list.push(a)
      map.set(a.assembly.system, list)
    }
    return map
  }, [])

  return (
    <aside className={`tree-panel${drawerOpen ? ' is-open' : ''}`} aria-label="Component hierarchy">
      <div className="panel-header">
        <span>Components</span>
        <span className="panel-header-meta">{ALL_PARTS.length} parts</span>
        <button
          type="button"
          className="panel-close"
          aria-label="Close component tree"
          onClick={() => setDrawerOpen(false)}
        >
          ✕
        </button>
      </div>
      <div className="tree-scroll">
        {SYSTEMS.map((sys) => {
          const assemblies = bySystem.get(sys.id) ?? []
          if (assemblies.length === 0) {
            return (
              <div key={sys.id} className="tree-row tree-row--empty" style={{ paddingLeft: '8px' }}>
                <span className="tree-disclose tree-disclose--leaf" aria-hidden="true" />
                <span className="tree-swatch" style={{ background: sys.color }} aria-hidden="true" />
                <span className="tree-label tree-label--muted">
                  {sys.name}
                  <span className="tree-phase">{sys.phase}</span>
                </span>
              </div>
            )
          }
          return (
            <SystemBranch key={sys.id} systemId={sys.id} name={sys.name} color={sys.color} assemblies={assemblies} />
          )
        })}
      </div>
    </aside>
  )
}

function SystemBranch({
  systemId,
  name,
  color,
  assemblies,
}: {
  systemId: string
  name: string
  color: string
  assemblies: AssemblyFile[]
}) {
  const open = useAppStore((s) => !!s.openNodes[systemId])
  const count = assemblies.reduce((n, a) => n + a.parts.length, 0)
  return (
    <>
      <TreeRow nodeId={systemId} depth={0} label={name} count={count} expandable swatch={color} />
      {open && assemblies.map((a) => <AssemblyBranch key={a.assembly.id} file={a} />)}
    </>
  )
}
