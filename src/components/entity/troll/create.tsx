import { 
  cardFrontTrollOdour,
  cardFrontTrollRegeneration,
  cardFrontTrollSmash,
 } from "data/monsters/troll/cards";
import { createRigidEntity } from "../rigid/create";
import { Animations } from "../rigid/rigid_entity_controller";
import { createUnicodeEntity } from "../unicode/create";

export function createTrollEntity() {
  return createRigidEntity(
    new Map([
      [cardFrontTrollSmash, Animations.Attack],
      [cardFrontTrollOdour, Animations.Special],
      [cardFrontTrollRegeneration, Animations.Block],
    ]),
    createUnicodeEntity('🧌'),
    undefined,
    false,
  );
}
