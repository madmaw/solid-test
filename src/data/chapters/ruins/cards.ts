import { DamageDown, DamageUp, Finesse, Perception } from "data/effects";
import { cardFrontShrine } from "data/events/shrine/cards";
import {
  CardBackgroundType,
  CardFaceType,
  RecycleTarget,
  ChoiceType,
  EncounterType,
  MonsterType,
  EventType,
  CardState,
  CardForegroundType,
  CardBackChoice,
  CardFrontChoice,
  CardDefinition,
  cardDescriptor,
} from "model/domain";

const cardBackJammedDoor: CardBackChoice = {
  name: 'jammed door',
  description: 'Grudgingly, the door opens.',
  type: CardFaceType.ChoiceBack,
  background: CardBackgroundType.Door,
  foreground: undefined,
  symbol: undefined,
  cost: [DamageUp],
};
const cardBackLockedDoor: CardBackChoice = {
  name: 'locked door',
  description: 'You manage to pick the crude lock.',
  type: CardFaceType.ChoiceBack,
  background: CardBackgroundType.Door,
  foreground: undefined,
  symbol: undefined,
  cost: [Finesse],
};
const cardBackDarkDoorway: CardBackChoice = {
  name: 'dark doorway',
  description: 'Light floods the passageway.',
  type: CardFaceType.ChoiceBack,
  background: CardBackgroundType.Door,
  foreground: undefined,
  symbol: undefined,
  cost: [Perception],
};
const cardBackDoor: CardBackChoice = {
  name: 'door',
  description: undefined,
  type: CardFaceType.ChoiceBack,
  background: CardBackgroundType.Door,
  foreground: undefined,
  symbol: undefined,
  cost: [],
};
const cardFrontEmpty: CardFrontChoice = {
  name: 'empty passage',
  description: 'A crumbling walkway.',
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
const cardFrontRat: CardFrontChoice = {
  name: 'rodent of unusual size',
  description: 'The creature hisses at you belligerently.',
  type: CardFaceType.Choice,
  background: CardBackgroundType.Passageway,
  foreground: CardForegroundType.Rat,
  symbol: undefined,
  choice: {
    type: ChoiceType.NextPage,
    encounter: {
      type: EncounterType.Battle,
      monster: MonsterType.BigRat,
    },
  },
  cost: [],
  benefit: [],
};
const cardFrontSpider: CardFrontChoice = {
  name: 'giant spider',
  description: 'There are webs everywhere here.',
  type: CardFaceType.Choice,
  background: CardBackgroundType.Passageway,
  foreground: CardForegroundType.Spider,
  symbol: undefined,
  choice: {
    type: ChoiceType.NextPage,
    encounter: {
      type: EncounterType.Battle,
      monster: MonsterType.Spider,
    },
  },
  cost: [],
  benefit: [],
};
const cardFrontTrapped: CardFrontChoice = {
  name: 'trapped hallway',
  description: 'An arrow flies out of a hidden recess.',
  type: CardFaceType.Choice,
  background: CardBackgroundType.Passageway,
  foreground: CardForegroundType.Trap,
  symbol: undefined,
  choice: {
    type: ChoiceType.NextPage,
    encounter: undefined,
  },
  cost: [DamageDown],
  benefit: [],
};
const cardFrontFountain: CardFrontChoice = {
  name: 'fountain',
  description: 'You are drawn to the sound of bubbling water. A pristine fountain stands amongst the ruins.',
  type: CardFaceType.Choice,
  background: CardBackgroundType.Passageway,
  foreground: CardForegroundType.Fountain,
  symbol: undefined,
  choice: {
    type: ChoiceType.NextPage,
    encounter: {
      type: EncounterType.Event,
      event: EventType.Fountain,
    },
  },
  cost: [],
  benefit: [],
};
const cardFrontTreasure: CardFrontChoice = {
  name: 'treasure',
  description: 'The glint of gold.',
  type: CardFaceType.Choice,
  background: CardBackgroundType.Passageway,
  foreground: CardForegroundType.Treasure,
  symbol: undefined,
  choice: {
    type: ChoiceType.NextPage,
    encounter: {
      type: EncounterType.Event,
      event: EventType.Treasure,
    },
  },
  cost: [],
  benefit: [],
};

export const cards = [
  cardBackDoor,
  cardBackJammedDoor,
  cardBackDarkDoorway,
  cardBackLockedDoor,
].flatMap(back => {
  return [
    cardFrontEmpty,
    cardFrontRat,
    cardFrontTrapped,
    cardFrontTreasure,
    cardFrontSpider,
  ].map<CardDefinition>(front => {
    return {
      recycleTarget: RecycleTarget.Draw,
      recyclePosition: undefined,
      faces: [back, front],
    };
  });
}).concat([{
  faces: [cardBackJammedDoor, cardFrontFountain],
  recycleTarget: RecycleTarget.Discard,
  recyclePosition: undefined,
}, {
  faces: [cardBackDarkDoorway, cardFrontFountain],
  recycleTarget: RecycleTarget.Discard,
  recyclePosition: undefined,
}, {
  faces: [cardBackDarkDoorway, cardFrontTreasure],
  recycleTarget: RecycleTarget.Discard,
  recyclePosition: undefined,
}, {
  faces: [cardBackLockedDoor, cardFrontTreasure],
  recycleTarget: RecycleTarget.Discard,
  recyclePosition: undefined,
}, {
  faces: [cardBackDoor, cardFrontTreasure],
  recycleTarget: RecycleTarget.Discard,
  recyclePosition: undefined,
}, {
  faces: [cardBackLockedDoor, cardFrontShrine],
  recycleTarget: RecycleTarget.Discard,
  recyclePosition: undefined,
}]).map<CardState>(definition => ({
  ...definition,
  visibleFaceIndex: 0,
}));

const cardBackFinal: CardBackChoice = {
  name: 'crumbling bridge',
  description: 'With some trepidation you cross the bridge.',
  type: CardFaceType.ChoiceBack,
  background: CardBackgroundType.Door,
  foreground: undefined,
  symbol: undefined,
  cost: [],
};

const cardFrontFinal: CardFrontChoice = {
  name: 'dragon',
  description: 'A huge shadow passes overhead. The ground shakes.',
  type: CardFaceType.Choice,
  background: CardBackgroundType.Passageway,
  foreground: undefined,
  symbol: undefined,
  choice: {
    type: ChoiceType.NextChapter,
    encounter: {
      type: EncounterType.Battle,
      monster: MonsterType.Dragon,
    },
    targetChapterIndex: 3,
  },
  cost: [],
  benefit: [],
};

export const finalCard = cardDescriptor.freeze({
  faces: [cardBackFinal, cardFrontFinal],
  recycleTarget: RecycleTarget.Discard,
  recyclePosition: undefined,
  visibleFaceIndex: 0,
});