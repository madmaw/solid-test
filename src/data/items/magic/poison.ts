import { Magic, PoisonUp } from "data/effects";
import { CardBackResource, CardBackgroundType, CardDefinition, CardFaceType, CardFrontResource, RecycleTarget, SymbolType, cardDescriptor } from "model/domain";

const cardBackMagicPoison: CardBackResource = {
  name: 'poison squirt',
  description: 'A viscous liquid wells in your mouth.',
  type: CardFaceType.ResourceBack,
  background: CardBackgroundType.Crosshatched,
  foreground: undefined,
  symbol: undefined,
  cost: [Magic],
};
const cardFrontMagicPoison: CardFrontResource = {
  name: 'poison squirt',
  description: 'You spit!',
  type: CardFaceType.Resource,
  background: CardBackgroundType.Clear,
  foreground: undefined,
  symbol: SymbolType.Magic,
  cost: [],
  benefit: [PoisonUp],
};
export const cardDefinitionMagicPoison: CardDefinition = {
  recycleTarget: RecycleTarget.Draw,
  recyclePosition: 7,
  faces: [cardBackMagicPoison, cardFrontMagicPoison],
};
export const cardMagicPoison = cardDescriptor.freeze({
  ...cardDefinitionMagicPoison,
  visibleFaceIndex: 0,
});
