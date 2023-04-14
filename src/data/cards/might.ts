import { ForceUp } from "data/effects";
import { CardBackgroundType, CardFaceType, cardFaceResourceBackDescriptor, cardFaceResourceDescriptor, cardTypeDescriptor } from "model/domain";

const cardFaceMightBack = cardFaceResourceBackDescriptor.create({
  type: CardFaceType.ResourceBack,
  background: CardBackgroundType.Crosshatched,
  cost: [],
});
const cardFaceMightFront = cardFaceResourceDescriptor.create({
  type: CardFaceType.Resource,
  background: CardBackgroundType.Clear,
  cost: [],
  benefit: [ForceUp],
});
export const cardTypeMight = cardTypeDescriptor.create({
  name: 'might',
  faces: [cardFaceMightBack, cardFaceMightFront],
});
