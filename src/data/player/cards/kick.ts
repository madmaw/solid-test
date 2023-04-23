import { DamageUp, Force } from "data/effects";
import { CardBackResource, CardBackgroundType, CardDefinition, CardFaceType, CardFrontResource, RecycleTarget, SymbolType, cardDescriptor } from "model/domain";

const cardBackKick: CardBackResource = {
  name: 'kick',
  type: CardFaceType.ResourceBack,
  background: CardBackgroundType.Crosshatched,
  symbol: undefined,
  foreground: undefined,
  cost: [Force],
};
const cardFrontKick: CardFrontResource = {
  name: 'kick',
  description: 'A swift kick.',
  type: CardFaceType.Resource,
  background: CardBackgroundType.Clear,
  foreground: undefined,
  symbol: SymbolType.Force,
  cost: [],
  benefit: [DamageUp],
};
const cardTypeKick: CardDefinition = {
  recycleTarget: RecycleTarget.DrawDeckBottom,
  faces: [cardBackKick, cardFrontKick],
};
export const cardKick = cardDescriptor.freeze({
  definition: cardTypeKick,
  visibleFaceIndex: 0,
});
