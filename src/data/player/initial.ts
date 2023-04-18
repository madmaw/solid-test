import { entityDescriptor } from "model/domain";
import { cardMight } from "./cards/might";
import { cardKick } from "./cards/kick";
import { cardShield } from "./cards/shield";

export const defaultPlayerCharacter = entityDescriptor.freeze({
  deck: [
    cardMight,
    cardKick,
    cardShield,
    cardMight,
    cardMight,
    cardMight,
    cardKick,
  ],
  health: 3,
  maxHealth: 3,
});