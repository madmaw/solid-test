import { DamageUp, ForceUp } from "data/effects";
import { CardBackgroundType, CardFaceType, cardFaceResourceBackDescriptor, cardFaceResourceDescriptor, cardTypeDescriptor } from "model/domain";

const cardFaceKickBack = cardFaceResourceBackDescriptor.freeze({
  type: CardFaceType.ResourceBack,
  background: CardBackgroundType.Crosshatched,
  cost: [ForceUp, ForceUp],
});
const cardFaceKickFront = cardFaceResourceDescriptor.freeze({
  type: CardFaceType.Resource,
  background: CardBackgroundType.Clear,
  cost: [],
  benefit: [DamageUp],
});
export const cardTypeKick = cardTypeDescriptor.freeze({
  name: 'kick',
  description: 'A swift kick.',
  faces: [cardFaceKickBack, cardFaceKickFront],
});
