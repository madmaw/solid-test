import { listDescriptor } from "./descriptor/list";
import { LiteralTypeDescriptor, booleanDescriptor, numberDescriptor, stringDescriptor } from "./descriptor/literals";
import { activeRecordDescriptor, valueRecordDescriptor } from "./descriptor/record";
import { signalDescriptor } from "./descriptor/signal";
import { discriminatingUnionDescriptor } from "./descriptor/union";

export const gameDescriptor = valueRecordDescriptor({
  creationTimestamp: numberDescriptor,
  lastUpdatedTimestamp: signalDescriptor(numberDescriptor),
});
export type Game = typeof gameDescriptor.aMutable;
export type GameState = typeof gameDescriptor.aState;


export const enum SymbolType {
  Force = 1,
  Finesse,
  Magic,
  Fire,
}

export const symbolTypeDescriptor = new LiteralTypeDescriptor<SymbolType>();

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
  cost: listDescriptor(symbolTypeDescriptor),
  background: new LiteralTypeDescriptor<CardBackgroundType>,
};

export const cardFaceResourceDescriptor = valueRecordDescriptor({
  type: new LiteralTypeDescriptor<CardFaceType.Resource>(),
  benefit: listDescriptor(symbolTypeDescriptor),
  ...cardFaceCommon,
});

export const cardFaceResourceBackDescriptor = valueRecordDescriptor({
  type: new LiteralTypeDescriptor<CardFaceType.ResourceBack>(),
  ...cardFaceCommon,
});

export const cardFaceChoiceDescriptor = valueRecordDescriptor({
  type: new LiteralTypeDescriptor<CardFaceType.Choice>(),
  effect: listDescriptor(symbolTypeDescriptor),
  ...cardFaceCommon,
});

export const cardFaceChoiceBackDescriptor = valueRecordDescriptor({
  type: new LiteralTypeDescriptor<CardFaceType.ResourceBack>(),
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
  faces: listDescriptor(cardFaceDescriptor),
});

export const cardDescriptor = activeRecordDescriptor({
  type: cardTypeDescriptor,
  visibleFaceIndex: numberDescriptor,
});

export type Card = typeof cardTypeDescriptor.aMutable;
export type CardState = typeof cardTypeDescriptor.aState;
