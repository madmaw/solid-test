
import { createRigidEntity } from "../rigid/create";
import { createUnicodeEntity } from "../unicode/create";

export function createShrineEntity() {
  return createRigidEntity(
    new Map([]),
    createUnicodeEntity('⛩️'),
    undefined,
    false,
  );
}
