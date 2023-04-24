import { entityDescriptor } from "model/domain";
import { cards } from "./cards";

export const defaultTroll = entityDescriptor.freeze({
  deck: cards,
  health: 4,
  maxHealth: 4,
});