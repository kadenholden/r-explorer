import { Toolbar } from './components/Toolbar'
import { Viewport } from './components/Viewport'
import { Navigator } from './components/Navigator'
import { Breadcrumb } from './components/Breadcrumb'
import { Inspector } from './components/Inspector'
import { BottomBar } from './components/BottomBar'
import { ContextSlot } from './components/ContextSlot'
import { HoverTag } from './components/HoverTag'

export default function App() {
  return (
    <div className="app">
      <Toolbar />
      <main className="viewport" aria-label="3D viewport">
        <Viewport />
      </main>
      <Navigator />
      <Breadcrumb />
      <Inspector />
      <ContextSlot />
      <BottomBar />
      <HoverTag />
    </div>
  )
}
