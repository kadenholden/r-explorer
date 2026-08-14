import { TopBar } from './components/TopBar'
import { TreePanel } from './components/TreePanel'
import { InfoPanel } from './components/InfoPanel'
import { ExplodeControl } from './components/ExplodeControl'
import { Viewport } from './components/Viewport'
import { P2015Overlay } from './components/P2015Overlay'
import { PcvOverlay } from './components/PcvOverlay'
import { ServicePanel } from './components/ServicePanel'
import { HoverTag } from './components/HoverTag'

export default function App() {
  return (
    <div className="app">
      <TopBar />
      <main className="viewport" aria-label="3D viewport">
        <Viewport />
      </main>
      <TreePanel />
      <InfoPanel />
      <ExplodeControl />
      <P2015Overlay />
      <PcvOverlay />
      <ServicePanel />
      <HoverTag />
    </div>
  )
}
