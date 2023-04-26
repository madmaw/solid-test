import { 
  DamageDown,
  Finesse,
  Force,
  Perception,
  PoisonDown,
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
  SymbolType,
  cardDescriptor,
} from "model/domain";

const cardBackSpiderLunge: CardBackChoice = {
  name: 'lunge',
  description: undefined,
  type: CardFaceType.ChoiceBack,
  background: CardBackgroundType.Crosshatched,
  foreground: CardForegroundType.Spider,
  symbol: undefined,
  cost: [],
};
const cardBackSpiderHide: CardBackChoice = {
  name: 'hide',
  description: 'The spider crawls into a dark crevice.',
  type: CardFaceType.ChoiceBack,
  background: CardBackgroundType.Crosshatched,
  foreground: CardForegroundType.Spider,
  symbol: undefined,
  cost: [Perception],
};
const cardBackSpiderEntangle: CardBackChoice = {
  name: 'entangle',
  description: 'You tear through the webbing.',
  type: CardFaceType.ChoiceBack,
  background: CardBackgroundType.Crosshatched,
  foreground: CardForegroundType.Spider,
  symbol: undefined,
  cost: [Force],
};

export const cardFrontSpiderBite: CardFrontChoice = {
  name: 'bite',
  description: 'The spider rears up and bites you.',
  type: CardFaceType.Choice,
  choice: {
    type: ChoiceType.NextTurn,
  },
  background: CardBackgroundType.Clear,
  foreground: CardForegroundType.Spider,
  symbol: SymbolType.Finesse,
  cost: [DamageDown],
  benefit: [],
};
export const cardFrontSpiderWeb: CardFrontChoice = {
  name: 'web',
  description: 'It covers you in sticy webbing.',
  type: CardFaceType.Choice,
  choice: {
    type: ChoiceType.NextTurn,
  },
  background: CardBackgroundType.Clear,
  foreground: CardForegroundType.Spider,
  symbol: SymbolType.Finesse,
  cost: [Force, Finesse, Finesse],
  benefit: [],
};
export const cardFrontSpiderSting: CardFrontChoice = {
  name: 'sting',
  description: 'The spider stings you.',
  type: CardFaceType.Choice,
  choice: {
    type: ChoiceType.NextTurn,
  },
  background: CardBackgroundType.Clear,
  foreground: CardForegroundType.Spider,
  symbol: SymbolType.Finesse,
  cost: [PoisonDown],
  benefit: [],
};

export const cards = [
  cardBackSpiderLunge, 
  cardBackSpiderEntangle, 
  cardBackSpiderHide,
].flatMap(cardBack => {
  return [
    cardFrontSpiderBite,
    cardFrontSpiderSting,
    cardFrontSpiderWeb,
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
