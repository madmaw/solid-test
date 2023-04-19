import { UnreachableError } from "base/unreachable_error";
import { Entity, MonsterType } from "model/domain";
import { createRigidEntityComponent } from "./rigid/create";

export function createMonster(monster: MonsterType) {
  switch(monster) {
    case MonsterType.BigRat:
    default:
      throw new UnreachableError(monster);
  }
}