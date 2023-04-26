import {
  Healing,
  Magic,
  Mind,
  PoisonDown,
  Youth,
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

const cardBackFountainDrink: CardBackChoice = {
  name: 'drink',
  description: 'You recall a fact about fountains.',
  type: CardFaceType.ChoiceBack,
  background: CardBackgroundType.Crosshatched,
  foreground: CardForegroundType.Fountain,
  symbol: undefined,
  cost: [Mind],
};
const cardBackFountainDrink2: CardBackChoice = {
  name: 'drink',
  description: 'The magic echoes in the fountain.',
  type: CardFaceType.ChoiceBack,
  background: CardBackgroundType.Crosshatched,
  foreground: CardForegroundType.Fountain,
  symbol: undefined,
  cost: [Magic],
};

export const cardFrontFountainWater: CardFrontChoice = {
  name: 'water',
  description: 'There\'s nothing special about this fountain.',
  type: CardFaceType.Choice,
  choice: {
    type: ChoiceType.NextTurn,
  },
  background: CardBackgroundType.Clear,
  foreground: CardForegroundType.Fountain,
  symbol: undefined,
  cost: [],
  benefit: [],
};
export const cardFrontFountainPoison: CardFrontChoice = {
  name: 'poison',
  description: 'The murky water tastes incredibly foul.',
  type: CardFaceType.Choice,
  choice: {
    type: ChoiceType.NextTurn,
  },
  background: CardBackgroundType.Clear,
  foreground: CardForegroundType.Fountain,
  symbol: undefined,
  cost: [PoisonDown],
  benefit: [],
};
export const cardFrontFountainHealing: CardFrontChoice = {
  name: 'healing',
  description: 'You feel restored.',
  type: CardFaceType.Choice,
  choice: {
    type: ChoiceType.NextTurn,
  },
  background: CardBackgroundType.Clear,
  foreground: CardForegroundType.Fountain,
  symbol: undefined,
  cost: [Healing],
  benefit: [],
};
export const cardFrontFountainYouth: CardFrontChoice = {
  name: 'youth',
  description: 'The water slakes a thirst you, up until this moment, were totally unaware of .',
  type: CardFaceType.Choice,
  choice: {
    type: ChoiceType.NextTurn,
  },
  background: CardBackgroundType.Clear,
  foreground: CardForegroundType.Fountain,
  symbol: undefined,
  cost: [Youth, Youth, Youth],
  benefit: [],
};

export const cards = [
  cardBackFountainDrink, 
  cardBackFountainDrink2,
].flatMap(cardBack => {
  return [
    cardFrontFountainWater,
    cardFrontFountainPoison,
    cardFrontFountainHealing,
    cardFrontFountainYouth,
  ].map<CardDefinition>(cardFace => {
    return {
      faces: [cardBack, cardFace],
      recycleTarget: RecycleTarget.Discard,
      recyclePosition: undefined,
    };
  });
}).map(definition => {
  return cardDescriptor.freeze({
    ...definition,
    visibleFaceIndex: 0,
  });
});

const cardBackFountainIgnore: CardBackChoice = {
  name: 'ignore',
  description: undefined,
  type: CardFaceType.ChoiceBack,
  background: CardBackgroundType.Crosshatched,
  foreground: CardForegroundType.Fountain,
  symbol: undefined,
  cost: [],
};
export const cardFrontFountainIgnore: CardFrontChoice = {
  name: 'ignore',
  description: 'Best left alone.',
  type: CardFaceType.Choice,
  choice: {
    type: ChoiceType.NextTurn,
  },
  background: CardBackgroundType.Clear,
  foreground: CardForegroundType.Fountain,
  symbol: undefined,
  cost: [],
  benefit: [],
};

export const cardIgnore = cardDescriptor.freeze({
  faces: [cardBackFountainIgnore, cardFrontFountainIgnore],
  recycleTarget: RecycleTarget.Discard,
  recyclePosition: undefined,
  visibleFaceIndex: 0,
});
