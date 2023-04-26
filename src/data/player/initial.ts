import { entityDescriptor } from "model/domain";

export const defaultPlayerCharacter = entityDescriptor.freeze({
  deck: [],
  health: 3,
  maxHealth: 3,
  age: 20,
  deathDescription: 'You have died, lost and unremembered.',
});