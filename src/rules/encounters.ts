import { UnreachableError } from "base/unreachable_error";
import { defaultRat } from "data/rat/initial";
import { EncounterDefinition, EncounterState, EncounterType, EntityState, MonsterType } from "model/domain";

function hydrateMonster(monster: MonsterType): EntityState {
  return defaultRat;
}

export function hydrateEncounter(encounter: EncounterDefinition): EncounterState {
  switch (encounter.type) {
    case EncounterType.Battle:
      return {
        type: encounter.type,
        monster: hydrateMonster(encounter.monster),
      };
    case EncounterType.Event:
      return {
        type: EncounterType.Event,
      };
    default:
      throw new UnreachableError(encounter);
  }
}
