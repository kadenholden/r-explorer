# UNVERIFIED — parts awaiting OEM data

Per the project rule, no OEM part number is ever invented: when the dossier
doesn't provide one, the part stores `null` and is logged here. Verify
against ETKA / erWin / partslink24 / 7zap (dossier §9) and backfill the
JSON when confirmed.

## Front brake corner (Phase 0)

| Part (id) | Missing | Notes |
| --- | --- | --- |
| Brake disc, front (`front-brake-disc`) | OEM number, material | 340 × 30 mm ventilated per dossier §6; grey cast iron is typical but unconfirmed |
| Brake caliper housing (`front-brake-caliper`) | OEM number | Aluminium + blue paint confirmed by dossier §6 |
| Caliper carrier (`front-brake-carrier`) | OEM number, material | |
| Brake pad, front outer (`front-brake-pad-outer`) | OEM number, material | |
| Brake pad, front inner (`front-brake-pad-inner`) | OEM number, material | Wear-sensor variant to confirm (front-left typical) |
| Caliper guide bolts (`front-caliper-guide-bolts`) | OEM number, exact class/length | Torque 35 Nm is dossier-confirmed |
| Carrier bolts (`front-carrier-bolts`) | OEM number, replace-after-use status | Torque 200 Nm is dossier-confirmed |

## Remaining brake corners (operator-requested addition)

Front-left mirrors the front-right (same missing items). Rear corners
additionally need: **rear disc thickness** (modelled at a typical 22 mm
— not in the dossier), rear caliper/carrier bolt torques (dossier
states front only), EPB actuator part number, and the R-specific rear
pad number (the one that is NOT the GTI Performance Pack pad).

## Engine — short block (Phase 1) — LARGELY RESOLVED by R1 (2026-08-10)

The R1 research return (docs/research/R1-short-block.md) supplied OEM
numbers and erWin-derived torques for most of the bottom end — recorded
on the parts. What remains open from R1's own flags:

| Item | Status |
| --- | --- |
| Main-cap CROSS-bolt torque (`main-cap-cross-bolts`, N91187501) | NOT captured from a primary source — tightened after the vertical bolts; confirm in erWin |
| Balance-shaft module number | 06K103295-series vs older 06H198205 bin — verify against a live CJXC ETKA entry |
| Oil pump + dipstick tube numbers | best-available US bins (06L115105/06K115105-series, 06L103663-series) — verify vs live CJXC catalogue |
| Piston circlips, oil-pump chain kit, core plugs, dowels, balance-shaft seal, DQ250 DMF | NONE FOUND — legitimately no separate numbers located |
| Upper-sump-to-block bolt torque | aluminium single-use bolts; value not captured |
| Main journal 48 mm | R-specific (SSP's generic 52 mm belongs to other Gen 3 codes) — noted, adopted |

## Engine — head & valvetrain — LARGELY RESOLVED by R2 (2026-08-14)

R2 (docs/research/R2-head-valvetrain.md) supplied ~15 OEM numbers and
RESOLVED the head-bolt torque conflict: six stages, 40 → 80 → slacken
180° → 50 → +90° → +90°, new TTY bolts (both '40+90+90' and '60+180'
were aggregator errors). Head-bolt PN WHT005305B came from R12. Still
open from R2's own flags:

| Item | Status |
| --- | --- |
| Cam-bridge bolt torque | 8 Nm + 90° renew (erWin snippet) vs generic M6/M7/M8 = 10/15/20 Nm (Spoolas) — the longest-carried open flag |
| Phaser ranges | intake 30° / exhaust 60° (Australiancar) vs the inverse on forums — contested |
| Tensioner bolt torque | conflicting 10 Nm vs 50 Nm + angle — unverified, do not guess |
| Cam-cover + guide-rail bolt torques | NONE FOUND from the Gen 3 manual (guide rails ~20 Nm forum-grade) |
| Springs/retainers/collets/seats/guides, followers, HVAs, AVS actuators | no exposed OEM numbers (head assy / kits only) |
| Ignition coil | 06H905110P (R dealer catalogue) vs 06K905110K (GTI/family) — confirm by VIN |
| G300 sensor number | NONE FOUND |
| Injection type | R2 says pre-facelift CJXC is DI-only; **R4 overturns this with five agreeing sources** (EU = dual injection, DI-only is North America) — model follows R4 + dossier |

## Intake / fuel / exhaust (Phase 2)

Two numbers ARE dossier-verified and recorded on their parts: the
complete manifold **06L133201FP** and the G336 sensor **06K907386D**.
The V157 motor and runner flaps intentionally carry `null` — they are
only sold inside the complete manifold (dossier §2).

| Part (id) | Missing |
| --- | --- |
| Airbox (`airbox`) | OEM number |
| Turbo (`turbo-is38`) | OEM number (IS38 is the model; exact 06K unit varies) |
| Wastegate actuator (`wastegate-actuator`) | exact 06K145xxx variant |
| Diverter valve (`diverter-valve`) | OEM number |
| Charge pipes (`charge-pipe-hot`, `-cold`) | OEM numbers, materials |
| Intercooler (`intercooler`) | OEM number |
| Throttle body (`throttle-body`) | OEM number |
| Manifold bolts (`manifold-bolts`) | OEM number, exact class/length |
| HPFP (`hpfp`) | OEM number |
| Fuel rails + injectors (`di-fuel-rail`, `di-injectors`, `port-fuel-rail`, `port-injectors`) | OEM numbers |
| Rail pressure sensor (`rail-pressure-sensor`) | OEM number |
| Exhaust line (`downpipe-cat`, `link-pipe`, `resonator`, `rear-silencer`, `exhaust-flap-actuators`, `quad-tips`) | OEM numbers |
| Lambda sensors (`lambda-sensors`) | OEM numbers |

## Transmission — DQ250 (Phase 3)

No OEM numbers or torque specs in the dossier for DSG internals; all 9
records store `null`. Confirm the gearbox code (DQ250/0D9) from the
bellhousing label.

| Part (id) | Missing |
| --- | --- |
| All DQ250 records (`dsg-housing`, `dual-mass-damper`, `dual-clutch-pack`, `mechatronic-j743`, `input-shafts`, `gear-set-1`, `gear-set-2`, `final-drive-diff`, `pto-bevel`) | OEM numbers; ratios; service capacities |

## Body & exterior (Phase 6)

Dossier-verified facts live on the parts (BIW weight-saving quotes, 80%
HSS share, hot-formed pillars, R styling items, real exterior
dimensions). All OEM panel numbers `null`. Real-car paint code for the
operator's white also unrecorded.

## Engine ancillaries (coverage-audit addition)

Dossier-verified: engine-mount torques (60 Nm +90° bracket / 40 Nm +90°
rail). Sump-area numbers now come from R1 (see above). Still `null`:
valve cover/PCV, coils, FEAD belt + tensioner, alternator, A/C
compressor, starter, mounts, dogbone.

## Suspension, steering & wheels (Phase 5)

Dossier-verified on their parts: wheel bolts 120 Nm; hub/axle bolt
200 Nm +180°; geometry facts (8J×19 Pretoria, 235/35 R19, 5×112,
57.1 mm, ride height −20 mm). Everything else `null`:

| Part group | Missing |
| --- | --- |
| Struts, dampers, springs | OEM numbers; spring rates |
| Arms/links (LCA, trailing, upper/spring/toe, tie rods) | OEM numbers; pinch/pivot bolt torques |
| Subframes, ARBs, knuckles/carriers | OEM numbers; subframe bolt torques |
| Pretoria wheels | OEM number; exact ET offset (dossier: ET45–50) |

## Driveline — Haldex Gen 5 (Phase 4)

Dossier-verified: the charge pump **0CQ598549** (recorded on its part).
Everything else stores `null`.

| Part (id) | Missing |
| --- | --- |
| Propshaft + centre bearing (`propshaft-front`, `-rear`, `center-bearing`) | OEM numbers |
| RDU + Haldex internals (`rdu-housing`, `haldex-coupling`, `haldex-filter`, `haldex-controller`, `rear-diff-gears`) | OEM numbers; fluid part numbers + capacities |
| Driveshafts (`rear-driveshafts`, `front-driveshaft-right`, `front-driveshaft-left`) | OEM numbers |

## Phase 7 (hydraulics, cooling, fuel, electrical, interior)

All OEM numbers `null`. Specific verify-items the dossier itself
flags: **ECU identity** (MED 17.5.2 vs SIMOS 18 — read the label/VCDS),
battery Ah spec, N493 current revision number, and the operator-side
assumptions: **RHD** and the exact paint code for the white.

## Lubrication / sump (added 2026-08-04 after a real oil leak — R1-RESOLVED 2026-08-10)

The R1 return settled most of what this section used to flag, and
corrected two of our assumptions (details in docs/research/R1-short-block.md):

- **Two-piece construction CONFIRMED**: die-cast aluminium structural
  upper sump 06K103603BL + glass-filled-plastic lower pan 06K103600D.
- **CORRECTION — the upper↔lower joint is a rubber gasket** (06K103649H,
  Elring), not sealant. The liquid-sealant joint is upper-sump-to-BLOCK.
- **Lower-pan bolt torque verified: 8 Nm + 45°** (steel bolts); baffle
  4 Nm + 45°; oil pump 8 Nm + 90°. No numbered sequence published.
- **CORRECTION — the OEM drain plug is a plastic quarter-turn bayonet**,
  not a threaded plug with crush washer.

Still open: upper-sump-to-block aluminium-bolt torque; OEM plastic
drain-plug torque (aftermarket steel = 30 Nm); filter housing / oil
cooler numbers (R9 cooling brief territory).
