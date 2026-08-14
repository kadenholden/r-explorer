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
          'Lift the plastic engine cover straight up off its ball mounts. The PCV / oil separator is the plastic module on TOP of the cam cover toward the bulkhead, its turbo breather line leaving the back. Confirm the fault first if you haven’t: engine idling, lift the oil cap — strong suction and an idle change means the diaphragm is torn.',
        isolate: ['pcv-module', 'valve-cover-pcv', 'ignition-coils'],
        focusPartId: 'pcv-module',
        bonnet: true,
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
      'The bottle empties itself overnight? Nine times out of ten it’s the pump grommet — a pennies part behind the arch liner.',
    difficulty: 'Easy · ~40 min · axle stands not required (full lock is enough)',
    tools: 'Torx for arch-liner screws, trim tool, new pump grommet (+ pump if dead), towel',
    steps: [
      {
        title: 'Open the bonnet & find the filler',
        text:
          'The blue-capped filler neck at the front-LEFT (nearside) of the bay is the only visible piece — the bottle itself hides behind the left-front wheel-arch liner. That’s why the leak “can’t be found” from above.',
        bonnet: true,
        shell: true,
        isolate: [],
      },
      {
        title: 'Fill and watch',
        text:
          'Fill the bottle to the brim and immediately look under the left-front (nearside) corner with a torch. Drips within a minute = grommet/pump area or a split neck joint. No drips until you use the washers = a hose joint further along instead.',
        isolate: ['washer-filler-neck', 'washer-bottle', 'washer-pump'],
        focusPartId: 'washer-bottle',
        bonnet: true,
      },
      {
        title: 'Get behind the arch liner',
        text:
          'Steering on FULL RIGHT lock so the left wheel swings clear. Remove the arch-liner screws along the liner’s front half and peel it back — the bottle and pump are right there, ahead of the wheel. (No need to remove the wheel or the whole liner.)',
        isolate: ['washer-bottle', 'washer-pump', 'suspension/wheels-pretoria'],
        focusPartId: 'washer-bottle',
      },
      {
        title: 'Pull the pump & renew the grommet',
        text:
          'Towel underneath — the bottle will empty. Unclip the hose and connector, then pull the pump STRAIGHT out of its rubber grommet by hand (the animation shows the motion). Hook the old grommet out; if it’s hardened or cracked you’ve found the leak. Press the new grommet in, wet the pump spigot with washer fluid, press the pump home.',
        isolate: ['washer-bottle', 'washer-pump'],
        focusPartId: 'washer-pump',
        lifts: { 'washer-pump': [-0.05, -0.03, -0.16] },
      },
      {
        title: 'Refill and prove it',
        text:
          'Hose and connector back on, refill to the brim, and give it five minutes with the torch before the liner goes back — a fixed leak stays bone dry at the grommet. Run the washers to check the spray, then refit the liner screws.',
        isolate: ['washer-filler-neck', 'washer-bottle', 'washer-pump'],
        focusPartId: 'washer-pump',
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
