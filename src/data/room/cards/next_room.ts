import { DamageDown, DamageUp } from "data/effects";
import { CardBackgroundType, CardFaceType, cardFaceChoiceBackDescriptor, cardFaceChoiceDescriptor, cardDefinitionDescriptor, RecycleTarget, ChoiceType, EncounterType, MonsterType, EventType } from "model/domain";

const cardFaceNextRoomJammedDoorBack = cardFaceChoiceBackDescriptor.freeze({
  name: 'jammed door',
  type: CardFaceType.ChoiceBack,
  background: CardBackgroundType.Door,
  cost: [DamageUp],
});
const cardFaceNextRoomDoorBack = cardFaceChoiceBackDescriptor.freeze({
  name: 'door',
  type: CardFaceType.ChoiceBack,
  background: CardBackgroundType.Door,
  cost: [],
});
const cardFaceEmptyNextRoomFront = cardFaceChoiceDescriptor.freeze({
  name: 'empty passage',
  type: CardFaceType.Choice,
  background: CardBackgroundType.Passageway,
  choice: {
    type: ChoiceType.NextPage,
    encounter: undefined,
  },
  cost: [],
  benefit: [],
});
const cardFaceRatNextRoomFront = cardFaceChoiceDescriptor.freeze({
  name: 'a big rat',
  type: CardFaceType.Choice,
  background: CardBackgroundType.Passageway,
  choice: {
    type: ChoiceType.NextPage,
    encounter: {
      type: EncounterType.Battle,
      monster: MonsterType.BigRat,
    },
  },
  cost: [],
  benefit: [],
});
const cardFaceTrappedNextRoomFront = cardFaceChoiceDescriptor.freeze({
  name: 'trapped hallway',
  type: CardFaceType.Choice,
  background: CardBackgroundType.Passageway,
  choice: {
    type: ChoiceType.NextPage,
    encounter: undefined,
  },
  cost: [DamageDown],
  benefit: [],
});
const cardFaceFountainNextRoomFront = cardFaceChoiceDescriptor.freeze({
  name: 'fountain',
  type: CardFaceType.Choice,
  background: CardBackgroundType.Passageway,
  choice: {
    type: ChoiceType.NextPage,
    encounter: {
      type: EncounterType.Event,
      event: EventType.Fountain,
    },
  },
  cost: [],
  benefit: [],
});

export const nextRoomCards = [
  cardFaceNextRoomJammedDoorBack,
  cardFaceNextRoomDoorBack,
].flatMap(back => {
  return [
    cardFaceEmptyNextRoomFront,
    cardFaceRatNextRoomFront,
    cardFaceTrappedNextRoomFront,
    cardFaceFountainNextRoomFront,
  ].map(front => {
    return cardDefinitionDescriptor.freeze({
      recycleTarget: RecycleTarget.DiscardDeckTop,
      faces: [back, front],
    })
  });
});
