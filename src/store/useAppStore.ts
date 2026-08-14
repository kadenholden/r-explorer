import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { PartRecord } from '../types/parts'
import { partNodePath } from '../data/loader'

/**
 * App state. Only UI persistence-worthy bits (open tree nodes, last camera
 * preset) survive reloads; everything else is session state.
 */

export type ColorMode = 'real' | 'system'

/** Presets whose cameras sit inside the bodywork; the shell auto-hides for
 *  these and returns for exterior views. */
export const INTERIOR_PRESETS = new Set([
  'engine',
  'intake',
  'engine-top',
  'chain-end',
  'transmission',
  'driveline',
  'exhaust-line',
  'sump',
  'cabin',
  'rear-axle',
  'suspension',
])

interface AppState {
  selectedPartId: string | null
  select: (id: string | null) => void

  /** Part currently under the cursor (drives the hover name tag). */
  hoveredPartId: string | null
  setHoveredPart: (id: string | null) => void

  /** 'real': realistic part colours; 'system': dossier system colour-coding. */
  colorMode: ColorMode
  setColorMode: (mode: ColorMode) => void

  /** Global explode factor, 0..1. */
  explode: number
  setExplode: (v: number) => void

  /** Tree-node visibility; key = node id, true = hidden. */
  hidden: Record<string, boolean>
  toggleHidden: (nodeId: string) => void

  /** Isolate mode: only parts under any of these nodes render (multi-select). */
  isolated: Record<string, boolean>
  toggleIsolate: (nodeId: string) => void
  clearIsolation: () => void
  /** Replace the whole isolation set (used by the service tab's Show me). */
  setIsolation: (nodeIds: string[]) => void

  /** Service reference panel. */
  servicePanelOpen: boolean
  setServicePanelOpen: (open: boolean) => void

  /** Camera focus request: fly the orbit target to a world point,
   *  approaching from an optional world direction (the part's explode
   *  vector — i.e. the side the part is extracted toward). */
  focusPoint: [number, number, number] | null
  focusDir: [number, number, number] | null
  focusNonce: number
  focusOn: (point: [number, number, number], dir?: [number, number, number]) => void

  openNodes: Record<string, boolean>
  toggleOpen: (nodeId: string) => void
  openAncestors: (nodeIds: string[]) => void

  cameraPreset: string
  /** Bumped so re-selecting the current preset still resets the camera. */
  presetNonce: number
  applyPreset: (name: string) => void

  /** Mobile drawer for the tree panel. */
  treeDrawerOpen: boolean
  setTreeDrawerOpen: (open: boolean) => void

  /** AVS demo: false = small-lift lobes, true = large-lift (>~3,100 rpm). */
  avsLargeLobe: boolean
  toggleAvs: () => void

  /** Runner-flap demo: commanded flap state (0% closed ↔ ~99% open). */
  flapsOpen: boolean
  toggleFlaps: () => void
  /** P2015 fault simulation: flaps jam and G336 reads implausible. */
  p2015: boolean
  toggleP2015: () => void

  /** PCV fault simulation: breather diaphragm torn (R13 fault library). */
  pcvTorn: boolean
  togglePcv: () => void

  /** Bonnet open/closed — hinges the real shell hood. */
  bonnetOpen: boolean
  toggleBonnet: () => void

  /** Guided-job mode (jobs.ts drives these). */
  activeJob: string | null
  jobStep: number
  /** Per-part position offsets applied by the current job step. */
  jobLifts: Record<string, [number, number, number]>
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      selectedPartId: null,
      select: (id) => set({ selectedPartId: id }),

      hoveredPartId: null,
      setHoveredPart: (id) => set({ hoveredPartId: id }),

      colorMode: 'real',
      setColorMode: (mode) => set({ colorMode: mode }),

      explode: 0,
      setExplode: (v) => set({ explode: Math.min(1, Math.max(0, v)) }),

      // schematic body panels start hidden — the real shell mesh is the
      // default look; the tree's eye icons swap between them
      hidden: { 'body/body-structure': true, 'body/body-exterior': true },
      toggleHidden: (nodeId) =>
        set((s) => ({ hidden: { ...s.hidden, [nodeId]: !s.hidden[nodeId] } })),

      isolated: {},
      toggleIsolate: (nodeId) =>
        set((s) => {
          const isolated = { ...s.isolated }
          if (isolated[nodeId]) delete isolated[nodeId]
          else isolated[nodeId] = true
          return { isolated }
        }),
      clearIsolation: () => set({ isolated: {} }),
      setIsolation: (nodeIds) =>
        set({ isolated: Object.fromEntries(nodeIds.map((n) => [n, true])) }),

      servicePanelOpen: false,
      setServicePanelOpen: (open) => set({ servicePanelOpen: open }),

      focusPoint: null,
      focusDir: null,
      focusNonce: 0,
      focusOn: (point, dir) =>
        set((s) => ({ focusPoint: point, focusDir: dir ?? null, focusNonce: s.focusNonce + 1 })),

      openNodes: { brakes: true, 'brakes/front-brake-corner': true },
      toggleOpen: (nodeId) =>
        set((s) => ({ openNodes: { ...s.openNodes, [nodeId]: !s.openNodes[nodeId] } })),
      openAncestors: (nodeIds) =>
        set((s) => {
          const openNodes = { ...s.openNodes }
          for (const id of nodeIds) openNodes[id] = true
          return { openNodes }
        }),

      cameraPreset: 'front-three-quarter',
      presetNonce: 0,
      applyPreset: (name) =>
        set((s) => ({
          cameraPreset: name,
          presetNonce: s.presetNonce + 1,
          // interior presets sit inside the bodywork — auto-hide the shell so
          // the view is never a white panel; exterior presets bring it back
          hidden: { ...s.hidden, 'body/body-shell': INTERIOR_PRESETS.has(name) },
        })),

      treeDrawerOpen: false,
      setTreeDrawerOpen: (open) => set({ treeDrawerOpen: open }),

      avsLargeLobe: false,
      toggleAvs: () => set((s) => ({ avsLargeLobe: !s.avsLargeLobe })),

      flapsOpen: false,
      toggleFlaps: () => set((s) => ({ flapsOpen: !s.flapsOpen })),
      p2015: false,
      toggleP2015: () => set((s) => ({ p2015: !s.p2015 })),

      pcvTorn: false,
      togglePcv: () => set((s) => ({ pcvTorn: !s.pcvTorn })),

      bonnetOpen: false,
      toggleBonnet: () => set((s) => ({ bonnetOpen: !s.bonnetOpen })),

      activeJob: null,
      jobStep: 0,
      jobLifts: {},
    }),
    {
      name: 'r-explorer-ui',
      partialize: (s) => ({
        openNodes: s.openNodes,
        cameraPreset: s.cameraPreset,
        colorMode: s.colorMode,
      }),
      // hidden isn't persisted, so re-derive the shell rule for the restored
      // preset — otherwise reloading inside an interior view starts you
      // staring at the inside of a white panel
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.hidden = {
            ...state.hidden,
            'body/body-shell': INTERIOR_PRESETS.has(state.cameraPreset),
          }
        }
      },
    },
  ),
)

/** With isolation active, the isolation set is the whole truth — explicitly
 *  isolated parts show even if their branch is hidden (the MOT/service
 *  cards isolate default-hidden panels like the windscreen). Otherwise a
 *  part renders when neither it nor any ancestor node is hidden. */
export function isPartVisible(
  part: PartRecord,
  hidden: Record<string, boolean>,
  isolated: Record<string, boolean>,
): boolean {
  const path = partNodePath(part)
  if (Object.keys(isolated).length > 0) return path.some((node) => isolated[node])
  return !path.some((node) => hidden[node])
}

export const prefersReducedMotion: boolean =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches
