import { registerRecipe, resolveRecipe } from './registry'
import { brakeDisc } from './brakeDisc'
import { brakeCaliper } from './brakeCaliper'
import { brakeCarrier } from './brakeCarrier'
import { brakePad } from './brakePad'
import { hexBolt } from './fasteners'
import { engineBlock } from './engineBlock'
import { crankshaft } from './crankshaft'
import { connectingRod } from './connectingRod'
import { piston } from './piston'
import { balanceShaft } from './balanceShaft'
import { ladderFrame } from './ladderFrame'
import { oilJet } from './oilJet'
import { cylinderHead, headGasket } from './cylinderHead'
import { camshaft, avsCamElement, avsActuator, valve } from './camshaft'
import { timingChain, chainSprocket, chainTensioner, chainGuideRail } from './timingDrive'

registerRecipe('brakeDisc', brakeDisc)
registerRecipe('brakeCaliper', brakeCaliper)
registerRecipe('brakeCarrier', brakeCarrier)
registerRecipe('brakePad', brakePad)
registerRecipe('hexBolt', hexBolt)
registerRecipe('engineBlock', engineBlock)
registerRecipe('crankshaft', crankshaft)
registerRecipe('connectingRod', connectingRod)
registerRecipe('piston', piston)
registerRecipe('balanceShaft', balanceShaft)
registerRecipe('ladderFrame', ladderFrame)
registerRecipe('oilJet', oilJet)
registerRecipe('cylinderHead', cylinderHead)
registerRecipe('headGasket', headGasket)
registerRecipe('camshaft', camshaft)
registerRecipe('avsCamElement', avsCamElement)
registerRecipe('avsActuator', avsActuator)
registerRecipe('valve', valve)
registerRecipe('timingChain', timingChain)
registerRecipe('chainSprocket', chainSprocket)
registerRecipe('chainTensioner', chainTensioner)
registerRecipe('chainGuideRail', chainGuideRail)

export { resolveRecipe }
