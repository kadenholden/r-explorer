# Oil leak reference — EA888 Gen 3 (AV14 UCX)

Notes behind `src/data/leaks.ts` and the "Find where the oil is actually
leaking from" guided job. Ranking is likelihood × ease of checking for THIS
car (Gen 3, ~92k miles, tuned, and with oil already showing at the sump
flange area), not a generic list.

## The rule the whole tool is built on

Oil runs downhill and then gets blown backwards down the block by airflow.
So the place you SEE oil is very often not the place it comes from. Two
specific traps on this engine:

1. **Cam bridge → upper timing cover.** Oil escaping the cam-bridge sealant
   at the very top runs down INTO the upper timing cover and comes out at
   the cover's face. Sources describe the leak path explicitly: seals on
   the inside of the cam bridge where the cam adjuster magnet sits leak
   "down into the upper timing cover". Replacing the cover seals when the
   bridge is the source just moves the money around.
2. **Anything mid-height → bellhousing.** The oil filter housing / cooler
   joint and the vacuum pump gasket both drip down the back of the block
   onto the bellhousing, which is exactly where a rear main seal shows.
   The rear main seal is a gearbox-out job; the other two are not. Prove
   the cheap ones dry first.

## Sources

- Alex's Autohaus, *EA888 Gen 3 Common Problems* — cam bridge/adjuster
  seals leaking down into the upper timing cover; upper timing cover
  gaskets "serviceable independently" without replacing the cover; rear
  main seal "very prone to leaking"; PCV a failure point across all EA888
  generations; oil working between block and water pump assembly and
  killing that gasket in turn.
  <https://alexsautohaus.com/ea888-gen-3-common-problems/>
- Deutsche Auto Parts, *EA888 Gen 3 cam bridge / cam cage reseal kit* —
  the cam bridge bolts straight to the head and is sealed with anaerobic
  flange sealant, no conventional cover gasket; the sealant degrades under
  hot oil and crankcase pressure and weeps from under the girdle.
  <https://www.shopdap.com/mk7-cam-cage-reseal-kit-valve-cover-gasket.html>
  (page blocks automated fetch; read via search summary)
- 034Motorsport, *EA888 Gen 3 2.0T Vacuum Pump Kit* — OEM vacuum pump
  06L 145 100 K or M, OEM vacuum pump gasket 06H 103 121 J. This is the
  provenance for both part numbers; they are vendor-listed, NOT verified in
  erWin. <https://www.034motorsport.com/ea888-gen-3-2-0t-vacuum-pump-kit.html>
- Project research returns R1 (short block, sump, filter housing), R2 (cam
  bridge sealant D174003M2, PCV revisions), R9 (filter housing/oil cooler
  family 06L117021), R13 (fault library).

## Open items

- **Vacuum pump position is an estimate.** Placed at the offside (belt) end
  of the cylinder head on the reasoning that the chain drive and flywheel
  are at the gearbox end, so the camshaft free ends are at the belt end.
  Not photo-confirmed on this car. Logged in `docs/UNVERIFIED.md`.
- No torque figure captured for the vacuum pump bolts or the oil filter
  housing bolts — erWin needed.
- Sump drain plug torque remains unverified (plastic quarter-turn bayonet,
  no crush washer).
