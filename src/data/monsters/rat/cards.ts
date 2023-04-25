import { DamageDown, DamageUp, Finesse, Force, Mind } from "data/effects";
import { CardBackChoice, CardBackgroundType, CardDefinition, CardFaceType, CardForegroundType, CardFrontChoice, ChoiceType, RecycleTarget, SymbolType, cardDescriptor } from "model/domain";

const cardBackRatBeligerence: CardBackChoice = {
  name: 'cornered',
  description: undefined,
  type: CardFaceType.ChoiceBack,
  background: CardBackgroundType.Crosshatched,
  foreground: CardForegroundType.Rat,
  symbol: undefined,
  cost: [],
};
const cardBackRatFurtiveMovement: CardBackChoice = {
  name: 'rodent cunning',
  description: 'You predict where the rat is going and intercept.',
  type: CardFaceType.ChoiceBack,
  background: CardBackgroundType.Crosshatched,
  foreground: CardForegroundType.Rat,
  symbol: undefined,
  cost: [Mind],
};
const cardBackRatScurrying: CardBackChoice = {
  name: 'scurrying',
  description: 'The rat is fast, but you are faster.',
  type: CardFaceType.ChoiceBack,
  background: CardBackgroundType.Crosshatched,
  foreground: CardForegroundType.Rat,
  symbol: undefined,
  cost: [Finesse],
};

export const cardFrontRatBite: CardFrontChoice = {
  name: 'bite',
  description: 'The rat bares its teeth.',
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
  description: 'It makes a terrifying noise.',
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
  description: 'The rat backs away in fear.',
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
      recycleTarget: RecycleTarget.Draw,
      recyclePosition: undefined,
    };
  });
}).map(definition => {
  return cardDescriptor.freeze({
    ...definition,
    visibleFaceIndex: 0,
  });
})
