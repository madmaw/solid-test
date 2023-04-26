import { createRigidEntity } from "../rigid/create";
import { Animations } from "../rigid/rigid_entity_controller";
import { createUnicodeEntity } from "../unicode/create";
import { cardFrontSpiderBite, cardFrontSpiderSting, cardFrontSpiderWeb } from "data/monsters/spider/cards";

export function createSpiderEntity() {
  return createRigidEntity(
    new Map([
      [cardFrontSpiderBite, Animations.Attack],
      [cardFrontSpiderSting, Animations.Attack],
      [cardFrontSpiderWeb, Animations.Special],
    ]),
    createUnicodeEntity('🕷️'),
    undefined,
    true,
  );
}
