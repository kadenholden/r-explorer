import { ASSEMBLIES, partById } from '../data/loader'
import { systemDef } from '../data/taxonomy'
import { useAppStore } from '../store/useAppStore'

/** Where the selected part lives, floating over the viewport. Each segment
 *  opens the navigator at that node. */
export function Breadcrumb() {
  const selectedPartId = useAppStore((s) => s.selectedPartId)
  const openAncestors = useAppStore((s) => s.openAncestors)
  const setNavOpen = useAppStore((s) => s.setNavOpen)
  const part = selectedPartId ? partById(selectedPartId) : undefined
  if (!part) return null
  const sys = systemDef(part.system)
  const assembly = ASSEMBLIES.find((a) => a.assembly.id === part.assembly)?.assembly
  const assemblyNode = `${part.system}/${part.assembly}`

  const open = (nodes: string[]) => {
    openAncestors(nodes)
    setNavOpen(true)
  }

  return (
    <nav className="crumb" aria-label="Part location">
      <button type="button" onClick={() => open([part.system])}>
        <span className="crumb-swatch" style={{ background: sys.color }} />
        {sys.name}
      </button>
      <span className="crumb-sep">›</span>
      <button type="button" onClick={() => open([part.system, assemblyNode])}>
        {assembly?.name ?? part.assembly}
      </button>
      {part.subAssembly && (
        <>
          <span className="crumb-sep">›</span>
          <button type="button" onClick={() => open([part.system, assemblyNode, `${assemblyNode}/${part.subAssembly}`])}>
            {part.subAssembly}
          </button>
        </>
      )}
      <span className="crumb-sep">›</span>
      <span className="crumb-current">
        <span className="crumb-callout">{part.callout}</span>
        {part.name}
      </span>
    </nav>
  )
}
