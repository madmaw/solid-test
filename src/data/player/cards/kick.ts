import { DamageUp, Force } from "data/effects";
import { CardBackResource, CardBackgroundType, CardDefinition, CardFaceType, CardFrontResource, RecycleTarget, SymbolType, cardDescriptor } from "model/domain";

const cardBackKick: CardBackResource = {
  name: 'kick',
  description: 'You prepare to strike.',
  type: CardFaceType.ResourceBack,
  background: CardBackgroundType.Crosshatched,
  symbol: undefined,
  foreground: undefined,
  cost: [Force],
};
const cardFrontKick: CardFrontResource = {
  name: 'kick',
  description: 'You deliver a swift kick.',
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
