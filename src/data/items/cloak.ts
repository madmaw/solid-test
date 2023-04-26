import { DamageDown, Finesse, Mind } from "data/effects";
import { CardBackResource, CardBackgroundType, CardDefinition, CardFaceType, CardFrontResource, RecycleTarget, SymbolType, cardDescriptor } from "model/domain";

const cardBackMisdirection: CardBackResource = {
  name: 'misdirection',
  description: 'You hold your clock in front of you.',
  type: CardFaceType.ResourceBack,
  background: CardBackgroundType.Crosshatched,
  foreground: undefined,
  symbol: undefined,
  cost: [Finesse, Mind],
};
const cardFrontMisdirection: CardFrontResource = {
  name: 'misdirection',
  description: 'The blow finds empty air.',
  type: CardFaceType.Resource,
  background: CardBackgroundType.Clear,
  foreground: undefined,
  symbol: SymbolType.Finesse,
  cost: [],
  benefit: [DamageDown, DamageDown],
};
export const cardDefinitionMisdirection: CardDefinition = {
  recycleTarget: RecycleTarget.Draw,
  recyclePosition: 6,
  faces: [cardBackMisdirection, cardFrontMisdirection],
};
export const cardMisdirection = cardDescriptor.freeze({
  ...cardDefinitionMisdirection,
  visibleFaceIndex: 0,
});

const cardBackQuickDodge: CardBackResource = {
  name: 'quick dodge',
  description: undefined,
  type: CardFaceType.ResourceBack,
  background: CardBackgroundType.Crosshatched,
  foreground: undefined,
  symbol: undefined,
  cost: [Finesse],
};
const cardFrontQuickDodge: CardFrontResource = {
  name: 'quick dodge',
  description: undefined,
  type: CardFaceType.Resource,
  background: CardBackgroundType.Clear,
  foreground: undefined,
  symbol: SymbolType.Finesse,
  cost: [],
  benefit: [DamageDown],
};
export const cardDefinitionQuickDodge: CardDefinition = {
  recycleTarget: RecycleTarget.Draw,
  recyclePosition: 1,
  faces: [cardBackQuickDodge, cardFrontQuickDodge],
};
export const cardDodge = cardDescriptor.freeze({
  ...cardDefinitionQuickDodge,
  visibleFaceIndex: 0,
});
