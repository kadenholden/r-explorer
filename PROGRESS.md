# PROGRESS

## Phase 1 — complete (2026-08-01)

**What's done**

- **EA888 Gen 3 engine, short block + head**, as two new data-driven
  assemblies (21 part records, 60 placed instances) populated entirely
  from dossier §2:
  - Short block: closed-deck GJL 250 block with real 82.5 mm bore
    openings in the deck, forged flat-plane crank (five 48 mm mains,
    92.8 mm-stroke throws, pins 1+4/2+3 opposed), cracked-cap 36MnVS4
    rods, 9.3:1 pistons with ring lands and slipper skirts, solenoid
    oil jets, twin counter-rotating balance shafts, main-bearing ladder.
  - Head: AlSi10Mg casting with the integrated exhaust manifold (four
    runners → single turbo flange), 3-layer MLS gasket (bored plate),
    ten TTY head bolts, both cams (intake 30° / exhaust 60° phasing),
    sodium-filled exhaust valves, chrome intake valves, and the chain
    drive at the flywheel end — chain loop, crank sprocket, hydraulic
    tensioner (carrying its notorious failure history as knownIssues),
    plastic guide rails.
  - **AVS animated toggle**: the four sliding cam elements are separable
    parts with small+large lobe sets; selecting any AVS part shows a
    lift toggle in the info panel that slides them axially, as the
    electromagnetic actuators do. Works alongside explode.
- Torques recorded with the dossier's caveats verbatim-in-spirit: head
  bolts 40 Nm +90°+90° (TTY, conflicting published alt noted), ladder
  ~65 Nm +90° (indicative), rod bolts 30 Nm +90° (stretch, replace).
- Viewer: assemblies now carry a world `origin` (brake corner moved
  beside the engine); camera presets reworked (Overview / Engine /
  Engine top / Chain end / Brake corner); mobile fix — tree drawer now
  overlays the info sheet instead of being covered by it.

**Verified this session:** `npm run build` clean; in-browser: engine
renders in both colour modes, explode layers correctly (gasket → pistons
→ head → valvetrain → bolts; chain drive pulls off the flywheel end),
tree shows 28 parts across 3 assemblies with sub-assembly groups, AVS
toggle slides the elements live. (Note for local dev only: the embedded
preview pane sometimes misses the initial size event and shows an empty
canvas until the window resizes — real browsers are unaffected.)

## What's next — Phase 2 (on operator's go)

Intake / fuel / exhaust + the signature P2015 fault mode (dossier §2
intake section): airbox → turbo → intercooler → throttle → plastic
manifold with animated runner flaps, V157 flap motor, G336 sensor
(06K907386D) vs complete manifold (06L133201FP), fault toggle with the
VCDS diagnosis overlay (output test 03, MVB 142). Also: dual-injection
fuel system, IS38 turbo, downpipe-to-quad-tips exhaust.

Deferred/known-polish list: valvetrain followers + lash adjusters not
modelled (noted in AVS/cam descriptions); resting-state part overlap in
the valvetrain is visible at 0% explode (schematic tolerance); search
and x-ray mode still to come; three.js bundle ~1.25 MB (code-split later).

## Open questions

1. **Car spec check (matters from Phase 3):** manual (MQ350) or DSG
   (DQ250)? DCC? 18" Cadiz or 19" Pretoria? 3-door or 5-door?
2. PR flow: Phase 1 is PR #2, stacked on Phase 0's PR #1 — merge #1
   first, then #2.
