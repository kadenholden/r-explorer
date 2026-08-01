import { registerRecipe, resolveRecipe } from './registry'
import { brakeDisc } from './brakeDisc'
import { brakeCaliper } from './brakeCaliper'
import { brakeCarrier } from './brakeCarrier'
import { brakePad } from './brakePad'
import { hexBolt } from './fasteners'

registerRecipe('brakeDisc', brakeDisc)
registerRecipe('brakeCaliper', brakeCaliper)
registerRecipe('brakeCarrier', brakeCarrier)
registerRecipe('brakePad', brakePad)
registerRecipe('hexBolt', hexBolt)

export { resolveRecipe }
