import { 
  DoubleCard,
  Finesse,
  Force, 
  LoseCards,
  Mind,
} from "data/effects";
import {
  CardBackChoice,
  CardBackgroundType,
  CardDefinition,
  CardFaceType,
  CardForegroundType,
  CardFrontChoice,
  ChoiceType,
  EncounterType,
  EventType,
  RecycleTarget,
  cardDescriptor,
} from "model/domain";

const cardBackShrineOfferFinesse: CardBackChoice = {
  name: 'offer',
  description: 'The offering is of interest.',
  type: CardFaceType.ChoiceBack,
  background: CardBackgroundType.Crosshatched,
  foreground: CardForegroundType.Shrine,
  symbol: undefined,
  cost: [Finesse],
};
const cardBackShrineOfferForce: CardBackChoice = {
  name: 'offer',
  description: 'The offering is of interest.',
  type: CardFaceType.ChoiceBack,
  background: CardBackgroundType.Crosshatched,
  foreground: CardForegroundType.Shrine,
  symbol: undefined,
  cost: [Force],
};
const cardBackShrineOfferMind: CardBackChoice = {
  name: 'offer',
  description: 'The offering is of interest.',
  type: CardFaceType.ChoiceBack,
  background: CardBackgroundType.Crosshatched,
  foreground: CardForegroundType.Shrine,
  symbol: undefined,
  cost: [Mind],
};

export const cardFrontShrineSacrifice: CardFrontChoice = {
  name: 'sacrifice',
  description: 'You forget something important.',
  type: CardFaceType.Choice,
  choice: {
    type: ChoiceType.NextTurn,
  },
  background: CardBackgroundType.Clear,
  foreground: CardForegroundType.Shrine,
  symbol: undefined,
  cost: [LoseCards],
  benefit: [],
};
export const cardFrontShrineEmpower: CardFrontChoice = {
  name: 'empower',
  description: 'Forbidden knowledge briefly fills your mind.',
  type: CardFaceType.Choice,
  choice: {
    type: ChoiceType.NextTurn,
  },
  background: CardBackgroundType.Clear,
  foreground: CardForegroundType.Shrine,
  symbol: undefined,
  cost: [DoubleCard],
  benefit: [],
};

export const cards = [
  cardBackShrineOfferFinesse, 
  cardBackShrineOfferForce,
  cardBackShrineOfferMind,
].flatMap(cardBack => {
  return [
    cardFrontShrineSacrifice,
    cardFrontShrineEmpower,
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

const cardBackShrineIgnore: CardBackChoice = {
  name: 'avoid',
  description: undefined,
  type: CardFaceType.ChoiceBack,
  background: CardBackgroundType.Crosshatched,
  foreground: CardForegroundType.Shrine,
  symbol: undefined,
  cost: [],
};
export const cardFrontShrineIgnore: CardFrontChoice = {
  name: 'avoid',
  description: 'Discretion is the better part of valour.',
  type: CardFaceType.Choice,
  choice: {
    type: ChoiceType.NextTurn,
  },
  background: CardBackgroundType.Clear,
  foreground: CardForegroundType.Shrine,
  symbol: undefined,
  cost: [],
  benefit: [],
};

export const cardIgnore = cardDescriptor.freeze({
  faces: [cardBackShrineIgnore, cardFrontShrineIgnore],
  recycleTarget: RecycleTarget.Discard,
  recyclePosition: undefined,
  visibleFaceIndex: 0,
});

export const cardFrontShrine: CardFrontChoice = {
  name: 'shrine',
  description: 'You come across a shrine to a forgotten god.',
  type: CardFaceType.Choice,
  background: CardBackgroundType.ForestPath,
  foreground: CardForegroundType.Shrine,
  symbol: undefined,
  choice: {
    type: ChoiceType.NextPage,
    encounter: {
      type: EncounterType.Event,
      event: EventType.Shrine,
    },
  },
  cost: [],
  benefit: [],
};