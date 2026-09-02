import { useAppStore } from '../store/useAppStore'
import { JobOverlay } from './JobOverlay'
import { P2015Overlay } from './P2015Overlay'
import { PcvOverlay } from './PcvOverlay'
import { LeakLegend } from './LeakFinder'

/** One bottom-left slot for whatever is driving the scene right now — a
 *  guided job, a fault demo, or the leak-view key — so cards never stack. */
export function ContextSlot() {
  const activeJob = useAppStore((s) => s.activeJob)
  const p2015 = useAppStore((s) => s.p2015)
  const pcvTorn = useAppStore((s) => s.pcvTorn)
  const leakMode = useAppStore((s) => s.leakMode)

  let card: React.ReactNode = null
  if (activeJob) card = <JobOverlay />
  else if (p2015) card = <P2015Overlay />
  else if (pcvTorn) card = <PcvOverlay />
  else if (leakMode) card = <LeakLegend />
  if (!card) return null
  return <div className="context-slot">{card}</div>
}
