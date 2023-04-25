
import { createRigidEntity } from "../rigid/create";
import { createUnicodeEntity } from "../unicode/create";

export function createDummyEntity() {
  return createRigidEntity(
    new Map([]),
    createUnicodeEntity('🪵'),
    undefined,
    false,
  );
}
