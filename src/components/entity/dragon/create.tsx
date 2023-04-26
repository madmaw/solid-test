import { createRigidEntity } from "../rigid/create";
import { Animations } from "../rigid/rigid_entity_controller";
import { createUnicodeEntity } from "../unicode/create";
import { cardFrontDragonArmour, cardFrontDragonBite, cardFrontDragonBreathe, cardFrontDragonRoar } from "data/monsters/dragon/cards";

export function createDragonEntity() {
  return createRigidEntity(
    new Map([
      [cardFrontDragonArmour, Animations.Block],
      [cardFrontDragonBite, Animations.Attack],
      [cardFrontDragonBreathe, Animations.Attack],
      [cardFrontDragonRoar, Animations.Special],
    ]),
    createUnicodeEntity('🐉'),
    undefined,
    false,
  );
}
