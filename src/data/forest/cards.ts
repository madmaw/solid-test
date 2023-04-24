import { DamageDown, DamageUp, FireUp, Force } from "data/effects";
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

const cardBackDarkenedPath: CardBackChoice = {
  name: 'darkened path',
  description: 'You can see clearly now.',
  type: CardFaceType.ChoiceBack,
  background: CardBackgroundType.DarkenedForestPath,
  foreground: undefined,
  symbol: undefined,
  cost: [FireUp],
};
const cardBackPath: CardBackChoice = {
  name: 'path',
  description: undefined,
  type: CardFaceType.ChoiceBack,
  background: CardBackgroundType.ForestPath,
  foreground: undefined,
  symbol: undefined,
  cost: [],
};
const cardFrontPath: CardFrontChoice = {
  name: 'small clearing',
  description: 'This way looks safe.',
  type: CardFaceType.Choice,
  background: CardBackgroundType.ForestPath,
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
  description: 'The rat chitters excitedly.',
  type: CardFaceType.Choice,
  background: CardBackgroundType.ForestPath,
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
const cardFrontBrambles: CardFrontChoice = {
  name: 'thicket',
  description: 'The thorns pull at your clothes.',
  type: CardFaceType.Choice,
  background: CardBackgroundType.ForestPath,
  foreground: CardForegroundType.Trap,
  symbol: undefined,
  choice: {
    type: ChoiceType.NextPage,
    encounter: undefined,
  },
  cost: [Force],
  benefit: [],
};
const cardFrontMagicTree: CardFrontChoice = {
  name: 'magic tree',
  description: 'There\'s something unusual about this tree.',
  type: CardFaceType.Choice,
  background: CardBackgroundType.ForestPath,
  foreground: CardForegroundType.MagicTree,
  symbol: undefined,
  choice: {
    type: ChoiceType.NextPage,
    encounter: {
      type: EncounterType.Event,
      event: EventType.MagicTree,
    },
  },
  cost: [],
  benefit: [],
};

export const cards = [
  cardBackDarkenedPath,
  cardBackPath,
].flatMap(back => {
  return [
    cardFrontPath,
    cardFrontRat,
    cardFrontBrambles,
    cardFrontMagicTree,
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
