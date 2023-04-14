import { DamageUp, ForceUp } from "data/effects";
import { CardBackgroundType, CardFaceType, cardFaceResourceBackDescriptor, cardFaceResourceDescriptor, cardTypeDescriptor } from "model/domain";

const cardFaceKickBack = cardFaceResourceBackDescriptor.create({
  type: CardFaceType.ResourceBack,
  background: CardBackgroundType.Crosshatched,
  cost: [ForceUp],
});
const cardFaceKickFront = cardFaceResourceDescriptor.create({
  type: CardFaceType.Resource,
  background: CardBackgroundType.Clear,
  cost: [],
  benefit: [DamageUp],
});
export const cardTypeKick = cardTypeDescriptor.create({
  name: 'kick',
  faces: [cardFaceKickBack, cardFaceKickFront],
});
