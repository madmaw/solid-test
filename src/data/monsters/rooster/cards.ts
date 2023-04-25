import { DamageDown, DamageUp, Finesse, Force, Mind } from "data/effects";
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

const cardBackRoosterTerritorial: CardBackChoice = {
  name: 'territorial',
  description: 'The rooster makes angry clucking noises.',
  type: CardFaceType.ChoiceBack,
  background: CardBackgroundType.Crosshatched,
  foreground: CardForegroundType.Rooster,
  symbol: undefined,
  cost: [],
};
const cardBackRoosterIntimidation: CardBackChoice = {
  name: 'intimidation',
  description: 'You see through the birds bluster.',
  type: CardFaceType.ChoiceBack,
  background: CardBackgroundType.Crosshatched,
  foreground: CardForegroundType.Rooster,
  symbol: undefined,
  cost: [Mind],
};

export const cardFrontRoosterClaw: CardFrontChoice = {
  name: 'claw',
  description: 'The rooster claws at your eyes.',
  type: CardFaceType.Choice,
  choice: {
    type: ChoiceType.NextTurn,
  },
  background: CardBackgroundType.Clear,
  foreground: CardForegroundType.Rooster,
  symbol: SymbolType.Finesse,
  cost: [DamageDown, Finesse],
  benefit: [],
};
export const cardFrontRoosterCrow: CardFrontChoice = {
  name: 'crow',
  description: 'The cock crows.',
  type: CardFaceType.Choice,
  choice: {
    type: ChoiceType.NextTurn,
  },
  background: CardBackgroundType.Clear,
  foreground: CardForegroundType.Rooster,
  symbol: SymbolType.Mind,
  cost: [Mind, Mind, Mind],
  benefit: [],
};
export const cardFrontRoosterEvade: CardFrontChoice = {
  name: 'evade',
  description: 'In a cloud of feathers, the rooster forces you to give chase.',
  type: CardFaceType.Choice,
  choice: {
    type: ChoiceType.NextTurn,
  },
  background: CardBackgroundType.Clear,
  foreground: CardForegroundType.Rooster,
  symbol: SymbolType.Finesse,
  cost: [DamageUp, Force],
  benefit: [],
};

export const cards = [
  cardBackRoosterTerritorial, 
  cardBackRoosterTerritorial, 
  cardBackRoosterIntimidation,
].flatMap(cardBack => {
  return [
    cardFrontRoosterClaw,
    cardFrontRoosterCrow,
    cardFrontRoosterEvade,
  ].map<CardDefinition>(cardFace => {
    return {
      faces: [cardBack, cardFace],
      recycleTarget: RecycleTarget.DrawDeckRandom,
    };
  });
}).map(definition => {
  return cardDescriptor.freeze({
    ...definition,
    visibleFaceIndex: 0,
  });
})
