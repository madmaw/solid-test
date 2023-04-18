import { ForceUp } from "data/effects";
import { CardBackgroundType, CardFaceType, RecycleTarget, cardDefinitionDescriptor, cardDescriptor, cardFaceResourceBackDescriptor, cardFaceResourceDescriptor } from "model/domain";

const cardFaceMightBack = cardFaceResourceBackDescriptor.freeze({
  name: 'might',
  type: CardFaceType.ResourceBack,
  background: CardBackgroundType.Crosshatched,
  cost: [],
});
const cardFaceMightFront = cardFaceResourceDescriptor.freeze({
  name: 'might',
  description: 'You brace for the next feat of strength.',
  type: CardFaceType.Resource,
  background: CardBackgroundType.Clear,
  cost: [],
  benefit: [ForceUp],
});
export const cardTypeMight = cardDefinitionDescriptor.freeze({
  recycleTarget: RecycleTarget.DrawDeckTop,
  faces: [cardFaceMightBack, cardFaceMightFront],
});

export const cardMight = cardDescriptor.freeze({
  definition: cardTypeMight,
  visibleFaceIndex: 0,
});
