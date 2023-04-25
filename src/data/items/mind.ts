import { Mind } from "data/effects";
import {
  CardBackResource,
  CardBackgroundType,
  CardDefinition,
  CardFaceType,
  CardFrontResource,
  RecycleTarget,
  SymbolType,
  cardDescriptor,
} from "model/domain";

const cardBackMindLazy: CardBackResource = {
  name: 'innate intelligence',
  description: undefined,
  type: CardFaceType.ResourceBack,
  background: CardBackgroundType.Crosshatched,
  symbol: undefined,
  foreground: undefined,
  cost: [],
};
const cardFrontMindLazy: CardFrontResource = {
  name: 'innate intelligence',
  description: 'You draw on everything you\'ve learned.',
  type: CardFaceType.Resource,
  background: CardBackgroundType.Clear,
  foreground: undefined,
  symbol: SymbolType.Mind,
  cost: [],
  benefit: [Mind],
};
export const cardDefinitionMindLazy: CardDefinition = {
  recycleTarget: RecycleTarget.Draw,
  recyclePosition: 9,
  faces: [cardBackMindLazy, cardFrontMindLazy],
};

export const cardMindLazy = cardDescriptor.freeze({
  ...cardDefinitionMindLazy,
  visibleFaceIndex: 0,
});

const cardBackMindEager: CardBackResource = {
  name: 'quick thinking',
  description: undefined,
  type: CardFaceType.ResourceBack,
  background: CardBackgroundType.Crosshatched,
  symbol: undefined,
  foreground: undefined,
  cost: [],
};
const cardFrontMindEager: CardFrontResource = {
  name: 'quick thinking',
  description: 'Suddenly the solution is clear.',
  type: CardFaceType.Resource,
  background: CardBackgroundType.Clear,
  foreground: undefined,
  symbol: SymbolType.Mind,
  cost: [],
  benefit: [Mind],
};
export const cardDefinitionMindEager: CardDefinition = {
  recycleTarget: RecycleTarget.Draw,
  recyclePosition: 1,
  faces: [cardBackMindEager, cardFrontMindEager],
};

export const cardMindEager = cardDescriptor.freeze({
  ...cardDefinitionMindLazy,
  visibleFaceIndex: 0,
});
