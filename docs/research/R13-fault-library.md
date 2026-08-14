# R13 return — Fault library & problem animations

Deep-research return received 2026-08-14 (operator-run task, delivered as
PDF; transcribed here). Scope: 2014 VW Golf R Mk7 (5G) · CJXC EA888 Gen 3 ·
DQ250 (0D9) DSG · Gen 5 Haldex · ~92k miles.

Transcription notes: the source PDF is image-only (18 pages of screenshots).
Inline link chips in the source (boxed links with no visible URL) are noted
as "(link chip: …)". The summary table is clipped at the right edge in the
source screenshots — one column beyond "Assembly fix" exists but is
unreadable; marked [truncated in source].

## TL;DR

All twelve faults are catalogued below in the fixed five-part animatable
structure (codes+meaning / animation spec / symptoms in onset order /
diagnostic tree with expected values / fix ladder with decision points),
each with a severity rating and a 92k-mile likelihood note. The owner's
live fault (#3, PCV diaphragm) is the single best explanation for **both**
the idle shake and the oil leak: the Gen 3 "white-cap" PCV regulates
crankcase vacuum to ~100 mbar (~3 inHg) at idle, and a torn diaphragm
passes far more of manifold vacuum to the crankcase (up to ~22 inHg /
~745 mbar), producing a hard-to-remove oil cap, whistle/hiss, rough idle
and an oil weep that mimics other leaks.

Highest-likelihood items at 92k UK miles are the PCV diaphragm (#3, live),
the composite water-pump/thermostat housing leak (#2, which VW has
"officially recogniz[ed]... as a design fault" per AUTODOC UK), the front
LCA rear console bushes (#11, the MOT-advisory classic), and the Haldex
strainer clog (#7, no serviceable filter). The timing-chain tensioner (#4)
is honestly LOW-risk on Gen 3.

Carbon build-up (#6) accumulates SLOWER on this EU dual-injection CJXC
than on NA DI-only cars — that severity difference is preserved throughout
and NA claims are deliberately not imported.

## Summary table

| # | Fault | Key codes | Severity | Likelihood @92k | Cheapest fix | Assembly fix | [truncated in source] |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | P2015 intake flap | P2015 (VAG 18447/008213) | fix-soon | Medium (walnut-blast history) | Group 142 adaptation, £0 parts | Manifold 06L133201 | [truncated in source] |
| 2 | Water pump / thermostat | P2681, P00B7, P0128 | fix-soon → stop if overheating | High | Housing/pump 06L121111P | Metal-impeller upgrade | [truncated in source] |
| 3 | PCV diaphragm (LIVE) | P0171, P2187 (or none) | fix-soon | High | Diaphragm kit £15–35 | Module 06K103495BM | [truncated in source] |
| 4 | Timing-chain tensioner | P0016 / P0017 | drive-on (monitor) | Low on Gen 3 | Monitor MVB 93 | Chain kit + tensioner 06K109467P | [truncated in source] |
| 5 | HPFP wear | P0087, P310B, P2293 | fix-soon → stop if limp | Low–Medium | Cam follower/tappet | HPFP 06L127025R→T | [truncated in source] |
| 6 | Carbon build-up | P0300–P0304 (cold) | drive-on | Low–Medium (dual inj.) | Walnut blast | — | [truncated in source] |
| 7 | Haldex strainer/pump | P16671/P16668/P16666/P16670, C111307 | fix-soon | High if unserviced | Fluid + strainer clean | Pump 0CQ598549 | [truncated in source] |
| 8 | DSG mechatronic accumulator | P0746/P0776/P1814/P2711 etc. | stop-driving if limp | Medium | Solenoid service | Genuine mechatronic ~£5k | [truncated in source] |
| 9 | IS38 wastegate/shaft | P2563 | drive-on → fix-soon | Medium | Rod re-set 3.6 V | Turbo 06K145702J | [truncated in source] |
| 10 | Coil / misfire | P0300–P0304 | fix-soon | High (wear) | Coil 06H905110P / plug 06K905601B | — | [truncated in source] |
| 11 | Suspension wear | none (mechanical) | fix-soon (MOT) | High | Drop links / bushes | LCA assembly | [truncated in source] |
| 12 | EPB faults | C10E2, 02435 | fix-soon | Low–Medium | Motor 3Q0998281 | Caliper 5Q0615423/424 | [truncated in source] |

**Cross-links:** PCV (#3) ↔ misfire (#10) ↔ carbon (#6); P2015 (#1) ↔
carbon/walnut-blast (#6); **ACC radar heat-soak already documented in
R10** — cross-reference only, flagged for future library expansion, not
re-derived here.

## Fault 1 — P2015 intake flap position implausible *(exemplar template)*

### (1) Fault code(s) + plain-English meaning

**P2015 / VAG 18447 / 008213** — "Intake Manifold Runner Position
Sensor/Switch Circuit Range/Performance Bank 1." The ECU sees the
swirl-flap position sensor reporting a position that doesn't match what it
commanded — the flap is stuck, or the ECU never learned the correct
end-stops. *(Ross-Tech wiki 18447/P2015/008213 — primary.)*

Related on this platform: P2004 (runner stuck open), P2014 (position
sensor); NHTSA TSB 24-18-01 groups P2004/P2014/P2015. *(NHTSA TSB —
primary; forum corroboration.)*

### (2) Animation spec

Cutaway of intake manifold (family **06L133201**, FP/FR) showing the
swirl-flap shaft across all four runners, driven by actuator **N316** with
position sensor **G336** on the RH side (behind the oil filter housing).

**Before (healthy):** shaft rotates smoothly; flaps sweep closed→open;
G336 wiper voltage glides ~4.5 V (closed) → ~1.2 V (open); MVB 142
"Actual" tracks "Specified" 0%→~99%. (link chip: Go-Parts)

**Failure Mode A — carbon binding:** animate brown carbon crust
accumulating on the shaft journals; the shaft binds; the flap judders and
stalls partway; G336 voltage freezes; MVB 142 "Actual" stuck (~70% is a
classic frozen value) while "Specified" moves. (link chip: Go-Parts)

**Failure Mode B — lost adaptation after walnut blast (THIS CAR):** parts
are clean and free, but the learned end-stops were wiped; on start the
flap oversweeps past expected travel; ECU flags "implausible." Visual cue:
flap moves fully and freely, yet the dash MIL lights — the fault is in
software memory, not mechanism.

No fluid path; MIL amber, no smoke, no leak.

### (3) Driver symptoms (onset order)

First: amber CEL/MIL, often no drivability change.

Developed: slight low-end flat spot / minor hesitation; occasional lumpy
cold idle.

Worst case: reduced-power feel if paired with other flap/vacuum faults;
MIL blocks MOT emissions readiness.

### (4) Diagnostic tree

**Addr 01 → Basic Settings → Group 142** — run intake-flap adaptation.
"ADP OK" = fixed (Mode B, this car's exact history); "ADP ERROR"/stuck
value = mechanism fault (Mode A). *(Ross-Tech wiki; go-parts P2015 pages —
forum/vendor grade for the numbers.)*

**MVB 142 live** — rev engine; Actual should sweep smoothly and match
Specified. Stuck/lagging = carbon or vacuum restriction.

**G336 voltage test** — KOEO ~4.5 V flaps closed, ~1.2 V pushed open; no
change when arm moved = dead sensor (bend-tab serviceable). *(go-parts
P2015 — forum/vendor.)* (link chip: Go-Parts)

**N316 solenoid resistance** ~25 Ω ±10 Ω; vacuum supply ~29 inHg at idle.
*(go-parts P2015 GTI 2018–24 — forum/vendor; sibling-model reference.)*

Physical: manually verify flap free travel; smoke-test intake for a
masquerading vacuum leak.

### (5) Fix ladder with decision points

**Cheapest:** Group 142 adaptation, **£0 parts** (£30–60 labour). For THIS
car — walnut-blast history — adaptation alone is the expected fix.

**Decision point → parts:** adaptation returns ERROR and MVB 142 stays
stuck after carbon clean → sensor/actuator or manifold fault.

**Assembly:** intake manifold **06L133201** (FP/FR family) if flap/sensor
integral and unserviceable; bend-tab repair on G336 first if applicable.

**Decision flips** when: adaptation error persists post-clean AND G336
voltage out of range → manifold/sensor replacement.

**Severity: fix-soon. Likelihood @92k: Medium** — elevated on THIS car
specifically because of the walnut-blast/adaptation history (fixed point
from R3).

## Fault 2 — Water-pump / thermostat housing leak

### (1) Fault code(s) + plain-English meaning

**P2681** — "Coolant Bypass Valve Control Circuit / Open" — ECU can't
control the coolant bypass valve; on Gen 3 the valve is integral to the
pump/thermostat module. *(go-parts P2681; vwforum — forum/vendor.)*
(link chip: VW Forum)

**P00B7** — "Engine Coolant Flow Low / Performance" — triggered when the
ECU detects a large temperature difference between radiator and engine
sensors (AUTODOC cites a >~68 °F / ~38 °C radiator-to-engine delta).
*(AUTODOC UK blog; VW Vortex P00B700 thread — forum/vendor.)*

**P0128** — coolant below thermostat regulating temperature. *(NHTSA TSB.)*

Electrical variant: coolant wicking into the **N493** actuator connector →
P2681/P00B7 even with the pump mechanically fine (multiple documented
fixes were connector-clean only). *(go-parts P2681; VW Vortex P00B700 —
forum/vendor.)*

### (2) Animation spec

Render the belt-driven pump with the integral **N493** rotary-valve module
(**06L121111P** current, CJXC suffix to VIN-verify) mounted low on the
block, largely **hidden UNDER the intake manifold** — the classic
misdiagnosis geometry.

**Stage 1 (crazing):** fine hairline crazing spreading across the black
composite housing under thermal cycling (VW's own legal documents concede
"inferior thermoplastic materials were used in water pump components," per
AUTODOC UK).

**Stage 2 (weep):** a coolant bead forms at the crack / pump-to-block
gasket, runs down the block face beneath the manifold, leaving a
**white/pink crystalline crust** as it dries (visual cue). Slow seep —
typically a gradual expansion-tank drop rather than a puddle.

**Stage 3 (electrical):** coolant tracks along the harness into the N493
5-pin connector; green corrosion on pins → intermittent CEL.

**Impeller-detach variant:** the plastic impeller hub slips/spins on its
shaft → circulation stops → cluster temp climbs toward red while the lower
radiator hose stays cold. **Wax safety thermostat opens at 113 °C as
fallback.**

Metal-impeller upgrade options (USP / BAR-TEK) shown as an alternate part
swap.

### (3) Driver symptoms (onset order)

First: faint sweet coolant smell after drives; slow expansion-tank level
drop; occasional cold-side CEL (P0128) with slow warm-up / weak cabin
heat.

Developed: visible crust under the manifold; temp needle wandering; **G62
(ECU) vs infotainment/cluster temp divergence** — the cluster gauge is
damped, G62 in VCDS shows the true swing.

Worst case: impeller detachment → rapid overheat → **stop-driving** to
avoid head-gasket/warp damage.

### (4) Diagnostic tree

**Cooling-system pressure test** (~1.4 bar hand pump) — watch for the drip
emerging under the manifold; the definitive physical test. *(FCP Euro /
general workshop.)*

**Addr 01 live temps** — compare **G62 coolant temp** vs radiator-outlet
sensor; a persistent >~15 °C mismatch supports the P00B7 flow fault.
*(AUTODOC blog — forum/vendor.)*

**Coolant circulation pump activation** MVB — normally a % value (~10%);
"N/A" can be normal on some cars, so don't over-read. *(VW Vortex P00B700 —
forum/vendor.)*

**Inspect N493 connector** for coolant contamination/corrosion — clean and
retest before condemning the module. *(go-parts P2681 confirmed-fix cases —
forum/vendor.)*

UV dye + borescope down behind the manifold to localise weep vs gasket.

### (5) Fix ladder with decision points

**Cheapest:** clean/dry the N493 connector if the fault is electrical
only — code clears, no parts.

**Decision point:** physical coolant crust/weep present → replace the
pump/thermostat module **06L121111P** (VIN-verify CJXC suffix). Module
bolts **9 Nm**; pulley **10 Nm + 90°, LEFT-hand thread** (fixed points
from R9).

**Assembly / upgrade:** on repeat failure (VW's replacements are the same
plastic), fit a **metal-impeller** pump (USP/BAR-TEK) — the decision flips
to upgrade on second failure.

**UK cost tier:** AUTODOC UK: "Repair costs typically range from £750 to
£1,250 if not covered under warranty." Indie is generally at the lower
end. *(AUTODOC UK — forum/vendor grade.)*

**Severity: fix-soon; stop-driving if overheating/impeller-detach.
Likelihood @92k: High** — AUTODOC UK: leaks "affect virtually all MK7
variants with 3rd generation EA888 engines, with VW officially recognising
the problem as a design fault," "predictably occur between 15,000 and
50,000 miles."

## Fault 3 — PCV diaphragm *(the owner's live fault — deepest treatment)*

### (1) Fault code(s) + plain-English meaning

**Often NO stored DTC** with a small tear — symptoms (rough idle, oil
weep, whistle) appear before any code. *(VW Vortex / VWROC cases — forum
grade.)*

**P0171 — System Too Lean (Bank 1)** — the torn diaphragm is an unmetered
air/vacuum leak; ECU adds fuel, long-term trims go lean-positive.
*(eEuroparts EA888 PCV guide; Stedmans Garage UK — forum/vendor.)*

**P2187 — System Too Lean at Idle (Bank 1)** — the most characteristic
code; the leak's effect peaks at idle where manifold vacuum is highest.
*(eEuroparts; Audizine — forum grade.)*

**P052E — Positive Crankcase Ventilation Regulator Valve Performance** —
exists generically but relies on a dedicated crankcase-pressure sensor;
**NONE FOUND** confirming the CJXC carries that sensor, so treat P052E as
**not confirmed** for this engine. *(Flagged conflict.)*

VAG 5-digit numeric equivalents for P0171/P2187 on this ECU: **NONE
FOUND** from a Ross-Tech source.

### (2) Animation spec — the centrepiece animation

The "valve cover" here is actually the **cam bearing bridge 06K103144D**
(anaerobic sealant, NO gasket), with a **SEPARATE PCV/oil-separator module
on top** (PN chain **06K103495 → BL/BM** current).

Cutaway the round PCV cap to reveal the **large rubber
pressure-regulating diaphragm** over its spring, plus the **two non-return
(check) valves** and the orange combi/flapper valve.

**Before (healthy regulating motion):** the diaphragm gently flexes
against its spring, modulating so crankcase vacuum holds at the **~100
mbar (~3 inHg, ~40 inH₂O)** Gen 3 "white-cap" target (older black-cap =
20 mbar). Show manifold vacuum (normally ~560–660 mbar / ~18–22 inHg)
regulated down to ~3 inHg at the crankcase. *(Karmakanix knowledgebase,
verbatim: "-100 millibar (-1.45 psi or 2.93 "Hg)"; AudiWorld B8, verbatim:
"If you have the white cap PCV (which you should), you should measure
around 100 mbar. If you're measuring more than that, the PCV is passing
too much intake manifold vacuum (which is normally 560-660 mbar), which is
why your oil fill cap is so hard to remove.")*

**Failure — diaphragm TEAR (this car):** a split propagates across the
rubber. With spring load lost, the diaphragm valve is pulled **wide
open**, passing far more of manifold vacuum straight to the crankcase —
Go-Parts: "A torn diaphragm... exposes the crankcase to full intake
manifold vacuum (up to 22 inHg or ~745 mbar), which is what causes the
extreme suction on the oil cap." Visual cues in sequence:

**Oil-fill cap sucked down hard** — a glove/tissue over the fill is pulled
taut and held (torn-diaphragm tell vs the mild flutter of a healthy one).

**Whistle/hiss** streaming from the split / bleeder hole.

**Rough, shaking, hunting idle** (surging ~800–1100 rpm) as unmetered air
enters — THIS is the owner's idle shake.

**Oil weep**: excess crankcase vacuum and blow-by push oil past seals; an
oil film creeps from the cam-bridge sealant line and rear main, dripping
onto hot components — the leak that **mimics** a cam-bridge or water-pump
leak (the owner's oil leak).

**Boost-side check-valve variant:** instead of the idle diaphragm, animate
a stuck/failed non-return valve → under BOOST, charge pressure back-feeds
into the crankcase; oil is pushed into the intake/intercooler, boost is
lost. Visual cue: oil misting the charge pipes, boost gauge falling
short — NOT an idle problem.

### (3) Driver symptoms (onset order)

First: faint whistle at idle; oil-fill cap noticeably hard to twist off;
slightly lumpy cold idle.

Developed: persistent **rough/shaking idle** (owner's symptom), oil
residue and drips around/below the engine (owner's symptom), mild
hesitation, worse MPG, possible P0171/P2187.

Worst case: severe crankcase over-pressure pushing the **rear main seal**
→ larger oil leak; boost-side variant → boost loss and oil-fouled
intercooler.

### (4) Diagnostic tree

**Crankcase vacuum test (primary):** pull the dipstick, insert a
rubber-tipped vacuum gauge (Mityvac / Harbor Freight), read at idle.
**Healthy ~2–3 inHg (~100 mbar).** A torn Gen 3 diaphragm reads **far
higher** (approaching manifold vacuum, up to ~22 inHg / ~745 mbar) OR
near-zero with an audible leak depending on tear location. *(Smac770 /
"old guy" Audizine, verbatim "It should be between 2→3 inHg"; Go-Parts.)*

**Oil-cap / glove test:** healthy = mild suction, cap comes off easily,
idle stumbles slightly; torn = cap sucks down hard, glove pulled taut and
held. *(Audizine; GM B48 TSB principle.)*

**Bleeder-hole test:** cover the bleeder hole on the round cap; if idle
calms or the whistle stops → diaphragm confirmed bad. *(eEuroparts EA888
PCV guide — forum/vendor.)*

**Fuel trims (Addr 01):** LTFT positive/lean at idle, improving as RPM
rises = classic vacuum-leak signature pointing at the PCV. *(Stedmans
Garage / obdguides — forum/vendor.)*

**Smoke test** the intake/crankcase to visualise the leak path; **dipstick
suction** and rear-main inspection last.

### (5) Fix ladder with decision points

**Cheapest: diaphragm-only repair kit** (RKX fluorosilicone; Dorman/Ensun
917-064 type) — **~£15–£35 GBP**. *Caveat:* 917-064 fitment is
Gen-2/06H-leaning; verify Gen-3 06K fit before buying. The RKX upgraded
diaphragm is confirmed for 06K assemblies. *(RKX / Dorman — vendor grade;
fitment flagged.)* (link chips: RKXtech, RKXtech)

**Decision point → full module:** if the oil-separator body is cracked,
the cap threads are damaged, or a diaphragm-only kit has already failed
once, replace the **full genuine PCV module 06K103495BM** — **~£45–£75
GBP** genuine (Awesome GTI / APS / AKS / ECS UK). Forums strongly advise
genuine over aftermarket (repeat-failure history). *(VAGPARTS, ECS, AKS
Tuning — vendor grade.)* Exact live UK £ = NONE FOUND (confirm at UK
dealer/indie).

**Deepest:** if the leak is the **cam-bridge 06K103144D** sealant line
itself (not the PCV), the bridge must be removed and **re-sealed with
anaerobic sealant (no gasket)** — a bigger labour job (fixed point from
R2).

**Decision flips** when: diaphragm-only kit fails to restore ~3 inHg
vacuum → full module; oil weep persists after PCV fixed → cam-bridge
reseal / rear main.

**Severity: fix-soon** (drivable but risks the rear main seal).
**Likelihood @92k: High** — FCP Euro: "While the Gen.3 EA888 has a highly
revised and more reliable system than its earlier generations, it's not
perfect. It still suffers failures, typically due to a torn rubber
diaphragm." This car is already symptomatic.

## Fault 4 — Timing-chain tensioner

### (1) Fault code(s) + plain-English meaning

**P0016 / P0017** — Camshaft/Crankshaft correlation (bank 1, sensor A) —
cam and crank out of sync; the code that appears once chain stretch is
severe. *(Audizine chain-stretch threads — forum grade.)*

**HONEST FRAMING (fixed point):** Gen 3's tensioner **06K109467P** largely
fixed the Gen 1/2 EA888 tensioner-failure saga. Residual risk is
cold-start rattle and gradual chain stretch at high mileage, not the
catastrophic Gen 1/2 failure.

### (2) Animation spec

Render the timing chain, guides, and the hydraulic ratcheting tensioner
**06K109467P** at the rear of the head.

**Before:** tensioner piston holds the chain taut; cam and crank sprockets
phased correctly.

**Cold-start transient:** the brief oil-pressure lag at startup —
tensioner not yet fully pressurised → a momentary slack span → **1–2
second cold-start rattle**, then quiets as pressure builds. (Rattle >~3 s
→ escalate.)

**High-mileage stretch:** the chain elongates link-by-link; the cam
sprocket retards relative to crank; the ECU winds in phase compensation;
MVB 93 phase-position drifts negative.

**Worst case:** stretch beyond compensation → cam timing off → misfires;
extreme = valve/piston contact (render a valve kiss).

### (3) Driver symptoms (onset order)

First: brief metallic rattle on cold start, gone within a second or two.

Developed: longer/harsher cold rattle, occasional rough idle, faint power
loss.

Worst case: P0016 CEL, persistent rattle, misfires — chain service
mandatory before valve damage.

### (4) Diagnostic tree

**Addr 01 → Measuring Block 93 (or Adv. MV "Camshaft adaptation intake
bank 1: phase position")** — read the degrees-out value. Rule of thumb: 0
to −2° green; −2 to −4° yellow (monitor); **beyond ±4° in either direction
= replace chain** (NGP guidance). −9° indicates ~1.5 links of stretch,
near valve contact. *(NGP Racing Gen 3 guide; VW Vortex CPLA thread;
Audizine — forum/vendor grade. Caveat: some report the Gen 3 ECM doesn't
expose this MV as reliably as Gen 1/2 — flagged.)*

**Cold-start rattle timing:** >3 s cold rattle → strong tensioner/chain
indicator.

Physical: inspect tensioner extension through the inspection plug if
fitted (>6 ribs/splines on the newer tensioner = replace).

### (5) Fix ladder with decision points

**Cheapest: monitor** — log MVB 93 at each service; no parts while within
±2°.

**Decision point:** phase position beyond ±4°, or cold rattle >3 s →
timing service.

**Assembly:** full timing-chain kit (chain, tensioner **06K109467P**,
guides; consider lower cover + crank seal). Major labour.

**Decision flips** when: MVB 93 crosses ±4° OR P0016 sets OR rattle
persists warm.

**Severity: drive-on (monitor). Likelihood @92k: Low on Gen 3** — honest
assessment; a genuine but lower-probability item than the marketing around
EA888 chains suggests.

## Fault 5 — HPFP wear

### (1) Fault code(s) + plain-English meaning

**P0087** — "Fuel Rail/System Pressure Too Low" — actual rail pressure
below commanded. *(go-parts P0087; Ross-Tech.)*

**P310B** — "Low Fuel Pressure Regulation" — low-pressure side can't
maintain regulation (often the G410 sensor / LPFP). *(go-parts; Ross-Tech
P310B wiki.)*

Associated: **P2293** (fuel regulator 2 performance), P0300 (secondary
misfire from starvation).

**Fixed point:** single-piston HPFP **06L127025R→T**, driven by a
four-lobe exhaust-cam lobe via a **ROLLER tappet** — far less prone to the
EA113 flat-slider wear-through.

### (2) Animation spec

Render the HPFP on the head, its **roller tappet** riding the four-lobe
cam.

**Before:** roller rotates on the lobe; piston pumps; rail holds 40 bar
idle, ramps to ~150 bar under load.

**Failure (rare on roller):** roller-bearing pitting/flat-spotting;
reduced piston lift → rail pressure sags under demand. Contrast with the
EA113 slider that wore a hole through the follower (show as the "old
design" ghost for education).

**Fluid path:** low-side ~4–6 bar feed → HPFP → high-side rail; on failure
the rail pressure trace collapses (e.g., ~150 bar requested vs <7 bar
actual) → limp mode. (link chip: VW Vortex)

### (3) Driver symptoms (onset order)

First: occasional long crank, faint hesitation under hard load.

Developed: stumble/cut above ~3,500 rpm, power cut on WOT. (link chip: VW
Vortex)

Worst case: P0087 limp mode, stalling — **stop-driving** (safety). (link
chip: Go-Parts)

### (4) Diagnostic tree

**Addr 01 rail-pressure MVs:** IDE00201 (specified, MPa) vs IDE00589
(actual, kPa). **Idle ~40 bar** (tends ~39 actual), **~150 bar WOT, 200
bar design limit.** Actual collapsing well below specified under load =
high-side fault. *(Audizine "Fuel rail pressure at idle" — Smac770,
verbatim "40 bar idle... 150 bar WOT, 200 bar design limit"; forum
grade.)*

**Low-side check:** LPFP feed **~4–6 bar (60–90 psi)**; below ~50 psi =
weak LPFP / clogged filter, not the HPFP. *(go-parts P0087 —
forum/vendor.)*

**Fuel-rail sensor connector** — loose female pins give a false low
signal; inspect before condemning the pump. *(go-parts P0087
confirmed-fix — forum/vendor.)*

Physical: remove HPFP, inspect roller tappet for scoring/flats; inspect
the cam lobe.

### (5) Fix ladder with decision points

**Cheapest:** verify/clean the fuel-rail sensor connector; replace the
fuel filter; confirm LPFP pressure — often resolves P0087/P310B without
touching the pump.

**Decision point:** low-side pressure OK but rail actual sags under load →
HPFP high-side fault.

**Assembly:** HPFP **06L127025R→T** with tappet; inspect cam. Replace the
tappet whenever the pump is off.

**Decision flips** when: LPFP/filter confirmed good AND rail actual <
specified under load → pump.

**Severity: fix-soon; stop-driving in limp. Likelihood @92k: Low–Medium** —
the roller design is robust; more likely a sensor/connector or LPFP issue
than the pump itself.

## Fault 6 — Carbon build-up

### (1) Fault code(s) + plain-English meaning

**P0300 / P0301–P0304** — random/multiple or cylinder-specific misfire,
characteristically on **cold starts** as carbon disrupts intake
airflow/tumble.

**CRITICAL NUANCE (fixed point):** the EU **CJXC has FACTORY DUAL
INJECTION** (port + direct — R4 headline), so intake-valve carbon
accumulates **SLOWER** than on NA DI-only Golf R/GTI. Port injectors
periodically wash the valve backs. **Do NOT import NA DI-only severity.**
*(VWROC "still carbon buildup" thread — port injection "sprays a very
small and occasional amount on the back of the valve to keep them clean";
forum grade.)* (link chip: VW R Owners Club)

### (2) Animation spec

Cutaway an intake port/valve. **Before:** clean valve back; port-injector
mist coating the valve stem.

**Slow accumulation (dual-inj):** a THIN, slowly-growing carbon layer —
much slower than the thick crust shown for NA DI cars. Tie to PCV
oil-vapour load (cross-link #3): a failing PCV accelerates deposits.
(link chip: motronix)

**Symptom stage:** disrupted airflow/tumble at cold start → misfire
flicker on the affected cylinders.

**Walnut-blast process (repair animation, tie to this car's history):**
manifold off → seal port → insert media nozzle → crushed-walnut media
blasts the carbon off the valve → vacuum extraction → reassemble →
**CRITICAL: re-run Group 142 intake-flap adaptation** (the post-blast
P2015 lesson from R3 — cross-link #1).

### (3) Driver symptoms (onset order)

First: slightly rougher cold idle, minor cold-start stumble.

Developed: cold-start misfires (P0300-family), lost top-end crispness.

Worst case: persistent misfires, MOT emissions risk.

### (4) Diagnostic tree

**Addr 01 per-cylinder misfire counters** (Adv. MV / MVB 015–016 on older,
"Misfire recognition – cylinder X" on UDS) — cold-start spikes that fade
as the engine warms point to carbon/airflow rather than a dead coil.
*(Ross-Tech Misfire Diagnosis wiki — primary.)*

**Cold vs warm pattern:** carbon misfires worst cold, improve warm (vs
coil = anytime; vs injector = under load). Cross-link #10.

Physical: **borescope** the intake ports for deposits (the definitive
check); optional before/after MAF g/s airflow comparison.

### (5) Fix ladder with decision points

**Cheapest:** if only mild — top-tier fuel + periodic Italian tune-up;
verify the PCV is healthy (a torn PCV, #3, dumps oil vapour and
accelerates carbon).

**Decision point:** borescope shows meaningful deposits AND cold misfires
present → walnut blast.

**Fix:** professional **walnut blast** (~£300–500 range) + mandatory Group
142 re-adaptation.

**Decision flips** when: misfire counters + borescope both positive →
blast; otherwise defer (dual-injection buys time).

**Severity: drive-on. Likelihood @92k: Low–Medium** — genuinely lower than
NA cars thanks to dual injection; this car was already walnut-blasted,
resetting the clock.

## Fault 7 — Haldex pump / strainer clog (Gen 5)

### (1) Fault code(s) + plain-English meaning

**P16671, P16668, P16666, P16670** — Haldex/AWD coupling pump and
pressure-control faults (fixed points from R6).

**C111307** — AWD coupling / pump chassis-side fault.

**KEY HONEST POINT:** Gen 5 Haldex has **NO serviceable fine filter** —
only a **strainer gauze** on the pump inlet. It clogs with
clutch-clearance debris; often there are **NO warning lights** as the pump
quietly loses clamping ability. *(haldexrepairs.co.uk Gen 5 guide — vendor
grade, primary for this system.)*

### (2) Animation spec

Render the rear coupling: control unit → pump (with inlet **strainer
gauze**) → piston → clutch pack; pressure-relief/blow-off valve venting
excess.

**Before:** pump draws clean fluid through the gauze; builds pressure;
piston clamps the clutch → torque to rear axle.

**Failure sequence:** fine clutch debris progressively **cakes the
strainer gauze**; flow drops; the pump works harder; the ECU's learned
pump-current adaptation drifts low; clamping pressure falls.

**Loss stage:** starved pump can't reach threshold → **rear drive lost** →
front wheels spin (one-wheel-peel), understeer on corner exit. Pre-emptive
cue: gradual loss of clamping BEFORE any light.

**Fluid detail:** G 060 175 A2 ~650 ml; drain plug N91082701 32 Nm, fill
N90281802 15 Nm; oil at **20–40 °C** before drain. Pump kit **0CQ598549**,
seal kit **0CQ598305**, bolts **9.5 Nm** (fixed points from R6).

### (3) Driver symptoms (onset order)

First: subtle loss of AWD "planted" feel; front-wheel scrabble on wet
launches; often no light.

Developed: obvious one-wheel-peel, understeer, wheel-hop on hard launch.

Worst case: full loss of rear drive.

### (4) Diagnostic tree

**Addr 22 (AWD) → Basic Setting → MAS02928 "Pump Motor"** (pump-learn)
after any service — the ECU learns the current needed to hit the pressure
threshold; a clogged/failing pump learns abnormally LOW values. **Note:**
any pressure MV shown is **calculated/estimated, not from a real sensor** —
Gen 5 has no pressure sensor, so treat displayed pressures as fictitious.
*(haldexrepairs.co.uk — verbatim "Any pressure values shown ... are purely
estimated and calculated, thus they are purely fictitious.")*

**Pump-current behaviour:** the control unit adapts to how much current
the pump draws to reach threshold; low learned current = starved/blocked
pump. Exact normal-vs-blocked amp figures: **NONE FOUND** as published
numbers — sourced only qualitatively. *(haldexrepairs.co.uk —
forum/vendor.)*

Physical (on a lift): engagement/roller test — check rear drive engages;
remove the pump, inspect the strainer gauze for debris caking (the
definitive check).

### (5) Fix ladder with decision points

**Cheapest: fluid change + strainer clean** (G 060 175 A2 ~650 ml) +
MAS02928 pump-learn. Caught early, this restores function.

**Decision point:** pump won't learn / current stays low after clean, or
strainer damage → replace the pump.

**Assembly:** pump kit **0CQ598549** (+ seal kit 0CQ598305), then
MAS02928. Beyond that = full coupling.

**Decision flips** when: post-clean pump-learn fails → pump; pump replaced
and still no drive → coupling.

**Severity: fix-soon** (protects the driveline; not a safety stop).
**Likelihood @92k: High if the Haldex fluid/strainer has never been
serviced** — Awesome GTI: "On vehicles which don't have a filter (Gen5),
we recommend servicing at 10,000 mile intervals, as the strainer on the
pump can become blocked, eventually leading to pump failure." (VW's
official interval is longer, so at 92k an unserviced strainer is a live
concern.)

## Fault 8 — DSG mechatronic accumulator (DQ250)

### (1) Fault code(s) + plain-English meaning *(fixed points from R5)*

**P0746 / 17130** (pressure control solenoid 1 / N215 performance-stuck),
**P0776 / 17160** (PCS 2 / N216), **P1814/P1815, P1818–P1820, P1823–P1825,
P1828–P1830, P1833–P1835** (pressure-control/solenoid circuit family),
**P0731/P0733** (gear-ratio incorrect), **P2711** (unexpected mechanical
disengagement), **P1740** (clutch temp), **P175F/P1701**
(basic-settings/general).

Solenoid map: **N215 (K1) / N216 (K2) / N217 / N218 / N233 + N88–N92**.

Plain English: the mechatronic's **hydraulic pressure accumulator cracks**
→ loss of stored pressure → clutch/shift pressure faults → limp.

### (2) Animation spec

Render the mechatronic valve body: solenoids, pressure regulator, and the
**spring-loaded hydraulic accumulator** that stores main pressure for
instant clutch apply.

**Before:** pump charges the accumulator; it holds a pressure reserve;
K1/K2 pressure-control solenoids meter clutch pressure for seamless
shifts.

**Failure:** a **hairline crack** in the accumulator housing/piston bore →
stored pressure bleeds off. Show the main-pressure trace sagging,
especially when hot (fluid thinner, leak worse). Shifts become
harsh/slipping; **PRNDS flashing** on the dash.

**Limp logic (fixed point): lose K1 → drive in 2nd only; lose K2 →
1st/3rd only** — the box protects itself.

**Cold-vs-hot:** normal cold operation degrading as temp rises past
~80–100 °C.

### (3) Driver symptoms (onset order)

First: occasional harsh/slurred shift when hot; brief hesitation from a
stop.

Developed: **flashing PRNDS**, gear drop-outs, jerks — worse as the
gearbox heats up.

Worst case: limp (2nd only, or 1st/3rd), or no drive — **stop-driving** if
it won't move safely.

### (4) Diagnostic tree

**Addr 02 → Measuring Blocks** — fluid temp must be **30–100 °C** (Group
019) for valid readings/basic settings. *(Ross-Tech DSG/02E wiki —
primary.)*

**Main / clutch pressure MVs:** monitor specified vs actual main pressure
and K1/K2 clutch pressure; a cracked accumulator shows main pressure that
**won't hold / sags under load, worse hot. Exact bar spec: NONE FOUND** as
a published DQ250 figure in accessible sources — the Dodson calibration
PDF covers basic-settings groups (060 sync points, 062/067 clutch
adaptation, 065 pressure adaptation, 068 clutch safety) but not a numeric
main-pressure spec. *(Ross-Tech wiki; Dodson DQ250 calibration PDF —
vendor grade.)*

**Cold-vs-hot repeat scan:** faults that only set hot strongly implicate
the accumulator/seals.

Physical: specialist bench test of the mechatronic; inspect the
accumulator for a crack.

### (5) Fix ladder with decision points

**Cheapest:** DSG **fluid + filter service** and **solenoid service /
individual solenoid replacement** if a single N-valve is at fault
(P0746/P0776 pointing to one solenoid).

**Decision point:** pressure won't hold after solenoid/fluid work, or
accumulator crack confirmed → refurb.

**Ladder (fixed economics):** solenoid service **<** specialist
mechatronic refurb **<** genuine exchange mechatronic (**~£5k**).

**Decision flips** when: multiple pressure faults + hot-only pattern +
failed pressure adaptation (Group 065) → refurb/exchange rather than
chasing solenoids.

**Severity: stop-driving if in limp/flashing. Likelihood @92k: Medium** —
DQ250 mechatronic pressure faults are a known age/heat item, though less
endemic than DQ200 dry-clutch failures.

## Fault 9 — IS38 wastegate / shaft

### (1) Fault code(s) + plain-English meaning

**P2563 — "Turbocharger Boost Control Position Sensor Circuit —
Range/Performance / Implausible Signal"** — the electric wastegate
actuator position doesn't match commanded; set by rod maladjustment or
actuator fault. *(mygolfmk7.com; APR blog — vendor grade.)*

**Fixed points:** electric wastegate actuator **V465 / 06K145725T**; turbo
**06K145702J / 874F** family, journal bearing.

### (2) Animation spec — THREE distinct failure modes

Render the IS38 with V465 actuator, rod, wastegate flapper on its shaft,
and the turbine/compressor with journal bearing.

**Mode (a) — actuator/rod maladjustment:** the rod set incorrectly; on the
"acknowledgment" test the position voltage sits wrong (target **3.6 V**,
acceptable **3.5–3.9 V**); boost overshoots/undershoots target → P2563 +
boost deviation. Correct-state animation: rod at **contact + 1.5 turns**,
voltage 3.6 V, then Basic Setting "First adaptation of charge pressure
actuator" (**IDE04304**) clears P2563. (link chip: VW Vortex)

**Mode (b) — wastegate flapper/shaft play:** a worn flapper bushing; at
idle/light load the flapper **rattles/flutters** against its seat →
metallic rattle. No smoke, boost mostly OK.

**Mode (c) — turbo shaft-bearing play:** journal bearing worn; shaft
wobbles; compressor/turbine wheel kisses housing; oil seal fails → **blue
oil smoke + whine** → full turbo replacement.

### (3) Driver symptoms (onset order)

(a) EPC light, P2563, boost feels off/soft, sometimes limp.

(b) metallic rattle/flutter at idle and light load (often cold), boost
normal.

(c) whine that rises with revs, blue smoke, oil consumption, power loss.

### (4) Diagnostic tree

**Addr 01 → wastegate position voltage** ("Charge Pressure Actuator:
acknowledgment") — KOEO/idle should reach **~3.6 V (3.5–3.9)**; way off =
rod/actuator. After adjusting, run **Basic Setting IDE04304** "First
adaptation of charge pressure actuator." *(mygolfmk7.com; VW Vortex
wastegate threads — forum grade.)* (link chip: VW Vortex)

**Boost specified vs actual MVs (mbar):** log PUT/boost specified vs
actual under load; persistent shortfall = boost-control fault; overshoot =
wastegate not opening. *(APR VCDS logging list — forum/vendor.)* Exact
stock CJXC target mbar at load: **NONE FOUND** as a published OEM figure
(tuner logs vary).

**Rattle diagnosis (Mode b):** tap/shake test the wastegate arm cold;
audible play = flapper/shaft wear. *(VWROC IS38 flap/spindle rattle
thread — forum grade.)*

**Shaft-play (Mode c):** remove intake pipe, check wheel for radial/axial
play by hand; dial-indicator for precision; oil in downpipe = seal gone.

### (5) Fix ladder with decision points

**Cheapest: rod re-set** to contact + 1.5 turns → 3.6 V → IDE04304
adaptation → clears P2563. £0 parts.

**Decision point (a→actuator):** if voltage can't be set or adaptation
aborts and wiring is good → replace actuator **V465 / 06K145725T**.

**Decision point (b→flapper kit):** rattle only, boost OK → wastegate
rattle/flapper repair kit (~£35–70 aftermarket, e.g.
Mambatek/Fedicturbo) or live with it if minor.

**Assembly (c→turbo):** shaft play + smoke → turbo **06K145702J** family.
Big-ticket.

**Decision flips** when: adaptation fails → actuator; smoke/shaft play →
turbo (not just rattle repair).

**Severity: drive-on for (b) minor rattle; fix-soon for (a)/(c).
Likelihood @92k: Medium** — wastegate rattle is a common Mk7 age item;
full turbo failure less common.

## Fault 10 — Coil / misfire

### (1) Fault code(s) + plain-English meaning

**P0300** (random/multiple) + **P0301–P0304** (cylinder-specific) —
misfire detected.

**Fixed points:** coils **06H905110P** (R dealer-listed; **06K905110K**
family flag open — supersession left open per R2); plugs **06K905601B =
NGK PLFER7A8EG, 0.8 mm gap, 60k-mile interval**.

### (2) Animation spec

Render the four coil-on-plug units, plugs, and the combustion event per
cylinder.

**Before:** each coil fires a clean spark; combustion smooth.

**Coil failure:** the failing coil's spark goes weak/intermittent → that
cylinder misses → crank-speed sensor detects the deceleration →
per-cylinder misfire counter increments.

**Swap-test animation (fixed diagnostic):** move the suspect coil to an
adjacent cylinder; the misfire **follows the coil** to the new cylinder →
coil confirmed.

Cross-links: also show plug wear (eroded gap), injector (fuel), carbon
(#6), PCV (#3, oil-fouling) as alternative misfire sources.

### (3) Driver symptoms (onset order)

First: intermittent stumble, faint jerk under load; occasional flashing
CEL.

Developed: rough idle, P030x, power loss.

Worst case: **flashing MIL** (active misfire dumping fuel to the cat) —
fix-soon to protect the catalyst.

### (4) Diagnostic tree

**Addr 01 per-cylinder misfire counters** (Adv. MV "Misfire recognition –
cylinder X" / MVB 015–016) — identify which cylinder(s). *(Ross-Tech
Misfire Diagnosis wiki — primary.)*

**Cold-vs-warm pattern:** coil = misfire anytime/worsens with heat; plug =
high-load/high-boost; **carbon (#6) = cold-start then clears; PCV (#3) =
oil-fouling + lean trims**. Use the pattern to route between faults
10/6/3.

**Swap test:** move the coil to an adjacent cylinder — misfire follows
coil = coil; stays = plug/injector/mechanical. *(ShopDAP MK7 coil guide;
Ross-Tech — vendor/primary.)*

Physical: inspect plug gap/condition; injector test; compression/leak-down
if mechanical suspected.

### (5) Fix ladder with decision points

**Cheapest:** replace the one failed **coil 06H905110P** (~£35–75) and/or
a set of **plugs 06K905601B** (~£8–15 each) if at/over the 60k interval.

**Decision point:** swap test isolates coil → coil; misfire stays with the
cylinder → plug, then injector, then carbon/PCV/compression.

**Assembly:** none — component-level. If multiple coils are failing,
replace the set.

**Decision flips** when: misfire doesn't follow the swapped coil →
escalate down the plug→injector→carbon→PCV→mechanical chain.

**Severity: fix-soon** (flashing MIL = protect cat). **Likelihood @92k:
High** — coils and plugs are wear items; at 92k the plugs are likely
overdue and coils age out.

## Fault 11 — DCC-less suspension wear items

### (1) Fault code(s) + plain-English meaning

**NONE — purely mechanical, no DTCs**. (J250/DCC status pending per R7; if
non-DCC there are no adaptive-damper codes either.)

### (2) Animation spec

Render the front corner: LCA with the **rear (hydraulic) console bush**,
drop link, strut top mount; rear trailing-arm bush; track-rod end.

**Front LCA rear console bush (THE MOT-advisory classic):** the
fluid-filled (hydraulic) rubber bush develops a tear; fluid weeps out; the
voided bush lets the arm shift under braking/bumps → **knock over bumps,
vague steering**. Contrast animation: torn hydraulic bush (fluid escaping,
arm walking) vs a solid-rubber replacement (no fluid, firmer, no walk).

**Drop links:** the ball-stud develops play → **rattle over rough roads**;
show the unloaded-vs-loaded difference (tight when the car sits, rattles
when the suspension unloads — the diagnostic tell).

**Strut top mount:** the bearing/rubber degrades → **creak/clunk on full
lock**.

**Rear trailing-arm bush / track-rod end:** compliance/play growing.

### (3) Driver symptoms (onset order)

First: intermittent knock over sharp bumps (console bush or drop link);
creak on full-lock parking (top mount).

Developed: vague/wandering steering, persistent front-end rattle, uneven
tyre wear.

Worst case: MOT advisory/failure; clonk under braking.

### (4) Diagnostic tree (physical — no scan tool)

**Unloaded rattle check:** on a lift with the suspension hanging, shake
the drop links — rattle when unloaded that's silent when loaded = drop
links. *(SpeakEV / VWROC Mk7 threads — forum grade.)*

**Pry-bar test:** lever the LCA at the rear console bush — visible
movement/fluid weep = bush failed; lever track-rod end and ball joints for
play.

**Load-shift / bounce test:** rock the car, listen for the knock
localising to the LCA console.

**Creak isolation:** turn to full lock stationary; creak = strut top
mount.

Statistically on Mk7, the **front LCA rear console bush fails first** —
check it before chasing dampers.

### (5) Fix ladder with decision points

**Cheapest:** replace **drop links** first if the noise is an unloaded
rattle (cheap, common, fast).

**Decision point:** knock-over-bumps + vague steering + pry-bar movement →
LCA rear console bush.

**Bush options (decision):** OEM rubber console bush replacement, **or**
press-in **Powerflex** poly for durability (firmer-ride trade-off) — flips
to Powerflex if the owner wants longevity/track use, OEM for stock ride.

**Assembly:** full LCA if bushes aren't separately serviced / ball joint
also worn.

**Torques (fixed from R7):** console **70 Nm + 180°**; drop links **90 Nm
+ 90°**; **torque-at-ride-height rule** for bushes.

**Severity: fix-soon (MOT). Likelihood @92k: High** — the LCA rear console
bush is the signature Mk7 advisory; drop links and top mounts are commonly
gone by this mileage.

## Fault 12 — EPB (electric parking brake) faults

### (1) Fault code(s) + plain-English meaning

**C10E2 — "Electrical Failure / H-Bridge Error"** in the EPB control (Addr
53 on older cars, **Addr 03-ABS on MQB Mk7**) — the motor-drive H-bridge
fault, often a dead/short motor. *(Ross-Tech C10E2 wiki — primary.)*

**02435 — "Supply Voltage for Control Module for Right Channel — Open or
Short to Ground"** — one channel's motor supply open. *(6speedonline VCDS
scan — forum grade.)* (link chip: 6SpeedOnline)

**721152 / C1011 "brake pad replacement mode active"** are **NORMAL
mid-procedure** — not faults (fixed point).

**Fixed points:** rear EPB motors **3Q0998281 (LH) / 3Q0998281A (RH)**
separately replaceable; **no manual release exists on MQB**; skipping the
service procedure breaks the spindle.

### (2) Animation spec

Render the rear caliper with the EPB motor/gearbox splined to the caliper
spindle driving the piston.

**Service procedure (correct):** Addr 03 → Basic Settings → "Start lining
change mode" → the spindle **retracts to an internally-released position**
→ tech pushes the piston flat (**NOT wind-back** — pushing straight in) →
"End lining change mode" → cycle EPB. Show the warning: C-clamp/wind-back
**strips the spindle gears** (render the failure if skipped).

**Dead motor (C10E2):** the motor winding goes open-circuit → spindle
won't turn → EPB won't apply/release; dash EPB warning.

**Seized piston/spindle:** corrosion binds the spindle → motor draws high
current, stalls, sets a fault → distinguish from a dead motor (motor tries
but can't move vs no motor movement at all).

### (3) Driver symptoms (onset order)

First: intermittent EPB warning, flashing switch LED.

Developed: "Parking brake failure" message, EPB won't apply/release,
piercing alarm tone when moving.

Worst case: car immobilised (brake stuck on) or no parking brake —
fix-soon; on a slope this is a safety issue. (link chip: 6SpeedOnline)

### (4) Diagnostic tree

**Addr 03 (MQB) scan** — read C10E2 / channel codes; identify LH vs RH
channel. *(Ross-Tech wiki EPB pages — primary.)*

**Motor resistance test:** across the motor pins (1+4) — a healthy motor
reads **~10 Ω**; a failed one reads far out of spec (open/short).
Differentiates dead-motor vs wiring. *(Club Touareg / Ross-Tech forum —
verbatim "should be around 10 ohms or so"; forum grade.)*

**Seized vs dead differential:** apply 12 V direct to the motor pins —
motor runs = motor OK, suspect seized spindle/caliper; motor silent = dead
motor. *(go-parts EPB guide — forum/vendor.)*

**Motor current:** seized spindle → high current stall; dead motor → no
current draw.

**CRITICAL:** always use a battery charger during EPB work — the module is
very low-voltage-sensitive.

### (5) Fix ladder with decision points

**Cheapest:** if it's a software glitch / mid-procedure code
(721152/C1011) → complete the Basic Settings cycle, clear, retest — no
parts.

**Decision point:** motor resistance out of spec / no run on 12 V →
replace the affected **motor 3Q0998281 (LH) / 3Q0998281A (RH)** only
(separately replaceable — the cheaper path).

**Assembly:** if the **piston/spindle is seized** or the caliper corroded
→ full caliper **5Q0615423 (LH) / 5Q0615424 (RH)**. (link chip:
KillerBrakes)

**Decision flips** when: motor tests good but the spindle won't move
(seized) → caliper, not motor; motor tests bad but caliper free → motor
only.

**UK cost tier:** EPB motor = cheaper part-swap; a genuine rear caliper
set with carriers/motors is the higher tier. *(KillerBrakes / CoolAirVW
listings — vendor grade.)* Exact live £ = confirm at a UK vendor.

**Severity: fix-soon** (safety on slopes). **Likelihood @92k: Low–Medium** —
EPB motors are a known but not endemic failure; corrosion-seized spindles
rise with UK winters/mileage.

## Recommendations (staged, decision-driven)

**Stage 1 — do now (the live fault):** Confirm the PCV diaphragm (#3) as
the cause of the idle shake AND oil leak. Run the crankcase-vacuum test at
the dipstick: **~2–3 inHg (~100 mbar) is healthy; far higher (up to ~22
inHg) confirms a torn diaphragm.** Cross-check with the oil-cap/glove test
and the bleeder-hole test, and read fuel trims (LTFT lean at idle). Fit
the **cheapest diaphragm-only kit (£15–35)** first; if the body is cracked
or a kit has already failed, step to the **full genuine module 06K103495BM
(£45–75)**. *Benchmark that flips to the full module:* vacuum not restored
to ~3 inHg after a diaphragm-only kit. *Benchmark that escalates to
cam-bridge reseal/rear-main:* oil weep persists after the PCV is proven
good. This is the identified priority DIY job and it plausibly resolves
both presenting symptoms at once.

**Stage 2 — inspect within weeks (high-likelihood, high-consequence):**

**Water pump/thermostat (#2):** pressure-test the cooling system and
inspect under the manifold for crystalline crust; monitor G62 vs cluster
temp. Budget £750–£1,250 if leaking; consider a metal-impeller upgrade if
it's already been replaced once.

**Haldex (#7):** if there's no record of a Gen 5 Haldex service, do the
**fluid change + strainer clean + MAS02928 pump-learn** now — at 92k an
unserviced strainer is the likeliest AWD failure and it's cheap insurance.

**Suspension (#11):** pry-bar the front LCA rear console bushes and shake
the drop links before the next MOT; replace drop links first for unloaded
rattle, console bushes for knock-over-bumps + vague steering.

**Stage 3 — monitor / baseline with VCDS (log now, act on thresholds):**

**Timing chain (#4):** log MVB 93 phase position; act only if beyond ±4°
or cold rattle >3 s.

**HPFP (#5):** baseline rail pressure (40 bar idle / ~150 bar under load);
if P0087 appears, check the low-side and the rail-sensor connector before
condemning the pump.

**Coils/plugs (#10):** at 92k the plugs (60k interval) are likely
overdue — replace as maintenance; keep the swap-test as the coil
diagnostic.

**IS38 (#9), DSG (#8), EPB (#12), carbon (#6):** address only on symptom
onset per each fault's decision points. For any misfire, use the
cold-vs-warm pattern to route between coil (#10), carbon (#6) and PCV
(#3).

**Thresholds that change the plan:** overheating or a temp needle climbing
with a cold lower hose → **stop-driving** (water pump). Flashing PRNDS /
DSG limp → **stop-driving** (mechatronic). P0087 limp / stalling →
**stop-driving** (fuel). Everything else is drive-on or fix-soon per the
tables above.

## NONE-FOUND expected values (rendered as honesty, not guesses)

**Fault 3 (PCV):** VAG 5-digit numeric equivalents for P0171/P2187 on this
ECU; P052E applicability to the CJXC (no confirmation the engine carries a
crankcase-pressure sensor); exact live UK £ for the genuine 06K103495BM.
*(The torn-diaphragm crankcase-vacuum figure was resolved by enrichment to
"up to 22 inHg / ~745 mbar" — Go-Parts.)*

**Fault 7 (Haldex):** published normal-vs-blocked pump-current amp figures
(sourced only qualitatively; displayed pressures are
ECU-calculated/fictitious per haldexrepairs.co.uk).

**Fault 8 (DSG):** numeric main-pressure / K1-K2 clutch-pressure bar spec
for DQ250 (Dodson PDF gives basic-settings groups, not the pressure
numbers).

**Fault 9 (IS38):** published stock-CJXC boost target in mbar at load
(tuner logs vary; no OEM figure sourced).

**Fault 4 (timing chain):** confirmation the Gen 3 CJXC ECM reliably
exposes MVB 93 phase-position (some sources say Gen 3/Simos-style ECMs
don't, as on Gen 1/2).

## Source-disagreement flags

**Carbon severity (Fault 6):** NA DI-only sources claim a 70k–100k-mile
walnut-blast need; EU dual-injection (CJXC) sources say markedly slower.
Resolved in favour of the dual-injection EU data per the R4/R6 fixed
points — flagged so NA severity is not imported.

**P052E (Fault 3):** generic OBD sources list P052E as a PCV-diaphragm
code, but it requires a crankcase-pressure sensor not confirmed on the
CJXC. Flagged as not-confirmed rather than asserted.

**Timing-chain MV (Fault 4):** the ±4° rule is well-sourced for EA888 Gen
1/2; its reliability on Gen 3 is disputed. Flagged.

**Coil PN (Fault 10):** R dealer-listed **06H905110P** vs **06K905110K**
family — supersession/family flag left open per R2 fixed point; not
overwritten.

## Caveats

Diagnostic numbers marked "forum/vendor grade" (go-parts, ShopDAP,
AUTODOC, haldexrepairs.co.uk, tuner blogs) are corroborated where possible
but are not OEM erWin/Bentley primary sources; treat exact
voltages/pressures as strong indicative values to verify against the erWin
EA888 Gen 3 manual before publishing hard specs in-app. Primary-grade
items (Ross-Tech wiki DTCs, basic-settings groups, Dodson calibration
groups) are the most reliable.

Several part-number suffixes (06L121111P water-pump, 06L127025R→T HPFP,
coil family) are **VIN/CJXC-verify** items — the app should carry the
caveat rather than assert fitment.

Prices are indicative UK GBP tiers from vendor/forum listings (Aug 2026)
and move with the market — confirm live before quoting.

Where a value could not be sourced it is explicitly listed as **NONE
FOUND** above; the app should render that honesty rather than a fabricated
number, per project integrity rules.

The **ACC radar heat-soak fault** is documented in R10 and is referenced
here only as a cross-link for future library expansion; it is
intentionally not built out in this brief's twelve.
