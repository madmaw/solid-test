import { DamageDown, DamageUp, Finesse, FireDown, Force, Mind } from "data/effects";
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

const cardBackDragonContemplate: CardBackChoice = {
  name: 'contemplate',
  description: 'The dragon contemplates you.',
  type: CardFaceType.ChoiceBack,
  background: CardBackgroundType.Crosshatched,
  foreground: CardForegroundType.Dragon,
  symbol: undefined,
  cost: [],
};
const cardBackDragonRoar: CardBackChoice = {
  name: 'rear up',
  description: 'The dragon rears up.',
  type: CardFaceType.ChoiceBack,
  background: CardBackgroundType.Crosshatched,
  foreground: CardForegroundType.Dragon,
  symbol: undefined,
  cost: [],
};
const cardBackDragonFlight: CardBackChoice = {
  name: 'flight',
  description: 'You chase the dragon down.',
  type: CardFaceType.ChoiceBack,
  background: CardBackgroundType.Crosshatched,
  foreground: CardForegroundType.Dragon,
  symbol: undefined,
  cost: [Finesse, Finesse],
};

export const cardFrontDragonBreathe: CardFrontChoice = {
  name: 'breathe',
  description: 'The dragon exhales.',
  type: CardFaceType.Choice,
  choice: {
    type: ChoiceType.NextTurn,
  },
  background: CardBackgroundType.Clear,
  foreground: CardForegroundType.Dragon,
  symbol: undefined,
  cost: [FireDown, FireDown],
  benefit: [],
};
export const cardFrontDragonBite: CardFrontChoice = {
  name: 'bite',
  description: 'The dragon bites.',
  type: CardFaceType.Choice,
  choice: {
    type: ChoiceType.NextTurn,
  },
  background: CardBackgroundType.Clear,
  foreground: CardForegroundType.Dragon,
  symbol: undefined,
  cost: [DamageDown, DamageDown, DamageDown, DamageUp],
  benefit: [],
};
export const cardFrontDragonArmour: CardFrontChoice = {
  name: 'armour',
  description: 'The dragon shields itself.',
  type: CardFaceType.Choice,
  choice: {
    type: ChoiceType.NextTurn,
  },
  background: CardBackgroundType.Clear,
  foreground: CardForegroundType.Dragon,
  symbol: undefined,
  cost: [DamageUp, DamageUp, DamageUp, DamageUp],
  benefit: [],
};
export const cardFrontDragonRoar: CardFrontChoice = {
  name: 'roar',
  description: 'The dragon roars, you quail in terror.',
  type: CardFaceType.Choice,
  choice: {
    type: ChoiceType.NextTurn,
  },
  background: CardBackgroundType.Clear,
  foreground: CardForegroundType.Dragon,
  symbol: undefined,
  cost: [DamageUp, Force, Force, Finesse, Finesse, Mind],
  benefit: [],
};

export const cards = [
  cardBackDragonContemplate, 
  cardBackDragonFlight, 
  cardBackDragonRoar,
].flatMap(cardBack => {
  return [
    cardFrontDragonArmour,
    cardFrontDragonBite,
    cardFrontDragonBreathe,
    cardFrontDragonRoar,
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
