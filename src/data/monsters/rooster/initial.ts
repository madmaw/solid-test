import { entityDescriptor } from "model/domain";
import { cards } from "../rooster/cards";

export const defaultRooster = entityDescriptor.freeze({
  deck: cards,
  health: 2,
  maxHealth: 2,
  age: 5,
  deathDescription: 'You feel no pity as the roosters eyes glaze over.',
});