import {
  CardBackChoice,
  CardBackgroundType,
  CardFaceType,
  CardForegroundType,
  CardFrontChoice,
  ChoiceType,
  EncounterType,
  EventType,
  MonsterType,
  RecycleTarget,
  cardDescriptor,
} from "model/domain";

const cardBackTreasure: CardBackChoice = {
  name: 'armoury',
  description: 'You stop in to see the old visier before you head off.',
  type: CardFaceType.ChoiceBack,
  background: CardBackgroundType.Crosshatched,
  foreground: undefined,
  symbol: undefined,
  cost: [],
};

const cardFrontTreasure: CardFrontChoice = {
  name: 'armoury',
  description: 'It\'s dangerous to go alone! Take this.',
  type: CardFaceType.Choice,
  background: CardBackgroundType.Passageway,
  foreground: undefined,
  symbol: undefined,
  choice: {
    type: ChoiceType.NextPage,
    encounter: {
      type: EncounterType.Event,
      event: EventType.Shop,
    },
  },
  cost: [],
  benefit: [],
};

export const treasureCard = cardDescriptor.freeze({
  faces: [cardBackTreasure, cardFrontTreasure],
  recycleTarget: RecycleTarget.Discard,
  recyclePosition: undefined,
  visibleFaceIndex: 0,
});

export const cards = [treasureCard];

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
