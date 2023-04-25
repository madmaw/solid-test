
import { createRigidEntity } from "../rigid/create";
import { createUnicodeEntity } from "../unicode/create";

export function createShopEntity() {
  return createRigidEntity(
    new Map([]),
    createUnicodeEntity('👳'),
    undefined,
    false,
  );
}
