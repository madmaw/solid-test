import { ForceUp } from "data/effects";
import { CardBackgroundType, CardFaceType, cardFaceChoiceBackDescriptor, cardFaceChoiceDescriptor, cardTypeDescriptor } from "model/domain";

const cardFaceNextRoomBack = cardFaceChoiceBackDescriptor.freeze({
  type: CardFaceType.ChoiceBack,
  background: CardBackgroundType.Door,
  name: 'jammed door',
  cost: [ForceUp],
});
const cardFaceNextRoomFront = cardFaceChoiceDescriptor.freeze({
  type: CardFaceType.Choice,
  background: CardBackgroundType.Clear,
  cost: [],
  effect: [],
});
export const cardTypeNextRoom = cardTypeDescriptor.freeze({
  name: 'next room',
  description: 'the adventure continues',
  faces: [cardFaceNextRoomBack, cardFaceNextRoomFront],
});