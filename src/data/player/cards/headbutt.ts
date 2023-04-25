import { DamageUp, Mind } from "data/effects";
import { CardBackResource, CardBackgroundType, CardDefinition, CardFaceType, CardFrontResource, RecycleTarget, SymbolType, cardDescriptor } from "model/domain";

const cardBackHeadbutt: CardBackResource = {
  name: 'headbutt',
  description: 'The head is really a fifth limb if you think about it.',
  type: CardFaceType.ResourceBack,
  background: CardBackgroundType.Crosshatched,
  symbol: undefined,
  foreground: undefined,
  cost: [Mind],
};
const cardFrontHeadbutt: CardFrontResource = {
  name: 'headbutt',
  description: 'With a deranged grin, you smash your forehead into the opponent.',
  type: CardFaceType.Resource,
  background: CardBackgroundType.Clear,
  foreground: undefined,
  symbol: SymbolType.Force,
  cost: [Mind, Mind],
  benefit: [DamageUp],
};
export const cardDefinitionHeadbutt: CardDefinition = {
  recycleTarget: RecycleTarget.DrawDeckBottom,
  faces: [cardBackHeadbutt, cardFrontHeadbutt],
};
export const cardHeadbutt = cardDescriptor.freeze({
  ...cardDefinitionHeadbutt,
  visibleFaceIndex: 0,
});
