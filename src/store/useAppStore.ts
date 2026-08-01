import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { PartRecord } from '../types/parts'
import { partNodePath } from '../data/loader'

/**
 * App state. Only UI persistence-worthy bits (open tree nodes, last camera
 * preset) survive reloads; everything else is session state.
 */

export type ColorMode = 'real' | 'system'

interface AppState {
  selectedPartId: string | null
  select: (id: string | null) => void

  /** 'real': realistic part colours; 'system': dossier system colour-coding. */
  colorMode: ColorMode
  setColorMode: (mode: ColorMode) => void

  /** Global explode factor, 0..1. */
  explode: number
  setExplode: (v: number) => void

  /** Tree-node visibility; key = node id, true = hidden. */
  hidden: Record<string, boolean>
  toggleHidden: (nodeId: string) => void

  /** Isolate mode: only parts under this node render. */
  isolatedNodeId: string | null
  toggleIsolate: (nodeId: string) => void

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
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      selectedPartId: null,
      select: (id) => set({ selectedPartId: id }),

      colorMode: 'real',
      setColorMode: (mode) => set({ colorMode: mode }),

      explode: 0,
      setExplode: (v) => set({ explode: Math.min(1, Math.max(0, v)) }),

      hidden: {},
      toggleHidden: (nodeId) =>
        set((s) => ({ hidden: { ...s.hidden, [nodeId]: !s.hidden[nodeId] } })),

      isolatedNodeId: null,
      toggleIsolate: (nodeId) =>
        set((s) => ({ isolatedNodeId: s.isolatedNodeId === nodeId ? null : nodeId })),

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
        set((s) => ({ cameraPreset: name, presetNonce: s.presetNonce + 1 })),

      treeDrawerOpen: false,
      setTreeDrawerOpen: (open) => set({ treeDrawerOpen: open }),
    }),
    {
      name: 'r-explorer-ui',
      partialize: (s) => ({
        openNodes: s.openNodes,
        cameraPreset: s.cameraPreset,
        colorMode: s.colorMode,
      }),
    },
  ),
)

/** A part renders when neither it nor any ancestor node is hidden, and it
 *  falls under the isolated node (if isolate mode is active). */
export function isPartVisible(
  part: PartRecord,
  hidden: Record<string, boolean>,
  isolatedNodeId: string | null,
): boolean {
  const path = partNodePath(part)
  if (path.some((node) => hidden[node])) return false
  if (isolatedNodeId === null) return true
  return path.includes(isolatedNodeId)
}

export const prefersReducedMotion: boolean =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches
