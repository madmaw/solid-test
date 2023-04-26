import { Perception, PoisonDown } from "data/effects";
import { CardBackgroundType, CardDefinition, CardFaceType, RecycleTarget } from "model/domain";

export const cardDefinitionPoisonResist: CardDefinition = {
  faces: [{
    name: 'iocane powder',
    description: undefined,
    type: CardFaceType.ResourceBack,
    background: CardBackgroundType.Crosshatched,
    foreground: undefined,
    symbol: undefined,
    cost: [],
  }, {
    name: 'iocane powder',
    description: 'I spent the last few years building up an immunity to iocane powder.',
    type: CardFaceType.Resource,
    background: CardBackgroundType.Clear,
    foreground: undefined,
    symbol: undefined,
    cost: [],
    benefit:[PoisonDown, Perception],
  }],
  recycleTarget: RecycleTarget.Draw,
  recyclePosition: 6,
};
