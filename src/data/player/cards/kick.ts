import { DamageUp, ForceUp } from "data/effects";
import { CardBackgroundType, CardFaceType, RecycleTarget, cardDefinitionDescriptor, cardDescriptor, cardFaceResourceBackDescriptor, cardFaceResourceDescriptor } from "model/domain";

const cardFaceKickBack = cardFaceResourceBackDescriptor.freeze({
  name: 'kick',
  type: CardFaceType.ResourceBack,
  background: CardBackgroundType.Crosshatched,
  foreground: undefined,
  cost: [ForceUp],
});
const cardFaceKickFront = cardFaceResourceDescriptor.freeze({
  name: 'kick',
  description: 'A swift kick.',
  type: CardFaceType.Resource,
  background: CardBackgroundType.Clear,
  foreground: undefined,
  cost: [ForceUp],
  benefit: [DamageUp],
});
export const cardTypeKick = cardDefinitionDescriptor.freeze({
  recycleTarget: RecycleTarget.DrawDeckRandom,
  faces: [cardFaceKickBack, cardFaceKickFront],
});
export const cardKick = cardDescriptor.freeze({
  definition: cardTypeKick,
  visibleFaceIndex: 0,
});
