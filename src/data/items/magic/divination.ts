import { Magic, Mind, Perception } from "data/effects";
import { CardBackResource, CardBackgroundType, CardDefinition, CardFaceType, CardFrontResource, RecycleTarget, SymbolType, cardDescriptor } from "model/domain";

const cardBackMagicSight: CardBackResource = {
  name: 'divination',
  description: 'You can see through walls!',
  type: CardFaceType.ResourceBack,
  background: CardBackgroundType.Crosshatched,
  foreground: undefined,
  symbol: undefined,
  cost: [Magic],
};
const cardFrontMagicSight: CardFrontResource = {
  name: 'divination',
  description: undefined,
  type: CardFaceType.Resource,
  background: CardBackgroundType.Clear,
  foreground: undefined,
  symbol: SymbolType.Magic,
  cost: [],
  benefit: [Mind, Perception],
};
export const cardDefinitionMagicSight: CardDefinition = {
  recycleTarget: RecycleTarget.Draw,
  recyclePosition: 8,
  faces: [cardBackMagicSight, cardFrontMagicSight],
};
export const cardMagicSight = cardDescriptor.freeze({
  ...cardDefinitionMagicSight,
  visibleFaceIndex: 0,
});
