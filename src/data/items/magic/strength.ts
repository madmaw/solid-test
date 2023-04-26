import { Force, Magic } from "data/effects";
import { CardBackResource, CardBackgroundType, CardDefinition, CardFaceType, CardFrontResource, RecycleTarget, SymbolType, cardDescriptor } from "model/domain";

const cardBackMagicStrength: CardBackResource = {
  name: 'bulls strength',
  description: 'You feel strong!',
  type: CardFaceType.ResourceBack,
  background: CardBackgroundType.Crosshatched,
  foreground: undefined,
  symbol: undefined,
  cost: [Magic],
};
const cardFrontMagicStrength: CardFrontResource = {
  name: 'bulls strength',
  description: 'The strength fades.',
  type: CardFaceType.Resource,
  background: CardBackgroundType.Clear,
  foreground: undefined,
  symbol: SymbolType.Magic,
  cost: [],
  benefit: [Force, Force],
};
export const cardDefinitionMagicStrength: CardDefinition = {
  recycleTarget: RecycleTarget.Draw,
  recyclePosition: 6,
  faces: [cardBackMagicStrength, cardFrontMagicStrength],
};
export const cardMagicStrength = cardDescriptor.freeze({
  ...cardDefinitionMagicStrength,
  visibleFaceIndex: 0,
});
