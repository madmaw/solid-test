import { DamageUp, Force, Perception } from "data/effects";
import { CardBackResource, CardBackgroundType, CardDefinition, CardFaceType, CardFrontResource, RecycleTarget, SymbolType, cardDescriptor } from "model/domain";

const cardBackTorch: CardBackResource = {
  name: 'torch',
  description: 'The torch ignites!',
  type: CardFaceType.ResourceBack,
  background: CardBackgroundType.Crosshatched,
  symbol: undefined,
  foreground: undefined,
  cost: [Force],
};
const cardFrontTorch: CardFrontResource = {
  name: 'torch',
  description: 'You beat back beasts and darkness alike.',
  type: CardFaceType.Resource,
  background: CardBackgroundType.Clear,
  foreground: undefined,
  symbol: SymbolType.Force,
  cost: [],
  benefit: [DamageUp, Perception],
};
export const cardDefinitionTorch: CardDefinition = {
  recycleTarget: RecycleTarget.Draw,
  recyclePosition: 5,
  faces: [cardBackTorch, cardFrontTorch],
};
export const cardTorch = cardDescriptor.freeze({
  ...cardDefinitionTorch,
  visibleFaceIndex: 0,
});
