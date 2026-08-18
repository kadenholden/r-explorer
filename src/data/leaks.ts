/**
 * Oil-leak finder: the whole oil system as a ranked suspect list.
 *
 * The one idea this encodes is GRAVITY. Oil runs downhill and then blows
 * backwards down the block, so the place you SEE it is almost never the
 * place it comes from — a cam-bridge weep at the very top of the engine
 * arrives at the sump flange, and an oil-filter-housing weep arrives on
 * the bellhousing looking exactly like a rear main seal. So every suspect
 * declares the zones its oil can REACH, and the finder asks where you see
 * it rather than assuming.
 *
 * Ranking is for THIS engine (EA888 Gen 3, ~92k, tuned) from the project
 * research plus the leak-source write-ups in docs/reference/oil-leak-notes.md.
 */

/** Where on the car you can actually see oil. */
export type LeakZone = 'top' | 'chain-end' | 'offside' | 'rear' | 'sump' | 'bellhousing'

export const LEAK_ZONES: { id: LeakZone; label: string; hint: string }[] = [
  { id: 'top', label: 'On top of the engine', hint: 'under the plastic cover, around the coils and cam cover' },
  { id: 'chain-end', label: 'Nearside end of the engine', hint: 'the gearbox/chain end — timing cover face' },
  { id: 'offside', label: 'Driver’s-side end / middle', hint: 'around the filter housing, belt end, dipstick' },
  { id: 'rear', label: 'Back of the engine', hint: 'toward the bulkhead and turbo — often smells burnt' },
  { id: 'sump', label: 'Down at the sump', hint: 'the flange line where the two pans meet, or the drain plug' },
  { id: 'bellhousing', label: 'Where engine meets gearbox', hint: 'or just drips on the driveway with no obvious source' },
]

/** 1 = check first. Ranks are about likelihood × ease of checking, not cost. */
export type LeakRank = 1 | 2 | 3 | 4

/** Opacity and glow fall with likelihood so that visual weight in the 3D
 *  view matches how much attention the joint actually deserves — otherwise
 *  physically big long shots (the head gasket) shout over small certainties. */
export const RANK_META: Record<
  LeakRank,
  { label: string; color: string; opacity: number; glow: number }
> = {
  1: { label: 'Check first', color: '#ff4d4f', opacity: 1, glow: 0.6 },
  2: { label: 'Likely', color: '#ff9f0a', opacity: 0.92, glow: 0.45 },
  3: { label: 'Possible', color: '#ffd60a', opacity: 0.68, glow: 0.3 },
  4: { label: 'Long shot', color: '#5ac8fa', opacity: 0.45, glow: 0.18 },
}

export interface LeakSuspect {
  id: string
  /** Part the camera flies to. */
  partId: string
  /** Shown alongside it — usually the drip path or the part it seals to. */
  alsoShow?: string[]
  rank: LeakRank
  title: string
  /** Zones this suspect's oil can turn up in, gravity included. */
  reaches: LeakZone[]
  /** How to prove it is this one and not the thing above it. */
  tell: string
  fix: string
  cost: string
  /** True for the PCV: it doesn't only leak, it MAKES other things leak. */
  pressuriser?: boolean
}

export const OIL_SUSPECTS: LeakSuspect[] = [
  {
    id: 'leak-pcv',
    partId: 'pcv-module',
    alsoShow: ['breather-hose', 'oil-filler-cap'],
    rank: 1,
    title: 'PCV / oil separator — rule this out before anything else',
    reaches: ['top', 'rear', 'sump', 'bellhousing'],
    pressuriser: true,
    tell:
      'This is not just another leak — a torn diaphragm PRESSURISES the crankcase and pushes oil out past seals that were coping fine, the rear main especially. So a PCV fault can be the true cause of a leak you find somewhere else entirely. The test is free and takes 30 seconds: engine idling, lift the oil filler cap. Light resistance = fine. Strong suction that grabs the cap and drops the idle = torn diaphragm. A whistle from the top of the engine is the same story.',
    fix: 'Bolt-on module swap, 7× T30, no coding — the guided job walks it.',
    cost: '£60–120 part · 45 min · easy',
  },
  {
    id: 'leak-cam-bridge',
    partId: 'valve-cover-pcv',
    alsoShow: ['timing-cover-seals', 'upper-timing-cover'],
    rank: 1,
    title: 'Cam bridge sealant — the classic "valve cover leak"',
    reaches: ['top', 'chain-end', 'sump', 'bellhousing'],
    tell:
      'There is no valve-cover gasket on this engine: the cam bridge is bonded to the head with anaerobic sealant, and heat cycles eventually break that bond. Look along the join between the cam bridge and the head — a wet, oil-stained seam that reappears within days of cleaning is it. Its oil runs forward into the upper timing cover, so oil at the timing cover usually starts HERE.',
    fix: 'Bridge off, both faces cleaned back to bare metal, re-sealed with VW D174003M2 and new one-time-use bolts (8 Nm + 90°).',
    cost: 'Sealant + bolts cheap · half a day · the cams have to stay timed — a big DIY step up',
  },
  {
    id: 'leak-timing-cover',
    partId: 'timing-cover-seals',
    alsoShow: ['upper-timing-cover', 'cam-sensor-g40', 'cam-sensor-g300'],
    rank: 1,
    title: 'Upper timing cover seals',
    reaches: ['chain-end', 'sump', 'bellhousing'],
    tell:
      'Oil down the nearside (gearbox) end of the engine, tracking off the timing cover face. Before you buy anything: clean the cover AND the cam bridge seam above it, run the engine, then look again — if the cover is wet from the top down, the bridge is your fault and the cover is innocent.',
    fix: 'The outer bead and the two cam-adjuster magnet O-rings are sold separately from the cover — you do not need a new cover.',
    cost: 'Seals cheap · 1–2 hr · moderate',
  },
  {
    id: 'leak-filter-housing',
    partId: 'oil-filter-housing-gasket',
    alsoShow: ['oil-filter-housing'],
    rank: 2,
    title: 'Oil filter housing / cooler joint',
    reaches: ['offside', 'sump', 'bellhousing'],
    tell:
      'Full oil-pump pressure sits behind this face, so it does not weep — it runs, and it runs down the back of the block onto the bellhousing. THIS IS THE EXPENSIVE MISDIAGNOSIS: it looks identical to a rear main seal from underneath. Reach down the offside above the alternator and feel the housing-to-block joint; check the filter cap is seated and torqued too (25 Nm, moulded into the cap on your car).',
    fix: 'Housing off, gasket and port O-rings renewed. Also check the cooler side — oil in the coolant or mayonnaise under the filler cap means the cooler itself has failed.',
    cost: 'Gasket set cheap · 2 hr · moderate, reached from above',
  },
  {
    id: 'leak-vacuum-pump',
    partId: 'vacuum-pump',
    rank: 2,
    title: 'Brake vacuum pump gasket',
    reaches: ['offside', 'rear', 'sump', 'bellhousing'],
    tell:
      'Shares engine oil and sits high on the end of the head, so its gasket leak runs down the back of the block — another one that reads as a rear main seal from below. Extra clue that costs nothing: a hard or high brake pedal on the first press after a cold start points at this pump.',
    fix: 'Pump off, new gasket (06H103121J). The pump itself is 06L145100K/M if it is worn out.',
    cost: 'Gasket a few pounds · 1 hr · moderate',
  },
  {
    id: 'leak-turbo-lines',
    partId: 'turbo-oil-lines',
    alsoShow: ['turbo-is38', 'turbo-heat-shield'],
    rank: 2,
    title: 'Turbo oil feed & return lines',
    reaches: ['rear', 'sump'],
    tell:
      'At the back of the engine against the hot side, so this one announces itself by SMELL and smoke before you ever see a drip — hot oil on the turbo housing. Check the feed banjo at the top and the fat return into the block; a blocked return also pushes oil past the turbo seals into the intake (blue smoke on overrun).',
    fix: 'Renew the banjo washers / return gasket. Do not reuse crush washers.',
    cost: 'Seals cheap · 1–2 hr · awkward access behind the engine',
  },
  {
    id: 'leak-sump-joint',
    partId: 'sump-seal-joint',
    alsoShow: ['lower-sump', 'upper-sump', 'sump-bolts'],
    rank: 2,
    title: 'Lower sump joint',
    reaches: ['sump', 'bellhousing'],
    tell:
      'YOUR CAR HAS SHOWN OIL HERE. Before resealing it, prove it is the source and not a catch basin: clean the whole flange line and everything above it, then run the car and look with a torch. Oil sitting in the flange with a dry trail leading UP the block means the sump is only where the drip collects. The lower pan is glass-filled plastic with a rubber gasket — it also cracks on speed bumps, so check for damage while you are under there.',
    fix: 'Pan off, gasket renewed, bolts 8 Nm + 45° staged.',
    cost: 'Gasket cheap · half day · needs the car up and the undertray off',
  },
  {
    id: 'leak-drain-plug',
    partId: 'oil-drain-plug',
    rank: 2,
    title: 'Drain plug (plastic bayonet)',
    reaches: ['sump'],
    tell:
      'Thirty seconds and free: wipe it dry and look again after a run. It is a quarter-turn plastic bayonet with NO crush washer, so a slightly unseated plug or a tired seal drips steadily — and it gets missed because everyone is looking for a gasket.',
    fix: 'New plug (they are a pound or two and single-use in spirit). Quarter-turn to lock — the torque figure is unverified, so do not lever it.',
    cost: 'Pennies · 5 min · easiest thing on this list',
  },
  {
    id: 'leak-rear-main',
    partId: 'rear-main-seal-flange',
    rank: 3,
    title: 'Rear main seal',
    reaches: ['bellhousing'],
    tell:
      'ONLY conclude this after the filter housing, vacuum pump and cam bridge are proven dry — all three drip onto the same spot. The honest test is a clean bellhousing and a UV dye trace, not a glance. If the PCV is torn, fix that FIRST: it can be what blew this seal out, and a new seal behind a bad PCV will just leak again.',
    fix: 'Sealing flange with integrated seal. Gearbox has to come off — this is the job the whole list exists to help you avoid buying by mistake.',
    cost: 'Seal cheap, labour is the whole cost · garage job',
  },
  {
    id: 'leak-front-crank',
    partId: 'front-crank-seal',
    alsoShow: ['timing-front-cover', 'vibration-damper'],
    rank: 3,
    title: 'Front crank seal / front cover',
    reaches: ['offside', 'sump'],
    tell:
      'Oil flung in a fine spray around the belt end — look for oil ON the belt, the pulley and the inside of the wheel arch liner rather than a clean drip. Oil on the accessory belt is its own problem: it destroys the belt.',
    fix: 'Seal renewed with the crank pulley off (the centre bolt is single-use and needs the counter-hold tool T10531).',
    cost: 'Seal cheap · special tools needed · moderate–hard',
  },
  {
    id: 'leak-dipstick',
    partId: 'dipstick-tube',
    rank: 4,
    title: 'Dipstick tube seal',
    reaches: ['offside', 'sump'],
    tell:
      'Push the dipstick fully home and check it is properly seated — a tube O-ring that has hardened weeps a small, oily film down the offside of the block. Also worth confirming the dipstick itself is the right one and not sitting proud.',
    fix: 'O-ring, or the tube if it has cracked.',
    cost: 'Pennies · 15 min · easy',
  },
  {
    id: 'leak-sensor-orings',
    partId: 'oil-level-sensor',
    alsoShow: ['sump-o-ring', 'oil-pressure-valve-n428'],
    rank: 4,
    title: 'Sump sensor & solenoid O-rings',
    reaches: ['sump'],
    tell:
      'The G266 level/temperature sensor and the N428 pressure valve both seal into the sump with O-rings. A weep here puts oil exactly where a sump gasket leak would — feel around the sensor bodies themselves with a clean finger.',
    fix: 'O-rings, with the relevant unit out.',
    cost: 'Pennies · but the sump area has to be accessible',
  },
  {
    id: 'leak-filler-cap',
    partId: 'oil-filler-cap',
    rank: 4,
    title: 'Oil filler cap O-ring',
    reaches: ['top'],
    tell:
      'Trivial but real: a perished cap O-ring lets oil mist out onto the cam cover and gets blamed on the cover seal. Take the cap off and look at the rubber ring — flattened, shiny or cracked means replace it.',
    fix: 'New cap.',
    cost: 'A few pounds · 1 min',
  },
  {
    id: 'leak-head-gasket',
    partId: 'head-gasket',
    rank: 4,
    title: 'Head gasket (external oil weep)',
    reaches: ['offside', 'rear', 'sump'],
    tell:
      'Rare, and it is the last thing on this list for a reason. An external oil weep shows as a stain along the head-to-block joint line itself. If you also have coolant loss, white mayo under the filler cap or pressurised coolant, stop guessing and get a block test done.',
    fix: 'Head off — a serious job with new stretch bolts.',
    cost: 'Garage job',
  },
]

/** Everything oil-wetted, for the "show me the whole oil system" view — the
 *  pump, galleries and pickup can't leak externally but they explain where
 *  the pressure behind every one of these seals comes from. */
export const OIL_SYSTEM_PARTS: string[] = [
  'oil-pump-two-stage',
  'oil-pickup',
  'piston-oil-jets',
  'upper-sump',
  'lower-sump',
  'oil-filter-housing',
  'windage-tray',
  'breather-hose',
  'timing-front-cover',
  'upper-timing-cover',
  ...OIL_SUSPECTS.flatMap((s) => [s.partId, ...(s.alsoShow ?? [])]),
]

/** partId → best (lowest) rank, for the 3D highlight. */
export const LEAK_RANK_BY_PART: Record<string, LeakRank> = (() => {
  const out: Record<string, LeakRank> = {}
  for (const s of OIL_SUSPECTS) {
    const cur = out[s.partId]
    if (cur === undefined || s.rank < cur) out[s.partId] = s.rank
  }
  return out
})()

/** Every part the leak view keeps lit (suspects + the rest of the system). */
export const OIL_SYSTEM_SET: Set<string> = new Set(OIL_SYSTEM_PARTS)

export function suspectsForZone(zone: LeakZone | null): LeakSuspect[] {
  const list = zone ? OIL_SUSPECTS.filter((s) => s.reaches.includes(zone)) : OIL_SUSPECTS
  return [...list].sort((a, b) => a.rank - b.rank)
}
