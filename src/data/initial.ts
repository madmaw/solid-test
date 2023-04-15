import { cardDescriptor, gameDescriptor } from "model/domain";
import { cardTypeKick } from "data/cards/kick";
import { cardTypeMight } from "data/cards/might";

const cardKick = cardDescriptor.create({
  type: cardTypeKick,
  visibleFaceIndex: 0,
});
export const cardMight = cardDescriptor.create({
  type: cardTypeMight,
  visibleFaceIndex: 0,
});

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
initialGame.cardSlots[0].targetCard = cardKick;
initialGame.cardSlots[1].targetCard = cardMight;

