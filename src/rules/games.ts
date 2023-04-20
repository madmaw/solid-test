import { BookSpreadType, CardSlot, Deck, DeckState, EncounterBattle, EncounterType, Game } from "model/domain";

export function allCardSlots(game: Game): readonly CardSlot[] {
  return [...game.playerHand, ...pageCardSlots(game)]
}

export function pageCardSlots(game: Game): readonly CardSlot[] {
  const spread = game.book.spread;
  return spread?.type === BookSpreadType.Room
      ? spread.cardSlots
      : [];
}

export type DeckHolder = [() => Deck, (deck: Deck) => void];

export function pageDeck(game: Game): DeckHolder {
  const spread = game.book.spread;
  if (spread?.type === BookSpreadType.Room) {
    if (spread.encounter?.type === EncounterType.Battle) {
      const monster = spread.encounter.monster;
      return [
        () => monster.deck,
        deck => monster.deck = deck,
      ];
    }
  }
  // return the chapter deck
  return [
    () => game.book.chapter.deck,
    deck => game.book.chapter.deck = deck,
  ];
}

export function playerDeck(game: Game): DeckHolder | undefined {
  const playerCharacter = game.playerCharacter;
  return playerCharacter && [
    () => playerCharacter.deck,
    deck => playerCharacter.deck = deck,
  ];
}

export function randomizeDeck(deck: DeckState): DeckState {
  const mutableDeck = [...deck];
  for (let i=0; i<mutableDeck.length; i++) {
    const [card] = mutableDeck.splice(Math.floor(Math.random() * mutableDeck.length), 1);
    mutableDeck.push(card);
  }
  return mutableDeck;
}

export function gameEncounterBattle(game: Game): EncounterBattle | undefined {
  const spread = game.book.spread;
  if (spread?.type === BookSpreadType.Room) {
    if (spread.encounter?.type === EncounterType.Battle) {
      return spread.encounter;
    }
  }
  return
}