import { DamageDown, Force } from "data/effects";
import { CardBackResource, CardBackgroundType, CardDefinition, CardFaceType, CardFrontResource, RecycleTarget, SymbolType, cardDescriptor } from "model/domain";

const cardBackBlock: CardBackResource = {
  name: 'block',
  description: 'You grip your shield tightly.',
  type: CardFaceType.ResourceBack,
  background: CardBackgroundType.Crosshatched,
  foreground: undefined,
  symbol: undefined,
  cost: [Force, Force],
};
const cardFrontBlock: CardFrontResource = {
  name: 'block',
  description: 'You raise your shield.',
  type: CardFaceType.Resource,
  background: CardBackgroundType.Clear,
  foreground: undefined,
  symbol: SymbolType.Force,
  cost: [],
  benefit: [DamageDown, DamageDown, Force],
};
export const cardDefinitionBlock: CardDefinition = {
  recycleTarget: RecycleTarget.DrawDeckRandom,
  faces: [cardBackBlock, cardFrontBlock],
};
export const cardBlock = cardDescriptor.freeze({
  ...cardDefinitionBlock,
  visibleFaceIndex: 0,
});

const cardBackDeflect: CardBackResource = {
  name: 'deflect',
  description: 'You adjust your shield, just so.',
  type: CardFaceType.ResourceBack,
  background: CardBackgroundType.Crosshatched,
  foreground: undefined,
  symbol: undefined,
  cost: [Force],
};
const cardFrontDeflect: CardFrontResource = {
  name: 'deflect',
  description: 'The blow glances off.',
  type: CardFaceType.Resource,
  background: CardBackgroundType.Clear,
  foreground: undefined,
  symbol: SymbolType.Force,
  cost: [],
  benefit: [DamageDown],
};
export const cardDefinitionDeflect: CardDefinition = {
  recycleTarget: RecycleTarget.DrawDeckRandom,
  faces: [cardBackDeflect, cardFrontDeflect],
};
export const cardDeflect = cardDescriptor.freeze({
  ...cardDefinitionDeflect,
  visibleFaceIndex: 0,
});
