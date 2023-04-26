import { Draw, Finesse, Force } from "data/effects";
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
  recycleTarget: RecycleTarget.Draw,
  recyclePosition: 5,
  faces: [cardBackFinesseLazy, cardFrontFinesseLazy],
};

export const cardFinesseLazy = cardDescriptor.freeze({
  ...cardDefinitionFinesseLazy,
  visibleFaceIndex: 0,
});

const cardBackFinesseFastHands: CardBackResource = {
  name: 'fast hands',
  type: CardFaceType.ResourceBack,
  description: undefined,
  background: CardBackgroundType.Crosshatched,
  foreground: undefined,
  symbol: undefined,
  cost: [],
};
const cardFrontFinesseFastHands: CardFrontResource = {
  name: 'fast hands',
  description: 'Your hands are a blur.',
  type: CardFaceType.Resource,
  background: CardBackgroundType.Clear,
  foreground: undefined,
  symbol: SymbolType.Finesse,
  cost: [Draw],
  benefit: [Finesse],
};

export const cardDefinitionFinesseFastHands1: CardDefinition = {
  recycleTarget: RecycleTarget.Draw,
  recyclePosition: 1,
  faces: [cardBackFinesseFastHands, cardFrontFinesseFastHands],
};
export const cardFinesse1 = cardDescriptor.freeze({
  ...cardDefinitionFinesseFastHands1,
  visibleFaceIndex: 0,
});

export const cardDefinitionFinesseFastHands3: CardDefinition = {
  recycleTarget: RecycleTarget.Draw,
  recyclePosition: 3,
  faces: [cardBackFinesseFastHands, cardFrontFinesseFastHands],
};
export const cardFinesse3 = cardDescriptor.freeze({
  ...cardDefinitionFinesseFastHands1,
  visibleFaceIndex: 0,
});

const cardBackFinesseFeat: CardBackResource = {
  name: 'feat of agility',
  type: CardFaceType.ResourceBack,
  description: undefined,
  background: CardBackgroundType.Crosshatched,
  foreground: undefined,
  symbol: undefined,
  cost: [Finesse, Finesse],
};
const cardFrontFinesseFeat: CardFrontResource = {
  name: 'feat of agility',
  description: undefined,
  type: CardFaceType.Resource,
  background: CardBackgroundType.Clear,
  foreground: undefined,
  symbol: SymbolType.Finesse,
  cost: [],
  benefit: [Finesse, Finesse],
};

export const cardDefinitionFinesseFeat: CardDefinition = {
  recycleTarget: RecycleTarget.Draw,
  recyclePosition: 3,
  faces: [cardBackFinesseFeat, cardFrontFinesseFeat],
};
export const cardFinesseFeat = cardDescriptor.freeze({
  ...cardDefinitionFinesseFastHands1,
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
  recycleTarget: RecycleTarget.Draw,
  recyclePosition: 3,
  faces: [cardBackFinesseMartialTraining, cardFrontFinesseMartialTraining],
};
