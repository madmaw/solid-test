import {
  CardBackChoice,
  CardBackgroundType,
  CardDefinition,
  CardFaceType,
  CardForegroundType,
  CardFrontChoice,
  ChoiceType,
  EncounterType,
  MonsterType,
  RecycleTarget,
  cardDescriptor,
} from "model/domain";

const cardBackAttributes: CardBackChoice = {
  name: 'attributes',
  description: undefined,
  type: CardFaceType.ChoiceBack,
  background: CardBackgroundType.Crosshatched,
  foreground: CardForegroundType.Fountain,
  symbol: undefined,
  cost: [],
};

export const cardFrontAttributesForce: CardFrontChoice = {
  name: 'force',
  description: 'You choose the path of strength.',
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
export const cardFrontAttributesFinesse: CardFrontChoice = {
  name: 'finesse',
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
  name: 'mind',
  description: 'You choose the path of intelligence.',
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
    cardFrontAttributesForce,
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
    definition,
    visibleFaceIndex: 0,
  });
});

const cardBackFinal: CardBackChoice = {
  name: 'threshold guardian',
  description: 'You\'ve always hated this bird.',
  type: CardFaceType.ChoiceBack,
  background: CardBackgroundType.ForestPath,
  foreground: undefined,
  symbol: undefined,
  cost: [],
};

const cardFrontFinal: CardFrontChoice = {
  name: 'rooster',
  description: 'The rooster eyes you hatefully.',
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
  definition: {
    faces: [cardBackFinal, cardFrontFinal],
    recycleTarget: RecycleTarget.DiscardDeckTop,
  },
  visibleFaceIndex: 0,
});

