import { useEffect, useRef } from 'react'
import { partById } from '../data/loader'
import { useAppStore } from '../store/useAppStore'

/** Cursor-following name tag: tells you what you're pointing at before
 *  you click. Works for schematic and real-mesh parts alike. */
export function HoverTag() {
  const hoveredPartId = useAppStore((s) => s.hoveredPartId)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      const el = ref.current
      if (!el) return
      el.style.transform = `translate(${e.clientX + 14}px, ${e.clientY + 16}px)`
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  const part = hoveredPartId ? partById(hoveredPartId) : undefined
  return (
    <div ref={ref} className={`hover-tag${part ? ' is-visible' : ''}`} aria-hidden="true">
      {part?.name ?? ''}
    </div>
  )
}
