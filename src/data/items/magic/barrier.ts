import { DamageDown, Magic } from "data/effects";
import { CardBackResource, CardBackgroundType, CardDefinition, CardFaceType, CardFrontResource, RecycleTarget, SymbolType, cardDescriptor } from "model/domain";

const cardBackMagicBarrier: CardBackResource = {
  name: 'magic barrier',
  description: 'A translucent bubble surrounds you.',
  type: CardFaceType.ResourceBack,
  background: CardBackgroundType.Crosshatched,
  foreground: undefined,
  symbol: undefined,
  cost: [Magic],
};
const cardFrontMagicBarrier: CardFrontResource = {
  name: 'magic barrier',
  description: 'The blow bounces off harmlessly.',
  type: CardFaceType.Resource,
  background: CardBackgroundType.Clear,
  foreground: undefined,
  symbol: SymbolType.Magic,
  cost: [],
  benefit: [DamageDown, DamageDown],
};
export const cardDefinitionMagicBarrier: CardDefinition = {
  recycleTarget: RecycleTarget.Draw,
  recyclePosition: 3,
  faces: [cardBackMagicBarrier, cardFrontMagicBarrier],
};
export const cardMagicBarrier = cardDescriptor.freeze({
  ...cardDefinitionMagicBarrier,
  visibleFaceIndex: 0,
});
