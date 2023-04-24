import { 
  cardFrontRoosterClaw,
  cardFrontRoosterCrow,
  cardFrontRoosterEvade,
} from "data/monsters/rooster/cards";
import { createRigidEntity } from "../rigid/create";
import { Animations } from "../rigid/rigid_entity_controller";
import { createUnicodeEntity } from "../unicode/create";

export function createRoosterEntity() {
  return createRigidEntity(
    new Map([
      [cardFrontRoosterClaw, Animations.Attack],
      [cardFrontRoosterEvade, Animations.Block],
      [cardFrontRoosterCrow, Animations.Special],
    ]),
    createUnicodeEntity('🐓'),
    undefined,
    true,
  );
}
