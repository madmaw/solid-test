import { entityDescriptor } from "model/domain";
import { cards } from "./cards";

export const defaultDummy = entityDescriptor.freeze({
  deck: cards,
  health: 6,
  maxHealth: 6,
  age: 600,
});