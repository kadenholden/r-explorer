# R2 return — EA888 Gen 3 (CJXC) cylinder head & valvetrain

Deep-research return received 2026-08-14 (operator-run task, delivered as
PDF; transcribed here). Scope per the PDF's own title: "R2 — Cylinder
Head & Valvetrain: VW Golf R Mk7 (2014 Pre-Facelift, EA888 Gen 3, CJXC)".

## TL;DR

- **The carried head-bolt torque flag is RESOLVED:** the EA888 Gen 3 2.0T
  uses a **six-step renew-and-yield sequence — 40 Nm → 80 Nm → slacken
  180° → 50 Nm → 90° → 90°, with new (torque-to-yield) bolts** (Spoolas
  EA888 Gen3 tightening-torque table, which reproduces the erWin/Bentley
  values, consistent across all 2.0L power classes incl. 272 hp/200 kW).
  Both circulating aggregator figures are WRONG for this engine:
  Gumtree's "40 Nm + 90° + 90°" and "60 Nm + 180°" conflated other
  generations/engines.
- **AVS (two-stage valve lift) sits on the EXHAUST camshaft** of the
  2.0L; both cams have continuous vane-type phasers. Actuators are
  **F366–F373**, the intake cam-timing solenoid is **N205 (06L109257H)**,
  and cam sensors are **G40 (exhaust) / G300 (intake)** — all confirmed
  against Audi eSSP 920243, which states verbatim: *"Only the 2.0L engine
  will have a continuously adjustable exhaust camshaft and AVS."*
- **The Gen 3 head has no bolt-on valve cover with a flat gasket:** the
  "cam cover" is a **camshaft bearing bridge/ladder (06K103144D)** sealed
  to the head with anaerobic sealant, and the PCV/oil separator
  (06K103495-series) is a **separate bolt-on module**. The owner's oil
  leak is almost certainly the cam-bridge sealant surface and/or a
  ruptured PCV diaphragm — both documented Gen 3 failure modes.

## Key Findings

**Head-bolt torque resolved.** Workshop-derived data (Spoolas,
reproducing the erWin/Bentley EA888 Gen3 fastener tables) gives one
cylinder-head procedure identical across every 2.0L power class: renew
bolts, then 40 Nm → 80 Nm → slacken 180° → 50 Nm → 90° → 90°. This is a
torque-to-yield / stretch-bolt procedure — bolts MUST be replaced. The
aggregator figures are demonstrably unreliable: Gumtree's own "reference
chart" says *"Cylinder head bolts: Tighten in stages (e.g., 40 Nm + 90°
+ 90°)"* while its Q&A page says *"the EA888 head bolts need 60 Nm plus
a 180-degree turn"* — two contradictory numbers on the same low-grade
source, neither matching the Gen 3 workshop tables.

**AVS is on the exhaust cam.** Audi eSSP 920243 (openly hosted on
static.nhtsa.gov, doc MC-10122162-9999) states in its 2.0L
technical-features table "Audi valvelift system — for exhaust valves:
yes," and in the cylinder-head section labels item 3 "Camshaft
Adjustment Actuators F366–F373 (2.0L only)" mounted over the exhaust
camshaft. Each exhaust valve's lobe is a two-profile (small/large)
sliding cam element. Per Australiancar.reviews, *"At low engine speeds
(up to around 3100 rpm), the small profile cam lobe contour was used"*
to prevent exhaust back-flow during valve overlap; the large profile
takes over at high rpm. *(citation chips: nhtsa, nhtsa)*

**Phaser ranges (contested).** Australiancar.reviews states *"The intake
camshaft could be continuously adjusted over a range of 30 degrees
relative to the crankshaft, while the exhaust camshaft could be adjusted
over a range of 60 degrees."* Note this attribution is contested — some
enthusiast forums report the inverse (intake 60° / exhaust 30°). Flagged
as an open ambiguity.

**Valvetrain architecture.** DOHC, 4 valves/cylinder, roller-finger cam
followers on hydraulic lash-adjuster support elements (no manual
clearance service). Both cams chain-driven from the crankshaft.
Sodium-cooled hollow exhaust valves; solid-stem intake valves.

**CJXB vs CJXC.** No mechanical difference in head/valvetrain hardware
was found — the difference is emissions/calibration and market (CJXB =
North American/secondary-air, SULEV/LEV3 markets; CJXC =
ECE/rest-of-world, 300 PS). Both are Gen 3 2.0L high-output with AVS on
the exhaust cam and shared castings, camshafts, valves and phasers.

**Injection type / carbon.** The pre-facelift CJXC is
**direct-injection (FSI) only** — the dual (FSI+MPI) system arrived with
later Gen 3B/evo engines. This is why intake-valve carbon build-up is a
real issue on this car (already walnut-blasted): there is no port
injector to wash the intake-valve backs.

**Golf R vs GTI valvetrain differences.** Per Australiancar.reviews, the
Golf R (CJXC/CJXB) received over the GTI: *"The exhaust valves were
nitrided and had a higher Ni content; The exhaust valve seat rings were
upgraded for improved temperature stability and wear resistance; Revised
exhaust camshaft timing."* Sodium-cooled hollow exhaust valve
construction applies across the family.

## Parts table

(The PDF delivers this as pipe-delimited rows with the header: name |
oem_part_number (or NONE FOUND) | qty | parent assembly | sub-assembly |
material | torque (Nm + angle + TTY/replace?) | fitted-position note |
known failure modes | source URL/document — reformatted here unchanged.)

| Part | OEM number (or NONE FOUND) | Qty | Parent assembly | Sub-assembly | Material | Torque (Nm + angle + TTY/replace?) | Fitted-position note | Known failure modes | Source URL/document |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Cylinder head casting (bare) | 06K103063-series (assy 06K103063AP w/ valves+springs, supersedes 06K103264) | 1 | Cylinder head | Head casting w/ IEM | Aluminium alloy | head-to-block: 40→80→slacken 180°→50→90°→90°, renew bolts | Integrated water-cooled exhaust manifold cast into head; freeze/core plugs + integral-manifold studs | IEM coolant cross-leaks (rare); warping if overheated | dealer-catalogue parts.vw.com (06K103063AP); workshop-manual Spoolas |
| Cylinder head gasket | 06K103383K (supersedes 06K103383E, 06L103383) | 1 | Cylinder head | Head/block joint | Multi-layer steel (MLS) | n/a (clamped by head bolts) | Locating dowels; no front/back marking but must align to dowels; oil/water holes must index | Combustion/coolant leak if reused or head not flat (≤0.05 mm) | dealer-catalogue parts.vw.com (06K103383K); vendor Amazon MLS listing |
| Cylinder head bolt (TTY) | NONE FOUND (no single OEM VW P/N surfaced; sold as ELRING/AJUSA sets, e.g. ELRING 820458) | 10 (typ.) | Cylinder head | Head fasteners | Steel, torque-to-yield | 40→80→slacken 180°→50→90°→90°, RENEW | M10 stretch bolts; centre-out diagonal sequence | Loss of clamp load if reused | vendor eBay ELRING set; workshop-manual Spoolas |
| Core/freeze plug | NONE FOUND | several | Cylinder head | Casting plugs | Steel/brass | n/a | Freeze plugs in head casting (SSP item 16) | Corrosion weeping (rare) | SSP 920243 (freeze plug item 16) |
| Head locating dowels | NONE FOUND | 2 | Cylinder head | Head/block alignment | Steel | n/a | Index head gasket + head to block | n/a | SSP 920243 (design) |
| Intake valve | 06K109601 (var. 06K109601B; old 06D109601M) | 8 | Valvetrain | Intake side | Steel, chrome-plated, solid stem | n/a | Head Ø ~33.85 mm, stem ~6 mm, length ~104 mm (aftermarket-measured; OEM dims not published) | Carbon build-up on DI-only CJXC (walnut blast) | dealer-catalogue parts.vw.com (06K109601); vendor Supertech/Amazon dims |
| Exhaust valve (sodium-cooled) | 06K109611 (old 06D109611H / 06D109611L) | 8 | Valvetrain | Exhaust side | Hollow, sodium-filled, tempered; Golf R nitrided + higher-Ni | n/a | Head Ø ~28 mm, stem ~6 mm, length ~102 mm (aftermarket-measured) | Thermal fatigue at very high EGT/track use | dealer-catalogue parts.vw.com (06K109611); vendor FCP/BAR-TEK; Australiancar.reviews (nitrided/high-Ni) |
| Intake valve stem seal | 057109675 (2014 early build to 09/29/2014: combined 036109675A) | 8 | Valvetrain | Valve guide top | Viton/rubber-steel | n/a | Intake side; early cars used single combined seal | Hardening → oil-down-guide blue smoke on start | dealer-catalogue parts.vw.com |
| Exhaust valve stem seal | 06L109675C (2014 early build: combined 036109675A) | 8 | Valvetrain | Valve guide top | Viton/rubber-steel | n/a | Exhaust side (06L109675C from 03/01/2016) | Hardening → blue smoke | dealer-catalogue parts.vw.com |
| Valve spring | NONE FOUND (no separate OEM P/N; supplied within head assy 06K103063AP) | 16 | Valvetrain | Per valve | Spring steel | n/a | Single spring per valve | Fatigue only at high rpm/aftermarket cams | dealer-catalogue parts.vw.com (head assy) |
| Valve spring retainer / collets (keepers) | NONE FOUND | 16 / 32 | Valvetrain | Spring top | Steel | n/a | Single-groove keepers | n/a | vendor Supertech (KPR-6S/7 aftermarket) |
| Valve seat (intake/exhaust) | NONE FOUND (integral pressed insert, not sold separately) | 16 | Cylinder head | Combustion chamber | Sintered alloy (Golf R upgraded exhaust seats) | n/a | Machined/reground at rebuild only | Recession at very high mileage/track | vendor FCP Euro; Australiancar.reviews |
| Valve guide | NONE FOUND (integral, machined; serviceable at rebuild) | 16 | Cylinder head | Valve bore | Sintered alloy | n/a | Inspect/replace at head rebuild | Wear → seal leak at high mileage | vendor APR crate-engine build notes |
| Roller-finger cam follower | NONE FOUND (OEM P/N not exposed; 16 per head) | 16 | Valvetrain | Cam-to-valve | Steel w/ needle-bearing roller | n/a | Between cam lobe and valve/HVA | "Tick" if HVA bleeds down | vendor STR Performance kit; SSP item 6 |
| Hydraulic lash adjuster / support element | NONE FOUND (OEM P/N not exposed; 16 per head) | 16 | Valvetrain | Follower pivot | Steel, oil-fed | n/a | Auto lash take-up | Cold-start tick if worn/low oil | vendor STR Performance kit; SSP item 7 "support element" |
| Intake camshaft | 06K109021 → current 06K109021M (supersedes 06K109021H/L) | 1 | Valvetrain | Intake | Assembled/hydro-formed steel | cam sprocket/gear 14 Nm (see torque section) | Single-lift; continuous phaser at front | First-2-lobe wear (oil-channel bearing-cap design flaw) | dealer-catalogue parts.vw.com; vendor ShopDAP |
| Exhaust camshaft (AVS) | 06K109022S (Golf R, to 06/13/2016; later 06K109022BR) | 1 | Valvetrain | Exhaust | Assembled steel w/ sliding cam elements | cam gear 14 Nm | Two-stage lift (AVS) sliding elements per exhaust valve; small profile to ~3100 rpm | AVS pin/actuator faults; lobe wear | dealer-catalogue parts.vw.com (06K109022S); Australiancar.reviews |
| Intake cam VVT phaser (adjuster) | integral to 06K109021M (not sold separately) | 1 | Valvetrain | Intake front | Steel vane rotor + housing | central bolt per manual | Vane-type; ~30° crank range (contested) | Rattle on cold start if worn/low oil | vendor ShopDAP; SSP item 5; Australiancar.reviews |
| Exhaust cam VVT phaser (adjuster) | integral to exhaust cam (2.0L only) | 1 | Valvetrain | Exhaust front | Steel vane rotor + housing | per manual | Vane-type; ~60° crank range (contested) | Rattle/cam-adjuster codes | SSP 920243 item 10; Australiancar.reviews |
| Intake cam control valve N205 | 06L109257H (supersedes 06L109257B/D/F; 06K109259-family) | 1 | Valvetrain | Cam phaser oil control | Steel/solenoid | 3× T30 = 9 Nm | Centre of intake cam sprocket at front | Screen clog → rough idle, EPC, P0011 | vendor STR Performance; forum SEATCUPRA.NET |
| AVS/valvelift actuators | F366–F373 (06E103697-series, e.g. 06E103697M; verify) | up to 8 | Valvetrain | Exhaust cam over sliding elements | Electromagnetic pin actuators | NONE FOUND | Shift exhaust lobe carriers between lift stages | Cam-shift actuator faults (e.g. P11AC00) | SSP 920243 (F366–F373); forum VW Vortex (06E103697M) |
| Camshaft position sensor G40 | 04C907601K (Golf R, current; wider Golf 06L905163C) | 1 | Sensors | Exhaust cam front | Hall-effect | ~3–10 Nm (see note) | Reads exhaust cam | P0341; oil intrusion at connector | dealer-catalogue parts.vw.com (04C907601K) |
| Camshaft position sensor G300 | NONE FOUND (distinct P/N) | 1 | Sensors | Intake cam | Hall-effect | ~10 Nm | Reads intake cam (SSP item 1) | Timing-implausible codes | SSP 920243 item 1 |
| Camshaft bearing bridge / cam carrier ("ladder") | 06K103144D (var. 06K103144A/B; later 06L103144H) | 1 | Cylinder head | Cam carrier / "valve cover" | Aluminium | 8 Nm + 90°, renew, diagonal in stages (see disagreement note) | Bolts to head with anaerobic sealant (no gasket) | Sealant degradation → oil leak (owner's leak) | vendor FCP Euro / UroTuning (06K103144D); workshop-manual snippet |
| Cam-bridge / head anaerobic sealant | VW D174003M2 (per forum) | as req | Cylinder head | Cam-bridge joint | Anaerobic flange sealant | n/a | Replaces conventional gasket | Weeping oil leak | forum ShopDAP / JustAnswer |
| Upper timing cover | NONE FOUND (single P/N; sold in reseal kits) | 1 | Timing drive | Front cover | Plastic | torx, one-time-use bolts advised | Covers cam adjusters at front | Warps/weeps oil (common) | vendor ShopDAP; blog jenningsga.com |
| PCV / oil separator (breather valve) | 06K103495BL (latest; chain 06K103495 → AC/AH → AP → BK → BL → BM) | 1 | Crankcase ventilation | On top of cam cover | Glass-reinforced plastic + rubber diaphragm | ~M6 bolts (7 screws) | Bolts to cam bridge; separate module, NOT integrated | Diaphragm rupture → whistle, rough idle, oil leak, track smoking | dealer-catalogue checkeredflag/myvwpart (06K103495BL); vendor eEuroparts/FCP |
| PCV/oil-separator gasket | 06E103484-series (separator seal) | 1 | Crankcase ventilation | Separator-to-cover | Rubber | n/a | Renew on separator R&R | Leak if reused | vendor FCP/awesomegti |
| Timing chain (cam drive) | 06K109158-series (e.g. 06K109158AD) | 1 | Timing drive | Crank-to-cam | Steel roller/inverted-tooth | n/a | Drives both cams off crank | Stretch at very high mileage (Gen3 improved) | vendor eBay/Amazon kits |
| Crank sprocket | 06H105209-series (e.g. 06H105209AT) | 1 | Timing drive | Crank | Steel | per manual | Drives timing + balance chains | Wear (rare) | vendor Amazon kit |
| Timing chain tensioner (cam) | 06K109467P (Golf R; supersedes 06K109467K, 06H109467-series) | 1 | Timing drive | Chain slack side | Steel, hydraulic + ratchet | NONE FOUND (Gen3 manual value not extracted) | Near left guide rail | Bleed-down/failure → chain skip (Gen1/2 saga; Gen3 revised) | dealer-catalogue parts.vw.com (06K109467P); forum |
| Timing chain guide/slide rails | 06H109469-series + 06H109509-series | 3–4 | Timing drive | Chain guides | Composite/plastic on steel | ~20 Nm (forum, unverified) | Fixed + tensioning rails | Wear/cracking at high mileage | vendor Amazon kit; forum |
| Spark plug | 06K905601B (NGK PLFER7A8EG; supersedes 06K905601 / 601D) | 4 | Ignition | Combustion chamber | NGK laser platinum | ~30 Nm (18–21.6 lb-ft alu) | Gap 0.8 mm (0.031"), heat range 7 | Wear → misfire; strap breakage with wrong plugs | dealer-catalogue parts.vw.com (06K905601B); vendor NGK/Walmart |
| Ignition coil | 06H905110P (Golf R per VW dealer; GTI/family often 06K905110K) | 4 | Ignition | On spark plug | Plastic/epoxy | ~10 Nm coil bolt | Pencil coil-on-plug | Misfire (common wear item) | dealer-catalogue parts.vw.com (06H905110P); vendor eBay (06K905110K) |

*(citation chip at end of table: Volkswagen Parts + …)*

## How the System Works (head / valvetrain narrative)

**Integrated Exhaust Manifold (IEM) & cooling.** The Gen 3 head is a
clean-sheet aluminium casting with the exhaust manifold cast INTO the
head and surrounded by coolant jackets. Exhaust gas is routed through
internal ducts to the turbocharger flange, and the coolant flowing
around them (a) speeds warm-up, cutting cold-start emissions, and (b)
cools exhaust gas under full load, eliminating the enrichment older
engines needed to protect the turbine — improving both fuel economy and
component life. The head also feeds the oil cooler via its coolant
return.

**Chain drive layout.** A single chain from the crankshaft sprocket
drives both camshafts at the flywheel end of the engine; a bolt-in
hydraulic tensioner with a ratchet mechanism and a sprung tensioning
rail keeps the slack side loaded, running against fixed and moving
composite guide rails. Separate chains drive the balance shafts and the
regulated oil/water-pump module. Because tensioning force was reduced
for friction, VW mandates a **chain adaptation procedure via scan tool
after any timing work**, and special timing-lock tools
(T10352/T10355/T40196/T40271) are required.

**VVT + AVS operation.** Both camshafts carry vane-type hydraulic
phasers. Oil flow to the phasers is metered by camshaft-adjustment
solenoid valves; the intake solenoid is **N205 (06L109257H)** sitting in
the centre of the intake cam sprocket. The intake cam advances/retards
continuously (~30° crank per Australiancar.reviews; range attribution
contested); on the 2.0L the exhaust cam is ALSO continuously variable
(~60° per the same source). On top of phasing, the **exhaust** camshaft
carries the **Audi valvelift system (AVS)**: each exhaust valve's lobe
exists as a two-profile (small/large) sliding cam element on a splined
shaft. Electromagnetic actuators **F366–F373** push a pin into a spiral
groove to axially shift the lobe carrier — small profile up to
~3100 rpm (better scavenging/torque, less exhaust back-flow during
overlap), large profile at high rpm for power. Valve motion reaches the
valves through **roller-finger followers pivoting on hydraulic
lash-adjuster support elements** — self-adjusting, so there is no manual
valve-clearance service. *(citation chips: Australiancar, Australian
Car.Revi…)*

**PCV path.** Blow-by gas rises into the cam-bridge/cover area, passes
through the bolt-on oil separator (06K103495-series) whose spring-loaded
rubber diaphragm regulates crankcase pressure, drops oil back to the
sump, and routes clean vapour to the turbo inlet under boost or the
intake manifold under vacuum. When the diaphragm tears, pressure
regulation is lost: symptoms are a whistle, rough idle, oil pushed past
seals (rear main especially), and smoking under hard cornering — the
classic Gen 3 PCV failure. Because the CJXC is direct-injection only,
oil vapour reaching the intake valves also accelerates carbon build-up
(no port injector to wash them). *(citation chip: eEuroparts + 2)*

## Torque & Tightening-Sequence Section

- **Cylinder head bolts (RESOLVED):** renew bolts; **40 Nm → 80 Nm →
  slacken 180° → 50 Nm → 90° → 90°.** Torque-to-yield. Sequence per VW
  is centre-outward, diagonal/alternating (numbering runs from the two
  centre bolts outward in a spiral). Source: Spoolas EA888 Gen3 table
  (matches erWin/Bentley). Neither "40+90+90" nor "60+180" applies to
  Gen 3.
- **Camshaft bearing bridge / cam carrier:** DISAGREEMENT — the erWin
  snippet indicates **8 Nm + 90°, renew, diagonal sequence in stages**
  for the relevant bolt; Spoolas' generic cam-carrier line lists M6 =
  10 Nm / M7 = 15 Nm / M8 = 20 Nm. Treat 8 Nm + 90° (renew) as the
  head-specific value pending the page-21 table; bolts are one-time-use.
  *(citation chip: PDFCOFFEE.COM)*
- **Cam cover / cylinder-head cover bolts:** NONE FOUND verbatim (manual
  refers to a page-21 table not extracted). Do not guess.
- **Timing chain tensioner bolt:** NONE FOUND in Gen 3 manual; secondary
  sources conflict (10 Nm vs 50 Nm + angle) — unverified.
- **Timing chain guide rail bolts:** ~20 Nm (forum/DIY, unverified
  against Gen 3 manual). *(citation chip: Custom PC Guide)*
- **Camshaft sprocket/gear:** 14 Nm (Spoolas, 200 kW class).
- **Camshaft control valve N205:** 3× T30 = 9 Nm. *(citation chip:
  SEATCUPRA.NET)*
- **AVS actuators (F366–F373):** NONE FOUND.
- **Spark plugs:** ~30 Nm (NGK: 18–21.6 lb-ft in aluminium).
- **Ignition coil hold-down:** ~10 Nm (family value).
- **Generic (from erWin Gen 3 table):** M6 = 10 Nm, M8 = 20 Nm, M10 =
  45 Nm, M12 = 65 Nm. *(citation chip: Scribd)*

## Spark-Plug Spec Block

- OEM: **06K905601B** (VW) = **NGK PLFER7A8EG** (NGK 94833),
  laser-platinum, projected fine-wire.
- Gap: **0.8 mm (0.031").** Heat range: **7** (NGK scale). Thread
  14 mm × 1.25, reach 26.5 mm, resistor 1 kΩ.
- Change interval: **60,000 miles** — per ShopDAP: *"Volkswagen's
  official service schedules for both the Mk7 GTI and the Mk7 Golf R
  dictate that spark plugs should be changed every 60,000 miles"*; EMD
  Auto confirms the OE NGK PLFER7A8EG carries a *"Recommended
  replacement interval [of] 60,000 miles."* Reduce if tuned.

## Timing / Tensioner Revision-History Subsection

Gen 1/2 EA888 suffered the well-known tensioner-failure saga: the early
hydraulic tensioner could bleed down and ratchet-fail, letting the chain
skip and causing valve-to-piston contact (the reason the family earned
its reputation). For Gen 3, VW re-engineered the tensioner for the lower
oil pressure of the regulated pump and reduced chain tensioning force,
with an improved check valve and more robust ratchet limiting bleed-down
(SSP 920243: *"the chain tensioners have been optimized for the reduced
oil pressure … the tensioning force of the chains has been reduced"*).
The Golf R tensioner currently supersedes to **06K109467P** (earlier
06K109467K / 06H109467-series). Gen 3 is markedly more reliable, but the
tensioner remains a hydraulic wear part and stretch/skip cases still
appear at high mileage or on neglected oil; note that on Gen 3 VW
removed the chain-stretch adaptation readout that Gen 1/2 owners relied
on, so diagnosis leans on cold-start rattle and timing DTCs
(P0016/P0017/P0341). *(citation chip: Audi TT Forum)*

## PCV / Valve-Cover Revision-History Subsection

On Gen 3 the "valve cover" is really the **camshaft bearing bridge
(06K103144D)** sealed to the head with anaerobic sealant — so a
"valve-cover oil leak" is usually a degraded cam-bridge sealing surface
and/or a leaking upper timing cover, requiring the bridge/cover to be
removed, cleaned and re-sealed (with new one-time-use fasteners), not a
simple gasket swap. The **PCV/oil separator is a separate bolt-on
module** whose revision chain runs roughly 06K103495 → 06K103495AC/AH →
06K103495AP → 06K103495BK → 06K103495BL → 06K103495BM, each addressing
diaphragm rupture and hard-cornering oil carry-over; the "BL"/"BM"
revisions (2018+/S4) are the ones owners retrofit, and a further common
upgrade is fitting the later Gen 4 (evo4) PCV. For the owner's active
leak, the correct approach is: (1) test/replace the PCV with the latest
revision, and (2) if the leak persists, re-seal the cam bridge and renew
the upper timing cover. *(citation chip: ShopDAP + 4)*

## Exploded-Diagram / Dimensioned-Drawing URL List

- Audi eSSP 920243 (full head/valvetrain/IEM/AVS/chain cutaways,
  exploded head diagram with numbered key):
  https://static.nhtsa.gov/odi/tsbs/2014/MC-10122162-9999.pdf
- erWin/Bentley "Engine TFSI EA888 Gen3 Service Manual" (Ed. 12.2019)
  exploded views + torque tables:
  https://www.scribd.com/document/465533887/engine-tfsi-ea888-gen3-service-manual-eng-pdf
- VW dealer catalogue diagram trees (Golf R): parts.vw.com Golf R →
  Engine → Camshaft & Timing / Cylinder Head & Valves (e.g. head assy
  06K103063AP, cam 06K109021, exhaust cam 06K109022S).
- Vendor dimensioned valve data (aftermarket geometry reference):
  https://ipg-supertech.com/products/supertech-intake-exhaust-valves-for-volkswagen-golf-r-ea113-ea888-16v-2-0l-tfsi-turbocharged-engines
- Australiancar.reviews CJXC/CJXB engine write-up (valvetrain/AVS/phaser
  ranges, R-vs-GTI valve differences):
  https://australiancar.reviews/vw-mk-7-golf-r-cjxc-cjxb-engine-ea888-gen-3/

## Special-Tools List (head / timing work)

- Timing-lock/camshaft set: **T10352, T10355, T40196, T40271**
  (confirmed R1).
- Chain adaptation via scan tool (VAS/ODIS) — mandatory after any chain
  work.
- Camshaft/valve-spring compressor and cam-carrier alignment tools (per
  erWin head-repair group).
- Ignition-coil puller (MQB) and 10 mm flat coil-nut wrench; spark-plug
  socket.
- Anaerobic sealant (VW D174003M2) for the cam-bridge/head joint.

## Recommendations

1. **Model the head-bolt sequence as six discrete stages** (40 → 80 →
   −180° → 50 → 90° → 90°) with TTY bolts flagged "replace." This is the
   authoritative resolution; drop the two aggregator figures from the
   build notes.
2. **Represent the "valve cover" as a cam-bridge/ladder (06K103144D)
   plus a separate PCV module (06K103495BL)**, not a conventional cover
   + gasket — this is the single biggest geometry/accuracy correction
   for R2 and explains the owner's leak.
3. **Put AVS sliding cam elements + F366–F373 actuators on the exhaust
   camshaft**, single-lift lobes on the intake cam, and N205 in the
   intake sprocket centre.
4. **For the still-open torque values** (cam-cover bolts, tensioner
   bolt, guide-rail bolts), read them directly from the erWin/Bentley
   PDF page-21+ head-repair tables before finalizing; do not adopt the
   conflicting forum numbers.
5. **Benchmarks that would change the model:** if a VIN-specific
   parts.vw.com "Cylinder Head & Valves" diagram exposes the
   roller-follower/HVA and valve-spring P/Ns, add them; if the erWin
   table yields the cam-cover/tensioner torques, replace the "NONE
   FOUND" rows; if a primary source resolves the 30°/60° phaser
   attribution, lock the phaser ranges.

## Caveats & Open Flags

- **RESOLVED — head-bolt torque:** 40 → 80 → slacken 180° → 50 → 90° →
  90°, renew bolts (Spoolas/erWin). Both prior candidate figures
  ("40+90+90" and "60+180") explicitly rejected as aggregator errors.
- **Cam-carrier torque disagreement:** 8 Nm + 90° (erWin snippet) vs
  M6/M7/M8 = 10/15/20 Nm (Spoolas generic). Flag until the page-21
  table confirms.
- **Phaser-range attribution contested:** intake 30° / exhaust 60°
  (Australiancar.reviews) vs the inverse reported on some forums.
  Unresolved.
- **NONE FOUND (genuinely unverifiable here):** OEM head-bolt single
  P/N; valve-spring/retainer/collet/seat/guide OEM P/Ns;
  roller-follower & HVA OEM P/Ns; AVS actuator P/N; cam-cover-bolt /
  tensioner-bolt / guide-rail-bolt torques from the Gen 3 manual.
- **Ignition-coil ambiguity:** the VW dealer catalogue shows
  **06H905110P** for the Golf R while the GTI/family is frequently
  **06K905110K** — confirm against the car's VIN. The older red/grey
  coil supersessions predate this Gen 3 coil, so they are not part of
  the CJXC chain.
- **CJXB vs CJXC:** no head/valvetrain mechanical difference found
  (emissions/calibration/market only); the expected difference is
  secondary-air/OBD calibration in CJXB markets.
- **Aftermarket valve dimensions** (Supertech: intake 33.85 mm head /
  ~6 mm stem; exhaust 28.0 mm head / ~6 mm stem) are used as geometry
  proxies because VW does not publish OEM valve dimensions.
