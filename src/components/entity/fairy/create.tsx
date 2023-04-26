import {
  cardFrontFairyBlink,
  cardFrontFairyCurse,
  cardFrontFairyShock,
} from "data/monsters/fairy/cards";
import { createRigidEntity } from "../rigid/create";
import { Animations } from "../rigid/rigid_entity_controller";
import { createUnicodeEntity } from "../unicode/create";

export function createFairyEntity() {
  return createRigidEntity(
    new Map([
      [cardFrontFairyShock, Animations.Attack],
      [cardFrontFairyCurse, Animations.Special],
      [cardFrontFairyBlink, Animations.Block],
    ]),
    createUnicodeEntity('🧚'),
    undefined,
    false,
  );
}
