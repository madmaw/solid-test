import {
  AgeDown,
  AgeUp,
  Finesse,
  Healing,
  Magic,
  Mind,
  PoisonDown,
} from "data/effects";
import {
  CardBackChoice,
  CardBackgroundType,
  CardDefinition,
  CardFaceType,
  CardForegroundType,
  CardFrontChoice,
  ChoiceType,
  RecycleTarget,
  cardDescriptor,
} from "model/domain";

const cardBackMushroomBlue: CardBackChoice = {
  name: 'blue mushroom',
  description: 'You divine the effect of the mushroom.',
  type: CardFaceType.ChoiceBack,
  background: CardBackgroundType.Crosshatched,
  foreground: CardForegroundType.Mushroom,
  symbol: undefined,
  cost: [Magic],
};
const cardBackMushroomRed: CardBackChoice = {
  name: 'red mushroom',
  description: 'You inspect the mushroom.',
  type: CardFaceType.ChoiceBack,
  background: CardBackgroundType.Crosshatched,
  foreground: CardForegroundType.Mushroom,
  symbol: undefined,
  cost: [Mind, Finesse],
};
const cardBackMushroomFamiliar: CardBackChoice = {
  name: 'familiar mushroom',
  description: 'You recognise one of the mushrooms.',
  type: CardFaceType.ChoiceBack,
  background: CardBackgroundType.Crosshatched,
  foreground: CardForegroundType.Mushroom,
  symbol: undefined,
  cost: [],
};
const cardBackMushroomIgnore: CardBackChoice = {
  name: 'ignore',
  description: undefined,
  type: CardFaceType.ChoiceBack,
  background: CardBackgroundType.Crosshatched,
  foreground: CardForegroundType.Mushroom,
  symbol: undefined,
  cost: [],
};

export const cardFrontMushroomBenign: CardFrontChoice = {
  name: 'benign mushroom',
  description: 'The mushroom has no effect.',
  type: CardFaceType.Choice,
  choice: {
    type: ChoiceType.NextTurn,
  },
  background: CardBackgroundType.Clear,
  foreground: CardForegroundType.Mushroom,
  symbol: undefined,
  cost: [],
  benefit: [],
};
export const cardFrontMushroomForce: CardFrontChoice = {
  name: 'strength fungus',
  description: 'You feel strong.',
  type: CardFaceType.Choice,
  choice: {
    type: ChoiceType.NextTurn,
  },
  background: CardBackgroundType.Clear,
  foreground: CardForegroundType.Mushroom,
  symbol: undefined,
  cost: [],
  benefit: [],
};
export const cardFrontMushroomPoison: CardFrontChoice = {
  name: 'poison mushroom',
  description: 'You feel sick.',
  type: CardFaceType.Choice,
  choice: {
    type: ChoiceType.NextTurn,
  },
  background: CardBackgroundType.Clear,
  foreground: CardForegroundType.Mushroom,
  symbol: undefined,
  cost: [PoisonDown],
  benefit: [],
};
export const cardFrontMushroomFinesse: CardFrontChoice = {
  name: 'finesse fungus',
  description: 'You feel fast.',
  type: CardFaceType.Choice,
  choice: {
    type: ChoiceType.NextTurn,
  },
  background: CardBackgroundType.Clear,
  foreground: CardForegroundType.Mushroom,
  symbol: undefined,
  cost: [],
  benefit: [],
};
export const cardFrontMushroomMind: CardFrontChoice = {
  name: 'smartshroom',
  description: 'You feel smart.',
  type: CardFaceType.Choice,
  choice: {
    type: ChoiceType.NextTurn,
  },
  background: CardBackgroundType.Clear,
  foreground: CardForegroundType.Mushroom,
  symbol: undefined,
  cost: [],
  benefit: [],
};
export const cardFrontMushroomMagic: CardFrontChoice = {
  name: 'magic mushroom',
  description: 'You feel magic.',
  type: CardFaceType.Choice,
  choice: {
    type: ChoiceType.NextTurn,
  },
  background: CardBackgroundType.Clear,
  foreground: CardForegroundType.Mushroom,
  symbol: undefined,
  cost: [],
  benefit: [],
};
export const cardFrontMushroomYouth: CardFrontChoice = {
  name: 'youth mushroom',
  description: 'You feel younger.',
  type: CardFaceType.Choice,
  choice: {
    type: ChoiceType.NextTurn,
  },
  background: CardBackgroundType.Clear,
  foreground: CardForegroundType.Mushroom,
  symbol: undefined,
  cost: [AgeDown],
  benefit: [],
};
export const cardFrontMushroomMaturity: CardFrontChoice = {
  name: 'maturity mushroom',
  description: 'You feel older.',
  type: CardFaceType.Choice,
  choice: {
    type: ChoiceType.NextTurn,
  },
  background: CardBackgroundType.Clear,
  foreground: CardForegroundType.Mushroom,
  symbol: undefined,
  cost: [AgeUp],
  benefit: [],
};
export const cardFrontMushroomIgnore: CardFrontChoice = {
  name: 'ignore',
  description: 'Best left alone.',
  type: CardFaceType.Choice,
  choice: {
    type: ChoiceType.NextTurn,
  },
  background: CardBackgroundType.Clear,
  foreground: CardForegroundType.Mushroom,
  symbol: undefined,
  cost: [],
  benefit: [],
};

export const cards = [
  cardBackMushroomBlue, 
  cardBackMushroomRed,
  cardBackMushroomFamiliar,
].flatMap(cardBack => {
  return [
    cardFrontMushroomBenign,
    cardFrontMushroomFinesse,
    cardFrontMushroomForce,
    cardFrontMushroomPoison,
    cardFrontMushroomMagic,
    cardFrontMushroomMind,
    cardFrontMushroomYouth,
    cardFrontMushroomMaturity,
  ].map<CardDefinition>(cardFace => {
    return {
      faces: [cardBack, cardFace],
      recycleTarget: RecycleTarget.DiscardDeckTop,
    };
  });
}).map(definition => {
  return cardDescriptor.freeze({
    definition,
    visibleFaceIndex: 0,
  });
});

export const cardIgnore = cardDescriptor.freeze({
  definition: {
    faces: [cardBackMushroomIgnore, cardFrontMushroomIgnore],
    recycleTarget: RecycleTarget.DiscardDeckTop,
  },
  visibleFaceIndex: 0,
});
