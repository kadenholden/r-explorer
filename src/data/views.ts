/**
 * Camera views, authored in CAR space (+x = driver's side on this RHD car,
 * +y up, +z = nose). The viewport mirrors x on the way to the camera.
 *
 * Two kinds: the CAD standard views (what the view cube also gives you),
 * and bookmarks — named places on the car worth jumping straight to.
 */

export type Vec3 = [number, number, number]

export interface CameraView {
  label: string
  position: Vec3
  target: Vec3
  kind: 'standard' | 'bookmark'
  /** Short hint shown in the menu. */
  hint?: string
}

// whole-car framing: the shell runs z ≈ +1.45 (nose) … −4.05 (tail)
const C: Vec3 = [0, 0.15, -1.3]

export const VIEWS: Record<string, CameraView> = {
  'front-three-quarter': { label: 'Isometric', position: [3.1, 1.3, 2.9], target: [0, 0.1, -1.0], kind: 'standard' },
  top: { label: 'Top', position: [0.001, 7.6, -1.29], target: C, kind: 'standard' },
  front: { label: 'Front', position: [0, 0.45, 6.6], target: C, kind: 'standard' },
  rear: { label: 'Rear', position: [0, 0.45, -9.2], target: C, kind: 'standard' },
  right: { label: "Driver's side", position: [7.2, 0.5, -1.3], target: C, kind: 'standard', hint: 'offside' },
  left: { label: 'Passenger side', position: [-7.2, 0.5, -1.3], target: C, kind: 'standard', hint: 'nearside' },
  bottom: { label: 'Underside', position: [0.001, -6.5, -1.29], target: C, kind: 'standard' },

  engine: { label: 'Engine', position: [0.7, 0.5, 0.95], target: [0, 0.2, 0], kind: 'bookmark' },
  'engine-top': { label: 'Engine top', position: [0.02, 1.53, 0.06], target: [0, 0.18, 0], kind: 'bookmark' },
  intake: { label: 'Intake', position: [0.55, 0.58, 1.3], target: [0, 0.18, 0.22], kind: 'bookmark' },
  'chain-end': { label: 'Chain end', position: [-0.6, 0.98, 0.55], target: [-0.28, 0.22, 0], kind: 'bookmark' },
  sump: { label: 'Sump', position: [0.72, -0.54, 0.62], target: [0, -0.14, 0], kind: 'bookmark' },
  transmission: { label: 'Gearbox', position: [-0.9, -0.04, 1.05], target: [-0.45, 0.03, 0], kind: 'bookmark' },
  driveline: { label: 'Driveline', position: [2.3, 0.3, -0.2], target: [-0.05, -0.12, -1.5], kind: 'bookmark' },
  'exhaust-line': { label: 'Exhaust', position: [1.9, -0.05, -0.5], target: [0.15, -0.15, -1.9], kind: 'bookmark' },
  suspension: { label: 'Front suspension', position: [1.6, 0.1, 1.15], target: [0.55, -0.08, 0.03], kind: 'bookmark' },
  'brake-corner': { label: 'Brake corner', position: [1.75, 0.38, 0.72], target: [0.95, 0.05, 0.05], kind: 'bookmark' },
  'rear-axle': { label: 'Rear axle', position: [2.3, 0.45, -4.1], target: [0.2, -0.08, -2.55], kind: 'bookmark' },
  cabin: { label: 'Cabin', position: [1.1, 1.7, 0.5], target: [0.15, 0.1, -0.75], kind: 'bookmark' },
}

export const STANDARD_VIEWS = Object.entries(VIEWS).filter(([, v]) => v.kind === 'standard')
export const BOOKMARK_VIEWS = Object.entries(VIEWS).filter(([, v]) => v.kind === 'bookmark')
