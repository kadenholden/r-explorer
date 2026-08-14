import type {
  AssemblyFile,
  AssemblyMeta,
  ExplodeVector,
  PartRecord,
  PartTransform,
  TorqueSpec,
  Vec3,
} from '../types/parts'
import { isSystemId } from './taxonomy'

/**
 * Loads and validates every assembly file under src/data/parts/.
 * Validation fails loudly with the file and field named, so a typo in a
 * data file can never silently render a wrong model.
 */

const rawFiles = import.meta.glob('./parts/*.json', {
  eager: true,
  import: 'default',
}) as Record<string, unknown>

class DataError extends Error {
  constructor(file: string, message: string) {
    super(`[parts data] ${file}: ${message}`)
  }
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v)
}

function str(file: string, obj: Record<string, unknown>, key: string): string {
  const v = obj[key]
  if (typeof v !== 'string' || v.length === 0)
    throw new DataError(file, `"${key}" must be a non-empty string`)
  return v
}

function strOrNull(file: string, obj: Record<string, unknown>, key: string): string | null {
  const v = obj[key]
  if (v === null || v === undefined) return null
  if (typeof v !== 'string') throw new DataError(file, `"${key}" must be a string or null`)
  return v
}

function num(file: string, obj: Record<string, unknown>, key: string): number {
  const v = obj[key]
  if (typeof v !== 'number' || !Number.isFinite(v))
    throw new DataError(file, `"${key}" must be a finite number`)
  return v
}

function vec3(file: string, value: unknown, label: string): Vec3 {
  if (
    !Array.isArray(value) ||
    value.length !== 3 ||
    !value.every((n) => typeof n === 'number' && Number.isFinite(n))
  )
    throw new DataError(file, `"${label}" must be an array of 3 numbers`)
  return [value[0], value[1], value[2]]
}

function strArray(file: string, obj: Record<string, unknown>, key: string): string[] {
  const v = obj[key]
  if (!Array.isArray(v) || !v.every((s) => typeof s === 'string'))
    throw new DataError(file, `"${key}" must be an array of strings`)
  return v
}

function parseTorque(file: string, value: unknown, partId: string): TorqueSpec | null {
  if (value === null || value === undefined) return null
  if (!isRecord(value)) throw new DataError(file, `${partId}: "torqueSpec" must be object or null`)
  return {
    valueNm: num(file, value, 'valueNm'),
    angle: strOrNull(file, value, 'angle'),
    note: strOrNull(file, value, 'note'),
  }
}

function normalise(v: Vec3): Vec3 {
  const len = Math.hypot(v[0], v[1], v[2])
  if (len === 0) throw new Error('explode direction must be non-zero')
  return [v[0] / len, v[1] / len, v[2] / len]
}

function parseExplode(file: string, value: unknown, partId: string): ExplodeVector {
  if (!isRecord(value)) throw new DataError(file, `${partId}: "explodeVector" must be an object`)
  return {
    direction: normalise(vec3(file, value['direction'], `${partId}.explodeVector.direction`)),
    distance: num(file, value, 'distance'),
  }
}

function parseTransforms(file: string, value: unknown, partId: string): PartTransform[] {
  if (!Array.isArray(value) || value.length === 0)
    throw new DataError(file, `${partId}: "transforms" must be a non-empty array`)
  return value.map((t, i) => {
    if (!isRecord(t)) throw new DataError(file, `${partId}: transforms[${i}] must be an object`)
    return {
      position: vec3(file, t['position'], `${partId}.transforms[${i}].position`),
      rotationDeg: vec3(file, t['rotationDeg'], `${partId}.transforms[${i}].rotationDeg`),
    }
  })
}

function parseGeometryParams(
  file: string,
  value: unknown,
  partId: string,
): Record<string, number | string> | null {
  if (value === null || value === undefined) return null
  if (!isRecord(value))
    throw new DataError(file, `${partId}: "geometryParams" must be object or null`)
  const out: Record<string, number | string> = {}
  for (const [k, v] of Object.entries(value)) {
    if (typeof v !== 'number' && typeof v !== 'string')
      throw new DataError(file, `${partId}: geometryParams.${k} must be number or string`)
    out[k] = v
  }
  return out
}

function parsePart(file: string, value: unknown, meta: AssemblyMeta): PartRecord {
  if (!isRecord(value)) throw new DataError(file, 'each part must be an object')
  const id = str(file, value, 'id')
  const system = str(file, value, 'system')
  if (!isSystemId(system)) throw new DataError(file, `${id}: unknown system "${system}"`)
  const assembly = str(file, value, 'assembly')
  if (assembly !== meta.id)
    throw new DataError(file, `${id}: assembly "${assembly}" must match file assembly "${meta.id}"`)
  const calloutOffsetRaw = value['calloutOffset']
  return {
    id,
    name: str(file, value, 'name'),
    system,
    assembly,
    subAssembly: strOrNull(file, value, 'subAssembly'),
    oemPartNumber: strOrNull(file, value, 'oemPartNumber'),
    description: str(file, value, 'description'),
    material: strOrNull(file, value, 'material'),
    torqueSpec: parseTorque(file, value['torqueSpec'], id),
    knownIssues: strArray(file, value, 'knownIssues'),
    explodeVector: parseExplode(file, value['explodeVector'], id),
    geometryRef: str(file, value, 'geometryRef'),
    tags: strArray(file, value, 'tags'),
    geometryParams: parseGeometryParams(file, value['geometryParams'], id),
    transforms: parseTransforms(file, value['transforms'], id),
    callout: num(file, value, 'callout'),
    calloutOffset:
      calloutOffsetRaw === null || calloutOffsetRaw === undefined
        ? null
        : vec3(file, calloutOffsetRaw, `${id}.calloutOffset`),
    color: strOrNull(file, value, 'color'),
    opacity:
      value['opacity'] === null || value['opacity'] === undefined
        ? null
        : num(file, value, 'opacity'),
  }
}

function parseAssemblyFile(file: string, data: unknown): AssemblyFile {
  if (!isRecord(data)) throw new DataError(file, 'root must be an object')
  const metaRaw = data['assembly']
  if (!isRecord(metaRaw)) throw new DataError(file, '"assembly" metadata object is required')
  const system = str(file, metaRaw, 'system')
  if (!isSystemId(system)) throw new DataError(file, `unknown system "${system}"`)
  const originRaw = metaRaw['origin']
  const rotationRaw = metaRaw['rotationDeg']
  const meta: AssemblyMeta = {
    id: str(file, metaRaw, 'id'),
    name: str(file, metaRaw, 'name'),
    system,
    description: str(file, metaRaw, 'description'),
    origin:
      originRaw === null || originRaw === undefined
        ? [0, 0, 0]
        : vec3(file, originRaw, 'assembly.origin'),
    rotationDeg:
      rotationRaw === null || rotationRaw === undefined
        ? [0, 0, 0]
        : vec3(file, rotationRaw, 'assembly.rotationDeg'),
  }
  const partsRaw = data['parts']
  if (!Array.isArray(partsRaw) || partsRaw.length === 0)
    throw new DataError(file, '"parts" must be a non-empty array')
  const parts = partsRaw.map((p) => parsePart(file, p, meta))

  const ids = new Set<string>()
  const callouts = new Set<number>()
  for (const p of parts) {
    if (ids.has(p.id)) throw new DataError(file, `duplicate part id "${p.id}"`)
    ids.add(p.id)
    if (callouts.has(p.callout))
      throw new DataError(file, `duplicate callout number ${p.callout} (${p.id})`)
    callouts.add(p.callout)
  }
  return { assembly: meta, parts }
}

export const ASSEMBLIES: AssemblyFile[] = Object.entries(rawFiles).map(([file, data]) =>
  parseAssemblyFile(file, data),
)

export const ALL_PARTS: PartRecord[] = ASSEMBLIES.flatMap((a) => a.parts)

const partsById = new Map<string, PartRecord>(ALL_PARTS.map((p) => [p.id, p]))

export function partById(id: string): PartRecord | undefined {
  return partsById.get(id)
}

/** Tree node ids: system → system/assembly → system/assembly/sub → part id. */
export function partNodePath(part: PartRecord): string[] {
  const path = [part.system, `${part.system}/${part.assembly}`]
  if (part.subAssembly) path.push(`${part.system}/${part.assembly}/${part.subAssembly}`)
  path.push(part.id)
  return path
}

/** World position of a part's first placed instance (assembly origin +
 *  yaw-rotated local position — assemblies only ever rotate about Y). */
export function partWorldPosition(part: PartRecord): [number, number, number] {
  const entry = ASSEMBLIES.find((a) => a.assembly.id === part.assembly)
  const tr = part.transforms[0]
  if (!entry || !tr) return [0, 0, 0]
  const { origin, rotationDeg } = entry.assembly
  const ry = ((rotationDeg?.[1] ?? 0) * Math.PI) / 180
  const [x, y, z] = tr.position
  const wx = x * Math.cos(ry) + z * Math.sin(ry)
  const wz = -x * Math.sin(ry) + z * Math.cos(ry)
  return [origin[0] + wx, origin[1] + y, origin[2] + wz]
}
