import { entityDescriptor } from "model/domain";
import { cardMight } from "./cards/might";
import { cardKick } from "./cards/kick";
import { cardShield } from "./cards/shield";
import { cardAgility } from "./cards/agilty";
import { cardDodge } from "./cards/dodge";
import { cardSlash } from "./cards/sword";

export const defaultPlayerCharacter = entityDescriptor.freeze({
  deck: [
    cardMight,
    cardKick,
    cardShield,
    cardMight,
    cardKick,
    cardAgility,
    cardDodge,
    cardSlash,    
    cardMight,
  ],
  health: 3,
  maxHealth: 3,
});