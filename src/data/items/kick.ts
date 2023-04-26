import { DamageUp, Force } from "data/effects";
import { CardBackResource, CardBackgroundType, CardDefinition, CardFaceType, CardFrontResource, RecycleTarget, SymbolType, cardDescriptor } from "model/domain";

export const cardBackKick: CardBackResource = {
  name: 'kick',
  description: 'You prepare to strike.',
  type: CardFaceType.ResourceBack,
  background: CardBackgroundType.Crosshatched,
  symbol: undefined,
  foreground: undefined,
  cost: [Force],
};
export const cardFrontKick: CardFrontResource = {
  name: 'kick',
  description: 'You deliver a swift kick.',
  type: CardFaceType.Resource,
  background: CardBackgroundType.Clear,
  foreground: undefined,
  symbol: SymbolType.Force,
  cost: [],
  benefit: [DamageUp],
};
export const cardDefinitionKick: CardDefinition = {
  recycleTarget: RecycleTarget.Draw,
  recyclePosition: 4,
  faces: [cardBackKick, cardFrontKick],
};
export const cardKick = cardDescriptor.freeze({
  ...cardDefinitionKick,
  visibleFaceIndex: 0,
});
