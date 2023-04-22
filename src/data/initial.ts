import { ChapterType, gameDescriptor } from "model/domain";
import { cards } from "./ruins/cards";

export const initialGame = gameDescriptor.create({
  book: {
    spread: undefined,
    chapter: {
      type: ChapterType.Ruins,
      deck: [
        ...cards,
        ...cards,
      ],
    },
    cardSlots: new Array(3).fill(0).map(() => ({
      targetCard: undefined,
      playedCards: [],
    })),
  },
  playerCharacter: undefined,
  playerHand: new Array(6).fill(0).map(() => ({
    targetCard: undefined,
    playedCards: [],
  })),
});
