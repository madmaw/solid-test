import { DamageUp, Force } from "data/effects";
import {
  CardBackChoice,
  CardBackgroundType,
  CardDefinition,
  CardFaceType,
  CardForegroundType,
  CardFrontChoice,
  ChoiceType,
  RecycleTarget,
  cardDescriptor,
} from "model/domain";

const cardBackDummy: CardBackChoice = {
  name: 'indifference',
  description: undefined,
  type: CardFaceType.ChoiceBack,
  background: CardBackgroundType.Crosshatched,
  foreground: CardForegroundType.Dummy,
  symbol: undefined,
  cost: [],
};

export const cardFrontDummyDefend: CardFrontChoice = {
  name: 'innate hardness',
  description: undefined,
  type: CardFaceType.Choice,
  choice: {
    type: ChoiceType.NextTurn,
  },
  background: CardBackgroundType.Clear,
  foreground: CardForegroundType.Dummy,
  symbol: undefined,
  cost: [DamageUp],
  benefit: [],
};
export const cardFrontDummyHardWork: CardFrontChoice = {
  name: 'hard work',
  description: '',
  type: CardFaceType.Choice,
  choice: {
    type: ChoiceType.NextTurn,
  },
  background: CardBackgroundType.Clear,
  foreground: CardForegroundType.Dummy,
  symbol: undefined,
  cost: [Force, Force, Force],
  benefit: [],
};
export const cardFrontDummyGiveUp: CardFrontChoice = {
  name: 'give up',
  description: '',
  type: CardFaceType.Choice,
  choice: {
    type: ChoiceType.NextPage,
    encounter: undefined,
  },
  background: CardBackgroundType.Clear,
  foreground: CardForegroundType.Dummy,
  symbol: undefined,
  cost: [],
  benefit: [],
};

export const cards = [
  cardBackDummy, 
].flatMap(cardBack => {
  return [
    cardFrontDummyDefend,
    cardFrontDummyHardWork,
    cardFrontDummyGiveUp,
  ].map<CardDefinition>(cardFace => {
    return {
      faces: [cardBack, cardFace],
      recycleTarget: RecycleTarget.Draw,
      recyclePosition: undefined,
    };
  });
}).map(definition => {
  return cardDescriptor.freeze({
    ...definition,
    visibleFaceIndex: 0,
  });
})
