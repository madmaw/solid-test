import { Magic, Mind } from "data/effects";
import { CardBackResource, CardBackgroundType, CardDefinition, CardFaceType, CardFrontResource, RecycleTarget, SymbolType, cardDescriptor } from "model/domain";

const cardBackMagicFeat: CardBackResource = {
  name: 'magic feat',
  description: undefined,
  type: CardFaceType.ResourceBack,
  background: CardBackgroundType.Crosshatched,
  symbol: undefined,
  foreground: undefined,
  cost: [Magic, Magic],
};
const cardFrontMagicFeat: CardFrontResource = {
  name: 'magic feat',
  description: undefined,
  type: CardFaceType.Resource,
  background: CardBackgroundType.Clear,
  foreground: undefined,
  symbol: SymbolType.Magic,
  cost: [],
  benefit: [Magic, Magic],
};
export const cardDefinitionMagicFeat: CardDefinition = {
  recycleTarget: RecycleTarget.Draw,
  recyclePosition: 9,
  faces: [cardBackMagicFeat, cardFrontMagicFeat],
};

export const cardMagicFeat = cardDescriptor.freeze({
  ...cardDefinitionMagicFeat,
  visibleFaceIndex: 0,
});

const cardBackMagicIncantation: CardBackResource = {
  name: 'incantation',
  description: 'You begin chanting.',
  type: CardFaceType.ResourceBack,
  background: CardBackgroundType.Crosshatched,
  symbol: undefined,
  foreground: undefined,
  cost: [Mind, Mind],
};
const cardFrontMagicIncantation: CardFrontResource = {
  name: 'incantation',
  description: undefined,
  type: CardFaceType.Resource,
  background: CardBackgroundType.Clear,
  foreground: undefined,
  symbol: SymbolType.Magic,
  cost: [],
  benefit: [Magic],
};
export const cardDefinitionMagicIncantation1: CardDefinition = {
  recycleTarget: RecycleTarget.Draw,
  recyclePosition: 1,
  faces: [cardBackMagicIncantation, cardFrontMagicIncantation],
};

export const cardDefinitionMagicIncantation5: CardDefinition = {
  recycleTarget: RecycleTarget.Draw,
  recyclePosition: 5,
  faces: [cardBackMagicIncantation, cardFrontMagicIncantation],
};

export const cardMagicIncantation5 = cardDescriptor.freeze({
  ...cardDefinitionMagicIncantation5,
  visibleFaceIndex: 0,
});
