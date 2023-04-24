import { DamageDown, DamageUp } from "data/effects";
import {
  CardBackgroundType,
  CardFaceType,
  RecycleTarget,
  ChoiceType,
  EncounterType,
  MonsterType,
  EventType,
  CardState,
  CardForegroundType,
  CardBackChoice,
  CardFrontChoice,
  CardDefinition,
} from "model/domain";

const cardBackJammedDoor: CardBackChoice = {
  name: 'jammed door',
  description: 'Grudgingly, the door opens',
  type: CardFaceType.ChoiceBack,
  background: CardBackgroundType.Door,
  foreground: undefined,
  symbol: undefined,
  cost: [DamageUp],
};
const cardBackDoor: CardBackChoice = {
  name: 'door',
  description: undefined,
  type: CardFaceType.ChoiceBack,
  background: CardBackgroundType.Door,
  foreground: undefined,
  symbol: undefined,
  cost: [],
};
const cardFrontEmpty: CardFrontChoice = {
  name: 'empty passage',
  description: 'A whole log of nothing.',
  type: CardFaceType.Choice,
  background: CardBackgroundType.Passageway,
  foreground: undefined,
  symbol: undefined,
  choice: {
    type: ChoiceType.NextPage,
    encounter: undefined,
  },
  cost: [],
  benefit: [],
};
const cardFrontRat: CardFrontChoice = {
  name: 'a big rat',
  description: 'The rat looks at you belligerently.',
  type: CardFaceType.Choice,
  background: CardBackgroundType.Passageway,
  foreground: CardForegroundType.Rat,
  symbol: undefined,
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
  description: 'An arrow flies out of a hidden recess.',
  type: CardFaceType.Choice,
  background: CardBackgroundType.Passageway,
  foreground: CardForegroundType.Trap,
  symbol: undefined,
  choice: {
    type: ChoiceType.NextPage,
    encounter: undefined,
  },
  cost: [DamageDown],
  benefit: [],
};
const cardFrontFountain: CardFrontChoice = {
  name: 'fountain',
  description: undefined,
  type: CardFaceType.Choice,
  background: CardBackgroundType.Passageway,
  foreground: CardForegroundType.Fountain,
  symbol: undefined,
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
    };
  });
}).map<CardState>(definition => ({
  definition,
  visibleFaceIndex: 0,
}));
