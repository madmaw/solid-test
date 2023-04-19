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
        ...cards,
        ...cards,
        ...cards,
      ],
    }
  },
  playerCharacter: undefined,
  playerHand: new Array(5).fill(0).map(() => ({
    targetCard: undefined,
    playedCards: [],
  })),
});
