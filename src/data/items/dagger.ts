import { DamageUp, Finesse, Mind, PoisonDown, PoisonUp } from "data/effects";
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

const cardBackStab: CardBackResource = {
  name: 'stab',
  description: 'You ready your dagger.',
  type: CardFaceType.ResourceBack,
  background: CardBackgroundType.Crosshatched,
  foreground: undefined,
  symbol: undefined,
  cost: [Finesse],
};
const cardFrontStab: CardFrontResource = {
  name: 'stab',
  description: 'The dagger flickers out, lightning fast.',
  type: CardFaceType.Resource,
  background: CardBackgroundType.Clear,
  foreground: undefined,
  symbol: SymbolType.Finesse,
  cost: [],
  benefit: [DamageUp],
};
export const cardDefinitionStab: CardDefinition = {
  recycleTarget: RecycleTarget.Draw,
  recyclePosition: 1,
  faces: [cardBackStab, cardFrontStab],
};
export const cardStab = cardDescriptor.freeze({
  ...cardDefinitionStab,
  visibleFaceIndex: 0,
});

const cardBackTwinBlades: CardBackResource = {
  name: 'twin blades',
  description: 'Two daggers are better than one.',
  type: CardFaceType.ResourceBack,
  background: CardBackgroundType.Crosshatched,
  foreground: undefined,
  symbol: undefined,
  cost: [Finesse, Finesse],
};
const cardFrontTwinBlades: CardFrontResource = {
  name: 'twin blades',
  description: 'Slash! Slash!',
  type: CardFaceType.Resource,
  background: CardBackgroundType.Clear,
  foreground: undefined,
  symbol: SymbolType.Finesse,
  cost: [],
  benefit: [DamageUp, DamageUp],
};
export const cardDefinitionTwinBlades: CardDefinition = {
  recycleTarget: RecycleTarget.Draw,
  recyclePosition: 5,
  faces: [cardBackTwinBlades, cardFrontTwinBlades],
};
export const cardTwinBlades = cardDescriptor.freeze({
  ...cardDefinitionTwinBlades,
  visibleFaceIndex: 0,
});

const cardBackPoisonBlade: CardBackResource = {
  name: 'poison blade',
  description: 'The poison sticks to the blade.',
  type: CardFaceType.ResourceBack,
  background: CardBackgroundType.Crosshatched,
  foreground: undefined,
  symbol: undefined,
  cost: [Finesse, PoisonDown],
};
const cardFrontPoisonBlade: CardFrontResource = {
  name: 'poison blade',
  description: 'You drive the poisoned dagger in.',
  type: CardFaceType.Resource,
  background: CardBackgroundType.Clear,
  foreground: undefined,
  symbol: SymbolType.Finesse,
  cost: [],
  benefit: [DamageUp, PoisonUp],
};
export const cardDefinitionPoisonBlade: CardDefinition = {
  recycleTarget: RecycleTarget.Draw,
  recyclePosition: 4,
  faces: [cardBackPoisonBlade, cardFrontPoisonBlade],
};
export const cardPoisonBlade = cardDescriptor.freeze({
  ...cardDefinitionPoisonBlade,
  visibleFaceIndex: 0,
});

const cardBackCriticalStrike: CardBackResource = {
  name: 'critical strike',
  description: 'You eye up your opponents weaknesses.',
  type: CardFaceType.ResourceBack,
  background: CardBackgroundType.Crosshatched,
  foreground: undefined,
  symbol: undefined,
  cost: [Finesse, Finesse, Mind],
};
const cardFrontCriticalStrike: CardFrontResource = {
  name: 'critical strike',
  description: 'It\'s a crit!',
  type: CardFaceType.Resource,
  background: CardBackgroundType.Clear,
  foreground: undefined,
  symbol: SymbolType.Finesse,
  cost: [],
  benefit: [DamageUp, DamageUp, DamageUp],
};
export const cardDefinitionCriticalStrike: CardDefinition = {
  recycleTarget: RecycleTarget.Draw,
  recyclePosition: 9,
  faces: [cardBackCriticalStrike, cardFrontCriticalStrike],
};
export const cardCriticalStrike = cardDescriptor.freeze({
  ...cardDefinitionCriticalStrike,
  visibleFaceIndex: 0,
});
