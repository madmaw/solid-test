import { listDescriptor } from "./descriptor/list";
import { LiteralTypeDescriptor, numberDescriptor, stringDescriptor } from "./descriptor/literals";
import { optionalDescriptor } from "./descriptor/option";
import { activeRecordDescriptor } from "./descriptor/record";
import { discriminatingUnionDescriptor } from "./descriptor/union";

export const enum SymbolType {
  // force resource
  Force = 1,
  // finesse resource
  Finesse,
  // mind resource
  Mind,
  // magic resource (fey?)
  Magic,
  // light/perception
  Perception,
  // take pysical damage/heal
  Damage,
  // get younger
  Youth,
  // get older
  Age,
  // draw a card/put a card back
  Draw,
  // heal
  Healing,
  // poison
  Poison,
  // gain a card
  GainCards,
  // lose played card(s)
  LoseCards,
  // gain max health
  GainMaxHealth,
  // lose max health
  LoseMaxHealth,
  // double card effects
  DoubleCard,
  // duplicate cards
  Duplicate,
  // burn
  Fire,
}

export const enum EffectDirection {
  Up = 1,
  Down = 2,
  Omni = 3,
}

export type SimpleEffect = {
  readonly symbol: Exclude<SymbolType, SymbolType.GainCards>,
  readonly direction: EffectDirection,
};

export type GainCardEffect = {
  readonly symbol: SymbolType.GainCards,
  readonly direction: EffectDirection,
  readonly cards: readonly CardDefinition[];
};

export type Effect = SimpleEffect | GainCardEffect;

export const enum CardBackgroundType {
  Crosshatched = 1,
  Clear,
  Door,
  ForestPath,
  DarkenedForestPath,
  Passageway,
}

export const enum CardForegroundType {
  Rat = 1,
  Troll,
  Snail,
  Rooster,
  Trap,
  Fountain,
  MagicTree,
  Mushroom,
  Shrine,
  Treasure,
  Dummy,
  Fairy,
  Spider,
  Dragon,
}

export const enum CardFaceType {
  Resource = 1,
  ResourceBack,
  Choice,
  ChoiceBack,
}

export const enum ChoiceType {
  NextTurn = 1,
  NextPage,
  NextChapter,
  ToC,
}

export type ChoiceNextTurn = {
  readonly type: ChoiceType.NextTurn,
};

export type ChoiceToC = {
  readonly type: ChoiceType.ToC,
}

export const enum EncounterType {
  Battle = 1,
  Event,
};

export const enum MonsterType {
  BigRat = 1,
  Snail,
  Troll,
  Rooster,
  Dummy,
  Fairy,
  Spider,
  Dragon,
};

export const enum EventType {
  Fountain = 1,
  MagicTree,
  Mushroom,
  Shrine,
  Treasure,
  Shop,
}

export type EncounterBattleDefinition = {
  readonly type: EncounterType.Battle,
  readonly monster: MonsterType,
};

export type EncounterEventDefinition = {
  readonly type: EncounterType.Event,
  readonly event: EventType,
};

export type EncounterDefinition = EncounterBattleDefinition | EncounterEventDefinition;

export type ChoiceNextPage = {
  readonly type: ChoiceType.NextPage,
  readonly encounter: EncounterDefinition | undefined,
};

export type ChoiceNextChapter = {
  readonly type: ChoiceType.NextChapter,
  readonly encounter: EncounterDefinition | undefined,
  readonly targetChapterIndex: number,
};

export type Choice = ChoiceNextTurn | ChoiceNextPage | ChoiceNextChapter | ChoiceToC;


type CardFaceCommon = {
  readonly name: string,
  readonly description: string | undefined,
  readonly background: CardBackgroundType,
  readonly foreground: CardForegroundType | undefined,
  readonly cost: readonly Effect[],
  readonly symbol: SymbolType | undefined,
};

export type CardFrontResource = CardFaceCommon & {
  readonly type: CardFaceType.Resource,
  readonly benefit: readonly Effect[],
};

export type CardBackResource = CardFaceCommon & {
  readonly type: CardFaceType.ResourceBack,
};

export type CardFrontChoice = CardFaceCommon & {
  readonly type: CardFaceType.Choice,
  readonly benefit: readonly Effect[],
  readonly choice: Choice,
};

export type CardBackChoice = CardFaceCommon & {
  readonly type: CardFaceType.ChoiceBack,
};

export type CardFace = 
    | CardFrontChoice
    | CardBackChoice
    | CardFrontResource
    | CardBackResource;

export const enum RecycleTarget {
  Destroy = 1,
  Draw,
  Discard,
}

export type CardDefinition = {
  readonly recycleTarget: RecycleTarget,
  readonly recyclePosition: number | undefined,
  readonly faces: readonly CardFace[],
};

export const cardDescriptor = activeRecordDescriptor({
  faces: new LiteralTypeDescriptor<readonly CardFace[]>(),
  recycleTarget: new LiteralTypeDescriptor<RecycleTarget>(),
  recyclePosition: optionalDescriptor(numberDescriptor),
  visibleFaceIndex: numberDescriptor,
});

export const cardSlotDescriptor = activeRecordDescriptor({
  targetCard: optionalDescriptor(cardDescriptor),
  playedCards: listDescriptor(cardDescriptor),
});

// a "spread" is two pages viewed together
export const enum BookSpreadType {
  TableOfContents = 1,
  Room,
  Death,
}

export const bookSpreadTableOfContentsDescriptor = activeRecordDescriptor({
  type: new LiteralTypeDescriptor<BookSpreadType.TableOfContents>(),
  unlockedChapters: numberDescriptor,
});

export const bookSpreadDeathDescriptor = activeRecordDescriptor({
  type: new LiteralTypeDescriptor<BookSpreadType.Death>(),
});

export const deckDescriptor = listDescriptor(cardDescriptor);

export const entityDescriptor = activeRecordDescriptor({
  health: numberDescriptor,
  maxHealth: numberDescriptor,
  deck: deckDescriptor,
  age: numberDescriptor,
  deathDescription: stringDescriptor,
});

export const encounterBattleDescriptor = activeRecordDescriptor({
  type: new LiteralTypeDescriptor<EncounterType.Battle>(),
  monster: entityDescriptor,
  monsterType: new LiteralTypeDescriptor<MonsterType>(),
});

export const encounterEventDescriptor = activeRecordDescriptor({
  type: new LiteralTypeDescriptor<EncounterType.Event>(),
  eventType: new LiteralTypeDescriptor<EventType>(),
  deck: deckDescriptor,
});

export const encounterDescriptor = discriminatingUnionDescriptor(
  {
    [EncounterType.Battle]: encounterBattleDescriptor,
    [EncounterType.Event]: encounterEventDescriptor,
  },
  s => s.type,
  m => m.type,  
);

export const bookSpreadRoomDescriptor = activeRecordDescriptor({
  type: new LiteralTypeDescriptor<BookSpreadType.Room>(),
  encounter: optionalDescriptor(encounterDescriptor),  
});

export const bookSpreadDescriptor = discriminatingUnionDescriptor(
  {
    [BookSpreadType.TableOfContents]: bookSpreadTableOfContentsDescriptor,
    [BookSpreadType.Room]: bookSpreadRoomDescriptor,
    [BookSpreadType.Death]: bookSpreadDeathDescriptor,
  },
  s => s.type,
  m => m.type,
);

export const enum ChapterType {
  Tutorial = 0,
  Prelude = 1,
  Shop,
  Forest,
  Ruins,
  Tower,
}

export const chapterDescriptor = activeRecordDescriptor({
  type: new LiteralTypeDescriptor<ChapterType>(),
  deck: deckDescriptor,
  pagesRemaining: numberDescriptor,
  finalCard: cardDescriptor,
});

export const bookDescriptor = activeRecordDescriptor({
  // undefined == closed
  spread: optionalDescriptor(bookSpreadDescriptor),
  chapter: chapterDescriptor,
  cardSlots: listDescriptor(cardSlotDescriptor),
});

export const gameDescriptor = activeRecordDescriptor({
  book: bookDescriptor,
  playerCharacter: optionalDescriptor(entityDescriptor),
  playerHand: listDescriptor(cardSlotDescriptor),
});

export type Card = typeof cardDescriptor.aMutable;
export type CardState = typeof cardDescriptor.aState;
export type CardSlot = typeof cardSlotDescriptor.aMutable;
export type CardSlotState = typeof cardSlotDescriptor.aState;
export type BookSpreadTableOfContents = typeof bookSpreadTableOfContentsDescriptor.aMutable;
export type BookSpreadTableOfContentsState = typeof bookSpreadTableOfContentsDescriptor.aState;
export type BookSpreadRoom = typeof bookSpreadRoomDescriptor.aMutable;
export type BookSpreadRoomState = typeof bookSpreadRoomDescriptor.aState;
export type BookSpreadDeath = typeof bookSpreadDeathDescriptor.aMutable;
export type BookSpreadDeathState = typeof bookSpreadDeathDescriptor.aState;
export type BookSpread = typeof bookSpreadDescriptor.aMutable;
export type BookSpreadState = typeof bookSpreadDescriptor.aState;
export type EncounterBattle = typeof encounterBattleDescriptor.aMutable;
export type EncounterBattleState = typeof encounterBattleDescriptor.aState;
export type EncounterEvent = typeof encounterEventDescriptor.aMutable;
export type EncounterEventState = typeof encounterEventDescriptor.aState;
export type Encounter = typeof encounterDescriptor.aMutable;
export type EncounterState = typeof encounterDescriptor.aState;
export type Book = typeof bookDescriptor.aMutable;
export type BookState = typeof bookDescriptor.aState;
export type Deck = typeof deckDescriptor.aMutable;
export type DeckState = typeof deckDescriptor.aState;
export type Entity = typeof entityDescriptor.aMutable;
export type EntityState = typeof entityDescriptor.aState;
export type Game = typeof gameDescriptor.aMutable;
export type GameState = typeof gameDescriptor.aState;
