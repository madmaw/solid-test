import { DamageUp, ForceUp } from "data/effects";
import { CardBackResource, CardBackgroundType, CardDefinition, CardFaceType, CardFrontResource, RecycleTarget, cardDescriptor } from "model/domain";

const cardBackKick: CardBackResource = {
  name: 'kick',
  type: CardFaceType.ResourceBack,
  background: CardBackgroundType.Crosshatched,
  foreground: undefined,
  cost: [ForceUp],
};
const cardFrontKick: CardFrontResource = {
  name: 'kick',
  description: 'A swift kick.',
  type: CardFaceType.Resource,
  background: CardBackgroundType.Clear,
  foreground: undefined,
  cost: [ForceUp],
  benefit: [DamageUp],
};
const cardTypeKick: CardDefinition = {
  recycleTarget: RecycleTarget.DrawDeckRandom,
  faces: [cardBackKick, cardFrontKick],
};
export const cardKick = cardDescriptor.freeze({
  definition: cardTypeKick,
  visibleFaceIndex: 0,
});
