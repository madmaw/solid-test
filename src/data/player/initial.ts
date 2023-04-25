import { entityDescriptor } from "model/domain";
import { cardForceRandom } from "data/items/force";
import { cardFinesseLazy } from "data/items/finesse";
import { cardDodge } from "../items/dodge";
import { cardKick } from "data/items/kick";
import { cardMindLazy } from "data/items/mind";

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
  age: 20,
});