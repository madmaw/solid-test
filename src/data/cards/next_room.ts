import { DamageUp } from "data/effects";
import { CardBackgroundType, CardFaceType, cardFaceChoiceBackDescriptor, cardFaceChoiceDescriptor, cardDefinitionDescriptor, RecycleTarget, ChoiceType } from "model/domain";

const cardFaceNextRoomBack = cardFaceChoiceBackDescriptor.freeze({
  type: CardFaceType.ChoiceBack,
  background: CardBackgroundType.Door,
  name: 'jammed door',
  cost: [DamageUp],
});
const cardFaceNextRoomFront = cardFaceChoiceDescriptor.freeze({
  type: CardFaceType.Choice,
  background: CardBackgroundType.Passageway,
  choice: {
    type: ChoiceType.NextPage,
    eventDescription: undefined,
  },
  cost: [],
  benefit: [],
});
export const cardTypeNextRoom = cardDefinitionDescriptor.freeze({
  name: 'empty passage',
  description: 'the adventure continues',
  recycleTarget: RecycleTarget.DiscardDeckTop,
  faces: [cardFaceNextRoomBack, cardFaceNextRoomFront],
});