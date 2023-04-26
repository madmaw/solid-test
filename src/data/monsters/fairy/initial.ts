import { entityDescriptor } from "model/domain";
import { cards } from "./cards";

export const defaultPixie = entityDescriptor.freeze({
  deck: cards,
  health: 1,
  maxHealth: 1,
  age: 300,
  deathDescription: 'The pixie turns into a shower of sparkling dust.',
});