import { entityDescriptor } from "model/domain";
import { cards } from "./cards";

export const defaultSnail = entityDescriptor.freeze({
  deck: cards,
  health: 1,
  maxHealth: 1,
});