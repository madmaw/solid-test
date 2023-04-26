import { CardBackChoice, CardBackgroundType, CardFaceType, CardFrontChoice, CardState, ChoiceType, RecycleTarget, cardDescriptor } from "model/domain";
import { cardDodge } from "./dodge";
import { cardFinesse1, cardFinesseFeat, cardFinesseLazy } from "./finesse";
import { cardForceEager, cardForceFeat, cardForceLazy } from "./force";
import { cardHeadbutt } from "./headbutt";
import { cardKick } from "./kick";
import { cardMindEager } from "./mind";
import { cardBlock, cardDeflect } from "./shield";
import { cardTorch } from "./torch";
import { Youth, Healing } from "data/effects";
import { cardMisdirection } from "./cloak";
import { cardCriticalStrike, cardPoisonBlade } from "./dagger";
import { cardMagicFeat, cardMagicIncantation5 } from "./magic";
import { cardMagicBarrier } from "./magic/barrier";
import { cardMagicGrace } from "./magic/grace";
import { cardMagicStrength } from "./magic/strength";
import { cardMagicMissile } from "./magic/missile";
import { cardMagicPoison } from "./magic/poison";
import { cardMagicSight } from "./magic/divination";
import { cardFireball } from "./magic/fireball";


export const cards: readonly CardState[] = [
  cardDodge,
  cardFinesseLazy,
  cardForceLazy,
  cardForceEager,
  cardHeadbutt,
  cardKick,
  cardMindEager,
  cardBlock,
  cardDeflect,
  cardTorch,
  cardFinesse1,
  cardMisdirection,
  cardFinesseFeat,
  cardForceFeat,
  cardPoisonBlade,
  cardCriticalStrike,
  cardMagicFeat,
  cardMagicIncantation5,
  cardMagicBarrier,
  cardMagicGrace,
  cardMagicStrength,
  cardMagicSight,
  cardMagicMissile,
  cardMagicPoison,
  cardFireball,
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
  name: 'potion of youth',
  description: 'You feel invigorated.',
  type: CardFaceType.Choice,
  choice: {
    type: ChoiceType.NextTurn,
  },
  background: CardBackgroundType.Clear,
  foreground: undefined,
  symbol: undefined,
  cost: [Youth],
  benefit: [],
};

const cardFrontItemIgnoreHealing: CardFrontChoice = {
  name: 'potion of health',
  description: 'You feel better.',
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
  cardFrontItemIgnoreHealing,
].map(cardFront => (
    cardDescriptor.freeze({
      faces: [cardBackItemIgnore, cardFront],
      recycleTarget: RecycleTarget.Discard,
      recyclePosition: undefined,
      visibleFaceIndex: 0,
    })
));
