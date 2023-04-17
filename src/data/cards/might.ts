import { ForceUp } from "data/effects";
import { CardBackgroundType, CardFaceType, cardFaceResourceBackDescriptor, cardFaceResourceDescriptor, cardTypeDescriptor } from "model/domain";

const cardFaceMightBack = cardFaceResourceBackDescriptor.freeze({
  type: CardFaceType.ResourceBack,
  background: CardBackgroundType.Crosshatched,
  cost: [],
});
const cardFaceMightFront = cardFaceResourceDescriptor.freeze({
  type: CardFaceType.Resource,
  background: CardBackgroundType.Clear,
  cost: [],
  benefit: [ForceUp],
});
export const cardTypeMight = cardTypeDescriptor.freeze({
  name: 'might',
  description: 'You brace for the next feat of strength.',
  faces: [cardFaceMightBack, cardFaceMightFront],
});