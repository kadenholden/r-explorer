# R14 return — Geometry & Mesh Sources for the VW Golf R Mk7 (5G) Exploded-View Model

Deep-research return received 2026-08-14 (operator-run task, delivered as
PDF; transcribed here). Scope: geometry and mesh sources — 3D models,
exploded diagrams, dimensioned drawings — for the lifelike digital replica.

> **Transcription note:** the source PDF (10 pages, image-of-text print
> capture) is clipped by a rectangular print boundary at the right page
> edge. Text that runs past that boundary was never rendered into the PDF
> and is unrecoverable; every such cut is marked `[truncated in source]`
> (or `[possibly truncated at clip edge]` where the text ends flush at the
> boundary but may be complete). If the source's table (a) had columns to
> the right of "License", they fell entirely outside the clip and do not
> appear here. Nothing has been guessed or reconstructed.

## TL;DR

**No exact, licensable engineering-solid CAD exists for this car's
proprietary mechanical assemblies (EA888 Gen 3 short block, IS38 turbo,
DQ250 mechatronics, Gen 5 Haldex).** The realistic asset strategy is a
three-layer stack: (1) free, dimensionally-exact standard-fastener STEP
files from TraceParts as instant wins; (2) one paid royalty-free full-car
Golf 7 R polygon mesh as the body/interior anchor (Free3D $29 up to Hum3D
HQ-interior $295); and (3) a free generic 4-cyl DOHC teaching assembly
from GrabCAD as the mechanical skeleton, corrected against SSP/patent
sectional drawings.

**The correction layer is unusually rich and reachable:** SSP 606 (EA888
Gen3), SSP 515 (running gear + Haldex), SSP 308 (DQ250 DSG), SSP 520
(body), the BorgWarner "Next Generation AWD Actuators" PDF, plus three
verified Google Patents (US8708123B2 Haldex pump, US9103243B2 Audi
Valvelift, US9726074B2 IHI turbocharger) give accurate cross-sections for
every proprietary part that has no downloadable model.

**License reality:** GrabCAD = private/non-commercial only; store meshes =
royalty-free (use OK, mesh redistribution prohibited); Sketchfab =
per-model CC (attribution required); TraceParts/McMaster/PARTcommunity
STEP = free download but redistribution NOT granted (PARTcommunity
expressly bans it); SSP/Bentley/patent images = copyrighted reference
(patents are public documents usable as reference), never redistributed in
the app. Photogrammetry of the owner's own car is the one unrestricted,
exact-geometry route and should be the backbone for the engine bay, wheels
and body.

## Key Findings

**Full-car body/interior meshes are abundant and cheap; proprietary
mechanical internals are essentially absent.** There are multiple
dedicated "Golf 7 R" and "Golf 7 2014" listings on TurboSquid ($20–$129),
Hum3D ($95 full-car, $295 HQ-interior), CGTrader, Free3D ($29) and SQUIR,
several with modelled interiors. None include an accurate engine bay,
gearbox internals, or Haldex. (For context, the car being modelled runs
the 1,984 cc EA888 Gen 3 with IHI IS38 turbo producing 300 hp/380 Nm and —
as a pre-facelift Mk7 — the 6-speed DQ250 DSG, not the 7-speed DQ381 that
arrived on the MK7.5 facelift.)

**GrabCAD has EA888-tagged parts but they are fragments** (a
crankshaft-seal mod, oil-funnel-type items), not a complete engine. The
best engine skeleton is a generic 4-cylinder DOHC teaching assembly.

**Standard fasteners are a total free win in exact solid geometry** via
TraceParts (DIN/ISO STEP). The VAG-specific XZN (triple-square) and
M14×1.5 ball-seat wheel bolts are the exception and must be
custom-modelled.

**The 3D-printing community (Cults3D, Thingiverse, Printables, STLFinder)
has VAG/EA888 decorative and functional prints** — useful as dimensional
reference for trim clips, caps and badges, less so as engineering
geometry.

**Photogrammetry reference scans of Golf bodies and engine bays exist on
Sketchfab** (Rush_Freak's reference-scan collection, James Robbins'
auto-scan collection, plus a real phone-scanned MK7 Golf R intake), and
the DIY workflow is mature (Polycam/RealityScan/Scaniverse + matte-ing
spray).

**The SSP/patent/press "correction layer" is comprehensive and mostly
reachable** from a normal connection; 7zap ETKA diagrams are reachable and
map cleanly onto ETKA main groups.

## Details

### (a) CAD / Mesh Source Catalogue

| Source | Category | Covers (R-system) | Format(s) | Solid/Poly | License |
| --- | --- | --- | --- | --- | --- |
| TurboSquid | Store full-car | Body/interior/wheels (R11) | .max, .fbx, .obj, +formats | Poly (game/render) | Royalty-free (TS) |
| Hum3D | Store full-car | Body/interior (R11) | .max (scanline+vray), .fbx, .obj, .3ds, .mb, .lwo, .c4d | Poly | Royalty-free (Hum3D [truncated in source] |
| CGTrader | Store + free full-car | Body/interior (R11) | .max, .obj, .3ds, .fbx, .blend, .dwg | Poly | Royalty-free; one free .blend |
| Free3D | Store full-car | Body (R11) | .obj, .3ds, .max | Poly (591,770 polys) | Free3D standard |
| SQUIR (via RenderHub) | Store full-car | Body (R11) | .3ds, .c4d, .fbx, .lwo, .max, .obj | Poly (453,734 polys) | RenderHub royalty-fr[truncated in source] |
| 3DModels.org / Hum3D network | Store full-car | Body (R11) | .fbx, .obj, .3ds, .c4d | Poly | Royalty-free |
| Sketchfab | Community mesh | Body (R11); intake (R3) | .gltf, .fbx, .obj | Poly | Per-model CC (see below) |
| GrabCAD | Free CAD | Fragments (R1); generic engine skeleton | STEP/SLDPRT/IGES varies | Mostly solid | Private/non-commerc[truncated in source] only |
| Cults3D / Thingiverse / Printables / STLFinder | Print community | Trim/caps/badges (R11); decorative engine (R1) | .stl, .step (some) | Mesh/print-solid | CC variants (per-mod[truncated in source] |
| TraceParts | Standard-parts CAD | Fasteners (R12) | STEP, IGES, STL, SLDPRT, DWG, DXF | Solid (exact) | Free download; redistribution NOT granted to standard users |
| McMaster-Carr | Standard-parts CAD | Fasteners/hardware (R12) | STEP + others | Solid (exact) | Free download; redistribution almost certainly prohibited (exact clause unverifi[truncated in source] |
| PARTcommunity / CADENAS 3Dfindit | Standard-parts CAD | Fasteners (R12) | STEP + others | Solid (exact) | Free within 50/day fa[truncated in source] use; §8 EXPRESSLY PROHIBITS redistribution/embed[truncated in source] + AI-training (penalty €20,000 + €500/file) |
| Onshape public / GrabCAD tutorials | Teaching CAD | Engine skeleton (R1/R2) | Native + STEP export | Solid | Public-doc / GrabCAD terms |

### (b) Scan / Photogrammetry Findings + DIY Fallback

**Published scans found (all Sketchfab, per-model license):**

**Rush_Freak, "Accurate Car Reference Scans"** — high-accuracy
RealityCapture photoscans of VW Golf bodies (older Mk4-era 5-door),
surfaces treated for tracking, explicitly "intended for use as modeling
reference." Nearest-Golf body-scan reference; not a Mk7.

**James Robbins (@3DTensn), "Auto Scan data"** — includes a "Volkswagen
Golf 3 RAW Scan" and multiple engine-bay scans (e.g. BMW/Nissan engine-bay
raw scans) — method reference for engine-bay photogrammetry.

**MK7 Golf R intake scan (T.Istre, CC-BY-SA, Samsung "3D Live Scanner")**
— the only *exact-this-car* scanned component found — directly usable for
R3 intake shaping.

**NONE FOUND:** no full-body Mk7 Golf R photogrammetry, no Pretoria wheel
scan, no DQ250/Haldex scan. These are gaps.

**DIY-scan fallback (target car is physically available to the owner):**

**Hardware/apps:** iPhone/iPad Pro LiDAR via **Polycam** (used by
Grassroots Motorsports for exactly this engine-bay-clearance use case,
loaded into Fusion 360), **Scaniverse** (favoured in the HPAcademy
motorsport-CAD community), and **RealityScan/RealityCapture** or **Luma**
(Gaussian-splat) for full-body photogrammetry. LiDAR is faster and better
for matte/large surfaces; photogrammetry gives higher detail on textured
areas.

**Reflective paint (Pure White is glossy):** dull panels first — overcast
daylight, a dusting of removable matting spray (foot spray/dry shampoo) or
3D-scan marker dots / torn masking-tape tracking references (the standard
workshop trick from the HPAcademy thread).

**Workflow:** walk-around orbit (not turntable — car too big) at three
heights; overlap ~70%; shoot body, then a separate dense pass for the
engine bay, then jack + underside pass; merge in RealityCapture/Metashape
by shared control points; scale to a known dimension (wheelbase
**2,630 mm**, front track 1,541 mm / rear track 1,516 mm per VW's official
Golf R technical specifications) to lock real-world scale.

License: owner-generated = no restriction; this is the recommended
backbone for the body, wheels and engine-bay geometry.

### (c) Figure Index — Sectional/Dimensioned Documents per Dossier System

| System | Document | Best figures | Reachable URL |
| --- | --- | --- | --- |
| R1–R4 Engine/boost/fuel | **SSP 606** Audi 1.8/2.0 TFSI EA888 Gen3 | Sectional engine, integrated exhaust manifold in head, turbo, thermal management | scribd.com/document/687811792 ; pdfcoffee.com mirror; procarmanuals.com/self-study-program-606-audi-1-8l-2-0l-tfsi-engine/ |
| R1–R4 Engine (MQB-transverse variant) | **SSP 522** 2.0 l 162/169 kW TSI | Transverse EA888 Gen3 install, sections | volkswagenclub.net (ssp522…pdf); vag-hub.com/vw-ssp/ |
| R2 Valvetrain | **US9103243B2** (Audi Valvelift) | FIG.1 cut camshaft + cam carrier; FIG.3a–d cross-sections | patents.google.com/patent/US9103243B2 |
| R3 Turbo | **US9726074B2** (IHI turbocharger) | FIG.1 cross-section (bearing/turbine/compressor housing, actuator) | patents.google.com/patent/US9726074B2 ; alt US20140363282A1 turbine housing |
| R5 DSG DQ250 | **SSP 308** Direct Shift Gearbox 02E | Clutch pack, input/output shafts, differential, mechatronics cutaways | volkspage.net/technik/ssp/ssp/SSP_308.[truncated in source] ; procarmanuals.com/vag-ssp-308-direct[wraps at clip edge]shift-gearbox-02e-dsg-02e/ |
| R6 Haldex/driveline | **SSP 515** Golf 2013 Running Gear & 4-wheel drive | 4-wheel-drive coupler section (p.20), 4-link rear axle | volkswagenclub.net/manual_download.p[truncated in source]id=1639 ; scribd.com/document/69036673[possibly truncated at clip edge] |
| R6 Haldex pump | **BorgWarner "Next Generation AWD Actuators"** + **US8708123B2** | GenV→VI centrifugal 6-piston pump; FIG.7/8 sections | borgwarner.com/docs/default-source/default-document-library/next-generation-awd-actuators.pdf ; patents.google.com/patent/US8708123B2 (+ EP2486279B1, US8123016B2) |
| R7 Suspension/steering | **SSP 515** | Front/rear axle, steering, brakes, wheels sections | (as above) |
| R8 Brakes | **SSP 515** braking-system section | Caliper/disc layout (13.4×1.2-in / 340 mm vented front, 12.2×0.9-in / 310 mm vented rear discs per VW spec) | (as above) |
| R10 Electrics/CAN | **SSP 517** Golf 2013 Electrical System | Bus topology figures | volkswagenclub.net (ssp517…pdf); vag-hub.com/vw-ssp/ |
| R11 Body | **SSP 520** Golf 2013 Body & Occupant Protection | Body-in-white steel-grade diagrams, hot-formed B-pillar | vag-hub.com/vw-ssp/ ; procarmanuals.co[truncated in source] |
| General/dimensions | **SSP 513** Golf 2013 (MQB overview) | Overall architecture, dimensions | volkswagenclub.net/manual_download.p[truncated in source]id=1638 |

Note: Bentley NHTSA PDFs and the erWin-derived EA888 Gen3 service manual
(per prior briefs) remain the detailed exploded-service-figure sources;
the SSPs above are the cutaway/section layer. SSP 522 and SSP 513 are the
two "new finds" that strengthen platform coverage.

### (d) Exploded-Diagram Source Map (ETKA main groups)

ETKA main-group numbering (verified from ETKA structure and the
part-number middle-triple convention):

| R-system | ETKA main group | Middle-triple hint | Reachable mirror example |
| --- | --- | --- | --- |
| R1 Engine (short block, head) | **1** Engine | 1xx | 7zap.com/en/catalog/cars/Volkswagen/Golf/ → Golf A7 (5G) → Engine |
| R3/R4 Intake/exhaust/fuel/cooling | **2** Fuel/Exhaust (+ Cooling) | 2xx | 7zap Golf A7 → Fuel prep / Exhaust |
| R5 Gearbox DQ250 + bevel box | **3** Gearbox / 4Motion | 3xx | 7zap Golf A7 → Transmission/4Motion |
| R7 Front axle/steering | **4** Front axle, steering | 4xx | 7zap Golf A7 → Suspension/steering |
| R6/R7 Rear axle (4-link) + Haldex | **5** Rear axle | 5xx | 7zap Golf A7 → Rear axle |
| R7/R8 Wheels, brakes | **6** Wheels/Brakes | 6xx | 7zap Golf A7 → Brakes |
| — Pedals/gear selector | **7** | 7xx | 7zap Golf A7 |
| R11 Body/trim | **8** Body | 8xx | 7zap Golf A7 → Body |
| R10 Electrics | **9** Electrics | 9xx | 7zap Golf A7 → Electrical |
| — Infotainment/accessories | **0** | 0xx | 7zap Golf A7 |

Reachable ETKA mirrors: **7zap.com / volkswagen.7zap.com** (reachable in
this environment — despite the noted Cloudflare blocking of some
datacentre IPs, a UK residential connection is reliable), plus US dealer
catalogues **parts.vw.com**, jimellisvwparts.com and vw.oempartsonline.com
that render diagram thumbnails. catcar.info, oemepc.com, vagcat.com and
partsouq also carry VAG coverage.

**Reference-vs-redistribution note:** ETKA plates are copyrighted VW
material — fine as private modelling reference, never redistributed inside
the app. The app's exploded layouts must be *original arrangements*
informed by, not screenshots or redraws of, the catalogue plates.

### (e) Licensing & Provenance Summary per Source Class

**GrabCAD:** Free download; per current terms, files are "for private use
only" and "for non-commercial use only, unless otherwise agreed in writing
with the Contributor." Non-commercial public use requires attribution +
link to the original model. → Private modelling reference; do not ship the
mesh. *(Source shows an inline citation chip here: "GrabCAD + 4".)*

**Sketchfab CC models:** Per-model. CC-BY 4.0 = usable with attribution
(author name + link + license). CC-BY-SA = attribution + share-alike
(viral — avoid embedding in a closed app). CC-BY-NC = non-commercial only.
Store/paid = Sketchfab/Fab license terms.

**Store meshes (TurboSquid, Hum3D, CGTrader, Free3D, SQUIR/RenderHub,
3DModels.org):** Royalty-free — permits use in a personal/portfolio app
render; **prohibits resale/redistribution of the mesh itself**.
Editorial/branded-asset caveats apply to trademarked car shapes on
TurboSquid.

**TraceParts:** Free STEP after registration; explicit
reuse-without-limitation language sits in the *paid parts-distributor*
contract only — standard users are not expressly granted
embedding/redistribution. Reference-with-permission.

**McMaster-Carr:** Free STEP download (procurement aid); redistribution
almost certainly prohibited (exact clause not verified — read
mcmaster.com/#terms before embedding).

**PARTcommunity / CADENAS 3Dfindit:** Free within 50-downloads/day fair
use; §8 expressly prohibits copying, passing to third parties,
distribution or public communication, and AI-training (penalty €20,000 +
€500/file). → Reference only; never embed.

**SSP / Bentley / erWin:** Copyrighted VW/Bentley material — private
reference only, never redistributed.

**Patents (Google Patents):** The drawings are public documents, freely
usable as engineering reference; cite the patent number.

**Manufacturer press images (media.vw.com, audi-mediacenter,
borgwarner.com):** Editorial/press-use terms — usable as reference; the
BorgWarner AWD-actuators PDF is a public knowledge-library document.

**Own-car photogrammetry:** Owner-generated; no restriction.

**README provenance-entry template (one line per asset):**
`source | url | license | date-accessed | what-was-derived`
Example: `TraceParts | traceparts.com/.../din-hex-flange-bolt | Free
download (reference, no redistribution) | 2026-08-14 | M8 hex-flange bolt
exact STEP → engine-mount fasteners`

### (f) Prioritized Acquisition List

**FREE EXACT WINS — grab first:** TraceParts DIN/ISO fastener STEP files
for every R12 class (M6–M14 hex-flange, socket-head, pan/Torx, nuts,
washers, circlips). Instant, dimensionally exact, cover a large part
count. *(Custom-model the XZN triple-square and M14×1.5 ball-seat wheel
bolts — not on standard portals.)*

**BODY ANCHOR — one paid purchase:** the **Free3D "Golf R 5-door 2014"
($29, 591,770 polys, editable, textured)** is the best value
exact-body-style anchor; if the interior is inadequate, upgrade to a Hum3D
full-car ($95) or its HQ-interior tier ($295). Rank: Free3D $29 first
(value), Hum3D $95/$295 second (interior quality). Do NOT redistribute the
mesh.

**MECHANICAL SKELETON — free:** a generic 4-cyl DOHC assembly from GrabCAD
(private reference), retopo'd, then corrected to EA888 Gen3 geometry using
SSP 606 / SSP 522 sections.

**CORRECTION LAYER — free:** download SSP 606, 522, 308, 515, 517, 520,
513, the BorgWarner AWD PDF, and the three patents (US8708123B2,
US9103243B2, US9726074B2) as the geometry-correction reference set.

**OWN-CAR SCAN — free, highest fidelity:** Polycam/RealityScan passes of
the actual car (body, bay, wheels, interior) — the single highest-value
action for lifelike accuracy.

### (g) Honest Gaps — assemblies with NO usable downloadable geometry

**DQ250 (0D9) internals + bevel box:** No CAD/mesh found. Model from SSP
308 sections + R5 dimensional data. Nearest generic: GrabCAD "Dual clutch
transmission system."

**Gen 5 Haldex coupling + rear diff:** No CAD/mesh. Model from SSP 515 +
BorgWarner PDF + US8708123B2 (FIG.7/8 pump sections) + R6 data.

**IS38 turbocharger (exact):** No exact model; generic GrabCAD
turbochargers + US9726074B2 section + R3 data. (Aftermarket IS38 exists
physically for scanning.)

**EA888 Gen3 short block/head (exact):** Only fragments + decorative
prints; build from generic DOHC + SSP 606 + R1/R2 data.

**19-inch "Pretoria" wheel:** No verified downloadable scan/CAD; model
from photos + own-car scan + R7 dimensions.

**340 mm-front / 310 mm-rear brakes, 4-link rear suspension, steering
rack:** No exact models; SSP 515 sections + R7/R8 dimensions + own-car
scan.

**Full-body Mk7 Golf R photogrammetry / Pretoria scan:** none published —
own-car scan is the fallback.

In every gap, the R1-R13 dossiers (part numbers, torques, materials,
dimensions) are the authoritative fallback that lets these assemblies be
modelled accurately from photos + dimensions.

## Recommendations

**Today:** Pull the full SSP/patent correction set (all free) and the
TraceParts fastener STEP files. This locks the reference layer and the
fastener library with zero cost and full accuracy.

**This week:** Buy one body anchor — start with the $29 Free3D Golf R
5-door 2014; evaluate topology, upgrade to a Hum3D full-car ($95) or
HQ-interior ($295) only if the interior is inadequate. Do NOT redistribute
the mesh.

**This week:** Do a Polycam/RealityScan pass of the owner's car (matte
spray + overcast). This is the highest-fidelity, unrestricted route and
closes most of the "no exact geometry" gaps (bay, wheels, body, calipers).

**Ongoing:** Build proprietary internals (DQ250, Haldex, IS38, EA888) from
the generic skeleton + SSP/patent sections + R-series dimensions. Treat
every catalogue plate as reference only; author original exploded layouts.

**Provenance discipline:** Log every asset in the README template line as
you acquire it, tagging each with its redistribution status (ship /
reference-only).

**Thresholds that change the plan:** If a full engineering-solid EA888
Gen 3 or DQ250 model ever appears on GrabCAD/CGTrader under a
redistributable license, it would displace the skeleton-build approach for
that assembly. If the app moves from personal/portfolio to commercial
distribution, every store-mesh and GrabCAD asset must be re-cleared
(GrabCAD would then require written permission; store licenses may need an
extended/editorial tier for the trademarked VW body).

## Caveats

"Royalty-free" store licenses permit *use* but universally prohibit
*redistribution of the mesh*; an interactive app that lets users extract
geometry could breach this — keep meshes non-extractable.

Trademarked VW body shapes carry editorial/branded-asset restrictions on
some portals (notably TurboSquid) — relevant if the app is ever
commercialised.

7zap/ETKA reachability varies by connection; datacentre IPs are sometimes
Cloudflare-blocked though it was reachable here — a UK residential
connection is the reliable route.

The IHI turbocharger patent (US9726074B2) shows an authentic IHI turbo
cross-section but centres on an integrated wastegate valve, not
specifically IS38 geometry — use as general turbo-section reference,
corrected with R3 data.

Poly meshes (game/render) are visual-only and carry no accurate internal
geometry. Any exploded interior view of a store mesh will reveal it is a
hollow shell — internals must come from the skeleton+section build or
own-car scan.

Body/dimension note: Wikipedia lists Mk7 wheelbase as 2,631-2,637 mm,
while VW's own Golf R technical specifications give 2,630 mm (with
front/rear track 1,541/1,516 mm) — use the VW figure for scaling and treat
the Wikipedia range as a cross-check.
