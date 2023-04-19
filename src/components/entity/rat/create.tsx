import { cardFaceBite } from "data/rat/cards";
import { createRigidEntity } from "../rigid/create";
import { Animations } from "../rigid/rigid_entity_controller";

export function createRatEntity() {
  
  return createRigidEntity(
    new Map([[cardFaceBite, Animations.Attack]]),

  );
}
