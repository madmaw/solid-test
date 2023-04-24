import { DamageDown, Force } from "data/effects";
import { CardBackResource, CardBackgroundType, CardDefinition, CardFaceType, CardFrontResource, RecycleTarget, SymbolType, cardDescriptor } from "model/domain";

const cardBackShield: CardBackResource = {
  name: 'shield',
  description: 'You grip your shield tightly.',
  type: CardFaceType.ResourceBack,
  background: CardBackgroundType.Crosshatched,
  foreground: undefined,
  symbol: undefined,
  cost: [Force],
};
const cardFrontShield: CardFrontResource = {
  name: 'shield',
  description: 'You raise your shield.',
  type: CardFaceType.Resource,
  background: CardBackgroundType.Clear,
  foreground: undefined,
  symbol: SymbolType.Force,
  cost: [],
  benefit: [DamageDown],
};
const cardTypeShield: CardDefinition = {
  recycleTarget: RecycleTarget.DrawDeckBottom,
  faces: [cardBackShield, cardFrontShield],
};
export const cardShield = cardDescriptor.freeze({
  definition: cardTypeShield,
  visibleFaceIndex: 0,
});
