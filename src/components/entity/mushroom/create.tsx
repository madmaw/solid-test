
import { createRigidEntity } from "../rigid/create";
import { createUnicodeEntity } from "../unicode/create";

export function createMushroomEntity() {
  return createRigidEntity(
    new Map([]),
    createUnicodeEntity('🍄'),
    undefined,
    false,
  );
}
