import { DamageDown, DamageUp, FinesseUp, FireUp, ForceDown } from "data/effects";
import { CardBackChoice, CardBackgroundType, CardDefinition, CardFaceType, CardForegroundType, CardFrontChoice, ChoiceType, RecycleTarget, cardDescriptor } from "model/domain";

const cardBackRatBeligerence: CardBackChoice = {
  name: 'cornered',
  type: CardFaceType.ChoiceBack,
  background: CardBackgroundType.Crosshatched,
  foreground: CardForegroundType.Rat,
  cost: [],
};
const cardBackRatFurtiveMovement: CardBackChoice = {
  name: 'furtive squeak',
  type: CardFaceType.ChoiceBack,
  background: CardBackgroundType.Crosshatched,
  foreground: CardForegroundType.Rat,
  // TODO observation
  cost: [FireUp],
};
const cardBackRatScurrying: CardBackChoice = {
  name: 'scurrying',
  type: CardFaceType.ChoiceBack,
  background: CardBackgroundType.Crosshatched,
  foreground: CardForegroundType.Rat,
  cost: [FinesseUp],
};

export const cardFrontRatBite: CardFrontChoice = {
  name: 'bite',
  type: CardFaceType.Choice,
  choice: {
    type: ChoiceType.NextTurn,
  },
  background: CardBackgroundType.Clear,
  foreground: CardForegroundType.Rat,
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
  cost: [ForceDown, ForceDown],
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
