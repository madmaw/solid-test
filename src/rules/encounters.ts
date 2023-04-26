import { arrayRandomize } from "base/arrays";
import { UnreachableError } from "base/unreachable_error";
import { defaultRat } from "data/monsters/rat/initial";
import { defaultTroll } from "data/monsters/troll/initial";
import { cards as fountainCards, cardIgnore as fountainIgnore } from "data/events/fountain/cards";
import { cards as magicTreeCards } from 'data/events/magic_tree/cards';
import { cards as mushroomCards, cardIgnore as mushroomIgnore } from 'data/events/mushroom/cards';
import { cards as shrineCards, cardIgnore as shrineIgnore } from 'data/events/shrine/cards';
import { cards as itemCards, ignoreCards } from 'data/items/cards';
import { CardState, EncounterDefinition, EncounterState, EncounterType, EntityState, EventType, MonsterType, SymbolType } from "model/domain";
import { defaultSnail } from "data/monsters/snail/initial";
import { defaultRooster } from "data/monsters/rooster/initial";
import { defaultDummy } from "data/monsters/dummy/initial";

function hydrateMonster(monster: MonsterType): EntityState {
  switch (monster) {
    case MonsterType.BigRat:
      return defaultRat;
    case MonsterType.Troll:
      return defaultTroll;
    case MonsterType.Snail:
      return defaultSnail;
    case MonsterType.Rooster:
      return defaultRooster;
    case MonsterType.Dummy:
      return defaultDummy;
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
        case EventType.Mushroom:
          return {
            type: EncounterType.Event,
            eventType: encounter.event,
            deck: arrayRandomize(mushroomCards).slice(0, 2).concat([mushroomIgnore]),
          };
        case EventType.Shrine:
          return {
            type: EncounterType.Event,
            eventType: encounter.event,
            deck: arrayRandomize(shrineCards).slice(0, 2).concat([shrineIgnore]),
          };
        case EventType.Treasure:
          return {
            type: EncounterType.Event,
            eventType: encounter.event,
            deck: arrayRandomize(itemCards).slice(0, 2)
                .concat(ignoreCards[Math.floor(Math.random() * ignoreCards.length)]),
          };
        case EventType.Shop:
          return {
            type: EncounterType.Event,
            eventType: encounter.event,
            deck: [
              getRandomItem(SymbolType.Force, itemCards), 
              getRandomItem(SymbolType.Finesse, itemCards),
              getRandomItem(SymbolType.Magic, itemCards),
            ],
          };
        default:
          throw new UnreachableError(encounter.event);
      }
    default:
      throw new UnreachableError(encounter);
  }
}

function getRandomItem(symbol: SymbolType, items: readonly CardState[]) {
  const symbolItems = items.filter(item => item.faces.some(face => face.symbol === symbol));
  const usableItems = symbolItems.length > 0 ? symbolItems : items;
  return arrayRandomize(usableItems)[0];
}
