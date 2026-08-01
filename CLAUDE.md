# CLAUDE.md — R-Explorer

Interactive 3D web app for visually learning a Volkswagen Golf R Mk7
(2014–2017, EA888 Gen 3, engine codes CJXB/CJXC) — the whole car and
especially the engine — with exploded views, part selection, and per-part
technical data.

## Authoritative sources

- **`docs/golf-r-mk7-dossier.md` is the single source of truth** for the
  component taxonomy (its Section 10 ten-system tree), part names, OEM part
  numbers, torque specs, and known failure points. Mirror its taxonomy
  exactly. Read the relevant section before building any assembly.
- **Never invent OEM part numbers.** If the dossier doesn't give one, store
  `null` and log the part name in `docs/UNVERIFIED.md`. Same rule for torque
  specs: dossier value or null — never a guess. Dossier figures flagged
  "indicative" keep that flag in the part's description.
- `docs/handoff.md` is the original project handoff; the operator's pasted
  kickoff brief (which adds GitHub Pages deployment and the PR workflow)
  supersedes it where they differ.

## Stack

- Vite + React + TypeScript (strict; **no `any` anywhere on the part schema**)
- three.js via `@react-three/fiber` and `@react-three/drei`
- `zustand` for app state (a small persisted slice: open tree nodes, last camera)
- No backend. Static site; JSON data files; `npm run dev` locally; builds to
  a static bundle.

## Core architecture — data-driven and geometry-agnostic

The most important constraint: **the viewer renders whatever the data
describes.** Geometry upgrades must never require viewer-code changes.

- Single source of truth: `src/data/parts/*.json`, one file per assembly.
  Part record fields: `id, name, system, assembly, subAssembly,
  oemPartNumber, description, material, torqueSpec, knownIssues,
  explodeVector {direction, distance}, geometryRef, tags`.
- `geometryRef` is either (a) the name of a procedural geometry recipe, or
  (b) a path to a `.glb` under `public/models/`. Start with (a) everywhere;
  real GLB meshes for hero parts get swapped in later and must be picked up
  with zero code changes.
- Procedural recipes live in `src/geometry/`, one file per recipe, built
  from primitives/lathes/extrusions. Recipes mimic the real component's
  form and interfaces (true dimensions from the dossier where given — e.g.
  the disc's 5×112 PCD and 57.1 mm bore) while staying schematic, not
  photoreal. Two colour modes, toggled in the top bar and persisted:
  'real' (default — realistic part colours from each record's `color`) and
  'system' (dossier system colour-coding for cross-system readability).
- Shared fastener library: reusable bolt/washer/clamp/clip components
  parameterised by class (M6/M8/M10/M12, T30, triple-square, wheel bolt),
  each carrying its torque value as metadata. Assemblies reference these;
  they never define their own hardware.

## Design direction

VW workshop-manual / ETKA exploded-diagram vernacular: index-numbered
callout leader lines on exploded parts, plate-style info panel,
engineering-drawing typography (one characterful condensed display face for
headings, a clean grotesk for body/data). Dark neutral canvas so
system colour-coding reads; one restrained accent — **Lapiz Blue**, the R's
launch colour — for selection and interactive states. The signature element
is the exploded view with numbered callouts; everything else stays quiet.
Must work well on a phone as well as desktop; keyboard focus visible;
`prefers-reduced-motion` respected. Avoid generic AI-dashboard styling.

## Deployment

GitHub Pages project site via GitHub Actions: build the Vite app and deploy
on every merge to `main`, using the official Pages actions
(`actions/configure-pages`, `actions/upload-pages-artifact`,
`actions/deploy-pages`). Vite `base` must be `/r-explorer/`. The app must be
live at a URL the operator can open on their phone.

## The operator's car (confirmed 2026-08-01)

- **Gearbox: DSG** → model the DQ250 6-speed wet dual-clutch (0D9 AWD),
  NOT the MQ350 manual. Verify code on the bellhousing when possible.
- **Wheels: 19" Pretoria** (8J×19, 235/35 R19) — use for Phase 5/6.
- **DCC: not fitted** (confirmed — drive modes are Eco/Normal/Race; the
  "Sport" the operator first mentioned is the DSG lever's S program) →
  passive sport dampers in Phase 5.
- Still open: 3-door or 5-door (matters in Phase 6).

## Phasing (dossier Section 10 build order)

- **Phase 0 — IN PROGRESS:** scaffold, data schema + zustand store, viewer
  shell, Pages deployment, and the full loop proven on one real assembly:
  the front brake corner (340 mm disc, single-piston floating caliper,
  carrier, pads, caliper bolts from the fastener library) — explodable,
  selectable, tree-navigable, info panel populated from the dossier.
- Phase 1: engine short block + head. Phase 2: intake/fuel/exhaust + the
  interactive P2015 intake-manifold fault mode (V157, G336, 06K907386D vs
  06L133201FP). Phases 3–7: transmission, Haldex AWD, suspension/steering/
  brakes, body, electrics/cooling/interior — per the dossier.
- One phase at a time; the operator gives the go between phases.

## Working rules

- Keep components small; strict TypeScript throughout.
- **The operator is not a developer.** Every pull request gets a
  plain-English summary of what was built and what to check in the live app.
- Every session ends with: the app building cleanly (`npm run build`), an
  updated `PROGRESS.md` (what's done, what's next, open questions), and the
  work pushed as a pull request for review.
- Plan first, wait for the operator's go, then build.

## Commands

```bash
npm run dev        # local dev server
npm run build      # type-check + production build (must pass before any PR)
npm run preview    # serve the production build locally
```
