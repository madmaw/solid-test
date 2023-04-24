import { entityDescriptor } from "model/domain";
import { cards } from "./cards";

export const defaultRat = entityDescriptor.freeze({
  deck: cards,
  health: 2,
  maxHealth: 2,
});