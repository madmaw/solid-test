import { DamageDown, DamageUp } from "data/effects";
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
  description: 'You are attracted to the noise of bubbling water. A pristine fountain stands amongst the ruins.',
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

export const cards = [
  cardBackDoor,
  cardBackJammedDoor,
].flatMap(back => {
  return [
    cardFrontEmpty,
    cardFrontRat,
    cardFrontTrapped,
  ].map<CardDefinition>(front => {
    return {
      recycleTarget: RecycleTarget.DrawDeckRandom,
      faces: [back, front],
    };
  });
}).concat([{
  faces: [cardBackJammedDoor, cardFrontFountain],
  recycleTarget: RecycleTarget.DiscardDeckTop,
}]).map<CardState>(definition => ({
  definition,
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
  name: 'lion',
  description: 'A lion lies guarding the castle gate. It slowly gets up and pads toward you.',
  type: CardFaceType.Choice,
  background: CardBackgroundType.Passageway,
  foreground: undefined,
  symbol: undefined,
  choice: {
    type: ChoiceType.NextChapter,
    encounter: {
      type: EncounterType.Battle,
      // TODO something better
      monster: MonsterType.BigRat,
    },
    targetChapterIndex: 2,
  },
  cost: [],
  benefit: [],
};

export const finalCard = cardDescriptor.freeze({
  definition: {
    faces: [cardBackFinal, cardFrontFinal],
    recycleTarget: RecycleTarget.DiscardDeckTop,
  },
  visibleFaceIndex: 0,
});