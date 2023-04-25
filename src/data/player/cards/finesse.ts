import { Finesse, Force } from "data/effects";
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

const cardBackFinesseLazy: CardBackResource = {
  name: 'agility',
  type: CardFaceType.ResourceBack,
  description: undefined,
  background: CardBackgroundType.Crosshatched,
  foreground: undefined,
  symbol: undefined,
  cost: [],
};
const cardFrontFinesseLazy: CardFrontResource = {
  name: 'agility',
  description: 'You move with agility.',
  type: CardFaceType.Resource,
  background: CardBackgroundType.Clear,
  foreground: undefined,
  symbol: SymbolType.Finesse,
  cost: [],
  benefit: [Finesse],
};
export const cardDefinitionFinesseLazy: CardDefinition = {
  recycleTarget: RecycleTarget.DrawDeckBottom,
  faces: [cardBackFinesseLazy, cardFrontFinesseLazy],
};

export const cardFinesseLazy = cardDescriptor.freeze({
  ...cardDefinitionFinesseLazy,
  visibleFaceIndex: 0,
});

const cardBackFinesseEager: CardBackResource = {
  name: 'fast hands',
  type: CardFaceType.ResourceBack,
  description: undefined,
  background: CardBackgroundType.Crosshatched,
  foreground: undefined,
  symbol: undefined,
  cost: [],
};
const cardFrontFinesseEager: CardFrontResource = {
  name: 'fast hands',
  description: 'Your hands are a blur.',
  type: CardFaceType.Resource,
  background: CardBackgroundType.Clear,
  foreground: undefined,
  symbol: SymbolType.Finesse,
  cost: [],
  benefit: [Finesse],
};
export const cardDefinitionFinesseEager: CardDefinition = {
  recycleTarget: RecycleTarget.DrawDeckTop,
  faces: [cardBackFinesseEager, cardFrontFinesseEager],
};

export const cardFinesseEager = cardDescriptor.freeze({
  ...cardDefinitionFinesseEager,
  visibleFaceIndex: 0,
});

const cardBackFinesseMartialTraining: CardBackResource = {
  name: 'martial training',
  type: CardFaceType.ResourceBack,
  description: undefined,
  background: CardBackgroundType.Crosshatched,
  foreground: undefined,
  symbol: undefined,
  cost: [Force],
};
const cardFrontFinesseMartialTraining: CardFrontResource = {
  name: 'martial training',
  description: 'You remember your training.',
  type: CardFaceType.Resource,
  background: CardBackgroundType.Clear,
  foreground: undefined,
  symbol: SymbolType.Finesse,
  cost: [],
  benefit: [Finesse, Force],
};
export const cardDefinitionFinesseMartialTraining: CardDefinition = {
  recycleTarget: RecycleTarget.DrawDeckRandom,
  faces: [cardBackFinesseMartialTraining, cardFrontFinesseMartialTraining],
};
