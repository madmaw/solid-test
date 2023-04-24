import { gameDescriptor } from "model/domain";
import { chapter } from './chapters/ruins/chapter';

export const initialGame = gameDescriptor.create({
  book: {
    spread: undefined,
    chapter,
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
