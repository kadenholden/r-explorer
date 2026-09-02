import { useEffect, useMemo, useRef, useState } from 'react'
import type { PartRecord } from '../types/parts'
import { ALL_PARTS, ASSEMBLIES, partNodePath, partWorldDirection, partWorldPosition } from '../data/loader'
import { useAppStore } from '../store/useAppStore'

/** Find-a-part box: type a name, part number, tag or assembly and jump to
 *  it. The fastest route into a 278-part model. */

const assemblyName = new Map(ASSEMBLIES.map((a) => [a.assembly.id, a.assembly.name]))

function score(p: PartRecord, q: string): number {
  const name = p.name.toLowerCase()
  if (name.startsWith(q)) return 0
  if (name.includes(q)) return 1
  if (p.oemPartNumber?.toLowerCase().includes(q)) return 2
  if (p.id.includes(q)) return 3
  if (p.tags.some((t) => t.toLowerCase().includes(q))) return 4
  if ((assemblyName.get(p.assembly) ?? '').toLowerCase().includes(q)) return 5
  if (p.subAssembly?.toLowerCase().includes(q)) return 5
  return -1
}

export function PartSearch() {
  const [q, setQ] = useState('')
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const boxRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const select = useAppStore((s) => s.select)
  const focusOn = useAppStore((s) => s.focusOn)
  const openAncestors = useAppStore((s) => s.openAncestors)
  const clearIsolation = useAppStore((s) => s.clearIsolation)

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase()
    if (needle.length < 2) return []
    return ALL_PARTS.map((p) => ({ p, s: score(p, needle) }))
      .filter((r) => r.s >= 0)
      .sort((a, b) => a.s - b.s || a.p.name.localeCompare(b.p.name))
      .slice(0, 9)
      .map((r) => r.p)
  }, [q])

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!boxRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  // "/" focuses the search from anywhere, like every tool the operator uses
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== '/' || e.metaKey || e.ctrlKey) return
      const tag = (e.target as HTMLElement | null)?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return
      e.preventDefault()
      inputRef.current?.focus()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const go = (p: PartRecord) => {
    clearIsolation()
    openAncestors(partNodePath(p).slice(0, -1))
    select(p.id)
    focusOn(partWorldPosition(p), partWorldDirection(p))
    setQ('')
    setOpen(false)
    inputRef.current?.blur()
  }

  return (
    <div className="search" ref={boxRef} role="combobox" aria-expanded={open && results.length > 0}>
      <svg className="search-icon" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
        <circle cx="7" cy="7" r="4.6" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <line x1="10.5" y1="10.5" x2="14.5" y2="14.5" stroke="currentColor" strokeWidth="1.6" />
      </svg>
      <input
        ref={inputRef}
        className="search-input"
        type="search"
        placeholder="Find a part…  ( / )"
        value={q}
        aria-label="Find a part"
        onChange={(e) => {
          setQ(e.target.value)
          setOpen(true)
          setActive(0)
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown') {
            e.preventDefault()
            setActive((a) => Math.min(results.length - 1, a + 1))
          } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            setActive((a) => Math.max(0, a - 1))
          } else if (e.key === 'Enter' || e.key === 'Return' || e.keyCode === 13) {
            e.preventDefault()
            const p = results[active]
            if (p) go(p)
          } else if (e.key === 'Escape') {
            setOpen(false)
            inputRef.current?.blur()
          }
        }}
      />
      {open && results.length > 0 && (
        <ul className="search-results" role="listbox">
          {results.map((p, i) => (
            <li key={p.id} role="option" aria-selected={i === active}>
              <button
                type="button"
                className={`search-row${i === active ? ' is-active' : ''}`}
                onMouseEnter={() => setActive(i)}
                onClick={() => go(p)}
              >
                <span className="search-callout">{p.callout}</span>
                <span className="search-name">{p.name}</span>
                <span className="search-meta">
                  {assemblyName.get(p.assembly) ?? p.assembly}
                  {p.oemPartNumber ? ` · ${p.oemPartNumber}` : ''}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
