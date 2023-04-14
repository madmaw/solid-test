import { effect } from "solid-js/web";
import { listDescriptor } from "./descriptor/list";
import { LiteralTypeDescriptor, numberDescriptor, stringDescriptor } from "./descriptor/literals";
import { optionalDescriptor } from "./descriptor/option";
import { activeRecordDescriptor, valueRecordDescriptor } from "./descriptor/record";
import { discriminatingUnionDescriptor } from "./descriptor/union";

export const enum SymbolType {
  Force = 1,
  Finesse,
  Magic,
  Fire,
  Damage,
  Age,
}

export const symbolTypeDescriptor = new LiteralTypeDescriptor<SymbolType>();

export const enum EffectDirection {
  Up = 1,
  Down = 2,
}

export const effectDescriptor = valueRecordDescriptor({
  symbol: symbolTypeDescriptor,
  direction: new LiteralTypeDescriptor<EffectDirection>(),
});

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

export const gameDescriptor = valueRecordDescriptor({
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
export type Game = typeof gameDescriptor.aMutable;
export type GameState = typeof gameDescriptor.aState;
