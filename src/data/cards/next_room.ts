import { DamageUp, ForceUp } from "data/effects";
import { CardBackgroundType, CardFaceType, cardFaceChoiceBackDescriptor, cardFaceChoiceDescriptor, cardTypeDescriptor } from "model/domain";

const cardFaceNextRoomBack = cardFaceChoiceBackDescriptor.freeze({
  type: CardFaceType.ChoiceBack,
  background: CardBackgroundType.Door,
  name: 'jammed door',
  cost: [DamageUp],
});
const cardFaceNextRoomFront = cardFaceChoiceDescriptor.freeze({
  type: CardFaceType.Choice,
  background: CardBackgroundType.Passageway,
  cost: [],
  effect: [],
});
export const cardTypeNextRoom = cardTypeDescriptor.freeze({
  name: 'empty passage',
  description: 'the adventure continues',
  faces: [cardFaceNextRoomBack, cardFaceNextRoomFront],
});