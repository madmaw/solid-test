import { DamageDown, Finesse } from "data/effects";
import { CardBackResource, CardBackgroundType, CardDefinition, CardFaceType, CardFrontResource, RecycleTarget, SymbolType, cardDescriptor } from "model/domain";

const cardBackDodge: CardBackResource = {
  name: 'dodge',
  type: CardFaceType.ResourceBack,
  background: CardBackgroundType.Crosshatched,
  foreground: undefined,
  symbol: undefined,
  cost: [Finesse],
};
const cardFrontDodge: CardFrontResource = {
  name: 'dodge',
  description: 'Cat like, you jump out of the way.',
  type: CardFaceType.Resource,
  background: CardBackgroundType.Clear,
  foreground: undefined,
  symbol: SymbolType.Finesse,
  cost: [],
  benefit: [DamageDown],
};
const cardTypeDodge: CardDefinition = {
  recycleTarget: RecycleTarget.DrawDeckBottom,
  faces: [cardBackDodge, cardFrontDodge],
};
export const cardDodge = cardDescriptor.freeze({
  definition: cardTypeDodge,
  visibleFaceIndex: 0,
});
