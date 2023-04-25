import { CardBackChoice, CardBackgroundType, CardFaceType, CardFrontChoice, ChoiceType, RecycleTarget, cardDescriptor } from "model/domain";
import { cardDodge } from "./dodge";
import { cardFinesseLazy } from "./finesse";
import { cardForceLazy } from "./force";
import { cardHeadbutt } from "./headbutt";
import { cardKick } from "./kick";
import { cardMindEager } from "./mind";
import { cardBlock, cardDeflect } from "./shield";
import { cardTorch } from "./torch";
import { AgeDown, AgeUp, Healing } from "data/effects";


export const cards = [
  cardDodge,
  cardFinesseLazy,
  cardForceLazy,
  cardHeadbutt,
  cardKick,
  cardMindEager,
  cardBlock,
  cardDeflect,
  cardTorch,
];

const cardBackItemIgnore: CardBackChoice = {
  name: 'ignore',
  description: undefined,
  type: CardFaceType.ChoiceBack,
  background: CardBackgroundType.Crosshatched,
  foreground: undefined,
  symbol: undefined,
  cost: [],
};


const cardFrontItemIgnore: CardFrontChoice = {
  name: 'ignore',
  description: 'Junk.',
  type: CardFaceType.Choice,
  choice: {
    type: ChoiceType.NextTurn,
  },
  background: CardBackgroundType.Clear,
  foreground: undefined,
  symbol: undefined,
  cost: [],
  benefit: [],
};

const cardFrontItemIgnoreAgeDown: CardFrontChoice = {
  name: 'ignore',
  description: 'You feel unburdened.',
  type: CardFaceType.Choice,
  choice: {
    type: ChoiceType.NextTurn,
  },
  background: CardBackgroundType.Clear,
  foreground: undefined,
  symbol: undefined,
  cost: [AgeDown],
  benefit: [],
};

const cardFrontItemIgnoreAgeUp: CardFrontChoice = {
  name: 'ignore',
  description: 'You feel responsible.',
  type: CardFaceType.Choice,
  choice: {
    type: ChoiceType.NextTurn,
  },
  background: CardBackgroundType.Clear,
  foreground: undefined,
  symbol: undefined,
  cost: [AgeUp],
  benefit: [],
};

const cardFrontItemIgnoreHealing: CardFrontChoice = {
  name: 'ignore',
  description: 'You feel soothed.',
  type: CardFaceType.Choice,
  choice: {
    type: ChoiceType.NextTurn,
  },
  background: CardBackgroundType.Clear,
  foreground: undefined,
  symbol: undefined,
  cost: [Healing],
  benefit: [],
};


export const ignoreCards = [
  cardFrontItemIgnore,
  cardFrontItemIgnoreAgeDown,
  cardFrontItemIgnoreAgeUp,
  cardFrontItemIgnoreHealing,
].map(cardFront => (
    cardDescriptor.freeze({
      faces: [cardBackItemIgnore, cardFront],
      recycleTarget: RecycleTarget.Discard,
      recyclePosition: undefined,
      visibleFaceIndex: 0,
    })
));
