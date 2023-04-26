import { UnreachableError } from "base/unreachable_error";
import { MonsterType } from "model/domain";
import { createRatEntity } from "./rat/create";
import { createTrollEntity } from "./troll/create";
import { createSnailEntity } from "./snail/create";
import { createRoosterEntity } from "./rooster/create";
import { createDummyEntity } from "./dummy/create";
import { createFairyEntity } from "./fairy/create";
import { createSpiderEntity } from "./spider/create";

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
    case MonsterType.Dummy:
      return createDummyEntity();
    case MonsterType.Fairy:
      return createFairyEntity();
    case MonsterType.Spider:
      return createSpiderEntity();
    default:
      throw new UnreachableError(monster);
  }
}
