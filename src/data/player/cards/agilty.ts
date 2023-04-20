import { Finesse } from "data/effects";
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

const cardBackAgility: CardBackResource = {
  name: 'agility',
  type: CardFaceType.ResourceBack,
  background: CardBackgroundType.Crosshatched,
  foreground: undefined,
  cost: [],
};
const cardFrontAgility: CardFrontResource = {
  name: 'agility',
  description: 'You move with agility.',
  type: CardFaceType.Resource,
  background: CardBackgroundType.Clear,
  foreground: undefined,
  cost: [],
  benefit: [Finesse],
};
const cardTypeAgility: CardDefinition = {
  recycleTarget: RecycleTarget.DrawDeckTop,
  symbol: SymbolType.Finesse,
  faces: [cardBackAgility, cardFrontAgility],
};

export const cardAgility = cardDescriptor.freeze({
  definition: cardTypeAgility,
  visibleFaceIndex: 0,
});
