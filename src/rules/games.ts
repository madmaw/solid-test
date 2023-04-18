import { BookSpreadType, CardSlot, Game } from "model/domain";

export function allCardSlots(game: Game): readonly CardSlot[] {
  const spread = game.book.spread;
  const bookSlots = spread?.type === BookSpreadType.Room
      ? spread.cardSlots
      : [];
  return [...game.playerHand, ...bookSlots]
}

