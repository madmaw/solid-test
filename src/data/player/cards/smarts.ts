import { Mind } from "data/effects";
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

const cardBackSmarts: CardBackResource = {
  name: 'smarts',
  type: CardFaceType.ResourceBack,
  background: CardBackgroundType.Crosshatched,
  foreground: undefined,
  cost: [],
};
const cardFrontSmarts: CardFrontResource = {
  name: 'smarts',
  description: 'That\'s usin yer head.',
  type: CardFaceType.Resource,
  background: CardBackgroundType.Clear,
  foreground: undefined,
  cost: [],
  benefit: [Mind],
};
const cardTypeSmarts: CardDefinition = {
  recycleTarget: RecycleTarget.DrawDeckBottom,
  symbol: SymbolType.Mind,
  faces: [cardBackSmarts, cardFrontSmarts],
};

export const cardSmarts = cardDescriptor.freeze({
  definition: cardTypeSmarts,
  visibleFaceIndex: 0,
});
