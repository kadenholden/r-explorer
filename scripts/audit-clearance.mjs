// Ground-clearance audit: evaluates every procedural part's geometry in
// Node (via Vite SSR so the TS recipes and JSON glob load as in the app),
// transforms each instance's vertices into world space and reports the
// lowest point of every part against the tyre contact patch.
//
//   node scripts/audit-clearance.mjs            # everything under 12 cm
//   node scripts/audit-clearance.mjs 0.2        # everything under 20 cm
//
// Nothing on a real car hangs below the tyres; the Mk7 R's lowest points
// (sump, exhaust boxes, subframes) sit roughly 12–15 cm off the deck.

import { createServer } from 'vite'
import * as THREE from 'three'

const limit = Number(process.argv[2] ?? 0.12)

const server = await createServer({
  configFile: './vite.config.ts',
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
})
try {
  const { resolveRecipe } = await server.ssrLoadModule('/src/geometry/index.ts')
  const { ASSEMBLIES } = await server.ssrLoadModule('/src/data/loader.ts')

  const DEG = Math.PI / 180
  const rows = []
  const v = new THREE.Vector3()

  for (const file of ASSEMBLIES) {
    const a = file.assembly
    const mA = new THREE.Matrix4().compose(
      new THREE.Vector3(...a.origin),
      new THREE.Quaternion().setFromEuler(new THREE.Euler(...a.rotationDeg.map((d) => d * DEG))),
      new THREE.Vector3(1, 1, 1),
    )
    for (const part of file.parts) {
      if (part.geometryRef.endsWith('.glb')) continue
      const recipe = resolveRecipe(part.geometryRef)
      if (!recipe) continue
      const geo = recipe(part.geometryParams ?? {})
      const pos = geo.getAttribute('position')
      part.transforms.forEach((t, i) => {
        const mP = new THREE.Matrix4().compose(
          new THREE.Vector3(...t.position),
          new THREE.Quaternion().setFromEuler(new THREE.Euler(...t.rotationDeg.map((d) => d * DEG))),
          new THREE.Vector3(1, 1, 1),
        )
        const m = mA.clone().multiply(mP)
        let minY = Infinity
        let maxY = -Infinity
        let at = [0, 0, 0]
        for (let k = 0; k < pos.count; k++) {
          v.set(pos.getX(k), pos.getY(k), pos.getZ(k)).applyMatrix4(m)
          if (v.y < minY) {
            minY = v.y
            at = [v.x, v.y, v.z]
          }
          if (v.y > maxY) maxY = v.y
        }
        rows.push({ id: part.id, name: part.name, assembly: a.id, instance: i, minY, maxY, at })
      })
      geo.dispose()
    }
  }

  const tyres = rows.filter((r) => r.id.startsWith('tyres-'))
  const ground = Math.min(...tyres.map((r) => r.minY))
  console.log(`ground (tyre contact patch) y = ${ground.toFixed(4)}\n`)

  const low = rows
    .filter((r) => !r.id.startsWith('tyres-') && !r.id.startsWith('pretoria-') && r.minY - ground < limit)
    .sort((p, q) => p.minY - q.minY)
  console.log(`parts with less than ${(limit * 100).toFixed(0)} cm clearance: ${low.length}\n`)
  for (const r of low) {
    const clr = ((r.minY - ground) * 100).toFixed(1).padStart(6)
    const flag = r.minY < ground ? 'BELOW GROUND' : ''
    console.log(
      `${clr} cm  ${r.id.padEnd(28)} #${r.instance}  lowest at x=${r.at[0].toFixed(2)} z=${r.at[2].toFixed(2)}  (${r.assembly})  ${flag}`,
    )
  }
} finally {
  await server.close()
}
