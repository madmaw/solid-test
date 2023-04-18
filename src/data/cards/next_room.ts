import { DamageUp } from "data/effects";
import { CardBackgroundType, CardFaceType, cardFaceChoiceBackDescriptor, cardFaceChoiceDescriptor, cardDefinitionDescriptor, RecycleTarget, ChoiceType } from "model/domain";

const cardFaceNextRoomJammedDoorBack = cardFaceChoiceBackDescriptor.freeze({
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
export const cardTypeNextRoomJammedDoor = cardDefinitionDescriptor.freeze({
  name: 'empty passage',
  description: 'the adventure continues',
  recycleTarget: RecycleTarget.DiscardDeckTop,
  faces: [cardFaceNextRoomJammedDoorBack, cardFaceNextRoomFront],
});

const cardFaceNextRoomDoorBack = cardFaceChoiceBackDescriptor.freeze({
  type: CardFaceType.ChoiceBack,
  background: CardBackgroundType.Door,
  name: 'door',
  cost: [],
});


export const cardTypeNextRoom = cardDefinitionDescriptor.freeze({
  name: 'empty passage',
  description: 'the adventure continues',
  recycleTarget: RecycleTarget.DiscardDeckTop,
  faces: [cardFaceNextRoomDoorBack, cardFaceNextRoomFront],
});