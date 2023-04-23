import { DamageDown, Force } from "data/effects";
import { CardBackResource, CardBackgroundType, CardDefinition, CardFaceType, CardFrontResource, RecycleTarget, SymbolType, cardDescriptor } from "model/domain";

const cardBackShield: CardBackResource = {
  name: 'shield',
  type: CardFaceType.ResourceBack,
  background: CardBackgroundType.Crosshatched,
  foreground: undefined,
  cost: [Force],
};
const cardFrontShield: CardFrontResource = {
  name: 'shield',
  description: 'You cower behind your shield',
  type: CardFaceType.Resource,
  background: CardBackgroundType.Clear,
  foreground: undefined,
  cost: [],
  benefit: [DamageDown],
};
const cardTypeShield: CardDefinition = {
  recycleTarget: RecycleTarget.DrawDeckBottom,
  symbol: SymbolType.Force,
  faces: [cardBackShield, cardFrontShield],
};
export const cardShield = cardDescriptor.freeze({
  definition: cardTypeShield,
  visibleFaceIndex: 0,
});
