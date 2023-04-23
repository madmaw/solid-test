import { 
  AgeDown,
  Finesse,
  Force, 
  Healing,
} from "data/effects";
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

const cardBackMagicTreePickFruit: CardBackChoice = {
  name: 'pick fruit',
  type: CardFaceType.ChoiceBack,
  background: CardBackgroundType.Crosshatched,
  foreground: CardForegroundType.MagicTree,
  symbol: undefined,
  cost: [Finesse],
};
const cardBackMagicTreeShakeTree: CardBackChoice = {
  name: 'shake tree',
  type: CardFaceType.ChoiceBack,
  background: CardBackgroundType.Crosshatched,
  foreground: CardForegroundType.MagicTree,
  symbol: undefined,
  cost: [Force],
};
const cardBackMagicTreeGatherFruit: CardBackChoice = {
  name: 'gather fruit',
  type: CardFaceType.ChoiceBack,
  background: CardBackgroundType.Crosshatched,
  foreground: CardForegroundType.MagicTree,
  symbol: undefined,
  cost: [],
};

export const cardFrontMagicTreeGoldenApple: CardFrontChoice = {
  name: 'golden apple',
  type: CardFaceType.Choice,
  choice: {
    type: ChoiceType.NextTurn,
  },
  background: CardBackgroundType.Clear,
  foreground: CardForegroundType.MagicTree,
  symbol: undefined,
  cost: [AgeDown],
  benefit: [],
};
export const cardFrontMagicTreeGreenApple: CardFrontChoice = {
  name: 'green apple',
  type: CardFaceType.Choice,
  choice: {
    type: ChoiceType.NextTurn,
  },
  background: CardBackgroundType.Clear,
  foreground: CardForegroundType.MagicTree,
  symbol: undefined,
  cost: [],
  benefit: [],
};
export const cardFrontMagicTreeRedApple: CardFrontChoice = {
  name: 'red apple',
  type: CardFaceType.Choice,
  choice: {
    type: ChoiceType.NextTurn,
  },
  background: CardBackgroundType.Clear,
  foreground: CardForegroundType.Fountain,
  symbol: undefined,
  cost: [Healing],
  benefit: [],
};

export const cards = [
  cardBackMagicTreeShakeTree, 
  cardBackMagicTreeGatherFruit,
  cardBackMagicTreePickFruit,
].flatMap(cardBack => {
  return [
    cardFrontMagicTreeGoldenApple,
    cardFrontMagicTreeGreenApple,
    cardFrontMagicTreeRedApple,
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
