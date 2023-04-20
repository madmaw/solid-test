import { Force } from "data/effects";
import { CardBackResource, CardBackgroundType, CardDefinition, CardFaceType, CardFrontResource, RecycleTarget, SymbolType, cardDescriptor } from "model/domain";

const cardBackMight: CardBackResource = {
  name: 'might',
  type: CardFaceType.ResourceBack,
  background: CardBackgroundType.Crosshatched,
  foreground: undefined,
  cost: [],
};
const cardFrontMight: CardFrontResource = {
  name: 'might',
  description: 'You brace for the next feat of strength.',
  type: CardFaceType.Resource,
  background: CardBackgroundType.Clear,
  foreground: undefined,
  cost: [],
  benefit: [Force],
};
const cardTypeMight: CardDefinition = {
  recycleTarget: RecycleTarget.DrawDeckTop,
  symbol: SymbolType.Force,
  faces: [cardBackMight, cardFrontMight],
};

export const cardMight = cardDescriptor.freeze({
  definition: cardTypeMight,
  visibleFaceIndex: 0,
});
