import { BookSpreadType, CardSlot, Deck, EncounterBattle, EncounterEvent, EncounterType, Game } from "model/domain";

export function allCardSlots(game: Game): readonly CardSlot[] {
  return [...game.playerHand, ...pageCardSlots(game)]
}

export function pageCardSlots(game: Game): readonly CardSlot[] {
  return game.book.cardSlots;
}

export type DeckHolder = [() => Deck, (deck: Deck) => void];

export function pageDeck(game: Game): [() => Deck, (deck: Deck) => void, boolean] {
  const spread = game.book.spread;
  if (spread?.type === BookSpreadType.Room) {
    const encounter = spread.encounter;
    if (encounter?.type === EncounterType.Battle) {
      const monster = encounter.monster;
      return [
        () => monster.deck,
        deck => monster.deck = deck,
        true,
      ];
    }
    if (encounter?.type === EncounterType.Event) {
      return [
        () => encounter.deck,
        deck => encounter.deck = deck,
        true,
      ];
    }
  }
  // return the chapter deck
  return [
    () => game.book.chapter.deck,
    deck => game.book.chapter.deck = deck,
    false,
  ];
}

export function playerDeck(game: Game): DeckHolder | undefined {
  const playerCharacter = game.playerCharacter;
  return playerCharacter && [
    () => playerCharacter.deck,
    deck => playerCharacter.deck = deck,
  ];
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

export function gameEncounterEvent(game: Game): EncounterEvent | undefined {
  const spread = game.book.spread;
  if (spread?.type === BookSpreadType.Room) {
    if (spread.encounter?.type === EncounterType.Event) {
      return spread.encounter;
    }
  }
  return
}
