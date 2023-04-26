import { DamageDown, DamageUp, Finesse, Force } from "data/effects";
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

const cardBackSlash: CardBackResource = {
  name: 'slash',
  description: 'You become aware of the heft of your sword.',
  type: CardFaceType.ResourceBack,
  background: CardBackgroundType.Crosshatched,
  foreground: undefined,
  symbol: undefined,
  cost: [Force, Force],
};
const cardFrontSlash: CardFrontResource = {
  name: 'slash',
  description: 'You swing the sturdy blade.',
  type: CardFaceType.Resource,
  background: CardBackgroundType.Clear,
  foreground: undefined,
  symbol: SymbolType.Force,
  cost: [],
  benefit: [DamageUp, DamageUp],
};
export const cardDefinitionSlash: CardDefinition = {
  recycleTarget: RecycleTarget.Draw,
  recyclePosition: 5,
  faces: [cardBackSlash, cardFrontSlash],
};
export const cardSlash = cardDescriptor.freeze({
  ...cardDefinitionSlash,
  visibleFaceIndex: 0,
});

const cardBackRiposte: CardBackResource = {
  name: 'riposte',
  description: 'You prepare a counterattack.',
  type: CardFaceType.ResourceBack,
  background: CardBackgroundType.Crosshatched,
  foreground: undefined,
  symbol: undefined,
  cost: [Force, Finesse],
};
const cardFrontRiposte: CardFrontResource = {
  name: 'riposte',
  description: 'Deflecting the blow, you return the favour.',
  type: CardFaceType.Resource,
  background: CardBackgroundType.Clear,
  foreground: undefined,
  symbol: SymbolType.Finesse,
  cost: [],
  benefit: [DamageDown, DamageUp],
};
export const cardDefinitionRiposte: CardDefinition = {
  recycleTarget: RecycleTarget.Draw,
  recyclePosition: 5,
  faces: [cardBackRiposte, cardFrontRiposte],
};
export const cardRiposte = cardDescriptor.freeze({
  ...cardDefinitionSlash,
  visibleFaceIndex: 0,
});

const cardBackQuickThrust: CardBackResource = {
  name: 'quick thrust',
  description: 'You prepare to strike.',
  type: CardFaceType.ResourceBack,
  background: CardBackgroundType.Crosshatched,
  foreground: undefined,
  symbol: undefined,
  cost: [Finesse],
};
const cardFrontQuickThrust: CardFrontResource = {
  name: 'quick thrust',
  description: 'Viper-quick, you lash out with your blade.',
  type: CardFaceType.Resource,
  background: CardBackgroundType.Clear,
  foreground: undefined,
  symbol: SymbolType.Finesse,
  cost: [Finesse],
  benefit: [DamageUp],
};
export const cardDefinitionQuckThrust: CardDefinition = {
  recycleTarget: RecycleTarget.Draw,
  recyclePosition: 4,
  faces: [cardBackQuickThrust, cardFrontQuickThrust],
};
export const cardQuickThrust = cardDescriptor.freeze({
  ...cardDefinitionQuckThrust,
  visibleFaceIndex: 0,
});

const cardBackClumsyThrust: CardBackResource = {
  name: 'inelegant thrust',
  description: 'Shakily, you ready your blade.',
  type: CardFaceType.ResourceBack,
  background: CardBackgroundType.Crosshatched,
  foreground: undefined,
  symbol: undefined,
  cost: [Force],
};
const cardFrontClumsyThrust: CardFrontResource = {
  name: 'inelegant thrust',
  description: 'You desperately lunge with your sword.',
  type: CardFaceType.Resource,
  background: CardBackgroundType.Clear,
  foreground: undefined,
  symbol: SymbolType.Force,
  cost: [Finesse],
  benefit: [DamageUp],
};
export const cardDefinitionClumsyThrust: CardDefinition = {
  recycleTarget: RecycleTarget.Draw,
  recyclePosition: 2,
  faces: [cardBackClumsyThrust, cardFrontClumsyThrust],
};
export const cardClumsyThrust = cardDescriptor.freeze({
  ...cardDefinitionClumsyThrust,
  visibleFaceIndex: 0,
});
