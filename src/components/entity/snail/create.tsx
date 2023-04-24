import { 
  cardFrontSnailBite,
  cardFrontSnailHide,
} from "data/monsters/snail/cards";
import { createRigidEntity } from "../rigid/create";
import { Animations } from "../rigid/rigid_entity_controller";
import { createUnicodeEntity } from "../unicode/create";

export function createSnailEntity() {
  return createRigidEntity(
    new Map([
      [cardFrontSnailBite, Animations.Attack],
      [cardFrontSnailHide, Animations.Block],
    ]),
    createUnicodeEntity('🐌'),
    undefined,
    true,
  );
}
