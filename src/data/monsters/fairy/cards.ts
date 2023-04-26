import { DamageDown, DamageUp, Finesse, Force, Magic, Mind, Perception } from "data/effects";
import { CardBackChoice, CardBackgroundType, CardDefinition, CardFaceType, CardForegroundType, CardFrontChoice, ChoiceType, RecycleTarget, SymbolType, cardDescriptor } from "model/domain";

const cardBackFairyGlowering: CardBackChoice = {
  name: 'glower',
  description: undefined,
  type: CardFaceType.ChoiceBack,
  background: CardBackgroundType.Crosshatched,
  foreground: CardForegroundType.Fairy,
  symbol: undefined,
  cost: [],
};
const cardBackFairyInvisibility: CardBackChoice = {
  name: 'invisibility',
  description: 'It\'s more camouflage than invisibility as it turns out.',
  type: CardFaceType.ChoiceBack,
  background: CardBackgroundType.Crosshatched,
  foreground: CardForegroundType.Fairy,
  symbol: undefined,
  cost: [Perception],
};
const cardBackFairySpeed: CardBackChoice = {
  name: 'nimbleness',
  description: 'You swat the pixie out of the air.',
  type: CardFaceType.ChoiceBack,
  background: CardBackgroundType.Crosshatched,
  foreground: CardForegroundType.Fairy,
  symbol: undefined,
  cost: [Finesse],
};

export const cardFrontFairyCurse: CardFrontChoice = {
  name: 'cursing',
  description: 'The pixie unleashes a stream of invective.',
  type: CardFaceType.Choice,
  choice: {
    type: ChoiceType.NextTurn,
  },
  background: CardBackgroundType.Clear,
  foreground: CardForegroundType.Fairy,
  symbol: SymbolType.Magic,
  cost: [Mind, Finesse, Force, Magic],
  benefit: [],
};
export const cardFrontFairyBlink: CardFrontChoice = {
  name: 'blink',
  description: 'The pixie disappears just as you are about to strike.',
  type: CardFaceType.Choice,
  choice: {
    type: ChoiceType.NextTurn,
  },
  background: CardBackgroundType.Clear,
  foreground: CardForegroundType.Fairy,
  symbol: SymbolType.Magic,
  cost: [DamageUp],
  benefit: [],
};
export const cardFrontFairyShock: CardFrontChoice = {
  name: 'shocking strike',
  description: 'The pixie shoots tiny bolts of elecricity at you.',
  type: CardFaceType.Choice,
  choice: {
    type: ChoiceType.NextTurn,
  },
  background: CardBackgroundType.Clear,
  foreground: CardForegroundType.Fairy,
  symbol: SymbolType.Magic,
  cost: [DamageDown],
  benefit: [],
};

export const cards = [
  cardBackFairyGlowering, 
  cardBackFairyInvisibility, 
  cardBackFairySpeed,
].flatMap(cardBack => {
  return [
    cardFrontFairyCurse,
    cardFrontFairyBlink,
    cardFrontFairyShock,
  ].map<CardDefinition>(cardFace => {
    return {
      faces: [cardBack, cardFace],
      recycleTarget: RecycleTarget.Draw,
      recyclePosition: undefined,
    };
  }).concat([{
    faces: [Math.random() > .5 ? cardBackFairyInvisibility : cardBackFairySpeed, {
      name: 'self destruct',
      description: 'The pixie literally explodes with rage.',
      type: CardFaceType.Choice,
      choice: {
        type: ChoiceType.NextTurn,
      },
      background: CardBackgroundType.Clear,
      foreground: CardForegroundType.Fairy,
      symbol: SymbolType.Magic,
      cost: [DamageDown, DamageDown],
      benefit: [DamageUp],
    }],
    recyclePosition: 9,
    recycleTarget: RecycleTarget.Discard,
  }]);
}).map(definition => {
  return cardDescriptor.freeze({
    ...definition,
    visibleFaceIndex: 0,
  });
})
