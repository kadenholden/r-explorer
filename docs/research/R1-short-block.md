# R1 return — EA888 Gen 3 (CJXB/CJXC) short block

Deep-research return received 2026-08-10 (operator-run task, delivered as
PDF; transcribed here). Scope: 2014 Mk7 Golf R, 300 PS, DQ250 DSG.
Ingested into `engine-short-block.json` + `engine-ancillaries.json` the
same day — see PROGRESS.md.

## TL;DR

- Closed-deck cast-iron block (walls reduced 3.5 ±0.8 → 3.0 ±0.5 mm; bare
  block ≈ 72 lb) with a forged, induction-hardened crank carrying **four**
  counterweights (vs eight on Gen 2), fracture-split rods with floating
  DLC-coated wrist pins and **no small-end bushing**, Golf R-specific
  9.3:1 pistons.
- **The "ladder frame" question resolves to a hybrid:** five separate
  lower main-bearing caps, cross-bolted at the sides, clamped from below
  by the die-cast aluminium upper oil-pan section (which also carries the
  upper main-bearing supports). There is **no one-piece ladder/bedplate.**
- Torques resolved against erWin/Bentley-derived sources: main-cap bolts
  **65 Nm + 90°** (not 60), conrod bolts **45 Nm + 90°, replace** (30 Nm
  with the OLD bolt is only the radial-play measuring step), vibration-
  damper centre bolt is class-dependent (8.8 = 150 Nm + 90°; 10.9 =
  100 Nm + 180° AT / 240 Nm + 180° MT) — all TTY/replace.
- CJXB (North America) vs CJXC (EU/UK) are mechanically identical at the
  short-block level; differences are calibration/emissions plumbing.

## Key hard geometry (modelling reference)

- Bore 82.5 mm, stroke 92.8 mm, 1,984 cc; compression 9.3:1 (R) vs 9.6:1
  (GTI). Rods 144 mm centre-to-centre, 23 mm trapezoidal small end, no
  bushing; piston compression height 29.6 mm.
- **Main-journal diameter 48 mm** for CJXB/CJXC (reduced from 52 mm on
  Gen 2). Family-wide conflict flagged: SSP 920243's generic 2.0L figure
  and other Gen 3 codes (CCZA etc.) say 52 mm — 48 mm is correct for the
  R's high-output forged crank.
- Rings 1.2 / 1.2 / 2.0 mm: upper rectangular asymmetric-barrel, middle
  taper-face, lower two-piece oil control; retained pin by circlips.
- Bearing shells are colour-graded select-fit: ROT (red), WEI (white),
  SWA (black), GLB (yellow); match the letter stamped on the block top
  (block shells) / crank rear face (cap shells).

## How the bottom end works (narrative digest)

Thin-wall closed-deck block with integrated coarse oil separator (part of
a ~7.8 kg family weight cut). Forged crank in five mains; journal
diameter cut 52 → 48 mm and counterweights 8 → 4 to lower friction and
rotating mass. Five discrete lower main caps, cross-bolted at the sides;
the die-cast aluminium upper oil-pan — carrying the regulated two-stage
chain-driven oil pump, honeycomb pickup and the upper main-bearing
supports — bolts up from below onto the caps as a structural sump /
partial bedplate. A glass-filled-plastic lower pan (bayonet plastic drain
plug, integrated oil-level/thermal sensor G266) bolts to the aluminium
section with a **rubber gasket** and steel bolts. Piston-cooling jets are
gated by a switching valve controlled by solenoid N522 (06K115243AB);
pump control valve is N428. Two chain-driven spheroidal-graphite balance
shafts on roller/needle bearings cancel second-order shake. Sealing:
liquid sealant at the timing cover and the gearbox-end sealing flange;
the rear main seal is a PTFE lip integrated in that flange (06K103171P),
which carries the crank-speed sender wheel and must be fitted DRY with
the correct installer.

## Parts table

| Part | OEM number | Qty | Torque / notes | Failure modes | Source grade |
| --- | --- | --- | --- | --- | --- |
| Cylinder block (bare, closed-deck) | 06K103021 (R long-block bin 06K100036D; supersession 06K100034J→06K100036C→06K100036D) | 1 | casting; walls 3.0 ±0.5 mm | core-plug weep; thread pull if alu bolts over-torqued | dealer catalogue + SSP |
| Crankshaft (forged, 4 counterweights) | 06L105101D | 1 | journals 48 mm | thrust-face wear under abusive DSG launches (rare) | dealer catalogue |
| Vibration damper / crank pulley | 06H105243Q | 1 | centre bolt class 8.8 = 150 Nm + 90°; 10.9 = 100 Nm + 180° (AT) / 240 Nm + 180° (MT) — RENEW; counterhold T10531 | rubber de-bond at high mileage | erWin via Scribd 465533887 |
| Damper centre bolt (TTY) | WHT009475 (10.9; supersedes WHT001760) | 1 | as damper row; renew | stretch/failure if reused | forum + erWin |
| Connecting rod (cracked big-end) | 06H198401D (set of 4) | 4 | rod bolt 45 Nm + 90° REPLACE; 30 Nm w/ OLD bolt = radial-play measure only | bent/stretched under detonation on tunes | dealer catalogue + forum |
| Connecting-rod bolt (TTY) | WHT001319 | 8 (2/rod) | 45 Nm + 90°, replace; lubricate thread + contact face | one-time use | forum (quotes repair manual) + vendor |
| Piston (Golf R 9.3:1) incl. pin+rings+circlips | 06K107065AG | 4 | 82.5 mm, 9.3:1, 29.6 mm comp height; GTI = 06L107065xx 9.6:1 | cracked ringlands / holed crown on high-torque IS38 tunes + low octane | dealer catalogue + forum |
| Piston ring set (per piston) | 06H198151C | 4 sets | 1.2/1.2/2.0 mm | ringland crack / land collapse under knock | vendor/dealer |
| Wrist pin (floating, DLC) | incl. with 06K107065AG | 4 | 23 mm dia; no bushing | scuffing only under oil starvation | SSP |
| Piston pin circlip | NONE FOUND (supplied with piston) | 8 | spring steel | pop-out only if mis-seated | SSP |
| Main shell, upper (block) | 06H105561K (-ROT/-WEI/-SWA/-GLB) | 5 | select-fit; letter on block top | wear rare; start-stop rated | dealer + vendor |
| Main shell, lower (cap) | 06H105591K (same grades) | 5 | select-fit; letter on crank rear face | wear rare | dealer + AERA TB063017 |
| Rod bearing shell | 06H105701P (-GLB etc.) | 8 | select-fit big-end | spun bearing under oil starvation/tune | dealer |
| Crankshaft thrust washer | WHT000033N | 2 | centre main; end-play ~0.003" | thrust wear on abusive launches (known Gen 3 concern) | forum-vendor DIY |
| Main bearing cap bolt (TTY) | N91118902 | 10 (2/cap) | **65 Nm + 90°, REPLACE** | stretch if reused | VW Vortex DIY + erWin M12=65 table |
| Main cap CROSS bolt (side) | N91187501 | 10 (2/cap) | **torque UNVERIFIED** — tightened AFTER vertical bolts | — | forum; erWin value not captured |
| Rear main seal / sealing flange (gearbox end) w/ sender wheel | 06K103171P | 1 | flange bolts ~15 Nm alternating, renew; face liquid-sealed; fit DRY with installer | PTFE lip leak at high mileage; wrong install = leak/sender misalign | dealer + vendor + DIY |
| Sealing-flange bolt | N-series M6 (renew) | 8 | ~15 Nm alternating; aluminium | thread pull if over-torqued | vendor DIY + erWin |
| Front crankshaft oil seal (pulley end) | 06L103085B | 1 | fitted in cover; cover liquid-sealed | front seal weep at high mileage | dealer catalogue |
| Timing/front cover (oil-pump cover) | 06K109210AJ | 1 | aluminium, liquid sealant; includes front seal; do not bend | sealant leak if reused w/o cleaning | dealer catalogue |
| Oil pan, upper (aluminium; carries pump + main supports) | 06K103603BL (supersedes 06K103603AN/AP) | 1 | to block: liquid sealant + aluminium bolts | sealant leaks; bolt thread pull | dealer catalogue |
| Oil pan, lower (plastic) | 06K103600D (also -R/-AE) | 1 | to upper: **8 Nm + 45°**, rubber gasket, steel bolts; houses G266 + bayonet drain plug | cracks on impact/curbing; drain-plug strip | dealer catalogue |
| Lower oil-pan gasket | 06K103649H (also -J) | 1 | rubber (Elring) | weep if reused | forum-vendor |
| Oil pan drain plug (plastic, bayonet) | NONE FOUND (integral to 06K103600D area) | 1 | quarter-turn bayonet; OEM plastic-plug torque UNVERIFIED (steel aftermarket = 30 Nm) | cross-thread/strip; leaks — common complaint; steel-pan upgrade exists | SSP + vendor |
| Lower oil-pan O-ring (pickup/level sensor) | N0282222 | 1 | sealing element | weep | dealer catalogue |
| Regulated oil pump (2-stage) incl. pickup screen | 06L115105 / 06K115105-series (verify vs CJXC catalogue) | 1 | pump-to-block 8 Nm + 90°; chain-driven; control valve N428 | chain wear rare; screen sludge blockage | dealer + DIY |
| Oil pump drive chain + tensioner | NONE FOUND (part of service kit) | 1 | per manual | chain stretch minimal on Gen 3 | SSP |
| Oil pressure regulation valve N428 | 06L115243-series | 1 | on oil-pan top section | sticking → pressure faults | SSP |
| Piston-cooling jet control valve N522 | 06K115243AB (supersedes 06K115243T) | 1 | on oil-filter/adapter housing; gates oil to jet switching valve | screen clog → circuit high/low DTC | dealer/vendor + forum |
| Piston-cooling oil spray jets | NONE FOUND (not isolated) | 4 | removal per erWin §6.3; R = higher flow | blockage under sludge | erWin + vendor |
| Balance-shaft module (assembly) | 06K103295-series (older 06H198205 bin also appears) | 1 | chain-driven, low in block; spheroidal-graphite iron, roller/needle bearings | bearing wear (Gen 2 issue; Gen 3 redesigned) | listings + forum + SSP |
| Balance-shaft oil seal (inlet side) | NONE FOUND | 1 | renew per erWin §5.3 | weep | erWin |
| Windage tray / oil baffle | incl. with upper oil pan | 1 | baffle bolt **4 Nm + 45°** | — | forum-vendor + SSP |
| Dual-mass flywheel / drive plate | NONE FOUND (verify DQ250-specific bin) | 1 | flywheel-to-crank bolts **60 Nm + 90°, REPLACE** | DMF rattle at high mileage | forum + erWin |
| Core / freeze plugs | NONE FOUND | several | steel cup, drive-in | weep/rust-out at very high mileage | SSP |
| Cylinder-block dowels | NONE FOUND | several | press-fit; locate pan/caps | — | erWin |
| Dipstick + guide tube | 06L103663-series (verify) | 1 | push-fit / bracket bolt | tube seal weep | SSP |

## Torque + tightening order

- **Main caps:** seat the centre thrust cap first, set end-play (~0.003");
  snug both bolts, 65 Nm, then +90°. N91118902 are TTY — REPLACE. Cross
  bolts N91187501 tightened AFTER the vertical bolts (value to confirm in
  erWin). VW publishes no numbered centre-out sequence for the discrete
  Gen 3 caps.
- **Rods:** 45 Nm + 90°, REPLACE bolts; lubricate thread + contact face.
  OLD bolt at 30 Nm only to measure radial play.
- **Damper centre bolt:** class 8.8 = 150 Nm + 90°; class 10.9 = 100 Nm
  + 180° (AT) or 240 Nm + 180° (MT). REPLACE; lubricate O-ring;
  counterhold T10531.
- **Sealing flange (gearbox end):** ~15 Nm alternating, renew aluminium
  bolts; face liquid-sealed. Front timing cover: liquid sealant.
- **Sump:** upper pan to block — aluminium bolts + liquid sealant (no
  torque captured); lower pan to upper — **8 Nm + 45°**; oil baffle —
  4 Nm + 45°; oil pump to block — 8 Nm + 90°.
- **Flywheel/drive-plate to crank:** 60 Nm + 90°, REPLACE.
- **Ancillary bracket / poly-V:** hand-tight → 20 Nm → +90° in sequence.

## Special tools

- **T10531** crank counterhold / turning-over tool (damper removal, TDC).
- **T10352 / T10355 / T40196 / T40271** timing-lock set (any chain work;
  scan-tool chain-drive adaptation must follow).
- **T402xx-series** gasoline crank rear-seal installer. The diesel
  **T10134 does NOT apply** — do not substitute.
- Angle gauge for all TTY joints.

## CJXB vs CJXC

Both 221 kW / 300 PS EA888 Gen 3. CJXB = North America, CJXC = EU/UK.
Short block mechanically common (block, crank 06L105101D, rods
06H198401D, pistons 06K107065AG, bearings, pump, balance module). US
catalogue bins carry Golf R/S3/TTS applicability and match CJXC. (In
Australia the MANUAL car was coded CJXB at 206 kW; this brief concerns
the 221 kW EU CJXC DSG car.)

## Source disagreements / open flags

- **OPEN (carried):** head-bolt torque 40+90+90 vs 60+180 — head is a
  later brief (R2).
- **RESOLVED:** main caps 60 vs 65 Nm + 90° → **65 Nm + 90°** (erWin
  M12 = 65 table); 60 appears only on low-grade aggregator charts.
- **FLAG:** main journal 48 mm (R-specific) vs SSP's generic 52 mm →
  48 mm is correct for CJXB/CJXC.
- **FLAG:** cross-bolt N91187501 torque not captured from a primary source.
- **FLAG:** OEM plastic drain-plug torque not found (aftermarket steel = 30 Nm).
- **FLAG:** balance-shaft module 06K103295 vs older 06H198205 — verify
  against a live CJXC ETKA entry.
- **FLAG:** oil pump + dipstick tube numbers are best-available US bins —
  verify against live CJXC ETKA/7zap.

## Geometry / diagram URLs (for mesh work)

- US dealer catalogue engine callouts (Golf R):
  vw.oempartsonline.com `/v-2016-volkswagen-golf-r--base--2-0l-l4-gas/engine--engine`
  (+ sub-pages: cylinder-block-components, oil-pan, oil-pump, bearings)
- parts.vw.com per-part diagrams: crank 06L105101D, conrod 06H198401D,
  piston 06K107065AG, upper pan 06K103603BL, rear seal 06K103171P.
- erWin/Bentley EA888 Gen 3 manual exploded views: scribd.com/document/465533887
  (mirror: pdfcoffee.com engine-tfsi-ea888-gen3-service-manual)
- Audi eSSP 920243 cutaways: static.nhtsa.gov/odi/tsbs/2014/MC-10122162-9999.pdf
- Wössner piston data (82.5/92.8/29.6/23 mm): pumaspeedpistonstore.com
  wossner-vw-golf-r-2-0-16v-turbo-forged-piston-kit

## Recommendations carried into the model

1. Confirmed hard geometry: bore 82.5, stroke 92.8, rod 144 c-c, pin 23,
   comp height 29.6, 48 mm mains; three rings; floating DLC pin, no bushing.
2. Bottom-end architecture: five discrete cross-bolted caps clamped by
   the aluminium sump-top (upper main supports) — NOT a one-piece ladder.
   Plastic lower pan with bayonet drain plug + G266.
3. parts.vw.com / vw.oempartsonline.com bins authoritative for CJXB;
   verify flagged numbers against live CJXC ETKA before ordering.
4. Close open fastener flags from the erWin PDF body (cross-bolt torque,
   plastic drain-plug torque, any numbered cap sequence).
5. Failure-mode realism: ringland cracks on Nos. 2–3, PTFE rear-main
   weep, sludge at pickup/N522 screen, cracked plastic pan from curbing.
