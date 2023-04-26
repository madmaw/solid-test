import { entityDescriptor } from "model/domain";
import { cards } from "./cards";

export const defaultSpider = entityDescriptor.freeze({
  deck: cards,
  health: 2,
  maxHealth: 2,
  age: 14,
  deathDescription: 'The spider curls up into a ball.',
});