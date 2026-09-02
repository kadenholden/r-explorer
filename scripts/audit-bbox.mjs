// World-space bounding boxes for every instance in the named assemblies —
// the quick way to prove two parts actually meet (or find a gap).
//
//   node scripts/audit-bbox.mjs driveline-haldex engine-exhaust
import { createServer } from 'vite'
import * as THREE from 'three'

const wanted = process.argv.slice(2)
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
  const v = new THREE.Vector3()
  const f = (n) => n.toFixed(2).padStart(6)
  for (const file of ASSEMBLIES) {
    const a = file.assembly
    if (wanted.length && !wanted.includes(a.id)) continue
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
        const m = mA
          .clone()
          .multiply(
            new THREE.Matrix4().compose(
              new THREE.Vector3(...t.position),
              new THREE.Quaternion().setFromEuler(new THREE.Euler(...t.rotationDeg.map((d) => d * DEG))),
              new THREE.Vector3(1, 1, 1),
            ),
          )
        const b = new THREE.Box3()
        for (let k = 0; k < pos.count; k++) b.expandByPoint(v.set(pos.getX(k), pos.getY(k), pos.getZ(k)).applyMatrix4(m))
        console.log(
          `${a.id.padEnd(18)} ${part.id.padEnd(24)}#${i} x[${f(b.min.x)},${f(b.max.x)}] y[${f(b.min.y)},${f(b.max.y)}] z[${f(b.min.z)},${f(b.max.z)}]`,
        )
      })
      geo.dispose()
    }
  }
} finally {
  await server.close()
}
