import { DamageDown, DamageUp } from "data/effects";
import { CardBackChoice, CardBackgroundType, CardDefinition, CardFaceType, CardForegroundType, CardFrontChoice, ChoiceType, RecycleTarget, SymbolType, cardDescriptor } from "model/domain";

const cardBackSnailExtend: CardBackChoice = {
  name: 'extend',
  description: undefined,
  type: CardFaceType.ChoiceBack,
  background: CardBackgroundType.Crosshatched,
  foreground: CardForegroundType.Snail,
  symbol: undefined,
  cost: [],
};
const cardBackSnailRetract: CardBackChoice = {
  name: 'retract',
  description: 'You knock the snail over.',
  type: CardFaceType.ChoiceBack,
  background: CardBackgroundType.Crosshatched,
  foreground: CardForegroundType.Snail,
  symbol: undefined,
  cost: [DamageUp],
};

export const cardFrontSnailBite: CardFrontChoice = {
  name: 'bite',
  description: 'The snail nips at you.',
  type: CardFaceType.Choice,
  choice: {
    type: ChoiceType.NextTurn,
  },
  background: CardBackgroundType.Clear,
  foreground: CardForegroundType.Snail,
  symbol: SymbolType.Force,
  cost: [DamageDown],
  benefit: [],
};
export const cardFrontSnailHide: CardFrontChoice = {
  name: 'hide',
  description: 'The snail retreats within its shell.',
  type: CardFaceType.Choice,
  choice: {
    type: ChoiceType.NextTurn,
  },
  background: CardBackgroundType.Clear,
  foreground: CardForegroundType.Rat,
  symbol: SymbolType.Force,
  cost: [DamageUp, DamageUp],
  benefit: [],
};

export const cards = [
  cardBackSnailExtend, 
  cardBackSnailRetract, 
].flatMap(cardBack => {
  return [
    cardFrontSnailBite,
    cardFrontSnailHide,
  ].map<CardDefinition>(cardFace => {
    return {
      faces: [cardBack, cardFace],
      recycleTarget: RecycleTarget.DrawDeckRandom,
    };
  });
}).map(definition => {
  return cardDescriptor.freeze({
    ...definition,
    visibleFaceIndex: 0,
  });
})
