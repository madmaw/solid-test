import { DamageDown, DamageUp, Force, Healing, Mind } from "data/effects";
import { CardBackChoice, CardBackgroundType, CardDefinition, CardFaceType, CardForegroundType, CardFrontChoice, ChoiceType, RecycleTarget, SymbolType, cardDescriptor } from "model/domain";

const cardBackTrollAggression: CardBackChoice = {
  name: 'aggression',
  description: undefined,
  type: CardFaceType.ChoiceBack,
  background: CardBackgroundType.Crosshatched,
  foreground: CardForegroundType.Troll,
  symbol: undefined,
  cost: [],
};
const cardBackTrollSurprise: CardBackChoice = {
  name: 'trolling',
  description: 'The troll unwittingly telegraphs its next move.',
  type: CardFaceType.ChoiceBack,
  background: CardBackgroundType.Crosshatched,
  foreground: CardForegroundType.Troll,
  symbol: undefined,
  cost: [Mind],
};
const cardBackTrollRetaliation: CardBackChoice = {
  name: 'surprise',
  description: 'The blow catches the troll off guard.',
  type: CardFaceType.ChoiceBack,
  background: CardBackgroundType.Crosshatched,
  foreground: CardForegroundType.Troll,
  symbol: undefined,
  cost: [DamageUp],
};

export const cardFrontTrollSmash: CardFrontChoice = {
  name: 'smash',
  description: 'The troll slams you with a tree branch.',
  type: CardFaceType.Choice,
  choice: {
    type: ChoiceType.NextTurn,
  },
  background: CardBackgroundType.Clear,
  foreground: CardForegroundType.Troll,
  symbol: SymbolType.Force,
  cost: [DamageDown, DamageDown],
  benefit: [],
};
export const cardFrontTrollOdour: CardFrontChoice = {
  name: 'trollish odour',
  description: 'That thing reeks.',
  type: CardFaceType.Choice,
  choice: {
    type: ChoiceType.NextTurn,
  },
  background: CardBackgroundType.Clear,
  foreground: CardForegroundType.Troll,
  symbol: SymbolType.Force,
  cost: [Force, Force, Mind],
  benefit: [],
};
export const cardFrontTrollRegeneration: CardFrontChoice = {
  name: 'regenerate',
  description: 'The trolls wounds heal before your eyes!',
  type: CardFaceType.Choice,
  choice: {
    type: ChoiceType.NextTurn,
  },
  background: CardBackgroundType.Clear,
  foreground: CardForegroundType.Troll,
  symbol: SymbolType.Force,
  cost: [DamageUp],
  benefit: [Healing],
};

export const cards = [
  cardBackTrollRetaliation, 
  cardBackTrollSurprise, 
  cardBackTrollAggression,
].flatMap(cardBack => {
  return [
    cardFrontTrollSmash,
    cardFrontTrollOdour,
    cardFrontTrollRegeneration,
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
