import { cardDefinitionHeadbutt } from "data/player/cards/headbutt";
import { cardDefinitionForceEager, cardDefinitionForceLazy2x, cardDefinitionForceRandom } from "data/player/cards/force";
import { cardDefinitionBlock, cardDefinitionDeflect } from "data/player/cards/shield";
import { cardDefinitionClumsyThrust, cardDefinitionQuckThrust, cardDefinitionRiposte, cardDefinitionSlash } from "data/player/cards/sword";
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
import { cardDefinitionFinesseMartialTraining } from "data/player/cards/finesse";

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
      cardDefinitionForceEager,
      cardDefinitionForceEager,
      cardDefinitionForceRandom,
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
  }],
  benefit: [],
};
export const cardFrontAttributesFinesse: CardFrontChoice = {
  name: 'cloak and dagger',
  description: 'You choose the path of finesse.',
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
export const cardFrontAttributesMind: CardFrontChoice = {
  name: 'book and staff',
  description: 'You choose the path of magic.',
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
      recycleTarget: RecycleTarget.DiscardDeckTop,
    };
  });
}).map(definition => {
  return cardDescriptor.freeze({
    faces: definition.faces,
    recycleTarget: definition.recycleTarget,
    visibleFaceIndex: 0,
  });
});

const cardBackFinal: CardBackChoice = {
  name: 'threshold guardian',
  description: 'You\'ve always hated this bird. The feeling is reciprocated.',
  type: CardFaceType.ChoiceBack,
  background: CardBackgroundType.ForestPath,
  foreground: undefined,
  symbol: undefined,
  cost: [],
};

const cardFrontFinal: CardFrontChoice = {
  name: 'rooster',
  description: 'The rooster eyes you with pure malice.',
  type: CardFaceType.Choice,
  background: CardBackgroundType.ForestPath,
  foreground: undefined,
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
  recycleTarget: RecycleTarget.DiscardDeckTop,
  visibleFaceIndex: 0,
});

