import { Perception, Force, Finesse } from "data/effects";
import { cardFrontShrine } from "data/events/shrine/cards";
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
  cost: [Perception],
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
const cardFrontSnail: CardFrontChoice = {
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
  description: 'The thorns entangle you.',
  type: CardFaceType.Choice,
  background: CardBackgroundType.ForestPath,
  foreground: CardForegroundType.Trap,
  symbol: undefined,
  choice: {
    type: ChoiceType.NextPage,
    encounter: undefined,
  },
  cost: [Force, Finesse],
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
  description: 'A circle of mushrooms.',
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
const cardFrontTreasure: CardFrontChoice = {
  name: 'treasure',
  description: 'The glint of gold.',
  type: CardFaceType.Choice,
  background: CardBackgroundType.Passageway,
  foreground: CardForegroundType.Treasure,
  symbol: undefined,
  choice: {
    type: ChoiceType.NextPage,
    encounter: {
      type: EncounterType.Event,
      event: EventType.Treasure,
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
    cardFrontSnail,
    cardFrontBrambles,
  ].map<CardDefinition>(front => {
    return {
      recycleTarget: RecycleTarget.Draw,
      recyclePosition: undefined,
      faces: [back, front],
    };
  });
}).concat([{
  faces: [cardBackOvergrownPath, cardFrontMagicTree],
  recycleTarget: RecycleTarget.Discard,
  recyclePosition: undefined,
}, {
  faces: [cardBackDarkenedPath, cardFrontMagicTree],
  recycleTarget: RecycleTarget.Discard,
  recyclePosition: undefined,
}, {
  faces: [cardBackOvergrownPath, cardFrontMushroom],
  recycleTarget: RecycleTarget.Discard,
  recyclePosition: undefined,
}, {
  faces: [cardBackDarkenedPath, cardFrontMushroom],
  recycleTarget: RecycleTarget.Discard,
  recyclePosition: undefined,
}, {
  faces: [cardBackPath, cardFrontMushroom],
  recycleTarget: RecycleTarget.Discard,
  recyclePosition: undefined,
}, {
  faces: [cardBackOvergrownPath, cardFrontShrine],
  recycleTarget: RecycleTarget.Discard,
  recyclePosition: undefined,
}, {
  faces: [cardBackDarkenedPath, cardFrontShrine],
  recycleTarget: RecycleTarget.Discard,
  recyclePosition: undefined,
}, {
  faces: [cardBackPath, cardFrontTreasure],
  recycleTarget: RecycleTarget.Discard,
  recyclePosition: undefined,
}, {
  faces: [cardBackPath, cardFrontShrine],
  recycleTarget: RecycleTarget.Discard,
  recyclePosition: undefined,
}]).map<CardState>(definition => ({
  ...definition,
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
  description: 'A vulgar oaf blocks your way. He looks at you, licking his lips obscenely.',
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
    targetChapterIndex: 4,
  },
  cost: [],
  benefit: [],
};

export const finalCard = cardDescriptor.freeze({
  faces: [cardBackFinal, cardFrontFinal],
  recycleTarget: RecycleTarget.Discard,
  recyclePosition: undefined,
  visibleFaceIndex: 0,
});

