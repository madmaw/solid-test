import { DamageDown, DamageUp } from "data/effects";
import { CardBackgroundType, CardFaceType, RecycleTarget, ChoiceType, EncounterType, MonsterType, EventType, CardState, CardForegroundType, CardBackChoice, CardFrontChoice, CardDefinition } from "model/domain";

const cardBackJammedDoor: CardBackChoice = {
  name: 'jammed door',
  type: CardFaceType.ChoiceBack,
  background: CardBackgroundType.Door,
  foreground: undefined,
  cost: [DamageUp],
};
const cardBackDoor: CardBackChoice = {
  name: 'door',
  type: CardFaceType.ChoiceBack,
  background: CardBackgroundType.Door,
  foreground: undefined,
  cost: [],
};
const cardFrontEmpty: CardFrontChoice = {
  name: 'empty passage',
  type: CardFaceType.Choice,
  background: CardBackgroundType.Passageway,
  foreground: undefined,
  choice: {
    type: ChoiceType.NextPage,
    encounter: undefined,
  },
  cost: [],
  benefit: [],
};
const cardFrontRat: CardFrontChoice = {
  name: 'a big rat',
  type: CardFaceType.Choice,
  background: CardBackgroundType.Passageway,
  foreground: CardForegroundType.Rat,
  choice: {
    type: ChoiceType.NextPage,
    encounter: {
      type: EncounterType.Battle,
      monster: MonsterType.BigRat,
    },
  },
  cost: [],
  benefit: [],
};
const cardFrontTrapped: CardFrontChoice = {
  name: 'trapped hallway',
  type: CardFaceType.Choice,
  background: CardBackgroundType.Passageway,
  foreground: CardForegroundType.Trap,
  choice: {
    type: ChoiceType.NextPage,
    encounter: undefined,
  },
  cost: [DamageDown],
  benefit: [],
};
const cardFrontFountain: CardFrontChoice = {
  name: 'fountain',
  type: CardFaceType.Choice,
  background: CardBackgroundType.Passageway,
  foreground: CardForegroundType.Fountain,
  choice: {
    type: ChoiceType.NextPage,
    encounter: {
      type: EncounterType.Event,
      event: EventType.Fountain,
    },
  },
  cost: [],
  benefit: [],
};

export const cards = [
  cardBackDoor,
  cardBackJammedDoor,
].flatMap(back => {
  return [
    cardFrontEmpty,
    cardFrontRat,
    cardFrontTrapped,
    cardFrontFountain,
  ].map<CardDefinition>(front => {
    return {
      recycleTarget: RecycleTarget.DiscardDeckTop,
      faces: [back, front],
      symbol: undefined,
    };
  });
}).map<CardState>(definition => ({
  definition,
  visibleFaceIndex: 0,
}));
