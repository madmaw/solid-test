import { DamageUp, Magic } from "data/effects";
import { CardBackResource, CardBackgroundType, CardDefinition, CardFaceType, CardFrontResource, RecycleTarget, SymbolType, cardDescriptor } from "model/domain";

const cardBackMagicMissile: CardBackResource = {
  name: 'magic missile',
  description: 'You raise your staff.',
  type: CardFaceType.ResourceBack,
  background: CardBackgroundType.Crosshatched,
  foreground: undefined,
  symbol: undefined,
  cost: [Magic],
};
const cardFrontMagicMissile: CardFrontResource = {
  name: 'magic missile',
  description: 'Brightly coloured sparks shoot from your fingers.',
  type: CardFaceType.Resource,
  background: CardBackgroundType.Clear,
  foreground: undefined,
  symbol: SymbolType.Magic,
  cost: [],
  benefit: [DamageUp, Magic],
};
export const cardDefinitionMagicMissile: CardDefinition = {
  recycleTarget: RecycleTarget.Draw,
  recyclePosition: 4,
  faces: [cardBackMagicMissile, cardFrontMagicMissile],
};
export const cardMagicMissile = cardDescriptor.freeze({
  ...cardDefinitionMagicMissile,
  visibleFaceIndex: 0,
});
