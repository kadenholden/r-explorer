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
