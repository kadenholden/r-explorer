import type { SystemId } from '../types/parts'

/**
 * The ten systems of dossier Section 10, in dossier order.
 * This list IS the top level of the hierarchy tree — systems with no data
 * yet still appear, labelled with the phase that will populate them.
 */

export interface SystemDef {
  id: SystemId
  name: string
  /** System colour — parts default to this in the viewport. */
  color: string
  /** Which build phase populates this system. */
  phase: string
}

export const SYSTEMS: SystemDef[] = [
  { id: 'body', name: 'Body & Structure', color: '#7f8b9e', phase: 'Phase 6' },
  { id: 'engine', name: 'Powertrain — Engine', color: '#e0663c', phase: 'Phases 1–2' },
  { id: 'transmission', name: 'Powertrain — Transmission', color: '#d9a13b', phase: 'Phase 3' },
  { id: 'drivetrain', name: 'Drivetrain / AWD', color: '#9a6fd0', phase: 'Phase 4' },
  { id: 'suspension', name: 'Suspension & Steering', color: '#3fbfae', phase: 'Phase 5' },
  { id: 'brakes', name: 'Brakes', color: '#d64f5c', phase: 'Phase 0 · 5' },
  { id: 'electrical', name: 'Electrical & Electronics', color: '#e8c84a', phase: 'Phase 7' },
  { id: 'cooling-hvac', name: 'Cooling / HVAC & Fluids', color: '#5bc8e8', phase: 'Phase 7' },
  { id: 'interior', name: 'Interior', color: '#b08968', phase: 'Phase 7' },
  { id: 'fasteners', name: 'Fasteners & Hardware', color: '#97a1ad', phase: 'Shared library' },
]

const byId = new Map<SystemId, SystemDef>(SYSTEMS.map((s) => [s.id, s]))

export function systemDef(id: SystemId): SystemDef {
  const def = byId.get(id)
  if (!def) throw new Error(`Unknown system id: ${id}`)
  return def
}

export function isSystemId(value: string): value is SystemId {
  return byId.has(value as SystemId)
}
