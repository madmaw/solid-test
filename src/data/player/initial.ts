import { entityDescriptor } from "model/domain";
import { cardForceRandom } from "./cards/force";
import { cardFinesseLazy } from "./cards/finesse";
import { cardDodge } from "./cards/dodge";
import { cardKick } from "./cards/kick";
import { cardMindLazy } from "./cards/mind";

export const defaultPlayerCharacter = entityDescriptor.freeze({
  deck: [
    cardForceRandom,
    cardDodge,
    cardMindLazy,
    cardFinesseLazy,
    cardKick,
  ],
  health: 3,
  maxHealth: 3,
});