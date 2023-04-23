import { AgeDown, DamageDown, DamageUp, Finesse, FireUp, Force, Healing, Magic, Mind, PoisonDown } from "data/effects";
import { CardBackChoice, CardBackgroundType, CardDefinition, CardFaceType, CardForegroundType, CardFrontChoice, ChoiceType, RecycleTarget, cardDescriptor } from "model/domain";

const cardBackFountainDrink: CardBackChoice = {
  name: 'drink',
  type: CardFaceType.ChoiceBack,
  background: CardBackgroundType.Crosshatched,
  foreground: CardForegroundType.Fountain,
  symbol: undefined,
  cost: [Mind],
};
const cardBackFountainDrink2: CardBackChoice = {
  name: 'drink',
  type: CardFaceType.ChoiceBack,
  background: CardBackgroundType.Crosshatched,
  foreground: CardForegroundType.Fountain,
  symbol: undefined,
  cost: [Magic],
};
const cardBackFountainIgnore: CardBackChoice = {
  name: 'ignore',
  type: CardFaceType.ChoiceBack,
  background: CardBackgroundType.Crosshatched,
  foreground: CardForegroundType.Fountain,
  symbol: undefined,
  cost: [],
};

export const cardFrontFountainWater: CardFrontChoice = {
  name: 'water',
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
  type: CardFaceType.Choice,
  choice: {
    type: ChoiceType.NextTurn,
  },
  background: CardBackgroundType.Clear,
  foreground: CardForegroundType.Fountain,
  symbol: undefined,
  cost: [AgeDown],
  benefit: [],
};
export const cardFrontFountainIgnore: CardFrontChoice = {
  name: 'ignore',
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
    faces: [cardBackFountainIgnore, cardFrontFountainIgnore],
    recycleTarget: RecycleTarget.DiscardDeckTop,
  },
  visibleFaceIndex: 0,
});
