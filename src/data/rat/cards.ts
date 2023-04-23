import { DamageDown, DamageUp, Finesse, FireUp, Force, Mind } from "data/effects";
import { CardBackChoice, CardBackgroundType, CardDefinition, CardFaceType, CardForegroundType, CardFrontChoice, ChoiceType, RecycleTarget, SymbolType, cardDescriptor } from "model/domain";

const cardBackRatBeligerence: CardBackChoice = {
  name: 'cornered',
  type: CardFaceType.ChoiceBack,
  background: CardBackgroundType.Crosshatched,
  foreground: CardForegroundType.Rat,
  symbol: undefined,
  cost: [],
};
const cardBackRatFurtiveMovement: CardBackChoice = {
  name: 'rodent cunning',
  type: CardFaceType.ChoiceBack,
  background: CardBackgroundType.Crosshatched,
  foreground: CardForegroundType.Rat,
  symbol: undefined,
  cost: [Mind],
};
const cardBackRatScurrying: CardBackChoice = {
  name: 'scurrying',
  type: CardFaceType.ChoiceBack,
  background: CardBackgroundType.Crosshatched,
  foreground: CardForegroundType.Rat,
  symbol: undefined,
  cost: [Finesse],
};

export const cardFrontRatBite: CardFrontChoice = {
  name: 'bite',
  type: CardFaceType.Choice,
  choice: {
    type: ChoiceType.NextTurn,
  },
  background: CardBackgroundType.Clear,
  foreground: CardForegroundType.Rat,
  symbol: SymbolType.Finesse,
  cost: [DamageDown],
  benefit: [],
};
export const cardFrontRatScreech: CardFrontChoice = {
  name: 'screech',
  type: CardFaceType.Choice,
  choice: {
    type: ChoiceType.NextTurn,
  },
  background: CardBackgroundType.Clear,
  foreground: CardForegroundType.Rat,
  symbol: SymbolType.Finesse,
  cost: [Force, Finesse, Mind],
  benefit: [],
};
export const cardFrontRatCower: CardFrontChoice = {
  name: 'cower',
  type: CardFaceType.Choice,
  choice: {
    type: ChoiceType.NextTurn,
  },
  background: CardBackgroundType.Clear,
  foreground: CardForegroundType.Rat,
  symbol: SymbolType.Finesse,
  cost: [DamageUp],
  benefit: [],
};

export const cards = [
  cardBackRatBeligerence, 
  cardBackRatFurtiveMovement, 
  cardBackRatScurrying,
].flatMap(cardBack => {
  return [
    cardFrontRatBite,
    cardFrontRatScreech,
    cardFrontRatCower,
  ].map<CardDefinition>(cardFace => {
    return {
      faces: [cardBack, cardFace],
      recycleTarget: RecycleTarget.DrawDeckRandom,
    };
  });
}).map(definition => {
  return cardDescriptor.freeze({
    definition,
    visibleFaceIndex: 0,
  });
})
