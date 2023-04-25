import { cardDefinitionHeadbutt } from "data/player/cards/headbutt";
import {
  cardDefinitionForce1,
  cardDefinitionForce3,
  cardDefinitionForce5,
  cardDefinitionForceLazy2x,
} from "data/player/cards/force";
import { cardDefinitionBlock, cardDefinitionDeflect } from "data/player/cards/shield";
import {
  cardDefinitionClumsyThrust,
  cardDefinitionQuckThrust,
  cardDefinitionRiposte,
  cardDefinitionSlash,
} from "data/player/cards/sword";
import { cardDefinitionTorch } from "data/player/cards/torch";
import {
  CardBackChoice,
  CardBackgroundType,
  CardDefinition,
  CardFaceType,
  CardForegroundType,
  CardFrontChoice,
  ChoiceType,
  EffectDirection,
  EncounterType,
  MonsterType,
  RecycleTarget,
  SymbolType,
  cardDescriptor,
} from "model/domain";
import { cardDefinitionFinesseEager, cardDefinitionFinesseMartialTraining } from "data/player/cards/finesse";
import { GainMaxHealth, Healing } from "data/effects";
import { cardDefinitionDodge } from "data/player/cards/dodge";

const cardBackAttributes: CardBackChoice = {
  name: 'attributes',
  description: undefined,
  type: CardFaceType.ChoiceBack,
  background: CardBackgroundType.Crosshatched,
  foreground: CardForegroundType.Fountain,
  symbol: undefined,
  cost: [],
};

export const cardFrontAttributesWarrior: CardFrontChoice = {
  name: 'sword and shield',
  description: 'You choose the path of the warrior.',
  type: CardFaceType.Choice,
  choice: {
    type: ChoiceType.NextPage,
    encounter: undefined,
  },
  background: CardBackgroundType.Clear,
  foreground: undefined,
  symbol: undefined,
  cost: [{
    symbol: SymbolType.GainCards,
    direction: EffectDirection.Down,
    cards: [
      cardDefinitionFinesseMartialTraining,
      cardDefinitionForce1,
      cardDefinitionForce1,
      cardDefinitionForce3,
      cardDefinitionForce5,
      cardDefinitionForceLazy2x,
      cardDefinitionHeadbutt,
      cardDefinitionSlash,
      cardDefinitionRiposte,
      cardDefinitionQuckThrust,
      cardDefinitionClumsyThrust,
      cardDefinitionTorch,
      cardDefinitionBlock,
      cardDefinitionDeflect,
    ],
  }, GainMaxHealth, Healing],
  benefit: [],
};
export const cardFrontAttributesFinesse: CardFrontChoice = {
  name: 'cloak and dagger',
  description: 'You choose the path of the thief.',
  type: CardFaceType.Choice,
  choice: {
    type: ChoiceType.NextPage,
    encounter: undefined,
  },
  background: CardBackgroundType.Clear,
  foreground: undefined,
  symbol: undefined,
  cost: [{
    symbol: SymbolType.GainCards,
    direction: EffectDirection.Down,
    cards: [
      cardDefinitionFinesseEager,
      cardDefinitionFinesseEager,
      cardDefinitionDodge,
      cardDefinitionDodge,
    ],
  }],
  benefit: [],
};
export const cardFrontAttributesMind: CardFrontChoice = {
  name: 'book and staff',
  description: 'You choose the path of the scholar.',
  type: CardFaceType.Choice,
  choice: {
    type: ChoiceType.NextPage,
    encounter: undefined,
  },
  background: CardBackgroundType.Clear,
  foreground: undefined,
  symbol: undefined,
  cost: [],
  benefit: [],
};

export const cards = [
  cardBackAttributes, 
].flatMap(cardBack => {
  return [
    cardFrontAttributesWarrior,
    cardFrontAttributesFinesse,
    cardFrontAttributesMind,
  ].map<CardDefinition>(cardFace => {
    return {
      faces: [cardBack, cardFace],
      recycleTarget: RecycleTarget.Discard,
      recyclePosition: undefined,
    };
  });
}).map(definition => {
  return cardDescriptor.freeze({
    ...definition,
    visibleFaceIndex: 0,
  });
});

const cardBackFinal: CardBackChoice = {
  name: 'threshold guardian',
  description: 'The rooster stands in your way. You know this bird, it will not back down.',
  type: CardFaceType.ChoiceBack,
  background: CardBackgroundType.ForestPath,
  foreground: CardForegroundType.Rooster,
  symbol: undefined,
  cost: [],
};

const cardFrontFinal: CardFrontChoice = {
  name: 'rooster',
  description: 'The rooster eyes you with pure malice.',
  type: CardFaceType.Choice,
  background: CardBackgroundType.ForestPath,
  foreground: CardForegroundType.Rooster,
  symbol: undefined,
  choice: {
    type: ChoiceType.NextChapter,
    encounter: {
      type: EncounterType.Battle,
      monster: MonsterType.Rooster,
    },
    targetChapterIndex: 1,
  },
  cost: [],
  benefit: [],
};

export const finalCard = cardDescriptor.freeze({
  faces: [cardBackFinal, cardFrontFinal],
  recycleTarget: RecycleTarget.Discard,
  recyclePosition: undefined,
  visibleFaceIndex: 0,
});

