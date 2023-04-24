import { entityDescriptor } from "model/domain";
import { cards } from "../rat/cards";

export const defaultRooster = entityDescriptor.freeze({
  deck: cards,
  health: 2,
  maxHealth: 2,
});