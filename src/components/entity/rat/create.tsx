import { cardFrontRatBite, cardFrontRatCower, cardFrontRatScreech } from "data/rat/cards";
import { createRigidEntity } from "../rigid/create";
import { Animations } from "../rigid/rigid_entity_controller";
import { createUnicodeEntity } from "../unicode/create";

export function createRatEntity() {
  return createRigidEntity(
    new Map([
      [cardFrontRatBite, Animations.Attack],
      [cardFrontRatScreech, Animations.Special],
      [cardFrontRatCower, Animations.Block],
    ]),
    createUnicodeEntity('🐀'),
    undefined,
    true,
  );
}
