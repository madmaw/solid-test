import { gameDescriptor } from "model/domain";


export const initialGame = gameDescriptor.create({
  book: {
    spread: undefined,
  },
  playerCharacter: undefined,
  playerHand: new Array(5).fill(0).map(() => ({
    targetCard: undefined,
    playedCards: [],
  })),
});
