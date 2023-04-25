import { Force } from "data/effects";
import { CardBackResource, CardBackgroundType, CardDefinition, CardFaceType, CardFrontResource, RecycleTarget, SymbolType, cardDescriptor } from "model/domain";

const cardBackForceEager: CardBackResource = {
  name: 'warriors strength',
  description: undefined,
  type: CardFaceType.ResourceBack,
  background: CardBackgroundType.Crosshatched,
  foreground: undefined,
  symbol: undefined,
  cost: [],
};
const cardFrontForceEager: CardFrontResource = {
  name: 'warriors strength',
  description: 'Your martial training means strength is always available.',
  type: CardFaceType.Resource,
  background: CardBackgroundType.Clear,
  foreground: undefined,
  symbol: SymbolType.Force,
  cost: [],
  benefit: [Force],
};
export const cardDefinitionForceEager: CardDefinition = {
  recycleTarget: RecycleTarget.DrawDeckTop,
  faces: [cardBackForceEager, cardFrontForceEager],
};

export const cardForceEager = cardDescriptor.freeze({
  ...cardDefinitionForceEager,
  visibleFaceIndex: 0,
});

const cardBackForceRandom: CardBackResource = {
  name: 'innate strength',
  description: undefined,
  type: CardFaceType.ResourceBack,
  background: CardBackgroundType.Crosshatched,
  foreground: undefined,
  symbol: undefined,
  cost: [],
};
const cardFrontForceRandom: CardFrontResource = {
  name: 'innate strength',
  description: 'You draw on your natural strength.',
  type: CardFaceType.Resource,
  background: CardBackgroundType.Clear,
  foreground: undefined,
  symbol: SymbolType.Force,
  cost: [],
  benefit: [Force],
};
export const cardDefinitionForceRandom: CardDefinition = {
  recycleTarget: RecycleTarget.DrawDeckRandom,
  faces: [cardBackForceRandom, cardFrontForceRandom],
};

export const cardForceRandom = cardDescriptor.freeze({
  ...cardDefinitionForceRandom,
  visibleFaceIndex: 0,
});

const cardBackForceLazy: CardBackResource = {
  name: 'lethargic strength',
  description: undefined,
  type: CardFaceType.ResourceBack,
  background: CardBackgroundType.Crosshatched,
  foreground: undefined,
  symbol: undefined,
  cost: [],
};
const cardFrontForceLazy: CardFrontResource = {
  name: 'lethargic strength',
  description: 'Yawn! If I must.',
  type: CardFaceType.Resource,
  background: CardBackgroundType.Clear,
  foreground: undefined,
  symbol: SymbolType.Force,
  cost: [],
  benefit: [Force],
};
export const cardDefinitionForceLazy: CardDefinition = {
  recycleTarget: RecycleTarget.DrawDeckBottom,
  faces: [cardBackForceLazy, cardFrontForceLazy],
};

export const cardForceLazy = cardDescriptor.freeze({
  ...cardDefinitionForceLazy,
  visibleFaceIndex: 0,
});


const cardBackForceLazy2x: CardBackResource = {
  name: 'dig deep',
  description: undefined,
  type: CardFaceType.ResourceBack,
  background: CardBackgroundType.Crosshatched,
  foreground: undefined,
  symbol: undefined,
  cost: [],
};
const cardFrontForceLazy2x: CardFrontResource = {
  name: 'dig deep',
  description: 'You give it everything you\'ve got.',
  type: CardFaceType.Resource,
  background: CardBackgroundType.Clear,
  foreground: undefined,
  symbol: SymbolType.Force,
  cost: [],
  benefit: [Force, Force],
};
export const cardDefinitionForceLazy2x: CardDefinition = {
  recycleTarget: RecycleTarget.DrawDeckBottom,
  faces: [cardBackForceLazy2x, cardFrontForceLazy2x],
};

export const cardForceLazy2x = cardDescriptor.freeze({
  ...cardDefinitionForceLazy2x,
  visibleFaceIndex: 0,
});
