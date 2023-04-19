import { cardFrontRatBite } from "data/rat/cards";
import { createRigidEntity } from "../rigid/create";
import { Animations } from "../rigid/rigid_entity_controller";
import { createUnicodeEntity } from "../unicode/create";

export function createRatEntity() {
  
  return createRigidEntity(
    new Map([[cardFrontRatBite, Animations.Attack]]),
    createUnicodeEntity('🐀'),
    undefined,
  );
}
