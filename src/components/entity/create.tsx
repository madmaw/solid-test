import { UnreachableError } from "base/unreachable_error";
import { MonsterType } from "model/domain";
import { createRatEntity } from "./rat/create";
import { createTrollEntity } from "./troll/create";
import { createSnailEntity } from "./snail/create";
import { createRoosterEntity } from "./rooster/create";

export function createMonster(monster: MonsterType) {
  switch(monster) {
    case MonsterType.BigRat:
      return createRatEntity();
    case MonsterType.Troll:
      return createTrollEntity();
    case MonsterType.Snail:
      return createSnailEntity();
    case MonsterType.Rooster:
      return createRoosterEntity();
    default:
      throw new UnreachableError(monster);
  }
}