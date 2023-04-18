import { DamageDown, ForceUp } from "data/effects";
import { CardBackgroundType, CardFaceType, RecycleTarget, cardDefinitionDescriptor, cardDescriptor, cardFaceResourceBackDescriptor, cardFaceResourceDescriptor } from "model/domain";

const cardFaceShieldBack = cardFaceResourceBackDescriptor.freeze({
  name: 'shield',
  type: CardFaceType.ResourceBack,
  background: CardBackgroundType.Crosshatched,
  cost: [ForceUp, ForceUp],
});
const cardFaceShieldFront = cardFaceResourceDescriptor.freeze({
  name: 'shield',
  description: 'You cower behind your shield',
  type: CardFaceType.Resource,
  background: CardBackgroundType.Clear,
  cost: [],
  benefit: [DamageDown],
});
export const cardTypeShield = cardDefinitionDescriptor.freeze({
  recycleTarget: RecycleTarget.DrawDeckRandom,
  faces: [cardFaceShieldBack, cardFaceShieldFront],
});
export const cardShield = cardDescriptor.freeze({
  definition: cardTypeShield,
  visibleFaceIndex: 0,
});
