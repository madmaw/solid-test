import { arrayRandomize } from "base/arrays";
import { UnreachableError } from "base/unreachable_error";
import { defaultRat } from "data/monsters/rat/initial";
import { defaultTroll } from "data/monsters/troll/initial";
import { cards as fountainCards, cardIgnore as fountainIgnore } from "data/events/fountain/cards";
import { cards as magicTreeCards } from 'data/events/magic_tree/cards';
import { EncounterDefinition, EncounterState, EncounterType, EntityState, EventType, MonsterType } from "model/domain";
import { defaultSnail } from "data/monsters/snail/initial";

function hydrateMonster(monster: MonsterType): EntityState {
  switch (monster) {
    case MonsterType.BigRat:
      return defaultRat;
    case MonsterType.Troll:
      return defaultTroll;
    case MonsterType.Snail:
      return defaultSnail;
    default:
      throw new UnreachableError(monster);
  }
}

export function hydrateEncounter(encounter: EncounterDefinition): EncounterState {
  switch (encounter.type) {
    case EncounterType.Battle:
      const monster = hydrateMonster(encounter.monster);
      const deck = arrayRandomize(monster.deck);
      return {
        type: encounter.type,
        monsterType: encounter.monster,
        monster: {
          ...monster,
          deck,
        },
      };
    case EncounterType.Event:
      switch (encounter.event) {
        case EventType.Fountain:
          return {
            type: EncounterType.Event,
            eventType: encounter.event,
            deck: arrayRandomize(fountainCards).slice(0, 2).concat([fountainIgnore]),
          };
        case EventType.MagicTree:
          return {
            type: EncounterType.Event,
            eventType: encounter.event,
            deck: arrayRandomize(magicTreeCards).slice(0, 3),
          };
        default:
          throw new UnreachableError(encounter.event);
      }
    default:
      throw new UnreachableError(encounter);
  }
}
