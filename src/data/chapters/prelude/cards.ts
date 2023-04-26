import {
  cardDefinitionForce1,
  cardDefinitionForce3,
  cardDefinitionForce5,
  cardDefinitionForceFeat,
  cardDefinitionForceLazy2x,
} from "data/items/force";
import { cardDefinitionBlock, cardDefinitionDeflect } from "data/items/shield";
import {
  cardDefinitionClumsyThrust,
  cardDefinitionQuckThrust,
  cardDefinitionRiposte,
  cardDefinitionSlash,
} from "data/items/sword";
import { cardDefinitionTorch } from "data/items/torch";
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
import { 
  cardDefinitionFinesseFastHands1,
  cardDefinitionFinesseFastHands3,
  cardDefinitionFinesseFeat,
  cardDefinitionFinesseMartialTraining,
} from "data/items/finesse";
import { GainMaxHealth, Healing } from "data/effects";
import { cardDefinitionDodge } from "data/items/dodge";
import { cardDefinitionCriticalStrike, cardDefinitionPoisonBlade, cardDefinitionStab, cardDefinitionTwinBlades } from "data/items/dagger";
import { cardDefinitionMisdirection } from "data/items/cloak";
import { cardDefinitionMindDeepThinking, cardDefinitionMindEager, cardMindCunning } from "data/items/mind";
import { cardDefinitionPoisonResist } from "data/items/poison";
import { 
  cardDefinitionMagicFeat,
  cardDefinitionMagicIncantation1,
  cardDefinitionMagicIncantation5,
} from "data/items/magic";
import { cardDefinitionMagicBarrier } from "data/items/magic/barrier";
import { cardDefinitionMagicMissile } from "data/items/magic/missile";
import { cardDefinitionMagicSight } from "data/items/magic/divination";
import { cardDefinitionMagicHaste } from "data/items/magic/haste";

const cardBackAttributes: CardBackChoice = {
  name: 'character select',
  description: 'Choose your equipment.',
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
      cardDefinitionFinesseMartialTraining,
      cardDefinitionForce1,
      cardDefinitionForce3,
      cardDefinitionForce5,
      cardDefinitionDodge,
      cardDefinitionForceFeat,
      cardDefinitionForceLazy2x,
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
      cardDefinitionFinesseFastHands1,
      cardDefinitionFinesseFastHands3,
      cardDefinitionFinesseFastHands3,
      cardDefinitionFinesseFeat,
      cardDefinitionDodge,
      cardDefinitionDodge,
      cardDefinitionStab,
      cardDefinitionStab,
      cardMindCunning,
      cardMindCunning,
      cardDefinitionPoisonResist,
      cardDefinitionTwinBlades,
      cardDefinitionPoisonBlade,
      cardDefinitionCriticalStrike,
      cardDefinitionMisdirection,
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
  cost: [{
    symbol: SymbolType.GainCards,
    direction: EffectDirection.Down,
    cards: [
      cardDefinitionMindEager,
      cardDefinitionMindEager,
      cardDefinitionMindDeepThinking,
      cardDefinitionMagicFeat,
      cardDefinitionMagicIncantation1,
      cardDefinitionMagicIncantation1,
      cardDefinitionMagicIncantation5,
      cardDefinitionMagicBarrier,
      cardDefinitionMagicMissile,
      cardDefinitionMagicMissile,
      cardDefinitionMagicSight,
      cardDefinitionMagicHaste,
    ],
  }],
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
  name: 'training',
  description: 'A battered tree stump sits in the yard. It bears the scars of many training battles.',
  type: CardFaceType.ChoiceBack,
  background: CardBackgroundType.Crosshatched,
  foreground: undefined,
  symbol: undefined,
  cost: [],
};

const cardFrontFinal: CardFrontChoice = {
  name: 'stump',
  description: undefined,
  type: CardFaceType.Choice,
  background: CardBackgroundType.Clear,
  foreground: undefined,
  symbol: undefined,
  choice: {
    type: ChoiceType.NextChapter,
    encounter: {
      type: EncounterType.Battle,
      monster: MonsterType.Dummy,
    },
    targetChapterIndex: 2,
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
