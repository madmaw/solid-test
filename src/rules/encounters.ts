import { UnreachableError } from "base/unreachable_error";
import { defaultRat } from "data/rat/initial";
import { EncounterDefinition, EncounterState, EncounterType, EntityState, MonsterType } from "model/domain";
import { randomizeDeck } from "./games";

function hydrateMonster(monster: MonsterType): EntityState {
  switch (monster) {
    case MonsterType.BigRat:
      return defaultRat;
    default:
      throw new UnreachableError(monster);
  }
}

export function hydrateEncounter(encounter: EncounterDefinition): EncounterState {
  switch (encounter.type) {
    case EncounterType.Battle:
      const monster = hydrateMonster(encounter.monster);
      const deck = randomizeDeck(monster.deck);
      return {
        type: encounter.type,
        monster: {
          ...monster,
          deck,
        },
      };
    case EncounterType.Event:
      return {
        type: EncounterType.Event,
      };
    default:
      throw new UnreachableError(encounter);
  }
}
