import { cardDescriptor, gameDescriptor } from "model/domain";
import { cardTypeKick } from "data/cards/kick";
import { cardTypeMight } from "data/cards/might";
import { cardTypeNextRoom } from "./cards/next_room";

export const cardKick = cardDescriptor.create({
  type: cardTypeKick,
  visibleFaceIndex: 0,
});
export const cardMight = cardDescriptor.create({
  type: cardTypeMight,
  visibleFaceIndex: 1,
});
export const cardNextRoom = cardDescriptor.create({
  type: cardTypeNextRoom,
  visibleFaceIndex: 0,
})

export const initialGame = gameDescriptor.create({
  book: {
    spread: undefined,
  },
  cardSlots: [
    {
      targetCard: cardDescriptor.snapshot(cardMight),
      playedCards: [],
    },
    {
      targetCard: cardDescriptor.snapshot(cardMight),
      playedCards: [],
    },
    {
      targetCard: cardDescriptor.snapshot(cardKick),
      playedCards: [],
    },
    {
      targetCard: cardDescriptor.snapshot(cardMight),
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

