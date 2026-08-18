import { partById, partWorldDirection, partWorldPosition } from './loader'
import { useAppStore } from '../store/useAppStore'

/**
 * Guided jobs: step-by-step DIY procedures where each step drives the 3D
 * scene — isolation, camera, the bonnet, and per-part "lift" animations —
 * so the operator can visualise the real job before touching the car.
 * Torque/drive-size caveats stay honest: unverified values say so.
 */

export interface JobStep {
  title: string
  text: string
  /** Isolation set for this step (empty array = show the whole car). */
  isolate?: string[]
  focusPartId?: string
  bonnet?: boolean
  /** Per-part position offsets animated while this step is active. */
  lifts?: Record<string, [number, number, number]>
  /** Show the body shell this step (default: hidden while isolating). */
  shell?: boolean
}

export interface Job {
  id: string
  title: string
  blurb: string
  difficulty: string
  tools: string
  steps: JobStep[]
}

export const JOBS: Job[] = [
  {
    id: 'find-oil-leak',
    title: 'Find where the oil is actually leaking from',
    blurb:
      'Six steps that stop you buying the wrong part. Oil runs downhill and blows backwards, so the wet patch is almost never the source — this is how you prove it.',
    difficulty: 'Easy · an evening plus a drive · no dismantling',
    tools:
      'Brake cleaner or degreaser + rags, a good torch, ramps or stands to get underneath, optional UV dye kit and blacklight (~£15)',
    steps: [
      {
        title: 'Do the free test first',
        text:
          'Before anything else, rule the PCV in or out — a torn diaphragm pressurises the crankcase and pushes oil past seals that were coping, so it can be the real cause of a leak you find somewhere else entirely. Engine idling, lift the oil filler cap. Light resistance is normal. Strong suction that grabs the cap and drops the idle, or a whistle from the top of the engine, means the diaphragm has gone — fix that BEFORE chasing anything below.',
        isolate: ['pcv-module', 'oil-filler-cap', 'breather-hose'],
        focusPartId: 'pcv-module',
        bonnet: true,
      },
      {
        title: 'Clean everything — properly',
        text:
          'You cannot find a leak in a dirty engine bay, and this is the step everyone skips. Degrease the whole top of the engine, both ends, the back of the block and the sump flange, then get underneath and clean the bellhousing area too. Take the undertray off while you are there. Dry it all with rags. What you want at the end is bare, dry metal everywhere oil could appear.',
        isolate: [],
        shell: true,
        bonnet: true,
      },
      {
        title: 'Drive it, then look from the TOP down',
        text:
          'A 20-minute drive to get everything hot and pressurised, then park up and go straight at it with a torch. Look from the top down, not the bottom up: find the HIGHEST wet point, because everything below it is just the trail. Photograph what you find — fresh oil on clean metal is unmistakable a day later, and you will want the comparison.',
        isolate: [],
        shell: false,
        bonnet: true,
        focusPartId: 'valve-cover-pcv',
      },
      {
        title: 'Still not obvious? Use dye',
        text:
          'If the whole side of the block is misted rather than showing one trail, add UV dye to the oil, drive it 100–200 miles, then go over it in the dark with a blacklight. The dye glows at the exact joint it escapes from and nowhere else. This is what a garage would charge you a diagnostic hour for, and the kit costs less than that.',
        isolate: [],
        shell: false,
        bonnet: true,
      },
      {
        title: 'Work the top-end suspects',
        text:
          'On this engine the top-end candidates in order are: the cam bridge sealant seam (there is no valve-cover gasket — it is sealed with anaerobic compound), the upper timing cover seals at the gearbox end, the oil filter housing joint on the driver’s side, and the vacuum pump gasket on the end of the head. Feel each joint with a clean finger and look at the metal directly BELOW it. Oil at the timing cover very often starts at the cam bridge above it.',
        isolate: [
          'valve-cover-pcv',
          'timing-cover-seals',
          'upper-timing-cover',
          'oil-filter-housing-gasket',
          'oil-filter-housing',
          'vacuum-pump',
        ],
        focusPartId: 'timing-cover-seals',
        bonnet: true,
      },
      {
        title: 'Only now think about the rear main seal',
        text:
          'Oil on the bellhousing is what makes people fear the worst — but the filter housing, the vacuum pump and the cam bridge all drip onto exactly that spot from above, and all three are a fraction of the cost. Only call it a rear main seal when those three are proven bone dry after a clean-and-drive cycle. And if the PCV was torn, fix that first: a new seal behind a bad PCV will leak again.',
        isolate: ['rear-main-seal-flange', 'oil-filter-housing-gasket', 'vacuum-pump', 'valve-cover-pcv'],
        focusPartId: 'rear-main-seal-flange',
        bonnet: true,
      },
    ],
  },
  {
    id: 'pcv-change',
    title: 'Replace the PCV / oil-separator module',
    blurb:
      'The classic Gen 3 breather fix — and this car’s live leak suspect. A bolt-on module swap, no coding needed.',
    difficulty: 'Easy–moderate · ~45 min · engine COLD',
    tools: 'T30 Torx (7 screws — FCP Euro-verified), new module 06K103495BL/BM (seal included), gloves',
    steps: [
      {
        title: 'Open the bonnet',
        text:
          'Engine cold. Pull the release under the dash (driver’s side), lift the safety catch under the bonnet lip, and prop it. You’re working at the TOP-REAR of the engine — no jacking, no crawling.',
        bonnet: true,
        shell: true,
        isolate: [],
      },
      {
        title: 'Find the module',
        text:
          'Lift the plastic engine cover straight up off its ball mounts. The PCV / oil separator is the round black diaphragm dome sitting mid-way along the top of the cam cover — the four ignition coils in a row behind it, the fuel pump to its right, the oil-filler cap to its left; its breather line runs back toward the turbo. Confirm the fault first if you haven’t: engine idling, lift the oil cap — strong suction and an idle change means the diaphragm is torn.',
        isolate: ['pcv-module', 'valve-cover-pcv', 'ignition-coils', 'engine-cover'],
        focusPartId: 'pcv-module',
        bonnet: true,
        lifts: { 'engine-cover': [0, 0.32, 0.16] },
      },
      {
        title: 'Disconnect the breather hose',
        text:
          'Squeeze the quick-connect tabs on the hose at the module’s stub and pull it off. If there’s an electrical connector on your revision, unclip it too. Stuff a clean rag in the hose end — nothing falls into an engine that a rag is guarding.',
        isolate: ['pcv-module'],
        focusPartId: 'pcv-module',
        bonnet: true,
      },
      {
        title: 'Remove the screws',
        text:
          'Undo the seven T30 screws working diagonally, a turn at a time, so the module lifts square. Keep them in order; they’re short and identical, but habits like this save engines.',
        isolate: ['pcv-module', 'valve-cover-pcv'],
        focusPartId: 'pcv-module',
        bonnet: true,
      },
      {
        title: 'Lift the old module off',
        text:
          'It lifts straight up — the animation shows the motion. The old seal comes with it; note how much oil sits in the separator galleries (a lot = the diaphragm has been passing oil a while). Do NOT reuse the seal.',
        isolate: ['pcv-module', 'valve-cover-pcv'],
        focusPartId: 'pcv-module',
        bonnet: true,
        lifts: { 'pcv-module': [0, 0.18, 0.04] },
      },
      {
        title: 'Clean and fit the new one',
        text:
          'Wipe the cam-cover mating face spotless — no old seal fragments, no oil film. Set the new module (06K103495BL/BM, seal pre-fitted) down square, then run the screws in diagonally in stages to snug — M6-class small; exact figure unpublished, so firm-hand-tight with a short driver, never gorilla torque into aluminium.',
        isolate: ['pcv-module', 'valve-cover-pcv'],
        focusPartId: 'pcv-module',
        bonnet: true,
        lifts: { 'pcv-module': [0, 0.06, 0.01] },
      },
      {
        title: 'Reconnect and test',
        text:
          'Hose back on until it clicks, connector on, rag out, bonnet down. Start it: the whistle should be gone and the idle steady. Repeat the oil-cap test — gentle pull now, not a vacuum grab. If a leak persists after this, the next suspect is the cam-bridge sealant (a bigger job — see the part’s notes).',
        isolate: [],
        shell: true,
        focusPartId: 'pcv-module',
        bonnet: false,
      },
    ],
  },
  {
    id: 'screenwash-leak',
    title: 'Trace & fix a screen-wash leak',
    blurb:
      'Bottle empties itself? On the Mk7 it is almost always a pump grommet — a pennies part. The tank is two pieces and hides behind the offside arch liner.',
    difficulty: 'Easy–moderate · ~1 hr · front wheel off',
    tools:
      'Jack + axle stand, 17mm socket for the wheel, T25 Torx for the liner, spare trim clips, new pump grommet(s) (+ pump if dead), towel, torch',
    steps: [
      {
        title: 'Understand what you are dealing with',
        text:
          'The Mk7 reservoir is TWO tanks: the small upper one in the offside gutter of the bay (the blue cap sits straight on top of it — you pour right in), and the big lower one hidden behind the RIGHT-front wheel-arch liner. Because this car has xenons it also has headlamp washers, so there are TWO pumps on that lower tank: V59 for the windscreen AND rear screen, and the high-pressure V11 for the headlamp jets.',
        bonnet: true,
        shell: true,
        isolate: [],
      },
      {
        title: 'Fill it and watch where it runs',
        text:
          'Fill to the brim and look under the offside front corner with a torch straight away. Drips within a minute = pump grommet, level-sender seal or a cracked tank. Nothing until you USE the washers = a hose joint or a jet. Leak only when brim-full = the upper-to-lower throat joint. Decide which it is now — it sets how far you strip.',
        isolate: ['washer-filler-neck', 'washer-bottle', 'washer-pump', 'washer-pump-headlight', 'washer-level-sender'],
        focusPartId: 'washer-bottle',
        bonnet: true,
      },
      {
        title: 'Get the wheel and liner out of the way',
        text:
          'Chock the rears, loosen the offside front wheel bolts, jack and support the car on a stand, wheel off. The arch-liner fixings are T25 Torx plus clips — take out the front half and fold the liner back. No need to remove the bumper: that is VW’s route for swapping the whole reservoir, not for pumps and seals.',
        isolate: ['washer-bottle', 'washer-pump', 'washer-pump-headlight', 'washer-level-sender', 'suspension/wheels-pretoria'],
        focusPartId: 'washer-bottle',
      },
      {
        title: 'Identify the three fittings on the tank',
        text:
          'With the liner folded back you are looking at the lower tank. Low down: the windscreen/rear pump V59 with two colour-coded hoses. Just above it: the level sender G33. On the far (wing) side: the headlamp pump V11. Wipe everything dry, then have someone work the washers — the wet one is your culprit.',
        isolate: ['washer-bottle', 'washer-pump', 'washer-pump-headlight', 'washer-level-sender'],
        focusPartId: 'washer-pump',
      },
      {
        title: 'Pull the pump and renew its grommet',
        text:
          'Towel underneath — what is left in the tank will come out. Note which colour hose is on which outlet, unclip both and the plug, then pull the pump STRAIGHT out of its rubber grommet by hand (the animation shows the motion). Hook the old grommet out; hardened or split = found it. CRITICAL: do not shove the new grommet into the tank — you cannot fish it back without dropping the whole reservoir. Wet it with washer fluid, seat it, then press the pump home.',
        isolate: ['washer-bottle', 'washer-pump'],
        focusPartId: 'washer-pump',
        lifts: { 'washer-pump': [-0.1, -0.03, -0.12] },
      },
      {
        title: 'Prove it before you close up',
        text:
          'Hoses back on the right way round, plug in, refill to the brim and leave it five minutes with the torch — a fixed leak stays bone dry. Then run the front washers, the rear washer, and (lights on) the headlamp washers, checking the jets pop out and retract. Only then refit the liner, wheel and torque the bolts to 120 Nm.',
        isolate: ['washer-filler-neck', 'washer-bottle', 'washer-pump', 'washer-pump-headlight', 'headlight-washer-jets'],
        focusPartId: 'washer-pump-headlight',
      },
    ],
  },
]

export function jobById(id: string): Job | undefined {
  return JOBS.find((j) => j.id === id)
}

/** Apply a job step's scene effects: isolation, bonnet, shell, camera, lifts. */
export function applyJobStep(job: Job, stepIndex: number): void {
  const step = job.steps[stepIndex]
  if (!step) return
  const state = useAppStore.getState()
  const isolate = step.isolate ?? []
  state.setIsolation(isolate)
  useAppStore.setState((s) => ({
    activeJob: job.id,
    jobStep: stepIndex,
    jobLifts: step.lifts ?? {},
    bonnetOpen: step.bonnet ?? s.bonnetOpen,
    hidden: { ...s.hidden, 'body/body-shell': step.shell ? false : s.hidden['body/body-shell'] ?? false },
  }))
  if (step.focusPartId) {
    const part = partById(step.focusPartId)
    if (part) {
      state.select(part.id)
      state.focusOn(partWorldPosition(part), partWorldDirection(part))
    }
  }
}

export function startJob(jobId: string): void {
  const job = jobById(jobId)
  if (!job) return
  applyJobStep(job, 0)
}

export function stepJob(delta: number): void {
  const s = useAppStore.getState()
  if (!s.activeJob) return
  const job = jobById(s.activeJob)
  if (!job) return
  const next = Math.min(job.steps.length - 1, Math.max(0, s.jobStep + delta))
  applyJobStep(job, next)
}

export function exitJob(): void {
  const s = useAppStore.getState()
  s.clearIsolation()
  useAppStore.setState({ activeJob: null, jobStep: 0, jobLifts: {}, bonnetOpen: false })
}
