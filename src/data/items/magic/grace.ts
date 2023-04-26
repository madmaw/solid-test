import { Finesse, Magic } from "data/effects";
import { CardBackResource, CardBackgroundType, CardDefinition, CardFaceType, CardFrontResource, RecycleTarget, SymbolType, cardDescriptor } from "model/domain";

const cardBackMagicGrace: CardBackResource = {
  name: 'cats grace',
  description: 'You feel agile!',
  type: CardFaceType.ResourceBack,
  background: CardBackgroundType.Crosshatched,
  foreground: undefined,
  symbol: undefined,
  cost: [Magic],
};
const cardFrontMagicGrace: CardFrontResource = {
  name: 'cats grace',
  description: 'The agility fades.',
  type: CardFaceType.Resource,
  background: CardBackgroundType.Clear,
  foreground: undefined,
  symbol: SymbolType.Magic,
  cost: [],
  benefit: [Finesse, Finesse],
};
export const cardDefinitionMagicGrace: CardDefinition = {
  recycleTarget: RecycleTarget.Draw,
  recyclePosition: 6,
  faces: [cardBackMagicGrace, cardFrontMagicGrace],
};
export const cardMagicGrace = cardDescriptor.freeze({
  ...cardDefinitionMagicGrace,
  visibleFaceIndex: 0,
});
