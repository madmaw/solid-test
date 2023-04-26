import { DamageUp, Finesse, Force } from "data/effects";
import { cardForceEager } from "data/items/force";
import { cardKick } from "data/items/kick";
import { cardDeflect } from "data/items/shield";
import { CardBackChoice, CardBackResource, CardBackgroundType, CardDefinition, CardFaceType, CardFrontChoice, CardFrontResource, ChoiceType, EffectDirection, EncounterType, MonsterType, RecycleTarget, SymbolType, cardDescriptor } from "model/domain";


const cardBackForceTutorial1: CardBackResource = {
  name: 'learners strength',
  description:
    'The yellow card is a resource card. '+
    'You can use it to open the door by dragging the yellow card onto the barred door card. Notice that the symbol at the top of the card matches the symbol at the bottom of the door.',
  type: CardFaceType.ResourceBack,
  background: CardBackgroundType.Crosshatched,
  foreground: undefined,
  symbol: undefined,
  cost: [],
};
const cardFrontForceTutorial1: CardFrontResource = {
  name: 'learners strength',
  description: 'That\'s the way.',
  type: CardFaceType.Resource,
  background: CardBackgroundType.Clear,
  foreground: undefined,
  symbol: SymbolType.Force,
  cost: [],
  benefit: [Force],
};
export const cardForceDefinitionTutorial1: CardDefinition = {
  recycleTarget: RecycleTarget.Draw,
  recyclePosition: 1,
  faces: [cardBackForceTutorial1, cardFrontForceTutorial1],
};
export const cardForceTutorial1 = cardDescriptor.freeze({
  ...cardForceDefinitionTutorial1,
  visibleFaceIndex: 0,
});


const cardBackForceTutorial2: CardBackResource = {
  name: 'learners strength',
  description:
  'Drag both of the yellow cards on top of the dark blue card.',
  type: CardFaceType.ResourceBack,
  background: CardBackgroundType.Crosshatched,
  foreground: undefined,
  symbol: undefined,
  cost: [],
};
const cardFrontForceTutorial2: CardFrontResource = {
  name: 'learners strength',
  description: undefined,
  type: CardFaceType.Resource,
  background: CardBackgroundType.Clear,
  foreground: undefined,
  symbol: SymbolType.Force,
  cost: [],
  benefit: [Force],
};
export const cardForceDefinitionTutorial2: CardDefinition = {
  recycleTarget: RecycleTarget.Draw,
  recyclePosition: 1,
  faces: [cardBackForceTutorial2, cardFrontForceTutorial2],
};
export const cardForceTutorial2 = cardDescriptor.freeze({
  ...cardForceDefinitionTutorial2,
  visibleFaceIndex: 0,
});


const cardBackPunchTutorial: CardBackResource = {
  name: 'learners punch',
  description:
    'This is an attack card, you can use it to hit things. Drag it onto the jammed door to open it.',
  type: CardFaceType.ResourceBack,
  background: CardBackgroundType.Crosshatched,
  foreground: undefined,
  symbol: undefined,
  cost: [Force, Force],
};
const cardFrontPunchTutorial: CardFrontResource = {
  name: 'learners punch',
  description: 'That\'s the way. Now drag this card on top of the door.',
  type: CardFaceType.Resource,
  background: CardBackgroundType.Clear,
  foreground: undefined,
  symbol: SymbolType.Force,
  cost: [],
  benefit: [DamageUp],
};
export const cardDefinitionPunchTutorial: CardDefinition = {
  recycleTarget: RecycleTarget.Draw,
  recyclePosition: 1,
  faces: [cardBackPunchTutorial, cardFrontPunchTutorial],
};
export const cardPunchTutorial = cardDescriptor.freeze({
  ...cardDefinitionPunchTutorial,
  visibleFaceIndex: 0,
});

const cardBackDoor1: CardBackChoice = {
  name: 'door',
  description: 'You can click on a door to go through it.',
  type: CardFaceType.ChoiceBack,
  background: CardBackgroundType.Door,
  foreground: undefined,
  symbol: undefined,
  cost: [],
};
const cardFrontDoor1: CardFrontChoice = {
  name: 'door',
  description: 'Good work! I\'ve given you a card as a reward.',
  type: CardFaceType.Choice,
  background: CardBackgroundType.Passageway,
  foreground: undefined,
  symbol: undefined,
  choice: {
    type: ChoiceType.NextPage,
    encounter: undefined,
  },
  cost: [{
    symbol: SymbolType.GainCards,
    direction: EffectDirection.Down,
    cards: [
      cardForceTutorial1, 
    ],
  }],
  benefit: [],
};
const cardDefinitionDoor1: CardDefinition = {
  recycleTarget: RecycleTarget.Destroy,
  faces: [cardBackDoor1, cardFrontDoor1],
  recyclePosition: 1,
};

const cardBackDoor2: CardBackChoice = {
  name: 'barred door',
  description: 'Congratulations! You have pushed the door open. Now you know it is safe to go through this door by clicking on it.',
  type: CardFaceType.ChoiceBack,
  background: CardBackgroundType.Door,
  foreground: undefined,
  symbol: undefined,
  cost: [Force],
};
const cardFrontDoor2: CardFrontChoice = {
  name: 'open door',
  description: 'Good work again! In the next room, you won\'t be able to open the door with a yellow card. Fortunately you can click on any door to go through it without knowing what\'s behind it.',
  type: CardFaceType.Choice,
  background: CardBackgroundType.Passageway,
  foreground: undefined,
  symbol: undefined,
  choice: {
    type: ChoiceType.NextPage,
    encounter: undefined,
  },
  cost: [],
  benefit: [],
};
const cardDefinitionDoor2: CardDefinition = {
  recycleTarget: RecycleTarget.Destroy,
  faces: [cardBackDoor2, cardFrontDoor2],
  recyclePosition: 2,
};

const cardBackDoor3: CardBackChoice = {
  name: 'locked door',
  description: undefined,
  type: CardFaceType.ChoiceBack,
  background: CardBackgroundType.Door,
  foreground: undefined,
  symbol: undefined,
  cost: [Finesse],
};
const cardFrontDoor3: CardFrontChoice = {
  name: 'open door',
  description: 'Nicely done. You can always go through a door, but you can\'t always see what\'s on the other side. I\'ve given you some new cards as a reward.',
  type: CardFaceType.Choice,
  background: CardBackgroundType.Passageway,
  foreground: undefined,
  symbol: undefined,
  choice: {
    type: ChoiceType.NextPage,
    encounter: undefined,
  },
  cost: [{
    symbol: SymbolType.GainCards,
    direction: EffectDirection.Down,
    cards: [
      cardForceTutorial2, 
      cardPunchTutorial,
    ],
  }],
  benefit: [],
};
const cardDefinitionDoor3: CardDefinition = {
  recycleTarget: RecycleTarget.Destroy,
  faces: [cardBackDoor3, cardFrontDoor3],
  recyclePosition: 3,
};

const cardBackDoor4: CardBackChoice = {
  name: 'jammed door',
  description: 'You force the door open with violence. Now click on the door.',
  type: CardFaceType.ChoiceBack,
  background: CardBackgroundType.Door,
  foreground: undefined,
  symbol: undefined,
  cost: [DamageUp],
};
const cardFrontDoor4: CardFrontChoice = {
  name: 'open door',
  description: 'Congratulations on completing the tutorial. Here\'s some more cards and a snail to beat up.',
  type: CardFaceType.Choice,
  background: CardBackgroundType.Passageway,
  foreground: undefined,
  symbol: undefined,
  choice: {
    type: ChoiceType.NextPage,
    encounter: {
      type: EncounterType.Battle,
      monster: MonsterType.Snail,
    }
  },
  cost: [{
    symbol: SymbolType.GainCards,
    direction: EffectDirection.Down,
    cards: [
      cardKick,
      cardForceEager,
      cardDeflect,
    ],
  }],
  benefit: [],
};
const cardDefinitionDoor4: CardDefinition = {
  recycleTarget: RecycleTarget.Destroy,
  faces: [cardBackDoor4, cardFrontDoor4],
  recyclePosition: 4,
};

export const cards = [cardDefinitionDoor1, cardDefinitionDoor2, cardDefinitionDoor3, cardDefinitionDoor4].map(definition => {
  return cardDescriptor.freeze({
    ...definition,
    visibleFaceIndex: 0,
  })
});

export const finalCard = cardDescriptor.freeze({
  faces: [cardBackDoor1, {
    name: 'open door',
    description: 'You escaped the tutorial!',
    type: CardFaceType.Choice,
    background: CardBackgroundType.Passageway,
    foreground: undefined,
    symbol: undefined,
    choice: {
      type: ChoiceType.ToC,
    },
    cost: [],
    benefit: [],
  
  }],
  recycleTarget: RecycleTarget.Destroy,
  recyclePosition: 1,
  visibleFaceIndex: 0,
});
