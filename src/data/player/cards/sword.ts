import { DamageUp, Finesse, Force } from "data/effects";
import {
  CardBackResource,
  CardBackgroundType,
  CardDefinition,
  CardFaceType,
  CardFrontResource,
  RecycleTarget,
  SymbolType,
  cardDescriptor,
} from "model/domain";

const cardBackSlash: CardBackResource = {
  name: 'slash',
  type: CardFaceType.ResourceBack,
  background: CardBackgroundType.Crosshatched,
  foreground: undefined,
  cost: [Force, Finesse],
};
const cardFrontSlash: CardFrontResource = {
  name: 'slash',
  description: 'You swing the old blade.',
  type: CardFaceType.Resource,
  background: CardBackgroundType.Clear,
  foreground: undefined,
  cost: [],
  benefit: [DamageUp, DamageUp],
};
const cardTypeSlash: CardDefinition = {
  recycleTarget: RecycleTarget.DrawDeckBottom,
  symbol: SymbolType.Finesse,
  faces: [cardBackSlash, cardFrontSlash],
};
export const cardSlash = cardDescriptor.freeze({
  definition: cardTypeSlash,
  visibleFaceIndex: 0,
});