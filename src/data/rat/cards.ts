import { DamageDown, DamageUp, FinesseUp, FireUp, ForceDown } from "data/effects";
import { CardBackgroundType, CardFaceType, CardForegroundType, ChoiceType, RecycleTarget, cardDefinitionDescriptor, cardDescriptor, cardFaceChoiceBackDescriptor, cardFaceChoiceDescriptor, cardFaceDescriptor } from "model/domain";

const cardBackRatBeligerence = cardFaceChoiceBackDescriptor.freeze({
  name: 'cornered',
  type: CardFaceType.ChoiceBack,
  background: CardBackgroundType.Crosshatched,
  foreground: CardForegroundType.Rat,
  cost: [],
});
const cardBackRatFurtiveMovement = cardFaceChoiceBackDescriptor.freeze({
  name: 'furtive squeak',
  type: CardFaceType.ChoiceBack,
  background: CardBackgroundType.Crosshatched,
  foreground: CardForegroundType.Rat,
  cost: [FireUp],
});
const cardBackRatScurrying = cardFaceChoiceBackDescriptor.freeze({
  name: 'scurrying',
  type: CardFaceType.ChoiceBack,
  background: CardBackgroundType.Crosshatched,
  foreground: CardForegroundType.Rat,
  cost: [FinesseUp],
});

const cardFaceBite = cardFaceChoiceDescriptor.freeze({
  name: 'bite',
  type: CardFaceType.Choice,
  choice: {
    type: ChoiceType.NextTurn,
  },
  background: CardBackgroundType.Clear,
  foreground: CardForegroundType.Rat,
  cost: [DamageDown],
  benefit: [],
});
const cardFaceScreech = cardFaceChoiceDescriptor.freeze({
  name: 'screech',
  type: CardFaceType.Choice,
  choice: {
    type: ChoiceType.NextTurn,
  },
  background: CardBackgroundType.Clear,
  foreground: CardForegroundType.Rat,
  cost: [ForceDown, ForceDown],
  benefit: [],
});
const cardFaceCower = cardFaceChoiceDescriptor.freeze({
  name: 'cower',
  type: CardFaceType.Choice,
  choice: {
    type: ChoiceType.NextTurn,
  },
  background: CardBackgroundType.Clear,
  foreground: CardForegroundType.Rat,
  cost: [DamageUp],
  benefit: [],
});

export const cards = [
  cardBackRatBeligerence, 
  cardBackRatFurtiveMovement, 
  cardBackRatScurrying,
].flatMap(cardBack => {
  return [
    cardFaceBite,
    cardFaceScreech,
    cardFaceCower,
  ].map(cardFace => {
    return cardDefinitionDescriptor.freeze({
      faces: [cardBack, cardFace],
      recycleTarget: RecycleTarget.DrawDeckRandom,
    });
  });
}).map(definition => {
  return cardDescriptor.freeze({
    definition,
    visibleFaceIndex: 0,
  });
})
