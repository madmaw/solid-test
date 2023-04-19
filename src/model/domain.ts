import { listDescriptor } from "./descriptor/list";
import { LiteralTypeDescriptor, numberDescriptor, stringDescriptor } from "./descriptor/literals";
import { optionalDescriptor } from "./descriptor/option";
import { activeRecordDescriptor, valueRecordDescriptor } from "./descriptor/record";
import { discriminatingUnionDescriptor } from "./descriptor/union";

export const enum SymbolType {
  // force resource
  Force = 1,
  // finesse resource
  Finesse,
  // magic resource (fey?)
  Magic,
  // fire damage/light
  Fire,
  // take pysical damage/heal
  Damage,
  // get older/younger
  Age,
  // draw a card/put a card back
  Draw,
}

export const enum EffectDirection {
  Up = 1,
  Down,
}

export const effectDescriptor = new LiteralTypeDescriptor<{
  symbol: SymbolType,
  direction: EffectDirection,
}>;

export const enum CardBackgroundType {
  Crosshatched = 1,
  Clear,
  Door,
  Passageway,
}

export const enum CardForegroundType {
  Rat = 1,
  Trap,
  Fountain,
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
}

export type ChoiceNextTurn = {
  type: ChoiceType.NextTurn,
};

export const enum EncounterType {
  Battle = 1,
  Event,
};

export const enum MonsterType {
  BigRat = 1,
};

export const enum EventType {
  Fountain = 1,
}

export type EncounterBattleDefinition = {
  type: EncounterType.Battle,
  monster: MonsterType,
};

export type EncounterEventDefinition = {
  type: EncounterType.Event,
  event: EventType,
};

export type EncounterDefinition = EncounterBattleDefinition | EncounterEventDefinition;

export type ChoiceNextPage = {
  type: ChoiceType.NextPage,
  encounter: EncounterDefinition | undefined,
};

export type ChoiceNextChapter = {
  type: ChoiceType.NextChapter,
};

export type Choice = ChoiceNextTurn | ChoiceNextPage | ChoiceNextChapter;


const cardFaceCommon = {
  name: stringDescriptor,
  background: new LiteralTypeDescriptor<CardBackgroundType>(),
  foreground: optionalDescriptor(new LiteralTypeDescriptor<CardForegroundType>()),
  cost: listDescriptor(effectDescriptor),
};

export const cardFaceResourceDescriptor = valueRecordDescriptor({
  description: stringDescriptor,
  type: new LiteralTypeDescriptor<CardFaceType.Resource>(),
  benefit: listDescriptor(effectDescriptor),
  ...cardFaceCommon,
});

export const cardFaceResourceBackDescriptor = valueRecordDescriptor({
  type: new LiteralTypeDescriptor<CardFaceType.ResourceBack>(),
  ...cardFaceCommon,
});

export const cardFaceChoiceDescriptor = valueRecordDescriptor({
  type: new LiteralTypeDescriptor<CardFaceType.Choice>(),
  benefit: listDescriptor(effectDescriptor),
  choice: new LiteralTypeDescriptor<Choice>(),
  ...cardFaceCommon,
});

export const cardFaceChoiceBackDescriptor = valueRecordDescriptor({
  type: new LiteralTypeDescriptor<CardFaceType.ChoiceBack>(),
  ...cardFaceCommon,
});

export const cardFaceDescriptor = discriminatingUnionDescriptor(
  {
    [CardFaceType.Resource]: cardFaceResourceDescriptor,
    [CardFaceType.ResourceBack]: cardFaceResourceBackDescriptor,
    [CardFaceType.Choice]: cardFaceChoiceDescriptor,
    [CardFaceType.ChoiceBack]: cardFaceChoiceBackDescriptor,
  },
  s => s.type,
  m => m.type,
);

export const enum RecycleTarget {
  DrawDeckTop = 1,
  DrawDeckBottom,
  DrawDeckRandom,
  DiscardDeckTop,
}

// TODO given the definition will be immutable, this could probably just
// be a literalDescriptor
export const cardDefinitionDescriptor = valueRecordDescriptor({
  // TODO: not required for room/event cards (maybe?)
  recycleTarget: new LiteralTypeDescriptor<RecycleTarget>(),
  faces: listDescriptor(cardFaceDescriptor),
});

export const cardDescriptor = activeRecordDescriptor({
  definition: cardDefinitionDescriptor,
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
}

export const bookSpreadTableOfContentsDescriptor = activeRecordDescriptor({
  type: new LiteralTypeDescriptor<BookSpreadType.TableOfContents>(),
});

export const deckDescriptor = listDescriptor(cardDescriptor);

export const entityDescriptor = activeRecordDescriptor({
  health: numberDescriptor,
  maxHealth: numberDescriptor,
  deck: deckDescriptor,
});

export const encounterBattleDescriptor = activeRecordDescriptor({
  type: new LiteralTypeDescriptor<EncounterType.Battle>(),
  monster: entityDescriptor,
});

export const encounterEventDescriptor = activeRecordDescriptor({
  type: new LiteralTypeDescriptor<EncounterType.Event>(),
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
  cardSlots: listDescriptor(cardSlotDescriptor),
  encounter: optionalDescriptor(encounterDescriptor),
});

export const bookSpreadDescriptor = discriminatingUnionDescriptor(
  {
    [BookSpreadType.TableOfContents]: bookSpreadTableOfContentsDescriptor,
    [BookSpreadType.Room]: bookSpreadRoomDescriptor,
  },
  s => s.type,
  m => m.type,
);

export const enum ChapterType {
  Ruins = 1,
}

export const chapterDescriptor = activeRecordDescriptor({
  type: new LiteralTypeDescriptor<ChapterType>(),
  deck: deckDescriptor,
});

export const bookDescriptor = activeRecordDescriptor({
  // undefined == closed
  spread: optionalDescriptor(bookSpreadDescriptor),
  chapter: chapterDescriptor,
});

export const gameDescriptor = activeRecordDescriptor({
  book: bookDescriptor,
  playerCharacter: optionalDescriptor(entityDescriptor),
  playerHand: listDescriptor(cardSlotDescriptor),
});

export type Effect = typeof effectDescriptor.aMutable;
export type EffectState = typeof effectDescriptor.aState;
export type CardFaceResource = typeof cardFaceResourceDescriptor.aMutable;
export type CardFaceResourceState = typeof cardFaceResourceDescriptor.aState;
export type CardFaceResourceBack = typeof cardFaceResourceBackDescriptor.aMutable;
export type CardFaceResourceBackState = typeof cardFaceResourceBackDescriptor.aState;
export type CardFaceChoice = typeof cardFaceChoiceDescriptor.aMutable;
export type CardFaceChoiceState = typeof cardFaceChoiceDescriptor.aState;
export type CardFaceChoiceBack = typeof cardFaceChoiceBackDescriptor.aMutable;
export type CardFaceChoiceBackState = typeof cardFaceChoiceBackDescriptor.aState;
export type CardFace = typeof cardFaceDescriptor.aMutable;
export type CardFaceState = typeof cardFaceDescriptor.aState;
export type CardDefinition = typeof cardDefinitionDescriptor.aMutable;
export type CardDefinitionState = typeof cardDefinitionDescriptor.aState;
export type Card = typeof cardDescriptor.aMutable;
export type CardState = typeof cardDescriptor.aState;
export type CardSlot = typeof cardSlotDescriptor.aMutable;
export type CardSlotState = typeof cardSlotDescriptor.aState;
export type BookSpreadTableOfContents = typeof bookSpreadTableOfContentsDescriptor.aMutable;
export type BookSpreadTableOfContentsState = typeof bookSpreadTableOfContentsDescriptor.aState;
export type BookSpreadRoom = typeof bookSpreadRoomDescriptor.aMutable;
export type BookSpreadRoomState = typeof bookSpreadRoomDescriptor.aState;
export type BookSpread = typeof bookSpreadDescriptor.aMutable;
export type BookSpreadState = typeof bookSpreadDescriptor.aState;
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
