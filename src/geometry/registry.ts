import type { BufferGeometry } from 'three'

/**
 * Recipe registry. A part's `geometryRef` names a recipe here — or a .glb
 * path, which the viewer loads instead. Swapping a recipe for a real mesh
 * is a data change only; this registry is what keeps the viewer
 * geometry-agnostic.
 */

export type GeometryParams = Record<string, number | string>
export type GeometryRecipe = (params: GeometryParams) => BufferGeometry

const recipes = new Map<string, GeometryRecipe>()

export function registerRecipe(name: string, recipe: GeometryRecipe): void {
  // Last registration wins — keeps Vite HMR re-evaluation of the recipe
  // modules from throwing on an already-populated registry.
  recipes.set(name, recipe)
}

export function resolveRecipe(name: string): GeometryRecipe | undefined {
  return recipes.get(name)
}

/** Millimetre param helper with a default. */
export function mm(params: GeometryParams, key: string, fallbackMm: number): number {
  const v = params[key]
  return (typeof v === 'number' && Number.isFinite(v) ? v : fallbackMm) / 1000
}

export function numParam(params: GeometryParams, key: string, fallback: number): number {
  const v = params[key]
  return typeof v === 'number' && Number.isFinite(v) ? v : fallback
}
