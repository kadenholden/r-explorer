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

## Remaining brake corners — RESOLVED by R8 (2026-08-14)

Rear disc **310 × 22 mm min 20 confirmed** (Bentley p.83 — the modelled
22 mm guess was right), rear carrier 90 Nm + 90° TTY, rear guide 35 Nm
+ threadlocker, EPB motors 3Q0998281/-281A, R-specific rear pad
5Q0698451T (GTI-PP pad confirmed different, its number still unfound).
Open: front caliper guide-bolt torque CONFLICT (Bentley 30 vs
dossier/vendor 35 — recorded as 30 with the conflict on the part);
ABS line-union torque and small fastener PNs NONE FOUND; MC casting
1K1614019K vs 5Q1614019 family — VIN check.

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

## Intake / fuel / exhaust — LARGELY RESOLVED by R3+R4 (2026-08-14)

R3 confirmed the manifold 06L133201FP and delivered the IS38 family,
V465/N249/N316 designations and the P2015 adaptation story; R4 settled
dual injection (EU CJXC = DI + port; DI-only is North America — five
agreeing sources overturning R2), electric exhaust flaps (4H0133246J)
and both lambda numbers. Still open:

| Item | Status |
| --- | --- |
| G336 sensor number | CONFLICT: dossier says 06K907386D; R3 found no standalone PN (sold with manifold) — verify in ETKA |
| Diverter valve N249 revision | genuine disagreement: Gen 3 shipped 06H145710C (later J); 'Rev D' reportedly does NOT fit Gen 3 |
| DI rail + G247 exact Gen 3 numbers | NONE FOUND (widely-listed 06L133317L and 06J906051-series are OLDER FSI parts) |
| HPFP bolts, injector clamps, rail bolts, G247, V-band clamp, lambda, manifold-to-head, throttle-body, charge-pipe clamps | torques NOT published in extracted tables — staged/diagonal procedure only; "per WSM", do not guess |
| Fuel tank capacity | 55 L (VW US) vs 60 L (VW Australia, 4Motion) — check UK owner's manual |
| Throttle body / air filter / ducts / charge pipes / heat shield | series-level numbers only — verify suffix by VIN |
| Exhaust flap V-designation | electric confirmed but the V-number NOT found — do not assert "N321" |
| UK '722S' turbo revision | reportedly IS20-style actuator — verify by connector orientation |

## Transmission — DQ250 — LARGELY RESOLVED by R5 (2026-08-14)

R5 delivered ratios, capacities, the clutch module (02E141029N/P,
380 Nm), filter 02E305051C and the mechatronic solenoid map. Still open:

| Item | Status |
| --- | --- |
| Mechatronic PN | scan says 02E927770AS, vendors 02E325025AS — verify |
| Drain plug torque | R5 40 Nm vs R12 chart 45 Nm — conflict |
| Bevel box fluid | G 052 145 S2 (R5) vs A1 (R9 chart) — check the label; family corrected to 0CN 409 053 |
| Ratios | single-forum-sourced; reverse ratio NONE FOUND |
| Bellhousing / mount / driveshaft-flange torques, synchro cone counts | NONE FOUND — erWin needed |

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

## Suspension, steering & wheels — LARGELY RESOLVED by R7 (2026-08-14)

R7 delivered the passive strut family (5Q0413031EC), LCA 5Q0407151J,
subframe 70 Nm + 180° TTY + alignment-pin rule, the rear-link torque
family (90+90 / 95 eccentric / 180 & 50+90 shocks), progressive-rack
details and wear items. Still open:

| Item | Status |
| --- | --- |
| Strut-to-knuckle clamp, ball-joint clamp, top-mount nuts, inner tie-rod + locknut | torques NONE FOUND verbatim — per erWin (drive types known from R12) |
| Rack-to-subframe | 50+90 (R7) vs 70+90 (R12 chart) — conflict |
| Rear ARB clamp | 25+90 (R7) vs 20+90 (R12-flagged variant) — conflict |
| Hub bolt | 200+180 confirmed for smooth WHT005437; ElsaWin +90° variant and ribbed 70+90 variant — physically identify first |
| Wheel bolts | 120 Nm (2014 manual) confirmed; later-manual 140 Nm flagged |
| ARB diameters (23.2 / ~21.7), spring rates, several link PNs | vendor-sized / family-level — verify by VIN; Pretoria exact ET still open |
| Front caster | ~7°45′ forum-only; rear-toe tolerance truncated in source |

## Driveline — Haldex Gen 5 — LARGELY RESOLVED by R6 (2026-08-14)

R6 confirmed the pump 0CQ598549, corrected the architecture (no
accumulator/filter/pressure valve — strainer + CEH pump), resolved the
propshaft (two-piece + flex disc 5Q0521307, not CVs) and gave the
fluid/service data. Still open:

| Item | Status |
| --- | --- |
| Propshaft flange torques | NONE FOUND — the circulating 55 Nm is Audi C6 RS6, rejected; erWin group 39 |
| Rear-diff plug torque | ~30 Nm not primary-sourced; R12 carries a 19-vs-35 specialist conflict |
| Clutch-pack disc count/friction spec | NONE FOUND |
| G 055 → G 060 fluid supersession | community consensus only |
| RDU/bevel tooth counts, driveshaft PNs | unverified (SSP 515 likely holds the counts) |

## Phase 7 (cooling, electrical, body) — LARGELY RESOLVED by R9/R10/R11 (2026-08-14)

- **ECU RESOLVED**: SIMOS 18.1, family 5G0906259 — NOT MED 17.5.2
  (settle finally with a VCDS scan of this VIN).
- **N493 resolved**: it IS the pump/thermostat module, 06L121111P;
  impeller 06L121012M (generic 06L121012 does NOT fit — VIN-verify).
  Coolant-pump pulley bolt is the car's only LEFT-HAND thread.
- **Battery**: AGM 68 Ah/380 A, 000915105 family; swap needs the
  19-Gateway adaptation (not registration).
- **Paint**: Pure White LC9A / sticker 0Q0Q is the standard solid white —
  operator to confirm on the service book / boot-floor sticker.
- **Expansion tank side**: modelled RIGHT/offside opposite the battery (MQB references);
  operator unsure — confirm against the battery side at the next bonnet-up.
- Still open: ACC radar exact suffix (J vs P; Bosch pre-FL only);
  G62 PN vendor-sourced; expansion-cap bar rating; most cooling mount
  torques NONE FOUND; N422 + heater-hose PNs; MC casting by VIN;
  fuse-row maps, rear-light/tailgate-loom/small-sensor PNs (R10 NONE
  FOUND list); rear final-drive fluid A1-vs-S2; **RHD still assumed**.

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
