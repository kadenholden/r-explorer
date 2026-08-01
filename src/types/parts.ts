/**
 * The part-record schema — the single source of truth the viewer renders.
 * Mirrors the kickoff brief exactly, plus render-only fields (`transforms`,
 * `color`, `callout`, `calloutOffset`, `geometryParams`) that place and
 * style parts in the scene. Data lives in src/data/parts/*.json, one file
 * per assembly.
 */

export type SystemId =
  | 'body'
  | 'engine'
  | 'transmission'
  | 'drivetrain'
  | 'suspension'
  | 'brakes'
  | 'electrical'
  | 'cooling-hvac'
  | 'interior'
  | 'fasteners'

export type Vec3 = [number, number, number]

export interface TorqueSpec {
  /** Newton-metres. Dossier value only — never guessed. */
  valueNm: number
  /** Optional angle stage, e.g. "+90°" for torque-to-yield fasteners. */
  angle: string | null
  /** Caveats, e.g. "indicative — verify against Bentley/erWin". */
  note: string | null
}

export interface ExplodeVector {
  /** Direction the part travels when exploded (normalised at load). */
  direction: Vec3
  /** Full travel distance in metres at explode = 1. */
  distance: number
}

export interface PartTransform {
  /** Resting position in assembly space, metres. */
  position: Vec3
  /** Euler rotation in degrees, XYZ order. */
  rotationDeg: Vec3
}

export interface PartRecord {
  id: string
  name: string
  system: SystemId
  assembly: string
  subAssembly: string | null
  /** OEM number from the dossier, or null + an entry in docs/UNVERIFIED.md. */
  oemPartNumber: string | null
  description: string
  material: string | null
  torqueSpec: TorqueSpec | null
  knownIssues: string[]
  explodeVector: ExplodeVector
  /** Procedural recipe name, or a path ending in .glb under public/. */
  geometryRef: string
  tags: string[]
  /** Parameters passed to the procedural recipe (dimensions in mm, etc.). */
  geometryParams: Record<string, number | string> | null
  /** One entry per physical instance (e.g. a bolt fitted twice). */
  transforms: PartTransform[]
  /** ETKA-style index number, unique within the assembly. */
  callout: number
  /** Where the callout label sits relative to the part, metres. */
  calloutOffset: Vec3 | null
  /** Render hint overriding the system colour (e.g. the blue caliper). */
  color: string | null
}

export interface AssemblyMeta {
  id: string
  name: string
  system: SystemId
  description: string
}

export interface AssemblyFile {
  assembly: AssemblyMeta
  parts: PartRecord[]
}
