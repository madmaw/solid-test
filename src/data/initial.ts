import { cardDescriptor, gameDescriptor } from "model/domain";
import { cardTypeKick } from "data/cards/kick";
import { cardTypeMight } from "data/cards/might";
import { cardTypeNextRoom, cardTypeNextRoomJammedDoor } from "./cards/next_room";

export const cardKick = cardDescriptor.create({
  definition: cardTypeKick,
  visibleFaceIndex: 0,
});
export const cardMight = cardDescriptor.create({
  definition: cardTypeMight,
  visibleFaceIndex: 0,
});
export const cardNextRoom = cardDescriptor.create({
  definition: cardTypeNextRoom,
  visibleFaceIndex: 0,
});
export const cardNextRoomJammedDoor = cardDescriptor.create({
  definition: cardTypeNextRoomJammedDoor,
  visibleFaceIndex: 0,
});

export const initialGame = gameDescriptor.create({
  book: {
    spread: undefined,
  },
  playerDeck: [
    cardDescriptor.snapshot(cardMight),
    cardDescriptor.snapshot(cardKick),
    cardDescriptor.snapshot(cardMight),
    cardDescriptor.snapshot(cardMight),
    cardDescriptor.snapshot(cardMight),
    cardDescriptor.snapshot(cardKick),
  ],
  cardSlots: [
    {
      targetCard: undefined,
      playedCards: [],
    },
    {
      targetCard: undefined,
      playedCards: [],
    },
    {
      targetCard: undefined,
      playedCards: [],
    },
    {
      targetCard: undefined,
      playedCards: [],
    },
    {
      targetCard: undefined,
      playedCards: [],
    },
    {
      targetCard: undefined,
      playedCards: [],
    },
  ],
});
