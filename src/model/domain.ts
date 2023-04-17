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

export const enum CardFaceType {
  Resource = 1,
  ResourceBack,
  Choice,
  ChoiceBack,
}

const cardFaceCommon = {
  background: new LiteralTypeDescriptor<CardBackgroundType>,
  cost: listDescriptor(effectDescriptor),
};

export const cardFaceResourceDescriptor = valueRecordDescriptor({
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
  effect: listDescriptor(effectDescriptor),
  ...cardFaceCommon,
});

export const cardFaceChoiceBackDescriptor = valueRecordDescriptor({
  type: new LiteralTypeDescriptor<CardFaceType.ChoiceBack>(),
  name: stringDescriptor,
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

export const cardTypeDescriptor = valueRecordDescriptor({
  name: stringDescriptor,
  description: stringDescriptor,
  faces: listDescriptor(cardFaceDescriptor),
});

export const cardDescriptor = activeRecordDescriptor({
  type: cardTypeDescriptor,
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

export const bookSpreadRoomDescriptor = activeRecordDescriptor({
  type: new LiteralTypeDescriptor<BookSpreadType.Room>(),
  cardSlots: listDescriptor(cardSlotDescriptor),
});

export const bookSpreadDescriptor = discriminatingUnionDescriptor(
  {
    [BookSpreadType.TableOfContents]: bookSpreadTableOfContentsDescriptor,
    [BookSpreadType.Room]: bookSpreadRoomDescriptor,
  },
  s => s.type,
  m => m.type,
);

export const bookDescriptor = activeRecordDescriptor({
  // undefined == closed
  spread: optionalDescriptor(bookSpreadDescriptor),
});

export const gameDescriptor = activeRecordDescriptor({
  book: bookDescriptor,
  cardSlots: listDescriptor(cardSlotDescriptor),
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
export type CardType = typeof cardTypeDescriptor.aMutable;
export type CardTypeState = typeof cardTypeDescriptor.aState;
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
export type Book = typeof bookDescriptor.aMutable;
export type BookState = typeof bookDescriptor.aState;
export type Game = typeof gameDescriptor.aMutable;
export type GameState = typeof gameDescriptor.aState;
