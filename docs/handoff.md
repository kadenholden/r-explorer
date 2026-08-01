# Golf R Mk7 3D Explorer — Claude Code Handoff Pack

What to give Claude Code, exactly what to say, and how to run the project over multiple sessions. The kickoff prompt below is paste-ready.

---

## 1. Setup (5 minutes, before you open Claude Code)

1. Create an empty folder, e.g. `r-explorer/`, and run `git init` inside it.
2. Export the **technical dossier** from our chat and save it as `docs/golf-r-mk7-dossier.md` in that folder. This is the single most important input — it's the parts taxonomy, OEM part numbers, torque specs, failure modes, and the phased build order Claude Code will follow.
3. Open Claude Code in that folder and paste the Kickoff Prompt (Section 2) verbatim.

Why Claude Code and not a claude.ai chat artifact: this project is thousands of parts, a growing JSON parts database, external 3D model files, and weeks of iteration. It needs a persistent repo with git history and asset files. A chat artifact is a single React file with no file system — fine for a demo, wrong for this.

---

## 2. The Kickoff Prompt (paste verbatim)

```
You are building **R-Explorer**: an interactive 3D web app that lets me visually learn my Volkswagen Golf R Mk7 (2014–2017, EA888 Gen 3, engine codes CJXB/CJXC) inside and out — the whole car and especially the engine — with exploded views, part selection, and per-part technical data.

FIRST: read `docs/golf-r-mk7-dossier.md` in full. It is the authoritative reference for this project: the 10-branch component taxonomy, part names, OEM part numbers, torque specs, known failure points, and a 7-phase build order. Mirror its taxonomy exactly. Never invent OEM part numbers — if the dossier doesn't have one, store null and log the part name in `docs/UNVERIFIED.md`.

## Stack
- Vite + React + TypeScript
- three.js via @react-three/fiber and @react-three/drei
- zustand for app state
- No backend. Static site, JSON data files, runs with `npm run dev`, builds to a static bundle.

## Core architecture — data-driven and geometry-agnostic
This is the most important constraint. The viewer must render whatever the data describes, so geometry can be upgraded later without touching viewer code.

- Single source of truth: `src/data/parts/*.json` (one file per assembly). Each part record:
  id, name, system, assembly, subAssembly, oemPartNumber, description, material,
  torqueSpec, knownIssues, explodeVector {direction, distance}, geometryRef, tags.
- `geometryRef` is either (a) the name of a procedural geometry recipe, or (b) a path to a `.glb` in `public/models/`. Start with (a) everywhere; I will swap in real GLB meshes for hero parts later and the viewer must pick them up with zero code changes.
- Procedural geometry: build recognisable schematic parts from primitives, lathes and extrusions — piston as cylinder + crown + pin boss, crankshaft as journals + webs + counterweights, intake manifold as plenum + four runner tubes. One file per recipe in `src/geometry/`. The target look is a clean cutaway technical illustration, colour-coded by system — NOT photorealism.
- Shared fastener library: reusable bolt/washer/clamp/clip components parameterised by class (M6/M8/M10/M12, T30, triple-square, wheel bolt), each carrying its torque value as metadata. Every assembly references these instead of defining its own hardware.

## Features (v1)
1. 3D viewport: orbit/pan/zoom, neutral studio lighting, subtle ground grid, camera presets (front three-quarter, top, engine bay, underside, engine-only).
2. Hierarchy tree panel mirroring the dossier's 10 systems → assemblies → sub-assemblies → parts, with per-node visibility toggles and an isolate mode.
3. Explode: a global explode slider plus per-assembly explode, animated with easing; parts travel along their explodeVector. Support nested explode — the engine explodes off the car, then the head explodes off the block, then the valvetrain explodes out of the head.
4. Selection: clicking a part in the viewport or the tree highlights it (outline/emissive) and opens an info panel showing all its metadata — OEM part number, torque spec, material, known issues — plus a breadcrumb of where it sits in the hierarchy.
5. Search by part name or OEM part number, jumping camera to the result.
6. X-ray/ghost mode: unselected systems go translucent so I can see, e.g., the cooling circuit through the block.
7. Fault mode (signature feature): the intake manifold sub-assembly gets animated runner flaps, the V157 flap motor and the G336 position sensor as separable parts. A "P2015" toggle demonstrates the fault — flap stuck vs sensor reading implausible — with a short overlay explaining the real-world diagnosis (VCDS output test 03, measuring block 142, sensor 06K907386D vs full manifold 06L133201FP).
8. Persistent UI state (open tree nodes, last camera) in a small zustand store; no browser-storage gymnastics needed since this runs locally.

## Design direction
Ground the UI in the car's own world: VW workshop-manual and ETKA exploded-diagram vernacular — index-numbered callout leader lines on exploded parts, a plate-style info panel, engineering-drawing typography (one characterful condensed display face for headings, a clean grotesk for body/data). Dark neutral canvas so the colour-coded systems read clearly; one restrained accent (Lapiz Blue, the R's launch colour) for selection and interactive states. The signature element is the exploded view with numbered callouts — spend the design effort there and keep everything else quiet. Responsive enough to browse on a phone, keyboard focus visible, reduced motion respected. Avoid generic AI-dashboard styling.

## Phasing — follow the dossier Section 10 build order
- Phase 0 (THIS session): scaffold the project, define the data schema + zustand store, build the viewer shell, and prove the whole loop end-to-end on ONE small real assembly: the front brake corner (disc 340mm, single-piston floating caliper, carrier, pads, caliper bolts from the fastener library) — explodable, selectable, tree-navigable, info panel populated from the dossier.
- Phase 1: engine short block + head (block, crank, rods, pistons, balance shafts, head, cams, AVS, chain drive).
- Phase 2: intake/fuel/exhaust + the interactive intake-manifold fault mode.
- Phases 3–7: transmission (DQ250 or MQ350), Haldex AWD driveline, suspension/steering/brakes, body, electrics/cooling/interior — per the dossier.

## Working rules
- Start by writing a `CLAUDE.md` capturing this brief's conventions (stack, schema, taxonomy source, "no invented part numbers", design direction), then present me a short Phase 0 plan BEFORE writing code, and wait for my go.
- Keep components small; strict TypeScript; no `any` on the part schema.
- Every session must end with: `npm run dev` running clean, a git commit with a meaningful message, and an updated `PROGRESS.md` stating what's done, what's next, and any open questions.

Confirm your Phase 0 plan now.
```

---

## 3. Session prompts for later phases (short, paste as needed)

Each new Claude Code session starts fresh, so re-anchor it every time:

**Phase 1 —**
```
Read CLAUDE.md, PROGRESS.md, and docs/golf-r-mk7-dossier.md Section 2 (engine). Build Phase 1: the EA888 short block + head as a nested explodable assembly — block, forged crank (5 mains), cracked-cap rods, 9.3:1 pistons with oil jets, twin balance shafts, chain drive with tensioner and guides, head with integrated exhaust manifold, both cams, AVS two-step exhaust lobes as an animated toggle. Populate every part record from the dossier. Plan first, then build.
```

**Phase 2 —**
```
Read CLAUDE.md, PROGRESS.md, and the dossier's intake/fuel/exhaust sections. Build Phase 2 including the P2015 fault mode exactly as specced in CLAUDE.md — animated runner flaps, V157 motor, G336 sensor (06K907386D), full manifold (06L133201FP), fault toggle with diagnosis overlay. Plan first.
```

Then repeat the pattern for Phases 3–7, pointing it at the matching dossier section each time. If a session drifts or degrades, `/clear` (or start a new session) and re-anchor with CLAUDE.md + PROGRESS.md rather than pushing on.

---

## 4. Swapping in real meshes later (the upgrade path)

The data-driven architecture exists for this:

1. Source a mesh — Sketchfab (free Mk7 shells), GrabCAD (engine/mechanical CAD), CGTrader/Hum3D/TurboSquid (paid, higher fidelity). Check the licence on each.
2. In Blender: import → decimate to a sane poly count → apply transforms → export as `.glb`.
3. Drop it in `public/models/` and change that part's `geometryRef` from the recipe name to the file path. Nothing else changes.

Do this only for hero parts (body shell, block, head, turbo). Everything else stays procedural — it's faster, consistent, and honestly better for learning.

## 5. Honest expectations

Claude Code will be excellent at: the entire interactive system (explode, tree, selection, search, fault mode), the data layer populated from the dossier, and schematic procedural parts that are recognisably a crankshaft, a Haldex coupling, a strut. It cannot conjure factory-accurate scan-quality meshes of EA888 internals from nothing — nobody's AI can yet — which is why the architecture treats geometry as swappable and why the schematic, colour-coded, ETKA-style look is the design goal rather than a compromise. For understanding how your car works, an explodable diagram beats a photoreal render anyway.
