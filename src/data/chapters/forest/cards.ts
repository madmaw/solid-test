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
  cardDescriptor,
} from "model/domain";

const cardBackDarkenedPath: CardBackChoice = {
  name: 'shadowed path',
  description: 'The path reveals itself.',
  type: CardFaceType.ChoiceBack,
  background: CardBackgroundType.DarkenedForestPath,
  foreground: undefined,
  symbol: undefined,
  cost: [FireUp],
};
const cardBackOvergrownPath: CardBackChoice = {
  name: 'overgrown path',
  description: 'You clear the branches.',
  type: CardFaceType.ChoiceBack,
  background: CardBackgroundType.DarkenedForestPath,
  foreground: undefined,
  symbol: undefined,
  cost: [Force],
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
  name: 'a big snail',
  description: 'The snail inches toward you.',
  type: CardFaceType.Choice,
  background: CardBackgroundType.ForestPath,
  foreground: CardForegroundType.Snail,
  symbol: undefined,
  choice: {
    type: ChoiceType.NextPage,
    encounter: {
      type: EncounterType.Battle,
      monster: MonsterType.Snail,
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
const cardFrontMushroom: CardFrontChoice = {
  name: 'mushroom',
  description: 'You see a mushroom circle.',
  type: CardFaceType.Choice,
  background: CardBackgroundType.ForestPath,
  foreground: CardForegroundType.Mushroom,
  symbol: undefined,
  choice: {
    type: ChoiceType.NextPage,
    encounter: {
      type: EncounterType.Event,
      event: EventType.Mushroom,
    },
  },
  cost: [],
  benefit: [],
};

export const cards = [
  cardBackOvergrownPath,
  cardBackDarkenedPath,
  cardBackPath,
].flatMap(back => {
  return [
    cardFrontPath,
    cardFrontRat,
    cardFrontBrambles,
  ].map<CardDefinition>(front => {
    return {
      recycleTarget: RecycleTarget.DrawDeckRandom,
      faces: [back, front],
    };
  });
}).concat([{
  faces: [cardBackDarkenedPath, cardFrontMagicTree],
  recycleTarget: RecycleTarget.DiscardDeckTop,
}, {
  faces: [cardBackOvergrownPath, cardFrontMushroom],
  recycleTarget: RecycleTarget.DiscardDeckTop,
}]).map<CardState>(definition => ({
  definition,
  visibleFaceIndex: 0,
}));

const cardBackFinal: CardBackChoice = {
  name: 'cobbled road',
  description: 'You stumble out of the forest, blinking in the sunlight.',
  type: CardFaceType.ChoiceBack,
  background: CardBackgroundType.DarkenedForestPath,
  foreground: undefined,
  symbol: undefined,
  cost: [],
};

const cardFrontFinal: CardFrontChoice = {
  name: 'troll',
  description: 'A vulgar oaf blocks your way. He looks at you, licking his lips.',
  type: CardFaceType.Choice,
  background: CardBackgroundType.ForestPath,
  foreground: undefined,
  symbol: undefined,
  choice: {
    type: ChoiceType.NextChapter,
    encounter: {
      type: EncounterType.Battle,
      monster: MonsterType.Troll,
    },
    targetChapterIndex: 1,
  },
  cost: [],
  benefit: [],
};

export const finalCard = cardDescriptor.freeze({
  definition: {
    faces: [cardBackFinal, cardFrontFinal],
    recycleTarget: RecycleTarget.DiscardDeckTop,
  },
  visibleFaceIndex: 0,
});

