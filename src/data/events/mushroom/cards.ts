import {
  Youth,
  Age,
  Finesse,
  Force,
  GainMaxHealth,
  Magic,
  Mind,
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
  EffectDirection,
  RecycleTarget,
  SymbolType,
  cardDescriptor,
} from "model/domain";

const cardBackMushroomBlue: CardBackChoice = {
  name: 'blue mushroom',
  description: 'You consider the mushroom.',
  type: CardFaceType.ChoiceBack,
  background: CardBackgroundType.Crosshatched,
  foreground: CardForegroundType.Mushroom,
  symbol: undefined,
  cost: [Mind],
};
const cardBackMushroomRed: CardBackChoice = {
  name: 'red mushroom',
  description: 'You gently inspect the mushroom.',
  type: CardFaceType.ChoiceBack,
  background: CardBackgroundType.Crosshatched,
  foreground: CardForegroundType.Mushroom,
  symbol: undefined,
  cost: [Perception, Finesse],
};
const cardBackMushroomFamiliar: CardBackChoice = {
  name: 'familiar mushroom',
  description: 'You recognise one of the mushrooms.',
  type: CardFaceType.ChoiceBack,
  background: CardBackgroundType.Crosshatched,
  foreground: CardForegroundType.Mushroom,
  symbol: undefined,
  cost: [],
};

export const cardFrontMushroomBenign: CardFrontChoice = {
  name: 'benign mushroom',
  description: 'The mushroom has no effect.',
  type: CardFaceType.Choice,
  choice: {
    type: ChoiceType.NextTurn,
  },
  background: CardBackgroundType.Clear,
  foreground: CardForegroundType.Mushroom,
  symbol: undefined,
  cost: [],
  benefit: [],
};
export const cardFrontMushroomForce: CardFrontChoice = {
  name: 'strength fungus',
  description: 'You feel strong.',
  type: CardFaceType.Choice,
  choice: {
    type: ChoiceType.NextTurn,
  },
  background: CardBackgroundType.Clear,
  foreground: CardForegroundType.Mushroom,
  symbol: undefined,
  cost: [{
    symbol: SymbolType.GainCards,
    direction: EffectDirection.Omni,
    cards: [{
      faces: [{
        name: 'fungal strength',
        description: 'Your fungal strength bursts forth!',
        type: CardFaceType.ResourceBack,
        background: CardBackgroundType.Crosshatched,
        foreground: CardForegroundType.Mushroom,
        symbol: SymbolType.Perception,
        cost: [Finesse],
      }, {
        name: 'fungal strength',
        description: 'I like to think of myself as a fun guy.',
        type: CardFaceType.Resource,
        background: CardBackgroundType.Clear,
        foreground: CardForegroundType.Mushroom,
        symbol: SymbolType.Perception,
        cost: [],
        benefit:[Force, Force, Force]
      }],
      recycleTarget: RecycleTarget.Draw,
      recyclePosition: 5,
    }],
  }],
  benefit: [],
};
export const cardFrontMushroomPoison: CardFrontChoice = {
  name: 'poison mushroom',
  description: 'You feel sick.',
  type: CardFaceType.Choice,
  choice: {
    type: ChoiceType.NextTurn,
  },
  background: CardBackgroundType.Clear,
  foreground: CardForegroundType.Mushroom,
  symbol: undefined,
  cost: [
    PoisonDown,
    {
      symbol: SymbolType.GainCards,
      direction: EffectDirection.Omni,
      cards: [{
        faces: [{
          name: 'fungal immunity',
          description: undefined,
          type: CardFaceType.ResourceBack,
          background: CardBackgroundType.Crosshatched,
          foreground: CardForegroundType.Mushroom,
          symbol: undefined,
          cost: [],
        }, {
          name: 'fungal immunity',
          description: '.',
          type: CardFaceType.Resource,
          background: CardBackgroundType.Clear,
          foreground: CardForegroundType.Mushroom,
          symbol: undefined,
          cost: [],
          benefit:[PoisonDown]
        }],
        recycleTarget: RecycleTarget.Draw,
        recyclePosition: 5,
      }],
    },
  ],
  benefit: [],
};
export const cardFrontMushroomFinesse: CardFrontChoice = {
  name: 'finesse fungus',
  description: 'You feel fast.',
  type: CardFaceType.Choice,
  choice: {
    type: ChoiceType.NextTurn,
  },
  background: CardBackgroundType.Clear,
  foreground: CardForegroundType.Mushroom,
  symbol: undefined,
  cost: [{
    symbol: SymbolType.GainCards,
    direction: EffectDirection.Omni,
    cards: [{
      faces: [{
        name: 'fugue state',
        description: undefined,
        type: CardFaceType.ResourceBack,
        background: CardBackgroundType.Crosshatched,
        foreground: CardForegroundType.Mushroom,
        symbol: undefined,
        cost: [],
      }, {
        name: 'fugue state',
        description: '.',
        type: CardFaceType.Resource,
        background: CardBackgroundType.Clear,
        foreground: CardForegroundType.Mushroom,
        symbol: undefined,
        cost: [Force, Mind],
        benefit:[Finesse, Finesse]
      }],
      recycleTarget: RecycleTarget.Draw,
      recyclePosition: 5,
    }],
  }],
  benefit: [],
};
export const cardFrontMushroomMind: CardFrontChoice = {
  name: 'special mushroom',
  description: 'The mushroom opens your third eye.',
  type: CardFaceType.Choice,
  choice: {
    type: ChoiceType.NextTurn,
  },
  background: CardBackgroundType.Clear,
  foreground: CardForegroundType.Mushroom,
  symbol: undefined,
  cost: [{
    symbol: SymbolType.GainCards,
    direction: EffectDirection.Omni,
    cards: [{
      faces: [{
        name: 'third eye',
        description: undefined,
        type: CardFaceType.ResourceBack,
        background: CardBackgroundType.Crosshatched,
        foreground: CardForegroundType.Mushroom,
        symbol: SymbolType.Perception,
        cost: [],
      }, {
        name: 'third eye',
        description: 'You can see everything.',
        type: CardFaceType.Resource,
        background: CardBackgroundType.Clear,
        foreground: CardForegroundType.Mushroom,
        symbol: SymbolType.Perception,
        cost: [],
        benefit:[Perception]
      }],
      recycleTarget: RecycleTarget.Draw,
      recyclePosition: 1,
    }]
  }],
  benefit: [],
};
export const cardFrontMushroomMagic: CardFrontChoice = {
  name: 'magic mushroom',
  description: 'You feel absolutely magical.',
  type: CardFaceType.Choice,
  choice: {
    type: ChoiceType.NextTurn,
  },
  background: CardBackgroundType.Clear,
  foreground: CardForegroundType.Mushroom,
  symbol: undefined,
  cost: [{
    symbol: SymbolType.GainCards,
    direction: EffectDirection.Omni,
    cards: [{
      faces: [{
        name: 'spore magic',
        description: undefined,
        type: CardFaceType.ResourceBack,
        background: CardBackgroundType.Crosshatched,
        foreground: CardForegroundType.Mushroom,
        symbol: SymbolType.Magic,
        cost: [],
      }, {
        name: 'spore magic',
        description: 'Magic ish magic yeh.',
        type: CardFaceType.Resource,
        background: CardBackgroundType.Clear,
        foreground: CardForegroundType.Mushroom,
        symbol: SymbolType.Magic,
        cost: [],
        benefit:[Magic]
      }],
      recycleTarget: RecycleTarget.Draw,
      recyclePosition: 4,
    }]
  }],
  benefit: [],
};
export const cardFrontMushroomYouth: CardFrontChoice = {
  name: 'youth mushroom',
  description: 'You feel younger.',
  type: CardFaceType.Choice,
  choice: {
    type: ChoiceType.NextTurn,
  },
  background: CardBackgroundType.Clear,
  foreground: CardForegroundType.Mushroom,
  symbol: undefined,
  cost: [Youth, Youth],
  benefit: [],
};
export const cardFrontMushroomMaturity: CardFrontChoice = {
  name: 'maturity mushroom',
  description: 'You feel older.',
  type: CardFaceType.Choice,
  choice: {
    type: ChoiceType.NextTurn,
  },
  background: CardBackgroundType.Clear,
  foreground: CardForegroundType.Mushroom,
  symbol: undefined,
  cost: [Age, Age],
  benefit: [],
};
export const cardFrontMushroomHealing: CardFrontChoice = {
  name: 'health mushroom',
  description: 'You feel alive.',
  type: CardFaceType.Choice,
  choice: {
    type: ChoiceType.NextTurn,
  },
  background: CardBackgroundType.Clear,
  foreground: CardForegroundType.Mushroom,
  symbol: undefined,
  cost: [GainMaxHealth],
  benefit: [],
};

export const cards = [
  cardBackMushroomBlue, 
  cardBackMushroomRed,
  cardBackMushroomFamiliar,
].flatMap(cardBack => {
  return [
    cardFrontMushroomBenign,
    cardFrontMushroomFinesse,
    cardFrontMushroomForce,
    cardFrontMushroomPoison,
    cardFrontMushroomMagic,
    cardFrontMushroomMind,
    cardFrontMushroomYouth,
    cardFrontMushroomMaturity,
    cardFrontMushroomHealing,
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

const cardBackMushroomIgnore: CardBackChoice = {
  name: 'ignore',
  description: undefined,
  type: CardFaceType.ChoiceBack,
  background: CardBackgroundType.Crosshatched,
  foreground: CardForegroundType.Mushroom,
  symbol: undefined,
  cost: [],
};

export const cardFrontMushroomIgnore: CardFrontChoice = {
  name: 'ignore',
  description: 'Best left alone.',
  type: CardFaceType.Choice,
  choice: {
    type: ChoiceType.NextTurn,
  },
  background: CardBackgroundType.Clear,
  foreground: CardForegroundType.Mushroom,
  symbol: undefined,
  cost: [],
  benefit: [],
};

export const cardIgnore = cardDescriptor.freeze({
  faces: [cardBackMushroomIgnore, cardFrontMushroomIgnore],
  recycleTarget: RecycleTarget.Discard,
  recyclePosition: undefined,
  visibleFaceIndex: 0,
});
