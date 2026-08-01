import { TopBar } from './components/TopBar'
import { TreePanel } from './components/TreePanel'
import { InfoPanel } from './components/InfoPanel'
import { ExplodeControl } from './components/ExplodeControl'
import { Viewport } from './components/Viewport'

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
    </div>
  )
}
