# PROGRESS

## Phase 0 — complete (this session, 2026-08-01)

**What's done**

- Vite + React + TypeScript (strict) app scaffolded; three.js via
  @react-three/fiber + drei; zustand store with persisted UI state (open
  tree nodes, last camera preset).
- Data-driven core proven end-to-end: the strict part schema
  ([src/types/parts.ts](src/types/parts.ts)), a validating loader that
  fails loudly on any bad data file, and the geometry recipe registry —
  `geometryRef` resolves to a procedural recipe or (code path in place) a
  `.glb` under `public/models/`.
- Procedural recipes: brake disc, floating caliper, carrier, pads
  (parameterised facing), and the first shared-fastener-library recipe
  (`hexBolt`, parameterised by class dimensions, torque as metadata).
- Front brake corner assembly fully working from dossier data: 340 × 30 mm
  disc, blue aluminium caliper, carrier, both pads, M8 guide bolts (35 Nm)
  and M12 carrier bolts (200 Nm). Explodable with animated easing and
  ETKA-style numbered callouts + leader lines; selectable from viewport,
  tree, or callout chips; plate-style info panel with breadcrumb; hierarchy
  tree with all ten dossier systems, visibility toggles and isolate mode;
  camera presets; mobile layout (drawer tree, bottom-sheet info panel);
  reduced-motion respected.
- GitHub Pages deployment workflow (`.github/workflows/deploy.yml`) —
  builds and deploys on every merge to main; Vite `base` set to
  `/r-explorer/`.
- `docs/UNVERIFIED.md` started (no OEM numbers invented — all seven Phase 0
  parts logged pending ETKA/erWin verification).

**Verified this session:** `npm run build` clean (strict tsc + Vite);
desktop + mobile checked in-browser: explode, selection, tree, isolate,
presets, info plate; zero console errors.

## What's next — Phase 1 (on operator's go)

Engine short block + head per dossier §2: block, forged crank (5 mains),
cracked-cap rods, 9.3:1 pistons with oil jets, twin balance shafts, chain
drive with tensioner and guides, head with integrated exhaust manifold,
both cams, AVS as an animated toggle. New recipes needed: crankshaft
(journals/webs/counterweights), piston, rod, block, head, cam, chain run.

Deferred features (arrive with the phase that needs them): search,
x-ray/ghost mode, nested explode, per-assembly explode, P2015 fault mode
(Phase 2).

## Open questions

1. **Car spec check (matters from Phase 3):** manual (MQ350) or DSG
   (DQ250)? DCC fitted? 18" Cadiz or 19" Pretoria wheels? 3-door or
   5-door? Pre-facelift confirmed?
2. **GitHub Pages:** enabled via API this session — confirm the first
   deploy goes live after this PR merges (Actions tab → "Deploy to GitHub
   Pages").
3. Bundle is ~1.2 MB minified (three.js); fine for now, code-splitting is
   an option later if phone load feels slow.
