import { UnreachableError } from "base/unreachable_error";
import { MonsterType } from "model/domain";
import { createRatEntity } from "./rat/create";

export function createMonster(monster: MonsterType) {
  switch(monster) {
    case MonsterType.BigRat:
      return createRatEntity();
    default:
      throw new UnreachableError(monster);
  }
}