import { Force } from "data/effects";
import { CardBackResource, CardBackgroundType, CardDefinition, CardFaceType, CardFrontResource, RecycleTarget, SymbolType, cardDescriptor } from "model/domain";

const cardBackMight: CardBackResource = {
  name: 'might',
  description: undefined,
  type: CardFaceType.ResourceBack,
  background: CardBackgroundType.Crosshatched,
  foreground: undefined,
  symbol: undefined,
  cost: [],
};
const cardFrontMight: CardFrontResource = {
  name: 'might',
  description: 'You brace for the next feat of strength.',
  type: CardFaceType.Resource,
  background: CardBackgroundType.Clear,
  foreground: undefined,
  symbol: SymbolType.Force,
  cost: [],
  benefit: [Force],
};
const cardTypeMight: CardDefinition = {
  recycleTarget: RecycleTarget.DrawDeckTop,
  faces: [cardBackMight, cardFrontMight],
};

export const cardMight = cardDescriptor.freeze({
  definition: cardTypeMight,
  visibleFaceIndex: 0,
});
