import { entityDescriptor } from "model/domain";
import { cards } from "./cards";

export const defaultDragon = entityDescriptor.freeze({
  deck: cards,
  health: 6,
  maxHealth: 6,
  age: 2000,
  deathDescription: 'The dragon crashes to the ground, dead. This is the end... for now.',
});