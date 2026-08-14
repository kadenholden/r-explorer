# R12 return — Fasteners & hardware library (Dossier System 10)

Deep-research return received 2026-08-14 (operator-run task, delivered as
PDF; transcribed here). Scope: 2014 VW Golf R Mk7 (5G) · EA888 Gen3 CJXC
(300 PS) · DQ250/0D9 DSG · 4Motion Haldex · RHD UK · ~92k mi.

## TL;DR

- The EA888 Gen3 cylinder-head bolt is an **XZN triple-square
  (WHT005305B / Reinz 143238301 set, M10×115), NOT a polydrive** — the
  Gen1/Gen2 06D polydrive bolt was superseded when VW moved to the WHT
  XZN bolt. This is the single most important drive-type resolution in
  the brief, and it is confirmed by the VW/Audi parts catalogue.
- The master table below is now largely populated by combining the FIXED
  (Rn) points with new dealer-catalogue, MQB-manual, Bentley/ElsaWin-derived
  and forum-confirmed finds; genuinely unresolved items (turbo V-band clamp
  Nm, VW-official lambda Nm, HPFP/injector/DI-rail exact Nm, rear-diff
  plug, bellhousing bolts) remain honestly marked **NONE FOUND**.
- Standard VW hardware uses the **N-number** (N xxx xxx xx) and newer
  **WHT** systems for non-application-specific bolts/nuts/clips; the app
  should fall back to the generic torque-by-thread-size/property-class
  table for any fastener without a specific figure, and treat every
  angle-tightened or self-locking fastener as single-use.

## 1. VW fastener numbering system (explainer deliverable)

**N-numbers (standard parts).** VW Group standard fasteners — bolts,
nuts, studs, screws, washers, clips, bulbs, nipples, clamps, pins, hoses
— carry an "N" prefix instead of the normal 9-digit application part
number. These are "no special application" parts usable across the whole
group (VW, Audi, SEAT, Škoda, and up to Bentley/Bugatti/Lamborghini/
Porsche). Examples on this car: N91118902 (main-bearing bolt), N90974701
(M5×16 wheel-arch-liner screw), N10240003 (V-band bolt), N90281802
(bevel-box/Haldex fill plug), N91082701 (Haldex drain plug). They appear
in ETKA/dealer catalogues in a dedicated "standard parts" section rather
than under the model tree. As Club VeeDub states verbatim: *"These 'N'
prefixed Standard Parts are the nuts, bolts, studs, screws, washers,
clips, bulbs, nipples, clamps, pins and hoses that have no special
application – you could use them anywhere."*

**WHT-prefix parts.** WHT is a newer standard-parts prefix (introduced
with later platforms) covering mostly high-grade/critical fasteners and
some hardware: hub bolts (WHT005437), driveshaft/propshaft flex-disc
bolts (WHT005179), Gen3 head bolts (WHT005305B), bumper retainer nuts
(WHT005560), wide-collar plastic nuts (WHT000713), bumper fastener clips
(WHT005263). Like N-numbers, WHT parts are cross-platform standard
parts, not model-specific assemblies. parts.vw.com lists **WHT005437A**
as *"Bolt. Bearing. Hub … Part cannot be reused/reinstalled,"*
confirming both catalogue presence and single-use status.

**Difference vs 5Q0/06L-style assembly PNs.** A hardware N-/WHT-number
denotes a generic fastener. A number such as 5Q0199555 (mount), 06L
(engine assembly) or 5G0898615 (bonnet fixings kit) is an
application/assembly part number: the first three characters encode the
model/platform (5G0 = Golf Mk7, 5Q0 = MQB) or the engine/gearbox family
(06K/06L = EA888 Gen3), the middle triad the main-group/sub-group, and
the last triad the specific component; a trailing letter is a revision.
So a bolt in an exploded diagram may be called out either by its
N-/WHT-number (standard part) or, if application-specific, by a full
model PN.

**How to look them up.** Enter the N-/WHT-number directly into a dealer
catalogue search (parts.vw.com, vw.oempartsonline.com, myvwpart.com,
jimellisvwparts.com); these resolve the number to a description and
thread size. 7zap/ETKA mirrors carry a "standard parts" section but are
Cloudflare-blocked from some infrastructure.

## 2. Drive-type glossary + tool list + per-fastener mapping

| Drive type | Tool | Where on this car (mapped) |
| --- | --- | --- |
| External hex | Metric sockets/spanners | Most brackets; exhaust nuts (13mm); lower engine-mount bolts (16mm); lambda sensors (22mm O2 socket) |
| Internal hex / Allen | Hex/Allen keys | Haldex fill plug (5mm), Haldex drain plug (8mm — R6); CV-axle heat-shield (8mm); turbo-to-downpipe V-band clamp bolt (6mm Allen) |
| Torx (internal) T20/T25/T27/T30 | Torx bits | Disc set screw T30 (R8); throttle body/thermostat/water-pump/intake-manifold T30; trim screws; timing-cover screws (single-use) |
| External Torx / E-socket | E-sockets | Some MQB exhaust/turbo bracket fasteners — specific applications on this car not individually confirmed (mark verify) |
| XZN triple-square (12-spline, 90° points) M8/M10/M12/M14 | XZN/triple-square bit sockets | **Head bolts M10 (WHT005305B)**; outer driveshaft-to-flange bolts M10×~23; inner CV flange bolts; rear brake carrier bolts; steering UJ pinch bolt M8; strut-to-knuckle clamp (14mm); intake-manifold bracket M10; door striker |
| Polydrive | 10mm polydrive socket | **NOT used on Gen3.** This was the Gen1/Gen2/EA113 head bolt (06D103385D / earlier WHT005305). Resolution: Gen3 uses XZN. |
| Ribbed / serrated-flange (RIBE-like) | Ribbed bit socket | Front caliper carrier bolts 15→200 Nm (R8); ribbed hub-bolt variant |
| 12-point / multi-point (double-hex, 60° points) | 12-point sockets | Hub/axle bolt WHT005437 M16×1.5 (R6); rear caliper carrier (R8); propshaft flex-disc bolt WHT005179 |
| Micro-encapsulated / pre-applied threadlock | Standard drive + renew | ABS wheel-speed sensor bolts (R10); rear caliper guide bolts (R8); door striker (dealer adds Loctite) |
| Left-hand thread | Standard drive, reverse | Coolant-pump pulley bolt (R9) |

**Polydrive-vs-XZN head-bolt resolution (RESOLVED).** The AudiWorld
parts-catalogue breakdown states: *"06K / 06L (EA888 Gen3) engines, bolt
WHT005305(B) (M10×115×85), no washers,"* while EA113/Gen1/Gen2 used the
06D polydrive bolt. The **2014 CJXC therefore uses XZN triple-square
head bolts, not polydrive.** FCP Euro corroborates the hardware,
cataloguing the *"Audi VW Cylinder Head Bolt Set — Reinz 143238301"*
under WHT005305B for EA888 Gen3. The generic "10mm polydrive head-bolt
socket" sold for older A4/A6/TT/Jetta/Passat engines does **not** fit
this car.

**Left-hand-thread list on this car.** Positively confirmed:
coolant-pump pulley bolt (R9, LH, renew). No other LH threads were
confirmed in R1–R12; treat any others as NONE FOUND rather than assume.

**Driveshaft/propshaft drive-type confirmation.** COBB's Mk7 Golf R
downpipe guide: *"Remove the (3) driveshaft bolts using a 3/8" 10mm
12pt"* and *"the top left driveshaft heat-shield bolt using a 3/8" 10mm
triple square XZN."* Genuine VW inner-joint bolts are catalogued as
*"M10x23 10mm 12pt Triple Square XZN."* The propshaft flex-disc bolt
WHT005179 is a *"12 Point Bolt (M10×45)."* (eBay; UroTuning)

## 3. VW generic torque-by-thread-size / property-class table (app fallback)

VW's own "general information — tightening torques for bolts/nuts
without specified torque" table was not reproducible verbatim from
sources reachable in this pass (it lives behind erWin). As the app
fallback, use ISO 898-1 / standard-parts values for **clean,
lightly-oiled** threads, which VW's generic figures track closely. The
property class (8.8, 10.9, 12.9) is stamped on the head.

| Thread (coarse) | 8.8 (Nm) | 10.9 (Nm) | 12.9 (Nm) |
| --- | --- | --- | --- |
| M5 | ~5–6 | ~8 | ~9.5 |
| M6 | ~9.5–10 | ~14–15.5 | ~17–20 |
| M8 | ~23–25 | ~34–37 | ~40–48 |
| M10 | ~46–51 | ~68–75 | ~80–96 |
| M12 | ~79–87 | ~117–130 | ~140–167 |
| M14 | ~125–140 | ~180–200 | ~215–240 |

Fine-pitch variants (M10×1.0, M12×1.5) run ~10–15% higher. **This is a
sanity-check/fallback table, NOT a VW-cited figure** — the app must
always prefer a specific value from the master table. Third-party charts
(tighttorque.com, generic fastener PDFs) were used only for
cross-checking, never as a cited primary figure, per the brief's rules.

## 4. General TTY / assembly-rules block

- **Angle-tightened (TTY) bolts are always renewed.** They are torqued
  past yield so the shank stretches plastically, delivering a
  near-constant, self-maintaining clamp load; re-use risks under-clamp
  or fracture. App one-liner: *"Torque-to-yield bolts stretch permanently
  to lock in clamp force — a reused stretched bolt loses that force."*
- **Self-locking nuts/bolts always renewed** (nylon or deformed-thread
  locking element degrades on first use).
- **Micro-encapsulated bolts always renewed** (pre-applied adhesive
  capsule is one-shot): ABS sensor and rear caliper guide bolts qualify.
- **Diagonal/staged tightening for covers and housings** (oil pan, DSG
  pan, cam bearing bridges) to avoid distortion.
- **Unions/fittings** tightened lightly first, then final-torqued.
- **Torques are for non-oiled (clean, dry) threads unless stated.**
- **Suspension bolts through rubber bushes are final-tightened at ride
  height** (R7 fixed) — otherwise the bush is pre-loaded and fails early.
- **Crush/copper washers on plugs and banjos renewed** every time.

## 5. Master fastener table

Format: fastener | part_number | size/thread | drive | torque (Nm +
angle) | TTY/single-use? | assemblies | status | source

### System 1 — Engine (R1/R2/R3 + new)

| Fastener | Part number | Size/thread | Drive | Torque (Nm + angle) | TTY/single-use? | Assemblies | Status | Source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Main bearing cap bolts | N91118902 | (cross-bolted) | 12-pt/multi | 65 Nm + 90° | Renew | short-block main caps | FIXED (R1) | R1 |
| Con-rod bolts | — | — | 12-pt | 45 Nm + 90° (30 Nm step = old-bolt measuring only) | Renew | conrod big-end | FIXED (R1) | R1 |
| Crank/vibration-damper bolt | — | — | multi | 8.8 = 150 Nm + 90°; 10.9 = 100 Nm + 180° | Renew | crank pulley/damper | FIXED (R1/R9) | R1/R9 |
| Cylinder head bolts | WHT005305B (Reinz 143238301 set) | M10×115 | **XZN triple-square** | 40 → 80 → slacken 180° → 50 → 90° + 90° | Renew | head to block | FIXED (R2); drive+PN NEW-confirmed | audiworld.com; fcpeuro.com |
| Cam bearing bridge/carrier bolts | — | — | Torx/hex | 8 Nm + 90° | — | cam carrier | FIXED (R2) — **CARRIED OPEN FLAG** vs 10/15/20 generic | R2 |
| Turbo-to-head nuts | — | — | hex/E-socket | 25 Nm | — | turbo mount | FIXED (R3) | R3 |
| Turbo oil/coolant line fittings | — | O-ring type (NOT banjo) | hex | 9 Nm | — | turbo oil/coolant feed | FIXED (R3/R4) | R3/R4 |
| N249 diverter valve | — | — | Torx | 9 Nm | — | DV on turbo | FIXED (R3) | R3 |
| Spark plugs | 06K905601B / PLFER7A8EG | M12 | 16mm plug socket | 25–30 Nm (EA888 M12, guide-grade) | — | ignition | NEW (VW-specific figure unconfirmed) | vwvortex; specsndocs |
| Ignition coil retaining bolt | — | — | hex/Torx | ~12 Nm (forum-guessed) | — | coil-on-plug | NONE FOUND (VW-official) | stefanosgarage |
| Intake manifold bolts | — | M6/M10 | T30 / 10mm / M10 XZN | 9 Nm (T30 & 10mm); bracket 10 Nm (13mm); M10 triple-square bracket 20 Nm | — | intake manifold | NEW | mygolfmk7.com |
| Throttle body | — | — | T30 | 7 Nm | — | to intake manifold | NEW | mygolfmk7.com |
| Thermostat housing | — | — | T30 | 8 Nm | — | cooling | NEW | mygolfmk7.com |
| Oil pan (upper alu / lower plastic) bolts | — | — | Torx/hex | NONE FOUND (VW-official) | — | sump | NONE FOUND | — |
| Timing chain (upper/lower) cover screws | — | — | Torx | NONE FOUND (Nm); screws are one-time-use | Renew (Torx) | timing cover | NONE FOUND (Nm) | blog.jenningsga.com |
| Engine mount — to frame rail | 5Q0199-family | — | hex | 40 Nm + 90° | Renew | RH engine mount | NEW | mygolfmk7.com; 034 |
| Engine mount — to frame bracket | — | — | hex | 20 Nm + 90° | Renew | engine mount | NEW | mygolfmk7.com |
| Engine mount — to engine bracket | — | — | hex | 60 Nm + 90° | Renew | engine mount | NEW | mygolfmk7.com |

### System 2 — Transmission (R5 + new)

| Fastener | Part number | Size/thread | Drive | Torque (Nm + angle) | TTY/single-use? | Assemblies | Status | Source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| DSG oil-pan bolts | — | — | Torx | 8 Nm, staged cross-pattern | — | DQ250 pan | FIXED (R5) | R5 |
| DSG drain plug | — | 14mm | hex | 40 Nm (FIXED R5); mygolfmk7 lists 45 Nm — see disagreements | — | DQ250 drain | FIXED (R5) w/ conflict | R5 / mygolfmk7.com |
| DSG cooler bolts | — | — | — | 20 Nm + 90° | — | ATF cooler | FIXED (R5) | R5 |
| Mechatronic cover bolts (×10) | — | — | — | 5 Nm + ¼-turn (mygolfmk7: 5 Nm + 90°) | — | mechatronic | FIXED (R5, verify) — corroborated | mygolfmk7.com |
| Bevel-box plugs | N90281802 | — | — | per WSM | Renew | front bevel box | FIXED (R5) | R5 |
| Gearbox-to-engine bellhousing bolts | — | — | hex/Torx | NONE FOUND (VW-official) | — | bellhousing | NONE FOUND | — |
| Pendulum (dogbone) mount — to trans | — | 16mm | hex | 50 Nm + 90° | Renew | dogbone | NEW | mygolfmk7.com; 034 |
| Pendulum mount — to subframe bushing | — | 21mm | hex | 130 Nm + 90° | Renew | dogbone/subframe | NEW | mygolfmk7.com |
| Transmission mount — to frame | — | — | hex | 50 Nm + 90° | Renew | trans mount | NEW | mygolfmk7.com |
| Transmission mount — to transmission | — | — | hex | 60 Nm + 90° | Renew | trans mount | NEW | mygolfmk7.com |

### System 3 — Driveline (R6 + new)

| Fastener | Part number | Size/thread | Drive | Torque (Nm + angle) | TTY/single-use? | Assemblies | Status | Source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Haldex drain plug | N91082701 | — | hex (8mm) | 32 Nm + new crush washer | Renew washer | Haldex | FIXED (R6) | R6 |
| Haldex fill plug | N90281802 | — | hex (5mm) | 15 Nm + new crush washer | Renew washer | Haldex | FIXED (R6) | R6 |
| Haldex pump bolts | — | — | — | 9.5 Nm | Renew | Haldex pump | FIXED (R6) | R6 |
| Hub/axle bolt (smooth-face, 8.8) | WHT005437 | M16×1.5×70 | **12-point** | 200 Nm + 180° | Single-use | front hub | FIXED (R6) | parts.vw.com; audi-sport.net — see disagreements (ElsaWin +90° variant) |
| Hub/axle bolt (ribbed variant, ~10.9) | WHT005437 ribbed | M16×1.5 | 12-point | **70 Nm + 90°** | Single-use | front hub (ribbed) | FIXED (R6) — physically verify | audi-sport.net; mytiguan.com |
| Driveshaft outer/inner CV-to-flange bolts | N90589701/702/703 area | M10×~23 | XZN 12-pt | 10 Nm diagonal → **70 Nm (M10)**; (M8 shafts: 10 → 40 Nm) | Renew | inner CV to gearbox flange | NEW (corrects "40" → 70 for M10) | audi-sport.net (ElsaWin-quoted); tighttorque |
| Propshaft flex-disc/flange bolts (transmission end) | N10329102 + WHT005179 | M10×45 12-pt | XZN 12-pt (10mm) | 50 Nm + 90° | Renew | propshaft front | NEW (transmission-end) | 034 MQB downpipe guide |
| Propshaft-to-rear-diff bolts (rear end) | — | — | 12-pt | NONE FOUND (Mk7-R-specific) | Renew | propshaft rear | NONE FOUND | subagent |
| Rear-diff flange shaft bolts | — | — | multi | 30 Nm | Renew | rear final drive flanges | NEW (VW-manual quoted on forum) | vwvortex 9558382 |
| Rear-diff drain/fill plug | — | — | hex | NONE FOUND (VW-official; Haldex-specialist lists conflict 19 vs 35 Nm) | — | rear diff | NONE FOUND | haldexrepairs.co.uk |

### System 4 — Suspension (R7 Bentley verbatim + new)

| Fastener | Part number | Size/thread | Drive | Torque (Nm + angle) | TTY/single-use? | Assemblies | Status | Source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Subframe-to-body & console-to-body | — | 18mm | XZN/hex | 70 Nm + 180° | Renew | subframe | FIXED (R7) | R7 |
| Front drop-link nut | — | 16mm/6mm triple-sq | — | 65 Nm | Renew | front ARB link | FIXED (R7) | R7 |
| Subframe bracket/brace | — | 16mm | — | 50 Nm + 90° | Renew | subframe brace | FIXED (R7) | R7 |
| Strut piston-rod nut | — | M14×1.5 | — | 60 Nm | Renew | front strut top | FIXED (R7) | R7 |
| DCC accel-sensor bolt | — | — | — | 15 Nm + 90° | Renew | DCC sensor | FIXED (R7) | R7 |
| Front hub-to-knuckle | — | — | — | 70 Nm + 90° | Renew | front bearing housing | FIXED (R7) | R7 |
| ABS sensor bolt (front) | — | M6×16 | Torx/hex | 8 Nm | Renew (micro-encaps) | wheel-speed sensor | FIXED (R7/R10) | R7 |
| Rear lower + upper transverse links | — | 18mm | — | 90 Nm + 90° | Renew | rear links | FIXED (R7) | R7 |
| Rear toe eccentric nut | — | — | — | 95 Nm | Renew + re-align | rear toe link | FIXED (R7) | R7 |
| Trailing-arm bracket | — | — | — | 50 Nm + 90° | Renew | trailing arm | FIXED (R7) | R7 |
| Rear bonded-bush nut | — | — | — | 45 Nm | Renew | rear bush | FIXED (R7) | R7 |
| Rear shock upper / lower | — | — | — | 180 Nm upper; 50 Nm + 90° lower | Renew (lower) | rear damper | FIXED (R7) | R7 |
| Rear ARB clamp | — | 10mm triple-sq | XZN | 25 Nm + 90° (mygolfmk7: 20 Nm + 90°) | Renew | rear stabiliser | FIXED (R7) w/ minor conflict | R7 / mygolfmk7 |
| Rear stab link | — | — | — | 45 Nm | — | rear ARB link | FIXED (R7) | R7 |
| Front strut top-mount bolts | — | — | hex | 15 Nm + 90° | — | strut tower | NEW | mygolfmk7.com |
| Lower ball-joint to control arm | — | — | — | 40 Nm + 45° (3 nuts) | Renew | front ball joint | NEW | mygolfmk7.com; ecstuning |
| Upper ball-joint to wheel-bearing housing | — | — | — | 60 Nm (single nut) | Renew | front ball joint | NEW | mygolfmk7.com |
| Strut-to-knuckle clamp bolt | — | M14 | **14mm triple-square** + 18mm nut | NONE FOUND (Mk7 Nm); older platform ≈60 Nm + ¼-turn | Renew | strut clamp | NONE FOUND (Mk7 Nm) | 034 strut guide; vwforum |

### System 5 — Steering (R7 + new)

| Fastener | Part number | Size/thread | Drive | Torque (Nm + angle) | TTY/single-use? | Assemblies | Status | Source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Rack-to-subframe | — | 18mm | — | 50 Nm + 90° (mygolfmk7: 70 Nm + 90°) | Renew | steering rack | FIXED (R7) w/ conflict | R7 / mygolfmk7 |
| Track-rod-end nut | — | — | — | 20 Nm + 90° | Renew | outer tie rod | FIXED (R7) | R7 |
| Steering UJ pinch bolt | — | M8×35 | XZN/hex | 30 Nm | Renew | steering column joint | FIXED (R7) | R7 |
| Wheel bolts | — | M14×1.5 ball seat | 17mm hex | 120 Nm | — | road wheels | FIXED (R7, resolved vs 140) — see disagreements | 2014 owner's manual |
| Inner tie-rod to rack | — | — | — | NONE FOUND | — | inner tie rod | NONE FOUND | — |
| Track-rod-end locknut | — | — | — | NONE FOUND | — | toe adjust | NONE FOUND | — |

### System 6 — Brakes (R8)

| Fastener | Part number | Size/thread | Drive | Torque (Nm + angle) | TTY/single-use? | Assemblies | Status | Source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Front carrier ribbed bolts | — | — | ribbed | 15 → 200 Nm staged (FN3 = 190) | Renew | front caliper carrier | FIXED (R8) | R8 |
| Front guide bolts | — | — | hex/Torx | 30 Nm (mygolfmk7: 35 Nm) | — | front caliper guides | FIXED (R8) w/ minor conflict | R8 / mygolfmk7 |
| Rear carrier internal-multipoint | — | — | 12-pt XZN | 90 Nm + 90° | Renew | rear caliper carrier | FIXED (R8) | R8 |
| Rear guide/self-locking bolts | — | — | — | 35 Nm + threadlock | Renew | rear caliper guides | FIXED (R8) | R8 |
| Disc set screw | — | — | T30 | 4 Nm | — | brake disc | FIXED (R8) | R8 |
| Banjo bolt | — | — | hex | 35 Nm + new copper washers | Renew washers | brake hose | FIXED (R8) | R8 |
| Rigid-line flare unions | — | — | flare spanner | 14 Nm | — | brake pipes | FIXED (R8) | R8 |
| MC-to-booster / booster-to-bulkhead nuts | — | — | — | 25 Nm | Renew | master cyl/booster | FIXED (R8) | R8 |
| Bleed nipples | — | — | — | 10 Nm (12 Nm FNR-G front) | — | calipers | FIXED (R8) | R8 |
| ABS module inner Torx | — | — | Torx | 5.5 Nm | Renew | ABS/ESC unit | FIXED (R8) | R8 |
| Front dust shield | — | — | — | 12 Nm | — | splash shield | NEW | mygolfmk7.com |

### System 7 — Cooling / HVAC / fluids (R9)

| Fastener | Part number | Size/thread | Drive | Torque (Nm + angle) | TTY/single-use? | Assemblies | Status | Source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Coolant pump/module bolts | — | — | T30 | 9 Nm in sequence | — | water pump/module | FIXED (R9) | R9 / mygolfmk7 |
| Pump pulley bolt | — | — | — | 10 Nm + 90°, **LEFT-HAND thread** | Renew | pump pulley | FIXED (R9) | R9 |

### System 8 — Fuel / exhaust (R4 + new)

| Fastener | Part number | Size/thread | Drive | Torque (Nm + angle) | TTY/single-use? | Assemblies | Status | Source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| HPFP bolts | — | — | Torx | NONE FOUND (VW-official; alternating TTY) | Renew | high-pressure pump | NONE FOUND | R4 |
| DI injector clamps / DI rail bolts / G247 sender | — | — | — | NONE FOUND | — | direct injection | NONE FOUND | R4 |
| V-band gasket + bolt | gasket 5Q0253115B; bolt N10240003 (M8×1.25×33) | M8 | 6mm Allen (clamp) | clamp Nm NONE FOUND | bolt Renew | turbo-to-downpipe | FIXED (R3/R4) + NONE FOUND (clamp Nm) | 034 MQB guide |
| Lambda sensors | — | M18×1.5 | 22mm O2 socket | ~50 Nm (Bosch generic 40–60); VW-official NONE FOUND | — | O2 sensors | NONE FOUND (VW figure) | vwvortex; ngk.com |
| Downpipe-to-body hanger nuts | — | 13mm | — | NONE FOUND ("No Spec") | — | exhaust | NONE FOUND | mygolfmk7 |

### System 9 — Electrical / CAN / sensors (R10 + new)

| Fastener | Part number | Size/thread | Drive | Torque (Nm + angle) | TTY/single-use? | Assemblies | Status | Source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ABS wheel-speed sensor bolts | — | M6×16 | Torx/hex | 8 Nm | Renew (micro-encaps) | ABS sensors | FIXED (R10) | R10 |
| Battery securing bracket bolt | — | — | hex | 15 Nm | — | battery clamp | NEW | mygolfmk7.com |
| Battery cable nut / ground nut / acorn nut | — | — | — | 6 Nm / 9 Nm / 20 Nm | — | battery terminals | NEW | mygolfmk7.com |
| Battery tray nut / bolts | — | — | — | 9 Nm (nut & 3 bolts) | — | battery tray | NEW | mygolfmk7.com |
| ESC-unit line unions | — | — | flare | NONE FOUND | — | ABS/ESC hydraulic | NONE FOUND | — |

### System 10 — Body / interior (R11 + new)

| Fastener | Part number | Size/thread | Drive | Torque (Nm + angle) | TTY/single-use? | Assemblies | Status | Source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Seatbelt anchor/latch | — | — | Torx/hex | 40 Nm | — | belt anchors | FIXED (R11) | R11 |
| Belt height-adjuster | — | — | — | 23 Nm | — | B-pillar | FIXED (R11) | R11 |
| Belt-guide screws | — | — | — | 1.5 Nm | — | belt guide | FIXED (R11) | R11 |
| Seat-rail bolts | — | — | — | ~25 Nm (MQB analog) | — | seat rails | FIXED (R11, verify) — still forum-grade | R11 |
| Door striker | — | — | **triple-square** | NONE FOUND (Nm); dealer adds Loctite | — | door latch striker | NONE FOUND (Nm) | vwvortex |
| Headlight bolts | — | — | — | outside 4 Nm; rear upper 8 Nm; rear lower 4 Nm | — | headlight | NEW | mygolfmk7.com |
| Door hinge / bonnet hinge bolts | — | — | — | NONE FOUND | — | hinges | NONE FOUND | — |

## 6. Prioritised remaining-gap list (safety-critical first)

**Safety-critical, still NONE FOUND (hunt erWin / Bentley chassis
volume):**

- Strut-to-knuckle clamp bolt Nm (Mk7-specific) — drive confirmed 14mm
  triple-square; value NONE FOUND.
- Inner tie-rod-to-rack and track-rod-end locknut Nm — NONE FOUND.
- Gearbox-to-engine bellhousing bolts (sizes + Nm) — NONE FOUND.
- Propshaft-to-rear-diff bolt torque (rear end) — NONE FOUND
  (transmission-end resolved 50 Nm + 90°).
- Rear-diff drain/fill plug (VW-official) — NONE FOUND
  (Haldex-specialist figures conflict 19 vs 35 Nm).
- HPFP bolts, DI injector clamps, DI rail bolts, G247 sender — NONE
  FOUND (Rep. Gr. 24).
- Turbo-to-downpipe V-band clamp Nm — NONE FOUND (6mm Allen, "tight").
- VW-official lambda Nm — NONE FOUND (~50 Nm generic Bosch band).
- ESC-unit hydraulic line unions — NONE FOUND.

**Resolved this brief:** head-bolt drive type (XZN) + PN
(WHT005305B/Reinz set); driveshaft/inner-CV flange drive + M10 = 70 Nm;
propshaft transmission-end 50 Nm + 90°; rear-diff flange-shaft bolts
30 Nm renew; dogbone/engine/trans mount pattern; intake
manifold/throttle/thermostat/water-pump; battery/headlight; front
ball-joint; front strut top-mount.

**Non-safety-critical NONE FOUND:** oil pan (upper/lower) bolts;
timing-chain cover Nm; ignition-coil bolt (VW-official); spark-plug
VW-specific figure; door/bonnet hinge Nm; engine-cover ball-studs; hose
spring-clamp / cable-tie-mount PNs.

## 7. Clip & trim hardware library

| Clip class | PN family | Location | Single-use in practice |
| --- | --- | --- | --- |
| Wheel-arch-liner Torx screw | N90974701 (M5×16); N90775001; N90648702 | wheel-arch liners, undertrays, bumpers | No (reusable) |
| Plastic screw grommet / expanding nut | N90833801; 6N0809966A; N10621301 (w/ rubber seal) | arches, bumpers, side skirts | Often break — replace |
| Bumper fastener clip | WHT005263 | rear bumper/trim | Often break |
| Metal bumper retainer nut | WHT005560 | bumper | Reusable |
| 8mm push-pin plastic rivet | N0385494 | underbody insulation shields | Single-use (break) |
| 6mm push-pin plastic rivet | N0385012 | seat backs / base valance | Single-use |
| Fir-tree clip (7mm) | N90911301 | carpet/upholstery | Single-use |
| Push-fit plastic clip | N91158501 | boot carpet, engine bay | Reusable |
| Star locking washer | N90335004 | underbody & heat shields | Reusable |
| Wide-collared plastic nut | WHT000713 | underbody | Reusable |
| Door-card retainer clips | 3AA868243A; 5G0868563 | door cards | Often break — replace |
| Body-panel fixing kits | 5G0898615 (bonnet); 5G0898625 (front wing); 5G0898619 (front door); 5G6898623 (rear bumper) | body panels | Kit |
| Engine-cover ball studs/grommets | NONE FOUND (specific PN) | engine cover | — |
| Hose spring clamps | NONE FOUND (specific PN) | cooling hoses (R9: OE spring clamps preferred) | Reusable |
| Cable-tie mounts | NONE FOUND (specific PN) | harness routing | — |

Push rivets (N0385012/N0385494), fir-tree clips and door-card clips are
single-use in practice — they usually break on removal and should be
replaced.

## 8. Fastener material / coating notes

**Property classes:** 8.8 (general brackets, smooth-face hub bolt), 10.9
(suspension, driveline, mounts, ribbed hub bolt), 12.9 (rare,
high-stress). The class is stamped on the head. Per the Bentley-quoted
split, the two hub-bolt torques map directly to grade: *"Grade 8.8 is
200 Nm plus 180 degree turn; Grade 10.9 (usually 12-point with ribbed
flange) is 70 Nm plus 90 degree turn"* — which is why the smooth-face
and ribbed variants must be physically distinguished before torquing.

**Coatings:** modern VW fasteners are largely zinc-flake
(Delta-Protect-type) for corrosion resistance; silver/black flake
finishes are common on suspension/subframe bolts.

**Why TTY stretches:** torque-to-yield bolts are tightened past their
elastic limit so the shank yields plastically, giving a consistent high
clamp load that resists loosening; the trade-off is single-use.

**Corrosion reality on a ~92k UK car:** seized rear-toe eccentrics (R7)
and jacking-point/subframe corrosion (R11) are the norm; XZN and Torx
recesses pack with rust and round out — heat, penetrating oil and
correct-fit tools are essential; plan to renew all TTY/angle bolts and
any clip disturbed.

## 9. Source disagreements / open flags

- **Wheel bolts 120 vs 140 Nm:** FIXED (R7) = **120 Nm**, quoted
  verbatim from the VW Golf owner's manual: *"The tightening torque for
  wheel bolts for steel and alloy wheels is 120 Nm."* However, VW Vortex
  owners cite an updated manual figure of **140 Nm (103 lb-ft) "on page
  284"** for the Mk7/Mk8 R. Keep the FIXED 120 Nm; flag the 140 Nm
  variant.
- **Hub bolt angle (smooth-face):** FIXED (R6) = **200 Nm + 180°**
  (corroborated by audi-sport.net: *"200 Nm then 180 degrees"* for the
  non-ribbed WHT005437). One ElsaWin reproduction gives **200 Nm +
  90°**. Do not overwrite FIXED; flag the +90° variant.
- **DSG drain plug:** FIXED (R5) = 40 Nm; mygolfmk7.com
  (MQB-manual-derived) = 45 Nm. Flag.
- **Rack-to-subframe:** FIXED (R7) = 50 Nm + 90°; mygolfmk7 = 70 Nm +
  90°. Flag.
- **Rear ARB clamp:** FIXED (R7) = 25 Nm + 90°; mygolfmk7 = 20 Nm +
  90°. Flag.
- **Front caliper guide bolts:** FIXED (R8) = 30 Nm; mygolfmk7 = 35 Nm.
  Flag.
- **Inner CV / driveshaft-flange bolt:** brief premise "40 Nm"
  **corrected** — ElsaWin-quoted spec is 10 Nm diagonal then **70 Nm for
  M10** (the 10 → 40 Nm pattern applies to M8 shafts). Flagged as a
  correction, not a FIXED-point overwrite.
- **Cam-carrier torque (8 Nm + 90°):** longest-carried open flag; not
  resolved this brief — remains 8 Nm + 90° per R2 vs generic 10/15/20.
- **Lambda / V-band clamp / HPFP / DI-rail / rear-diff plug:** remain
  NONE FOUND for VW-official figures — the app must render these as
  honest gaps, not guesses.

## Recommendations (staged, actionable)

**Stage 1 — ship now (high-confidence data).** Seed the app with the
full master table exactly as above: FIXED (Rn) points verbatim, NEW
finds with their source tags, and NONE FOUND rows rendered as explicit
"no verified value — use fallback table / consult erWin" states. Wire
the generic torque-by-thread-size/property-class table (§3) as the
fallback any time a specific value is missing. Ship the
numbering-system explainer (§1) and drive-type glossary (§2) as
reference panels — the head-bolt XZN resolution and the
left-hand-thread flag on the coolant pump pulley are the two
highest-value "gotchas" for a lifelike model.

**Stage 2 — close the safety-critical gaps.** The single best route is
the **Bentley "Golf, GTI & Golf R Quick Reference Specification Book"
chassis volume** (NHTSA PDF MC-10122270-9999.pdf / ManualsLib 2857351)
for the strut-clamp, inner-tie-rod, ball-joint-clamp, top-mount and
hinge values, and **erWin Rep. Gr. 24** for HPFP/injector/DI-rail/G247
and lambda. The subagent identified a specific unretrieved VW document —
Scribd "D4B8039775C Propshaft and Rear Final Drive (Volkswagen R GmbH)"
— as the likely home of the rear-diff-end propshaft torque and the
rear-diff plug figure; obtain it via erWin for a definitive answer
rather than trusting the conflicting Haldex-specialist numbers.

**Stage 3 — physical verification on the actual car.** Before rendering
the hub bolt, confirm whether each side has the **smooth-face (200 Nm +
180°)** or **ribbed (70 Nm + 90°)** WHT005437 — a ~92k used car may
have mismatched sides. Confirm the exhaust flap/V-designation and
whether the physical V-band clamp is the OE screw-band type.

**Benchmarks that change the recommendation:** if the Bentley chassis
pages resolve items 1–4 of the gap list, promote those rows from NONE
FOUND to FIXED and drop Stage 2 for suspension. If a newly-found
primary source contradicts any FIXED (Rn) point (e.g., a definitive
140 Nm wheel-bolt spec for the R), **do not overwrite** — add it to the
disagreements block and surface both values in-app with their sources,
preserving project integrity.

## Caveats

- **erWin/ETKA/7zap were not directly reachable** in this pass
  (Cloudflare/paywall), so several MQB-manual values are cited from
  compilations (mygolfmk7.com, "pulled from MQB maintenance manuals")
  and OEM install guides (034Motorsport, COBB, IE) rather than the
  primary VW document. These are marked NEW and should be treated as
  manual-derived/forum-grade until confirmed against erWin/Bentley.
- **mygolfmk7.com and tighttorque.com** are convenience compilations;
  mygolfmk7 is GTI-focused (shared MQB hardware, but confirm any
  Golf-R-only items) and tighttorque flags some of its own rows
  "unverified." They were used for corroboration and gap-fill, never as
  the sole primary for a safety-critical value where a FIXED point
  exists.
- **Third-party torque charts (fastener PDFs, generic guides)** were
  used only for the fallback table sanity-check, never as a cited
  primary figure, per the brief.
- **NONE FOUND is deliberate and honest** — every such row marks a
  genuine absence of a trustworthy VW-specific figure; the app should
  render these as gaps, not fill them with generic guesses.
- **Property-class/coating notes** are general VW-practice statements;
  the exact class and coating of any individual fastener should be read
  from the head marking on the physical part.
