import { DamageUp, ForceUp } from "data/effects";
import { CardBackgroundType, CardFaceType, RecycleTarget, cardDefinitionDescriptor, cardFaceResourceBackDescriptor, cardFaceResourceDescriptor } from "model/domain";

const cardFaceKickBack = cardFaceResourceBackDescriptor.freeze({
  type: CardFaceType.ResourceBack,
  background: CardBackgroundType.Crosshatched,
  cost: [ForceUp, ForceUp],
});
const cardFaceKickFront = cardFaceResourceDescriptor.freeze({
  type: CardFaceType.Resource,
  background: CardBackgroundType.Clear,
  cost: [ForceUp],
  benefit: [DamageUp],
});
export const cardTypeKick = cardDefinitionDescriptor.freeze({
  name: 'kick',
  description: 'A swift kick.',
  recycleTarget: RecycleTarget.DrawDeckTop,
  faces: [cardFaceKickBack, cardFaceKickFront],
});
